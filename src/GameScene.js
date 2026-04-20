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

const ATTACK_HITBOX_WIDTH = 95;
const ATTACK_HITBOX_HEIGHT = 75;
const VERTICAL_ATTACK_REACH = 125;

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
const SHIELD_IDLE_FRAMES = 10;
const SHIELD_CATCH_FRAMES = 5;
const HP_HEAL_AMOUNT = 50;

const HEAVENS_FURY_FRAME_SIZE = 128;
const HEAVENS_FURY_FRAMES = 12;
const HEAVENS_FURY_SCALE = 4;
const HEAVENS_FURY_STRIKE_HALF_WIDTH = 130;
const HEAVENS_FURY_BEAM_HALF_WIDTH = 85;
const HEAVENS_FURY_GROUND_ZONE_HEIGHT = 110;
const HEAVENS_FURY_DAMAGE_FULL = 80;
const HEAVENS_FURY_DAMAGE_BEAM = 33;
const HEAVENS_FURY_IMPACT_FRAME_START = 3;
const HEAVENS_FURY_IMPACT_FRAME_END = 6;
const HEAVENS_FURY_TELEGRAPH_MS = 1300;
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
const SKULL_CURSE_SLOW_MS = 2000;
const SKULL_CURSE_SLOW_FACTOR = 0.4;
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

const FIRE_STORM_FRAME_W = 64;
const FIRE_STORM_FRAME_H = 64;
const FIRE_STORM_FRAMES_PER_ROW = 14;
const FIRE_STORM_HIT_FRAME_SIZE = 160;
const FIRE_STORM_HIT_FRAMES = 8;
const FIRE_STORM_HIT_SCALE = 1.4;
const FIRE_STORM_HIT_FRAMERATE = 20;
const FIRE_STORM_SCALE = 2.5;
const FIRE_STORM_SPEED = 520;
const FIRE_STORM_DAMAGE = MAX_HP * 0.18;
const FIRE_STORM_RAY_BODY = 42;
const FIRE_STORM_WAVES = 2;
const FIRE_STORM_WAVE_DELAY_MS = 1100;
const FIRE_STORM_FRAMERATE = 20;

const EYE_LOOT_IDLE_FRAME = 64;
const EYE_LOOT_IDLE_FRAMES = 8;
const EYE_LOOT_CATCH_FRAMES = 7;
const EYE_LOOT_IDLE_SCALE = 1.0;
const EYE_LOOT_CATCH_SCALE = 2.0;

const EYE_FRAME_SIZE = 150;
const EYE_SCALE = 3.2;
const EYE_BODY_W = 50;
const EYE_BODY_H = 40;
const EYE_LIFE_ICON_RADIUS = 7;
const EYE_LIFE_ICON_SPACING = 18;
const EYE_HITS_BASE = 2;
const EYE_HITS_SHIELD_LOOT_BONUS = 2;
const EYE_HITS_HARD_CAP = 4;
const EYE_MOVE_SPEED = 500;
const EYE_DASH_SPEED = 850;
const EYE_DASH_DURATION_MS = 320;
const EYE_DASH_COOLDOWN_MS = 3000;
const EYE_DASH_COMBO_WINDOW_MS = 700;
const EYE_ATTACK_COOLDOWN_MS = 3000;
const EYE_TRANSFORM_DURATION_MS = 20000;

const ICE_BEAM_CAST_MS = 800;
const ICE_BEAM_DURATION_MS = 3000;
const ICE_BEAM_TICK_MS = 100;
const ICE_BEAM_FOLLOW_STRENGTH = 0.035;
const ICE_BEAM_THICKNESS = 22;
const ICE_BEAM_HIT_RADIUS = 42;
const ICE_SLOW_DURATION_MS = 700;
const ICE_FREEZE_DURATION_MS = 4000;
const ICE_HITS_TO_FREEZE = 10;
const ICE_SLOW_FACTOR_START = 0.55;
const ICE_SLOW_FACTOR_MIN = 0.15;
const EYE_ATTACK_HITBOX_FORWARD = 40;
const EYE_ATTACK_HITBOX_PADDING = 6;
const EYE_DASH_BAR_WIDTH = 36;
const EYE_DASH_BAR_HEIGHT = 4;

const POWERS = {
  heavens_fury: {
    animKey: 'heavens_fury',
    orbColor: 0xfde047,
    orbStroke: 0xca8a04,
    lootIdleKey: 'heavens_fury_loot_idle',
    lootCatchKey: 'heavens_fury_loot_catch',
    lootGlowKey: 'glow_yellow',
    lootGlowScale: 0.85,
    lootGlowPulseScale: 1.1,
    lootFrameSize: 64,
    lootScale: 1.65,
    lootCatchScale: 2.0,
  },
  shield: {
    orbColor: 0x38bdf8,
  },
  skull_curse: {
    orbColor: 0xa855f7,
    lootIdleKey: 'skull_curse_loot_idle',
    lootCatchKey: 'skull_curse_loot_catch',
    lootGlowKey: 'glow_purple_light',
    lootGlowScale: 0.9,
    lootGlowPulseScale: 1.15,
  },
  wheel: {
    orbColor: 0xffffff,
    lootIdleKey: 'wheel_loot_idle',
    lootCatchKey: 'wheel_loot_catch',
    lootFrameSize: 32,
    lootScale: 3.3,
    lootCatchScale: 2.2,
    lootTintFill: 0xffffff,
  },
  ice_beam: {
    orbColor: 0x7dd3fc,
    lootGlowKey: 'glow_blue',
    lootIdleKey: 'ice_beam_loot_idle',
    lootCatchKey: 'ice_beam_loot_catch',
    lootFrameSize: 64,
    lootScale: 1.1,
    lootCatchScale: 2.6,
    lootGlowScale: 0.65,
    lootGlowPulseScale: 0.88,
  },
  fire_storm: {
    orbColor: 0xff3b30,
    lootGlowKey: 'glow_orange',
    lootIdleKey: 'fire_storm_loot_idle',
    lootCatchKey: 'fire_storm_loot_catch',
    lootFrameSize: 64,
    lootScale: 1.65,
    lootCatchScale: 2.5,
  },
  eye: {
    orbColor: 0x78350f,
    lootGlowKey: 'glow_brown',
  },
};

const WOOD_POWER_POOL = ['heavens_fury', 'skull_curse', 'wheel', 'fire_storm', 'ice_beam'];

const LOOT_TYPES = {
  wood: {
    idleKey: 'wood_idle',
    catchKey: 'wood_catch',
    glowKey: 'glow_orange',
    onPickup: (scene, fighter, loot) => {
      if (fighter.specialPowers.length < 2) fighter.specialPowers.push(loot.power);
      else fighter.specialPowers[1] = loot.power;
    },
  },
  hp: {
    idleKey: 'hp_idle',
    catchKey: 'hp_catch',
    glowKey: 'glow_green',
    onPickup: (scene, fighter) => {
      if (fighter.isEye) {
        fighter.eyeHitsRemaining = Math.min(EYE_HITS_BASE, fighter.eyeHitsRemaining + 1);
        fighter.eyeDashCooldownUntil = 0;
        fighter.eyeAttackCooldownUntil = 0;
      } else {
        fighter.hp = Math.min(MAX_HP, fighter.hp + HP_HEAL_AMOUNT);
      }
    },
  },
  shield: {
    idleKey: 'shield_idle',
    catchKey: 'shield_catch',
    glowKey: 'glow_blue',
    onPickup: (scene, fighter) => {
      if (fighter.isEye) {
        fighter.eyeHitsRemaining = Math.min(EYE_HITS_HARD_CAP, fighter.eyeHitsRemaining + EYE_HITS_SHIELD_LOOT_BONUS);
      } else {
        scene.applyShield(fighter);
      }
    },
  },
  eye: {
    idleKey: 'eye_loot_idle',
    catchKey: 'eye_loot_catch',
    glowKey: 'glow_brown',
    idleFrameSize: EYE_LOOT_IDLE_FRAME,
    idleScale: EYE_LOOT_IDLE_SCALE,
    catchScale: EYE_LOOT_CATCH_SCALE,
    onPickup: (scene, fighter) => {
      scene.transformToEye(fighter);
    },
  },
};

const CHARACTERS = [
  { id: 'p1', folder: '', glowKey: 'glow_orange', glowColor: [255, 150, 70, 255, 130, 55, 255, 110, 40], tintColor: 0xff9646 },
  { id: 'p2', folder: 'Player 2/', glowKey: 'glow_purple', glowColor: [180, 100, 255, 160, 80, 230, 140, 60, 210], tintColor: 0xb464ff },
  { id: 'p3', folder: 'Player 3/', glowKey: 'glow_green', glowColor: [110, 230, 120, 80, 210, 100, 60, 190, 80], tintColor: 0x6ee678 },
  { id: 'p4', folder: 'Player 4/', glowKey: 'glow_red', glowColor: [255, 90, 90, 230, 60, 60, 210, 40, 40], tintColor: 0xff5a5a },
];
const SINGLE_PLAYER_CHARACTER_COUNT = 3;

const ATTACK_ANIMS_BASE = {
  horizontal: { frameCount: 7, activeStart: 2, activeEnd: 4, charFrameOffsetX: 49 },
  up:         { frameCount: 6, activeStart: 2, activeEnd: 3, charFrameOffsetX: 49 },
  down:       { frameCount: 6, activeStart: 2, activeEnd: 3, charFrameOffsetX: 67 },
};

function pointToSegmentDistance(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) {
    const ex = px - ax;
    const ey = py - ay;
    return Math.sqrt(ex * ex + ey * ey);
  }
  let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + dx * t;
  const cy = ay + dy * t;
  const ex = px - cx;
  const ey = py - cy;
  return Math.sqrt(ex * ex + ey * ey);
}

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
    this.initData = data;
    this.mode = data?.mode ?? 'single';
    this.network = data?.network ?? null;
    this.isMultiplayer = this.mode === 'host' || this.mode === 'client';
    const matchInfo = data?.matchInfo ?? null;
    if (this.isMultiplayer && matchInfo) {
      this.matchPlayers = matchInfo.players;
      this.myIndex = matchInfo.myIndex;
    } else {
      this.matchPlayers = null;
      this.myIndex = 0;
    }
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
    this.load.audio('sfx_heavens_fury_belezam', 'audio/powers/heavens_fury/belezam.mp3');
    this.load.audio('sfx_swing', 'audio/attacks/Hit.mp3');
    this.load.audio('sfx_hit', 'audio/attacks/atack.mp3');
    this.load.audio('sfx_crow_die', 'audio/corvo/corvo die.mp3');
    this.load.audio('sfx_shield_cast', 'audio/powers/shield/cast.mp3');
    this.load.audio('sfx_shield_break', 'audio/powers/shield/broke shield.mp3');
    this.load.audio('sfx_skull_cast', 'audio/powers/skull_curse/cast skull curse.mp3');
    this.load.audio('sfx_skull_hit', 'audio/powers/skull_curse/hit skull.mp3');
    this.load.audio('sfx_wheel_hit', 'audio/powers/wheel/Hit.mp3');
    this.load.audio('sfx_wheel_hit2', 'audio/powers/wheel/hit2.mp3');
    this.load.audio('sfx_wheel_air', 'audio/powers/wheel/Moviment_Air.mp3');
    this.load.audio('sfx_wheel_ground', 'audio/powers/wheel/Moviment_ground.mp3');
    this.load.audio('sfx_fire_storm', 'audio/powers/fire_storm/Cast and wave 2.mp3');
    this.load.audio('sfx_fire_storm_2', 'audio/powers/fire_storm/Cast and wave 2_2.mp3');
    this.load.audio('sfx_ice_cast', 'audio/powers/icebeam/ice cast.mp3');
    this.load.audio('sfx_ice_crash', 'audio/powers/icebeam/crash ice.mp3');
    this.load.audio('sfx_power_pickup', 'audio/power catch/power cath.mp3');
    this.load.audio('sfx_cure', 'audio/heal novo/93eeb9fc-8eab-44db-aa09-270a2550a130.mp3');
    this.load.audio('sfx_jump', 'audio/jump/30_Jump_03.wav');
    this.load.image('map1_bg', 'maps/map1/background.png');
    this.load.image('self_arrow', 'sprites/seta/seta.png');
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
    this.load.spritesheet('shield_loot_sheet', 'sprites/Poder 2 (Shield)/shield carch.png', {
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
    this.load.spritesheet('fire_storm', 'sprites/Poder 5 (fire storm)/579.png', {
      frameWidth: FIRE_STORM_FRAME_W,
      frameHeight: FIRE_STORM_FRAME_H,
    });
    this.load.spritesheet('fire_storm_hit', 'sprites/Poder 5 (fire storm)/hit.png', {
      frameWidth: FIRE_STORM_HIT_FRAME_SIZE,
      frameHeight: FIRE_STORM_HIT_FRAME_SIZE,
    });
    this.load.spritesheet('fire_storm_loot_idle', 'sprites/Poder 5 (fire storm)/Fire loot 3.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('wheel_loot_idle', 'sprites/Poder 4 (Wheel)/Wheel loot.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('ice_beam_hit', 'sprites/Power 7 (ice beam)/Ice VFX 1 Hit.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('ice_particles', 'sprites/Power 7 (ice beam)/particulas ice beam.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('player_frozen', 'sprites/Power 7 (ice beam)/Player congelado.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('ice_cast_fx', 'sprites/Power 7 (ice beam)/shield carch.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('ice_beam_loot_catch_sheet', 'sprites/Power 7 (ice beam)/loot catch.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('fire_storm_loot_catch', 'sprites/Poder 5 (fire storm)/Fire catch.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('skull_curse_loot_idle', 'sprites/Poder 3 (skull curse)/skull curse loot.png', {
      frameWidth: LOOT_FRAME_SIZE,
      frameHeight: LOOT_FRAME_SIZE,
    });
    this.load.spritesheet('skull_curse_loot_catch', 'sprites/Poder 3 (skull curse)/skull curse loot catch.png', {
      frameWidth: LOOT_FRAME_SIZE,
      frameHeight: LOOT_FRAME_SIZE,
    });
    this.load.spritesheet('eye_loot_idle', 'sprites/Poder 6 (transform Flying Eye)/Loot power 6.png', {
      frameWidth: EYE_LOOT_IDLE_FRAME,
      frameHeight: EYE_LOOT_IDLE_FRAME,
    });
    this.load.spritesheet('eye_loot_catch', 'sprites/Poder 6 (transform Flying Eye)/Loot Catch power 6.png', {
      frameWidth: LOOT_FRAME_SIZE,
      frameHeight: LOOT_FRAME_SIZE,
    });
    this.load.spritesheet('eye_flight', 'sprites/Poder 6 (transform Flying Eye)/Flight.png', {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet('eye_attack', 'sprites/Poder 6 (transform Flying Eye)/Attack.png', {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet('eye_take_hit', 'sprites/Poder 6 (transform Flying Eye)/Take Hit.png', {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet('eye_death', 'sprites/Poder 6 (transform Flying Eye)/Death.png', {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet('eye_bite_effect', 'sprites/Poder 6 (transform Flying Eye)/eye bite effect.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  createCloudTexture(key, color, blobCount) {
    if (this.textures.exists(key)) return;
    const w = 1024;
    const h = 512;
    const tex = this.textures.createCanvas(key, w, h);
    const ctx = tex.getContext();
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < blobCount; i++) {
      const cx = Math.random() * w;
      const cy = Math.random() * h;
      const r = 60 + Math.random() * 180;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      const a = 0.08 + Math.random() * 0.12;
      g.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${a})`);
      g.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    }
    tex.refresh();
  }

  drawLightningBolt(ctx, cx, top, bottom, amplitude, seed) {
    const rand = (() => {
      let s = seed;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    })();
    const points = [];
    const segments = 8;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = top + (bottom - top) * t;
      const sway = i === 0 || i === segments ? 0 : (rand() * 2 - 1) * amplitude;
      points.push({ x: cx + sway, y });
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(253, 224, 71, 0.55)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.9)';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();
    return points;
  }

  drawHeavensFuryIdleFrame(ctx, frameIdx, frameW, frameH) {
    ctx.clearRect(0, 0, frameW, frameH);
    const dim = frameIdx === 1 || frameIdx === 4;
    if (dim) ctx.globalAlpha = 0.4;
    const points = this.drawLightningBolt(ctx, 32, 6, 58, 8, (frameIdx + 1) * 7);
    if (!dim) {
      const midIdx = Math.floor(points.length / 2);
      const bs = points[midIdx];
      const bx = bs.x + (frameIdx % 2 === 0 ? 10 : -10);
      const by = bs.y + 14;
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.75)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(bs.x, bs.y); ctx.lineTo(bx, by); ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bs.x, bs.y); ctx.lineTo(bx, by); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    const sparkle = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    sparkle.addColorStop(0, 'rgba(255, 255, 220, 0.35)');
    sparkle.addColorStop(1, 'rgba(255, 255, 220, 0)');
    ctx.fillStyle = sparkle;
    ctx.fillRect(0, 0, frameW, frameH);
  }

  drawHeavensFuryCatchFrame(ctx, frameIdx, totalFrames, frameW, frameH) {
    ctx.clearRect(0, 0, frameW, frameH);
    const t = frameIdx / (totalFrames - 1);
    const flashR = 6 + t * 34;
    const flashAlpha = (1 - t) * 0.95;
    const flash = ctx.createRadialGradient(32, 32, 0, 32, 32, flashR);
    flash.addColorStop(0, `rgba(255, 255, 230, ${flashAlpha})`);
    flash.addColorStop(0.4, `rgba(253, 224, 71, ${flashAlpha * 0.7})`);
    flash.addColorStop(1, 'rgba(253, 224, 71, 0)');
    ctx.fillStyle = flash;
    ctx.fillRect(0, 0, frameW, frameH);
    if (frameIdx < 4) {
      const rays = 5;
      for (let r = 0; r < rays; r++) {
        const angle = (r / rays) * Math.PI * 2 + frameIdx * 0.4;
        const reach = 10 + t * 26;
        const ex = 32 + Math.cos(angle) * reach;
        const ey = 32 + Math.sin(angle) * reach;
        ctx.strokeStyle = `rgba(254, 240, 138, ${0.85 - t * 0.6})`;
        ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(32, 32); ctx.lineTo(ex, ey); ctx.stroke();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 - t * 0.7})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(32, 32); ctx.lineTo(ex, ey); ctx.stroke();
      }
    }
  }

  createCanvasSpritesheet(key, frameW, frameH, frameCount, drawFrame) {
    if (this.textures.exists(key)) return;
    const tex = this.textures.createCanvas(key, frameW * frameCount, frameH);
    const ctx = tex.getContext();
    for (let i = 0; i < frameCount; i++) {
      ctx.save();
      ctx.translate(i * frameW, 0);
      ctx.beginPath();
      ctx.rect(0, 0, frameW, frameH);
      ctx.clip();
      drawFrame(ctx, i, frameCount, frameW, frameH);
      ctx.restore();
    }
    for (let i = 0; i < frameCount; i++) tex.add(i, 0, i * frameW, 0, frameW, frameH);
    tex.refresh();
  }

  drawWhiteCatchFrame(ctx, frameIdx, totalFrames, frameW, frameH) {
    ctx.clearRect(0, 0, frameW, frameH);
    const cx = frameW / 2;
    const cy = frameH / 2;
    const t = frameIdx / (totalFrames - 1);
    const r = 4 + t * (Math.max(frameW, frameH) * 0.6);
    const alpha = (1 - t) * 0.95;
    const flash = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    flash.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
    flash.addColorStop(0.55, `rgba(255, 255, 255, ${alpha * 0.55})`);
    flash.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = flash;
    ctx.fillRect(0, 0, frameW, frameH);
    const rings = Math.min(frameIdx + 1, 3);
    for (let i = 0; i < rings; i++) {
      const ringT = Math.min(1, t + i * 0.18);
      const ringR = 3 + ringT * (Math.max(frameW, frameH) * 0.55);
      const ringA = Math.max(0, 0.8 - ringT * 0.85);
      ctx.strokeStyle = `rgba(255, 255, 255, ${ringA})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (frameIdx < 4) {
      const spokes = 6;
      for (let s = 0; s < spokes; s++) {
        const ang = (s / spokes) * Math.PI * 2 + frameIdx * 0.3;
        const reach = 6 + t * (Math.max(frameW, frameH) * 0.5);
        const sx = cx + Math.cos(ang) * 3;
        const sy = cy + Math.sin(ang) * 3;
        const ex = cx + Math.cos(ang) * reach;
        const ey = cy + Math.sin(ang) * reach;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.85 - t * 0.7})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
      }
    }
  }

  createWheelLootCatchTexture() {
    const frameW = 64;
    const frameH = 64;
    const frameCount = 7;
    this.createCanvasSpritesheet(
      'wheel_loot_catch',
      frameW, frameH, frameCount,
      (ctx, i, total) => this.drawWhiteCatchFrame(ctx, i, total, frameW, frameH),
    );
    this.anims.create({
      key: 'wheel_loot_catch',
      frames: this.anims.generateFrameNumbers('wheel_loot_catch', { start: 0, end: frameCount - 1 }),
      frameRate: 16,
      repeat: 0,
    });
  }

  drawSnowballIdleFrame(ctx, frameIdx, total, frameW, frameH) {
    ctx.clearRect(0, 0, frameW, frameH);
    const cx = frameW / 2;
    const cy = frameH / 2 + 2;
    const phase = (frameIdx / total) * Math.PI * 2;
    const bob = Math.sin(phase) * 1.5;
    const ballR = 18;
    const glow = ctx.createRadialGradient(cx, cy + bob, 0, cx, cy + bob, 28);
    glow.addColorStop(0, 'rgba(186, 230, 253, 0.55)');
    glow.addColorStop(1, 'rgba(125, 211, 252, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, frameW, frameH);
    const body = ctx.createRadialGradient(
      cx - 5, cy - 6 + bob, 2,
      cx, cy + bob, ballR,
    );
    body.addColorStop(0, 'rgba(255, 255, 255, 1)');
    body.addColorStop(0.55, 'rgba(224, 242, 254, 1)');
    body.addColorStop(1, 'rgba(125, 211, 252, 1)');
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.arc(cx, cy + bob, ballR, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 140, 189, 0.65)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.beginPath();
    ctx.ellipse(cx - 5, cy - 8 + bob, 5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    const speckCount = 5;
    for (let i = 0; i < speckCount; i++) {
      const a = (i / speckCount) * Math.PI * 2 + phase * 0.4 + i;
      const rr = ballR - 5;
      const sx = cx + Math.cos(a) * rr * 0.6;
      const sy = cy + bob + Math.sin(a) * rr * 0.6;
      ctx.fillStyle = 'rgba(224, 242, 254, 0.9)';
      ctx.fillRect(sx - 1, sy - 1, 2, 2);
    }
    const orbiters = 3;
    for (let i = 0; i < orbiters; i++) {
      const a = phase + (i / orbiters) * Math.PI * 2;
      const orbitR = 24;
      const ox = cx + Math.cos(a) * orbitR;
      const oy = cy + bob + Math.sin(a) * orbitR * 0.6;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      ctx.arc(ox, oy, 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.6)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(ox - 2.5, oy); ctx.lineTo(ox + 2.5, oy);
      ctx.moveTo(ox, oy - 2.5); ctx.lineTo(ox, oy + 2.5);
      ctx.stroke();
    }
  }

  drawSnowballCatchFrame(ctx, frameIdx, totalFrames, frameW, frameH) {
    ctx.clearRect(0, 0, frameW, frameH);
    const cx = frameW / 2;
    const cy = frameH / 2;
    const t = frameIdx / (totalFrames - 1);
    const flashR = 5 + t * 34;
    const flashAlpha = (1 - t) * 0.9;
    const flash = ctx.createRadialGradient(cx, cy, 0, cx, cy, flashR);
    flash.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha})`);
    flash.addColorStop(0.45, `rgba(186, 230, 253, ${flashAlpha * 0.65})`);
    flash.addColorStop(1, 'rgba(125, 211, 252, 0)');
    ctx.fillStyle = flash;
    ctx.fillRect(0, 0, frameW, frameH);
    if (frameIdx < 2) {
      const ballR = 18 - frameIdx * 4;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.8 - frameIdx * 0.3})`;
      ctx.beginPath();
      ctx.arc(cx, cy, ballR, 0, Math.PI * 2);
      ctx.fill();
    }
    const shards = 8;
    for (let i = 0; i < shards; i++) {
      const ang = (i / shards) * Math.PI * 2 + frameIdx * 0.25;
      const near = 4 + t * 8;
      const far = 8 + t * 28;
      const sx = cx + Math.cos(ang) * near;
      const sy = cy + Math.sin(ang) * near;
      const ex = cx + Math.cos(ang) * far;
      const ey = cy + Math.sin(ang) * far;
      ctx.strokeStyle = `rgba(224, 242, 254, ${0.9 - t * 0.7})`;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 - t * 0.75})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    }
    if (frameIdx >= 2) {
      ctx.strokeStyle = `rgba(186, 230, 253, ${Math.max(0, 0.75 - t * 0.9)})`;
      ctx.lineWidth = 1.4;
      const ringR = 14 + t * 24;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  createSnowballLootTextures() {
    const frameW = 64;
    const frameH = 64;
    this.createCanvasSpritesheet(
      'ice_beam_loot_idle',
      frameW, frameH, 8,
      (ctx, i, total) => this.drawSnowballIdleFrame(ctx, i, total, frameW, frameH),
    );
    this.anims.create({
      key: 'ice_beam_loot_idle',
      frames: this.anims.generateFrameNumbers('ice_beam_loot_idle', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'ice_beam_loot_catch',
      frames: this.anims.generateFrameNumbers('ice_beam_loot_catch_sheet', { start: 0, end: 17 }),
      frameRate: 20,
      repeat: 0,
    });
  }

  createHeavensFuryLootTextures() {
    const frameW = 64;
    const frameH = 64;
    this.createCanvasSpritesheet(
      'heavens_fury_loot_idle',
      frameW, frameH, 6,
      (ctx, i) => this.drawHeavensFuryIdleFrame(ctx, i, frameW, frameH),
    );
    this.createCanvasSpritesheet(
      'heavens_fury_loot_catch',
      frameW, frameH, 7,
      (ctx, i, total) => this.drawHeavensFuryCatchFrame(ctx, i, total, frameW, frameH),
    );
    this.anims.create({
      key: 'heavens_fury_loot_idle',
      frames: this.anims.generateFrameNumbers('heavens_fury_loot_idle', { start: 0, end: 5 }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: 'heavens_fury_loot_catch',
      frames: this.anims.generateFrameNumbers('heavens_fury_loot_catch', { start: 0, end: 6 }),
      frameRate: 16,
      repeat: 0,
    });
  }

  createParallaxLayers() {
    this.createCloudTexture('parallax_far', [40, 30, 60], 22);
    this.createCloudTexture('parallax_near', [15, 10, 25], 16);

    this.parallaxFar = this.add
      .tileSprite(0, 0, MAP_WIDTH, MAP_HEIGHT, 'parallax_far')
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(-9.5)
      .setAlpha(0.6);

    this.parallaxNear = this.add
      .tileSprite(0, 0, MAP_WIDTH, MAP_HEIGHT, 'parallax_near')
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(-8.5)
      .setAlpha(0.5);
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

    this._rainSurfaces = PLATFORM_RECTS.map((r) => ({ xStart: r.x, xEnd: r.x + r.w, y: r.y, w: r.w }));
    this.time.addEvent({
      delay: 90,
      loop: true,
      callback: () => this.spawnRainSplashes(),
    });
  }

  spawnRainSplashes() {
    if (!this._rainSurfaces) return;
    for (const s of this._rainSurfaces) {
      const count = Math.max(1, Math.round(s.w / 260));
      for (let i = 0; i < count; i++) {
        const x = Phaser.Math.Between(s.xStart + 4, s.xEnd - 4);
        this.spawnRainSplash(x, s.y);
      }
    }
  }

  spawnRainSplash(x, y) {
    const splash = this.add.ellipse(x, y - 1, 4, 2, 0xbed7ff, 0.7)
      .setDepth(-4)
      .setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({
      targets: splash,
      scaleX: { from: 1, to: 3.2 },
      scaleY: { from: 1, to: 0.6 },
      alpha: { from: 0.7, to: 0 },
      y: y - 3,
      duration: 260,
      ease: 'Quad.easeOut',
      onComplete: () => splash.destroy(),
    });
    const drop1 = this.add.circle(x - 3, y - 2, 1, 0xd5e4ff, 0.8)
      .setDepth(-4)
      .setBlendMode(Phaser.BlendModes.ADD);
    const drop2 = this.add.circle(x + 3, y - 2, 1, 0xd5e4ff, 0.8)
      .setDepth(-4)
      .setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({
      targets: drop1,
      x: x - 7,
      y: y - 6,
      alpha: 0,
      duration: 240,
      ease: 'Quad.easeOut',
      onComplete: () => drop1.destroy(),
    });
    this.tweens.add({
      targets: drop2,
      x: x + 7,
      y: y - 6,
      alpha: 0,
      duration: 240,
      ease: 'Quad.easeOut',
      onComplete: () => drop2.destroy(),
    });
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

  createLightBeamTexture(key, rgb) {
    const w = 96;
    const h = 512;
    const tex = this.textures.createCanvas(key, w, h);
    const ctx = tex.getContext();
    const vGrad = ctx.createLinearGradient(0, 0, 0, h);
    vGrad.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);
    vGrad.addColorStop(0.85, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.55)`);
    vGrad.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.85)`);
    ctx.fillStyle = vGrad;
    ctx.fillRect(0, 0, w, h);
    const hGrad = ctx.createLinearGradient(0, 0, w, 0);
    hGrad.addColorStop(0, 'rgba(0,0,0,0)');
    hGrad.addColorStop(0.5, 'rgba(255,255,255,1)');
    hGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = hGrad;
    ctx.fillRect(0, 0, w, h);
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

    this.add.rectangle(0, 0, MAP_WIDTH, MAP_HEIGHT, 0x000000, 0.6)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(-9);

    this.createParallaxLayers();

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
    this.createGlowTexture('glow_blue', [
      110, 170, 255, 80, 140, 240, 60, 110, 220,
    ]);
    this.createGlowTexture('glow_brown', [
      170, 110, 60, 130, 80, 40, 90, 55, 25,
    ]);
    this.createGlowTexture('glow_purple_light', [
      240, 210, 255, 210, 150, 255, 180, 90, 245,
    ]);
    this.createGlowTexture('glow_yellow', [
      255, 240, 180, 255, 220, 110, 230, 180, 60,
    ]);
    this.createHeavensFuryLootTextures();
    this.createWheelLootCatchTexture();
    this.createSnowballLootTextures();
    this.createLightBeamTexture('eye_beam', [240, 200, 110]);

    const platformZones = [];
    for (const r of PLATFORM_RECTS) {
      const zone = this.add.zone(r.x + r.w / 2, r.y + r.h / 2, r.w, r.h);
      this.physics.add.existing(zone, true);
      platformZones.push(zone);
    }
    this.platformZones = platformZones;
    this.oneWayProcessCallback = (fallingObj, platformObj) => {
      if (fallingObj.isEye) return false;
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
      key: 'fire_storm_loot_idle',
      frames: this.anims.generateFrameNumbers('fire_storm_loot_idle', { start: 56, end: 60 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'wheel_loot_idle',
      frames: this.anims.generateFrameNumbers('wheel_loot_idle', { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'ice_beam_hit',
      frames: this.anims.generateFrameNumbers('ice_beam_hit', { start: 0, end: 11 }),
      frameRate: 16,
      repeat: 0,
    });
    this.anims.create({
      key: 'ice_particles',
      frames: this.anims.generateFrameNumbers('ice_particles', { start: 0, end: 4 }),
      frameRate: 12,
      repeat: 0,
    });
    this.anims.create({
      key: 'player_frozen',
      frames: this.anims.generateFrameNumbers('player_frozen', { start: 0, end: 7 }),
      frameRate: 14,
      repeat: 0,
    });
    this.anims.create({
      key: 'ice_cast_fx',
      frames: this.anims.generateFrameNumbers('ice_cast_fx', { start: 0, end: 9 }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: 'fire_storm_loot_catch',
      frames: this.anims.generateFrameNumbers('fire_storm_loot_catch', { start: 0, end: 15 }),
      frameRate: 18,
      repeat: 0,
    });
    this.anims.create({
      key: 'skull_curse_loot_idle',
      frames: this.anims.generateFrameNumbers('skull_curse_loot_idle', { start: 0, end: WOOD_IDLE_FRAMES - 1 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: 'skull_curse_loot_catch',
      frames: this.anims.generateFrameNumbers('skull_curse_loot_catch', { start: 0, end: WOOD_CATCH_FRAMES - 1 }),
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
      key: 'shield_idle',
      frames: this.anims.generateFrameNumbers('shield_loot_sheet', {
        start: 0,
        end: SHIELD_IDLE_FRAMES - 1,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'shield_catch',
      frames: this.anims.generateFrameNumbers('shield_loot_sheet', {
        start: SHIELD_IDLE_FRAMES,
        end: SHIELD_IDLE_FRAMES + SHIELD_CATCH_FRAMES - 1,
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
      key: 'fire_storm_ray',
      frames: this.anims.generateFrameNumbers('fire_storm', {
        start: 0,
        end: FIRE_STORM_FRAMES_PER_ROW - 1,
      }),
      frameRate: FIRE_STORM_FRAMERATE,
      repeat: -1,
    });
    this.anims.create({
      key: 'fire_storm_hit',
      frames: this.anims.generateFrameNumbers('fire_storm_hit', {
        start: 0,
        end: FIRE_STORM_HIT_FRAMES - 1,
      }),
      frameRate: FIRE_STORM_HIT_FRAMERATE,
      repeat: 0,
    });
    this.anims.create({
      key: 'eye_loot_idle',
      frames: this.anims.generateFrameNumbers('eye_loot_idle', { start: 0, end: EYE_LOOT_IDLE_FRAMES - 1 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'eye_loot_catch',
      frames: this.anims.generateFrameNumbers('eye_loot_catch', { start: 0, end: EYE_LOOT_CATCH_FRAMES - 1 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: 'eye_flight',
      frames: this.anims.generateFrameNumbers('eye_flight', { start: 0, end: 7 }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: 'eye_attack',
      frames: this.anims.generateFrameNumbers('eye_attack', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: 'eye_take_hit',
      frames: this.anims.generateFrameNumbers('eye_take_hit', { start: 0, end: 3 }),
      frameRate: 14,
      repeat: 0,
    });
    this.anims.create({
      key: 'eye_death',
      frames: this.anims.generateFrameNumbers('eye_death', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: 0,
    });
    this.anims.create({
      key: 'eye_bite_effect',
      frames: this.anims.generateFrameNumbers('eye_bite_effect', { start: 0, end: 6 }),
      frameRate: 18,
      repeat: 0,
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
    this.fightersByIndex = {};
    const spawnPositions = [
      { x: 200, y: 100 },
      { x: 1400, y: 100 },
      { x: 500, y: 300 },
      { x: 1100, y: 300 },
    ];
    let playerConfigs;
    if (this.isMultiplayer && this.matchPlayers) {
      playerConfigs = this.matchPlayers.map((p, i) => ({
        index: p.index,
        char: CHARACTERS.find((c) => c.id === p.charId) ?? CHARACTERS[i],
        spawn: spawnPositions[i] ?? spawnPositions[0],
      }));
    } else {
      playerConfigs = CHARACTERS.slice(0, SINGLE_PLAYER_CHARACTER_COUNT).map((char, i) => ({
        index: i,
        char,
        spawn: spawnPositions[i] ?? spawnPositions[0],
      }));
    }
    for (const cfg of playerConfigs) {
      const fighter = this.createFighter(cfg.char, cfg.spawn.x, cfg.spawn.y);
      fighter.ownerIndex = cfg.index;
      this.fighters.push(fighter);
      this.fightersByIndex[cfg.index] = fighter;
      this.physics.add.collider(
        fighter.sprite,
        platformZones,
        null,
        this.oneWayProcessCallback
      );
    }

    this.playerFighter = this.isMultiplayer
      ? this.fightersByIndex[this.myIndex]
      : this.fighters[0];
    this.player = this.playerFighter.sprite;

    this.selfArrow = this.add.image(0, 0, 'self_arrow')
      .setOrigin(0.5, 1)
      .setScale(0.175)
      .setDepth(24);
    this._selfArrowBaseScale = 0.175;

    if (this.isMultiplayer) {
      for (const f of this.fighters) {
        if (f === this.playerFighter) continue;
        const rb = f.sprite.body;
        rb.setAllowGravity(false);
        rb.setImmovable(true);
      }
      this.network.onState((data) => this.handleNetState(data));

      this._onVisibilityChange = () => {
        const f = this.playerFighter;
        if (!f || f.isDead) return;
        if (document.hidden) {
          f._awayFromTab = true;
          f.isInvulnerable = true;
          const b = f.sprite.body;
          b.setVelocity(0, 0);
          b.setAllowGravity(false);
          this.attackQueued = false;
          this.powerQueued = false;
        } else if (f._awayFromTab) {
          f._awayFromTab = false;
          f.isInvulnerable = false;
          f.sprite.body.setAllowGravity(true);
        }
      };
      document.addEventListener('visibilitychange', this._onVisibilityChange);
      this.events.once('shutdown', () => {
        document.removeEventListener('visibilitychange', this._onVisibilityChange);
      });
    }

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      swapPowers: Phaser.Input.Keyboard.KeyCodes.Q,
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

    this.hitboxesVisible = false;
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

    const eyeToggleBtn = document.getElementById('dev-eye-toggle');
    if (eyeToggleBtn) {
      eyeToggleBtn.addEventListener('click', () => {
        const f = this.playerFighter;
        if (!f) return;
        if (f.isEye) this.revertFromEye(f);
        else this.transformToEye(f);
      });
    }

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

    this.specialFireStormSprite = this.add.circle(
      specialOrbCenterX,
      orbsY,
      SPECIAL_ORB_RADIUS,
      0xff3b30
    )
      .setStrokeStyle(3, 0x991b1b)
      .setDepth(22)
      .setScrollFactor(0)
      .setVisible(false);
    this.specialFireStormPulse = this.tweens.add({
      targets: this.specialFireStormSprite,
      scale: 1.2,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      paused: true,
    });

    this.fireStormRays = [];
    this.fireStormHitVfx = [];

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

    if (!this.isMultiplayer) {
      const cam = this.cameras.main;
      const menuBtnBg = this.add.rectangle(cam.width - 70, 22, 110, 28, 0x1e293b, 0.85)
        .setStrokeStyle(2, 0x475569, 0.9)
        .setScrollFactor(0)
        .setDepth(22)
        .setInteractive({ useHandCursor: true });
      const menuBtnLabel = this.add.text(cam.width - 70, 22, 'Menu', {
        font: 'bold 14px sans-serif',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2,
      }).setOrigin(0.5).setScrollFactor(0).setDepth(23);
      menuBtnBg.on('pointerover', () => menuBtnBg.setFillStyle(0x334155, 0.95));
      menuBtnBg.on('pointerout', () => menuBtnBg.setFillStyle(0x1e293b, 0.85));
      menuBtnBg.on('pointerdown', () => {
        menuBtnBg.disableInteractive();
        menuBtnLabel.setText('Voltando...');
        window.location.reload();
      });
    }

    const eyeHudX = this.cameras.main.width / 2;
    const eyeHudY = 42;
    this.eyeHudBg = this.add.rectangle(eyeHudX, eyeHudY, 180, 44, 0x1e1b4b, 0.75)
      .setStrokeStyle(2, 0xa855f7, 0.9)
      .setScrollFactor(0)
      .setDepth(22)
      .setVisible(false);
    this.eyeHudLabel = this.add.text(eyeHudX, eyeHudY - 10, 'FLYING EYE', {
      font: 'bold 11px sans-serif',
      color: '#d8b4fe',
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(23).setVisible(false);
    this.eyeHudText = this.add.text(eyeHudX, eyeHudY + 7, '20.0s', {
      font: 'bold 22px sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(23).setVisible(false);

    this.loots = [];
    this._lootIdCounter = 0;
    this._eyeActive = false;
    this._isLootAuthority = !this.isMultiplayer || (this.network && this.network.isHost);
    if (this._isLootAuthority) {
      this.scheduleNextLootSpawn(Phaser.Math.Between(1500, 3000));
    }
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
    if (!this._isLootAuthority) return;
    if (this.loots.length >= LOOT_MAX_ACTIVE) return;
    let key = typeKey;
    if (!key) {
      const eyeAlreadyOnMap = this.loots.some((l) => l.lootType === 'eye');
      const eyeBlocked = this._eyeActive || eyeAlreadyOnMap;
      const roll = Phaser.Math.FloatBetween(0, 1);
      if (roll < 0.1) key = 'hp';
      else if (roll < 0.2) key = 'shield';
      else if (roll < 0.25 && !eyeBlocked) key = 'eye';
      else key = 'wood';
    } else if (key === 'eye' && this._eyeActive) {
      return;
    }

    const margin = 40;
    const minClearance = 60;
    const minLootDistance = 110;
    let x = 0;
    let y = 0;
    let found = false;
    for (let attempt = 0; attempt < 30; attempt++) {
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
        for (const l of this.loots) {
          if (l.isPickedUp) continue;
          const dx = l.x - candidateX;
          const dy = l.y - candidateY;
          if (dx * dx + dy * dy < minLootDistance * minLootDistance) {
            blocked = true;
            break;
          }
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

    const power = key === 'wood' ? Phaser.Math.RND.pick(WOOD_POWER_POOL) : null;
    const id = ++this._lootIdCounter;
    this.createLootAt({ id, lootType: key, power, x, y });

    if (this.isMultiplayer && this.network && this.network.isHost) {
      this.sendLootNetMsg({ type: 'loot_spawn', id, lootType: key, power, x, y });
    }
  }

  sendLootNetMsg(msg) {
    if (!this.network) return;
    this.network.send(msg);
    this.time.delayedCall(220, () => { if (this.network) this.network.send(msg); });
    this.time.delayedCall(550, () => { if (this.network) this.network.send(msg); });
  }

  createLootAt({ id, lootType, power, x, y }) {
    const type = LOOT_TYPES[lootType];
    const powerDef = lootType === 'wood' && power ? POWERS[power] : null;
    const customIdleKey = powerDef?.lootIdleKey;
    const customCatchKey = powerDef?.lootCatchKey;
    const idleKey = customIdleKey ?? type.idleKey;
    const catchKey = customCatchKey ?? type.catchKey;
    const glowKey = powerDef?.lootGlowKey ?? type.glowKey;
    const idleFrameSize = powerDef?.lootFrameSize ?? type.idleFrameSize ?? LOOT_FRAME_SIZE;
    const idleFrameHeight = powerDef?.lootFrameHeight ?? idleFrameSize;
    const idleScale = powerDef?.lootScale ?? type.idleScale ?? LOOT_SCALE;

    const glowBaseScale = powerDef?.lootGlowScale ?? 0.55;
    const glowPulseScale = powerDef?.lootGlowPulseScale ?? 0.75;
    const glow = this.add.image(x, y, glowKey)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(DEFAULT_SPRITE_DEPTH - 1)
      .setScale(glowBaseScale);
    const glowPulse = this.tweens.add({
      targets: glow,
      scale: glowPulseScale,
      alpha: 0.55,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    const loot = this.physics.add.sprite(x, y, idleKey, 0);
    loot.setScale(idleScale);
    loot.setDepth(DEFAULT_SPRITE_DEPTH);
    loot.netId = id;
    loot.lootType = lootType;
    loot.catchKey = catchKey;
    loot.catchScale = powerDef?.lootCatchScale ?? type.catchScale;
    loot.glow = glow;
    loot.glowPulse = glowPulse;

    if (lootType === 'wood' && power) loot.power = power;
    if (powerDef?.lootTintFill !== undefined) {
      loot.setTintFill(powerDef.lootTintFill);
    }

    if (!customIdleKey && lootType === 'wood' && power) {
      const overlayTint = POWERS[power].orbColor;
      const tintOverlay = this.add.sprite(x, y, idleKey, 0)
        .setScale(idleScale)
        .setDepth(DEFAULT_SPRITE_DEPTH + 0.5)
        .setTintFill(overlayTint)
        .setAlpha(0);
      tintOverlay.anims.play(idleKey);
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
    } else if (!customIdleKey) {
      const tintOverlay = this.add.sprite(x, y, idleKey, 0)
        .setScale(idleScale)
        .setDepth(DEFAULT_SPRITE_DEPTH + 0.5)
        .setTintFill(0xffffff)
        .setAlpha(0);
      tintOverlay.anims.play(idleKey);
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
    }
    loot.body.setSize(LOOT_BODY_SIZE, LOOT_BODY_SIZE);
    loot.body.setOffset(
      (idleFrameSize - LOOT_BODY_SIZE) / 2,
      (idleFrameHeight - LOOT_BODY_SIZE) / 2
    );

    if (lootType === 'eye') {
      const beam = this.add.image(x, 0, 'eye_beam')
        .setOrigin(0.5, 0)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(DEFAULT_SPRITE_DEPTH + 0.6)
        .setDisplaySize(70, Math.max(120, y + 80))
        .setAlpha(0.85);
      loot.beam = beam;
      loot.beamPulse = this.tweens.add({
        targets: beam,
        alpha: 0.45,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
      const footGlow = this.add.image(x, y + 30, 'eye_beam')
        .setOrigin(0.5, 0.5)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(DEFAULT_SPRITE_DEPTH - 0.4)
        .setDisplaySize(110, 70)
        .setAlpha(0.7);
      loot.footGlow = footGlow;
      loot.footGlowPulse = this.tweens.add({
        targets: footGlow,
        alpha: 0.4,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }
    loot.setCollideWorldBounds(true);
    loot.anims.play(idleKey);

    this.physics.add.collider(loot, this.platformZones, null, this.oneWayProcessCallback);

    loot.isPickedUp = false;
    if (this._isLootAuthority) {
      const lifetimeMs = Phaser.Math.Between(LOOT_LIFETIME_MIN_MS, LOOT_LIFETIME_MAX_MS);
      loot.lifetimeTimer = this.time.delayedCall(lifetimeMs, () => this.despawnLoot(loot));
    }

    this.loots.push(loot);
    return loot;
  }

  findLootByNetId(id) {
    return this.loots.find((l) => l.netId === id) || null;
  }

  despawnLoot(loot, opts) {
    if (!loot.active || loot.isPickedUp) return;
    const fromNetwork = !!(opts && opts.fromNetwork);
    const reason = opts && opts.reason;
    if (!fromNetwork && this.isMultiplayer && this.network && this.network.isHost) {
      this.sendLootNetMsg({ type: 'loot_despawn', id: loot.netId, reason });
    }
    if (loot.whitePulse) loot.whitePulse.stop();
    if (loot.beamPulse) loot.beamPulse.stop();
    if (reason === 'shatter') {
      loot.isPickedUp = true;
      loot.body.enable = false;
      if (loot.glowPulse) loot.glowPulse.stop();
      this.tweens.add({
        targets: [loot.glow, loot.tintOverlay, loot.beam, loot.footGlow].filter(Boolean),
        alpha: 0,
        duration: 200,
      });
      if (loot.catchScale !== undefined) loot.setScale(loot.catchScale);
      const catchKey = loot.catchKey;
      if (catchKey && this.anims.exists(catchKey)) {
        loot.anims.play(catchKey);
        loot.once(`animationcomplete-${catchKey}`, () => this.removeLoot(loot));
      } else {
        this.tweens.add({
          targets: loot,
          alpha: 0,
          duration: 250,
          onComplete: () => this.removeLoot(loot),
        });
      }
      return;
    }
    this.tweens.add({
      targets: [loot, loot.glow, loot.tintOverlay, loot.beam, loot.footGlow].filter(Boolean),
      alpha: 0,
      duration: 400,
      onComplete: () => {
        this.removeLoot(loot);
      },
    });
  }

  pickupLoot(loot, fighter, opts) {
    if (loot.isPickedUp) return;
    loot.isPickedUp = true;
    this.triggerPickupFlash(fighter);
    if (loot.lootType === 'wood') this.playSfx('sfx_power_pickup', 1, 0.4);
    else if (loot.lootType === 'hp') this.playSfx('sfx_cure', 0.6, 0.3);
    else if (loot.lootType === 'shield') this.playSfx('sfx_shield_break');
    else if (loot.lootType === 'eye') this.playSfx('sfx_power_pickup', 1, 0.4);
    const type = LOOT_TYPES[loot.lootType];
    const isRemotePick = !!(opts && opts.fromNetwork);
    if (!isRemotePick) {
      type.onPickup(this, fighter, loot);
    }
    if (
      !isRemotePick &&
      (loot.lootType === 'hp' || loot.lootType === 'shield') &&
      fighter === this.playerFighter
    ) {
      this.resetAttackOrbs();
    }
    if (this.isMultiplayer && !isRemotePick && fighter === this.playerFighter) {
      this.sendLootNetMsg({
        type: 'loot_pickup',
        id: loot.netId,
        pickerIndex: this.myIndex,
      });
    }
    if (loot.lifetimeTimer) loot.lifetimeTimer.remove(false);
    loot.body.enable = false;
    if (loot.glowPulse) loot.glowPulse.stop();
    if (loot.whitePulse) loot.whitePulse.stop();
    if (loot.beamPulse) loot.beamPulse.stop();
    this.tweens.add({
      targets: [loot.glow, loot.tintOverlay, loot.beam, loot.footGlow].filter(Boolean),
      alpha: 0,
      duration: 200,
    });
    if (loot.catchScale !== undefined) loot.setScale(loot.catchScale);
    const catchKey = loot.catchKey || type.catchKey;
    loot.anims.play(catchKey);
    loot.once(`animationcomplete-${catchKey}`, () => {
      this.removeLoot(loot);
    });
  }

  removeLoot(loot) {
    const idx = this.loots.indexOf(loot);
    if (idx !== -1) this.loots.splice(idx, 1);
    if (loot.glowPulse) loot.glowPulse.stop();
    if (loot.whitePulse) loot.whitePulse.stop();
    if (loot.beamPulse) loot.beamPulse.stop();
    if (loot.footGlowPulse) loot.footGlowPulse.stop();
    if (loot.glow) loot.glow.destroy();
    if (loot.tintOverlay) loot.tintOverlay.destroy();
    if (loot.beam) loot.beam.destroy();
    if (loot.footGlow) loot.footGlow.destroy();
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

    const powerIcons = [0, 1].map(() =>
      this.add.circle(0, 0, 4, 0xffffff)
        .setStrokeStyle(1, 0x0f172a)
        .setDepth(16)
        .setVisible(false)
    );

    const eyeLifeIcons = [0, 1, 2, 3].map(() => {
      const c = this.add.container(0, 0);
      const outer = this.add.circle(0, 0, EYE_LIFE_ICON_RADIUS, 0xffffff)
        .setStrokeStyle(1.5, 0x1e1408);
      const inner = this.add.circle(0, 0, EYE_LIFE_ICON_RADIUS * 0.55, 0x78350f);
      const pupil = this.add.circle(0, 0, EYE_LIFE_ICON_RADIUS * 0.25, 0x000000);
      c.add([outer, inner, pupil]);
      c.setDepth(17);
      c.setVisible(false);
      return c;
    });

    const eyeDashBarBg = this.add.rectangle(0, 0, EYE_DASH_BAR_WIDTH, EYE_DASH_BAR_HEIGHT, 0x000000, 0.6)
      .setStrokeStyle(1, 0x1e1408)
      .setDepth(17)
      .setVisible(false);
    const eyeDashBarFill = this.add.rectangle(0, 0, EYE_DASH_BAR_WIDTH - 2, EYE_DASH_BAR_HEIGHT - 2, 0x38bdf8)
      .setOrigin(0, 0.5)
      .setDepth(18)
      .setVisible(false);
    const eyeAttackBarBg = this.add.rectangle(0, 0, EYE_DASH_BAR_WIDTH, EYE_DASH_BAR_HEIGHT, 0x000000, 0.6)
      .setStrokeStyle(1, 0x1e1408)
      .setDepth(17)
      .setVisible(false);
    const eyeAttackBarFill = this.add.rectangle(0, 0, EYE_DASH_BAR_WIDTH - 2, EYE_DASH_BAR_HEIGHT - 2, 0xfacc15)
      .setOrigin(0, 0.5)
      .setDepth(18)
      .setVisible(false);

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
      powerIcons,
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
      isEye: false,
      eyeHitsRemaining: 0,
      eyeFacing: 1,
      eyeDashCooldownUntil: 0,
      eyeDashUntil: 0,
      eyeOriginalState: null,
      eyeLifeIcons,
      eyeDashBarBg,
      eyeDashBarFill,
      eyeAttackBarBg,
      eyeAttackBarFill,
      eyeDashDirX: 1,
      eyeDashDirY: 0,
      eyeAttackCooldownUntil: 0,
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
    sprite.on('animationcomplete-eye_attack', () => {
      fighter.isAttacking = false;
      if (fighter === this.playerFighter) {
        this.attackHitbox.body.enable = false;
        this.attackHitbox.setVisible(false);
        this.targetsHitThisAttack.clear();
      }
      if (fighter.isEye) sprite.anims.play('eye_flight', true);
    });
    sprite.on('animationcomplete-eye_take_hit', () => {
      if (fighter.isEye && !fighter.isAttacking) sprite.anims.play('eye_flight', true);
    });

    return fighter;
  }

  damageFighter(fighter, amount, opts) {
    if (fighter.isInvulnerable || fighter.isDead) return;
    const ignoreShield = !!(opts && opts.ignoreShield);
    const ignoreCurseMultiplier = !!(opts && opts.ignoreCurseMultiplier);
    let finalAmount = amount * (ignoreCurseMultiplier ? 1 : (fighter.curseMultiplier || 1));
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
    phys.airSound = null;
    phys.groundSound = null;
    phys.hasTouchedGround = false;

    phys.platformCollider = this.physics.add.collider(
      phys,
      this.platformZones,
      null,
      this.oneWayProcessCallback
    );

    this.wheelProjectiles.push(phys);
  }

  updateWheelLoopSound(w, onGround) {
    if (onGround && !w.hasTouchedGround) {
      w.hasTouchedGround = true;
      if (w.airSound) {
        if (w.airSound.isPlaying) w.airSound.stop();
        w.airSound.destroy();
        w.airSound = null;
      }
    }
    if (w.hasTouchedGround) {
      if (!w.groundSound && this.cache.audio.exists('sfx_wheel_ground')) {
        w.groundSound = this.sound.add('sfx_wheel_ground', {
          loop: true,
          volume: this.masterVolume * this.sfxScale,
        });
      }
      if (w.groundSound && !w.groundSound.isPlaying) w.groundSound.play({ seek: 1 });
    } else {
      if (!w.airSound && this.cache.audio.exists('sfx_wheel_air')) {
        w.airSound = this.sound.add('sfx_wheel_air', {
          loop: true,
          volume: this.masterVolume * this.sfxScale,
        });
      }
      if (w.airSound && !w.airSound.isPlaying) w.airSound.play();
    }
  }

  stopWheelSounds(w) {
    if (w.airSound) {
      if (w.airSound.isPlaying) w.airSound.stop();
      w.airSound.destroy();
      w.airSound = null;
    }
    if (w.groundSound) {
      if (w.groundSound.isPlaying) w.groundSound.stop();
      w.groundSound.destroy();
      w.groundSound = null;
    }
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
        fb.y + 14,
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
    this.playSfx('sfx_crow_die', 0.2);
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
    if (fighter.isEye) this.revertFromEye(fighter);
    if (fighter.isFrozen) this.removeFreeze(fighter);
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
    for (const icon of fighter.powerIcons) icon.setVisible(false);
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
      if (fighter === this.playerFighter) {
        this.showSpectatorBanner();
      }
      this.checkMatchOver();
      return;
    }

    this.time.delayedCall(RESPAWN_DELAY_MS, () => {
      this.respawnFighter(fighter);
    });
  }

  applyRemoteDeath(fighter) {
    fighter.isDead = true;
    this.removeShield(fighter);
    this.removeSkullCurse(fighter);
    this.removeStun(fighter);
    this.spawnDeathMarker(fighter);
    fighter.sprite.setVisible(false);
    fighter.sprite.body.setVelocity(0, 0);
    fighter.hpBarBg.setVisible(false);
    fighter.hpBarFill.setVisible(false);
    for (const icon of fighter.powerIcons) icon.setVisible(false);
    fighter.glow.setVisible(false);
    fighter.flashSprite.setAlpha(0);
    fighter.hitFlashSprite.setAlpha(0);
    fighter.pickupFlashSprite.setAlpha(0);
    this.tweens.killTweensOf(fighter.flashSprite);
    this.tweens.killTweensOf(fighter.hitFlashSprite);
    this.tweens.killTweensOf(fighter.pickupFlashSprite);
  }

  showSpectatorBanner() {
    if (this.spectatorBanner || this.matchOver) return;
    const cam = this.cameras.main;
    this.spectatorBanner = this.add.text(
      cam.width / 2,
      40,
      'Você foi eliminado — Espectador',
      {
        font: 'bold 22px sans-serif',
        color: '#ef4444',
        stroke: '#000000',
        strokeThickness: 4,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: { x: 12, y: 6 },
      }
    ).setOrigin(0.5, 0).setScrollFactor(0).setDepth(99);
  }

  checkMatchOver() {
    if (!this.isMultiplayer || this.matchOver) return;
    const alive = this.fighters.filter((f) => f.lives > 0);
    if (alive.length > 1) return;
    this.matchOver = true;
    if (this.spectatorBanner) {
      this.spectatorBanner.destroy();
      this.spectatorBanner = null;
    }
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
    const btnX = cam.width / 2;
    const btnY = cam.height / 2 + 90;
    const btnW = 240;
    const btnH = 56;
    const btnBg = this.add.rectangle(btnX, btnY, btnW, btnH, 0x22c55e, 1)
      .setStrokeStyle(3, 0x0f5132)
      .setScrollFactor(0)
      .setDepth(101)
      .setInteractive({ useHandCursor: true });
    const btnLabel = this.add.text(btnX, btnY, 'Jogar novamente', {
      font: 'bold 22px sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(102);
    btnBg.on('pointerover', () => btnBg.setFillStyle(0x16a34a));
    btnBg.on('pointerout', () => btnBg.setFillStyle(0x22c55e));
    btnBg.on('pointerdown', () => {
      btnBg.disableInteractive();
      btnLabel.setText('Reiniciando...');
      if (this.network) {
        this.network.send({ type: 'match_restart' });
        this.time.delayedCall(180, () => { if (this.network) this.network.send({ type: 'match_restart' }); });
      }
      this.time.delayedCall(140, () => this.scene.restart(this.initData));
    });
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
    this.playSfx('sfx_heavens_fury_belezam');

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

    const aura = this.add.image(startX, startY, 'glow_purple_light')
      .setBlendMode(Phaser.BlendModes.ADD)
      .setScale(1.05)
      .setDepth(ATTACKER_DEPTH - 0.1)
      .setAlpha(0.95);
    const auraPulse = this.tweens.add({
      targets: aura,
      scale: 1.25,
      alpha: 0.7,
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
    target.curseSlowed = true;
    if (target.curseSlowTimer) target.curseSlowTimer.remove(false);
    target.curseSlowTimer = this.time.delayedCall(SKULL_CURSE_SLOW_MS, () => {
      target.curseSlowed = false;
      target.curseSlowTimer = null;
    });
    if (this.isAuthoritativeOwner(target)) {
      if (target.curseDotTimer) target.curseDotTimer.remove(false);
      const ticks = 10;
      const tickDamage = SKULL_CURSE_DAMAGE / ticks;
      target.curseDotTimer = this.time.addEvent({
        delay: SKULL_CURSE_DEBUFF_DURATION_MS / ticks,
        repeat: ticks - 1,
        callback: () => {
          if (!target || target.isDead) return;
          this.damageFighter(target, tickDamage, { ignoreShield: true, ignoreCurseMultiplier: true });
        },
      });
    }
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
    target.curseSlowed = false;
    if (target.curseSlowTimer) {
      target.curseSlowTimer.remove(false);
      target.curseSlowTimer = null;
    }
    if (target.curseTimer) {
      target.curseTimer.remove(false);
      target.curseTimer = null;
    }
    if (target.curseDotTimer) {
      target.curseDotTimer.remove(false);
      target.curseDotTimer = null;
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

  fireIceBeam(fighter, worldX, worldY) {
    const totalMs = ICE_BEAM_CAST_MS + ICE_BEAM_DURATION_MS;
    const castSfx = this.sound.add('sfx_ice_cast', {
      volume: this.masterVolume * this.sfxScale * 0.9,
    });
    castSfx.play();
    this.time.delayedCall(totalMs, () => {
      if (castSfx && castSfx.isPlaying) castSfx.stop();
      castSfx.destroy();
    });
    const beam = {
      caster: fighter,
      beamId: `ice_${fighter.ownerIndex ?? 0}_${this.time.now}_${Math.floor(Math.random() * 1e6)}`,
      startTime: this.time.now,
      activeStartTime: 0,
      state: 'casting',
      aimX: worldX,
      aimY: worldY,
      currentAngle: 0,
      graphics: this.add.graphics().setDepth(ATTACKER_DEPTH + 0.2),
      castGlow: null,
      castSfx,
      castFxSprite: null,
      emitter: null,
      lastTickAt: 0,
      lastParticleAt: 0,
    };
    beam.emitter = this.add.particles(0, 0, 'ice_particles', {
      lifespan: 420,
      speed: { min: 20, max: 60 },
      angle: { min: 0, max: 360 },
      scale: { start: 1.1, end: 0.2 },
      alpha: { start: 0.95, end: 0 },
      blendMode: Phaser.BlendModes.ADD,
      frequency: -1,
      emitting: false,
    });
    beam.emitter.setDepth(ATTACKER_DEPTH + 0.3);
    const sbInit = fighter.sprite.body;
    const fxX = sbInit.x + sbInit.width / 2;
    const fxY = sbInit.y + sbInit.height / 2;
    beam.castFxSprite = this.add.sprite(fxX, fxY, 'ice_cast_fx', 0)
      .setScale(3.2)
      .setDepth(fighter.sprite.depth + 0.2)
      .setBlendMode(Phaser.BlendModes.ADD);
    beam.castFxSprite.play('ice_cast_fx');
    const sb = fighter.sprite.body;
    const cx = sb.x + sb.width / 2;
    const cy = sb.y + sb.height / 2;
    beam.currentAngle = Math.atan2(worldY - cy, worldX - cx);

    beam.castGlow = this.add.image(cx, cy, 'glow_blue')
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(ATTACKER_DEPTH + 0.1)
      .setScale(0.2)
      .setAlpha(0.9);
    this.tweens.add({
      targets: beam.castGlow,
      scale: 0.75,
      alpha: 1,
      duration: ICE_BEAM_CAST_MS,
      ease: 'Sine.easeOut',
    });

    this.iceBeams = this.iceBeams || [];
    this.iceBeams.push(beam);
  }

  drawIceBeam(beam, cx, cy, endX, endY, intensity) {
    const g = beam.graphics;
    g.clear();
    const thickness = ICE_BEAM_THICKNESS * intensity;
    g.lineStyle(thickness + 10, 0x7dd3fc, 0.5);
    g.lineBetween(cx, cy, endX, endY);
    g.lineStyle(Math.max(2, thickness * 0.4), 0xffffff, 1);
    g.lineBetween(cx, cy, endX, endY);
    if (this.hitboxesVisible) {
      g.lineStyle(ICE_BEAM_HIT_RADIUS * 2, 0xff3344, 0.22);
      g.lineBetween(cx, cy, endX, endY);
      g.lineStyle(1, 0xff3344, 0.9);
      g.lineBetween(cx, cy, endX, endY);
    }
  }

  spawnIceBeamParticle(beam, x, y) {
    if (beam.emitter) beam.emitter.emitParticleAt(x, y, 1);
  }

  iceBeamComputeEnd(cx, cy, angle) {
    const far = 2400;
    return { x: cx + Math.cos(angle) * far, y: cy + Math.sin(angle) * far };
  }

  iceBeamTick(beam, cx, cy, endX, endY) {
    const caster = beam.caster;
    for (const target of this.fighters) {
      if (target === caster) continue;
      if (target.isDead || target.isInvulnerable) continue;
      const tb = target.sprite.body;
      const dx = tb.x + tb.width / 2;
      const samples = [
        [dx, tb.y + 2],
        [dx, tb.y + tb.height / 2],
        [dx, tb.y + tb.height - 2],
        [tb.x + 2, tb.y + tb.height / 2],
        [tb.x + tb.width - 2, tb.y + tb.height / 2],
      ];
      let hit = false;
      for (const [sx, sy] of samples) {
        if (pointToSegmentDistance(sx, sy, cx, cy, endX, endY) <= ICE_BEAM_HIT_RADIUS) {
          hit = true;
          break;
        }
      }
      if (hit) {
        this.dealHit(target, {
          damage: 0,
          ignoreShield: true,
          iceTick: true,
          iceBeamId: beam.beamId,
          playHitSfx: false,
          powerFlashColor: null,
        });
      }
    }
  }

  spawnIceBeamHitVfx(x, y) {
    const vfx = this.add.sprite(x, y, 'ice_beam_hit', 0)
      .setDepth(ATTACKER_DEPTH + 0.4)
      .setScale(2.2)
      .setBlendMode(Phaser.BlendModes.ADD);
    vfx.play('ice_beam_hit');
    vfx.once('animationcomplete-ice_beam_hit', () => vfx.destroy());
  }

  applyIceTick(target, beamId) {
    const now = this.time.now;
    if (target.isDead) return;
    if (target.isFrozen) {
      target.frozenUntil = now + ICE_FREEZE_DURATION_MS;
      target.iceBeamId = beamId || target.iceBeamId;
      return;
    }
    if (beamId && target.iceBeamId !== beamId) {
      target.iceBeamId = beamId;
      target.iceTickCount = 0;
    }
    target.iceTickCount = (target.iceTickCount || 0) + 1;
    target.iceLastTickAt = now;
    target.iceSlowUntil = now + ICE_SLOW_DURATION_MS;
    const progress = Math.min(1, target.iceTickCount / ICE_HITS_TO_FREEZE);
    target.iceSlowFactor =
      ICE_SLOW_FACTOR_START - progress * (ICE_SLOW_FACTOR_START - ICE_SLOW_FACTOR_MIN);
    target.iceSlowActive = true;
    if (target.iceTickCount % 5 === 0 && target.shieldCharges > 0) {
      target.shieldCharges -= 1;
      if (target.shieldCharges <= 0) {
        this.playSfx('sfx_shield_break');
        this.removeShield(target);
      }
    }
    if (target.iceTickCount >= ICE_HITS_TO_FREEZE) {
      this.applyFreeze(target);
    }
    if (target.iceTickCount % 5 === 0) {
      const tb = target.sprite.body;
      this.spawnIceBeamHitVfx(tb.x + tb.width / 2, tb.y + tb.height / 2);
    }
  }

  applyFreeze(target) {
    if (target.isFrozen || target.isDead) return;
    target.isFrozen = true;
    target.frozenUntil = this.time.now + ICE_FREEZE_DURATION_MS;
    target.iceSlowActive = false;
    const body = target.sprite.body;
    body.setVelocity(0, 0);
    if (target.isEye) {
      body.allowGravity = true;
      body.setGravityY(this.physics.world.gravity.y);
    }
    if (target === this.playerFighter) {
      target.isAttacking = false;
      this.attackHitbox.body.enable = false;
      this.attackHitbox.setVisible(false);
      this.targetsHitThisAttack.clear();
      this.attackQueued = false;
      this.powerQueued = false;
    }
    target.sprite.setTint(0x3b82f6);
    const tb = target.sprite.body;
    const cx = tb.x + tb.width / 2;
    const cy = tb.y + tb.height / 2;
    if (target.frozenTintSprite) target.frozenTintSprite.destroy();
    target.frozenTintSprite = this.add.sprite(
      target.sprite.x,
      target.sprite.y,
      target.sprite.texture.key,
      target.sprite.frame.name,
    )
      .setScale(target.sprite.scaleX, target.sprite.scaleY)
      .setFlipX(target.sprite.flipX)
      .setTintFill(0x7dd3fc)
      .setAlpha(0.55)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(target.sprite.depth + 0.05);
    if (target.frozenOverlay) target.frozenOverlay.destroy();
    target.frozenOverlay = this.add.sprite(cx, cy, 'player_frozen', 0)
      .setDepth(target.sprite.depth + 0.1)
      .setScale(3.2)
      .setAlpha(0.95)
      .setBlendMode(Phaser.BlendModes.NORMAL);
    target.frozenOverlay.play('player_frozen');
  }

  removeFreeze(target) {
    if (!target.isFrozen) return;
    target.isFrozen = false;
    target.frozenUntil = 0;
    target.iceTickCount = 0;
    target.iceSlowActive = false;
    target.sprite.clearTint();
    if (target.frozenOverlay) {
      target.frozenOverlay.destroy();
      target.frozenOverlay = null;
    }
    if (target.frozenTintSprite) {
      target.frozenTintSprite.destroy();
      target.frozenTintSprite = null;
    }
    if (!target.isDead) this.playSfx('sfx_ice_crash', 0.9);
  }

  updateIceBeams(time) {
    if (!this.iceBeams || this.iceBeams.length === 0) return;
    for (let i = this.iceBeams.length - 1; i >= 0; i--) {
      const b = this.iceBeams[i];
      const caster = b.caster;
      if (!caster || caster.isDead) {
        this.cleanupIceBeam(b);
        this.iceBeams.splice(i, 1);
        continue;
      }
      const cb = caster.sprite.body;
      const cx = cb.x + cb.width / 2;
      const cy = cb.y + cb.height / 2;
      if (b.castFxSprite) b.castFxSprite.setPosition(cx, cy);

      if (b.state === 'casting') {
        if (b.castGlow) b.castGlow.setPosition(cx, cy);
        if (time - b.startTime >= ICE_BEAM_CAST_MS) {
          b.state = 'active';
          b.activeStartTime = time;
          if (b.castGlow) { b.castGlow.destroy(); b.castGlow = null; }
        }
        continue;
      }

      if (caster.isFrozen) {
        this.cleanupIceBeam(b);
        this.iceBeams.splice(i, 1);
        continue;
      }
      if (time - b.activeStartTime >= ICE_BEAM_DURATION_MS) {
        this.cleanupIceBeam(b);
        this.iceBeams.splice(i, 1);
        continue;
      }

      if (caster === this.playerFighter) {
        const pointer = this.input.activePointer;
        b.aimX = pointer.worldX;
        b.aimY = pointer.worldY;
      }
      const targetAngle = Math.atan2(b.aimY - cy, b.aimX - cx);
      const diff = Phaser.Math.Angle.Wrap(targetAngle - b.currentAngle);
      b.currentAngle = Phaser.Math.Angle.Wrap(b.currentAngle + diff * ICE_BEAM_FOLLOW_STRENGTH);
      const end = this.iceBeamComputeEnd(cx, cy, b.currentAngle);

      const activeElapsed = time - b.activeStartTime;
      let intensity = 1;
      if (activeElapsed < 150) intensity = activeElapsed / 150;
      const remaining = ICE_BEAM_DURATION_MS - activeElapsed;
      if (remaining < 250) intensity *= remaining / 250;
      this.drawIceBeam(b, cx, cy, end.x, end.y, intensity);

      if (time - b.lastParticleAt > 140) {
        b.lastParticleAt = time;
        const steps = 3;
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          const px = cx + (end.x - cx) * t;
          const py = cy + (end.y - cy) * t;
          this.spawnIceBeamParticle(b, px, py);
        }
      }

      if (this.isAuthoritativeOwner(caster) && time - b.lastTickAt >= ICE_BEAM_TICK_MS) {
        b.lastTickAt = time;
        this.iceBeamTick(b, cx, cy, end.x, end.y);
      }
    }
  }

  cleanupIceBeam(b) {
    if (b.graphics) b.graphics.destroy();
    if (b.castGlow) b.castGlow.destroy();
    if (b.castFxSprite) b.castFxSprite.destroy();
    if (b.emitter) b.emitter.destroy();
    if (b.castSfx) {
      if (b.castSfx.isPlaying) b.castSfx.stop();
    }
  }

  updateFrozenStates(time) {
    for (const f of this.fighters) {
      if (f.isFrozen) {
        if (time >= f.frozenUntil) {
          this.removeFreeze(f);
        } else {
          const tb = f.sprite.body;
          if (f.frozenOverlay) {
            f.frozenOverlay.setPosition(tb.x + tb.width / 2, tb.y + tb.height / 2);
          }
          if (f.frozenTintSprite) {
            f.frozenTintSprite.setTexture(f.sprite.texture.key, f.sprite.frame.name);
            f.frozenTintSprite.setPosition(f.sprite.x, f.sprite.y);
            f.frozenTintSprite.setScale(f.sprite.scaleX, f.sprite.scaleY);
            f.frozenTintSprite.setFlipX(f.sprite.flipX);
          }
        }
      } else if (f.iceSlowActive && time >= (f.iceSlowUntil || 0)) {
        f.iceSlowActive = false;
        f.iceSlowFactor = 1;
      }
    }
  }

  fireFireStorm(fighter) {
    for (let w = 0; w < FIRE_STORM_WAVES; w++) {
      const delay = w * FIRE_STORM_WAVE_DELAY_MS;
      this.time.delayedCall(delay, () => {
        if (!fighter || fighter.isDead) return;
        this.spawnFireStormWave(fighter);
      });
    }
  }

  spawnFireStormWave(fighter) {
    this.playSfx('sfx_fire_storm', 1, 0.2);
    this.playSfx('sfx_fire_storm_2', 1, 0.4);
    const body = fighter.sprite.body;
    const startX = body.x + body.width / 2;
    const startY = body.y + body.height / 2;
    const hitSet = new Set();

    const burst = this.add.image(startX, startY, 'glow_orange')
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(ATTACKER_DEPTH - 0.1)
      .setScale(0.5)
      .setAlpha(0.9);
    this.tweens.add({
      targets: burst,
      alpha: 0,
      scale: 1.4,
      duration: 420,
      onComplete: () => burst.destroy(),
    });
    this.spawnFireStormHit(fighter);

    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 4) * i;
      this.spawnFireStormRay(fighter, startX, startY, angle, hitSet);
    }
  }

  spawnFireStormRay(fighter, startX, startY, angle, hitSet) {
    const vx = Math.cos(angle) * FIRE_STORM_SPEED;
    const vy = Math.sin(angle) * FIRE_STORM_SPEED;

    const aura = this.add.image(startX, startY, 'glow_orange')
      .setBlendMode(Phaser.BlendModes.ADD)
      .setScale(0.45)
      .setDepth(ATTACKER_DEPTH - 0.1)
      .setAlpha(0.85);
    const auraPulse = this.tweens.add({
      targets: aura,
      scale: 0.6,
      alpha: 0.55,
      duration: 220,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    const ray = this.physics.add.sprite(startX, startY, 'fire_storm', 0);
    ray.setScale(FIRE_STORM_SCALE);
    ray.setDepth(ATTACKER_DEPTH);
    ray.setRotation(angle);
    ray.body.allowGravity = false;
    ray.body.setSize(FIRE_STORM_RAY_BODY, FIRE_STORM_RAY_BODY, true);
    ray.body.setVelocity(vx, vy);
    ray.setCollideWorldBounds(false);
    ray.setBlendMode(Phaser.BlendModes.ADD);
    ray.ownerFighter = fighter;
    ray.hitSet = hitSet;
    ray.aura = aura;
    ray.auraPulse = auraPulse;
    ray.play('fire_storm_ray');

    this.fireStormRays.push(ray);
  }

  spawnFireStormHit(fighter) {
    const body = fighter.sprite.body;
    const vfx = this.add.sprite(
      body.x + body.width / 2,
      body.y + body.height / 2,
      'fire_storm_hit',
      0,
    )
      .setScale(FIRE_STORM_HIT_SCALE)
      .setDepth(ATTACKER_DEPTH + 0.5)
      .setBlendMode(Phaser.BlendModes.ADD);
    vfx.follow = fighter;
    vfx.play('fire_storm_hit');
    vfx.once('animationcomplete', () => {
      const idx = this.fireStormHitVfx.indexOf(vfx);
      if (idx >= 0) this.fireStormHitVfx.splice(idx, 1);
      vfx.destroy();
    });
    this.fireStormHitVfx.push(vfx);
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
              heavensFury: true,
              powerFlashColor: POWERS.heavens_fury.orbColor,
            });
          } else if (
            ty < groundTop &&
            ty >= 0 &&
            dx <= HEAVENS_FURY_BEAM_HALF_WIDTH
          ) {
            this.dealHit(target, {
              damage: MAX_HP * 0.8,
              ignoreShield: true,
              heavensFury: true,
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
        if (this._isLootAuthority) {
          const lootsToKill = [];
          for (const l of this.loots) {
            if (l.isPickedUp) continue;
            const lx = l.x;
            const ly = l.y;
            const dx = Math.abs(lx - worldX);
            const inGroundZone = ly >= groundTop && ly <= groundBottom;
            if (
              (inGroundZone && dx <= HEAVENS_FURY_STRIKE_HALF_WIDTH) ||
              (ly < groundTop && ly >= 0 && dx <= HEAVENS_FURY_BEAM_HALF_WIDTH)
            ) {
              lootsToKill.push(l);
            }
          }
          for (const l of lootsToKill) this.despawnLoot(l, { reason: 'shatter' });
        }
      }
    });
    sprite.once('animationcomplete', () => sprite.destroy());
  }

  castQueuedPower(fighter) {
    const power = fighter.specialPowers[0];
    const pointer = this.input.activePointer;
    if (power === 'heavens_fury') {
      this.firePower(fighter, pointer.worldX, pointer.worldY);
      fighter.specialPowers.shift();
      this.sendPowerCast('heavens_fury', { worldX: pointer.worldX, worldY: pointer.worldY });
    } else if (power === 'shield') {
      fighter.specialPowers.shift();
      if (fighter.isEye) {
        fighter.eyeHitsRemaining = Math.min(EYE_HITS_HARD_CAP, fighter.eyeHitsRemaining + EYE_HITS_SHIELD_LOOT_BONUS);
      } else {
        this.applyShield(fighter);
        this.resetAttackOrbs();
      }
      this.sendPowerCast('shield', {});
    } else if (power === 'skull_curse') {
      fighter.specialPowers.shift();
      this.fireSkullCurse(fighter, pointer.worldX, pointer.worldY);
      this.sendPowerCast('skull_curse', { worldX: pointer.worldX, worldY: pointer.worldY });
    } else if (power === 'wheel') {
      fighter.specialPowers.shift();
      this.fireWheel(fighter, pointer.worldX);
      this.sendPowerCast('wheel', { worldX: pointer.worldX });
    } else if (power === 'fire_storm') {
      fighter.specialPowers.shift();
      this.fireFireStorm(fighter);
      this.sendPowerCast('fire_storm', {});
    } else if (power === 'ice_beam') {
      fighter.specialPowers.shift();
      this.fireIceBeam(fighter, pointer.worldX, pointer.worldY);
      this.sendPowerCast('ice_beam', { worldX: pointer.worldX, worldY: pointer.worldY });
    }
  }

  spawnDoubleJumpEffect(fighter) {
    const sprite = fighter.sprite;
    const body = sprite.body;
    const cx = body.x + body.width / 2;
    const cy = body.y + body.height;
    const tint = fighter.char.tintColor;

    const ring = this.add.ellipse(cx, cy, 40, 16, tint, 0.8)
      .setDepth(DEFAULT_SPRITE_DEPTH - 1)
      .setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({
      targets: ring,
      scaleX: 3.2,
      scaleY: 2.2,
      alpha: 0,
      duration: 420,
      ease: 'Cubic.easeOut',
      onComplete: () => ring.destroy(),
    });

    for (let i = 0; i < 6; i++) {
      const angle = Math.PI + (Math.PI * (i + 0.5)) / 6;
      const dist = 18;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist * 0.4;
      const puff = this.add.circle(px, py, 6, tint, 0.9)
        .setDepth(DEFAULT_SPRITE_DEPTH - 1)
        .setBlendMode(Phaser.BlendModes.ADD);
      this.tweens.add({
        targets: puff,
        x: px + Math.cos(angle) * 40,
        y: py + Math.sin(angle) * 20,
        scale: 0.2,
        alpha: 0,
        duration: 380,
        ease: 'Cubic.easeOut',
        onComplete: () => puff.destroy(),
      });
    }

    const sil = this.add.sprite(sprite.x, sprite.y, sprite.texture.key, sprite.frame.name)
      .setScale(sprite.scaleX)
      .setFlipX(sprite.flipX)
      .setTintFill(tint)
      .setAlpha(0.55)
      .setDepth(DEFAULT_SPRITE_DEPTH - 0.5);
    this.tweens.add({
      targets: sil,
      alpha: 0,
      duration: 320,
      onComplete: () => sil.destroy(),
    });
  }

  spawnEyeBiteEffect(fighter) {
    const sprite = fighter.sprite;
    const body = sprite.body;
    const cx = body.x + body.width / 2 + fighter.eyeFacing * (body.width / 2 + 10);
    const cy = body.y + body.height / 2;
    const vfx = this.add.sprite(cx, cy, 'eye_bite_effect', 0)
      .setScale(2.4)
      .setDepth(ATTACKER_DEPTH + 1)
      .setFlipX(fighter.eyeFacing < 0);
    vfx.play('eye_bite_effect');
    vfx.once('animationcomplete-eye_bite_effect', () => vfx.destroy());
  }

  transformToEye(fighter, opts) {
    if (!fighter || fighter.isDead || fighter.isEye) return;
    const skipReposition = !!(opts && opts.skipReposition);
    this._eyeActive = true;
    fighter.isEye = true;
    this.removeShield(fighter);
    fighter.eyeHitsRemaining = EYE_HITS_BASE;
    fighter.specialPowers = [];
    fighter.eyeFacing = fighter.sprite.flipX ? -1 : 1;
    fighter.eyeDashCooldownUntil = 0;
    fighter.eyeDashUntil = 0;
    fighter.eyeAttackCooldownUntil = 0;
    fighter.eyeTransformUntil = this.time.now + EYE_TRANSFORM_DURATION_MS;

    const sprite = fighter.sprite;
    const body = sprite.body;
    fighter.eyeOriginalState = {
      textureKey: sprite.texture.key,
      frameName: sprite.frame.name,
      scale: sprite.scaleX,
      bodyW: body.sourceWidth,
      bodyH: body.sourceHeight,
      bodyOffsetX: body.offset.x,
      bodyOffsetY: body.offset.y,
      gravityY: body.gravity.y,
      allowGravity: body.allowGravity,
      isAttacking: fighter.isAttacking,
      attackSpriteShift: fighter.attackSpriteShift,
    };

    if (fighter.isAttacking && fighter === this.playerFighter) {
      fighter.isAttacking = false;
      this.attackHitbox.body.enable = false;
      this.attackHitbox.setVisible(false);
      this.targetsHitThisAttack.clear();
      sprite.x -= fighter.attackSpriteShift;
      fighter.attackSpriteShift = 0;
    }

    const wantBodyCenterX = body.x + body.width / 2;
    const wantBodyCenterY = body.y + body.height / 2;

    sprite.setTexture('eye_flight', 0);
    sprite.setScale(EYE_SCALE);
    sprite.anims.play('eye_flight', true);
    body.allowGravity = false;
    body.setGravityY(0);
    body.setVelocity(0, 0);
    sprite.isEye = true;
    body.setSize(EYE_BODY_W, EYE_BODY_H);
    const eyeOffsetX = (EYE_FRAME_SIZE - EYE_BODY_W) / 2;
    const eyeOffsetY = (EYE_FRAME_SIZE - EYE_BODY_H) / 2;
    body.setOffset(eyeOffsetX, eyeOffsetY);
    if (!skipReposition) {
      sprite.x = wantBodyCenterX - EYE_BODY_W / 2 + sprite.scaleX * (sprite.displayOriginX - eyeOffsetX);
      sprite.y = wantBodyCenterY - EYE_BODY_H / 2 + sprite.scaleY * (sprite.displayOriginY - eyeOffsetY);
    }
    sprite.setFlipX(fighter.eyeFacing < 0);

    if (fighter.hpBarBg) fighter.hpBarBg.setVisible(false);
    if (fighter.hpBarFill) fighter.hpBarFill.setVisible(false);

    this.triggerPickupFlash(fighter);
  }

  revertFromEye(fighter, opts) {
    if (!fighter || !fighter.isEye) return;
    const killAlso = !!(opts && opts.killAlso);
    const skipReposition = !!(opts && opts.skipReposition);
    const orig = fighter.eyeOriginalState;
    const sprite = fighter.sprite;
    const body = sprite.body;

    if (fighter.isAttacking) {
      fighter.isAttacking = false;
      fighter.eyeBiteVfxFired = false;
      if (fighter === this.playerFighter) {
        this.attackHitbox.body.enable = false;
        this.attackHitbox.setVisible(false);
        this.targetsHitThisAttack.clear();
        this.attackQueued = false;
      }
    }

    if (orig) {
      const wantBodyCenterX = body.x + body.width / 2;
      const wantBodyCenterY = body.y + body.height / 2;

      sprite.setTexture(orig.textureKey, orig.frameName);
      sprite.setScale(orig.scale);
      body.setSize(orig.bodyW, orig.bodyH);
      body.setOffset(orig.bodyOffsetX, orig.bodyOffsetY);
      body.allowGravity = orig.allowGravity;
      body.setGravityY(orig.gravityY);
      body.setVelocity(0, 0);
      sprite.isEye = false;
      if (!skipReposition) {
        sprite.x = wantBodyCenterX - orig.bodyW / 2 + sprite.scaleX * (sprite.displayOriginX - orig.bodyOffsetX);
        sprite.y = wantBodyCenterY - orig.bodyH / 2 + sprite.scaleY * (sprite.displayOriginY - orig.bodyOffsetY);
      }
      sprite.anims.play(`${fighter.char.id}_idle`, true);
    }

    fighter.isEye = false;
    fighter.eyeOriginalState = null;
    fighter.eyeHitsRemaining = 0;
    fighter.eyeTransformUntil = 0;
    this._eyeActive = this.fighters.some((f) => f.isEye);

    if (!killAlso) {
      if (fighter.hpBarBg) fighter.hpBarBg.setVisible(true);
      if (fighter.hpBarFill) fighter.hpBarFill.setVisible(true);
      this.triggerHitFlash(fighter);
    } else {
      this.killFighter(fighter);
    }
  }

  updateSelfArrow() {
    if (!this.selfArrow) return;
    const f = this.playerFighter;
    if (!f || f.isDead) {
      this.selfArrow.setVisible(false);
      return;
    }
    this.selfArrow.setVisible(true);
    const body = f.sprite.body;
    const now = this.time.now;
    const bob = Math.sin(now / 220) * 4;
    const pulse = 1 + Math.sin(now / 260) * 0.08;
    const extraLift = f.isEye ? 8 : 0;
    const baseLift = 39;
    this.selfArrow.x = body.x + body.width / 2;
    this.selfArrow.y = body.y - baseLift - extraLift + bob;
    this.selfArrow.setScale(this._selfArrowBaseScale * pulse);
  }

  updateEyeHud(time) {
    if (!this.eyeHudText) return;
    const eyeF = this.fighters.find((f) => f.isEye && !f.isDead);
    if (!eyeF || !eyeF.eyeTransformUntil) {
      this.eyeHudBg.setVisible(false);
      this.eyeHudLabel.setVisible(false);
      this.eyeHudText.setVisible(false);
      return;
    }
    const remaining = Math.max(0, eyeF.eyeTransformUntil - time);
    const seconds = (remaining / 1000).toFixed(1);
    this.eyeHudText.setText(`${seconds}s`);
    const isMe = eyeF === this.playerFighter;
    const color = isMe ? '#fde047' : '#ffffff';
    this.eyeHudText.setColor(color);
    this.eyeHudBg.setVisible(true);
    this.eyeHudLabel.setVisible(true);
    this.eyeHudText.setVisible(true);
  }

  applyIncomingHit(target, hit) {
    if (!target || target.isDead) return;
    if (hit.iceTick) {
      this.applyIceTick(target, hit.iceBeamId);
      return;
    }
    if (target.isEye) {
      this.applyEyeHit(target, hit);
      return;
    }
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

  applyEyeHit(target, hit) {
    if (hit.powerFlashColor !== null && hit.powerFlashColor !== undefined) {
      this.triggerPowerFlash(target, hit.powerFlashColor);
    }
    if (hit.heavensFury) {
      this.revertFromEye(target, { killAlso: true });
      return;
    }
    if (hit.curse) {
      this.revertFromEye(target);
      this.applySkullCurse(target);
      return;
    }
    if (hit.stun) {
      this.cancelEyeAttack(target);
      this.applyStun(target);
      this.triggerHitFlash(target);
      return;
    }
    target.eyeHitsRemaining = Math.max(0, target.eyeHitsRemaining - 1);
    this.triggerHitFlash(target);
    if (target.eyeHitsRemaining <= 0) {
      this.revertFromEye(target);
    } else {
      this.cancelEyeAttack(target);
      target.sprite.anims.play('eye_take_hit', true);
    }
  }

  cancelEyeAttack(fighter) {
    if (!fighter.isAttacking) return;
    fighter.isAttacking = false;
    fighter.eyeBiteVfxFired = false;
    if (fighter === this.playerFighter) {
      this.attackHitbox.body.enable = false;
      this.attackHitbox.setVisible(false);
      this.targetsHitThisAttack.clear();
    }
  }

  dealHit(target, hit) {
    if (hit.playHitSfx) this.playSfx('sfx_hit');
    if (this.isMultiplayer && target !== this.playerFighter) {
      if (!target.isDead) {
        this.triggerHitFlash(target);
        if (hit.powerFlashColor !== null && hit.powerFlashColor !== undefined) {
          this.triggerPowerFlash(target, hit.powerFlashColor);
        }
      }
      this.network.send({ type: 'hit', targetIndex: target.ownerIndex, ...hit });
      return;
    }
    this.applyIncomingHit(target, hit);
  }

  isAuthoritativeOwner(fighter) {
    return !this.isMultiplayer || fighter === this.playerFighter;
  }

  sendPowerCast(power, params) {
    if (!this.network || !this.network.isConnected) return;
    this.network.send({ type: 'power_cast', casterIndex: this.myIndex, power, ...params });
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
      index: this.myIndex,
      x: sprite.x - (f.attackSpriteShift || 0),
      y: sprite.y,
      flipX: sprite.flipX,
      anim: currentAnim,
      frame: sprite.anims.currentFrame?.index ?? 0,
      hp: f.hp,
      lives: f.lives,
      isDead: f.isDead,
      shielded: f.shieldCharges > 0,
      stunned: f.isStunned,
      cursed: (f.curseMultiplier || 1) > 1,
      powers: f.specialPowers.slice(),
      isEye: !!f.isEye,
      eyeHits: f.eyeHitsRemaining || 0,
      eyeFacing: f.eyeFacing || 1,
      eyeDashing: f.isEye && this.time.now < (f.eyeDashUntil || 0),
      eyeRemainingMs: f.isEye ? Math.max(0, (f.eyeTransformUntil || 0) - this.time.now) : 0,
      frozen: !!f.isFrozen,
      slamming: !!f.isSlamming,
    });
  }

  handleNetState(data) {
    if (!data) return;
    if (data.type === 'hit') {
      if (data.playHitSfx) this.playSfx('sfx_hit');
      const target =
        data.targetIndex === this.myIndex
          ? this.playerFighter
          : this.fightersByIndex[data.targetIndex];
      if (data.targetIndex === this.myIndex) {
        this.applyIncomingHit(this.playerFighter, data);
      } else if (target && !target.isDead) {
        this.triggerHitFlash(target);
        if (data.powerFlashColor !== null && data.powerFlashColor !== undefined) {
          this.triggerPowerFlash(target, data.powerFlashColor);
        }
      }
      if (data.fireStormHit && target) {
        this.spawnFireStormHit(target);
      }
      return;
    }
    if (data.type === 'match_restart') {
      if (this._restartingFromNetwork) return;
      this._restartingFromNetwork = true;
      this.scene.restart(this.initData);
      return;
    }
    if (data.type === 'double_jump_fx') {
      if (data.index === this.myIndex) return;
      const f = this.fightersByIndex[data.index];
      if (f && !f.isDead) this.spawnDoubleJumpEffect(f);
      return;
    }
    if (data.type === 'loot_spawn') {
      if (this._isLootAuthority) return;
      if (this.findLootByNetId(data.id)) return;
      this.createLootAt({
        id: data.id,
        lootType: data.lootType,
        power: data.power,
        x: data.x,
        y: data.y,
      });
      return;
    }
    if (data.type === 'loot_pickup') {
      const loot = this.findLootByNetId(data.id);
      if (!loot || loot.isPickedUp) return;
      const picker = this.fightersByIndex[data.pickerIndex];
      if (!picker) return;
      this.pickupLoot(loot, picker, { fromNetwork: true });
      return;
    }
    if (data.type === 'loot_despawn') {
      const loot = this.findLootByNetId(data.id);
      if (!loot) return;
      this.despawnLoot(loot, { fromNetwork: true, reason: data.reason });
      return;
    }
    if (data.type === 'power_cast') {
      if (data.casterIndex === this.myIndex) return;
      const caster = this.fightersByIndex[data.casterIndex];
      if (!caster) return;
      if (data.power === 'heavens_fury') {
        this.firePower(caster, data.worldX, data.worldY);
      } else if (data.power === 'shield') {
        if (!caster.isEye) this.applyShield(caster);
      } else if (data.power === 'skull_curse') {
        this.fireSkullCurse(caster, data.worldX, data.worldY);
      } else if (data.power === 'wheel') {
        this.fireWheel(caster, data.worldX);
      } else if (data.power === 'ice_beam') {
        this.fireIceBeam(caster, data.worldX, data.worldY);
      } else if (data.power === 'fire_storm') {
        this.fireFireStorm(caster);
      }
      return;
    }
    if (data.type !== 'state') return;
    const remote = this.fightersByIndex[data.index];
    if (!remote || remote === this.playerFighter) return;

    let eyeStateChanged = false;
    if (typeof data.isEye === 'boolean') {
      if (data.isEye && !remote.isEye && !remote.isDead) {
        this.transformToEye(remote, { skipReposition: true });
        eyeStateChanged = true;
      } else if (!data.isEye && remote.isEye) {
        this.revertFromEye(remote, { skipReposition: true });
        eyeStateChanged = true;
      }
    }
    if (typeof data.eyeHits === 'number') {
      remote.eyeHitsRemaining = data.eyeHits;
    }
    if (typeof data.eyeFacing === 'number') {
      remote.eyeFacing = data.eyeFacing;
    }
    if (typeof data.eyeDashing === 'boolean') {
      remote.isEyeDashingRemote = data.eyeDashing;
    }
    if (typeof data.eyeRemainingMs === 'number' && remote.isEye) {
      remote.eyeTransformUntil = this.time.now + data.eyeRemainingMs;
    }

    const sprite = remote.sprite;
    sprite.setPosition(data.x, data.y);
    sprite.setFlipX(!!data.flipX);
    const body = sprite.body;
    if (!remote.isEye) {
      let effectiveOffset = BODY_OFFSET_X;
      if (data.anim === remote.keys.attackDown.animKey) {
        effectiveOffset = remote.keys.attackDown.charFrameOffsetX;
        const charShift = (effectiveOffset - BODY_OFFSET_X) * SPRITE_SCALE;
        sprite.x += data.flipX ? charShift : -charShift;
      }
      body.offset.x = data.flipX
        ? FRAME_WIDTH - effectiveOffset - BODY_WIDTH
        : effectiveOffset;
    }
    body.setVelocity(0, 0);
    if (eyeStateChanged && body.reset) {
      body.reset(sprite.x, sprite.y);
    }
    if (data.anim && sprite.anims.currentAnim?.key !== data.anim) {
      sprite.anims.play(data.anim, true);
    }
    if (typeof data.hp === 'number') {
      remote.hp = data.hp;
    }
    if (Array.isArray(data.powers)) {
      remote.specialPowers = data.powers.slice();
    }
    if (typeof data.stunned === 'boolean') {
      if (data.stunned && !remote.isStunned) this.applyStun(remote);
      else if (!data.stunned && remote.isStunned) this.removeStun(remote);
    }
    if (typeof data.frozen === 'boolean') {
      if (data.frozen && !remote.isFrozen) this.applyFreeze(remote);
      else if (!data.frozen && remote.isFrozen) this.removeFreeze(remote);
    }
    if (typeof data.slamming === 'boolean') {
      remote.isSlamming = data.slamming;
    }
    if (typeof data.cursed === 'boolean') {
      const isCursed = (remote.curseMultiplier || 1) > 1;
      if (data.cursed && !isCursed) this.applySkullCurse(remote);
      else if (!data.cursed && isCursed) this.removeSkullCurse(remote);
    }
    if (typeof data.isDead === 'boolean') {
      if (data.isDead && !remote.isDead) {
        remote.isDead = true;
        this.removeShield(remote);
        this.removeSkullCurse(remote);
        this.removeStun(remote);
        this.spawnDeathMarker(remote);
        sprite.setVisible(false);
        remote.hpBarBg.setVisible(false);
        remote.hpBarFill.setVisible(false);
        for (const icon of remote.powerIcons) icon.setVisible(false);
        remote.glow.setVisible(false);
        remote.flashSprite.setAlpha(0);
        remote.hitFlashSprite.setAlpha(0);
        remote.pickupFlashSprite.setAlpha(0);
      } else if (!data.isDead && remote.isDead) {
        remote.isDead = false;
        sprite.setVisible(true);
        remote.hpBarBg.setVisible(true);
        remote.hpBarFill.setVisible(true);
        remote.glow.setVisible(true);
      }
    }
    if (typeof data.lives === 'number') {
      remote.lives = data.lives;
      this.checkMatchOver();
    }
    const hasShieldVisual = !!remote.shieldAnimSprite;
    if (data.shielded === false && hasShieldVisual) {
      this.removeShield(remote);
    }
  }

  setControlledFighter(index) {
    const next = this.fighters[index];
    if (!next || next === this.playerFighter || next.isDead) return;

    const prev = this.playerFighter;
    if (prev) {
      if (prev.isAttacking && !prev.isEye) {
        prev.sprite.x -= prev.attackSpriteShift;
        prev.attackSpriteShift = 0;
        prev.isAttacking = false;
        prev.sprite.setDepth(DEFAULT_SPRITE_DEPTH);
      }
      prev.sprite.body.setVelocityX(0);
      if (!prev.isEye) {
        prev.sprite.body.offset.x = prev.sprite.flipX
          ? FRAME_WIDTH - BODY_OFFSET_X - BODY_WIDTH
          : BODY_OFFSET_X;
        prev.sprite.anims.play(prev.keys.idle, true);
      }
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
    if (this.parallaxFar) this.parallaxFar.tilePositionX += delta * 0.008;
    if (this.parallaxNear) this.parallaxNear.tilePositionX += delta * 0.022;

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
      if (
        !f.isDead &&
        f.isEye &&
        !f.isFrozen &&
        f !== fighter &&
        time >= f.eyeDashUntil
      ) {
        f.sprite.body.setVelocity(0, 0);
      }
    }

    if (
      !fighter.isDead &&
      fighter.isEye &&
      fighter.eyeTransformUntil &&
      time >= fighter.eyeTransformUntil
    ) {
      this.revertFromEye(fighter);
    }

    this.updateEyeHud(time);
    this.updateSelfArrow();
    this.updateIceBeams(time);
    this.updateFrozenStates(time);

    if (!fighter.isDead && fighter.isEye && !fighter.isFrozen) {
      const inDash = time < fighter.eyeDashUntil;

      if (
        !fighter.isStunned &&
        Phaser.Input.Keyboard.JustDown(this.keys.swapPowers) &&
        fighter.specialPowers.length >= 2
      ) {
        const [a, b] = fighter.specialPowers;
        fighter.specialPowers[0] = b;
        fighter.specialPowers[1] = a;
      }

      let inputX = 0;
      let inputY = 0;
      if (!fighter.isStunned) {
        if (this.keys.left.isDown) inputX -= 1;
        if (this.keys.right.isDown) inputX += 1;
        if (this.keys.up.isDown) inputY -= 1;
        if (this.keys.down.isDown) inputY += 1;
      }

      const canDash =
        !inDash &&
        !fighter.isStunned &&
        time >= fighter.eyeDashCooldownUntil &&
        Phaser.Input.Keyboard.JustDown(this.keys.space);

      if (canDash) {
        let dx = inputX;
        let dy = inputY;
        if (dx === 0 && dy === 0) {
          dx = fighter.eyeFacing;
        }
        const mag = Math.sqrt(dx * dx + dy * dy);
        dx /= mag;
        dy /= mag;
        fighter.eyeDashDirX = dx;
        fighter.eyeDashDirY = dy;
        fighter.eyeDashUntil = time + EYE_DASH_DURATION_MS;
        fighter.eyeDashCooldownUntil = time + EYE_DASH_COOLDOWN_MS;
        body.setVelocity(EYE_DASH_SPEED * dx, EYE_DASH_SPEED * dy);
        if (dx < 0) {
          fighter.eyeFacing = -1;
          this.player.setFlipX(true);
        } else if (dx > 0) {
          fighter.eyeFacing = 1;
          this.player.setFlipX(false);
        }
      } else if (inDash) {
        body.setVelocity(
          EYE_DASH_SPEED * fighter.eyeDashDirX,
          EYE_DASH_SPEED * fighter.eyeDashDirY
        );
      } else {
        let vx = inputX;
        let vy = inputY;
        if (vx !== 0 && vy !== 0) {
          const inv = 1 / Math.sqrt(2);
          vx *= inv;
          vy *= inv;
        }
        body.setVelocity(vx * EYE_MOVE_SPEED, vy * EYE_MOVE_SPEED);
        if (vx < 0) {
          fighter.eyeFacing = -1;
          this.player.setFlipX(true);
        } else if (vx > 0) {
          fighter.eyeFacing = 1;
          this.player.setFlipX(false);
        }
      }

      const halfBodyH = (EYE_BODY_H * EYE_SCALE) / 2;
      if (this.player.y < halfBodyH) {
        this.player.y = halfBodyH;
        if (body.velocity.y < 0) body.setVelocityY(0);
      } else if (this.player.y > MAP_HEIGHT - halfBodyH) {
        this.player.y = MAP_HEIGHT - halfBodyH;
        if (body.velocity.y > 0) body.setVelocityY(0);
      }

      if (fighter.isAttacking && this.player.anims.currentAnim?.key !== 'eye_attack') {
        this.cancelEyeAttack(fighter);
      }

      if (
        this.attackQueued &&
        !fighter.isAttacking &&
        !fighter.isStunned &&
        time >= fighter.eyeAttackCooldownUntil
      ) {
        fighter.isAttacking = true;
        fighter.eyeAttackCooldownUntil = time + EYE_ATTACK_COOLDOWN_MS;
        fighter.eyeBiteVfxFired = false;
        this.targetsHitThisAttack.clear();
        this.attackHitbox.body.enable = false;
        this.attackHitbox.setVisible(false);
        this.player.anims.play('eye_attack', true);
        this.playSfx('sfx_swing');
      }
      this.attackQueued = false;

      if (fighter.isAttacking && this.player.anims.currentAnim?.key === 'eye_attack') {
        const frameIdx = this.player.anims.currentFrame
          ? this.player.anims.currentFrame.index - 1
          : 0;
        const active = frameIdx >= 5 && frameIdx <= 7;
        if (active && !fighter.eyeBiteVfxFired) {
          fighter.eyeBiteVfxFired = true;
          this.spawnEyeBiteEffect(fighter);
        }
        this.attackHitbox.body.enable = active;
        this.attackHitbox.setVisible(active);

        if (active) {
          const bodyCenterX = body.x + body.width / 2;
          const bodyCenterY = body.y + body.height / 2;
          const dashComboHitbox =
            fighter.eyeDashUntil > 0 &&
            time < fighter.eyeDashUntil + EYE_DASH_COMBO_WINDOW_MS;
          const dashBonus = dashComboHitbox ? 50 : 0;
          const physW = body.width + EYE_ATTACK_HITBOX_FORWARD + EYE_ATTACK_HITBOX_PADDING + dashBonus * 2;
          const physH = body.height + EYE_ATTACK_HITBOX_PADDING * 2 + dashBonus;
          const hitboxX = bodyCenterX + fighter.eyeFacing * (EYE_ATTACK_HITBOX_FORWARD / 2);
          const hitboxY = bodyCenterY;
          this.attackHitbox.setRotation(0);
          this.attackHitbox.setPosition(hitboxX, hitboxY);
          if (
            this.attackHitbox.displayWidth !== physW ||
            this.attackHitbox.displayHeight !== physH
          ) {
            this.attackHitbox.setSize(physW, physH);
            this.attackHitbox.body.setSize(physW, physH, true);
          }
          this.attackHitbox.body.reset(hitboxX, hitboxY);

          const hbLeft = hitboxX - physW / 2;
          const hbRight = hitboxX + physW / 2;
          const hbTop = hitboxY - physH / 2;
          const hbBottom = hitboxY + physH / 2;
          for (const target of this.fighters) {
            if (target === fighter) continue;
            if (this.targetsHitThisAttack.has(target)) continue;
            if (target.isInvulnerable || target.isDead) continue;
            const tb = target.sprite.body;
            if (
              hbRight > tb.x &&
              hbLeft < tb.x + tb.width &&
              hbBottom > tb.y &&
              hbTop < tb.y + tb.height
            ) {
              this.targetsHitThisAttack.add(target);
              const isCursed = target.curseMultiplier > 1;
              const dashCombo =
                fighter.eyeDashUntil > 0 &&
                time < fighter.eyeDashUntil + EYE_DASH_COMBO_WINDOW_MS;
              let dmg = Math.round(MAX_HP * 0.5);
              let ignoreShield = false;
              if (dashCombo && isCursed) {
                dmg = MAX_HP * 2;
                ignoreShield = true;
              } else if (dashCombo) {
                dmg = Math.round(MAX_HP * 0.75);
                ignoreShield = true;
              }
              this.dealHit(target, {
                damage: dmg,
                ignoreShield,
                playHitSfx: true,
                knockbackX: fighter.eyeFacing * 160,
                knockupY: -100,
              });
            }
          }
          if (this.isCrowHitByRect(hbLeft, hbRight, hbTop, hbBottom)) {
            this.killCrow();
          }
        }
      } else if (
        this.player.anims.currentAnim?.key !== 'eye_flight' &&
        this.player.anims.currentAnim?.key !== 'eye_take_hit'
      ) {
        this.player.anims.play('eye_flight', true);
      }

      if (this.powerQueued && fighter.specialPowers.length > 0 && !fighter.isStunned) {
        this.castQueuedPower(fighter);
      }
      this.powerQueued = false;
    } else if (!fighter.isDead && !fighter.isStunned && !fighter.isFrozen) {
      if (
        Phaser.Input.Keyboard.JustDown(this.keys.swapPowers) &&
        fighter.specialPowers.length >= 2
      ) {
        const [a, b] = fighter.specialPowers;
        fighter.specialPowers[0] = b;
        fighter.specialPowers[1] = a;
      }

      const leftDown = this.keys.left.isDown;
      const rightDown = this.keys.right.isDown;

      let desiredFlip = this.player.flipX;

      let speed = fighter.curseSlowed ? MOVE_SPEED * SKULL_CURSE_SLOW_FACTOR : MOVE_SPEED;
      if (fighter.iceSlowActive && fighter.iceSlowFactor) speed *= fighter.iceSlowFactor;
      if (leftDown && !rightDown) {
        body.setVelocityX(-speed);
        desiredFlip = true;
      } else if (rightDown && !leftDown) {
        body.setVelocityX(speed);
        desiredFlip = false;
      } else {
        body.setVelocityX(0);
      }

      if (desiredFlip !== this.player.flipX) {
        const flipCompensation =
          (FRAME_WIDTH - 2 * BODY_OFFSET_X - BODY_WIDTH) * SPRITE_SCALE;
        if (fighter.isAttacking) {
          this.player.x -= fighter.attackSpriteShift;
        }
        this.player.x += desiredFlip ? -flipCompensation : flipCompensation;
        this.player.setFlipX(desiredFlip);
        if (fighter.isAttacking) {
          fighter.attackSpriteShift = -fighter.attackSpriteShift;
          this.player.x += fighter.attackSpriteShift;
        }
      }

      const effectiveFrameOffset = fighter.isAttacking
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
        fighter.isSlamming = false;
      }
      if (fighter.isSlamming && body.velocity.y <= 0) {
        fighter.isSlamming = false;
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
        const slowMult = fighter.curseSlowed ? SKULL_CURSE_SLOW_FACTOR : 1;
        body.setVelocityY(
          (isSecondJump ? -DOUBLE_JUMP_VELOCITY : -JUMP_VELOCITY) * slowMult
        );
        this.playSfx('sfx_jump', 2.5);
        this.jumpsRemaining -= 1;
        if (isSecondJump) {
          this.didDoubleJump = true;
          this.spawnDoubleJumpEffect(fighter);
          if (this.isMultiplayer && this.network) {
            this.network.send({ type: 'double_jump_fx', index: this.myIndex });
          }
        }
        this.lastJumpTime = time;
      }

      const slamPressed = Phaser.Input.Keyboard.JustDown(this.keys.down);

      if (slamPressed && !body.blocked.down) {
        body.setVelocityY(SLAM_VELOCITY * (fighter.curseSlowed ? SKULL_CURSE_SLOW_FACTOR : 1));
        fighter.isSlamming = true;
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
        this.castQueuedPower(fighter);
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
        const charShift =
          (fighter.currentAttackAnim.charFrameOffsetX - BODY_OFFSET_X) * SPRITE_SCALE;
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

          const isVertical = Math.abs(Math.cos(this.attackAngle)) < 0.5;
          const physW = isVertical ? ATTACK_HITBOX_HEIGHT : ATTACK_HITBOX_WIDTH;
          const physH = isVertical ? VERTICAL_ATTACK_REACH : ATTACK_HITBOX_HEIGHT;
          const bodyHalfAlongAttack = isVertical ? body.height / 2 : body.width / 2;
          const reachAlongAttack = isVertical ? physH / 2 : physW / 2;
          const distance = bodyHalfAlongAttack + reachAlongAttack;
          const hitboxX = bodyCenterX + Math.cos(this.attackAngle) * distance;
          const hitboxY = bodyCenterY + Math.sin(this.attackAngle) * distance;

          this.attackHitbox.setRotation(0);
          this.attackHitbox.setPosition(hitboxX, hitboxY);
          if (
            this.attackHitbox.displayWidth !== physW ||
            this.attackHitbox.displayHeight !== physH
          ) {
            this.attackHitbox.setSize(physW, physH);
            this.attackHitbox.body.setSize(physW, physH, true);
          }
          this.attackHitbox.body.reset(hitboxX, hitboxY);

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
              damage: 0,
              breakShield: true,
              curse: true,
              playHitSfx: true,
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

    for (const vfx of this.fireStormHitVfx) {
      const f = vfx.follow;
      if (!f || !f.sprite || !f.sprite.body) continue;
      const fb = f.sprite.body;
      vfx.setPosition(fb.x + fb.width / 2, fb.y + fb.height / 2);
    }

    for (let i = this.fireStormRays.length - 1; i >= 0; i--) {
      const r = this.fireStormRays[i];
      if (!r.active) {
        this.fireStormRays.splice(i, 1);
        continue;
      }
      if (r.aura) r.aura.setPosition(r.x, r.y);
      const offMap =
        r.x < -80 || r.x > MAP_WIDTH + 80 || r.y < -80 || r.y > MAP_HEIGHT + 80;
      if (offMap) {
        if (r.auraPulse) r.auraPulse.stop();
        if (r.aura) r.aura.destroy();
        r.destroy();
        this.fireStormRays.splice(i, 1);
        continue;
      }
      const rb = r.body;
      const rLeft = rb.x;
      const rRight = rb.x + rb.width;
      const rTop = rb.y;
      const rBottom = rb.y + rb.height;
      if (!this.isAuthoritativeOwner(r.ownerFighter)) continue;
      for (const target of this.fighters) {
        if (target === r.ownerFighter) continue;
        if (target.isDead || target.isInvulnerable) continue;
        if (r.hitSet.has(target)) continue;
        const tb = target.sprite.body;
        const hit =
          rRight > tb.x &&
          rLeft < tb.x + tb.width &&
          rBottom > tb.y &&
          rTop < tb.y + tb.height;
        if (hit) {
          r.hitSet.add(target);
          this.dealHit(target, {
            damage: FIRE_STORM_DAMAGE,
            ignoreShield: false,
            playHitSfx: true,
            powerFlashColor: POWERS.fire_storm.orbColor,
            fireStormHit: true,
          });
          this.spawnFireStormHit(target);
        }
      }
      if (this.isCrowHitByRect(rLeft, rRight, rTop, rBottom)) {
        this.killCrow();
      }
    }

    for (let i = this.wheelProjectiles.length - 1; i >= 0; i--) {
      const w = this.wheelProjectiles[i];
      if (!w.active) {
        this.stopWheelSounds(w);
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
        this.updateWheelLoopSound(w, onGround);
      }
      if (w.hasHit) continue;

      if (w.y > MAP_HEIGHT + 80) {
        this.stopWheelSounds(w);
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
        this.playSfx('sfx_wheel_hit', 0.5, 0.3);
        this.playSfx('sfx_wheel_hit2', 1, 1.3);
        this.stopWheelSounds(w);
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
        if (loot.beam) {
          loot.beam.setPosition(loot.x, 0);
          loot.beam.setDisplaySize(70, Math.max(120, loot.y + 80));
        }
        if (loot.footGlow) loot.footGlow.setPosition(loot.x, loot.y + 30);
      }
      if (loot.isPickedUp) continue;
      if (this.isMultiplayer) {
        const f = this.playerFighter;
        if (f && !f.isDead && this.physics.overlap(loot, f.sprite)) {
          this.pickupLoot(loot, f);
        }
        continue;
      }
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
    const hasFireStorm = slot0 === 'fire_storm';
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
    this.specialFireStormSprite.setVisible(hasFireStorm);
    if (hasFireStorm && this.specialFireStormPulse.paused) {
      this.specialFireStormPulse.resume();
    } else if (!hasFireStorm && !this.specialFireStormPulse.paused) {
      this.specialFireStormPulse.pause();
      this.specialFireStormSprite.setScale(1);
    }
    if (slot1) {
      const slot1Color =
        slot1 === 'heavens_fury' ? 0xfde047
        : slot1 === 'shield' ? 0x3b82f6
        : slot1 === 'skull_curse' ? 0xa855f7
        : slot1 === 'fire_storm' ? 0xff3b30
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
        for (const icon of f.powerIcons) icon.setVisible(false);
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
          fb.y + 14
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
      if (f.isEye) {
        f.hpBarBg.setVisible(false);
        f.hpBarFill.setVisible(false);
        const total = f.eyeHitsRemaining;
        for (let i = 0; i < f.eyeLifeIcons.length; i++) {
          const icon = f.eyeLifeIcons[i];
          if (i < total) {
            const offset = (i - (total - 1) / 2) * EYE_LIFE_ICON_SPACING;
            icon.setPosition(barX + offset, barY);
            icon.setVisible(true);
          } else {
            icon.setVisible(false);
          }
        }

        const dashBarY = barY - 9;
        const remaining = Math.max(0, f.eyeDashCooldownUntil - this.time.now);
        const ready = remaining <= 0;
        const pctDash = ready ? 1 : 1 - remaining / EYE_DASH_COOLDOWN_MS;
        f.eyeDashBarBg.setVisible(true);
        f.eyeDashBarFill.setVisible(true);
        f.eyeDashBarBg.setPosition(barX, dashBarY);
        f.eyeDashBarFill.setPosition(barX - (EYE_DASH_BAR_WIDTH - 2) / 2, dashBarY);
        f.eyeDashBarFill.width = (EYE_DASH_BAR_WIDTH - 2) * pctDash;
        f.eyeDashBarFill.fillColor = ready ? 0x38bdf8 : 0x64748b;

        const atkBarY = dashBarY - (EYE_DASH_BAR_HEIGHT + 2);
        const remainingAtk = Math.max(0, f.eyeAttackCooldownUntil - this.time.now);
        const readyAtk = remainingAtk <= 0;
        const pctAtk = readyAtk ? 1 : 1 - remainingAtk / EYE_ATTACK_COOLDOWN_MS;
        f.eyeAttackBarBg.setVisible(true);
        f.eyeAttackBarFill.setVisible(true);
        f.eyeAttackBarBg.setPosition(barX, atkBarY);
        f.eyeAttackBarFill.setPosition(barX - (EYE_DASH_BAR_WIDTH - 2) / 2, atkBarY);
        f.eyeAttackBarFill.width = (EYE_DASH_BAR_WIDTH - 2) * pctAtk;
        f.eyeAttackBarFill.fillColor = readyAtk ? 0xfacc15 : 0x64748b;
      } else {
        for (const icon of f.eyeLifeIcons) icon.setVisible(false);
        f.eyeDashBarBg.setVisible(false);
        f.eyeDashBarFill.setVisible(false);
        f.eyeAttackBarBg.setVisible(false);
        f.eyeAttackBarFill.setVisible(false);
        if (!f.isDead) {
          f.hpBarBg.setVisible(true);
          f.hpBarFill.setVisible(true);
        }
        f.hpBarBg.setPosition(barX, barY);
        f.hpBarFill.setPosition(barX - (f.hpBarWidth - 2) / 2, barY);
        f.hpBarFill.width = (f.hpBarWidth - 2) * pct;
        f.hpBarFill.fillColor = pct > 0.5 ? 0x22c55e : pct > 0.25 ? 0xeab308 : 0xef4444;
      }

      const iconY = f.isEye
        ? barY - 9 - (EYE_DASH_BAR_HEIGHT + 2) - EYE_DASH_BAR_HEIGHT - 8
        : barY - 10;
      const iconSpacing = 10;
      const powers = f.specialPowers;
      for (let i = 0; i < f.powerIcons.length; i++) {
        const icon = f.powerIcons[i];
        const power = powers[i];
        if (power && POWERS[power]) {
          const offset = (i - (Math.min(powers.length, f.powerIcons.length) - 1) / 2) * iconSpacing;
          icon.setPosition(barX + offset, iconY);
          icon.fillColor = POWERS[power].orbColor;
          icon.setVisible(true);
        } else {
          icon.setVisible(false);
        }
      }

      if (f.isSlamming && !f.isDead && !f.isEye) {
        if (!f.slamTrailNextSpawn || this.time.now >= f.slamTrailNextSpawn) {
          f.slamTrailNextSpawn = this.time.now + 28;
          const sil = this.add.sprite(
            f.sprite.x,
            f.sprite.y,
            f.sprite.texture.key,
            f.sprite.frame.name,
          )
            .setScale(f.sprite.scaleX)
            .setFlipX(f.sprite.flipX)
            .setTintFill(f.char.tintColor)
            .setAlpha(0.3)
            .setDepth(DEFAULT_SPRITE_DEPTH - 0.5);
          this.tweens.add({
            targets: sil,
            alpha: 0,
            duration: 280,
            onComplete: () => sil.destroy(),
          });
          const tx = fbody.x + fbody.width / 2;
          const ty = fbody.y + fbody.height / 2;
          const streak = this.add.circle(tx, ty, 10, f.char.tintColor, 0.95)
            .setDepth(DEFAULT_SPRITE_DEPTH - 1)
            .setBlendMode(Phaser.BlendModes.ADD);
          this.tweens.add({
            targets: streak,
            alpha: 0,
            scale: 0.3,
            duration: 480,
            onComplete: () => streak.destroy(),
          });
        }
      }

      if (f.isEye && !f.isDead) {
        const inDash = this.time.now < (f.eyeDashUntil || 0) || !!f.isEyeDashingRemote;
        const interval = inDash ? 25 : 50;
        if (!f.eyeTrailNextSpawn || this.time.now >= f.eyeTrailNextSpawn) {
          f.eyeTrailNextSpawn = this.time.now + interval;
          const tx = fbody.x + fbody.width / 2;
          const ty = fbody.y + fbody.height / 2;
          const radius = inDash ? 16 : 10;
          const alpha = inDash ? 0.85 : 0.7;
          const trail = this.add.circle(tx, ty, radius, f.char.tintColor, alpha)
            .setDepth(DEFAULT_SPRITE_DEPTH - 1)
            .setBlendMode(Phaser.BlendModes.ADD);
          this.tweens.add({
            targets: trail,
            alpha: 0,
            scale: 0.3,
            duration: inDash ? 550 : 450,
            onComplete: () => trail.destroy(),
          });
        }
        if (inDash) {
          if (!f.eyeSilhouetteNextSpawn || this.time.now >= f.eyeSilhouetteNextSpawn) {
            f.eyeSilhouetteNextSpawn = this.time.now + 35;
            const sil = this.add.sprite(
              f.sprite.x,
              f.sprite.y,
              f.sprite.texture.key,
              f.sprite.frame.name
            )
              .setScale(f.sprite.scaleX)
              .setFlipX(f.sprite.flipX)
              .setTintFill(f.char.tintColor)
              .setAlpha(0.6)
              .setDepth(DEFAULT_SPRITE_DEPTH - 0.5);
            this.tweens.add({
              targets: sil,
              alpha: 0,
              duration: 320,
              onComplete: () => sil.destroy(),
            });
          }
        }
      }
    }
  }
}
