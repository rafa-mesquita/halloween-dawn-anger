import Peer from 'peerjs';

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
      this.peer = new Peer();
      this.peer.on('open', (id) => resolve(id));
      this.peer.on('error', reject);
      this.peer.on('connection', (conn) => {
        this.conn = conn;
        conn.on('open', () => this.setupConn());
      });
    });
  }

  join(hostId) {
    return new Promise((resolve, reject) => {
      this.peer = new Peer();
      this.peer.on('error', reject);
      this.peer.on('open', () => {
        this.conn = this.peer.connect(hostId, { reliable: false });
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
