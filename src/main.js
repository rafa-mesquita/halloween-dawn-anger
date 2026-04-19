import Phaser from 'phaser';
import GameScene from './GameScene.js';

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
      debug: true,
    },
  },
  scene: [GameScene],
};

new Phaser.Game(config);
