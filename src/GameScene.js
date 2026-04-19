import Phaser from 'phaser';
import { MAP_WIDTH, MAP_HEIGHT, PLATFORM_RECTS } from './map1.js';

const MOVE_SPEED = 420;
const JUMP_VELOCITY = 700;
const DOUBLE_JUMP_VELOCITY = 540;
const WHEEL_STUN_HITS = 3;
const MAX_JUMPS = 2;
const FALL_GRAVITY_MULTIPLIER = 2.8;
const DOUBLE_JUMP_FALL_MULTIPLIER = 3.8;
const SLAM_VELOCITY = 850;

const FRAME_WIDTH = 192;
const FRAME_HEIGHT = 128;
const SPRITE_SCALE = 4;
const BODY_WIDTH = 16;
const BODY_HEIGHT = 25;
const BODY_OFFSET_X = 49;
const BODY_OFFSET_Y = 55;

const ATTACK_HITBOX_WIDTH = 130;
const ATTACK_HITBOX_HEIGHT = 100;

const MAX_ATTACK_ORBS = 4;
const ORB_FULL_RESET_MS = 4000;
const ORB_RADIUS = 10;
const ORB_SPACING = 28;

const MAX_HP = 100;
const ATTACK_DAMAGE = 17;
const STARTING_LIVES = 3;
const MULTIPLAYER_LIVES = 5;
const RESPAWN_DELAY_MS = 1500;
const INVULN_DURATION_MS = 1500;
const HIT_FLASH_DURATION_MS = 280;
const PICKUP_FLASH_DURATION_MS = 450;
const JUMP_LOCKOUT_MS = 120;
const ATTACKER_DEPTH = 5;
const DEFAULT_SPRITE_DEPTH = 1;

const LOOT_FRAME_SIZE = 32;
const LOOT_SCALE = 3.3;
const LOOT_BODY_SIZE = 20;
const LOOT_SPAWN_MIN_MS = 1500;
const LOOT_SPAWN_MAX_MS = 3500;
const LOOT_LIFETIME_MIN_MS = 5000;
const LOOT_LIFETIME_MAX_MS = 10000;
const LOOT_MAX_ACTIVE = 3;
const WOOD_IDLE_FRAMES = 8;
const WOOD_CATCH_FRAMES = 7;
const HP_IDLE_FRAMES = 10;
const HP_CATCH_FRAMES = 5;
const HP_HEAL_AMOUNT = 50;

const HEAVENS_FURY_FRAME_SIZE = 128;
const HEAVENS_FURY_FRAMES = 12;
const HEAVENS_FURY_SCALE = 4;
const HEAVENS_FURY_STRIKE_HALF_WIDTH = 100;
const HEAVENS_FURY_BEAM_HALF_WIDTH = 65;
const HEAVENS_FURY_GROUND_ZONE_HEIGHT = 110;
const HEAVENS_FURY_DAMAGE_FULL = 80;
const HEAVENS_FURY_DAMAGE_BEAM = 33;
const HEAVENS_FURY_IMPACT_FRAME_START = 3;
const HEAVENS_FURY_IMPACT_FRAME_END = 6;
const HEAVENS_FURY_TELEGRAPH_MS = 1500;
const SMITE_FRAME_SIZE = 64;
const SMITE_FRAMES = 11;
const SMITE_SCALE = 4;

const HOLY_SHIELD_FRAME_SIZE = 64;
const HOLY_SHIELD_FRAMES = 7;
const HOLY_SHIELD_SCALE = 1.8;
const HOLY_SHIELD_HUD_SCALE = 0.14;
const HOLY_SHIELD_FRAMERATE = 6;
const SHIELD_PULSE_MS = 900;
const SHIELD_CHARGES = 2;
const SHIELD_DAMAGE_MULTIPLIER = 0.2;
const SPECIAL_ORB_RADIUS = 16;

const SKULL_CURSE_FRAME_W = 40;
const SKULL_CURSE_FRAME_H = 32;
const SKULL_CURSE_FLY_FRAMES = 10;
const SKULL_CURSE_HIT_FRAMES = 6;
const SKULL_CURSE_SCALE = 3;
const SKULL_CURSE_SPEED = 600;
const SKULL_CURSE_VFX_FRAME_W = 64;
const SKULL_CURSE_VFX_FRAME_H = 67;
const SKULL_CURSE_VFX_FRAMES = 12;
const SKULL_CURSE_VFX_SCALE = 1.8;
const SKULL_CURSE_VFX_FRAMERATE = 14;
const SKULL_CURSE_BODY_W = 28;
const SKULL_CURSE_BODY_H = 22;
const SKULL_CURSE_DAMAGE = 30;
const SKULL_CURSE_DEBUFF_DURATION_MS = 10000;
const SKULL_CURSE_DEBUFF_MULTIPLIER = 1.6;
const SKULL_CURSE_FLY_FRAMERATE = 14;
const SKULL_CURSE_HIT_FRAMERATE = 14;

const WHEEL_FRAME_W = 247;
const WHEEL_FRAME_H = 87;
const WHEEL_FRAMES = 4;
const WHEEL_SCALE = 1.6;
const WHEEL_BODY_W = 24;
const WHEEL_BODY_H = 24;
const WHEEL_BALL_LOCAL_X = 95;
const WHEEL_BALL_LOCAL_Y = 45;
const WHEEL_VISUAL_Y_OFFSET = -14;
const WHEEL_SPEED = 650;
const WHEEL_DAMAGE = 25;
const WHEEL_STUN_MS = 4000;
const WHEEL_KNOCKUP = -380;
const WHEEL_FRAMERATE = 14;

const POWERS = {
  heavens_fury: {
    animKey: 'heavens_fury',
    orbColor: 0xfde047,
    orbStroke: 0xca8a04,
  },
  shield: {
    orbColor: 0x38bdf8,
  },
  skull_curse: {
    orbColor: 0xa855f7,
  },
  wheel: {
    orbColor: 0xffffff,
  },
};

const WOOD_POWER_POOL = ['heavens_fury', 'shield', 'skull_curse', 'wheel'];

const LOOT_TYPES = {
  wood: {
    idleKey: 'wood_idle',
    catchKey: 'wood_catch',
    glowKey: 'glow_orange',
    onPickup: (scene, fighter, loot) => {
      if (fighter.specialPowers.length < 2) fighter.specialPowers.push(loot.power);
    },
  },
  hp: {
    idleKey: 'hp_idle',
    catchKey: 'hp_catch',
    glowKey: 'glow_green',
    onPickup: (scene, fighter) => {
      fighter.hp = Math.min(MAX_HP, fighter.hp + HP_HEAL_AMOUNT);
    },
  },
};

const CHARACTERS = [
  { id: 'p1', folder: '', glowKey: 'glow_orange', glowColor: [255, 150, 70, 255, 130, 55, 255, 110, 40], tintColor: 0xff9646 },
  { id: 'p2', folder: 'Player 2/', glowKey: 'glow_purple', glowColor: [180, 100, 255, 160, 80, 230, 140, 60, 210], tintColor: 0xb464ff },
  { id: 'p3', folder: 'Player 3/', glowKey: 'glow_green', glowColor: [110, 230, 120, 80, 210, 100, 60, 190, 80], tintColor: 0x6ee678 },
];

const ATTACK_ANIMS_BASE = {
  horizontal: { frameCount: 7, activeStart: 2, activeEnd: 4, charFrameOffsetX: 49 },
  up:         { frameCount: 6, activeStart: 2, activeEnd: 3, charFrameOffsetX: 49 },
  down:       { frameCount: 6, activeStart: 2, activeEnd: 3, charFrameOffsetX: 67 },
};

function animKeysFor(charId) {
  const atk = (variant, suffix) => ({
    animKey: `${charId}_${suffix}`,
    spriteKey: `${charId}_${suffix}`,
    frameCount: ATTACK_ANIMS_BASE[variant].frameCount,
    activeStart: ATTACK_ANIMS_BASE[variant].activeStart,
    activeEnd: ATTACK_ANIMS_BASE[variant].activeEnd,
    charFrameOffsetX: ATTACK_ANIMS_BASE[variant].charFrameOffsetX,
  });
  return {
    idle: `${charId}_idle`,
    run: `${charId}_run`,
    jump: `${charId}_jump`,
    fall: `${charId}_fall`,
    attackHorizontal: atk('horizontal', 'attack'),
    attackUp: atk('up', 'attack_up'),
    attackDown: atk('down', 'attack_down'),
  };
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.mode = data?.mode ?? 'single';
    this.network = data?.network ?? null;
    this.localFighterIndex = this.mode === 'client' ? 1 : 0;
    this.remoteFighterIndex = this.mode === 'client' ? 0 : 1;
    this.isMultiplayer = this.mode === 'host' || this.mode === 'client';
  }

  preload() {
    const baseSheets = ['idle', 'run', 'jump', 'fall', 'attack', 'attack_up', 'attack_down', 'death'];
    for (const char of CHARACTERS) {
      for (const sheet of baseSheets) {
        const url = `sprites/${char.folder}player_${sheet}.png`;
        this.load.spritesheet(`${char.id}_${sheet}`, url, {
          frameWidth: FRAME_WIDTH,
          frameHeight: FRAME_HEIGHT,
        });
      }
    }
    this.load.audio('bgm', 'audio/bgm.mp3');
    this.load.audio('sfx_heavens_fury_cast', 'audio/powers/heavens_fury/Cast.mp3');
    this.load.audio('sfx_heavens_fury_second', 'audio/powers/heavens_fury/Second.mp3');
    this.load.audio('sfx_swing', 'audio/attacks/Hit.mp3');
    this.load.audio('sfx_hit', 'audio/attacks/atack.mp3');
    this.load.audio('sfx_crow_die', 'audio/corvo/corvo die.mp3');
    this.load.audio('sfx_shield_cast', 'audio/powers/shield/cast.mp3');
    this.load.audio('sfx_shield_break', 'audio/powers/shield/broke shield.mp3');
    this.load.audio('sfx_skull_cast', 'audio/powers/skull_curse/cast skull curse.mp3');
    this.load.audio('sfx_skull_hit', 'audio/powers/skull_curse/hit skull.mp3');
    this.load.audio('sfx_power_pickup', 'audio/power catch/power cath.mp3');
    this.load.audio('sfx_cure', 'audio/heal novo/93eeb9fc-8eab-44db-aa09-270a2550a130.mp3');
    this.load.audio('sfx_jump', 'audio/jump/30_Jump_03.wav');
    this.load.image('map1_bg', 'maps/map1/background.png');
    this.load.image('map1_platforms', 'maps/map1/platforms.png');
    this.load.spritesheet('map1_crow', 'maps/map1/Crow.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('wood_idle', 'sprites/Wood/wood on map.png', {
      frameWidth: LOOT_FRAME_SIZE,
      frameHeight: LOOT_FRAME_SIZE,
    });
    this.load.spritesheet('wood_catch', 'sprites/Wood/wood catch.png', {
      frameWidth: LOOT_FRAME_SIZE,
      frameHeight: LOOT_FRAME_SIZE,
    });
    this.load.spritesheet('hp_sheet', 'sprites/HP/hp effect.png', {
      frameWidth: LOOT_FRAME_SIZE,
      frameHeight: LOOT_FRAME_SIZE,
    });
    this.load.spritesheet('heavens_fury', 'sprites/Poder 1/HeavensFury_spritesheet.png', {
      frameWidth: HEAVENS_FURY_FRAME_SIZE,
      frameHeight: HEAVENS_FURY_FRAME_SIZE,
    });
    this.load.spritesheet('smite', 'sprites/Poder 1/Smite_spritesheet.png', {
      frameWidth: SMITE_FRAME_SIZE,
      frameHeight: SMITE_FRAME_SIZE,
    });
    this.load.spritesheet('holy_shield', 'sprites/Poder 2 (Shield)/HolyShield_spritesheet.png', {
      frameWidth: HOLY_SHIELD_FRAME_SIZE,
      frameHeight: HOLY_SHIELD_FRAME_SIZE,
    });
    this.load.image('shield_icon', 'sprites/Poder 2 (Shield)/shield icon.png');
    this.load.spritesheet('skull_curse', 'sprites/Poder 3 (skull curse)/Dark VFX 1 (40x32).png', {
      frameWidth: SKULL_CURSE_FRAME_W,
      frameHeight: SKULL_CURSE_FRAME_H,
    });
    this.load.spritesheet('skull_curse_vfx', 'sprites/Poder 3 (skull curse)/518.png', {
      frameWidth: SKULL_CURSE_VFX_FRAME_W,
      frameHeight: SKULL_CURSE_VFX_FRAME_H,
    });
    this.load.spritesheet('wheel', 'sprites/Poder 4 (Wheel)/mid-Attack 5.png', {
      frameWidth: WHEEL_FRAME_W,
      frameHeight: WHEEL_FRAME_H,
    });
    this.load.spritesheet('stun_vfx', 'sprites/Poder 4 (Wheel)/stun.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  createRainEffect() {
    if (!this.textures.exists('rain_drop')) {
      const tex = this.textures.createCanvas('rain_drop', 2, 8);
      const ctx = tex.getContext();
      ctx.fillStyle = 'rgba(190, 215, 255, 1)';
      ctx.fillRect(0, 0, 2, 8);
      tex.refresh();
    }

    this.add.particles(0, 0, 'rain_drop', {
      x: { min: -80, max: MAP_WIDTH + 80 },
      y: -30,
      lifespan: 2500,
      speedY: { min: 520, max: 640 },
      speedX: { min: -60, max: -30 },
      quantity: 3,
      frequency: 35,
      alpha: { min: 0.25, max: 0.55 },
      scale: { min: 0.8, max: 1.2 },
    }).setDepth(-5);
  }

  createGlowTexture(key, rgbStops) {
    const glowSize = 260;
    const tex = this.textures.createCanvas(key, glowSize, glowSize);
    const ctx = tex.getContext();
    const grad = ctx.createRadialGradient(
      glowSize / 2, glowSize / 2, 0,
      glowSize / 2, glowSize / 2, glowSize / 2
    );
    grad.addColorStop(0, `rgba(${rgbStops[0]}, ${rgbStops[1]}, ${rgbStops[2]}, 0.32)`);
    grad.addColorStop(0.45, `rgba(${rgbStops[3]}, ${rgbStops[4]}, ${rgbStops[5]}, 0.12)`);
    grad.addColorStop(1, `rgba(${rgbStops[6]}, ${rgbStops[7]}, ${rgbStops[8]}, 0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, glowSize, glowSize);
    tex.refresh();
  }

  create() {
    this.physics.world.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);
    this.physics.world.setBoundsCollision(true, true, false, false);
    this.cameras.main.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);

    this.add.image(0, 0, 'map1_bg')
      .setOrigin(0, 0)
      .setScrollFactor(0.3, 0.6)
      .setDepth(-10);

    this.add.image(0, 0, 'map1_platforms')
      .setOrigin(0, 0)
      .setDepth(-1);

    if (!this.anims.exists('map1_crow_idle')) {
      this.anims.create({
        key: 'map1_crow_idle',
        frames: this.anims.generateFrameNumbers('map1_crow', { start: 0, end: 14 }),
        frameRate: 4,
        repeat: -1,
      });
    }
    this.crow = {
      x: 490,
      y: 570,
      scale: 2.5,
      halfW: (48 * 2.5) / 2,
      halfH: 48 * 2.5,
      sprite: null,
      isDead: false,
      respawnDelayMs: 3000,
    };
    this.spawnCrow();

    this.createRainEffect();

    for (const char of CHARACTERS) {
      this.createGlowTexture(char.glowKey, char.glowColor);
    }

    const platformZones = [];
    for (const r of PLATFORM_RECTS) {
      const zone = this.add.zone(r.x + r.w / 2, r.y + r.h / 2, r.w, r.h);
      this.physics.add.existing(zone, true);
      platformZones.push(zone);
    }
    this.platformZones = platformZones;
    this.oneWayProcessCallback = (fallingObj, platformObj) => {
      const pbody = fallingObj.body;
      const tbody = platformObj.body;
      if (pbody.velocity.y < 0) return false;
      if (fallingObj.dropThroughUntil && this.time.now < fallingObj.dropThroughUntil) return false;
      const prevBottom = pbody.prev.y + pbody.height;
      return prevBottom <= tbody.y + 4;
    };

    this.anims.create({
      key: 'wood_idle',
      frames: this.anims.generateFrameNumbers('wood_idle', { start: 0, end: WOOD_IDLE_FRAMES - 1 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: 'wood_catch',
      frames: this.anims.generateFrameNumbers('wood_catch', { start: 0, end: WOOD_CATCH_FRAMES - 1 }),
      frameRate: 14,
      repeat: 0,
    });
    this.anims.create({
      key: 'hp_idle',
      frames: this.anims.generateFrameNumbers('hp_sheet', { start: 0, end: HP_IDLE_FRAMES - 1 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'hp_catch',
      frames: this.anims.generateFrameNumbers('hp_sheet', {
        start: HP_IDLE_FRAMES,
        end: HP_IDLE_FRAMES + HP_CATCH_FRAMES - 1,
      }),
      frameRate: 14,
      repeat: 0,
    });
    this.anims.create({
      key: 'heavens_fury',
      frames: this.anims.generateFrameNumbers('heavens_fury', {
        start: 0,
        end: HEAVENS_FURY_FRAMES - 1,
      }),
      frameRate: 24,
      repeat: 0,
    });
    this.anims.create({
      key: 'holy_shield',
      frames: this.anims.generateFrameNumbers('holy_shield', {
        start: 0,
        end: HOLY_SHIELD_FRAMES - 1,
      }),
      frameRate: HOLY_SHIELD_FRAMERATE,
      repeat: -1,
    });
    this.anims.create({
      key: 'skull_curse_fly',
      frames: this.anims.generateFrameNumbers('skull_curse', {
        start: 0,
        end: SKULL_CURSE_FLY_FRAMES - 1,
      }),
      frameRate: SKULL_CURSE_FLY_FRAMERATE,
      repeat: -1,
    });
    this.anims.create({
      key: 'skull_curse_hit',
      frames: this.anims.generateFrameNumbers('skull_curse', {
        start: SKULL_CURSE_FLY_FRAMES,
        end: SKULL_CURSE_FLY_FRAMES + SKULL_CURSE_HIT_FRAMES - 1,
      }),
      frameRate: SKULL_CURSE_HIT_FRAMERATE,
      repeat: 0,
    });
    this.anims.create({
      key: 'skull_curse_vfx',
      frames: this.anims.generateFrameNumbers('skull_curse_vfx', {
        start: 0,
        end: SKULL_CURSE_VFX_FRAMES - 1,
      }),
      frameRate: SKULL_CURSE_VFX_FRAMERATE,
      repeat: -1,
    });
    this.anims.create({
      key: 'wheel_roll',
      frames: this.anims.generateFrameNumbers('wheel', {
        frames: [2, 3],
      }),
      frameRate: WHEEL_FRAMERATE,
      repeat: -1,
    });
    this.anims.create({
      key: 'wheel_air',
      frames: this.anims.generateFrameNumbers('wheel', {
        frames: [0, 1],
      }),
      frameRate: WHEEL_FRAMERATE,
      repeat: -1,
    });
    this.anims.create({
      key: 'wheel_stun',
      frames: this.anims.generateFrameNumbers('stun_vfx', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'smite',
      frames: this.anims.generateFrameNumbers('smite', {
        start: 0,
        end: SMITE_FRAMES - 1,
      }),
      duration: HEAVENS_FURY_TELEGRAPH_MS,
      repeat: 0,
    });

    for (const char of CHARACTERS) {
      const keys = animKeysFor(char.id);
      this.anims.create({
        key: keys.idle,
        frames: this.anims.generateFrameNumbers(`${char.id}_idle`, { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1,
      });
      this.anims.create({
        key: keys.run,
        frames: this.anims.generateFrameNumbers(`${char.id}_run`, { start: 0, end: 3 }),
        frameRate: 12,
        repeat: -1,
      });
      this.anims.create({
        key: keys.jump,
        frames: this.anims.generateFrameNumbers(`${char.id}_jump`, { start: 0, end: 2 }),
        frameRate: 10,
        repeat: 0,
      });
      this.anims.create({
        key: keys.fall,
        frames: this.anims.generateFrameNumbers(`${char.id}_fall`, { start: 0, end: 2 }),
        frameRate: 10,
        repeat: 0,
      });
      this.anims.create({
        key: `${char.id}_death`,
        frames: this.anims.generateFrameNumbers(`${char.id}_death`, { start: 0, end: 2 }),
        frameRate: 5,
        repeat: 0,
      });
      for (const atkCfg of [keys.attackHorizontal, keys.attackUp, keys.attackDown]) {
        this.anims.create({
          key: atkCfg.animKey,
          frames: this.anims.generateFrameNumbers(atkCfg.spriteKey, {
            start: 0,
            end: atkCfg.frameCount - 1,
          }),
          frameRate: 18,
          repeat: 0,
        });
      }
    }

    this.fighters = [];
    const spawnPositions = [
      { x: 200, y: 100 },
      { x: 1100, y: 300 },
      { x: 600, y: 300 },
    ];
    const fighterCount = this.isMultiplayer ? 2 : CHARACTERS.length;
    for (let i = 0; i < fighterCount; i++) {
      const char = CHARACTERS[i];
      const pos = spawnPositions[i];
      const fighter = this.createFighter(char, pos.x, pos.y);
      this.fighters.push(fighter);
      this.physics.add.collider(
        fighter.sprite,
        platformZones,
        null,
        this.oneWayProcessCallback
      );
    }

    this.player = this.fighters[this.localFighterIndex].sprite;
    this.playerFighter = this.fighters[this.localFighterIndex];

    if (this.isMultiplayer) {
      this.remoteFighter = this.fighters[this.remoteFighterIndex];
      const rb = this.remoteFighter.sprite.body;
      rb.setAllowGravity(false);
      rb.setImmovable(true);
      this.network.onState((data) => this.handleNetState(data));
    }

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.switchKeys = this.input.keyboard.addKeys({
      one: Phaser.Input.Keyboard.KeyCodes.ONE,
      two: Phaser.Input.Keyboard.KeyCodes.TWO,
      three: Phaser.Input.Keyboard.KeyCodes.THREE,
    });

    this.input.mouse.disableContextMenu();
    this.attackQueued = false;
    this.powerQueued = false;
    this.input.on('pointerdown', (pointer) => {
      if (pointer.button === 2) {
        this.powerQueued = true;
      } else if (pointer.button === 0) {
        this.attackQueued = true;
      }
    });

    this.attackHitbox = this.add.rectangle(
      0,
      0,
      ATTACK_HITBOX_WIDTH,
      ATTACK_HITBOX_HEIGHT,
      0xff3344,
      0.35
    );
    this.physics.add.existing(this.attackHitbox);
    this.attackHitbox.body.allowGravity = false;
    this.attackHitbox.body.setImmovable(true);
    this.attackHitbox.body.enable = false;
    this.attackHitbox.setVisible(false);

    this.targetsHitThisAttack = new Set();

    this.jumpsRemaining = MAX_JUMPS;
    this.didDoubleJump = false;
    this.lastJumpTime = -Infinity;

    this.masterVolume = 0.05;
    this.bgmScale = 0.35;
    this.sfxScale = 1.4;
    this.bgm = this.sound.add('bgm', { loop: true, volume: this.masterVolume * this.bgmScale });
    if (this.sound.locked) {
      this.sound.once('unlocked', () => this.bgm.play());
    } else {
      this.bgm.play();
    }

    this.hitboxesVisible = this.physics.config.debug ?? false;
    const hitboxToggle = document.getElementById('hitbox-toggle');
    if (hitboxToggle) {
      const applyHitboxState = () => {
        this.physics.world.drawDebug = this.hitboxesVisible;
        if (this.physics.world.debugGraphic && !this.hitboxesVisible) {
          this.physics.world.debugGraphic.clear();
        }
        this.attackHitbox.fillAlpha = this.hitboxesVisible ? 0.35 : 0;
        hitboxToggle.textContent = `Hitbox: ${this.hitboxesVisible ? 'ON' : 'OFF'}`;
        hitboxToggle.classList.toggle('off', !this.hitboxesVisible);
      };
      applyHitboxState();
      hitboxToggle.addEventListener('click', () => {
        this.hitboxesVisible = !this.hitboxesVisible;
        applyHitboxState();
      });
    }

    const powerButtons = document.querySelectorAll('.dev-power-btn');
    const refreshPowerButtons = () => {
      const current = this.playerFighter?.specialPowers?.[0] ?? 'none';
      powerButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.power === current);
      });
    };
    powerButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!this.playerFighter) return;
        const selected = btn.dataset.power;
        if (selected === 'none') this.playerFighter.specialPowers = [];
        else this.playerFighter.specialPowers = [selected];
        refreshPowerButtons();
      });
    });
    this.refreshDevPowerButtons = refreshPowerButtons;
    refreshPowerButtons();

    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        const v = Number(e.target.value);
        this.masterVolume = v / 100;
        this.bgm.setVolume(this.masterVolume * this.bgmScale);
        if (volumeValue) volumeValue.textContent = `${v}%`;
      });
    }

    this.attackOrbs = [];
    this.orbSprites = [];
    this.resetAt = null;
    const orbsStartX = 20;
    const orbsY = 60;
    for (let i = 0; i < MAX_ATTACK_ORBS; i++) {
      this.attackOrbs.push(true);
      const orb = this.add.circle(
        orbsStartX + i * ORB_SPACING + ORB_RADIUS,
        orbsY,
        ORB_RADIUS,
        0x38bdf8
      );
      orb.setStrokeStyle(2, 0x0ea5e9);
      orb.setDepth(20);
      orb.setScrollFactor(0);
      this.orbSprites.push(orb);
    }

    const specialOrbCenterX =
      orbsStartX + MAX_ATTACK_ORBS * ORB_SPACING + ORB_RADIUS + 12;
    this.specialOrbSprite = this.add.circle(
      specialOrbCenterX,
      orbsY,
      SPECIAL_ORB_RADIUS,
      0xfde047
    )
      .setStrokeStyle(3, 0xca8a04)
      .setDepth(22)
      .setScrollFactor(0)
      .setVisible(false);
    this.specialOrbPulse = this.tweens.add({
      targets: this.specialOrbSprite,
      scale: 1.2,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      paused: true,
    });

    this.specialShieldSprite = this.add.image(
      specialOrbCenterX,
      orbsY,
      'shield_icon'
    )
      .setScale(HOLY_SHIELD_HUD_SCALE)
      .setDepth(22)
      .setScrollFactor(0)
      .setVisible(false);
    this.specialShieldPulse = this.tweens.add({
      targets: this.specialShieldSprite,
      scale: HOLY_SHIELD_HUD_SCALE * 1.15,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      paused: true,
    });

    this.specialSkullSprite = this.add.circle(
      specialOrbCenterX,
      orbsY,
      SPECIAL_ORB_RADIUS,
      0xa855f7
    )
      .setStrokeStyle(3, 0x6b21a8)
      .setDepth(22)
      .setScrollFactor(0)
      .setVisible(false);
    this.specialSkullPulse = this.tweens.add({
      targets: this.specialSkullSprite,
      scale: 1.2,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      paused: true,
    });

    this.skullProjectiles = [];

    this.specialWheelSprite = this.add.circle(
      specialOrbCenterX,
      orbsY,
      SPECIAL_ORB_RADIUS,
      0xffffff
    )
      .setStrokeStyle(3, 0x94a3b8)
      .setDepth(22)
      .setScrollFactor(0)
      .setVisible(false);
    this.specialWheelPulse = this.tweens.add({
      targets: this.specialWheelSprite,
      scale: 1.2,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      paused: true,
    });

    this.wheelProjectiles = [];

    const secondarySlotX = specialOrbCenterX + SPECIAL_ORB_RADIUS + 10;
    this.specialSlot2Sprite = this.add.circle(
      secondarySlotX,
      orbsY,
      SPECIAL_ORB_RADIUS * 0.6,
      0xffffff
    )
      .setStrokeStyle(2, 0x0f172a)
      .setDepth(22)
      .setScrollFactor(0)
      .setVisible(false);

    const activeShieldX = secondarySlotX + SPECIAL_ORB_RADIUS + 30;
    this.activeShieldSprite = this.add.image(
      activeShieldX,
      orbsY,
      'shield_icon'
    )
      .setScale(HOLY_SHIELD_HUD_SCALE)
      .setDepth(22)
      .setScrollFactor(0)
      .setVisible(false);
    this.activeShieldChargesText = this.add.text(
      activeShieldX + 18,
      orbsY + 10,
      '',
      { font: 'bold 14px sans-serif', color: '#ffffff', stroke: '#000000', strokeThickness: 3 }
    )
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(22)
      .setVisible(false);

    const hudBarWidth = 160;
    const hudBarHeight = 14;
    const hudBarX = 20;
    const hudBarY = 28;
    this.hudBarWidth = hudBarWidth;
    this.hudHpBg = this.add.rectangle(hudBarX, hudBarY, hudBarWidth, hudBarHeight, 0x1e293b)
      .setOrigin(0, 0.5).setScrollFactor(0).setDepth(20).setStrokeStyle(2, 0x0f172a);
    this.hudHpFill = this.add.rectangle(hudBarX + 1, hudBarY, hudBarWidth - 2, hudBarHeight - 4, 0x22c55e)
      .setOrigin(0, 0.5).setScrollFactor(0).setDepth(21);
    this.hudHpText = this.add.text(hudBarX + hudBarWidth + 8, hudBarY, '100%', {
      font: '13px sans-serif', color: '#ffffff',
    }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(21);

    const startingLives = this.isMultiplayer ? MULTIPLAYER_LIVES : STARTING_LIVES;
    this.hudLivesText = this.add.text(hudBarX, hudBarY + 50, `Vidas: ${startingLives}`, {
      font: 'bold 14px sans-serif', color: '#ffffff',
    }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(21);

    this.add.text(
      10,
      10,
      'A/D: andar  |  W/Espaço: pular (2x)  |  S: slam  |  botão esquerdo: ataque  |  botão direito: especial  |  1/2/3: trocar',
      { font: '14px sans-serif', color: '#ffffff' }
    ).setScrollFactor(0).setDepth(20);

    this.loots = [];
    this.scheduleNextLootSpawn(Phaser.Math.Between(1500, 3000));
  }

  scheduleNextLootSpawn(delayMs) {
    this.time.delayedCall(delayMs, () => {
      this.spawnLoot();
      this.scheduleNextLootSpawn(
        Phaser.Math.Between(LOOT_SPAWN_MIN_MS, LOOT_SPAWN_MAX_MS)
      );
    });
  }

  spawnLoot(typeKey) {
    if (this.loots.length >= LOOT_MAX_ACTIVE) return;
    const key = typeKey || (Phaser.Math.FloatBetween(0, 1) < 0.1 ? 'hp' : 'wood');
    const type = LOOT_TYPES[key];

    const margin = 40;
    const minClearance = 60;
    let x = 0;
    let y = 0;
    let found = false;
    for (let attempt = 0; attempt < 20; attempt++) {
      const rect = Phaser.Math.RND.pick(PLATFORM_RECTS);
      const candidateX = rect.x + Phaser.Math.Between(margin, Math.max(margin, rect.w - margin));
      const candidateY = rect.y - 80;
      let blocked = false;
      for (const f of this.fighters) {
        if (f.isDead) continue;
        const fx = f.sprite.body.x + f.sprite.body.width / 2;
        if (Math.abs(fx - candidateX) < minClearance) {
          blocked = true;
          break;
        }
      }
      if (!blocked) {
        x = candidateX;
        y = candidateY;
        found = true;
        break;
      }
    }
    if (!found) return;

    const glow = this.add.image(x, y, type.glowKey)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(DEFAULT_SPRITE_DEPTH - 1)
      .setScale(0.55);
    const glowPulse = this.tweens.add({
      targets: glow,
      scale: 0.75,
      alpha: 0.55,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    const loot = this.physics.add.sprite(x, y, type.idleKey, 0);
    loot.setScale(LOOT_SCALE);
    loot.setDepth(DEFAULT_SPRITE_DEPTH);
    loot.lootType = key;
    loot.glow = glow;
    loot.glowPulse = glowPulse;

    let overlayTint = 0xffffff;
    if (key === 'wood') {
      loot.power = Phaser.Math.RND.pick(WOOD_POWER_POOL);
      overlayTint = POWERS[loot.power].orbColor;
    }

    const tintOverlay = this.add.sprite(x, y, type.idleKey, 0)
      .setScale(LOOT_SCALE)
      .setDepth(DEFAULT_SPRITE_DEPTH + 0.5)
      .setTintFill(overlayTint)
      .setAlpha(0);
    tintOverlay.anims.play(type.idleKey);
    const whitePulse = this.tweens.add({
      targets: tintOverlay,
      alpha: 0.28,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    loot.tintOverlay = tintOverlay;
    loot.whitePulse = whitePulse;
    loot.body.setSize(LOOT_BODY_SIZE, LOOT_BODY_SIZE);
    loot.body.setOffset(
      (LOOT_FRAME_SIZE - LOOT_BODY_SIZE) / 2,
      (LOOT_FRAME_SIZE - LOOT_BODY_SIZE) / 2
    );
    loot.setCollideWorldBounds(true);
    loot.anims.play(type.idleKey);

    this.physics.add.collider(loot, this.platformZones, null, this.oneWayProcessCallback);

    loot.isPickedUp = false;
    const lifetimeMs = Phaser.Math.Between(LOOT_LIFETIME_MIN_MS, LOOT_LIFETIME_MAX_MS);
    loot.lifetimeTimer = this.time.delayedCall(lifetimeMs, () => this.despawnLoot(loot));

    this.loots.push(loot);
  }

  despawnLoot(loot) {
    if (!loot.active || loot.isPickedUp) return;
    if (loot.whitePulse) loot.whitePulse.stop();
    this.tweens.add({
      targets: [loot, loot.glow, loot.tintOverlay].filter(Boolean),
      alpha: 0,
      duration: 400,
      onComplete: () => {
        this.removeLoot(loot);
      },
    });
  }

  pickupLoot(loot, fighter) {
    if (loot.isPickedUp) return;
    loot.isPickedUp = true;
    this.triggerPickupFlash(fighter);
    if (loot.lootType === 'wood') this.playSfx('sfx_power_pickup', 1, 0.4);
    else if (loot.lootType === 'hp') this.playSfx('sfx_cure', 0.6, 0.3);
    const type = LOOT_TYPES[loot.lootType];
    type.onPickup(this, fighter, loot);
    if (loot.lootType === 'hp' && fighter === this.playerFighter) {
      this.resetAttackOrbs();
    }
    if (loot.lifetimeTimer) loot.lifetimeTimer.remove(false);
    loot.body.enable = false;
    if (loot.glowPulse) loot.glowPulse.stop();
    if (loot.whitePulse) loot.whitePulse.stop();
    this.tweens.add({
      targets: [loot.glow, loot.tintOverlay].filter(Boolean),
      alpha: 0,
      duration: 200,
    });
    loot.anims.play(type.catchKey);
    loot.once(`animationcomplete-${type.catchKey}`, () => {
      this.removeLoot(loot);
    });
  }

  removeLoot(loot) {
    const idx = this.loots.indexOf(loot);
    if (idx !== -1) this.loots.splice(idx, 1);
    if (loot.glowPulse) loot.glowPulse.stop();
    if (loot.whitePulse) loot.whitePulse.stop();
    if (loot.glow) loot.glow.destroy();
    if (loot.tintOverlay) loot.tintOverlay.destroy();
    loot.destroy();
  }

  createFighter(char, x, y) {
    const keys = animKeysFor(char.id);
    const sprite = this.physics.add.sprite(x, y, `${char.id}_idle`, 0);
    sprite.setScale(SPRITE_SCALE);
    sprite.setDepth(DEFAULT_SPRITE_DEPTH);
    sprite.setCollideWorldBounds(true);
    sprite.body.setSize(BODY_WIDTH, BODY_HEIGHT);
    sprite.body.setOffset(BODY_OFFSET_X, BODY_OFFSET_Y);

    const flashSprite = this.add.sprite(0, 0, `${char.id}_idle`, 0)
      .setScale(SPRITE_SCALE)
      .setTintFill(0xffffff)
      .setAlpha(0)
      .setDepth(10);

    const hitFlashSprite = this.add.sprite(0, 0, `${char.id}_idle`, 0)
      .setScale(SPRITE_SCALE)
      .setTintFill(0xff2222)
      .setAlpha(0)
      .setDepth(9);

    const pickupFlashSprite = this.add.sprite(0, 0, `${char.id}_idle`, 0)
      .setScale(SPRITE_SCALE)
      .setTintFill(char.tintColor)
      .setAlpha(0)
      .setDepth(8);

    const glow = this.add.image(0, 0, char.glowKey)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(0);

    const hpBarWidth = 60;
    const hpBarHeight = 6;
    const hpBarBg = this.add.rectangle(0, 0, hpBarWidth, hpBarHeight, 0x1e293b)
      .setOrigin(0.5, 0.5).setDepth(15).setStrokeStyle(1, 0x0f172a);
    const hpBarFill = this.add.rectangle(0, 0, hpBarWidth - 2, hpBarHeight - 2, 0x22c55e)
      .setOrigin(0, 0.5).setDepth(16);

    const fighter = {
      char,
      sprite,
      keys,
      flashSprite,
      hitFlashSprite,
      pickupFlashSprite,
      glow,
      isInvulnerable: false,
      isDead: false,
      hp: MAX_HP,
      lives: this.isMultiplayer ? MULTIPLAYER_LIVES : STARTING_LIVES,
      hpBarBg,
      hpBarFill,
      hpBarWidth,
      isAttacking: false,
      attackSpriteShift: 0,
      currentAttackAnim: keys.attackHorizontal,
      specialPowers: [],
      shieldCharges: 0,
      shieldAnimSprite: null,
      shieldGoldSprite: null,
      shieldPulseTween: null,
      curseMultiplier: 1,
      curseTimer: null,
      curseTintSprite: null,
      cursePulseTween: null,
      curseVfxSprite: null,
      isStunned: false,
      stunTimer: null,
      stunTintSprite: null,
      stunPulseTween: null,
      stunVfxSprite: null,
      stunShakeTween: null,
    };

    for (const atkCfg of [keys.attackHorizontal, keys.attackUp, keys.attackDown]) {
      sprite.on(`animationcomplete-${atkCfg.animKey}`, () => {
        fighter.isAttacking = false;
        sprite.setDepth(DEFAULT_SPRITE_DEPTH);
        if (fighter === this.playerFighter) {
          this.attackHitbox.body.enable = false;
          this.attackHitbox.setVisible(false);
          this.targetsHitThisAttack.clear();
        }
        sprite.x -= fighter.attackSpriteShift;
        fighter.attackSpriteShift = 0;
      });
    }

    return fighter;
  }

  damageFighter(fighter, amount, opts) {
    if (fighter.isInvulnerable || fighter.isDead) return;
    const ignoreShield = !!(opts && opts.ignoreShield);
    let finalAmount = amount * (fighter.curseMultiplier || 1);
    if (!ignoreShield && fighter.shieldCharges > 0) {
      finalAmount = finalAmount * SHIELD_DAMAGE_MULTIPLIER;
      fighter.shieldCharges -= 1;
      if (fighter.shieldCharges <= 0) {
        this.playSfx('sfx_shield_break');
        this.removeShield(fighter);
      }
    }
    fighter.hp = Math.max(0, fighter.hp - finalAmount);
    this.triggerHitFlash(fighter);
    if (fighter.hp <= 0) {
      this.killFighter(fighter);
    } else if (fighter.isStunned) {
      fighter.stunHitsRemaining = (fighter.stunHitsRemaining ?? 1) - 1;
      if (fighter.stunHitsRemaining <= 0) this.removeStun(fighter);
    }
  }

  resetAttackOrbs() {
    for (let i = 0; i < this.attackOrbs.length; i++) this.attackOrbs[i] = true;
    this.resetAt = null;
  }

  applyShield(fighter) {
    this.removeShield(fighter);
    this.playSfx('sfx_shield_cast');
    fighter.shieldCharges = SHIELD_CHARGES;

    const body = fighter.sprite.body;
    const cx = body.x + body.width / 2;
    const cy = body.y + body.height / 2;

    fighter.shieldAnimSprite = this.add.sprite(cx, cy, 'holy_shield', 0)
      .setScale(HOLY_SHIELD_SCALE)
      .setDepth(ATTACKER_DEPTH + 0.5);
    fighter.shieldAnimSprite.play('holy_shield');

    fighter.shieldGoldSprite = this.add.sprite(
      fighter.sprite.x,
      fighter.sprite.y,
      fighter.sprite.texture.key,
      fighter.sprite.frame.name
    )
      .setScale(SPRITE_SCALE)
      .setTintFill(0xffffff)
      .setAlpha(0.15)
      .setDepth(DEFAULT_SPRITE_DEPTH + 0.3)
      .setFlipX(fighter.sprite.flipX);

    fighter.shieldPulseTween = this.tweens.add({
      targets: fighter.shieldGoldSprite,
      alpha: 0.45,
      duration: SHIELD_PULSE_MS,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  removeShield(fighter) {
    fighter.shieldCharges = 0;
    if (fighter.shieldPulseTween) {
      fighter.shieldPulseTween.stop();
      fighter.shieldPulseTween = null;
    }
    if (fighter.shieldAnimSprite) {
      fighter.shieldAnimSprite.destroy();
      fighter.shieldAnimSprite = null;
    }
    if (fighter.shieldGoldSprite) {
      fighter.shieldGoldSprite.destroy();
      fighter.shieldGoldSprite = null;
    }
  }

  spawnDeathMarker(fighter) {
    if (fighter.sprite.y > MAP_HEIGHT + 100) return;
    const marker = this.add.sprite(
      fighter.sprite.x,
      fighter.sprite.y,
      `${fighter.char.id}_death`,
      0
    )
      .setScale(SPRITE_SCALE)
      .setDepth(DEFAULT_SPRITE_DEPTH - 1)
      .setFlipX(fighter.sprite.flipX);
    marker.play(`${fighter.char.id}_death`);
    marker.once('animationcomplete', () => {
      this.tweens.add({
        targets: marker,
        alpha: 0,
        duration: 1000,
        onComplete: () => marker.destroy(),
      });
    });
  }

  triggerHitFlash(fighter) {
    this.tweens.killTweensOf(fighter.hitFlashSprite);
    fighter.hitFlashSprite.setAlpha(1);
    this.tweens.add({
      targets: fighter.hitFlashSprite,
      alpha: 0,
      duration: HIT_FLASH_DURATION_MS,
    });
  }

  fireWheel(fighter, pointerWorldX) {
    const body = fighter.sprite.body;
    const startX = body.x + body.width / 2;
    const startY = body.y + body.height / 2;
    const dir = pointerWorldX >= startX ? 1 : -1;

    const bodyW = WHEEL_BODY_W * WHEEL_SCALE;
    const bodyH = WHEEL_BODY_H * WHEEL_SCALE;
    const phys = this.add.rectangle(startX, startY, bodyW, bodyH, 0xff0000, 0);
    this.physics.add.existing(phys);
    phys.body.setAllowGravity(true);
    phys.body.setBounce(1, 0.25);
    phys.body.setCollideWorldBounds(true);
    phys.body.setVelocity(WHEEL_SPEED * dir, -360);

    const visual = this.add.sprite(startX, startY + WHEEL_VISUAL_Y_OFFSET, 'wheel', 0);
    visual.setScale(WHEEL_SCALE);
    visual.setDepth(ATTACKER_DEPTH);
    const flipped = dir > 0;
    visual.setFlipX(flipped);
    visual.setOrigin(
      flipped
        ? 1 - WHEEL_BALL_LOCAL_X / WHEEL_FRAME_W
        : WHEEL_BALL_LOCAL_X / WHEEL_FRAME_W,
      WHEEL_BALL_LOCAL_Y / WHEEL_FRAME_H
    );
    visual.play('wheel_air');

    phys.visual = visual;
    phys.ownerFighter = fighter;
    phys.hasHit = false;
    phys.direction = dir;

    phys.platformCollider = this.physics.add.collider(
      phys,
      this.platformZones,
      null,
      this.oneWayProcessCallback
    );

    this.wheelProjectiles.push(phys);
  }

  createWheelExplosion(x, y) {
    const ring = this.add.circle(x, y, 22, 0xffffff, 0.85)
      .setDepth(ATTACKER_DEPTH + 0.5)
      .setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({
      targets: ring,
      scale: 4,
      alpha: 0,
      duration: 420,
      ease: 'Cubic.easeOut',
      onComplete: () => ring.destroy(),
    });
    for (let i = 0; i < 8; i++) {
      const puff = this.add.circle(x, y, 7, 0xdddddd, 0.7)
        .setDepth(ATTACKER_DEPTH + 0.4);
      const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.6;
      const dist = 35 + Math.random() * 30;
      this.tweens.add({
        targets: puff,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist - 10,
        alpha: 0,
        scale: 2.2,
        duration: 380,
        ease: 'Cubic.easeOut',
        onComplete: () => puff.destroy(),
      });
    }
  }

  applyStun(fighter) {
    fighter.isStunned = true;
    fighter.stunHitsRemaining = WHEEL_STUN_HITS;
    if (fighter.stunTimer) fighter.stunTimer.remove(false);
    fighter.sprite.body.setVelocityX(0);
    if (!fighter.stunVfxSprite) {
      const fb = fighter.sprite.body;
      fighter.stunVfxSprite = this.add.sprite(
        fb.x + fb.width / 2,
        fb.y - 4,
        'stun_vfx',
        0
      )
        .setScale(1.2)
        .setDepth(DEFAULT_SPRITE_DEPTH + 0.6)
        .play('wheel_stun');
    }
    if (!fighter.stunShakeTween) {
      fighter.stunShakeTween = this.tweens.add({
        targets: fighter.sprite,
        angle: { from: -1.5, to: 1.5 },
        duration: 140,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }
    fighter.stunTimer = this.time.delayedCall(WHEEL_STUN_MS, () => {
      this.removeStun(fighter);
    });
  }

  removeStun(fighter) {
    fighter.isStunned = false;
    if (fighter.stunTimer) {
      fighter.stunTimer.remove(false);
      fighter.stunTimer = null;
    }
    if (fighter.stunPulseTween) {
      fighter.stunPulseTween.stop();
      fighter.stunPulseTween = null;
    }
    if (fighter.stunTintSprite) {
      fighter.stunTintSprite.destroy();
      fighter.stunTintSprite = null;
    }
    if (fighter.stunVfxSprite) {
      fighter.stunVfxSprite.destroy();
      fighter.stunVfxSprite = null;
    }
    if (fighter.stunShakeTween) {
      fighter.stunShakeTween.stop();
      fighter.stunShakeTween = null;
    }
    if (fighter.sprite) fighter.sprite.setAngle(0);
  }

  spawnCrow() {
    const crow = this.crow;
    const sprite = this.add.sprite(crow.x, crow.y, 'map1_crow')
      .setOrigin(0.5, 1)
      .setScale(crow.scale)
      .setDepth(-0.9)
      .play('map1_crow_idle');
    crow.sprite = sprite;
    crow.isDead = false;

    const flash = this.add.sprite(crow.x, crow.y, 'map1_crow', 0)
      .setOrigin(0.5, 1)
      .setScale(crow.scale)
      .setDepth(-0.85)
      .setTintFill(0xffffff)
      .setAlpha(1);
    this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 500,
      ease: 'Cubic.easeOut',
      onComplete: () => flash.destroy(),
    });
  }

  killCrow() {
    const crow = this.crow;
    if (!crow || crow.isDead || !crow.sprite) return;
    crow.isDead = true;
    this.playSfx('sfx_hit');
    this.playSfx('sfx_crow_die', 0.5);
    const sprite = crow.sprite;
    sprite.anims.stop();
    sprite.setFrame(15);
    this.tweens.add({
      targets: sprite,
      y: sprite.y - 60,
      alpha: 0,
      angle: -25,
      duration: 600,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        sprite.destroy();
        crow.sprite = null;
      },
    });
    this.time.delayedCall(crow.respawnDelayMs, () => this.spawnCrow());
  }

  isCrowHitByRect(left, right, top, bottom) {
    const crow = this.crow;
    if (!crow || crow.isDead || !crow.sprite) return false;
    const cLeft = crow.x - crow.halfW;
    const cRight = crow.x + crow.halfW;
    const cTop = crow.y - crow.halfH;
    const cBottom = crow.y;
    return right > cLeft && left < cRight && bottom > cTop && top < cBottom;
  }

  triggerPowerFlash(fighter, color) {
    const flash = this.add.sprite(
      fighter.sprite.x,
      fighter.sprite.y,
      fighter.sprite.texture.key,
      fighter.sprite.frame.name
    )
      .setScale(SPRITE_SCALE)
      .setTintFill(color)
      .setAlpha(0.9)
      .setDepth(DEFAULT_SPRITE_DEPTH + 0.6)
      .setFlipX(fighter.sprite.flipX);
    this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 320,
      onComplete: () => flash.destroy(),
    });
  }

  triggerPickupFlash(fighter) {
    this.tweens.killTweensOf(fighter.pickupFlashSprite);
    fighter.pickupFlashSprite.setAlpha(0.85);
    this.tweens.add({
      targets: fighter.pickupFlashSprite,
      alpha: 0,
      duration: PICKUP_FLASH_DURATION_MS,
    });
  }

  killFighter(fighter) {
    if (fighter.isDead) return;
    fighter.isDead = true;
    fighter.lives = Math.max(0, fighter.lives - 1);
    fighter.specialPowers = [];
    this.removeShield(fighter);
    this.removeSkullCurse(fighter);
    this.removeStun(fighter);

    this.spawnDeathMarker(fighter);

    fighter.sprite.setVisible(false);
    fighter.sprite.body.enable = false;
    fighter.sprite.body.setVelocity(0, 0);
    fighter.sprite.setDepth(DEFAULT_SPRITE_DEPTH);
    fighter.hpBarBg.setVisible(false);
    fighter.hpBarFill.setVisible(false);
    fighter.glow.setVisible(false);
    fighter.flashSprite.setAlpha(0);
    fighter.hitFlashSprite.setAlpha(0);
    fighter.pickupFlashSprite.setAlpha(0);
    this.tweens.killTweensOf(fighter.flashSprite);
    this.tweens.killTweensOf(fighter.hitFlashSprite);
    this.tweens.killTweensOf(fighter.pickupFlashSprite);

    if (fighter === this.playerFighter) {
      fighter.isAttacking = false;
      this.attackHitbox.body.enable = false;
      this.attackHitbox.setVisible(false);
      this.targetsHitThisAttack.clear();
      fighter.attackSpriteShift = 0;
    }

    if (this.isMultiplayer && fighter.lives <= 0) {
      this.checkMatchOver();
      return;
    }

    this.time.delayedCall(RESPAWN_DELAY_MS, () => {
      this.respawnFighter(fighter);
    });
  }

  checkMatchOver() {
    if (!this.isMultiplayer || this.matchOver) return;
    const alive = this.fighters.filter((f) => f.lives > 0);
    if (alive.length > 1) return;
    this.matchOver = true;
    const winner = alive[0] ?? null;
    const isLocalWinner = winner === this.playerFighter;
    const label = winner
      ? (isLocalWinner ? 'Você venceu!' : 'Você perdeu')
      : 'Empate';
    const cam = this.cameras.main;
    this.add.rectangle(cam.width / 2, cam.height / 2, cam.width, cam.height, 0x000000, 0.55)
      .setScrollFactor(0).setDepth(100);
    this.add.text(cam.width / 2, cam.height / 2, label, {
      font: 'bold 64px sans-serif',
      color: isLocalWinner ? '#22c55e' : '#ef4444',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(101);
    this.add.text(cam.width / 2, cam.height / 2 + 60, 'Atualize a página para jogar de novo', {
      font: '20px sans-serif',
      color: '#ffffff',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(101);
  }

  respawnFighter(fighter) {
    const rect = Phaser.Math.RND.pick(PLATFORM_RECTS);
    const spawnX = rect.x + rect.w / 2;
    const spawnY = rect.y - 100;

    fighter.sprite.setPosition(spawnX, spawnY);
    fighter.sprite.body.enable = true;
    fighter.sprite.body.setVelocity(0, 0);
    fighter.sprite.setVisible(true);
    fighter.hp = MAX_HP;
    fighter.isDead = false;
    fighter.hpBarBg.setVisible(true);
    fighter.hpBarFill.setVisible(true);
    fighter.glow.setVisible(true);

    if (fighter === this.playerFighter) {
      this.jumpsRemaining = MAX_JUMPS;
      this.didDoubleJump = false;
    }

    fighter.isInvulnerable = true;
    this.time.delayedCall(INVULN_DURATION_MS, () => {
      fighter.isInvulnerable = false;
    });

    this.tweens.killTweensOf(fighter.flashSprite);
    fighter.flashSprite.setAlpha(1);
    this.tweens.add({
      targets: fighter.flashSprite,
      alpha: 0,
      duration: INVULN_DURATION_MS,
    });
  }

  findSurfaceBelow(x, y) {
    let best = MAP_HEIGHT + 60;
    for (const rect of PLATFORM_RECTS) {
      if (x < rect.x || x > rect.x + rect.w) continue;
      if (rect.y < y) continue;
      if (rect.y < best) best = rect.y;
    }
    return best;
  }

  playSfx(key, volumeMultiplier = 1, seek = 0) {
    if (!this.cache.audio.exists(key)) return;
    this.sound.play(key, {
      volume: this.masterVolume * this.sfxScale * volumeMultiplier,
      seek,
    });
  }

  firePower(fighter, worldX, worldY) {
    const powerKey = fighter.specialPowers[0];
    const surfaceY = this.findSurfaceBelow(worldX, worldY);
    const beamHeight = Math.max(0, surfaceY);

    this.playSfx('sfx_heavens_fury_cast');

    const telegraph = this.add.sprite(worldX, surfaceY, 'smite', 0)
      .setOrigin(0.5, 1)
      .setScale(SMITE_SCALE)
      .setDepth(ATTACKER_DEPTH);
    telegraph.play('smite');

    const telegraphCore = this.add.rectangle(worldX, 0, 14, beamHeight, 0xfff6c8, 1)
      .setOrigin(0.5, 0)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(ATTACKER_DEPTH)
      .setAlpha(0.1);
    const telegraphGlow = this.add.rectangle(worldX, 0, 60, beamHeight, 0xffd56b, 1)
      .setOrigin(0.5, 0)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(ATTACKER_DEPTH)
      .setAlpha(0.1);

    this.time.delayedCall(HEAVENS_FURY_TELEGRAPH_MS, () => {
      telegraph.destroy();
      telegraphCore.destroy();
      telegraphGlow.destroy();
      this.executeHeavensStrike(fighter, worldX, surfaceY);
    });
  }

  fireSkullCurse(fighter, pointerWorldX, pointerWorldY) {
    this.playSfx('sfx_skull_cast', 1.6);
    const body = fighter.sprite.body;
    const startX = body.x + body.width / 2;
    const startY = body.y + body.height / 2;
    const dx = pointerWorldX - startX;
    const dy = (pointerWorldY ?? startY) - startY;
    const angle = Math.atan2(dy, dx);
    const dir = Math.cos(angle) >= 0 ? 1 : -1;
    const vx = Math.cos(angle) * SKULL_CURSE_SPEED;
    const vy = Math.sin(angle) * SKULL_CURSE_SPEED;

    const aura = this.add.image(startX, startY, 'glow_purple')
      .setBlendMode(Phaser.BlendModes.ADD)
      .setScale(0.7)
      .setDepth(ATTACKER_DEPTH - 0.1)
      .setAlpha(0.8);
    const auraPulse = this.tweens.add({
      targets: aura,
      scale: 0.85,
      alpha: 0.55,
      duration: 260,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    const projectile = this.physics.add.sprite(startX, startY, 'skull_curse', 0);
    projectile.setScale(SKULL_CURSE_SCALE);
    projectile.setDepth(ATTACKER_DEPTH);
    projectile.setFlipX(dir < 0);
    projectile.setRotation(dir < 0 ? angle - Math.PI : angle);
    projectile.body.allowGravity = false;
    projectile.body.setSize(SKULL_CURSE_BODY_W, SKULL_CURSE_BODY_H, true);
    projectile.body.setVelocity(vx, vy);
    projectile.setCollideWorldBounds(false);
    projectile.ownerFighter = fighter;
    projectile.hasHit = false;
    projectile.direction = dir;
    projectile.aura = aura;
    projectile.auraPulse = auraPulse;
    projectile.play('skull_curse_fly');

    this.skullProjectiles.push(projectile);
  }

  applySkullCurse(target) {
    target.curseMultiplier = SKULL_CURSE_DEBUFF_MULTIPLIER;
    if (target.curseTimer) target.curseTimer.remove(false);
    target.curseTimer = this.time.delayedCall(SKULL_CURSE_DEBUFF_DURATION_MS, () => {
      this.removeSkullCurse(target);
    });
    if (!target.curseTintSprite) {
      target.curseTintSprite = this.add.sprite(
        target.sprite.x,
        target.sprite.y,
        target.sprite.texture.key,
        target.sprite.frame.name
      )
        .setScale(SPRITE_SCALE)
        .setTintFill(0xa855f7)
        .setAlpha(0.15)
        .setDepth(DEFAULT_SPRITE_DEPTH + 0.4)
        .setFlipX(target.sprite.flipX);
      target.cursePulseTween = this.tweens.add({
        targets: target.curseTintSprite,
        alpha: 0.75,
        duration: 260,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }
    if (!target.curseVfxSprite) {
      target.curseVfxSprite = this.add.sprite(
        target.sprite.x,
        target.sprite.y,
        'skull_curse_vfx',
        0
      )
        .setScale(SKULL_CURSE_VFX_SCALE)
        .setDepth(DEFAULT_SPRITE_DEPTH + 0.5)
        .setBlendMode(Phaser.BlendModes.ADD);
      target.curseVfxSprite.play('skull_curse_vfx');
    }
    if (!target.curseHitSound && this.cache.audio.exists('sfx_skull_hit')) {
      target.curseHitSound = this.sound.add('sfx_skull_hit', {
        loop: true,
        volume: this.masterVolume * this.sfxScale,
      });
      target.curseHitSound.play();
    }
  }

  removeSkullCurse(target) {
    target.curseMultiplier = 1;
    if (target.curseTimer) {
      target.curseTimer.remove(false);
      target.curseTimer = null;
    }
    if (target.cursePulseTween) {
      target.cursePulseTween.stop();
      target.cursePulseTween = null;
    }
    if (target.curseTintSprite) {
      target.curseTintSprite.destroy();
      target.curseTintSprite = null;
    }
    if (target.curseVfxSprite) {
      target.curseVfxSprite.destroy();
      target.curseVfxSprite = null;
    }
    if (target.curseHitSound) {
      target.curseHitSound.stop();
      target.curseHitSound.destroy();
      target.curseHitSound = null;
    }
  }

  executeHeavensStrike(fighter, worldX, surfaceY) {
    this.playSfx('sfx_heavens_fury_second');
    const beamCoreHeight = Math.max(0, surfaceY);
    const beamCore = this.add.rectangle(
      worldX,
      0,
      26,
      beamCoreHeight,
      0xfff6c8,
      1
    )
      .setOrigin(0.5, 0)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(ATTACKER_DEPTH)
      .setAlpha(0);
    const beamGlow = this.add.rectangle(
      worldX,
      0,
      90,
      beamCoreHeight,
      0xffd56b,
      0.45
    )
      .setOrigin(0.5, 0)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(ATTACKER_DEPTH)
      .setAlpha(0);

    this.tweens.add({
      targets: [beamCore, beamGlow],
      alpha: { from: 0, to: 1 },
      duration: 80,
      yoyo: true,
      hold: 180,
      onComplete: () => {
        beamCore.destroy();
        beamGlow.destroy();
      },
    });

    const sprite = this.add.sprite(worldX, surfaceY, 'heavens_fury', 0)
      .setOrigin(0.5, 1)
      .setScale(HEAVENS_FURY_SCALE)
      .setDepth(ATTACKER_DEPTH + 1);
    sprite.damageDealt = false;
    sprite.play('heavens_fury');

    sprite.on('animationupdate', (anim, frame) => {
      if (sprite.damageDealt) return;
      if (
        frame.index - 1 >= HEAVENS_FURY_IMPACT_FRAME_START &&
        frame.index - 1 <= HEAVENS_FURY_IMPACT_FRAME_END
      ) {
        sprite.damageDealt = true;
        if (!this.isAuthoritativeOwner(fighter)) return;
        const groundTop = surfaceY - HEAVENS_FURY_GROUND_ZONE_HEIGHT;
        const groundBottom = surfaceY + 40;
        for (const target of this.fighters) {
          if (target === fighter) continue;
          if (target.isInvulnerable || target.isDead) continue;
          const tx = target.sprite.body.x + target.sprite.body.width / 2;
          const ty = target.sprite.body.y + target.sprite.body.height / 2;
          const dx = Math.abs(tx - worldX);
          const inGroundZone = ty >= groundTop && ty <= groundBottom;
          if (inGroundZone && dx <= HEAVENS_FURY_STRIKE_HALF_WIDTH) {
            this.dealHit(target, {
              damage: MAX_HP,
              ignoreShield: true,
              powerFlashColor: POWERS.heavens_fury.orbColor,
            });
          } else if (
            ty < groundTop &&
            ty >= 0 &&
            dx <= HEAVENS_FURY_BEAM_HALF_WIDTH
          ) {
            this.dealHit(target, {
              damage: MAX_HP,
              ignoreShield: true,
              powerFlashColor: POWERS.heavens_fury.orbColor,
            });
          }
        }
        const crow = this.crow;
        if (crow && !crow.isDead && crow.sprite) {
          const cx = crow.x;
          const cy = crow.y - crow.halfH / 2;
          const dx = Math.abs(cx - worldX);
          const inGroundZone = cy >= groundTop && cy <= groundBottom;
          if (
            (inGroundZone && dx <= HEAVENS_FURY_STRIKE_HALF_WIDTH) ||
            (cy < groundTop && cy >= 0 && dx <= HEAVENS_FURY_BEAM_HALF_WIDTH)
          ) {
            this.killCrow();
          }
        }
      }
    });
    sprite.once('animationcomplete', () => sprite.destroy());
  }

  applyIncomingHit(target, hit) {
    if (!target || target.isDead) return;
    if (hit.breakShield && target.shieldCharges > 0) {
      this.playSfx('sfx_shield_break');
      this.removeShield(target);
    }
    this.damageFighter(target, hit.damage, { ignoreShield: !!hit.ignoreShield });
    if (!target.isDead) {
      if (hit.knockbackX) {
        target.sprite.body.setVelocityX(hit.knockbackX);
        this.time.delayedCall(120, () => {
          if (target.sprite && target.sprite.body) {
            target.sprite.body.setVelocityX(0);
          }
        });
      }
      if (hit.knockupY) target.sprite.body.setVelocityY(hit.knockupY);
      if (hit.stun) this.applyStun(target);
      if (hit.curse) this.applySkullCurse(target);
    }
    if (hit.powerFlashColor !== null && hit.powerFlashColor !== undefined) {
      this.triggerPowerFlash(target, hit.powerFlashColor);
    }
  }

  dealHit(target, hit) {
    if (hit.playHitSfx) this.playSfx('sfx_hit');
    if (this.isMultiplayer && target === this.remoteFighter) {
      this.network.send({ type: 'hit', ...hit });
      return;
    }
    this.applyIncomingHit(target, hit);
  }

  isAuthoritativeOwner(fighter) {
    return !this.isMultiplayer || fighter === this.playerFighter;
  }

  sendPowerCast(power, params) {
    if (!this.network || !this.network.isConnected) return;
    this.network.send({ type: 'power_cast', power, ...params });
  }

  syncNetwork(time) {
    if (!this.network || !this.network.isConnected) return;
    if (!this._lastNetSend) this._lastNetSend = 0;
    if (time - this._lastNetSend < 33) return;
    this._lastNetSend = time;
    const f = this.playerFighter;
    const sprite = f.sprite;
    const currentAnim = sprite.anims.currentAnim?.key ?? f.keys.idle;
    this.network.send({
      type: 'state',
      x: sprite.x - (f.attackSpriteShift || 0),
      y: sprite.y,
      flipX: sprite.flipX,
      anim: currentAnim,
      frame: sprite.anims.currentFrame?.index ?? 0,
      hp: f.hp,
      lives: f.lives,
      shielded: f.shieldCharges > 0,
    });
  }

  handleNetState(data) {
    if (!data) return;
    if (data.type === 'hit') {
      if (data.playHitSfx) this.playSfx('sfx_hit');
      this.applyIncomingHit(this.playerFighter, data);
      return;
    }
    if (data.type === 'power_cast') {
      if (!this.remoteFighter) return;
      if (data.power === 'heavens_fury') {
        this.firePower(this.remoteFighter, data.worldX, data.worldY);
      } else if (data.power === 'shield') {
        this.applyShield(this.remoteFighter);
      } else if (data.power === 'skull_curse') {
        this.fireSkullCurse(this.remoteFighter, data.worldX, data.worldY);
      } else if (data.power === 'wheel') {
        this.fireWheel(this.remoteFighter, data.worldX);
      }
      return;
    }
    if (data.type !== 'state') return;
    if (!this.remoteFighter) return;
    const sprite = this.remoteFighter.sprite;
    sprite.setPosition(data.x, data.y);
    sprite.setFlipX(!!data.flipX);
    const body = sprite.body;
    body.offset.x = data.flipX
      ? FRAME_WIDTH - BODY_OFFSET_X - BODY_WIDTH
      : BODY_OFFSET_X;
    body.setVelocity(0, 0);
    if (data.anim && sprite.anims.currentAnim?.key !== data.anim) {
      sprite.anims.play(data.anim, true);
    }
    if (typeof data.hp === 'number') {
      this.remoteFighter.hp = data.hp;
    }
    if (typeof data.lives === 'number') {
      this.remoteFighter.lives = data.lives;
      this.checkMatchOver();
    }
    const hasShieldVisual = !!this.remoteFighter.shieldAnimSprite;
    if (data.shielded === false && hasShieldVisual) {
      this.removeShield(this.remoteFighter);
    }
  }

  setControlledFighter(index) {
    const next = this.fighters[index];
    if (!next || next === this.playerFighter || next.isDead) return;

    const prev = this.playerFighter;
    if (prev) {
      if (prev.isAttacking) {
        prev.sprite.x -= prev.attackSpriteShift;
        prev.attackSpriteShift = 0;
        prev.isAttacking = false;
        prev.sprite.setDepth(DEFAULT_SPRITE_DEPTH);
      }
      prev.sprite.body.setVelocityX(0);
      prev.sprite.body.offset.x = prev.sprite.flipX
        ? FRAME_WIDTH - BODY_OFFSET_X - BODY_WIDTH
        : BODY_OFFSET_X;
      prev.sprite.anims.play(prev.keys.idle, true);
    }

    this.attackHitbox.body.enable = false;
    this.attackHitbox.setVisible(false);
    this.targetsHitThisAttack.clear();

    this.playerFighter = next;
    this.player = next.sprite;
    this.jumpsRemaining = MAX_JUMPS;
    this.didDoubleJump = false;
    this.lastJumpTime = -Infinity;
    this.attackQueued = false;
    this.powerQueued = false;
  }

  update(time, delta) {
    if (!this.isMultiplayer) {
      if (Phaser.Input.Keyboard.JustDown(this.switchKeys.one)) this.setControlledFighter(0);
      else if (Phaser.Input.Keyboard.JustDown(this.switchKeys.two)) this.setControlledFighter(1);
      else if (Phaser.Input.Keyboard.JustDown(this.switchKeys.three)) this.setControlledFighter(2);
    }

    if (this.isMultiplayer) {
      this.syncNetwork(time);
    }

    const fighter = this.playerFighter;
    const body = this.player.body;

    for (const f of this.fighters) {
      if (!f.isDead && f.sprite.y > MAP_HEIGHT + 100) {
        this.killFighter(f);
      }
    }

    if (!fighter.isDead && !fighter.isStunned) {
      const leftDown = this.keys.left.isDown;
      const rightDown = this.keys.right.isDown;

      let desiredFlip = this.player.flipX;

      if (leftDown && !rightDown) {
        body.setVelocityX(-MOVE_SPEED);
        desiredFlip = true;
      } else if (rightDown && !leftDown) {
        body.setVelocityX(MOVE_SPEED);
        desiredFlip = false;
      } else {
        body.setVelocityX(0);
      }

      if (desiredFlip !== this.player.flipX) {
        const flipCompensation =
          (FRAME_WIDTH - 2 * BODY_OFFSET_X - BODY_WIDTH) * SPRITE_SCALE;
        this.player.x += desiredFlip ? -flipCompensation : flipCompensation;
        this.player.setFlipX(desiredFlip);
      }

      const isHorizontalAttack =
        fighter.isAttacking &&
        fighter.currentAttackAnim === fighter.keys.attackHorizontal;
      const effectiveFrameOffset = isHorizontalAttack
        ? fighter.currentAttackAnim.charFrameOffsetX
        : BODY_OFFSET_X;
      const offsetX = this.player.flipX
        ? FRAME_WIDTH - effectiveFrameOffset - BODY_WIDTH
        : effectiveFrameOffset;
      body.offset.x = offsetX;

      if (
        body.blocked.down &&
        body.velocity.y >= 0 &&
        time - this.lastJumpTime > JUMP_LOCKOUT_MS
      ) {
        this.jumpsRemaining = MAX_JUMPS;
        this.didDoubleJump = false;
      }

      const jumpPressed =
        Phaser.Input.Keyboard.JustDown(this.keys.up) ||
        Phaser.Input.Keyboard.JustDown(this.keys.space);

      if (
        jumpPressed &&
        this.jumpsRemaining > 0 &&
        time - this.lastJumpTime > JUMP_LOCKOUT_MS
      ) {
        const isSecondJump = this.jumpsRemaining < MAX_JUMPS;
        body.setVelocityY(isSecondJump ? -DOUBLE_JUMP_VELOCITY : -JUMP_VELOCITY);
        this.playSfx('sfx_jump', 2.5);
        this.jumpsRemaining -= 1;
        if (isSecondJump) this.didDoubleJump = true;
        this.lastJumpTime = time;
      }

      const slamPressed = Phaser.Input.Keyboard.JustDown(this.keys.down);

      if (slamPressed && !body.blocked.down) {
        body.setVelocityY(SLAM_VELOCITY);
      } else if (slamPressed && body.blocked.down) {
        if (this._lastDownPress && time - this._lastDownPress < 300) {
          this.player.dropThroughUntil = time + 220;
          body.setVelocityY(40);
          this._lastDownPress = 0;
        } else {
          this._lastDownPress = time;
        }
      }

      if (body.velocity.y > 0) {
        const multiplier = this.didDoubleJump
          ? DOUBLE_JUMP_FALL_MULTIPLIER
          : FALL_GRAVITY_MULTIPLIER;
        body.setGravityY(this.physics.world.gravity.y * (multiplier - 1));
      } else {
        body.setGravityY(0);
      }

      if (this.powerQueued && !fighter.isAttacking && fighter.specialPowers.length > 0) {
        const power = fighter.specialPowers[0];
        const pointer = this.input.activePointer;
        if (power === 'heavens_fury') {
          this.firePower(fighter, pointer.worldX, pointer.worldY);
          fighter.specialPowers.shift();
          this.sendPowerCast('heavens_fury', { worldX: pointer.worldX, worldY: pointer.worldY });
        } else if (power === 'shield') {
          fighter.specialPowers.shift();
          this.applyShield(fighter);
          this.resetAttackOrbs();
          this.sendPowerCast('shield', {});
        } else if (power === 'skull_curse') {
          fighter.specialPowers.shift();
          this.fireSkullCurse(fighter, pointer.worldX, pointer.worldY);
          this.sendPowerCast('skull_curse', { worldX: pointer.worldX, worldY: pointer.worldY });
        } else if (power === 'wheel') {
          fighter.specialPowers.shift();
          this.fireWheel(fighter, pointer.worldX);
          this.sendPowerCast('wheel', { worldX: pointer.worldX });
        }
      }
      this.powerQueued = false;

      const leftmostAvailable = this.attackOrbs.indexOf(true);
      if (this.attackQueued && !fighter.isAttacking && leftmostAvailable !== -1) {
        this.attackOrbs[leftmostAvailable] = false;
        if (this.resetAt === null) {
          this.resetAt = time + ORB_FULL_RESET_MS;
        }
        const pointer = this.input.activePointer;
        const bodyCenterX = body.x + body.width / 2;
        const bodyCenterY = body.y + body.height / 2;
        const rawAngle = Math.atan2(
          pointer.worldY - bodyCenterY,
          pointer.worldX - bodyCenterX
        );

        let direction;
        if (rawAngle > -3 * Math.PI / 4 && rawAngle < -Math.PI / 4) {
          direction = 'up';
          this.attackAngle = -Math.PI / 2;
        } else if (rawAngle > Math.PI / 4 && rawAngle < 3 * Math.PI / 4) {
          direction = 'down';
          this.attackAngle = Math.PI / 2;
        } else if (Math.abs(rawAngle) <= Math.PI / 4) {
          direction = 'right';
          this.attackAngle = 0;
        } else {
          direction = 'left';
          this.attackAngle = Math.PI;
        }

        if (direction === 'down' && body.blocked.down) {
          direction = pointer.worldX < bodyCenterX ? 'left' : 'right';
          this.attackAngle = direction === 'left' ? Math.PI : 0;
        }

        if (direction === 'left' || direction === 'right') {
          const shouldFlip = direction === 'left';
          if (shouldFlip !== this.player.flipX) {
            const flipCompensation =
              (FRAME_WIDTH - 2 * BODY_OFFSET_X - BODY_WIDTH) * SPRITE_SCALE;
            this.player.x += shouldFlip ? -flipCompensation : flipCompensation;
            this.player.setFlipX(shouldFlip);
            body.offset.x = shouldFlip
              ? FRAME_WIDTH - BODY_OFFSET_X - BODY_WIDTH
              : BODY_OFFSET_X;
          }
        }

        if (direction === 'up') fighter.currentAttackAnim = fighter.keys.attackUp;
        else if (direction === 'down') fighter.currentAttackAnim = fighter.keys.attackDown;
        else fighter.currentAttackAnim = fighter.keys.attackHorizontal;

        const isHorizontalDir = direction === 'left' || direction === 'right';
        const charShift = isHorizontalDir
          ? (fighter.currentAttackAnim.charFrameOffsetX - BODY_OFFSET_X) * SPRITE_SCALE
          : 0;
        fighter.attackSpriteShift = this.player.flipX ? charShift : -charShift;
        this.player.x += fighter.attackSpriteShift;

        fighter.isAttacking = true;
        this.player.setDepth(ATTACKER_DEPTH);
        this.targetsHitThisAttack.clear();
        this.player.anims.play(fighter.currentAttackAnim.animKey);
        this.playSfx('sfx_swing');

        if (isHorizontalDir) {
          const lungeDir = direction === 'left' ? -1 : 1;
          this.player.x += lungeDir * 8;
        }
      }
      this.attackQueued = false;

      const onGround = body.blocked.down;
      const moving = leftDown !== rightDown;

      if (fighter.isAttacking) {
        const currentFrameIndex = this.player.anims.currentFrame
          ? this.player.anims.currentFrame.index - 1
          : 0;
        const active =
          currentFrameIndex >= fighter.currentAttackAnim.activeStart &&
          currentFrameIndex <= fighter.currentAttackAnim.activeEnd;
        this.attackHitbox.body.enable = active;
        this.attackHitbox.setVisible(active);

        if (active) {
          const bodyCenterX = body.x + body.width / 2;
          const bodyCenterY = body.y + body.height / 2;
          const distance =
            (BODY_WIDTH * SPRITE_SCALE) / 2 + ATTACK_HITBOX_WIDTH / 2;
          this.attackHitbox.setPosition(
            bodyCenterX + Math.cos(this.attackAngle) * distance,
            bodyCenterY + Math.sin(this.attackAngle) * distance
          );
          this.attackHitbox.rotation = this.attackAngle;

          const isVertical = Math.abs(Math.cos(this.attackAngle)) < 0.5;
          const physW = isVertical ? ATTACK_HITBOX_HEIGHT : ATTACK_HITBOX_WIDTH;
          const physH = isVertical ? ATTACK_HITBOX_WIDTH : ATTACK_HITBOX_HEIGHT;
          if (
            this.attackHitbox.body.width !== physW ||
            this.attackHitbox.body.height !== physH
          ) {
            this.attackHitbox.body.setSize(physW, physH, true);
          }
          this.attackHitbox.body.reset(this.attackHitbox.x, this.attackHitbox.y);

          const hbLeft = this.attackHitbox.x - physW / 2;
          const hbRight = this.attackHitbox.x + physW / 2;
          const hbTop = this.attackHitbox.y - physH / 2;
          const hbBottom = this.attackHitbox.y + physH / 2;

          const isHorizontal = !isVertical;
          const backHbW = isHorizontal ? ATTACK_HITBOX_WIDTH * 0.18 : 0;
          const backHbH = isHorizontal ? ATTACK_HITBOX_HEIGHT * 0.5 : 0;
          const backDist = isHorizontal
            ? (BODY_WIDTH * SPRITE_SCALE) / 2 + backHbW / 2
            : 0;
          const backX = bodyCenterX - Math.cos(this.attackAngle) * backDist;
          const backY = bodyCenterY - Math.sin(this.attackAngle) * backDist;
          const backLeft = backX - backHbW / 2;
          const backRight = backX + backHbW / 2;
          const backTop = backY - backHbH / 2;
          const backBottom = backY + backHbH / 2;

          for (const target of this.fighters) {
            if (target === fighter) continue;
            if (this.targetsHitThisAttack.has(target)) continue;
            if (target.isInvulnerable || target.isDead) continue;
            const tb = target.sprite.body;
            const frontHit =
              hbRight > tb.x &&
              hbLeft < tb.x + tb.width &&
              hbBottom > tb.y &&
              hbTop < tb.y + tb.height;
            const backHit =
              isHorizontal &&
              backRight > tb.x &&
              backLeft < tb.x + tb.width &&
              backBottom > tb.y &&
              backTop < tb.y + tb.height;
            if (frontHit || backHit) {
              this.targetsHitThisAttack.add(target);
              const isVerticalAtk = Math.abs(Math.cos(this.attackAngle)) < 0.5;
              const knockDir = Math.sign(Math.cos(this.attackAngle)) || (this.player.flipX ? -1 : 1);
              const knockbackX = isVerticalAtk ? 0 : knockDir * 140;
              const knockupY = isVerticalAtk
                ? (Math.sin(this.attackAngle) > 0 ? 160 : -160)
                : -80;
              this.dealHit(target, {
                damage: ATTACK_DAMAGE,
                playHitSfx: true,
                knockbackX,
                knockupY,
              });
            }
          }
          if (
            this.isCrowHitByRect(hbLeft, hbRight, hbTop, hbBottom) ||
            (isHorizontal && this.isCrowHitByRect(backLeft, backRight, backTop, backBottom))
          ) {
            this.killCrow();
          }
        }
      } else if (!onGround) {
        if (body.velocity.y < 0) {
          this.player.anims.play(fighter.keys.jump, true);
        } else {
          this.player.anims.play(fighter.keys.fall, true);
        }
      } else if (moving) {
        this.player.anims.play(fighter.keys.run, true);
      } else {
        this.player.anims.play(fighter.keys.idle, true);
      }
    } else {
      this.attackQueued = false;
      this.powerQueued = false;
    }

    for (let i = this.skullProjectiles.length - 1; i >= 0; i--) {
      const p = this.skullProjectiles[i];
      if (!p.active) {
        this.skullProjectiles.splice(i, 1);
        continue;
      }
      if (p.aura) p.aura.setPosition(p.x, p.y);
      if (!p.hasHit) {
        if (p.x < -60 || p.x > MAP_WIDTH + 60) {
          if (p.auraPulse) p.auraPulse.stop();
          if (p.aura) p.aura.destroy();
          p.destroy();
          this.skullProjectiles.splice(i, 1);
          continue;
        }
        const pb = p.body;
        const pLeft = pb.x;
        const pRight = pb.x + pb.width;
        const pTop = pb.y;
        const pBottom = pb.y + pb.height;
        if (!this.isAuthoritativeOwner(p.ownerFighter)) continue;
        for (const target of this.fighters) {
          if (target === p.ownerFighter) continue;
          if (target.isDead || target.isInvulnerable) continue;
          const tb = target.sprite.body;
          const hit =
            pRight > tb.x &&
            pLeft < tb.x + tb.width &&
            pBottom > tb.y &&
            pTop < tb.y + tb.height;
          if (hit) {
            p.hasHit = true;
            p.body.setVelocityX(0);
            this.dealHit(target, {
              damage: SKULL_CURSE_DAMAGE,
              breakShield: true,
              curse: true,
            });
            p.play('skull_curse_hit');
            if (p.auraPulse) p.auraPulse.stop();
            if (p.aura) {
              this.tweens.add({
                targets: p.aura,
                alpha: 0,
                scale: 1.1,
                duration: 300,
                onComplete: () => p.aura && p.aura.destroy(),
              });
            }
            p.once('animationcomplete-skull_curse_hit', () => {
              p.destroy();
            });
            break;
          }
        }
        if (!p.hasHit && this.isCrowHitByRect(pLeft, pRight, pTop, pBottom)) {
          this.killCrow();
        }
      }
    }

    for (let i = this.wheelProjectiles.length - 1; i >= 0; i--) {
      const w = this.wheelProjectiles[i];
      if (!w.active) {
        if (w.visual) w.visual.destroy();
        this.wheelProjectiles.splice(i, 1);
        continue;
      }
      if (w.visual) {
        w.visual.setPosition(w.x, w.y + WHEEL_VISUAL_Y_OFFSET);
        const velX = w.body.velocity.x;
        if (velX !== 0) {
          const shouldFlip = velX > 0;
          if (w.visual.flipX !== shouldFlip) {
            w.visual.setFlipX(shouldFlip);
            w.visual.setOrigin(
              shouldFlip
                ? 1 - WHEEL_BALL_LOCAL_X / WHEEL_FRAME_W
                : WHEEL_BALL_LOCAL_X / WHEEL_FRAME_W,
              WHEEL_BALL_LOCAL_Y / WHEEL_FRAME_H
            );
          }
        }
        const onGround = w.body.blocked.down || w.body.touching.down;
        const desiredAnim = onGround ? 'wheel_roll' : 'wheel_air';
        if (w.visual.anims.currentAnim?.key !== desiredAnim) {
          w.visual.play(desiredAnim);
        }
      }
      if (w.hasHit) continue;

      if (w.y > MAP_HEIGHT + 80) {
        if (w.platformCollider) this.physics.world.removeCollider(w.platformCollider);
        if (w.visual) w.visual.destroy();
        w.destroy();
        this.wheelProjectiles.splice(i, 1);
        continue;
      }

      const wb = w.body;
      const wLeft = wb.x;
      const wRight = wb.x + wb.width;
      const wTop = wb.y;
      const wBottom = wb.y + wb.height;

      if (!this.isAuthoritativeOwner(w.ownerFighter)) continue;

      let hitTarget = null;
      for (const target of this.fighters) {
        if (target === w.ownerFighter) continue;
        if (target.isDead || target.isInvulnerable) continue;
        const tb = target.sprite.body;
        if (
          wRight > tb.x &&
          wLeft < tb.x + tb.width &&
          wBottom > tb.y &&
          wTop < tb.y + tb.height
        ) {
          hitTarget = target;
          break;
        }
      }

      if (hitTarget) {
        w.hasHit = true;
        this.dealHit(hitTarget, {
          damage: WHEEL_DAMAGE,
          stun: true,
          knockupY: WHEEL_KNOCKUP,
          powerFlashColor: 0xffffff,
        });
        this.createWheelExplosion(w.x, w.y);
        if (w.platformCollider) this.physics.world.removeCollider(w.platformCollider);
        if (w.visual) w.visual.destroy();
        w.destroy();
        this.wheelProjectiles.splice(i, 1);
        continue;
      }

      if (this.isCrowHitByRect(wLeft, wRight, wTop, wBottom)) {
        this.killCrow();
      }
    }

    for (const loot of this.loots) {
      if (!loot.isPickedUp) {
        if (loot.glow) loot.glow.setPosition(loot.x, loot.y);
        if (loot.tintOverlay) loot.tintOverlay.setPosition(loot.x, loot.y);
      }
      if (loot.isPickedUp) continue;
      for (const f of this.fighters) {
        if (f.isDead) continue;
        if (this.physics.overlap(loot, f.sprite)) {
          this.pickupLoot(loot, f);
          break;
        }
      }
    }

    if (this.resetAt !== null && time >= this.resetAt) {
      for (let i = 0; i < this.attackOrbs.length; i++) this.attackOrbs[i] = true;
      this.resetAt = null;
    }

    const slot0 = fighter.specialPowers[0] ?? null;
    const slot1 = fighter.specialPowers[1] ?? null;
    const hasHeavensFury = slot0 === 'heavens_fury';
    const hasShield = slot0 === 'shield';
    const hasSkullCurse = slot0 === 'skull_curse';
    const hasWheel = slot0 === 'wheel';
    for (let i = 0; i < this.attackOrbs.length; i++) {
      const available = this.attackOrbs[i];
      const sprite = this.orbSprites[i];
      sprite.fillColor = available ? 0x38bdf8 : 0x1e293b;
      sprite.setAlpha(available ? 1 : 0.6);
    }
    this.specialOrbSprite.setVisible(hasHeavensFury);
    if (hasHeavensFury && this.specialOrbPulse.paused) {
      this.specialOrbPulse.resume();
    } else if (!hasHeavensFury && !this.specialOrbPulse.paused) {
      this.specialOrbPulse.pause();
      this.specialOrbSprite.setScale(1);
    }
    this.specialShieldSprite.setVisible(hasShield);
    if (hasShield && this.specialShieldPulse.paused) {
      this.specialShieldPulse.resume();
    } else if (!hasShield && !this.specialShieldPulse.paused) {
      this.specialShieldPulse.pause();
      this.specialShieldSprite.setScale(HOLY_SHIELD_HUD_SCALE);
    }
    this.specialSkullSprite.setVisible(hasSkullCurse);
    if (hasSkullCurse && this.specialSkullPulse.paused) {
      this.specialSkullPulse.resume();
    } else if (!hasSkullCurse && !this.specialSkullPulse.paused) {
      this.specialSkullPulse.pause();
      this.specialSkullSprite.setScale(1);
    }
    this.specialWheelSprite.setVisible(hasWheel);
    if (hasWheel && this.specialWheelPulse.paused) {
      this.specialWheelPulse.resume();
    } else if (!hasWheel && !this.specialWheelPulse.paused) {
      this.specialWheelPulse.pause();
      this.specialWheelSprite.setScale(1);
    }
    if (slot1) {
      const slot1Color =
        slot1 === 'heavens_fury' ? 0xfde047
        : slot1 === 'shield' ? 0x3b82f6
        : slot1 === 'skull_curse' ? 0xa855f7
        : 0xffffff;
      this.specialSlot2Sprite.fillColor = slot1Color;
      this.specialSlot2Sprite.setVisible(true);
    } else {
      this.specialSlot2Sprite.setVisible(false);
    }
    if (this.refreshDevPowerButtons) this.refreshDevPowerButtons();

    const shieldActive = fighter.shieldCharges > 0;
    this.activeShieldSprite.setVisible(shieldActive);
    this.activeShieldChargesText.setVisible(shieldActive);
    if (shieldActive) {
      this.activeShieldChargesText.setText(`x${fighter.shieldCharges}`);
    }

    const hpPct = fighter.hp / MAX_HP;
    this.hudHpFill.width = (this.hudBarWidth - 2) * hpPct;
    this.hudHpFill.fillColor = hpPct > 0.5 ? 0x22c55e : hpPct > 0.25 ? 0xeab308 : 0xef4444;
    this.hudHpText.setText(`${Math.round(hpPct * 100)}%`);
    this.hudLivesText.setText(`Vidas: ${fighter.lives}`);

    for (const f of this.fighters) {
      if (f.isDead) {
        f.glow.setVisible(false);
        f.hpBarBg.setVisible(false);
        f.hpBarFill.setVisible(false);
        continue;
      }

      if (f !== this.playerFighter && !f.sprite.anims.isPlaying) {
        f.sprite.anims.play(f.keys.idle, true);
      }

      if (f.flashSprite.alpha > 0) {
        f.flashSprite.setPosition(f.sprite.x, f.sprite.y);
        f.flashSprite.setTexture(f.sprite.texture.key, f.sprite.frame.name);
        f.flashSprite.setFlipX(f.sprite.flipX);
      }
      if (f.hitFlashSprite.alpha > 0) {
        f.hitFlashSprite.setPosition(f.sprite.x, f.sprite.y);
        f.hitFlashSprite.setTexture(f.sprite.texture.key, f.sprite.frame.name);
        f.hitFlashSprite.setFlipX(f.sprite.flipX);
      }
      if (f.pickupFlashSprite.alpha > 0) {
        f.pickupFlashSprite.setPosition(f.sprite.x, f.sprite.y);
        f.pickupFlashSprite.setTexture(f.sprite.texture.key, f.sprite.frame.name);
        f.pickupFlashSprite.setFlipX(f.sprite.flipX);
      }

      if (f.shieldAnimSprite) {
        const sb = f.sprite.body;
        f.shieldAnimSprite.setPosition(
          sb.x + sb.width / 2,
          sb.y + sb.height / 2
        );
      }
      if (f.shieldGoldSprite) {
        f.shieldGoldSprite.setPosition(f.sprite.x, f.sprite.y);
        f.shieldGoldSprite.setTexture(f.sprite.texture.key, f.sprite.frame.name);
        f.shieldGoldSprite.setFlipX(f.sprite.flipX);
      }
      if (f.curseTintSprite) {
        f.curseTintSprite.setPosition(f.sprite.x, f.sprite.y);
        f.curseTintSprite.setTexture(f.sprite.texture.key, f.sprite.frame.name);
        f.curseTintSprite.setFlipX(f.sprite.flipX);
      }
      if (f.stunTintSprite) {
        f.stunTintSprite.setPosition(f.sprite.x, f.sprite.y);
        f.stunTintSprite.setTexture(f.sprite.texture.key, f.sprite.frame.name);
        f.stunTintSprite.setFlipX(f.sprite.flipX);
      }
      if (f.stunVfxSprite) {
        const fb = f.sprite.body;
        f.stunVfxSprite.setPosition(
          fb.x + fb.width / 2,
          fb.y - 4
        );
      }
      if (f.curseVfxSprite) {
        const fb = f.sprite.body;
        f.curseVfxSprite.setPosition(
          fb.x + fb.width / 2,
          fb.y + fb.height / 2
        );
      }

      const fbody = f.sprite.body;
      f.glow.setPosition(fbody.x + fbody.width / 2, fbody.y + fbody.height / 2);

      const pct = f.hp / MAX_HP;
      const barY = fbody.y - 14;
      const barX = fbody.x + fbody.width / 2;
      f.hpBarBg.setPosition(barX, barY);
      f.hpBarFill.setPosition(barX - (f.hpBarWidth - 2) / 2, barY);
      f.hpBarFill.width = (f.hpBarWidth - 2) * pct;
      f.hpBarFill.fillColor = pct > 0.5 ? 0x22c55e : pct > 0.25 ? 0xeab308 : 0xef4444;
    }
  }
}
