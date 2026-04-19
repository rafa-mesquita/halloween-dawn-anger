import Phaser from 'phaser';
import GameScene from './GameScene.js';
import { NetworkManager } from './network.js';

const lobby = document.getElementById('lobby');
const panelChoice = document.getElementById('lobby-choice');
const panelHost = document.getElementById('lobby-host');
const panelJoin = document.getElementById('lobby-join');

function showPanel(panel) {
  [panelChoice, panelHost, panelJoin].forEach((p) => p.classList.remove('visible'));
  panel.classList.add('visible');
}

document.getElementById('btn-single').addEventListener('click', () => {
  lobby.style.display = 'none';
  startGame('single', null);
});

document.getElementById('btn-host').addEventListener('click', async () => {
  showPanel(panelHost);
  const net = new NetworkManager();
  try {
    const id = await net.host();
    document.getElementById('host-id').textContent = id;
    net.onConnected(() => {
      document.getElementById('host-status').textContent = 'Conectado! Iniciando...';
      setTimeout(() => {
        lobby.style.display = 'none';
        startGame('host', net);
      }, 600);
    });
  } catch (e) {
    document.getElementById('host-status').textContent = 'Erro: ' + e.message;
  }
});

document.getElementById('btn-copy-id').addEventListener('click', () => {
  const id = document.getElementById('host-id').textContent;
  navigator.clipboard.writeText(id).then(() => {
    const btn = document.getElementById('btn-copy-id');
    const original = btn.textContent;
    btn.textContent = 'Copiado!';
    setTimeout(() => (btn.textContent = original), 1200);
  });
});

document.getElementById('btn-host-back').addEventListener('click', () => {
  window.location.reload();
});

document.getElementById('btn-join').addEventListener('click', () => {
  showPanel(panelJoin);
});

document.getElementById('btn-join-back').addEventListener('click', () => {
  showPanel(panelChoice);
});

document.getElementById('btn-connect').addEventListener('click', async () => {
  const id = document.getElementById('join-id').value.trim();
  if (!id) return;
  const status = document.getElementById('join-status');
  status.textContent = 'Conectando...';
  const net = new NetworkManager();
  try {
    await net.join(id);
    status.textContent = 'Conectado! Iniciando...';
    setTimeout(() => {
      lobby.style.display = 'none';
      startGame('client', net);
    }, 600);
  } catch (e) {
    status.textContent = 'Erro: ' + (e.message || e.type || 'falha ao conectar');
  }
});

function startGame(mode, network) {
  if (mode !== 'single') {
    const hitboxToggle = document.getElementById('hitbox-toggle');
    const devPanel = document.getElementById('dev-power-panel');
    if (hitboxToggle) hitboxToggle.style.display = 'none';
    if (devPanel) devPanel.style.display = 'none';
  }
  const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1536,
    height: 1024,
    backgroundColor: '#1a1a2e',
    pixelArt: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 800 },
        debug: mode === 'single',
      },
    },
    scene: [],
  };
  const game = new Phaser.Game(config);
  game.scene.add('GameScene', GameScene, true, { mode, network });
}
