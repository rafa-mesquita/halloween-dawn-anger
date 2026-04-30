import Peer from 'peerjs';

const ID_PREFIX = 'hda-';
export const MAX_PLAYERS = 4;

function randomCode() {
  return String(Math.floor(10000 + Math.random() * 90000));
}

export class NetworkManager {
  constructor() {
    this.peer = null;
    this.isHost = false;
    this.isConnected = false;
    this.myIndex = -1;
    this.clients = [];
    this.hostConn = null;
    this.peers = [];
    this.onStateCallback = null;
    this.onConnectedCallback = null;
    this.onPeersCallback = null;
    this.onStartCallback = null;
  }

  host() {
    this.isHost = true;
    this.myIndex = 0;
    this.peers = [{ index: 0, charId: 'p1', nick: '', team: null }];
    this.teamMode = false;
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const tryOpen = () => {
        const code = randomCode();
        const peer = new Peer(ID_PREFIX + code);
        peer.on('open', () => {
          this.peer = peer;
          this.peer.on('connection', (conn) => this.acceptClient(conn));
          resolve(code);
        });
        peer.on('error', (err) => {
          if (err && err.type === 'unavailable-id' && attempts < 8) {
            attempts += 1;
            peer.destroy();
            tryOpen();
          } else if (!this.peer) {
            reject(err);
          }
        });
      };
      tryOpen();
    });
  }

  acceptClient(conn) {
    if (this.peers.length >= MAX_PLAYERS) {
      conn.on('open', () => {
        conn.send({ type: '_reject', reason: 'full' });
        setTimeout(() => conn.close(), 200);
      });
      return;
    }
    const usedIndexes = new Set(this.peers.map((p) => p.index));
    let index = 1;
    while (usedIndexes.has(index)) index += 1;
    const defaultChars = ['p1', 'p2', 'p3', 'p4'];
    const client = { conn, index };
    this.clients.push(client);
    this.peers.push({ index, charId: defaultChars[index] ?? 'p1', nick: '', team: null });
    conn.on('open', () => {
      this.isConnected = true;
      conn.send({ type: '_assign', index });
      this.broadcastPeers();
      if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
    });
    conn.on('data', (data) => this.onHostReceive(client, data));
    conn.on('close', () => {
      this.clients = this.clients.filter((c) => c !== client);
      this.peers = this.peers.filter((p) => p.index !== client.index);
      this.broadcastPeers();
      if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
    });
  }

  broadcastPeers() {
    const payload = { type: '_peers', peers: this.peers.slice(), teamMode: !!this.teamMode };
    for (const c of this.clients) {
      if (c.conn.open) c.conn.send(payload);
    }
  }

  onHostReceive(client, data) {
    if (!data || typeof data !== 'object') return;
    if (data.type === '_pick') {
      const peer = this.peers.find((p) => p.index === client.index);
      if (peer && typeof data.charId === 'string') {
        peer.charId = data.charId;
        this.broadcastPeers();
        if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
      }
      return;
    }
    if (data.type === '_nick') {
      const peer = this.peers.find((p) => p.index === client.index);
      if (peer && typeof data.nick === 'string') {
        peer.nick = data.nick.slice(0, 12);
        this.broadcastPeers();
        if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
      }
      return;
    }
    if (data.type === '_team') {
      const peer = this.peers.find((p) => p.index === client.index);
      if (peer) {
        peer.team = data.team === 'A' || data.team === 'B' ? data.team : null;
        this.broadcastPeers();
        if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
      }
      return;
    }
    for (const c of this.clients) {
      if (c !== client && c.conn.open) c.conn.send(data);
    }
    if (this.onStateCallback) this.onStateCallback(data);
  }

  setMyCharacter(charId) {
    if (this.isHost) {
      const me = this.peers.find((p) => p.index === this.myIndex);
      if (me) me.charId = charId;
      this.broadcastPeers();
      if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
    } else if (this.hostConn && this.hostConn.open) {
      this.hostConn.send({ type: '_pick', charId });
    }
  }

  setMyNick(nick) {
    const clean = (nick || '').slice(0, 12);
    if (this.isHost) {
      const me = this.peers.find((p) => p.index === this.myIndex);
      if (me) me.nick = clean;
      this.broadcastPeers();
      if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
    } else if (this.hostConn && this.hostConn.open) {
      this.hostConn.send({ type: '_nick', nick: clean });
    }
  }

  setMyTeam(team) {
    const clean = team === 'A' || team === 'B' ? team : null;
    if (this.isHost) {
      const me = this.peers.find((p) => p.index === this.myIndex);
      if (me) me.team = clean;
      this.broadcastPeers();
      if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
    } else if (this.hostConn && this.hostConn.open) {
      this.hostConn.send({ type: '_team', team: clean });
    }
  }

  setTeamMode(enabled) {
    if (!this.isHost) return;
    this.teamMode = !!enabled;
    if (!this.teamMode) {
      for (const p of this.peers) p.team = null;
    }
    this.broadcastPeers();
    if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
  }

  addBot() {
    if (!this.isHost) return null;
    if (this.peers.length >= MAX_PLAYERS) return null;
    const used = new Set(this.peers.map((p) => p.index));
    let index = 1;
    while (used.has(index)) index += 1;
    if (index >= MAX_PLAYERS) return null;
    const defaultChars = ['p1', 'p2', 'p3', 'p4'];
    const botCount = this.peers.filter((p) => p.isBot).length + 1;
    const bot = {
      index,
      charId: defaultChars[index] ?? 'p1',
      nick: `Bot ${botCount}`,
      team: null,
      isBot: true,
    };
    this.peers.push(bot);
    this.broadcastPeers();
    if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
    return bot;
  }

  removeBot(index) {
    if (!this.isHost) return;
    const p = this.peers.find((x) => x.index === index);
    if (!p || !p.isBot) return;
    this.peers = this.peers.filter((x) => x !== p);
    this.broadcastPeers();
    if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
  }

  setBotTeam(index, team) {
    if (!this.isHost) return;
    const p = this.peers.find((x) => x.index === index);
    if (!p || !p.isBot) return;
    p.team = team === 'A' || team === 'B' ? team : null;
    this.broadcastPeers();
    if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
  }

  setBotCharacter(index, charId) {
    if (!this.isHost) return;
    const p = this.peers.find((x) => x.index === index);
    if (!p || !p.isBot) return;
    if (typeof charId === 'string') {
      p.charId = charId;
      this.broadcastPeers();
      if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
    }
  }

  startMatch(players) {
    if (!this.isHost) return;
    const payload = { type: '_start', players, teamMode: !!this.teamMode };
    for (const c of this.clients) {
      if (c.conn.open) c.conn.send(payload);
    }
    if (this.onStartCallback) this.onStartCallback(players, !!this.teamMode);
  }

  join(code) {
    return new Promise((resolve, reject) => {
      this.peer = new Peer();
      this.peer.on('error', reject);
      this.peer.on('open', () => {
        this.hostConn = this.peer.connect(ID_PREFIX + code, { reliable: true });
        this.hostConn.on('open', () => {
          this.isConnected = true;
          this.hostConn.on('data', (data) => this.onClientReceive(data));
          if (this.onConnectedCallback) this.onConnectedCallback();
          resolve();
        });
        this.hostConn.on('error', reject);
        this.hostConn.on('close', () => {
          this.isConnected = false;
        });
      });
    });
  }

  onClientReceive(data) {
    if (!data || typeof data !== 'object') return;
    if (data.type === '_assign') {
      this.myIndex = data.index;
      return;
    }
    if (data.type === '_peers') {
      this.peers = data.peers || [];
      this.teamMode = !!data.teamMode;
      if (this.onPeersCallback) this.onPeersCallback(this.peers.slice());
      return;
    }
    if (data.type === '_start') {
      this.teamMode = !!data.teamMode;
      if (this.onStartCallback) this.onStartCallback(data.players || [], !!data.teamMode);
      return;
    }
    if (data.type === '_reject') {
      this.isConnected = false;
      return;
    }
    if (this.onStateCallback) this.onStateCallback(data);
  }

  send(data) {
    if (this.isHost) {
      for (const c of this.clients) {
        if (c.conn.open) c.conn.send(data);
      }
    } else if (this.hostConn && this.hostConn.open) {
      this.hostConn.send(data);
    }
  }

  onState(cb) { this.onStateCallback = cb; }
  onConnected(cb) {
    this.onConnectedCallback = cb;
    if (this.isConnected) cb();
  }
  onPeers(cb) { this.onPeersCallback = cb; }
  onStart(cb) { this.onStartCallback = cb; }
}
