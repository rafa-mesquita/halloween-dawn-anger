import Phaser from 'phaser';
import GameScene from './GameScene.js';
import { NetworkManager, MAX_PLAYERS } from './network.js';

const BASE_URL = import.meta.env.BASE_URL;

const CHARACTER_IDS = ['p1', 'p2', 'p3', 'p4'];
const CHARACTER_LABELS = {
  p1: 'Laranja',
  p2: 'Roxo',
  p3: 'Verde',
  p4: 'Vermelho',
};
const CHARACTER_IDLE_URLS = {
  p1: `${BASE_URL}sprites/player_idle.png`,
  p2: `${BASE_URL}sprites/Player 2/player_idle.png`,
  p3: `${BASE_URL}sprites/Player 3/player_idle.png`,
  p4: `${BASE_URL}sprites/Player 4/player_idle.png`,
};

const lobby = document.getElementById('lobby');
const panelChoice = document.getElementById('lobby-choice');
const panelHost = document.getElementById('lobby-host');
const panelJoin = document.getElementById('lobby-join');
const panelWaiting = document.getElementById('lobby-waiting');

function showPanel(panel) {
  [panelChoice, panelHost, panelJoin, panelWaiting].forEach((p) => p.classList.remove('visible'));
  panel.classList.add('visible');
}

function renderPicker(containerId, selectedCharId, onPick) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  for (const charId of CHARACTER_IDS) {
    const tile = document.createElement('div');
    tile.className = 'char-tile' + (charId === selectedCharId ? ' selected' : '');
    tile.dataset.char = charId;

    const preview = document.createElement('div');
    preview.className = 'char-preview';
    preview.style.backgroundImage = `url('${CHARACTER_IDLE_URLS[charId]}')`;

    const name = document.createElement('div');
    name.className = 'char-name';
    name.textContent = CHARACTER_LABELS[charId];

    tile.appendChild(preview);
    tile.appendChild(name);
    tile.addEventListener('click', () => onPick(charId));
    container.appendChild(tile);
  }
}

function renderPlayersList(containerId, peers, myIndex) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const sorted = peers.slice().sort((a, b) => a.index - b.index);
  for (const p of sorted) {
    const row = document.createElement('div');
    row.className = 'player-row';

    const left = document.createElement('span');
    const youTag = p.index === myIndex ? ' (você)' : '';
    const hostTag = p.index === 0 ? ' [host]' : '';
    left.textContent = `Jogador ${p.index + 1}${hostTag}${youTag}`;

    const right = document.createElement('span');
    right.style.display = 'flex';
    right.style.alignItems = 'center';
    right.style.gap = '6px';

    const mini = document.createElement('div');
    mini.className = 'char-mini';
    const charId = p.charId ?? CHARACTER_IDS[p.index] ?? 'p1';
    mini.style.backgroundImage = `url('${CHARACTER_IDLE_URLS[charId]}')`;

    const charLabel = document.createElement('span');
    charLabel.className = 'tag';
    charLabel.textContent = CHARACTER_LABELS[charId] ?? charId;

    right.appendChild(mini);
    right.appendChild(charLabel);

    row.appendChild(left);
    row.appendChild(right);
    container.appendChild(row);
  }
}

function updateStartButton(peers) {
  const btn = document.getElementById('btn-start-match');
  const count = peers.length;
  btn.textContent = `Iniciar partida (${count}/${MAX_PLAYERS})`;
  btn.disabled = count < 2;
}

document.getElementById('btn-single').addEventListener('click', () => {
  lobby.style.display = 'none';
  startGame('single', null, null);
});

let currentGame = null;
let currentNet = null;
let currentMode = null;

function setupHostLobbyUI(net) {
  const myPeer = () => net.peers.find((p) => p.index === net.myIndex);
  const refresh = () => {
    renderPlayersList('host-players', net.peers, net.myIndex);
    updateStartButton(net.peers);
    const me = myPeer();
    renderPicker('host-picker', me?.charId ?? 'p1', (charId) => {
      net.setMyCharacter(charId);
      refresh();
    });
  };
  refresh();

  net.onPeers((peers) => {
    const status = document.getElementById('host-status');
    status.textContent = peers.length > 1
      ? `${peers.length} jogadores na sala`
      : 'Aguardando conexão...';
    refresh();
  });

  document.getElementById('btn-start-match').onclick = () => {
    const players = net.peers
      .slice()
      .sort((a, b) => a.index - b.index)
      .map((p) => ({ index: p.index, charId: p.charId ?? CHARACTER_IDS[p.index] ?? 'p1' }));
    net.startMatch(players);
    lobby.style.display = 'none';
    startGame('host', net, { players, myIndex: net.myIndex });
  };
}

function setupClientWaitingUI(net) {
  const myPeer = () => net.peers.find((p) => p.index === net.myIndex);
  const refresh = () => {
    renderPlayersList('waiting-players', net.peers, net.myIndex);
    const me = myPeer();
    renderPicker('waiting-picker', me?.charId ?? CHARACTER_IDS[net.myIndex] ?? 'p1', (charId) => {
      net.setMyCharacter(charId);
    });
  };
  refresh();
  net.onPeers(() => refresh());
  net.onStart((players) => {
    lobby.style.display = 'none';
    startGame('client', net, { players, myIndex: net.myIndex });
  });
}

window.addEventListener('match-return-to-lobby', () => {
  if (currentGame) {
    currentGame.destroy(true);
    currentGame = null;
  }
  if (currentNet) {
    currentNet.onState(() => {});
  }
  lobby.style.display = '';
  if (currentMode === 'host' && currentNet) {
    showPanel(panelHost);
    setupHostLobbyUI(currentNet);
  } else if (currentMode === 'client' && currentNet) {
    showPanel(panelWaiting);
    setupClientWaitingUI(currentNet);
  } else {
    window.location.reload();
  }
});

document.getElementById('btn-host').addEventListener('click', async () => {
  showPanel(panelHost);
  const net = new NetworkManager();
  try {
    const id = await net.host();
    document.getElementById('host-id').textContent = id;
    currentNet = net;
    currentMode = 'host';
    setupHostLobbyUI(net);
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

document.getElementById('btn-waiting-back').addEventListener('click', () => {
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
    status.textContent = 'Conectado.';
    showPanel(panelWaiting);
    currentNet = net;
    currentMode = 'client';
    setupClientWaitingUI(net);
  } catch (e) {
    status.textContent = 'Erro: ' + (e.message || e.type || 'falha ao conectar');
  }
});

function startGame(mode, network, matchInfo) {
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
  game.scene.add('GameScene', GameScene, true, { mode, network, matchInfo });
  currentGame = game;
  currentMode = mode;
  currentNet = network;
}
