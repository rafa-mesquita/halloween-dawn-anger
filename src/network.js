import Peer from 'peerjs';

const ID_PREFIX = 'hda-';

function randomCode() {
  return String(Math.floor(10000 + Math.random() * 90000));
}

export class NetworkManager {
  constructor() {
    this.peer = null;
    this.conn = null;
    this.onStateCallback = null;
    this.onConnectedCallback = null;
    this.isConnected = false;
  }

  host() {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const tryOpen = () => {
        const code = randomCode();
        const peer = new Peer(ID_PREFIX + code);
        peer.on('open', () => {
          this.peer = peer;
          this.peer.on('connection', (conn) => {
            this.conn = conn;
            conn.on('open', () => this.setupConn());
          });
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

  join(code) {
    return new Promise((resolve, reject) => {
      this.peer = new Peer();
      this.peer.on('error', reject);
      this.peer.on('open', () => {
        this.conn = this.peer.connect(ID_PREFIX + code, { reliable: false });
        this.conn.on('open', () => {
          this.setupConn();
          resolve();
        });
        this.conn.on('error', reject);
      });
    });
  }

  setupConn() {
    this.isConnected = true;
    this.conn.on('data', (data) => {
      if (this.onStateCallback) this.onStateCallback(data);
    });
    this.conn.on('close', () => {
      this.isConnected = false;
    });
    if (this.onConnectedCallback) this.onConnectedCallback();
  }

  onConnected(cb) {
    this.onConnectedCallback = cb;
    if (this.isConnected) cb();
  }

  onState(cb) {
    this.onStateCallback = cb;
  }

  send(data) {
    if (this.conn && this.conn.open) {
      this.conn.send(data);
    }
  }
}
