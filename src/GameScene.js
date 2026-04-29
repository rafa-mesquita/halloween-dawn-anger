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

// Land Mine
const LAND_MINE_FRAME = 128;
const LAND_MINE_SCALE = 0.6;
const LAND_MINE_BODY = 50;
const LAND_MINE_DAMAGE = 35;
const LAND_MINE_RADIUS = 80;
const LAND_MINE_TRIGGER_DX = 38;
const LAND_MINE_TRIGGER_DY = 50;
const LAND_MINE_THROW_VX = 380;
const LAND_MINE_THROW_VY_BIAS = -320;
const LAND_MINE_BOUNCE_X = 0.55;
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
const ICE_HITS_TO_FREEZE = 12;
const ICE_SLOW_FACTOR_START = 0.55;
const ICE_SLOW_FACTOR_MIN = 0.15;
const EYE_ATTACK_HITBOX_FORWARD = 40;
const EYE_ATTACK_HITBOX_PADDING = 6;
const EYE_DASH_BAR_WIDTH = 36;
const EYE_DASH_BAR_HEIGHT = 4;

const SKELETON_FRAME_W = 96;
const SKELETON_FRAME_H = 64;
const SKELETON_IDLE_FRAMES = 8;
const SKELETON_WALK_FRAMES = 10;
const SKELETON_ATTACK1_FRAMES = 10;
const SKELETON_ATTACK2_FRAMES = 9;
const SKELETON_HURT_FRAMES = 5;
const SKELETON_DIE_FRAMES = 13;
const SKELETON_IDLE_FPS = 8;
const SKELETON_WALK_FPS = 12;
const SKELETON_ATTACK_FPS = 18;
const SKELETON_HURT_FPS = 14;
const SKELETON_DIE_FPS = 12;
const SKELETON_MAX_HP = 150;
const SKELETON_BITE_DAMAGE = 30;
const SKELETON_BITE_COOLDOWN_MS = 1200;
const SKELETON_BITE_WINDUP_MS = 320;
const SKELETON_DETECT_RADIUS = 320;
const SKELETON_BITE_REACH = 90;
const SKELETON_PATROL_SPEED = 90;
const SKELETON_SCALE = 2.3;
const SKELETON_HIT_SCALE = 2.5;
const SKELETON_PLATFORM_Y_TOLERANCE = 110;
const SKELETON_HP_BAR_WIDTH = 72;
const SKELETON_HP_BAR_HEIGHT = 6;
const SKELETON_BALL_SPEED = 520;
const SKELETON_BALL_VY = -380;
const SKELETON_BALL_LIFETIME_MS = 4000;
const SKELETON_POWER_CRIT_MULT = 1.3;
const SKELETON_POISON_TICK_MS = 500;
const SKELETON_POISON_TICK_DAMAGE = 12;
const SKELETON_KNOCKUP_DURATION_MS = 700;
const SKELETON_KNOCKUP_HEIGHT = 70;
const SKELETON_STUN_MS = 1100;
const SKELETON_FREEZE_DURATION_MS = 4000;
const SKELETON_HITS_TO_FREEZE = 12;

const POWERS = {
  heavens_fury: {
    animKey: 'heavens_fury',
    orbColor: 0xfde047,
    orbStroke: 0xca8a04,
    lootIdleKey: 'heavens_fury_loot_idle',
    lootCatchKey: 'heavens_fury_loot_catch',
    lootGlowKey: 'glow_yellow',
    lootGlowScale: 0.6,
    lootGlowPulseScale: 0.85,
    lootFrameSize: 128,
    lootScale: 1.4,
    lootCatchScale: 2.0,
    lootBodyYOffset: 18,
    lootShadow: { width: 80, height: 16, alpha: 0.5 },
    lootTintPulseColor: 0xfefeda,
    lootTintPulseAlpha: 0.7,
    lootTintPulseDuration: 600,
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
    orbColor: 0x9ca3af,
    lootIdleKey: 'wheel_loot_idle',
    lootCatchKey: 'wheel_loot_catch',
    lootFrameSize: 128,
    lootScale: 0.85,
    lootCatchScale: 2.2,
    lootBodyYOffset: 30,
    lootGlowKey: 'glow_orange',
    lootGlowScale: 0.6,
    lootGlowPulseScale: 0.85,
    lootShadow: { width: 80, height: 16, alpha: 0.5 },
  },
  ice_beam: {
    orbColor: 0x22d3ee,
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
    orbColor: 0xf97316,
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
  skeleton_attack: {
    orbColor: 0x4ade80,
    lootGlowKey: 'glow_green',
    lootIdleKey: 'skeleton_attack_loot_idle',
    lootCatchKey: 'skeleton_attack_loot_catch',
    lootFrameSize: 128,
    lootScale: 0.85,
    lootCatchScale: 2.6,
    lootBodyYOffset: 30,
    lootGlowScale: 0.6,
    lootGlowPulseScale: 0.85,
    lootShadow: { width: 80, height: 16, alpha: 0.5 },
  },
  land_mine: {
    orbColor: 0xdc2626,
    lootGlowKey: 'glow_orange',
    lootIdleKey: 'land_mine_loot_idle',
    lootCatchKey: 'wood_catch',
    lootFrameSize: 128,
    lootScale: 0.85,
    lootCatchScale: 2.6,
    lootBodyYOffset: 30,  // empurra body pra baixo no sprite → loot renderiza mais alto
    lootGlowScale: 0.6,
    lootGlowPulseScale: 0.85,
    lootShadow: { width: 80, height: 16, alpha: 0.5 },
  },
};

const WOOD_POWER_POOL = ['heavens_fury', 'skull_curse', 'wheel', 'fire_storm', 'ice_beam', 'skeleton_attack', 'land_mine'];
// Skills that level up to a stronger version when duplicate is picked up
const UPGRADABLE_POWERS = new Set(['heavens_fury', 'skull_curse', 'ice_beam', 'wheel', 'fire_storm', 'skeleton_attack', 'land_mine']);

// Omar (fast melee) and Archer (ranged) — L2 skeleton trio constants
const OMAR_FRAME_W = 64;
const OMAR_FRAME_H = 64;
const OMAR_SCALE = 3.2;
const OMAR_MAX_HP = 130;
const OMAR_PATROL_SPEED = 110;
const OMAR_CHASE_SPEED = 260;
const OMAR_HIT_DAMAGE = 22;
const OMAR_HIT_REACH = 70;
const OMAR_HIT_COOLDOWN_MS = 900;
const OMAR_HIT_WINDUP_MS = 280;
const OMAR_DETECT_RADIUS = 360;

const ARCHER_FRAME_W = 64;
const ARCHER_FRAME_H = 64;
const ARCHER_SCALE = 2.6;
const ARCHER_MAX_HP = 90;
const ARCHER_PATROL_SPEED = 70;
const ARCHER_KITE_SPEED = 150;
const ARCHER_PREFERRED_RANGE = 420;
const ARCHER_RETREAT_RANGE = 220;
const ARCHER_DETECT_RADIUS = 1600;
const ARCHER_SHOOT_COOLDOWN_MS = 1200;
const ARCHER_SHOOT_WINDUP_MS = 305;
const ARCHER_ROLL_COOLDOWN_MS = 3500;
const ARCHER_ROLL_DURATION_MS = 580;
const ARCHER_ROLL_SPEED = 360;
const ARCHER_ARROW_SPEED = 1100;
const ARCHER_ARROW_DAMAGE = 22;
const ARCHER_ARROW_LIFETIME_MS = 1800;
const FIRE_STORM_L2_DURATION_MS = 13500;
const FIRE_STORM_L2_WAVES = 4;
const FIRE_STORM_L2_WAVE_DELAY_MS = 3000;
const FIRE_STORM_L2_SPEED_MULT = 1.4;
const FIRE_STORM_L2_RAY_RADIUS = 600;
const FIRE_STORM_L2_SPEED = 760;
const FIRE_STORM_L2_RELEASE_DIST = 36;
const FIRE_BURN_DURATION_MS = 3000;
const FIRE_BURN_TICK_INTERVAL_MS = 600;
const FIRE_BURN_TICKS = 5;
const FIRE_BURN_TICK_DAMAGE = 6;
const WHEEL_L2_SIZE_MULTS = [1.0, 1.2, 1.4, 1.6, 1.8]; // 5 sizes, 2 wheels each = 10 total
const WHEEL_L2_SPAWN_INTERVAL_MS = 500;
const ICE_BEAM_L2_DURATION_MS = 13500;
const ICE_BEAM_L2_SLIPPERY_FACTOR = 0.70;
const ICE_BEAM_L2_JUMP_FACTOR = 0.90;
const ICE_BEAM_L2_GRAVITY_FACTOR = 0.70;

// Kill feed HUD — Valorant-style (avatar killer + ícone de causa + avatar vítima)
const KILL_FEED_MAX = 5;
const KILL_FEED_LIFETIME_MS = 5500;
const KILL_FEED_FADE_MS = 350;
const KILL_FEED_ENTRY_HEIGHT = 30;
const KILL_FEED_ENTRY_WIDTH = 180;
const KILL_FEED_GAP = 5;
const KILL_FEED_MARGIN_X = 18;
const KILL_FEED_MARGIN_Y = 200;
const KILL_FEED_PILL_WIDTH = 38;
const KILL_FEED_ICON_PX = 22;
const KILL_CAUSES = {
  basic_attack:        { color: 0xe5e7eb, label: 'X',  iconKey: 'kill_basic_attack' },
  eye_attack:          { color: 0x78350f, label: 'O',  iconKey: 'kill_eye_attack' },
  skull_curse:         { color: 0xa855f7, label: 'S',  iconKey: 'kill_skull_curse' },
  skull_curse_dot:     { color: 0x7e22ce, label: 'P',  iconKey: 'kill_skull_curse_dot', iconFile: 'skull_curse.png' },
  skeleton_bite:       { color: 0x4ade80, label: 'E',  iconKey: 'kill_skeleton_bite' },
  archer_arrow:        { color: 0x86efac, label: 'A',  iconKey: 'kill_archer_arrow' },
  archer_arrow_pierce: { color: 0xc084fc, label: 'A+', iconKey: 'kill_archer_arrow_pierce' },
  heavens_fury:        { color: 0xfde047, label: 'R',  iconKey: 'kill_heavens_fury' },
  land_mine:           { color: 0xff8a2c, label: 'M',  runtimeKey: 'landmine_explosion', runtimeFrame: 6 },
  land_mine_party:     { color: 0xff5a2c, label: 'M+', runtimeKey: 'landmine_explosion', runtimeFrame: 6 },
  wheel:               { color: 0x9ca3af, label: 'W',  runtimeKey: 'wheel_loot_idle', runtimeFrame: 2 },
  fire_storm:          { color: 0xf97316, label: 'F',  runtimeKey: 'fire_storm_loot_idle', runtimeFrame: 56 },
  fire_storm_burn:     { color: 0xea580c, label: 'B',  runtimeKey: 'fire_storm_aura', runtimeFrame: 4 },
  ice_beam:            { color: 0x22d3ee, label: 'I',  runtimeKey: 'ice_beam_loot_idle', runtimeFrame: 0 },
  fall:                { color: 0x111827, label: '↓',  iconKey: 'kill_fall' },
};

// Land Mine L2 — "festa de minas": minas materializam em plataformas aleatórias,
// puxam fighters/pets e explodem após 3s
const LAND_MINE_L2_DURATION_MS = 11000;
const LAND_MINE_L2_SPAWN_INTERVAL_MS = 500;
const LAND_MINE_L2_FUSE_MS = 3200;
const LAND_MINE_L2_PULL_RADIUS = 180;
const LAND_MINE_L2_PULL_ACCEL = 900; // puxão leve — slow é a trava principal
const LAND_MINE_L2_GRAVITY_FACTOR = 0.55; // descida 45% mais lenta dentro do raio
const LAND_MINE_L2_MIN_SPACING = 110;
const LAND_MINE_L2_SCALE = 0.95; // bem maior que a L1 (LAND_MINE_SCALE = 0.6)
const LAND_MINE_L2_RADIUS_MULT = 1.7; // raio de explosão das minas de festa
// Slow aplicado enquanto fighter está dentro do raio de puxão (reaproveita o fator do skull curse)

const LOOT_TYPES = {
  wood: {
    idleKey: 'wood_idle',
    catchKey: 'wood_catch',
    glowKey: 'glow_orange',
    onPickup: (scene, fighter, loot) => {
      if (loot.power === 'land_mine') {
        if (
          fighter.specialPowers.includes('land_mine') &&
          !fighter.upgradedPowers.has('land_mine')
        ) {
          fighter.upgradedPowers.add('land_mine');
        } else if (!fighter.specialPowers.includes('land_mine')) {
          if (fighter.specialPowers.length < 2) fighter.specialPowers.push('land_mine');
          else fighter.specialPowers[1] = 'land_mine';
        }
        fighter.landMineCharges = 2;
        return;
      }
      // Upgrade path: duplicate of an upgradable skill levels it up instead of stacking
      if (
        UPGRADABLE_POWERS.has(loot.power) &&
        fighter.specialPowers.includes(loot.power) &&
        !fighter.upgradedPowers.has(loot.power)
      ) {
        fighter.upgradedPowers.add(loot.power);
        return;
      }
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
    idleScale: 2.0,
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
  skeleton_attack: {
    idleKey: 'skeleton_attack_loot_idle',
    catchKey: 'skeleton_attack_loot_catch',
    glowKey: 'glow_orange',
    onPickup: (scene, fighter, loot) => {
      if (fighter.specialPowers.length < 2) fighter.specialPowers.push(loot.power);
      else fighter.specialPowers[1] = loot.power;
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
    this.mode = data?.mode ?? 'singleplayer';
    this.network = data?.network ?? null;
    this.isMultiplayer = this.mode === 'host' || this.mode === 'client';
    this.isTestMode = this.mode === 'test';
    this.isSinglePlayer = this.mode === 'singleplayer';
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
      // Death 2 (heavy-death anim): 12 cols x 9 rows of 192x128, animation lives on row 9 (frames 96-107)
      this.load.spritesheet(`${char.id}_death_2`, `sprites/${char.folder}player_death 2.png`, {
        frameWidth: FRAME_WIDTH,
        frameHeight: FRAME_HEIGHT,
      });
    }
    this.load.audio('bgm', 'audio/bgm.mp3');
    this.load.audio('sfx_skeleton_spawn', 'audio/powers/skeleton/skeleton-spawn.mp3');
    this.load.audio('sfx_skeleton_attack', 'audio/powers/skeleton/atack 2.mp3');
    this.load.audio('sfx_skeleton_hit', 'audio/powers/skeleton/Skeleton_hit damage.ogg');
    this.load.audio('sfx_skeleton_death', 'audio/powers/skeleton/skeleton-death.mp3');
    this.load.audio('sfx_skeleton_skull_curse', 'audio/powers/skeleton/skullcurse in skelleton.mp3');
    this.load.audio('sfx_heavens_fury_cast', 'audio/powers/heavens_fury/Cast.mp3');
    this.load.audio('sfx_heavens_fury_second', 'audio/powers/heavens_fury/Second.mp3');
    this.load.audio('sfx_heavens_fury_belezam', 'audio/powers/heavens_fury/belezam.mp3');
    this.load.audio('sfx_swing', 'audio/attacks/Hit.mp3');
    this.load.audio('sfx_hit', 'audio/attacks/atack.mp3');
    this.load.audio('sfx_crow_die', 'audio/corvo/corvo die.mp3');
    this.load.audio('sfx_shield_cast', 'audio/powers/shield/cast.mp3');
    this.load.audio('sfx_shield_break', 'audio/powers/shield/broke shield.mp3');
    this.load.audio('sfx_skull_cast', 'audio/powers/skull_curse/cast skull curse.mp3');
    this.load.audio('sfx_skull_cast_up', 'audio/powers/skull_curse/skull up.mp3');
    this.load.audio('sfx_skull_hit', 'audio/powers/skull_curse/hit skull.mp3');
    this.load.audio('sfx_wheel_hit', 'audio/powers/wheel/Hit.mp3');
    this.load.audio('sfx_wheel_hit2', 'audio/powers/wheel/hit2.mp3');
    this.load.audio('sfx_wheel_air', 'audio/powers/wheel/Moviment_Air.mp3');
    this.load.audio('sfx_wheel_ground', 'audio/powers/wheel/Moviment_ground.mp3');
    this.load.audio('sfx_fire_storm', 'audio/powers/fire_storm/Cast and wave 2.mp3');
    this.load.audio('sfx_fire_storm_2', 'audio/powers/fire_storm/Cast and wave 2_2.mp3');
    this.load.audio('sfx_ice_cast', 'audio/powers/icebeam/ice cast.mp3');
    this.load.audio('sfx_ice_crash', 'audio/powers/icebeam/crash ice.mp3');
    this.load.audio('sfx_snow_storm', 'audio/powers/icebeam/snow storm.mp3');
    this.load.audio('sfx_snow_wind', 'audio/powers/icebeam/vento.mp3');
    this.load.audio('sfx_kill_1', 'audio/kills sounds/1-kill.mp3');
    this.load.audio('sfx_kill_2', 'audio/kills sounds/2-kills.mp3');
    this.load.audio('sfx_kill_3', 'audio/kills sounds/3-kills.mp3');
    this.load.audio('sfx_kill_4', 'audio/kills sounds/4-kills.mp3');
    this.load.audio('sfx_kill_5', 'audio/kills sounds/5-kills.mp3');
    this.load.audio('sfx_power_pickup', 'audio/power catch/power cath.mp3');
    this.load.audio('sfx_cure', 'audio/heal novo/93eeb9fc-8eab-44db-aa09-270a2550a130.mp3');
    this.load.audio('sfx_jump', 'audio/jump/30_Jump_03.wav');
    this.load.audio('sfx_landmine_explode', 'audio/landmine/ES_Explosions, Real, Small, Short 02 - Epidemic Sound.mp3');
    this.load.audio('sfx_death_fall', 'audio/fall death/1296971370907041923.ogg');
    this.load.audio('sfx_lightning_catch', 'audio/powers/heavens_fury/lightning_catch.mp3');
    // Kill feed icons — só carrega quem aponta pra customkillfield/ (causas com runtimeKey já vêm de sprites do jogo)
    for (const [causeKey, cfg] of Object.entries(KILL_CAUSES)) {
      if (cfg.iconKey) {
        const file = cfg.iconFile || `${causeKey}.png`;
        this.load.image(cfg.iconKey, `sprites/customkillfield/${file}`);
      }
    }
    // Heads dos players pro kill feed (fallback: pílula colorida com nick)
    for (let i = 0; i < CHARACTERS.length; i++) {
      const ch = CHARACTERS[i];
      this.load.image(`head_${ch.id}`, `sprites/customkillfield/heads/player ${i + 1}.png`);
    }
    this.load.image('map1_bg', 'maps/Mapa 1 - Graveyard of Souls/Fundo.png');
    this.load.image('map1_bg_snow', 'maps/Mapa 1 - Graveyard of Souls/Fundo nevado.png');
    this.load.image('map1_bg_firestorm', 'maps/Mapa 1 - Graveyard of Souls/Fundo fire storm.png');
    this.load.image('self_arrow', 'sprites/seta/seta.png');
    this.load.image('map1_platforms', 'maps/Mapa 1 - Graveyard of Souls/Plataformas.png');
    this.load.spritesheet('map1_crow', 'maps/Mapa 1 - Graveyard of Souls/Crow.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('land_mine_idle', 'sprites/Poder 9 (landmine)/sheet-transparent.png', {
      frameWidth: LAND_MINE_FRAME,
      frameHeight: LAND_MINE_FRAME,
    });
    this.load.spritesheet('land_mine_l2_idle', 'sprites/Poder 9 (landmine)/L2/sheet-transparent.png', {
      frameWidth: LAND_MINE_FRAME,
      frameHeight: LAND_MINE_FRAME,
    });
    this.load.spritesheet('landmine_explosion', 'sprites/Poder 9 (landmine)/explosion-b.png', {
      frameWidth: 80,
      frameHeight: 48,
    });
    this.load.spritesheet('land_mine_loot_idle', 'sprites/Poder 9 (landmine)/loot/sheet-transparent.png', {
      frameWidth: 128,
      frameHeight: 128,
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
    this.load.spritesheet('shield_loot_icon', 'sprites/Poder 2 (Shield)/Icon19.png', {
      frameWidth: LOOT_FRAME_SIZE,
      frameHeight: LOOT_FRAME_SIZE,
    });
    this.load.spritesheet('shield_loot_sheet', 'sprites/Poder 2 (Shield)/shield carch.png', {
      frameWidth: LOOT_FRAME_SIZE,
      frameHeight: LOOT_FRAME_SIZE,
    });
    this.load.spritesheet('heavens_fury', 'sprites/Poder 1 (Heavens Fury)/HeavensFury_spritesheet.png', {
      frameWidth: HEAVENS_FURY_FRAME_SIZE,
      frameHeight: HEAVENS_FURY_FRAME_SIZE,
    });
    this.load.spritesheet('heavens_fury_loot_idle', 'sprites/Poder 1 (Heavens Fury)/loot/idle-transparent.png', {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet('smite', 'sprites/Poder 1 (Heavens Fury)/Smite_spritesheet.png', {
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
    this.load.spritesheet('fire_storm_aura', 'sprites/Poder 5 (fire storm)/aura/fire aura/Group 5 - 4.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet('fire_storm_loot_idle', 'sprites/Poder 5 (fire storm)/Fire loot 3.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('wheel_loot_idle', 'sprites/Poder 4 (Wheel)/loot/sheet-transparent.png', {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet('skeleton_attack_loot_idle', 'sprites/Power 8 (skeleton)/loot/sheet-transparent.png', {
      frameWidth: 128,
      frameHeight: 128,
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
    this.load.spritesheet('ice_spell_cast', 'sprites/Power 7 (ice beam)/Spell cast.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('ice_beam_loot_catch_sheet', 'sprites/Power 7 (ice beam)/loot catch.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('skeleton_idle', 'sprites/Power 8 (skeleton)/Skeleton_White/Skeleton_With_VFX/Skeleton_01_White_Idle.png', {
      frameWidth: SKELETON_FRAME_W,
      frameHeight: SKELETON_FRAME_H,
    });
    this.load.spritesheet('skeleton_walk', 'sprites/Power 8 (skeleton)/Skeleton_White/Skeleton_With_VFX/Skeleton_01_White_Walk.png', {
      frameWidth: SKELETON_FRAME_W,
      frameHeight: SKELETON_FRAME_H,
    });
    this.load.spritesheet('skeleton_attack1', 'sprites/Power 8 (skeleton)/Skeleton_White/Skeleton_With_VFX/Skeleton_01_White_Attack1.png', {
      frameWidth: SKELETON_FRAME_W,
      frameHeight: SKELETON_FRAME_H,
    });
    this.load.spritesheet('skeleton_attack2', 'sprites/Power 8 (skeleton)/Skeleton_White/Skeleton_With_VFX/Skeleton_01_White_Attack2.png', {
      frameWidth: SKELETON_FRAME_W,
      frameHeight: SKELETON_FRAME_H,
    });
    this.load.spritesheet('skeleton_hurt', 'sprites/Power 8 (skeleton)/Skeleton_White/Skeleton_With_VFX/Skeleton_01_White_Hurt.png', {
      frameWidth: SKELETON_FRAME_W,
      frameHeight: SKELETON_FRAME_H,
    });
    this.load.spritesheet('skeleton_die', 'sprites/Power 8 (skeleton)/Skeleton_White/Skeleton_With_VFX/Skeleton_01_White_Die.png', {
      frameWidth: SKELETON_FRAME_W,
      frameHeight: SKELETON_FRAME_H,
    });
    this.load.spritesheet('omar_sheet', 'sprites/Power 8 (skeleton)/Omar Caveira/Skeleton enemy.png', {
      frameWidth: OMAR_FRAME_W,
      frameHeight: OMAR_FRAME_H,
    });
    this.load.spritesheet('archer_sheet', 'sprites/Power 8 (skeleton)/arqueiro fantastico/spritesheet.png', {
      frameWidth: ARCHER_FRAME_W,
      frameHeight: ARCHER_FRAME_H,
    });
    this.load.image('archer_arrow', 'sprites/Power 8 (skeleton)/arqueiro fantastico/projectile.png');
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

  createSkeletonLootTextures() {
    const frameW = 48;
    const frameH = 48;
    // Green necrotic orb used as the thrown skeleton ball
    this.createCanvasSpritesheet(
      'skeleton_ball',
      frameW, frameH, 8,
      (ctx, i, total) => {
        ctx.clearRect(0, 0, frameW, frameH);
        const cx = frameW / 2;
        const cy = frameH / 2;
        const t = i / total;
        const pulse = 0.85 + Math.sin(t * Math.PI * 2) * 0.15;
        const r = 11 * pulse;
        const outerR = r * 2.2;
        const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerR);
        halo.addColorStop(0, 'rgba(134, 239, 172, 0.75)');
        halo.addColorStop(0.55, 'rgba(34, 197, 94, 0.35)');
        halo.addColorStop(1, 'rgba(22, 163, 74, 0)');
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, frameW, frameH);
        const core = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 1, cx, cy, r);
        core.addColorStop(0, '#f0fdf4');
        core.addColorStop(0.35, '#86efac');
        core.addColorStop(1, '#15803d');
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(220, 252, 231, 0.8)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      },
    );
    this.createCanvasSpritesheet(
      'skeleton_attack_loot_catch',
      frameW, frameH, 7,
      (ctx, idx, total) => this.drawWhiteCatchFrame(ctx, idx, total, frameW, frameH),
    );
    this.anims.create({
      key: 'skeleton_ball',
      frames: this.anims.generateFrameNumbers('skeleton_ball', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'skeleton_attack_loot_idle',
      frames: this.anims.generateFrameNumbers('skeleton_attack_loot_idle', { start: 0, end: 5 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: 'skeleton_attack_loot_catch',
      frames: this.anims.generateFrameNumbers('skeleton_attack_loot_catch', { start: 0, end: 6 }),
      frameRate: 16,
      repeat: 0,
    });
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
    // Idle vem da sheet real (yellow sword com rachaduras no chão)
    this.anims.create({
      key: 'heavens_fury_loot_idle',
      frames: this.anims.generateFrameNumbers('heavens_fury_loot_idle', { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });
    // Catch volta a ser canvas-generated (efeito anterior)
    const catchFrameW = 64;
    const catchFrameH = 64;
    this.createCanvasSpritesheet(
      'heavens_fury_loot_catch',
      catchFrameW, catchFrameH, 7,
      (ctx, i, total) => this.drawHeavensFuryCatchFrame(ctx, i, total, catchFrameW, catchFrameH),
    );
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
    if (!this.textures.exists('snow_flake')) {
      const tex = this.textures.createCanvas('snow_flake', 4, 4);
      const ctx = tex.getContext();
      ctx.fillStyle = 'rgba(245, 250, 255, 1)';
      ctx.beginPath();
      ctx.arc(2, 2, 2, 0, Math.PI * 2);
      ctx.fill();
      tex.refresh();
    }

    this.rainEmitter = this.add.particles(0, 0, 'rain_drop', {
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

    this.snowEmitter = this.add.particles(0, 0, 'snow_flake', {
      x: { min: -80, max: MAP_WIDTH + 80 },
      y: -30,
      lifespan: 6000,
      speedY: { min: 90, max: 160 },
      speedX: { min: -40, max: 40 },
      quantity: 4,
      frequency: 30,
      alpha: { min: 0.55, max: 0.95 },
      scale: { min: 0.6, max: 1.4 },
      rotate: { min: 0, max: 360 },
    }).setDepth(-5);
    this.snowEmitter.stop();

    this._rainSurfaces = PLATFORM_RECTS.map((r) => ({ xStart: r.x, xEnd: r.x + r.w, y: r.y, w: r.w }));
    this.time.addEvent({
      delay: 90,
      loop: true,
      callback: () => this.spawnRainSplashes(),
    });
  }

  spawnRainSplashes() {
    if (this._snowstormActive) return;
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

    this.map1Bg = this.add.image(0, 0, 'map1_bg')
      .setOrigin(0, 0)
      .setScrollFactor(0.3, 0.6)
      .setDepth(-10);

    this.add.rectangle(0, 0, MAP_WIDTH, MAP_HEIGHT, 0x000000, 0.6)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(-9);

    this.createParallaxLayers();

    this.map1Platforms = this.add.image(0, 0, 'map1_platforms')
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
      x: 515,
      y: 600,
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
    this.createSkeletonLootTextures();
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
    if (!this.anims.exists('land_mine_idle')) {
      this.anims.create({
        key: 'land_mine_idle',
        frames: this.anims.generateFrameNumbers('land_mine_idle', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1,
      });
    }
    if (!this.anims.exists('land_mine_l2_idle')) {
      this.anims.create({
        key: 'land_mine_l2_idle',
        frames: this.anims.generateFrameNumbers('land_mine_l2_idle', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1,
      });
    }
    if (!this.anims.exists('land_mine_loot_idle')) {
      this.anims.create({
        key: 'land_mine_loot_idle',
        frames: this.anims.generateFrameNumbers('land_mine_loot_idle', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1,
      });
    }
    if (!this.anims.exists('landmine_explosion')) {
      // Sheet has 13 frames; frames 0-1 are empty, real explosion is 2-12
      this.anims.create({
        key: 'landmine_explosion',
        frames: this.anims.generateFrameNumbers('landmine_explosion', { start: 2, end: 12 }),
        frameRate: 20,
        repeat: 0,
      });
    }
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
      frames: this.anims.generateFrameNumbers('wheel_loot_idle', { start: 0, end: 5 }),
      frameRate: 6,
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
      key: 'skeleton_idle',
      frames: this.anims.generateFrameNumbers('skeleton_idle', { start: 0, end: SKELETON_IDLE_FRAMES - 1 }),
      frameRate: SKELETON_IDLE_FPS,
      repeat: -1,
    });
    this.anims.create({
      key: 'skeleton_walk',
      frames: this.anims.generateFrameNumbers('skeleton_walk', { start: 0, end: SKELETON_WALK_FRAMES - 1 }),
      frameRate: SKELETON_WALK_FPS,
      repeat: -1,
    });
    this.anims.create({
      key: 'skeleton_attack1',
      frames: this.anims.generateFrameNumbers('skeleton_attack1', { start: 0, end: SKELETON_ATTACK1_FRAMES - 1 }),
      frameRate: SKELETON_ATTACK_FPS,
      repeat: 0,
    });
    this.anims.create({
      key: 'skeleton_attack2',
      frames: this.anims.generateFrameNumbers('skeleton_attack2', { start: 0, end: SKELETON_ATTACK2_FRAMES - 1 }),
      frameRate: SKELETON_ATTACK_FPS,
      repeat: 0,
    });
    this.anims.create({
      key: 'skeleton_hurt',
      frames: this.anims.generateFrameNumbers('skeleton_hurt', { start: 0, end: SKELETON_HURT_FRAMES - 1 }),
      frameRate: SKELETON_HURT_FPS,
      repeat: 0,
    });
    this.anims.create({
      key: 'skeleton_die',
      frames: this.anims.generateFrameNumbers('skeleton_die', { start: 0, end: SKELETON_DIE_FRAMES - 1 }),
      frameRate: SKELETON_DIE_FPS,
      repeat: 0,
    });
    // Omar (sheet 832x320 = 13 cols x 5 rows of 64x64)
    // Row 0: attack (13 frames), Row 1: death (13), Row 2: walk (13), Row 3: hurt (4), Row 4: idle (3)
    this.anims.create({
      key: 'omar_attack',
      frames: this.anims.generateFrameNumbers('omar_sheet', { start: 0, end: 9 }),
      frameRate: 18,
      repeat: 0,
    });
    this.anims.create({
      key: 'omar_die',
      frames: this.anims.generateFrameNumbers('omar_sheet', { start: 13, end: 22 }),
      frameRate: 12,
      repeat: 0,
    });
    this.anims.create({
      key: 'omar_walk',
      frames: this.anims.generateFrameNumbers('omar_sheet', { start: 26, end: 33 }),
      frameRate: 14,
      repeat: -1,
    });
    this.anims.create({
      key: 'omar_hurt',
      frames: this.anims.generateFrameNumbers('omar_sheet', { start: 39, end: 41 }),
      frameRate: 14,
      repeat: 0,
    });
    this.anims.create({
      key: 'omar_idle',
      frames: this.anims.generateFrameNumbers('omar_sheet', { start: 52, end: 53 }),
      frameRate: 5,
      repeat: -1,
    });
    // Archer (sheet 512x512 = 8 cols x 8 rows of 64x64)
    // Row 0: run (8), Row 1: death/falling (8), Row 2: jump (8), Row 3: aim (8),
    // Row 4: shoot (8), Row 5: idle (4), Row 6: hurt (4), Row 7: extras
    this.anims.create({
      key: 'archer_run',
      frames: this.anims.generateFrameNumbers('archer_sheet', { start: 0, end: 7 }),
      frameRate: 14,
      repeat: -1,
    });
    this.anims.create({
      key: 'archer_die',
      frames: this.anims.generateFrameNumbers('archer_sheet', { start: 8, end: 15 }),
      frameRate: 12,
      repeat: 0,
    });
    this.anims.create({
      key: 'archer_aim',
      frames: this.anims.generateFrameNumbers('archer_sheet', { start: 24, end: 27 }),
      frameRate: 14,
      repeat: 0,
    });
    this.anims.create({
      key: 'archer_roll',
      frames: this.anims.generateFrameNumbers('archer_sheet', { start: 16, end: 21 }),
      frameRate: 14,
      repeat: 0,
    });
    this.anims.create({
      key: 'archer_shoot',
      frames: this.anims.generateFrameNumbers('archer_sheet', { start: 32, end: 39 }),
      frameRate: 18,
      repeat: 0,
    });
    this.anims.create({
      key: 'archer_idle',
      frames: this.anims.generateFrameNumbers('archer_sheet', { start: 40, end: 43 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: 'archer_hurt',
      frames: this.anims.generateFrameNumbers('archer_sheet', { start: 48, end: 51 }),
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
      key: 'ice_spell_cast',
      frames: this.anims.generateFrameNumbers('ice_spell_cast', { start: 2, end: 7 }),
      frameRate: 10,
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
      frames: [{ key: 'shield_loot_icon', frame: 0 }],
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: 'shield_catch',
      frames: [{ key: 'shield_loot_icon', frame: 0 }],
      frameRate: 1,
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
      key: 'fire_storm_aura',
      frames: this.anims.generateFrameNumbers('fire_storm_aura', { start: 0, end: 7 }),
      frameRate: 14,
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
      this.anims.create({
        key: `${char.id}_death_2`,
        frames: this.anims.generateFrameNumbers(`${char.id}_death_2`, { start: 96, end: 107 }),
        frameRate: 9,
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
    // Spawn cravado na plataforma. Sprite.x precisa compensar o body offset (49) pra que
    // o BODY (não o sprite) fique centrado horizontalmente na plataforma — caso contrário,
    // plataformas estreitas não pegam o body e o fighter cai no kill zone.
    const SPRITE_TO_BODY_CENTER_X =
      (FRAME_WIDTH / 2 - BODY_OFFSET_X - BODY_WIDTH / 2) * SPRITE_SCALE;
    // Mapeamento explícito: char 0 (laranja) → plataforma direita-grande, char 1 (roxo) → topo-esquerda,
    // char 2 (verde) → plataforma flutuante pequena do meio, char 3 → topo-direita pequena
    const platformIdxByChar = [3, 1, 2, 0];
    const spawnPositions = platformIdxByChar.map((pi) => {
      const r = PLATFORM_RECTS[pi];
      return {
        x: r.x + r.w / 2 + SPRITE_TO_BODY_CENTER_X,
        y: r.y - 60,
      };
    });
    let playerConfigs;
    if (this.isMultiplayer && this.matchPlayers) {
      playerConfigs = this.matchPlayers.map((p, i) => ({
        index: p.index,
        char: CHARACTERS.find((c) => c.id === p.charId) ?? CHARACTERS[i],
        spawn: spawnPositions[i] ?? spawnPositions[0],
        nick: p.nick || `Jogador ${p.index + 1}`,
      }));
    } else {
      playerConfigs = CHARACTERS.slice(0, SINGLE_PLAYER_CHARACTER_COUNT).map((char, i) => ({
        index: i,
        char,
        spawn: spawnPositions[i] ?? spawnPositions[0],
        nick: `P${i + 1}`,
      }));
    }
    for (const cfg of playerConfigs) {
      const fighter = this.createFighter(cfg.char, cfg.spawn.x, cfg.spawn.y);
      fighter.ownerIndex = cfg.index;
      fighter.nick = cfg.nick;
      fighter.kills = 0;
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

    if (this.isMultiplayer) this.createKillHud();

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
      exitEye: Phaser.Input.Keyboard.KeyCodes.E,
    });

    this.powerSelectKeys = this.input.keyboard.addKeys({
      p1: Phaser.Input.Keyboard.KeyCodes.ONE,
      p2: Phaser.Input.Keyboard.KeyCodes.TWO,
      p3: Phaser.Input.Keyboard.KeyCodes.THREE,
      p4: Phaser.Input.Keyboard.KeyCodes.FOUR,
      p5: Phaser.Input.Keyboard.KeyCodes.FIVE,
      p6: Phaser.Input.Keyboard.KeyCodes.SIX,
      p7: Phaser.Input.Keyboard.KeyCodes.SEVEN,
      p8: Phaser.Input.Keyboard.KeyCodes.EIGHT,
      p9: Phaser.Input.Keyboard.KeyCodes.NINE,
    });

    this.input.on('wheel', (_pointer, _over, _dx, dy) => {
      if (!this.isTestMode) return;
      if (!dy) return;
      const dir = dy > 0 ? 1 : -1;
      this.cycleControlledFighter(dir);
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
      const slots = this.playerFighter?.specialPowers ?? [];
      const isEmpty = slots.length === 0;
      powerButtons.forEach((btn) => {
        const power = btn.dataset.power;
        const active = power === 'none' ? isEmpty : slots.includes(power);
        btn.classList.toggle('active', active);
      });
    };
    powerButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!this.playerFighter) return;
        const selected = btn.dataset.power;
        if (selected === 'none') {
          this.playerFighter.specialPowers = [];
          this.playerFighter.landMineCharges = 0;
          this.playerFighter.upgradedPowers?.clear();
        } else {
          this.grantPower(this.playerFighter, selected);
        }
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
        const duck = this._snowstormActive ? 0.5 : 1;
        this.bgm.setVolume(this.masterVolume * this.bgmScale * duck);
        if (this._snowstormSound) {
          this._snowstormSound.setVolume(this.masterVolume * this.sfxScale * 0.72);
        }
        if (this._snowstormWind) {
          this._snowstormWind.setVolume(this.masterVolume * this.sfxScale * 1.5);
        }
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

    this.specialSkeletonSprite = this.add.circle(
      specialOrbCenterX,
      orbsY,
      SPECIAL_ORB_RADIUS,
      0xf97316
    )
      .setStrokeStyle(3, 0x9a3412)
      .setDepth(22)
      .setScrollFactor(0)
      .setVisible(false);
    this.specialSkeletonPulse = this.tweens.add({
      targets: this.specialSkeletonSprite,
      scale: 1.2,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      paused: true,
    });

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

    this.killFeedEntries = [];
    this.killFeedX = this.cameras.main.width - KILL_FEED_MARGIN_X;
    this.killFeedY = KILL_FEED_MARGIN_Y;

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

    const stormHudX = this.cameras.main.width / 2;
    const stormHudY = eyeHudY + 60;
    this.stormHudBg = this.add.rectangle(stormHudX, stormHudY, 180, 44, 0x1e1b4b, 0.75)
      .setStrokeStyle(2, 0xff8c63, 0.9)
      .setScrollFactor(0)
      .setDepth(22)
      .setVisible(false);
    this.stormHudLabel = this.add.text(stormHudX, stormHudY - 10, 'STORM', {
      font: 'bold 11px sans-serif',
      color: '#fde047',
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(23).setVisible(false);
    this.stormHudText = this.add.text(stormHudX, stormHudY + 7, '0.0s', {
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
      // Flying Eye loot temporarily disabled (too strong, balance pending)
      const roll = Phaser.Math.FloatBetween(0, 1);
      if (roll < 0.1) key = 'hp';
      else if (roll < 0.2) key = 'shield';
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
    loot.catchYOffset = powerDef?.lootCatchYOffset ?? 0;
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
    } else if (powerDef?.lootTintPulseColor !== undefined) {
      const tintOverlay = this.add.sprite(x, y, idleKey, 0)
        .setScale(idleScale)
        .setDepth(DEFAULT_SPRITE_DEPTH + 0.5)
        .setTintFill(powerDef.lootTintPulseColor)
        .setAlpha(0);
      tintOverlay.anims.play(idleKey);
      const whitePulse = this.tweens.add({
        targets: tintOverlay,
        alpha: powerDef.lootTintPulseAlpha ?? 0.5,
        duration: powerDef.lootTintPulseDuration ?? 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
      loot.tintOverlay = tintOverlay;
      loot.whitePulse = whitePulse;
    }
    loot.body.setSize(LOOT_BODY_SIZE, LOOT_BODY_SIZE);
    const bodyYExtra = powerDef?.lootBodyYOffset ?? 0;
    loot.body.setOffset(
      (idleFrameSize - LOOT_BODY_SIZE) / 2,
      (idleFrameHeight - LOOT_BODY_SIZE) / 2 + bodyYExtra
    );

    if (powerDef?.lootShadow) {
      const cfg = powerDef.lootShadow;
      const shadow = this.add.ellipse(x, y, cfg.width, cfg.height, 0x000000, cfg.alpha)
        .setDepth(DEFAULT_SPRITE_DEPTH - 0.6);
      loot.shadow = shadow;
    }

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

    if (lootType === 'shield') {
      loot.idlePulse = this.tweens.add({
        targets: loot,
        scaleX: idleScale * 1.12,
        scaleY: idleScale * 1.12,
        duration: 520,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
      loot.idleBob = this.tweens.add({
        targets: loot,
        angle: { from: -6, to: 6 },
        duration: 880,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }

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
    if (loot.idleBob) { loot.idleBob.stop(); loot.idleBob = null; }
    if (loot.idlePulse) { loot.idlePulse.stop(); loot.idlePulse = null; }
    if (reason === 'shatter') {
      loot.isPickedUp = true;
      loot.body.enable = false;
      if (loot.glowPulse) loot.glowPulse.stop();
      this.tweens.add({
        targets: [loot.glow, loot.tintOverlay, loot.beam, loot.footGlow, loot.shadow].filter(Boolean),
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
      targets: [loot, loot.glow, loot.tintOverlay, loot.beam, loot.footGlow, loot.shadow].filter(Boolean),
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
    if (loot.lootType === 'wood' && loot.power === 'heavens_fury') {
      this.playSfx('sfx_lightning_catch');
    }
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
    if (loot.idleBob) { loot.idleBob.stop(); loot.idleBob = null; }
    if (loot.idlePulse) { loot.idlePulse.stop(); loot.idlePulse = null; }
    this.tweens.add({
      targets: [loot.glow, loot.tintOverlay, loot.beam, loot.footGlow].filter(Boolean),
      alpha: 0,
      duration: 200,
    });
    if (loot.lootType === 'shield') {
      const baseScale = loot.scaleX;
      this.tweens.add({
        targets: loot,
        scaleX: baseScale * 1.6,
        scaleY: baseScale * 1.6,
        duration: 160,
        ease: 'Quad.easeOut',
        yoyo: false,
      });
      this.tweens.add({
        targets: loot,
        angle: 360,
        alpha: 0,
        duration: 340,
        ease: 'Quad.easeOut',
        onComplete: () => this.removeLoot(loot),
      });
      return;
    }
    if (loot.catchScale !== undefined) loot.setScale(loot.catchScale);
    if (loot.catchYOffset) loot.y += loot.catchYOffset;
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
    if (loot.idleBob) loot.idleBob.stop();
    if (loot.idlePulse) loot.idlePulse.stop();
    if (loot.glow) loot.glow.destroy();
    if (loot.tintOverlay) loot.tintOverlay.destroy();
    if (loot.beam) loot.beam.destroy();
    if (loot.footGlow) loot.footGlow.destroy();
    if (loot.shadow) loot.shadow.destroy();
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
      upgradedPowers: new Set(),
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
    if (opts && opts.useDeath2) fighter.pendingDeath2 = true;
    if (opts && opts.attackerIndex !== undefined) {
      fighter.lastAttackerIndex = opts.attackerIndex;
    }
    if (opts && opts.cause) fighter.lastDamageCause = opts.cause;
    fighter.lastDamageAt = this.time.now;
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
    if (finalAmount > 0) {
      const body = fighter.sprite.body;
      const color = fighter === this.playerFighter ? '#ef4444' : '#ffffff';
      this.spawnDamageNumber(body.x + body.width / 2, body.y, finalAmount, color);
    }
    this.triggerHitFlash(fighter);
    const ignoreFreezeBreak = !!(opts && opts.ignoreFreezeBreak);
    if (finalAmount > 0 && fighter.isFrozen && !ignoreFreezeBreak) {
      this.removeFreeze(fighter);
    }
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

  applyBurn(target, opts = {}) {
    if (!target || target.isDead) return;
    const tickDamage = opts.tickDamage ?? FIRE_BURN_TICK_DAMAGE;
    const tickInterval = opts.tickInterval ?? FIRE_BURN_TICK_INTERVAL_MS;
    const duration = opts.duration ?? FIRE_BURN_DURATION_MS;
    // Hit always wins: a stronger burn (higher tick damage) replaces a weaker one.
    // A weaker burn just refreshes the end timer, keeping the existing strong damage.
    const currentTick = target.burnTickDamage || 0;
    if (currentTick > tickDamage && target.burnTimer) {
      if (target.burnEndTimer) target.burnEndTimer.remove(false);
      target.burnEndTimer = this.time.delayedCall(duration, () => this.removeBurn(target));
      return;
    }
    target.burnTickDamage = tickDamage;
    if (target.burnTimer) target.burnTimer.remove(false);
    if (target.burnEndTimer) target.burnEndTimer.remove(false);
    if (this.isAuthoritativeOwner(target)) {
      const totalTicks = Math.max(1, Math.round(duration / tickInterval));
      target.burnTimer = this.time.addEvent({
        delay: tickInterval,
        repeat: totalTicks - 1,
        callback: () => {
          if (!target || target.isDead) return;
          this.damageFighter(target, tickDamage, {
            ignoreShield: true,
            ignoreCurseMultiplier: true,
            ignoreFreezeBreak: true,
            cause: 'fire_storm_burn',
          });
        },
      });
    }
    if (!target.burnTintSprite && !target.isDead) {
      target.burnTintSprite = this.add.sprite(
        target.sprite.x,
        target.sprite.y,
        target.sprite.texture.key,
        target.sprite.frame.name,
      )
        .setScale(target.sprite.scaleX, target.sprite.scaleY)
        .setFlipX(target.sprite.flipX)
        .setTintFill(0xff8800)
        .setAlpha(0.45)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(target.sprite.depth + 0.05);
      target.burnPulseTween = this.tweens.add({
        targets: target.burnTintSprite,
        alpha: 0.2,
        duration: 220,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }
    target.burnEndTimer = this.time.delayedCall(duration, () => {
      this.removeBurn(target);
    });
  }

  removeBurn(target) {
    if (!target) return;
    if (target.burnTimer) { target.burnTimer.remove(false); target.burnTimer = null; }
    if (target.burnEndTimer) { target.burnEndTimer.remove(false); target.burnEndTimer = null; }
    if (target.burnPulseTween) { target.burnPulseTween.stop(); target.burnPulseTween = null; }
    if (target.burnTintSprite) { target.burnTintSprite.destroy(); target.burnTintSprite = null; }
    target.burnTickDamage = 0;
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
    const useDeath2 = !!fighter.pendingDeath2;
    fighter.pendingDeath2 = false;
    const animKey = useDeath2 ? `${fighter.char.id}_death_2` : `${fighter.char.id}_death`;
    const startFrame = useDeath2 ? 96 : 0;
    const marker = this.add.sprite(
      fighter.sprite.x,
      fighter.sprite.y,
      animKey,
      startFrame
    )
      .setScale(SPRITE_SCALE)
      .setDepth(DEFAULT_SPRITE_DEPTH - 1)
      .setFlipX(fighter.sprite.flipX);
    marker.play(animKey);
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
    this.spawnWheelProjectile(fighter, startX, startY, dir, WHEEL_SCALE, -360);
  }

  fireWheelStorm(fighter) {
    // Build a list with each size repeated twice → 10 wheels, then shuffle
    const order = [];
    for (const s of WHEEL_L2_SIZE_MULTS) { order.push(s); order.push(s); }
    Phaser.Utils.Array.Shuffle(order);
    for (let i = 0; i < order.length; i++) {
      const sizeMult = order[i];
      this.time.delayedCall(i * WHEEL_L2_SPAWN_INTERVAL_MS, () => {
        if (!fighter || fighter.isDead) return;
        // Entry mode: 0 = from above (falls down, hits upper platforms), 1 = from left, 2 = from right
        const mode = Phaser.Math.Between(0, 2);
        let startX, startY, dir, vy;
        if (mode === 0) {
          startX = Phaser.Math.Between(120, MAP_WIDTH - 120);
          startY = -40;
          dir = Math.random() < 0.5 ? -1 : 1;
          vy = Phaser.Math.Between(220, 320);
        } else {
          dir = mode === 1 ? 1 : -1;
          startX = dir > 0 ? -40 : MAP_WIDTH + 40;
          startY = Phaser.Math.Between(80, Math.floor(MAP_HEIGHT * 0.65));
          vy = -260;
        }
        const w = this.spawnWheelProjectile(
          fighter,
          startX,
          startY,
          dir,
          WHEEL_SCALE * sizeMult,
          vy
        );
        if (w) w.isL2 = true;
      });
    }
  }

  spawnWheelProjectile(fighter, startX, startY, dir, scale, initialVy) {
    const bodyW = WHEEL_BODY_W * scale;
    const bodyH = WHEEL_BODY_H * scale;
    const phys = this.add.rectangle(startX, startY, bodyW, bodyH, 0xff0000, 0);
    this.physics.add.existing(phys);
    phys.body.setAllowGravity(true);
    phys.body.setBounce(1, 0.25);
    phys.body.setCollideWorldBounds(true);
    phys.body.setVelocity(WHEEL_SPEED * dir, initialVy);

    const visual = this.add.sprite(startX, startY + WHEEL_VISUAL_Y_OFFSET, 'wheel', 0);
    visual.setScale(scale);
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
    phys.skeletonHitSet = new Set();

    this.wheelProjectiles.push(phys);
    return phys;
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
    if (fighter.iceSlippery) this.removeIceSlippery(fighter);
    if (this._snowstormActive && fighter === this._snowstormCaster) this.endSnowstorm();
    if (fighter.fireStormBuff) this.deactivateFireStormBuff(fighter);
    this.removeBurn(fighter);
    fighter.isDead = true;
    fighter.lives = Math.max(0, fighter.lives - 1);
    const killCause = fighter.lastDamageCause || 'basic_attack';
    const hasKiller =
      fighter.lastAttackerIndex !== undefined &&
      fighter.lastAttackerIndex !== null &&
      fighter.lastAttackerIndex !== fighter.ownerIndex;
    if (hasKiller) {
      const killer = this.fightersByIndex[fighter.lastAttackerIndex];
      if (killer && killer !== fighter) {
        killer.kills = (killer.kills || 0) + 1;
        if (killer === this.playerFighter) this.playKillSfx(killer.kills);
      }
    }
    // Kill feed + MP sync (autoritativo apenas)
    if (this.isAuthoritativeOwner(fighter) || !this.isMultiplayer) {
      const killerIdx = hasKiller ? fighter.lastAttackerIndex : fighter.ownerIndex;
      this.addKillFeedEntry(killerIdx, fighter.ownerIndex, killCause);
      if (this.isMultiplayer && this.network) {
        this.network.send({
          type: 'kill_credit',
          killerIndex: killerIdx,
          victimIndex: fighter.ownerIndex,
          cause: killCause,
          isKill: hasKiller,
        });
      }
    }
    fighter.lastAttackerIndex = null;
    fighter.lastDamageCause = null;
    fighter.specialPowers = [];
    fighter.upgradedPowers?.clear();
    this.removeShield(fighter);
    this.removeSkullCurse(fighter);
    this.removeStun(fighter);
    this.despawnSkeleton(fighter);

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
    this.despawnSkeleton(fighter);
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
    const btnLabel = this.add.text(btnX, btnY, this.isMultiplayer ? 'Voltar ao lobby' : 'Jogar novamente', {
      font: 'bold 22px sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(102);
    btnBg.on('pointerover', () => btnBg.setFillStyle(0x16a34a));
    btnBg.on('pointerout', () => btnBg.setFillStyle(0x22c55e));
    btnBg.on('pointerdown', () => {
      btnBg.disableInteractive();
      btnLabel.setText(this.isMultiplayer ? 'Voltando...' : 'Recarregando...');
      if (this.isMultiplayer && this.network) {
        this.network.send({ type: 'match_return_to_lobby' });
        this.time.delayedCall(180, () => {
          if (this.network) this.network.send({ type: 'match_return_to_lobby' });
        });
        this.time.delayedCall(260, () => {
          window.dispatchEvent(new CustomEvent('match-return-to-lobby'));
        });
      } else {
        window.location.reload();
      }
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
    fighter.pendingDeath2 = false;
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

  pickHeavensFuryBonusX(occupiedZones, ownHalfWidth) {
    // occupiedZones: array of { x, halfWidth } already taken by previous rays
    const minX = 80;
    const maxX = MAP_WIDTH - 80;
    for (let attempt = 0; attempt < 30; attempt++) {
      const cand = Phaser.Math.Between(minX, maxX);
      let overlap = false;
      for (const z of occupiedZones) {
        const minDist = z.halfWidth + ownHalfWidth + 10; // +10px gap
        if (Math.abs(cand - z.x) < minDist) { overlap = true; break; }
      }
      if (!overlap) return cand;
    }
    // Fallback: pick the X furthest from all existing zones
    let bestX = minX;
    let bestDist = -1;
    for (let x = minX; x <= maxX; x += 40) {
      let nearest = Infinity;
      for (const z of occupiedZones) {
        const d = Math.abs(x - z.x) - z.halfWidth;
        if (d < nearest) nearest = d;
      }
      if (nearest > bestDist) { bestDist = nearest; bestX = x; }
    }
    return bestX;
  }

  findLowestSurfaceAt(x) {
    let best = -Infinity;
    for (const rect of PLATFORM_RECTS) {
      if (x < rect.x || x > rect.x + rect.w) continue;
      if (rect.y > best) best = rect.y;
    }
    return best === -Infinity ? MAP_HEIGHT : best;
  }

  playSfx(key, volumeMultiplier = 1, seek = 0) {
    if (!this.cache.audio.exists(key)) return;
    this.sound.play(key, {
      volume: this.masterVolume * this.sfxScale * volumeMultiplier,
      seek,
    });
  }

  firePower(fighter, worldX, worldY, level = 1, opts = {}) {
    const isL2 = level >= 2;
    const fastTelegraph = opts.fastTelegraph ?? isL2;
    const bigSize = opts.bigSize ?? isL2;
    const wideAoe = opts.wideAoe ?? isL2;
    const lowestSurface = opts.lowestSurface ?? isL2;
    const surfaceY = lowestSurface
      ? this.findLowestSurfaceAt(worldX)
      : this.findSurfaceBelow(worldX, worldY);
    const beamHeight = Math.max(0, surfaceY);
    const sizeMult = opts.sizeMult ?? (bigSize ? 3 : 1);
    const telegraphMs = fastTelegraph ? 600 : HEAVENS_FURY_TELEGRAPH_MS;
    const beamWidthMult = wideAoe ? 2 : 1;

    this.playSfx('sfx_heavens_fury_cast');
    this.playSfx('sfx_heavens_fury_belezam');

    const telegraph = this.add.sprite(worldX, surfaceY, 'smite', 0)
      .setOrigin(0.5, 1)
      .setScale(SMITE_SCALE * sizeMult)
      .setDepth(ATTACKER_DEPTH);
    telegraph.play('smite');

    const telegraphCore = this.add.rectangle(worldX, 0, 14 * beamWidthMult, beamHeight, 0xfff6c8, 1)
      .setOrigin(0.5, 0)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(ATTACKER_DEPTH)
      .setAlpha(0.1);
    const telegraphGlow = this.add.rectangle(worldX, 0, 60 * beamWidthMult, beamHeight, 0xffd56b, 1)
      .setOrigin(0.5, 0)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(ATTACKER_DEPTH)
      .setAlpha(0.1);

    this.time.delayedCall(telegraphMs, () => {
      telegraph.destroy();
      telegraphCore.destroy();
      telegraphGlow.destroy();
      this.executeHeavensStrike(fighter, worldX, surfaceY, level, { bigSize, wideAoe, sizeMult });
    });
  }

  fireSkullCurse(fighter, pointerWorldX, pointerWorldY, level = 1) {
    this.playSfx('sfx_skull_cast', 1.6);
    if (level >= 2) {
      this.playSfx('sfx_skull_cast_up', 0.9);
      this.fireSkullCurseRain(fighter, pointerWorldX);
      return;
    }
    const body = fighter.sprite.body;
    const startX = body.x + body.width / 2;
    const startY = body.y + body.height / 2;
    const dx = pointerWorldX - startX;
    const dy = (pointerWorldY ?? startY) - startY;
    const angle = Math.atan2(dy, dx);
    const dir = Math.cos(angle) >= 0 ? 1 : -1;
    const vx = Math.cos(angle) * SKULL_CURSE_SPEED;
    const vy = Math.sin(angle) * SKULL_CURSE_SPEED;
    this.spawnSkullProjectile(fighter, startX, startY, vx, vy, false, angle, 1);
  }

  fireSkullCurseRain(fighter) {
    const wave1 = 12;
    const wave2 = 6;
    const spacingMs = 40;
    const initialVy = 140; // slower than the original 320 — gravity does the rest
    const rainId = (this._skullRainCounter = (this._skullRainCounter || 0) + 1);
    for (let i = 0; i < wave1; i++) {
      this.time.delayedCall(i * spacingMs, () => {
        if (!fighter || fighter.isDead) return;
        const startX = Phaser.Math.Between(40, MAP_WIDTH - 40);
        const startY = Phaser.Math.Between(-300, -150);
        const p = this.spawnSkullProjectile(fighter, startX, startY, 0, initialVy, true, Math.PI / 2, 2);
        if (p) p.waveId = `${rainId}-1`;
      });
    }
    const wave2DelayMs = wave1 * spacingMs + 1000;
    for (let i = 0; i < wave2; i++) {
      this.time.delayedCall(wave2DelayMs + i * spacingMs, () => {
        if (!fighter || fighter.isDead) return;
        const startX = Phaser.Math.Between(40, MAP_WIDTH - 40);
        const startY = Phaser.Math.Between(-300, -150);
        const p = this.spawnSkullProjectile(fighter, startX, startY, 0, initialVy, true, Math.PI / 2, 2);
        if (p) p.waveId = `${rainId}-2`;
      });
    }
  }

  spawnSkullProjectile(fighter, startX, startY, vx, vy, allowGravity, angle, level) {
    const dir = Math.cos(angle) >= 0 ? 1 : -1;
    const isL2 = level >= 2;
    const hitboxScale = isL2 ? 1.5 : 1;

    const aura = this.add.image(startX, startY, 'glow_purple_light')
      .setBlendMode(Phaser.BlendModes.ADD)
      .setScale(isL2 ? 1.4 : 1.05)
      .setDepth(ATTACKER_DEPTH - 0.1)
      .setAlpha(0.95);
    const auraPulse = this.tweens.add({
      targets: aura,
      scale: isL2 ? 1.65 : 1.25,
      alpha: 0.7,
      duration: 260,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    const projectile = this.physics.add.sprite(startX, startY, 'skull_curse', 0);
    projectile.setScale(SKULL_CURSE_SCALE * (isL2 ? 1.3 : 1));
    projectile.setDepth(ATTACKER_DEPTH);
    projectile.setFlipX(dir < 0);
    projectile.setRotation(dir < 0 ? angle - Math.PI : angle);
    projectile.body.allowGravity = !!allowGravity;
    projectile.body.setSize(SKULL_CURSE_BODY_W * hitboxScale, SKULL_CURSE_BODY_H * hitboxScale, true);
    projectile.body.setVelocity(vx, vy);
    projectile.setCollideWorldBounds(false);
    projectile.ownerFighter = fighter;
    projectile.hasHit = false;
    projectile.direction = dir;
    projectile.aura = aura;
    projectile.auraPulse = auraPulse;
    projectile.curseLevel = level;
    projectile.play('skull_curse_fly');

    this.skullProjectiles.push(projectile);
    return projectile;
  }

  applySkullCurse(target, level = 1, waveId = null) {
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
    if (level >= 2 && waveId && waveId !== target.curseLastWaveId) {
      target.curseL2Stacks = (target.curseL2Stacks || 0) + 1;
      target.curseLastWaveId = waveId;
    }
    if (this.isAuthoritativeOwner(target)) {
      if (target.curseDotTimer) target.curseDotTimer.remove(false);
      const ticks = 10;
      let tickDamage = level >= 2 ? 5 : SKULL_CURSE_DAMAGE / ticks;
      if ((target.curseL2Stacks || 0) >= 2) tickDamage = 10;
      target.curseDotTimer = this.time.addEvent({
        delay: SKULL_CURSE_DEBUFF_DURATION_MS / ticks,
        repeat: ticks - 1,
        callback: () => {
          if (!target || target.isDead) return;
          this.damageFighter(target, tickDamage, { ignoreShield: true, ignoreCurseMultiplier: true, ignoreFreezeBreak: true, useDeath2: true, cause: 'skull_curse_dot' });
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
    target.curseL2Stacks = 0;
    target.curseLastWaveId = null;
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

  fireIceBeam(fighter, worldX, worldY, opts) {
    const sb = fighter.sprite.body;
    const cx = sb.x + sb.width / 2;
    const cy = sb.y + sb.height / 2;
    if (!this._snowstormActive && this.cache.audio.exists('sfx_ice_cast')) {
      const s = this.sound.add('sfx_ice_cast');
      s.play({ volume: this.masterVolume * this.sfxScale * 0.9 });
      this._iceCastSfxInstances = this._iceCastSfxInstances || [];
      this._iceCastSfxInstances.push(s);
    }
    const beam = {
      caster: fighter,
      beamId: opts?.beamId
        ?? `ice_${fighter.ownerIndex ?? 0}_${this.time.now}_${Math.floor(Math.random() * 1e6)}`,
      startTime: this.time.now,
      activeStartTime: 0,
      state: 'casting',
      aimX: worldX,
      aimY: worldY,
      currentAngle: Math.atan2(worldY - cy, worldX - cx),
      graphics: this.add.graphics().setDepth(ATTACKER_DEPTH + 0.2),
      castGlow: null,
      castSfx: null,
      castFxSprite: null,
      lastTickAt: 0,
      lastParticleAt: 0,
    };
    beam.facing = opts?.facing !== undefined ? opts.facing : (worldX >= cx ? 1 : -1);
    const fxX = sb.x + sb.width / 2 + beam.facing * (sb.width * 0.4);
    const fxY = sb.y + sb.height * 0.55;
    beam.castFxSprite = this.add.sprite(fxX, fxY, 'ice_spell_cast', 2)
      .setScale(3.2)
      .setFlipX(beam.facing < 0)
      .setDepth(fighter.sprite.depth + 0.2);
    beam.castFxSprite.play('ice_spell_cast');

    fighter.isCastingIceBeam = true;
    this.iceBeams = this.iceBeams || [];
    this.iceBeams.push(beam);
    return beam;
  }

  drawIceBeam(beam, cx, cy, endX, endY, intensity) {
    const g = beam.graphics;
    g.clear();
    const thickness = ICE_BEAM_THICKNESS * intensity;
    const dx = endX - cx;
    const dy = endY - cy;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = len > 0 ? dx / len : 1;
    const uy = len > 0 ? dy / len : 0;
    const px = -uy;
    const py = ux;

    g.lineStyle(thickness + 14, 0x38bdf8, 0.3);
    g.lineBetween(cx, cy, endX, endY);
    g.lineStyle(thickness + 6, 0x7dd3fc, 0.6);
    g.lineBetween(cx, cy, endX, endY);
    g.lineStyle(thickness, 0xe0f2fe, 0.9);
    g.lineBetween(cx, cy, endX, endY);
    g.lineStyle(Math.max(2, thickness * 0.35), 0xffffff, 1);
    g.lineBetween(cx, cy, endX, endY);

    const now = this.time.now;
    const flowOffset = (now / 220) % 1;
    const shards = 10;
    for (let i = 0; i < shards; i++) {
      const t = ((i / shards) + flowOffset) % 1;
      const baseX = cx + ux * len * t;
      const baseY = cy + uy * len * t;
      const sway = Math.sin((i + now / 90) * 1.7) * (thickness + 4);
      const sx = baseX + px * sway;
      const sy = baseY + py * sway;
      const wobble = 0.6 + 0.4 * Math.sin((i + now / 110) * 2.1);
      g.fillStyle(0xffffff, 0.95);
      g.fillCircle(sx, sy, 2.2 * wobble);
      g.fillStyle(0xbae6fd, 0.6);
      g.fillCircle(sx, sy, 4.5 * wobble);
    }
    const sparkleCount = 5;
    for (let i = 0; i < sparkleCount; i++) {
      const t = Math.random();
      const baseX = cx + ux * len * t;
      const baseY = cy + uy * len * t;
      const offs = (Math.random() - 0.5) * (thickness + 10);
      const sx = baseX + px * offs;
      const sy = baseY + py * offs;
      const r = 1.2 + Math.random() * 2.2;
      g.fillStyle(0xffffff, 0.95);
      g.fillCircle(sx, sy, r);
    }
    if (this.hitboxesVisible) {
      g.lineStyle(ICE_BEAM_HIT_RADIUS * 2, 0xff3344, 0.22);
      g.lineBetween(cx, cy, endX, endY);
      g.lineStyle(1, 0xff3344, 0.9);
      g.lineBetween(cx, cy, endX, endY);
    }
  }

  spawnIceBeamParticle(_beam, _x, _y) {}

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
          iceCasterIndex: caster?.ownerIndex,
          playHitSfx: false,
          powerFlashColor: null,
        });
      }
    }
    if (this.skeletons) {
      const visualH = SKELETON_FRAME_H * SKELETON_SCALE;
      const halfW = 28 * SKELETON_HIT_SCALE;
      for (const fox of this.skeletons) {
        if (!fox || fox.state === 'dying') continue;
        if (fox.caster === caster) continue;
        const fx = fox.x;
        const ftop = fox.y - visualH * 0.95;
        const fhigh = fox.y - visualH * 0.7;
        const fmid = fox.y - visualH * 0.45;
        const flow = fox.y - visualH * 0.2;
        const fbot = fox.y - 4;
        const samples = [
          [fx, ftop],
          [fx, fhigh],
          [fx, fmid],
          [fx, flow],
          [fx, fbot],
          [fx - halfW, fmid],
          [fx + halfW, fmid],
          [fx - halfW, flow],
          [fx + halfW, flow],
        ];
        let hit = false;
        for (const [sx, sy] of samples) {
          if (pointToSegmentDistance(sx, sy, cx, cy, endX, endY) <= ICE_BEAM_HIT_RADIUS) {
            hit = true;
            break;
          }
        }
        if (hit) this.applyIceTickToSkeleton(fox, beam.beamId, caster?.ownerIndex);
      }
    }
  }

  applyIceTickToSkeleton(fox, beamId, casterIndex) {
    const now = this.time.now;
    if (!fox || fox.state === 'dying') return;

    // Snowstorm empowered: ice beam do caster da nevasca causa 15 dmg/tick (throttle 600ms) + freeze instantâneo em pets
    const snowCasterIdx = this._snowstormCaster?.ownerIndex;
    const snowstormEmpowered =
      this._snowstormActive &&
      casterIndex !== undefined &&
      snowCasterIdx !== undefined &&
      casterIndex === snowCasterIdx;
    if (snowstormEmpowered) {
      const SNOW_BEAM_DMG_INTERVAL_MS = 600;
      if (now - (fox.snowBeamLastDmgAt || 0) >= SNOW_BEAM_DMG_INTERVAL_MS) {
        fox.snowBeamLastDmgAt = now;
        this.damageSkeleton(fox, 20, {
          numberColor: '#7dd3fc',
          skipHurtAnim: true,
          ignoreFreezeBreak: true,
          silent: true,
        });
        if (fox.state === 'dying') return;
      }
    }

    if (fox.isFrozen) {
      fox.frozenUntil = now + SKELETON_FREEZE_DURATION_MS;
      fox.iceBeamId = beamId || fox.iceBeamId;
      return;
    }
    if (beamId && fox.iceBeamId !== beamId) {
      fox.iceBeamId = beamId;
      fox.iceTickCount = 0;
    }
    fox.iceTickCount = (fox.iceTickCount || 0) + 1;
    if (snowstormEmpowered) {
      this.applyFreezeSkeleton(fox);
      return;
    }
    this.damageSkeleton(fox, 3, {
      numberColor: '#7dd3fc',
      skipHurtAnim: true,
      ignoreFreezeBreak: true,
      silent: true,
    });
    if (fox.state === 'dying') return;
    if (fox.iceTickCount >= SKELETON_HITS_TO_FREEZE) {
      this.applyFreezeSkeleton(fox);
    }
    if (fox.iceTickCount % 3 === 0) {
      this.spawnIceBeamHitVfx(fox.x, fox.y - 60);
    }
  }

  applyFreezeSkeleton(fox) {
    if (fox.isFrozen || fox.state === 'dying') return;
    fox.isFrozen = true;
    fox.frozenUntil = this.time.now + SKELETON_FREEZE_DURATION_MS;
    if (fox.knockupTween) { fox.knockupTween.stop(); fox.knockupTween = null; }
    fox.knockupOffset = 0;
    fox.sprite.anims.pause();
    fox.sprite.setTint(0x3b82f6);
    if (fox.frozenTintSprite) fox.frozenTintSprite.destroy();
    fox.frozenTintSprite = this.add.sprite(
      fox.sprite.x,
      fox.sprite.y,
      fox.sprite.texture.key,
      fox.sprite.frame.name,
    )
      .setScale(fox.sprite.scaleX, fox.sprite.scaleY)
      .setOrigin(fox.sprite.originX, fox.sprite.originY)
      .setFlipX(fox.sprite.flipX)
      .setTintFill(0x7dd3fc)
      .setAlpha(0.55)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(fox.sprite.depth + 0.05);
    if (fox.frozenOverlay) fox.frozenOverlay.destroy();
    fox.frozenOverlay = this.add.sprite(fox.x, fox.y - 60, 'player_frozen', 0)
      .setDepth(fox.sprite.depth + 0.1)
      .setScale(3.0)
      .setAlpha(0.95);
    fox.frozenOverlay.play('player_frozen');
  }

  applyPoisonToSkeleton(fox) {
    if (!fox || fox.state === 'dying' || fox.hp <= 0) return;
    if (fox.poisonTimer) return;
    if (!fox.curseTintSprite) {
      fox.curseTintSprite = this.add.sprite(
        fox.sprite.x,
        fox.sprite.y,
        fox.sprite.texture.key,
        fox.sprite.frame.name,
      )
        .setScale(fox.sprite.scaleX, fox.sprite.scaleY)
        .setOrigin(fox.sprite.originX, fox.sprite.originY)
        .setFlipX(fox.sprite.flipX)
        .setTintFill(0xa855f7)
        .setAlpha(0.15)
        .setDepth(fox.sprite.depth + 0.05);
      fox.cursePulseTween = this.tweens.add({
        targets: fox.curseTintSprite,
        alpha: 0.75,
        duration: 260,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }
    if (!fox.curseVfxSprite && this.anims.exists('skull_curse_vfx')) {
      fox.curseVfxSprite = this.add.sprite(fox.x, fox.y - 60, 'skull_curse_vfx', 0)
        .setScale(SKULL_CURSE_VFX_SCALE)
        .setDepth(fox.sprite.depth + 0.1)
        .setAlpha(0.9);
      fox.curseVfxSprite.play('skull_curse_vfx');
    }
    if (!fox.curseLoopSound && this.cache.audio.exists('sfx_skeleton_skull_curse')) {
      fox.curseLoopSound = this.sound.add('sfx_skeleton_skull_curse', {
        loop: true,
        volume: this.masterVolume * this.sfxScale * 0.3,
      });
      fox.curseLoopSound.play();
    }
    fox.poisonTimer = this.time.addEvent({
      delay: SKELETON_POISON_TICK_MS,
      loop: true,
      callback: () => {
        if (!fox || fox.state === 'dying' || fox.hp <= 0) {
          if (fox && fox.poisonTimer) { fox.poisonTimer.remove(false); fox.poisonTimer = null; }
          return;
        }
        this.damageSkeleton(fox, SKELETON_POISON_TICK_DAMAGE, {
          numberColor: '#a855f7',
          skipHurtAnim: true,
          ignoreFreezeBreak: true,
          silent: true,
        });
      },
    });
  }

  poisonSkeletonsInRect(attacker, left, right, top, bottom) {
    if (!this.skeletons || this.skeletons.length === 0) return false;
    let any = false;
    const halfW = 22 * SKELETON_HIT_SCALE;
    const bodyH = 96 * SKELETON_HIT_SCALE;
    for (const fox of this.skeletons) {
      if (!fox || fox.state === 'dying') continue;
      if (attacker && fox.caster === attacker) continue;
      if (fox.poisonTimer) { any = true; continue; }
      const sLeft = fox.x - halfW;
      const sRight = fox.x + halfW;
      const sTop = fox.y - bodyH;
      const sBottom = fox.y;
      if (right > sLeft && left < sRight && bottom > sTop && top < sBottom) {
        this.applyPoisonToSkeleton(fox);
        any = true;
      }
    }
    return any;
  }

  removeFreezeSkeleton(fox) {
    if (!fox || !fox.isFrozen) return;
    fox.isFrozen = false;
    fox.frozenUntil = 0;
    fox.iceTickCount = 0;
    fox.sprite.clearTint();
    if (fox.sprite.anims) fox.sprite.anims.resume();
    if (fox.frozenOverlay) { fox.frozenOverlay.destroy(); fox.frozenOverlay = null; }
    if (fox.frozenTintSprite) { fox.frozenTintSprite.destroy(); fox.frozenTintSprite = null; }
    if (!fox.state || fox.state === 'dying') return;
    fox.state = 'patrol';
    fox.target = null;
    if (!this._snowstormActive) this.playSfx('sfx_ice_crash', 0.9);
  }

  spawnIceBeamHitVfx(x, y) {
    const vfx = this.add.sprite(x, y, 'ice_beam_hit', 0)
      .setDepth(ATTACKER_DEPTH + 0.4)
      .setScale(2.2)
      .setBlendMode(Phaser.BlendModes.ADD);
    vfx.play('ice_beam_hit');
    vfx.once('animationcomplete-ice_beam_hit', () => vfx.destroy());
  }

  applyIceTick(target, beamId, casterIndex) {
    const now = this.time.now;
    if (target.isDead) return;
    // Snowstorm empowered ice beam: deal 5 dmg per tick + instant freeze, fired by the snowstorm caster during the storm
    const snowCasterIdx = this._snowstormCaster?.ownerIndex;
    const snowstormEmpowered =
      this._snowstormActive &&
      casterIndex !== undefined &&
      snowCasterIdx !== undefined &&
      casterIndex === snowCasterIdx;
    if (snowstormEmpowered && this.isAuthoritativeOwner(target)) {
      const SNOW_BEAM_DMG_INTERVAL_MS = 600;
      if (now - (target.snowBeamLastDmgAt || 0) >= SNOW_BEAM_DMG_INTERVAL_MS) {
        target.snowBeamLastDmgAt = now;
        this.damageFighter(target, 15, {
          ignoreShield: true,
          ignoreCurseMultiplier: true,
          ignoreFreezeBreak: true,
          cause: 'ice_beam',
          attackerIndex: casterIndex,
        });
        if (target.isDead) return;
      }
    }
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
    if (snowstormEmpowered) {
      this.applyFreeze(target);
      return;
    }
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
    if (!target.isDead && !this._snowstormActive) this.playSfx('sfx_ice_crash', 0.9);
  }

  castSnowstorm(caster) {
    if (this._snowstormActive) return;
    // Latest power wins: cancel any active firestorm
    if (this._firestormVisualActive) this.endFireStorm();
    this._snowstormActive = true;
    this._snowstormCaster = caster;
    this._snowstormStartedAt = this.time.now;

    // Loop the snowstorm ambient SFX (no other ice_beam SFX during L2)
    if (this.cache.audio.exists('sfx_snow_storm')) {
      this._snowstormSound = this.sound.add('sfx_snow_storm', {
        loop: true,
        volume: this.masterVolume * this.sfxScale * 0.72,
      });
      this._snowstormSound.play();
    }
    if (this.cache.audio.exists('sfx_snow_wind')) {
      this._snowstormWind = this.sound.add('sfx_snow_wind', {
        loop: true,
        volume: this.masterVolume * this.sfxScale * 1.5,
      });
      this._snowstormWind.play({ seek: 1.5 });
    }

    // Duck BGM to 50% during the storm
    if (this.bgm) this.bgm.setVolume(this.masterVolume * this.bgmScale * 0.5);

    // Visual: swap bg + tint platforms + swap rain → snow
    if (this.map1Bg) this.map1Bg.setTexture('map1_bg_snow');
    if (this.map1Platforms) this.map1Platforms.setTint(0xaad4ff);
    if (this.rainEmitter) this.rainEmitter.stop();
    if (this.snowEmitter) this.snowEmitter.start();
    const overlay = this.add.rectangle(0, 0, MAP_WIDTH, MAP_HEIGHT, 0x88ccff, 0.18)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(50)
      .setBlendMode(Phaser.BlendModes.ADD);

    // Slow + slippery + visual frost on every other living fighter
    for (const f of this.fighters) {
      if (!f || f === caster || f.isDead) continue;
      this.applyIceSlippery(f, ICE_BEAM_L2_DURATION_MS);
    }

    // Freeze every skeleton until storm ends (uses existing freeze sprite + tint)
    if (this.skeletons) {
      for (const fox of this.skeletons) {
        if (!fox || fox.state === 'dying') continue;
        this.applyFreezeSkeleton(fox);
        fox.frozenUntil = this.time.now + ICE_BEAM_L2_DURATION_MS;
      }
    }

    // Visual freeze overlay on every armed landmine
    const mineOverlays = [];
    if (this.landMines) {
      for (const mine of this.landMines) {
        if (!mine || !mine.active || mine.triggered || !mine.armed) continue;
        const ov = this.add.sprite(mine.x, mine.y, 'player_frozen', 0)
          .setDepth(mine.depth + 0.1)
          .setScale(2.2)
          .setAlpha(0.9)
          .setBlendMode(Phaser.BlendModes.NORMAL);
        ov.play('player_frozen');
        mine.frozenOverlay = ov;
        mineOverlays.push({ mine, overlay: ov });
      }
    }

    this._snowstormOverlay = overlay;
    this._snowstormMineOverlays = mineOverlays;
    this._snowstormEndTimer = this.time.delayedCall(ICE_BEAM_L2_DURATION_MS, () => {
      this.endSnowstorm();
    });
  }

  endSnowstorm(opts) {
    if (!this._snowstormActive) return;
    this._snowstormActive = false;
    this._snowstormCaster = null;
    if (this.isMultiplayer && this.network && !(opts && opts.fromNetwork)) {
      this.network.send({ type: 'snowstorm_end' });
    }
    if (this._snowstormEndTimer) {
      this._snowstormEndTimer.remove(false);
      this._snowstormEndTimer = null;
    }
    if (this.map1Bg) this.map1Bg.setTexture(this._firestormVisualActive ? 'map1_bg_firestorm' : 'map1_bg');
    if (this.map1Platforms) {
      if (this._firestormVisualActive) this.map1Platforms.setTint(0xff8c63);
      else this.map1Platforms.clearTint();
    }
    if (this.snowEmitter) {
      this.snowEmitter.stop();
      if (typeof this.snowEmitter.killAll === 'function') this.snowEmitter.killAll();
    }
    if (this.rainEmitter && !this._firestormVisualActive) this.rainEmitter.start();
    if (this._snowstormOverlay) {
      this._snowstormOverlay.destroy();
      this._snowstormOverlay = null;
    }
    if (this._snowstormSound) {
      if (this._snowstormSound.isPlaying) this._snowstormSound.stop();
      this._snowstormSound.destroy();
      this._snowstormSound = null;
    }
    if (this._snowstormWind) {
      if (this._snowstormWind.isPlaying) this._snowstormWind.stop();
      this._snowstormWind.destroy();
      this._snowstormWind = null;
    }
    if (this.bgm) this.bgm.setVolume(this.masterVolume * this.bgmScale);
    for (const f of this.fighters) {
      if (!f) continue;
      this.removeIceSlippery(f);
    }
    if (this._snowstormMineOverlays) {
      for (const { mine, overlay: ov } of this._snowstormMineOverlays) {
        if (ov && ov.scene) ov.destroy();
        if (mine) mine.frozenOverlay = null;
      }
      this._snowstormMineOverlays = null;
    }
    if (this.skeletons) {
      for (const fox of this.skeletons) {
        if (fox && fox.isFrozen) fox.frozenUntil = Math.min(fox.frozenUntil, this.time.now);
      }
    }
  }

  applyIceSlippery(target, durationMs) {
    if (!target || target.isDead) return;
    const now = this.time.now;
    target.iceSlippery = true;
    target.iceSlipperyUntil = now + durationMs;
    target.iceSlowActive = true;
    target.iceSlowUntil = now + durationMs;
    target.iceSlowFactor = ICE_BEAM_L2_SLIPPERY_FACTOR;
    target.iceJumpFactor = ICE_BEAM_L2_JUMP_FACTOR;
    if (!target.frostTintSprite) {
      target.frostTintSprite = this.add.sprite(
        target.sprite.x,
        target.sprite.y,
        target.sprite.texture.key,
        target.sprite.frame.name,
      )
        .setScale(target.sprite.scaleX, target.sprite.scaleY)
        .setFlipX(target.sprite.flipX)
        .setTintFill(0x7dd3fc)
        .setAlpha(0.35)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(target.sprite.depth + 0.05);
    }
  }

  setSlipperyVel(body, target, fighter) {
    if (fighter && fighter.iceSlippery) {
      const cur = body.velocity.x;
      body.setVelocityX(Phaser.Math.Linear(cur, target, 0.05));
    } else {
      body.setVelocityX(target);
    }
  }

  removeIceSlippery(target) {
    if (!target) return;
    if (!target.iceSlippery) return;
    target.iceSlippery = false;
    target.iceSlipperyUntil = 0;
    target.iceSlowActive = false;
    target.iceSlowFactor = 0;
    target.iceJumpFactor = 1;
    if (target.frostTintSprite) {
      target.frostTintSprite.destroy();
      target.frostTintSprite = null;
    }
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
      const cx = cb.x + cb.width / 2 + b.facing * (cb.width * 0.4);
      const cy = cb.y + cb.height * 0.55;
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
        if (this.isMultiplayer && this.network && (!b.lastAimSentAt || time - b.lastAimSentAt > 80)) {
          b.lastAimSentAt = time;
          this.network.send({
            type: 'ice_beam_aim',
            beamId: b.beamId,
            aimX: b.aimX,
            aimY: b.aimY,
          });
        }
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

  iceActivityActive() {
    if (this.iceBeams && this.iceBeams.length > 0) return true;
    for (const f of this.fighters) {
      if (f.isFrozen || f.iceSlowActive) return true;
    }
    return false;
  }

  updateIceAmbientStop() {
    if (this._iceAmbientStopped === undefined) this._iceAmbientStopped = true;
    if (this.iceActivityActive()) {
      this._iceAmbientStopped = false;
      return;
    }
    if (this._iceAmbientStopped) return;
    this._iceAmbientStopped = true;
    const list = this._iceCastSfxInstances;
    if (list && list.length) {
      for (const snd of list) {
        if (snd && snd.isPlaying) snd.stop();
      }
      this._iceCastSfxInstances = [];
    }
  }

  cleanupIceBeam(b) {
    if (b.graphics) b.graphics.destroy();
    if (b.castGlow) b.castGlow.destroy();
    if (b.castFxSprite) b.castFxSprite.destroy();
    if (b.castSfx) {
      if (b.castSfx.isPlaying) b.castSfx.stop();
    }
    if (b.caster) b.caster.isCastingIceBeam = false;
  }

  throwSkeletonBall(caster, targetX, targetY) {
    if (!caster || caster.isDead) return null;
    const cb = caster.sprite.body;
    const startX = cb.x + cb.width / 2;
    const startY = cb.y + cb.height / 2;
    const dx = targetX - startX;
    const dir = dx >= 0 ? 1 : -1;
    caster.skeletonSpawnCounter = (caster.skeletonSpawnCounter || 0) + 1;
    const ballNetId = `${caster.ownerIndex}-${caster.skeletonSpawnCounter}`;
    const ball = this.physics.add.sprite(startX, startY, 'skeleton_ball', 0);
    ball.setScale(1.0).setDepth(ATTACKER_DEPTH);
    ball.body.setAllowGravity(true);
    ball.body.setBounce(1, 0);
    ball.body.setCollideWorldBounds(true);
    ball.body.onWorldBounds = true;
    ball.body.setVelocity(SKELETON_BALL_SPEED * dir, SKELETON_BALL_VY);
    ball.play('skeleton_ball');
    ball.ownerCaster = caster;
    ball.netId = ballNetId;
    ball.spawned = false;

    const onPlatformContact = (b, platformZone) => {
      if (b.spawned) return;
      if (!b.body.touching.down) return;
      b.spawned = true;
      const px = b.x;
      const py = platformZone.body.y;
      this.fireSkeleton(caster, px, py, b.netId);
      if (b.platformCollider) this.physics.world.removeCollider(b.platformCollider);
      b.destroy();
    };
    ball.platformCollider = this.physics.add.collider(
      ball,
      this.platformZones,
      onPlatformContact
    );

    this.time.delayedCall(SKELETON_BALL_LIFETIME_MS, () => {
      if (ball && ball.scene && !ball.spawned) {
        if (ball.platformCollider) this.physics.world.removeCollider(ball.platformCollider);
        ball.destroy();
      }
    });

    return ball;
  }

  spawnSkeletonAppearVfx(x, y) {
    const flash = this.add.circle(x, y - 30, 18, 0xfde68a, 0.85)
      .setDepth(DEFAULT_SPRITE_DEPTH + 0.4)
      .setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({
      targets: flash,
      scale: 4,
      alpha: 0,
      duration: 480,
      ease: 'Cubic.easeOut',
      onComplete: () => flash.destroy(),
    });
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      const dist = 6 + Math.random() * 8;
      const px = x + Math.cos(angle) * dist;
      const py = y - 20 + Math.sin(angle) * dist * 0.4;
      const puff = this.add.circle(px, py, 5 + Math.random() * 3, 0xe5e7eb, 0.85)
        .setDepth(DEFAULT_SPRITE_DEPTH + 0.3)
        .setBlendMode(Phaser.BlendModes.ADD);
      this.tweens.add({
        targets: puff,
        x: px + Math.cos(angle) * 36,
        y: py + Math.sin(angle) * 22 - 14,
        scale: 0.2,
        alpha: 0,
        duration: 520,
        ease: 'Cubic.easeOut',
        onComplete: () => puff.destroy(),
      });
    }
  }

  fireSkeleton(caster, spawnX, spawnY, externalNetId) {
    const cb = caster.sprite.body;
    const useGiven = typeof spawnX === 'number' && typeof spawnY === 'number';
    const cx = useGiven ? spawnX : cb.x + cb.width / 2;
    const probeY = useGiven ? spawnY : cb.y + cb.height;

    let platform = null;
    for (const r of PLATFORM_RECTS) {
      if (cx < r.x || cx > r.x + r.w) continue;
      if (useGiven) {
        if (Math.abs(r.y - probeY) > 4) continue;
        platform = r;
        break;
      } else {
        if (r.y < probeY - 8) continue;
        if (!platform || r.y < platform.y) platform = r;
      }
    }
    if (!platform) return null;

    const platformY = platform.y;
    this.spawnSkeletonAppearVfx(cx, platformY);
    this.playSfx('sfx_skeleton_spawn', 2.0);
    const sprite = this.add.sprite(cx, platformY, 'skeleton_idle', 0)
      .setScale(SKELETON_SCALE * 0.4)
      .setAlpha(0)
      .setOrigin(0.5, 0.92)
      .setDepth(DEFAULT_SPRITE_DEPTH - 0.2);
    sprite.play('skeleton_idle');
    this.tweens.add({
      targets: sprite,
      scaleX: SKELETON_SCALE,
      scaleY: SKELETON_SCALE,
      alpha: 1,
      duration: 320,
      ease: 'Back.easeOut',
    });

    const barOffsetY = 130;
    const hpBarBg = this.add.rectangle(cx, platformY - barOffsetY, SKELETON_HP_BAR_WIDTH, SKELETON_HP_BAR_HEIGHT, 0x000000, 0.7)
      .setStrokeStyle(1, 0x0f172a)
      .setDepth(DEFAULT_SPRITE_DEPTH + 0.5);
    const fillLeftX = cx - (SKELETON_HP_BAR_WIDTH - 2) / 2;
    const hpBarFill = this.add.rectangle(fillLeftX, platformY - barOffsetY, SKELETON_HP_BAR_WIDTH - 2, SKELETON_HP_BAR_HEIGHT - 2, caster.char.tintColor)
      .setOrigin(0, 0.5)
      .setDepth(DEFAULT_SPRITE_DEPTH + 0.6);

    let netId = externalNetId;
    if (!netId) {
      caster.skeletonSpawnCounter = (caster.skeletonSpawnCounter || 0) + 1;
      netId = `${caster.ownerIndex}-${caster.skeletonSpawnCounter}`;
    }
    const fox = {
      sprite,
      caster,
      netId,
      isSkeletonPet: true,
      petType: 'skeleton',
      x: cx,
      y: platformY,
      platformLeft: platform.x + 16,
      platformRight: platform.x + platform.w - 16,
      state: 'patrol',
      currentAnim: 'skeleton_idle',
      target: null,
      hp: SKELETON_MAX_HP,
      maxHp: SKELETON_MAX_HP,
      nextBiteAt: 0,
      attackHitAt: 0,
      attackDoneAt: 0,
      attackDamageDealt: false,
      attackVariant: 0,
      hurtDoneAt: 0,
      facing: caster.sprite.flipX ? -1 : 1,
      hpBarBg,
      hpBarFill,
    };
    caster.skeletons = caster.skeletons || [];
    caster.skeletons.push(fox);
    this.skeletons = this.skeletons || [];
    this.skeletons.push(fox);
    return fox;
  }

  fireOmar(caster, spawnX, spawnY, externalNetId) {
    let platform = null;
    for (const r of PLATFORM_RECTS) {
      if (spawnX < r.x || spawnX > r.x + r.w) continue;
      if (Math.abs(r.y - spawnY) > 4) continue;
      platform = r;
      break;
    }
    if (!platform) return null;
    const cx = spawnX;
    const platformY = platform.y;
    this.spawnSkeletonAppearVfx(cx, platformY);
    this.playSfx('sfx_skeleton_spawn', 1.6);
    const sprite = this.add.sprite(cx, platformY, 'omar_sheet', 0)
      .setScale(OMAR_SCALE * 0.4)
      .setAlpha(0)
      .setOrigin(0.5, 0.78)
      .setDepth(DEFAULT_SPRITE_DEPTH - 0.2);
    sprite.play('omar_idle');
    this.tweens.add({ targets: sprite, scaleX: OMAR_SCALE, scaleY: OMAR_SCALE, alpha: 1, duration: 320, ease: 'Back.easeOut' });
    const barOffsetY = 100;
    const hpBarBg = this.add.rectangle(cx, platformY - barOffsetY, SKELETON_HP_BAR_WIDTH, SKELETON_HP_BAR_HEIGHT, 0x000000, 0.7)
      .setStrokeStyle(1, 0x0f172a).setDepth(DEFAULT_SPRITE_DEPTH + 0.5);
    const hpBarFill = this.add.rectangle(
      cx - (SKELETON_HP_BAR_WIDTH - 2) / 2, platformY - barOffsetY,
      SKELETON_HP_BAR_WIDTH - 2, SKELETON_HP_BAR_HEIGHT - 2, caster.char.tintColor
    ).setOrigin(0, 0.5).setDepth(DEFAULT_SPRITE_DEPTH + 0.6);
    let netId = externalNetId;
    if (!netId) {
      caster.skeletonSpawnCounter = (caster.skeletonSpawnCounter || 0) + 1;
      netId = `${caster.ownerIndex}-${caster.skeletonSpawnCounter}`;
    }
    const fox = {
      sprite, caster, netId,
      isSkeletonPet: true,
      petType: 'omar',
      hpBarOffsetY: barOffsetY,
      x: cx, y: platformY,
      platformLeft: platform.x + 16,
      platformRight: platform.x + platform.w - 16,
      state: 'patrol',
      currentAnim: 'omar_idle',
      target: null,
      hp: OMAR_MAX_HP,
      maxHp: OMAR_MAX_HP,
      nextBiteAt: 0,
      attackHitAt: 0,
      attackDoneAt: 0,
      attackDamageDealt: false,
      hurtDoneAt: 0,
      facing: caster.sprite.flipX ? -1 : 1,
      hpBarBg, hpBarFill,
    };
    caster.skeletons = caster.skeletons || [];
    caster.skeletons.push(fox);
    this.skeletons = this.skeletons || [];
    this.skeletons.push(fox);
    return fox;
  }

  fireArcher(caster, spawnX, spawnY, externalNetId) {
    let platform = null;
    for (const r of PLATFORM_RECTS) {
      if (spawnX < r.x || spawnX > r.x + r.w) continue;
      if (Math.abs(r.y - spawnY) > 4) continue;
      platform = r;
      break;
    }
    if (!platform) return null;
    const cx = spawnX;
    const platformY = platform.y;
    this.spawnSkeletonAppearVfx(cx, platformY);
    this.playSfx('sfx_skeleton_spawn', 1.6);
    const sprite = this.add.sprite(cx, platformY, 'archer_sheet', 0)
      .setScale(ARCHER_SCALE * 0.4)
      .setAlpha(0)
      .setOrigin(0.5, 0.7)
      .setDepth(DEFAULT_SPRITE_DEPTH - 0.2);
    sprite.play('archer_idle');
    this.tweens.add({ targets: sprite, scaleX: ARCHER_SCALE, scaleY: ARCHER_SCALE, alpha: 1, duration: 320, ease: 'Back.easeOut' });
    const barOffsetY = 100;
    const hpBarBg = this.add.rectangle(cx, platformY - barOffsetY, SKELETON_HP_BAR_WIDTH, SKELETON_HP_BAR_HEIGHT, 0x000000, 0.7)
      .setStrokeStyle(1, 0x0f172a).setDepth(DEFAULT_SPRITE_DEPTH + 0.5);
    const hpBarFill = this.add.rectangle(
      cx - (SKELETON_HP_BAR_WIDTH - 2) / 2, platformY - barOffsetY,
      SKELETON_HP_BAR_WIDTH - 2, SKELETON_HP_BAR_HEIGHT - 2, caster.char.tintColor
    ).setOrigin(0, 0.5).setDepth(DEFAULT_SPRITE_DEPTH + 0.6);
    let netId = externalNetId;
    if (!netId) {
      caster.skeletonSpawnCounter = (caster.skeletonSpawnCounter || 0) + 1;
      netId = `${caster.ownerIndex}-${caster.skeletonSpawnCounter}`;
    }
    const fox = {
      sprite, caster, netId,
      isSkeletonPet: true,
      petType: 'archer',
      hpBarOffsetY: barOffsetY,
      x: cx, y: platformY,
      platformLeft: platform.x + 16,
      platformRight: platform.x + platform.w - 16,
      state: 'patrol',
      currentAnim: 'archer_idle',
      target: null,
      hp: ARCHER_MAX_HP,
      maxHp: ARCHER_MAX_HP,
      nextBiteAt: 0,
      attackHitAt: 0,
      attackDoneAt: 0,
      attackDamageDealt: false,
      hurtDoneAt: 0,
      facing: caster.sprite.flipX ? -1 : 1,
      hpBarBg, hpBarFill,
    };
    caster.skeletons = caster.skeletons || [];
    caster.skeletons.push(fox);
    this.skeletons = this.skeletons || [];
    this.skeletons.push(fox);
    return fox;
  }

  fireSkeletonTrio(caster, sentPlatformOrder = null, sentNetIds = null, sentTypes = null) {
    // L2 trio always spawns on the 3 main platforms (indices 3, 4, 5):
    //   3 = middle-right (y=481), 4 = bottom-left (y=721), 5 = bottom-right (y=925)
    // Random which entity (skeleton/omar/archer) lands on which platform.
    let order;
    if (sentPlatformOrder) {
      order = sentPlatformOrder;
    } else {
      order = [3, 4, 5];
      Phaser.Utils.Array.Shuffle(order);
    }
    let types;
    if (sentTypes) {
      types = sentTypes;
    } else {
      types = ['skeleton', 'omar', 'archer'];
      Phaser.Utils.Array.Shuffle(types);
    }
    const netIds = sentNetIds || [];
    if (!sentNetIds) {
      for (let i = 0; i < 3; i++) {
        caster.skeletonSpawnCounter = (caster.skeletonSpawnCounter || 0) + 1;
        netIds.push(`${caster.ownerIndex}-${caster.skeletonSpawnCounter}`);
      }
    }
    for (let i = 0; i < 3; i++) {
      const platIdx = order[i];
      if (platIdx === undefined || !PLATFORM_RECTS[platIdx]) continue;
      const r = PLATFORM_RECTS[platIdx];
      const targetX = r.x + r.w / 2;
      const targetY = r.y;
      const type = types[i];
      const netId = netIds[i];
      this.time.delayedCall(i * 200, () => {
        if (!caster || caster.isDead) return;
        this.dropTrioBall(caster, type, targetX, targetY, netId);
      });
    }
    return { order, netIds, types };
  }

  dropTrioBall(caster, type, targetX, targetY, netId) {
    // L2 spawn: materialize from the ground with a green VFX (no falling ball — the
    // straight-down drop hits whatever platform is highest at the column, not the
    // intended platform). Spawn directly at the target platform.
    this.spawnGreenMaterializeVfx(targetX, targetY);
    if (type === 'skeleton') this.fireSkeleton(caster, targetX, targetY, netId);
    else if (type === 'omar') this.fireOmar(caster, targetX, targetY, netId);
    else if (type === 'archer') this.fireArcher(caster, targetX, targetY, netId);
  }

  spawnGreenMaterializeVfx(x, y) {
    // Bright green flash + ground ring + rising particles
    const flash = this.add.circle(x, y - 50, 28, 0x4ade80, 0.85)
      .setDepth(DEFAULT_SPRITE_DEPTH + 0.4)
      .setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({
      targets: flash,
      scale: 4.5,
      alpha: 0,
      duration: 640,
      ease: 'Cubic.easeOut',
      onComplete: () => flash.destroy(),
    });
    // Expanding ground ring
    const ring = this.add.ellipse(x, y, 50, 18, 0x16a34a, 0)
      .setStrokeStyle(3, 0x4ade80, 1)
      .setDepth(DEFAULT_SPRITE_DEPTH + 0.3)
      .setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({
      targets: ring,
      scaleX: 4.5,
      scaleY: 4.5,
      alpha: 0,
      duration: 700,
      ease: 'Quad.easeOut',
      onComplete: () => ring.destroy(),
    });
    // Rising particles
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 6 + Math.random() * 24;
      const px = x + Math.cos(angle) * dist;
      const py = y + Math.sin(angle) * 6;
      const puff = this.add.circle(px, py, 3 + Math.random() * 4, 0x86efac, 0.95)
        .setDepth(DEFAULT_SPRITE_DEPTH + 0.35)
        .setBlendMode(Phaser.BlendModes.ADD);
      this.tweens.add({
        targets: puff,
        y: py - 80 - Math.random() * 60,
        x: px + (Math.random() - 0.5) * 30,
        scale: 0.1,
        alpha: 0,
        duration: 520 + Math.random() * 200,
        ease: 'Cubic.easeOut',
        onComplete: () => puff.destroy(),
      });
    }
    this.playSfx('sfx_skeleton_spawn', 1.4);
  }

  spawnArcherArrow(fox, targetX, targetY) {
    fox.arrowCount = (fox.arrowCount || 0) + 1;
    const isPiercing = fox.arrowCount % 3 === 0;
    const startX = fox.x;
    const startY = fox.y - 60;
    const dx = targetX - startX;
    const dy = targetY - startY;
    const dist = Math.max(Math.hypot(dx, dy), 1);
    const vx = (dx / dist) * ARCHER_ARROW_SPEED;
    const vy = (dy / dist) * ARCHER_ARROW_SPEED;
    const angle = Math.atan2(dy, dx);
    const arrow = this.physics.add.image(startX, startY, 'archer_arrow');
    arrow.setDepth(ATTACKER_DEPTH);
    if (isPiercing) {
      arrow.setScale(4.5);
      arrow.setTint(0xc084fc);
      arrow.body.setSize(40, 5);
      arrow.body.setOffset(0, 0);
    } else {
      arrow.setScale(2);
    }
    arrow.body.setAllowGravity(false);
    arrow.body.setVelocity(vx, vy);
    arrow.setRotation(angle);
    arrow.ownerCaster = fox.caster;
    arrow.ownerFox = fox;
    arrow.spawnedAt = this.time.now;
    arrow.hasHit = false;
    arrow.isPiercing = isPiercing;
    arrow.pierceHitSet = isPiercing ? new Set() : null;
    if (isPiercing) {
      // Purple glow halo behind the arrow
      const glow = this.add.image(startX, startY, 'glow_purple_light')
        .setBlendMode(Phaser.BlendModes.ADD)
        .setScale(0.7)
        .setAlpha(0.85)
        .setDepth(ATTACKER_DEPTH - 0.1);
      arrow.glow = glow;
      arrow.glowPulse = this.tweens.add({
        targets: glow,
        scale: 0.95,
        alpha: 0.55,
        duration: 180,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }
    this.archerArrows = this.archerArrows || [];
    this.archerArrows.push(arrow);
  }

  updateArcherArrows(time) {
    if (!this.archerArrows || this.archerArrows.length === 0) return;
    for (let i = this.archerArrows.length - 1; i >= 0; i--) {
      const a = this.archerArrows[i];
      if (!a.active) { this.archerArrows.splice(i, 1); continue; }
      const offMap = a.x < -60 || a.x > MAP_WIDTH + 60 || a.y < -60 || a.y > MAP_HEIGHT + 60;
      const expired = time - a.spawnedAt > ARCHER_ARROW_LIFETIME_MS;
      if (offMap || expired) {
        if (a.glowPulse) a.glowPulse.stop();
        if (a.glow) a.glow.destroy();
        a.destroy();
        this.archerArrows.splice(i, 1);
        continue;
      }
      // Glow follows piercing arrows
      if (a.glow) a.glow.setPosition(a.x, a.y);
      // Trail (more intense for piercing)
      const trailInterval = a.isPiercing ? 18 : 25;
      if (time - (a.lastTrailAt || 0) > trailInterval) {
        a.lastTrailAt = time;
        const ghost = this.add.image(a.x, a.y, 'archer_arrow')
          .setRotation(a.rotation)
          .setScale(a.scaleX, a.scaleY)
          .setTintFill(a.isPiercing ? 0xc084fc : 0xffffff)
          .setAlpha(a.isPiercing ? 0.75 : 0.55)
          .setDepth(a.depth - 0.1)
          .setBlendMode(Phaser.BlendModes.ADD);
        this.tweens.add({
          targets: ghost,
          alpha: 0,
          scaleX: ghost.scaleX * (a.isPiercing ? 0.4 : 0.5),
          scaleY: ghost.scaleY * (a.isPiercing ? 0.4 : 0.5),
          duration: a.isPiercing ? 360 : 220,
          ease: 'Quad.easeOut',
          onComplete: () => ghost.destroy(),
        });
      }
      if (!a.isPiercing && a.hasHit) continue;
      if (!this.isAuthoritativeOwner(a.ownerCaster)) continue;
      const ab = a.body;
      const aLeft = ab.x;
      const aRight = ab.x + ab.width;
      const aTop = ab.y;
      const aBottom = ab.y + ab.height;
      for (const target of this.fighters) {
        if (target === a.ownerCaster) continue;
        if (target.isDead || target.isInvulnerable) continue;
        if (a.isPiercing && a.pierceHitSet.has(target)) continue;
        const tb = target.sprite.body;
        const hit =
          aRight > tb.x && aLeft < tb.x + tb.width &&
          aBottom > tb.y && aTop < tb.y + tb.height;
        if (hit) {
          if (a.isPiercing) {
            a.pierceHitSet.add(target);
            this.dealHit(target, {
              damage: 50,
              ignoreShield: false,
              playHitSfx: true,
              powerFlashColor: 0xc084fc,
              attackerIndex: a.ownerCaster.ownerIndex,
              useDeath2: true,
              cause: 'archer_arrow_pierce',
            });
            // continues flying, don't break
          } else {
            a.hasHit = true;
            this.dealHit(target, {
              damage: ARCHER_ARROW_DAMAGE,
              ignoreShield: false,
              playHitSfx: true,
              powerFlashColor: POWERS.skeleton_attack.orbColor,
              attackerIndex: a.ownerCaster.ownerIndex,
              useDeath2: true,
              cause: 'archer_arrow',
            });
            if (a.glowPulse) a.glowPulse.stop();
            if (a.glow) a.glow.destroy();
            a.destroy();
            this.archerArrows.splice(i, 1);
            break;
          }
        }
      }
    }
  }

  skeletonPlayAnim(fox, key) {
    if (fox.currentAnim === key) return;
    fox.currentAnim = key;
    fox.sprite.play(key, true);
  }

  positionSkeletonHpBar(fox) {
    const barY = fox.y - 130 + (fox.knockupOffset || 0);
    fox.hpBarBg.setPosition(fox.x, barY);
    const pct = Math.max(0, Math.min(1, fox.hp / fox.maxHp));
    const innerW = SKELETON_HP_BAR_WIDTH - 2;
    const fillW = pct <= 0 ? 0 : Math.max(1, Math.round(innerW * pct));
    fox.hpBarFill.setPosition(fox.x - innerW / 2, barY);
    fox.hpBarFill.setDisplaySize(fillW, SKELETON_HP_BAR_HEIGHT - 2);
    fox.hpBarFill.setVisible(fillW > 0);
  }

  startSkeletonDeath(fox, opts) {
    if (fox.state === 'dying') return;
    fox.state = 'dying';
    fox.target = null;
    if (this.isMultiplayer && this.network && !(opts && opts.fromNetwork) && fox.netId) {
      this.network.send({ type: 'skeleton_killed', netId: fox.netId });
    }
    if (fox.frozenOverlay) { fox.frozenOverlay.destroy(); fox.frozenOverlay = null; }
    if (fox.frozenTintSprite) { fox.frozenTintSprite.destroy(); fox.frozenTintSprite = null; }
    fox.isFrozen = false;
    if (fox.poisonTimer) { fox.poisonTimer.remove(false); fox.poisonTimer = null; }
    fox.sprite.anims.stop();
    fox.sprite.clearTint();
    const dieAnim =
      fox.petType === 'omar' ? 'omar_die'
      : fox.petType === 'archer' ? 'archer_die'
      : 'skeleton_die';
    fox.sprite.play(dieAnim, true);
    fox.currentAnim = 'skeleton_die';
    this.playSfx('sfx_skeleton_death', 0.9);
    if (fox.cursePulseTween) { fox.cursePulseTween.stop(); fox.cursePulseTween = null; }
    if (fox.curseTintSprite) { fox.curseTintSprite.destroy(); fox.curseTintSprite = null; }
    if (fox.curseVfxSprite) { fox.curseVfxSprite.destroy(); fox.curseVfxSprite = null; }
    if (fox.curseLoopSound) {
      if (fox.curseLoopSound.isPlaying) fox.curseLoopSound.stop();
      fox.curseLoopSound.destroy();
      fox.curseLoopSound = null;
    }
    if (fox.hpBarBg) fox.hpBarBg.setVisible(false);
    if (fox.hpBarFill) fox.hpBarFill.setVisible(false);
    fox.sprite.once(`animationcomplete-${dieAnim}`, () => {
      this.despawnSkeletonInstance(fox);
    });
  }

  damageSkeleton(fox, amount, opts) {
    if (!fox || fox.state === 'dying' || fox.hp <= 0) return;
    const dealt = Math.max(0, amount);
    fox.hp -= dealt;
    fox.totalDamageTaken = (fox.totalDamageTaken || 0) + dealt;
    this.positionSkeletonHpBar(fox);
    if (dealt > 0) {
      const numColor = (opts && opts.numberColor) || '#fde047';
      this.spawnDamageNumber(fox.x, fox.y - 110, dealt, numColor);
      if (!opts || !opts.silent) this.playSfx('sfx_skeleton_hit', 0.8);
      // Red hit-flash for omar and archer (visual feedback on damage)
      if (fox.petType === 'omar' || fox.petType === 'archer') {
        const flash = this.add.sprite(
          fox.sprite.x,
          fox.sprite.y,
          fox.sprite.texture.key,
          fox.sprite.frame.name,
        )
          .setScale(fox.sprite.scaleX, fox.sprite.scaleY)
          .setOrigin(fox.sprite.originX, fox.sprite.originY)
          .setFlipX(fox.sprite.flipX)
          .setTintFill(0xff3030)
          .setAlpha(0.85)
          .setBlendMode(Phaser.BlendModes.ADD)
          .setDepth(fox.sprite.depth + 0.05);
        this.tweens.add({
          targets: flash,
          alpha: 0,
          duration: 200,
          onComplete: () => flash.destroy(),
        });
      }
    }
    if (fox.isFrozen && (!opts || !opts.ignoreFreezeBreak)) {
      this.removeFreezeSkeleton(fox);
    }
    if (fox.hp <= 0) {
      this.startSkeletonDeath(fox);
      return;
    }
    if (opts && opts.skipHurtAnim) return;
    fox.state = 'hurt';
    fox.target = null;
    const hurtAnim =
      fox.petType === 'omar' ? 'omar_hurt'
      : fox.petType === 'archer' ? 'archer_hurt'
      : 'skeleton_hurt';
    fox.hurtDoneAt = this.time.now + Math.round((SKELETON_HURT_FRAMES / SKELETON_HURT_FPS) * 1000);
    fox.sprite.play(hurtAnim, true);
    fox.currentAnim = hurtAnim;
  }

  applyWheelToSkeleton(wheel, fox) {
    if (!fox || fox.state === 'dying') return;
    if (wheel.skeletonHitSet && wheel.skeletonHitSet.has(fox)) return;
    if (wheel.ownerFighter && fox.caster === wheel.ownerFighter) return;
    if (wheel.skeletonHitSet) wheel.skeletonHitSet.add(fox);
    const dmg = Math.round(WHEEL_DAMAGE * SKELETON_POWER_CRIT_MULT);
    this.damageSkeleton(fox, dmg, { numberColor: '#ffffff', skipHurtAnim: true });
    if (fox.state === 'dying') return;
    fox.state = 'stunned';
    fox.target = null;
    fox.stunUntil = this.time.now + SKELETON_STUN_MS;
    const hurtAnim =
      fox.petType === 'omar' ? 'omar_hurt'
      : fox.petType === 'archer' ? 'archer_hurt'
      : 'skeleton_hurt';
    fox.sprite.play(hurtAnim, true);
    fox.currentAnim = hurtAnim;
    if (fox.knockupTween) fox.knockupTween.stop();
    fox.knockupOffset = 0;
    fox.knockupTween = this.tweens.add({
      targets: fox,
      knockupOffset: -SKELETON_KNOCKUP_HEIGHT,
      duration: SKELETON_KNOCKUP_DURATION_MS / 2,
      yoyo: true,
      ease: 'Quad.easeOut',
      onComplete: () => { fox.knockupOffset = 0; fox.knockupTween = null; },
    });
  }

  applyWheelToSkeletons(wheel, left, right, top, bottom) {
    if (!this.skeletons) return;
    const halfW = 22 * SKELETON_HIT_SCALE;
    const bodyH = 110 * SKELETON_HIT_SCALE;
    for (const fox of this.skeletons) {
      if (!fox || fox.state === 'dying') continue;
      const sLeft = fox.x - halfW;
      const sRight = fox.x + halfW;
      const sTop = fox.y - bodyH;
      const sBottom = fox.y;
      if (right > sLeft && left < sRight && bottom > sTop && top < sBottom) {
        this.applyWheelToSkeleton(wheel, fox);
      }
    }
  }

  damageSkeletonsInRect(attacker, left, right, top, bottom, amount, hitSet, opts) {
    if (!this.skeletons || this.skeletons.length === 0) return false;
    let anyHit = false;
    const halfW = 22 * SKELETON_HIT_SCALE;
    const bodyH = 96 * SKELETON_HIT_SCALE;
    for (const fox of this.skeletons) {
      if (!fox || fox.state === 'dying') continue;
      if (attacker && fox.caster === attacker) continue;
      if (hitSet && hitSet.has(fox)) continue;
      const sLeft = fox.x - halfW;
      const sRight = fox.x + halfW;
      const sTop = fox.y - bodyH;
      const sBottom = fox.y;
      if (right > sLeft && left < sRight && bottom > sTop && top < sBottom) {
        if (hitSet) hitSet.add(fox);
        const finalAmount = (opts && opts.frozenAmount && fox.isFrozen)
          ? opts.frozenAmount
          : amount;
        this.damageSkeleton(fox, finalAmount, opts);
        anyHit = true;
      }
    }
    return anyHit;
  }

  despawnSkeletonInstance(fox) {
    if (!fox) return;
    if (fox.frozenOverlay) { fox.frozenOverlay.destroy(); fox.frozenOverlay = null; }
    if (fox.frozenTintSprite) { fox.frozenTintSprite.destroy(); fox.frozenTintSprite = null; }
    if (fox.poisonTimer) { fox.poisonTimer.remove(false); fox.poisonTimer = null; }
    if (fox.cursePulseTween) { fox.cursePulseTween.stop(); fox.cursePulseTween = null; }
    if (fox.curseTintSprite) { fox.curseTintSprite.destroy(); fox.curseTintSprite = null; }
    if (fox.curseVfxSprite) { fox.curseVfxSprite.destroy(); fox.curseVfxSprite = null; }
    if (fox.curseLoopSound) {
      if (fox.curseLoopSound.isPlaying) fox.curseLoopSound.stop();
      fox.curseLoopSound.destroy();
      fox.curseLoopSound = null;
    }
    if (fox.hpBarBg) fox.hpBarBg.destroy();
    if (fox.hpBarFill) fox.hpBarFill.destroy();
    if (fox.sprite) fox.sprite.destroy();
    if (fox.caster && fox.caster.skeletons) {
      const cidx = fox.caster.skeletons.indexOf(fox);
      if (cidx >= 0) fox.caster.skeletons.splice(cidx, 1);
    }
    if (this.skeletons) {
      const idx = this.skeletons.indexOf(fox);
      if (idx >= 0) this.skeletons.splice(idx, 1);
    }
  }

  despawnSkeleton(caster) {
    if (!caster || !caster.skeletons) return;
    const list = caster.skeletons.slice();
    for (const fox of list) this.despawnSkeletonInstance(fox);
  }

  updateSkeletons(time, delta) {
    if (!this.skeletons || this.skeletons.length === 0) return;
    const dt = Math.min(delta, 50) / 1000;
    for (let i = this.skeletons.length - 1; i >= 0; i--) {
      const fox = this.skeletons[i];
      const caster = fox.caster;

      if (fox.state === 'dying') {
        this.positionSkeletonHpBar(fox);
        continue;
      }

      if (!caster || caster.isDead) {
        this.startSkeletonDeath(fox);
        continue;
      }

      if (fox.isFrozen) {
        if (time >= fox.frozenUntil) {
          this.removeFreezeSkeleton(fox);
        } else {
          if (fox.frozenOverlay) fox.frozenOverlay.setPosition(fox.x, fox.y - 60);
          if (fox.frozenTintSprite) {
            fox.frozenTintSprite.setTexture(fox.sprite.texture.key, fox.sprite.frame.name);
            fox.frozenTintSprite.setPosition(fox.sprite.x, fox.sprite.y);
            fox.frozenTintSprite.setScale(fox.sprite.scaleX, fox.sprite.scaleY);
            fox.frozenTintSprite.setFlipX(fox.sprite.flipX);
          }
          this.positionSkeletonHpBar(fox);
          continue;
        }
      }

      if (fox.state === 'stunned') {
        if (time >= fox.stunUntil) {
          fox.state = 'patrol';
          fox.nextBiteAt = Math.max(fox.nextBiteAt, time + 200);
        } else {
          fox.sprite.setPosition(fox.x, fox.y + (fox.knockupOffset || 0));
          fox.sprite.setFlipX(fox.facing < 0);
          this.positionSkeletonHpBar(fox);
          continue;
        }
      }

      if (fox.state === 'hurt') {
        if (time >= fox.hurtDoneAt) {
          fox.state = 'patrol';
          fox.nextBiteAt = Math.max(fox.nextBiteAt, time + 200);
        } else {
          fox.sprite.setPosition(fox.x, fox.y + (fox.knockupOffset || 0));
          fox.sprite.setFlipX(fox.facing < 0);
          this.positionSkeletonHpBar(fox);
          continue;
        }
      }

      if (fox.state === 'rolling') {
        const dt2 = Math.min(delta, 50) / 1000;
        const nextX = fox.x + fox.facing * ARCHER_ROLL_SPEED * dt2;
        fox.x = Phaser.Math.Clamp(nextX, fox.platformLeft, fox.platformRight);
        if (time >= fox.attackDoneAt) {
          fox.state = 'patrol';
          fox.nextRollAt = time + ARCHER_ROLL_COOLDOWN_MS;
        } else {
          fox.sprite.setPosition(fox.x, fox.y + (fox.knockupOffset || 0));
          fox.sprite.setFlipX(fox.facing < 0);
          this.positionSkeletonHpBar(fox);
          continue;
        }
      }

      if (fox.state === 'attacking') {
        const tgt = fox.target;
        const tgtValid = tgt && !tgt.isSkeletonPet
          ? !tgt.isDead
          : tgt && tgt.state !== 'dying' && tgt.hp > 0;
        if (tgtValid && !fox.attackDamageDealt && time >= fox.attackHitAt) {
          const tx = tgt.isSkeletonPet
            ? tgt.x
            : tgt.sprite.body.x + tgt.sprite.body.width / 2;
          if (fox.petType === 'archer') {
            // Spawn an arrow toward the target
            if (this.isAuthoritativeOwner(caster)) {
              const ty = tgt.isSkeletonPet ? tgt.y - 30 : tgt.sprite.body.y + tgt.sprite.body.height / 2;
              this.spawnArcherArrow(fox, tx, ty);
            }
          } else {
            const reach = fox.petType === 'omar' ? OMAR_HIT_REACH : SKELETON_BITE_REACH;
            const dmg = fox.petType === 'omar' ? OMAR_HIT_DAMAGE : SKELETON_BITE_DAMAGE;
            if (Math.abs(tx - fox.x) <= reach + 24) {
              if (tgt.isSkeletonPet) {
                this.damageSkeleton(tgt, dmg);
              } else {
                if (this.isAuthoritativeOwner(caster)) {
                  this.dealHit(tgt, {
                    damage: dmg,
                    ignoreShield: false,
                    powerFlashColor: POWERS.skeleton_attack.orbColor,
                    attackerIndex: caster.ownerIndex,
                    useDeath2: true,
                    cause: 'skeleton_bite',
                  });
                } else {
                  this.triggerHitFlash(tgt);
                }
              }
            }
          }
          fox.attackDamageDealt = true;
        }
        if (time >= fox.attackDoneAt) {
          fox.state = 'patrol';
          fox.target = null;
          const cd = fox.petType === 'archer' ? ARCHER_SHOOT_COOLDOWN_MS
            : fox.petType === 'omar' ? OMAR_HIT_COOLDOWN_MS
            : SKELETON_BITE_COOLDOWN_MS;
          fox.nextBiteAt = time + cd;
        } else {
          fox.sprite.setPosition(fox.x, fox.y + (fox.knockupOffset || 0));
          fox.sprite.setFlipX(fox.facing < 0);
          this.positionSkeletonHpBar(fox);
          continue;
        }
      }

      const detectRadius = fox.petType === 'archer' ? ARCHER_DETECT_RADIUS
        : fox.petType === 'omar' ? OMAR_DETECT_RADIUS
        : SKELETON_DETECT_RADIUS;
      let target = null;
      if (time >= fox.nextBiteAt) {
        let best = null;
        let bestDist = detectRadius;
        for (const f of this.fighters) {
          if (f === caster || f.isDead || f.isInvulnerable) continue;
          const tb = f.sprite.body;
          const tx = tb.x + tb.width / 2;
          const ty = tb.y + tb.height / 2;
          // Archers can target across the full vertical range of the map
          const yTol = fox.petType === 'archer' ? MAP_HEIGHT : SKELETON_PLATFORM_Y_TOLERANCE;
          if (Math.abs(ty - fox.y) > yTol) continue;
          if (fox.petType !== 'archer') {
            if (tx < fox.platformLeft - 40 || tx > fox.platformRight + 40) continue;
          }
          const dx = Math.abs(tx - fox.x);
          if (dx < bestDist) { bestDist = dx; best = f; }
        }
        if (this.skeletons) {
          for (const other of this.skeletons) {
            if (other === fox || other.state === 'dying') continue;
            if (other.caster === caster) continue;
            if (Math.abs(other.y - fox.y) > SKELETON_PLATFORM_Y_TOLERANCE) continue;
            if (fox.petType !== 'archer') {
              if (other.x < fox.platformLeft - 40 || other.x > fox.platformRight + 40) continue;
            }
            const dx = Math.abs(other.x - fox.x);
            if (dx < bestDist) { bestDist = dx; best = other; }
          }
        }
        target = best;
      }

      if (target) {
        const tx = target.isSkeletonPet
          ? target.x
          : target.sprite.body.x + target.sprite.body.width / 2;
        const dx = tx - fox.x;
        fox.facing = dx >= 0 ? 1 : -1;
        if (fox.petType === 'archer') {
          const absDx = Math.abs(dx);
          // Occasionally roll toward the target (cooldowned, only when there's room)
          if (
            time >= (fox.nextRollAt || 0) &&
            absDx > ARCHER_RETREAT_RANGE * 1.5 &&
            absDx < ARCHER_DETECT_RADIUS &&
            Math.random() < 0.45
          ) {
            fox.state = 'rolling';
            fox.attackDoneAt = time + ARCHER_ROLL_DURATION_MS;
            fox.sprite.play('archer_roll', true);
            fox.currentAnim = 'archer_roll';
            this.positionSkeletonHpBar(fox);
            continue;
          }
          if (absDx >= ARCHER_RETREAT_RANGE && absDx <= ARCHER_PREFERRED_RANGE * 1.4) {
            // In sweet spot: shoot
            fox.state = 'attacking';
            fox.target = target;
            fox.attackHitAt = time + ARCHER_SHOOT_WINDUP_MS;
            fox.attackDoneAt = time + 600;
            fox.attackDamageDealt = false;
            fox.sprite.play('archer_aim', true);
            fox.currentAnim = 'archer_aim';
            this.playSfx('sfx_skeleton_attack', 0.5);
          } else if (absDx < ARCHER_RETREAT_RANGE) {
            // Too close: roll away if cooldown ready, else just retreat walking
            if (time >= (fox.nextRollAt || 0)) {
              fox.facing = -fox.facing; // flip so the roll moves away from target
              fox.state = 'rolling';
              fox.attackDoneAt = time + ARCHER_ROLL_DURATION_MS;
              fox.nextBiteAt = Math.min(fox.nextBiteAt, time + ARCHER_ROLL_DURATION_MS); // ready to shoot after roll
              fox.sprite.play('archer_roll', true);
              fox.currentAnim = 'archer_roll';
              this.positionSkeletonHpBar(fox);
              continue;
            }
            const dir = -fox.facing;
            const nextX = fox.x + dir * ARCHER_KITE_SPEED * dt;
            fox.x = Phaser.Math.Clamp(nextX, fox.platformLeft, fox.platformRight);
            this.skeletonPlayAnim(fox, 'archer_run');
          } else {
            // Too far: walk closer
            const nextX = fox.x + fox.facing * ARCHER_PATROL_SPEED * dt;
            fox.x = Phaser.Math.Clamp(nextX, fox.platformLeft, fox.platformRight);
            this.skeletonPlayAnim(fox, 'archer_run');
          }
        } else if (fox.petType === 'omar') {
          if (Math.abs(dx) <= OMAR_HIT_REACH) {
            fox.state = 'attacking';
            fox.target = target;
            fox.attackHitAt = time + OMAR_HIT_WINDUP_MS;
            fox.attackDoneAt = time + 720;
            fox.attackDamageDealt = false;
            fox.sprite.play('omar_attack', true);
            fox.currentAnim = 'omar_attack';
            this.playSfx('sfx_skeleton_attack', 0.7);
          } else {
            const nextX = fox.x + fox.facing * OMAR_CHASE_SPEED * dt;
            fox.x = Phaser.Math.Clamp(nextX, fox.platformLeft, fox.platformRight);
            this.skeletonPlayAnim(fox, 'omar_walk');
          }
        } else {
          if (Math.abs(dx) <= SKELETON_BITE_REACH) {
            fox.attackVariant = 1 - (fox.attackVariant || 0);
            const animKey = fox.attackVariant === 0 ? 'skeleton_attack1' : 'skeleton_attack2';
            const frames = fox.attackVariant === 0 ? SKELETON_ATTACK1_FRAMES : SKELETON_ATTACK2_FRAMES;
            fox.state = 'attacking';
            fox.target = target;
            fox.attackHitAt = time + SKELETON_BITE_WINDUP_MS;
            fox.attackDoneAt = time + Math.round((frames / SKELETON_ATTACK_FPS) * 1000);
            fox.attackDamageDealt = false;
            fox.sprite.play(animKey, true);
            fox.currentAnim = animKey;
            this.playSfx('sfx_skeleton_attack', 0.7);
          } else {
            const nextX = fox.x + fox.facing * SKELETON_PATROL_SPEED * dt;
            fox.x = Phaser.Math.Clamp(nextX, fox.platformLeft, fox.platformRight);
            this.skeletonPlayAnim(fox, 'skeleton_walk');
          }
        }
      } else {
        if (fox.petType === 'archer') {
          // Archer just stands and waits when no target in range
          this.skeletonPlayAnim(fox, 'archer_idle');
        } else {
          const speed = fox.petType === 'omar' ? OMAR_PATROL_SPEED : SKELETON_PATROL_SPEED;
          const walkAnim = fox.petType === 'omar' ? 'omar_walk' : 'skeleton_walk';
          const nextX = fox.x + fox.facing * speed * dt;
          if (nextX <= fox.platformLeft) { fox.x = fox.platformLeft; fox.facing = 1; }
          else if (nextX >= fox.platformRight) { fox.x = fox.platformRight; fox.facing = -1; }
          else fox.x = nextX;
          this.skeletonPlayAnim(fox, walkAnim);
        }
      }

      fox.sprite.setPosition(fox.x, fox.y + (fox.knockupOffset || 0));
      fox.sprite.setFlipX(fox.facing < 0);
      if (fox.curseTintSprite) {
        fox.curseTintSprite.setTexture(fox.sprite.texture.key, fox.sprite.frame.name);
        fox.curseTintSprite.setPosition(fox.sprite.x, fox.sprite.y);
        fox.curseTintSprite.setScale(fox.sprite.scaleX, fox.sprite.scaleY);
        fox.curseTintSprite.setFlipX(fox.sprite.flipX);
      }
      if (fox.curseVfxSprite) {
        fox.curseVfxSprite.setPosition(fox.x, fox.y - 60 + (fox.knockupOffset || 0));
      }
      this.positionSkeletonHpBar(fox);
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
      } else if (f.iceSlowActive && !f.iceSlippery && time >= (f.iceSlowUntil || 0)) {
        f.iceSlowActive = false;
        f.iceSlowFactor = 1;
      }
      if (f.iceSlippery && f.frostTintSprite && !f.isDead) {
        f.frostTintSprite.setTexture(f.sprite.texture.key, f.sprite.frame.name);
        f.frostTintSprite.setPosition(f.sprite.x, f.sprite.y);
        f.frostTintSprite.setScale(f.sprite.scaleX, f.sprite.scaleY);
        f.frostTintSprite.setFlipX(f.sprite.flipX);
      }
      if (f.burnTintSprite && !f.isDead) {
        f.burnTintSprite.setTexture(f.sprite.texture.key, f.sprite.frame.name);
        f.burnTintSprite.setPosition(f.sprite.x, f.sprite.y);
        f.burnTintSprite.setScale(f.sprite.scaleX, f.sprite.scaleY);
        f.burnTintSprite.setFlipX(f.sprite.flipX);
      }
      if (f.fireStormAuraSprite && !f.isDead) {
        const fb = f.sprite.body;
        f.fireStormAuraSprite.setPosition(
          fb.x + fb.width / 2,
          fb.y + fb.height / 2 - 40,
        );
      }
      if (f.fireStormBuff && !f.isDead) {
        const v = f.sprite.body.velocity;
        const moving = Math.abs(v.x) > 30 || Math.abs(v.y) > 60;
        if (moving) {
          const now = this.time.now;
          if (now - (f.fireStormTrailAt || 0) > 60) {
            f.fireStormTrailAt = now;
            const ghost = this.add.sprite(f.sprite.x, f.sprite.y, f.sprite.texture.key, f.sprite.frame.name)
              .setScale(f.sprite.scaleX, f.sprite.scaleY)
              .setOrigin(f.sprite.originX, f.sprite.originY)
              .setFlipX(f.sprite.flipX)
              .setTintFill(0xff8800)
              .setAlpha(0.55)
              .setDepth(f.sprite.depth - 0.1)
              .setBlendMode(Phaser.BlendModes.ADD);
            this.tweens.add({
              targets: ghost,
              alpha: 0,
              scaleX: ghost.scaleX * 0.7,
              scaleY: ghost.scaleY * 0.7,
              duration: 360,
              ease: 'Quad.easeOut',
              onComplete: () => ghost.destroy(),
            });
          }
        }
      }
    }
  }

  fireFireStorm(fighter, level = 1) {
    if (level >= 2) {
      // Latest power wins: cancel an active snowstorm so they don't overlap
      if (this._snowstormActive) this.endSnowstorm();
      this.activateFireStormBuff(fighter);
      for (let w = 0; w < FIRE_STORM_L2_WAVES; w++) {
        const delay = w * FIRE_STORM_L2_WAVE_DELAY_MS;
        this.time.delayedCall(delay, () => {
          if (!fighter || fighter.isDead || !fighter.fireStormBuff) return;
          this.spawnFireStormWaveInward(fighter);
        });
      }
      return;
    }
    for (let w = 0; w < FIRE_STORM_WAVES; w++) {
      const delay = w * FIRE_STORM_WAVE_DELAY_MS;
      this.time.delayedCall(delay, () => {
        if (!fighter || fighter.isDead) return;
        this.spawnFireStormWave(fighter);
      });
    }
  }

  activateFireStormBuff(fighter) {
    const wasBuffed = !!fighter.fireStormBuff;
    fighter.fireStormBuff = true;
    fighter.fireStormBuffUntil = this.time.now + FIRE_STORM_L2_DURATION_MS;
    // Cancel any pending end-timer so we can re-schedule fresh
    if (fighter.fireStormEndTimer) {
      fighter.fireStormEndTimer.remove(false);
      fighter.fireStormEndTimer = null;
    }
    if (!wasBuffed) {
      this._fireStormVisualRefs = (this._fireStormVisualRefs || 0) + 1;
      if (this._fireStormVisualRefs === 1) this.applyFireStormVisual();
    }
    if (!fighter.fireStormAuraSprite) {
      fighter.fireStormAuraSprite = this.add.sprite(
        fighter.sprite.x,
        fighter.sprite.y,
        'fire_storm_aura',
        0,
      )
        .setScale(SPRITE_SCALE * 0.85)
        .setAlpha(0.9)
        .setBlendMode(Phaser.BlendModes.NORMAL)
        .setDepth(fighter.sprite.depth - 0.05);
      fighter.fireStormAuraSprite.play('fire_storm_aura');
    }
    fighter.fireStormEndTimer = this.time.delayedCall(FIRE_STORM_L2_DURATION_MS, () => {
      fighter.fireStormEndTimer = null;
      if (!fighter || !fighter.fireStormBuff) return;
      this.deactivateFireStormBuff(fighter);
    });
  }

  deactivateFireStormBuff(fighter) {
    if (!fighter || !fighter.fireStormBuff) return;
    fighter.fireStormBuff = false;
    fighter.fireStormBuffUntil = 0;
    if (fighter.fireStormEndTimer) {
      fighter.fireStormEndTimer.remove(false);
      fighter.fireStormEndTimer = null;
    }
    if (fighter.fireStormAuraSprite) {
      fighter.fireStormAuraSprite.destroy();
      fighter.fireStormAuraSprite = null;
    }
    this._fireStormVisualRefs = Math.max(0, (this._fireStormVisualRefs || 0) - 1);
    if (this._fireStormVisualRefs === 0) this.removeFireStormVisual();
  }

  endFireStorm() {
    for (const f of this.fighters || []) {
      if (f && f.fireStormBuff) this.deactivateFireStormBuff(f);
    }
  }

  applyFireStormVisual() {
    this._firestormVisualActive = true;
    if (this.map1Bg) this.map1Bg.setTexture('map1_bg_firestorm');
    if (this.rainEmitter) this.rainEmitter.stop();
    this.startHeatHaze();
  }

  removeFireStormVisual() {
    this._firestormVisualActive = false;
    // Clean up all L2 rays still in flight when the storm ends
    if (this.fireStormRays) {
      for (let i = this.fireStormRays.length - 1; i >= 0; i--) {
        const r = this.fireStormRays[i];
        if (!r || !r.isL2) continue;
        if (r.auraPulse) r.auraPulse.stop();
        if (r.aura) r.aura.destroy();
        if (r.scene) r.destroy();
        this.fireStormRays.splice(i, 1);
      }
    }
    this.stopHeatHaze();
    if (this._snowstormActive) return; // snowstorm now owns the visual
    if (this.map1Bg) this.map1Bg.setTexture('map1_bg');
    if (this.rainEmitter) this.rainEmitter.start();
  }

  startHeatHaze() {
    if (!this.textures.exists('heat_wisp')) {
      const tex = this.textures.createCanvas('heat_wisp', 8, 14);
      const ctx = tex.getContext();
      const grad = ctx.createRadialGradient(4, 7, 0, 4, 7, 6);
      grad.addColorStop(0, 'rgba(255, 220, 150, 0.85)');
      grad.addColorStop(0.6, 'rgba(255, 160, 80, 0.4)');
      grad.addColorStop(1, 'rgba(180, 70, 30, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 8, 14);
      tex.refresh();
    }
    if (!this.textures.exists('heat_smoke')) {
      const tex = this.textures.createCanvas('heat_smoke', 24, 24);
      const ctx = tex.getContext();
      const grad = ctx.createRadialGradient(12, 12, 0, 12, 12, 12);
      grad.addColorStop(0, 'rgba(70, 50, 50, 0.55)');
      grad.addColorStop(0.6, 'rgba(50, 40, 40, 0.25)');
      grad.addColorStop(1, 'rgba(30, 20, 20, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 24, 24);
      tex.refresh();
    }
    if (!this.heatEmitter) {
      this.heatEmitter = this.add.particles(0, 0, 'heat_wisp', {
        x: { min: 0, max: MAP_WIDTH },
        y: { min: Math.floor(MAP_HEIGHT * 0.55), max: MAP_HEIGHT },
        lifespan: 2400,
        speedY: { min: -90, max: -45 },
        speedX: { min: -20, max: 20 },
        accelerationX: { min: -30, max: 30 },
        quantity: 2,
        frequency: 70,
        alpha: { min: 0.18, max: 0.35 },
        scale: { start: 0.7, end: 1.6 },
        blendMode: Phaser.BlendModes.ADD,
      }).setDepth(-3);
    }
    if (!this.smokeEmitter) {
      this.smokeEmitter = this.add.particles(0, 0, 'heat_smoke', {
        x: { min: -40, max: MAP_WIDTH + 40 },
        y: MAP_HEIGHT + 10,
        lifespan: 5500,
        speedY: { min: -70, max: -35 },
        speedX: { min: -30, max: 30 },
        accelerationX: { min: -15, max: 15 },
        quantity: 2,
        frequency: 110,
        alpha: { start: 0.6, end: 0 },
        scale: { start: 0.8, end: 3.2 },
        rotate: { min: 0, max: 360 },
      }).setDepth(-7);
    }
    this.heatEmitter.start();
    this.smokeEmitter.start();
    if (this.map1Platforms) this.map1Platforms.setTint(0xff8c63);
    if (!this.heatOverlay) {
      this.heatOverlay = this.add.rectangle(0, 0, MAP_WIDTH, MAP_HEIGHT, 0xf97316, 0.06)
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDepth(49)
        .setBlendMode(Phaser.BlendModes.ADD);
    }
    this.heatOverlay.setAlpha(0.06).setVisible(true);
    if (this._heatOverlayPulse) this._heatOverlayPulse.stop();
    this._heatOverlayPulse = this.tweens.add({
      targets: this.heatOverlay,
      alpha: 0.14,
      duration: 1100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  stopHeatHaze() {
    if (this.heatEmitter) this.heatEmitter.stop();
    if (this.smokeEmitter) this.smokeEmitter.stop();
    if (this._heatOverlayPulse) {
      this._heatOverlayPulse.stop();
      this._heatOverlayPulse = null;
    }
    if (this.heatOverlay) {
      this.heatOverlay.setVisible(false).setAlpha(0);
    }
    // Restore platform tint unless snowstorm is taking over
    if (this.map1Platforms && !this._snowstormActive) this.map1Platforms.clearTint();
  }

  spawnFireStormWaveInward(fighter) {
    this.playSfx('sfx_fire_storm', 1, 0.2);
    this.playSfx('sfx_fire_storm_2', 1, 0.4);
    const body = fighter.sprite.body;
    const cx = body.x + body.width / 2;
    const cy = body.y + body.height / 2;
    const hitSet = new Set();

    const burst = this.add.image(cx, cy, 'glow_orange')
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(ATTACKER_DEPTH - 0.1)
      .setScale(0.4)
      .setAlpha(0.85);
    this.tweens.add({
      targets: burst,
      alpha: 0,
      scale: 1.6,
      duration: 520,
      onComplete: () => burst.destroy(),
    });
    this.spawnFireStormHit(fighter);

    for (let i = 0; i < 8; i++) {
      const outwardAngle = (Math.PI / 4) * i;
      const startX = cx + Math.cos(outwardAngle) * FIRE_STORM_L2_RAY_RADIUS;
      const startY = cy + Math.sin(outwardAngle) * FIRE_STORM_L2_RAY_RADIUS;
      const inwardAngle = outwardAngle + Math.PI;
      const ray = this.spawnFireStormRay(fighter, startX, startY, inwardAngle, hitSet);
      if (ray) {
        ray.isL2 = true;
        ray.homingTarget = fighter;
        ray.homingSpeed = FIRE_STORM_L2_SPEED;
        const vx = Math.cos(inwardAngle) * FIRE_STORM_L2_SPEED;
        const vy = Math.sin(inwardAngle) * FIRE_STORM_L2_SPEED;
        ray.body.setVelocity(vx, vy);
      }
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
    return ray;
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

  executeHeavensStrike(fighter, worldX, surfaceY, level = 1, opts = {}) {
    const isL2 = level >= 2;
    const bigSize = opts.bigSize ?? isL2;
    const wideAoe = opts.wideAoe ?? isL2;
    const sizeMult = bigSize ? 3 : 1;
    const aoeMult = wideAoe ? 2 : 1;
    const strikeHalfWidth = HEAVENS_FURY_STRIKE_HALF_WIDTH * aoeMult;
    const beamHalfWidth = HEAVENS_FURY_BEAM_HALF_WIDTH * aoeMult;
    this.playSfx('sfx_heavens_fury_second');
    const beamCoreHeight = Math.max(0, surfaceY);
    const beamCore = this.add.rectangle(
      worldX,
      0,
      26 * aoeMult,
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
      90 * aoeMult,
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
      .setScale(HEAVENS_FURY_SCALE * sizeMult)
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
          if (inGroundZone && dx <= strikeHalfWidth) {
            this.dealHit(target, {
              damage: MAX_HP,
              ignoreShield: true,
              heavensFury: true,
              powerFlashColor: POWERS.heavens_fury.orbColor,
              cause: 'heavens_fury',
            });
          } else if (
            ty < groundTop &&
            ty >= 0 &&
            dx <= beamHalfWidth
          ) {
            this.dealHit(target, {
              damage: isL2 ? MAX_HP : MAX_HP * 0.8,
              ignoreShield: true,
              heavensFury: true,
              powerFlashColor: POWERS.heavens_fury.orbColor,
              cause: 'heavens_fury',
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
            (inGroundZone && dx <= strikeHalfWidth) ||
            (cy < groundTop && cy >= 0 && dx <= beamHalfWidth)
          ) {
            this.killCrow();
          }
        }
        // Mines no caminho do feixe / na zona do impacto (ignora as próprias)
        this.checkLandMineHitByRect(
          worldX - strikeHalfWidth,
          worldX + strikeHalfWidth,
          0,
          surfaceY + 40,
          fighter
        );
        if (this.skeletons) {
          for (const fox of this.skeletons.slice()) {
            if (!fox || fox.state === 'dying' || fox.caster === fighter) continue;
            const fx = fox.x;
            const fy = fox.y - 50;
            const fdx = Math.abs(fx - worldX);
            const inGroundZoneF = fy >= groundTop && fy <= groundBottom;
            if (
              (inGroundZoneF && fdx <= strikeHalfWidth) ||
              (fy < groundTop && fy >= 0 && fdx <= beamHalfWidth)
            ) {
              this.damageSkeleton(fox, fox.maxHp + 1, { numberColor: '#fde047' });
            }
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
              (inGroundZone && dx <= strikeHalfWidth) ||
              (ly < groundTop && ly >= 0 && dx <= beamHalfWidth)
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
      const level = fighter.upgradedPowers.has('heavens_fury') ? 2 : 1;
      this.firePower(fighter, pointer.worldX, pointer.worldY, level);
      fighter.specialPowers.shift();
      if (level >= 2) fighter.upgradedPowers.delete('heavens_fury');
      let bonusX = null;
      let bonus2X = null;
      if (level >= 2) {
        const ray1HalfWidth = HEAVENS_FURY_STRIKE_HALF_WIDTH * 2; // L2 wideAoe
        const bonusHalfWidth = HEAVENS_FURY_STRIKE_HALF_WIDTH;     // L1 normal AoE
        // Ray 2: normal size, doesn't overlap ray 1
        bonusX = this.pickHeavensFuryBonusX(
          [{ x: pointer.worldX, halfWidth: ray1HalfWidth }],
          bonusHalfWidth,
        );
        this.time.delayedCall(600, () => {
          if (!fighter || fighter.isDead) return;
          this.firePower(fighter, bonusX, 0, 1, { fastTelegraph: true, lowestSurface: true });
        });
        // Ray 3: 0.7x size, doesn't overlap ray 1 or ray 2
        bonus2X = this.pickHeavensFuryBonusX(
          [
            { x: pointer.worldX, halfWidth: ray1HalfWidth },
            { x: bonusX, halfWidth: bonusHalfWidth },
          ],
          bonusHalfWidth,
        );
        this.time.delayedCall(1200, () => {
          if (!fighter || fighter.isDead) return;
          this.firePower(fighter, bonus2X, 0, 1, { fastTelegraph: true, sizeMult: 0.7, lowestSurface: true });
        });
      }
      this.sendPowerCast('heavens_fury', { worldX: pointer.worldX, worldY: pointer.worldY, level, bonusX, bonus2X });
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
      const level = fighter.upgradedPowers.has('skull_curse') ? 2 : 1;
      fighter.specialPowers.shift();
      if (level >= 2) fighter.upgradedPowers.delete('skull_curse');
      this.fireSkullCurse(fighter, pointer.worldX, pointer.worldY, level);
      this.sendPowerCast('skull_curse', { worldX: pointer.worldX, worldY: pointer.worldY, level });
    } else if (power === 'wheel') {
      const level = fighter.upgradedPowers.has('wheel') ? 2 : 1;
      fighter.specialPowers.shift();
      if (level >= 2) fighter.upgradedPowers.delete('wheel');
      if (level >= 2) {
        this.fireWheelStorm(fighter);
        this.sendPowerCast('wheel', { worldX: pointer.worldX, level: 2 });
      } else {
        this.fireWheel(fighter, pointer.worldX);
        this.sendPowerCast('wheel', { worldX: pointer.worldX });
      }
    } else if (power === 'fire_storm') {
      const level = fighter.upgradedPowers.has('fire_storm') ? 2 : 1;
      fighter.specialPowers.shift();
      if (level >= 2) fighter.upgradedPowers.delete('fire_storm');
      this.fireFireStorm(fighter, level);
      this.sendPowerCast('fire_storm', { level });
    } else if (power === 'ice_beam') {
      const level = fighter.upgradedPowers.has('ice_beam') ? 2 : 1;
      fighter.specialPowers.shift();
      if (level >= 2) fighter.upgradedPowers.delete('ice_beam');
      if (level >= 2) {
        this.castSnowstorm(fighter);
        this.sendPowerCast('ice_beam', {
          worldX: pointer.worldX,
          worldY: pointer.worldY,
          level: 2,
        });
      } else {
        const beam = this.fireIceBeam(fighter, pointer.worldX, pointer.worldY);
        this.sendPowerCast('ice_beam', {
          worldX: pointer.worldX,
          worldY: pointer.worldY,
          beamId: beam?.beamId ?? null,
          facing: beam?.facing ?? 1,
        });
      }
    } else if (power === 'skeleton_attack') {
      const level = fighter.upgradedPowers.has('skeleton_attack') ? 2 : 1;
      fighter.specialPowers.shift();
      if (level >= 2) fighter.upgradedPowers.delete('skeleton_attack');
      if (level >= 2) {
        const trio = this.fireSkeletonTrio(fighter);
        this.sendPowerCast('skeleton_attack', {
          worldX: pointer.worldX, worldY: pointer.worldY,
          level: 2,
          trioOrder: trio.order,
          trioNetIds: trio.netIds,
          trioTypes: trio.types,
        });
      } else {
        this.throwSkeletonBall(fighter, pointer.worldX, pointer.worldY);
        this.sendPowerCast('skeleton_attack', { worldX: pointer.worldX, worldY: pointer.worldY });
      }
    } else if (power === 'land_mine') {
      const level = fighter.upgradedPowers.has('land_mine') ? 2 : 1;
      if (level >= 2) {
        fighter.upgradedPowers.delete('land_mine');
        fighter.specialPowers.shift();
        fighter.landMineCharges = 0;
        const partySpawns = this.castLandMineParty(fighter);
        this.sendPowerCast('land_mine', { level: 2, partySpawns });
      } else {
        this.throwLandMine(fighter, pointer.worldX, pointer.worldY);
        fighter.landMineCharges = Math.max(0, (fighter.landMineCharges ?? 1) - 1);
        if (fighter.landMineCharges <= 0) fighter.specialPowers.shift();
        this.sendPowerCast('land_mine', { worldX: pointer.worldX, worldY: pointer.worldY, level: 1 });
      }
    }
  }

  throwLandMine(fighter, targetX, targetY) {
    if (!this.landMines) this.landMines = [];
    const fb = fighter.sprite.body;
    const cx = fb.x + fb.width / 2;
    const cy = fb.y + fb.height / 2 - 8;
    let dx = targetX - cx;
    let dy = targetY - cy;
    const dist = Math.max(Math.hypot(dx, dy), 1);
    const nx = dx / dist;
    const ny = dy / dist;
    // Curto alcance — velocidade horizontal direção do clique + sempre boost pra cima
    const vx = nx * LAND_MINE_THROW_VX;
    const vy = ny * LAND_MINE_THROW_VX * 0.4 + LAND_MINE_THROW_VY_BIAS;
    this.createLandMine(
      cx + Math.sign(nx || 1) * 14,
      cy,
      fighter,
      { vx, vy }
    );
    this.playSfx('sfx_swing', 0.7);
  }

  createLandMine(x, y, owner, opts) {
    const sprite = this.physics.add.sprite(x, y, 'land_mine_idle', 0);
    sprite.setScale(LAND_MINE_SCALE);
    sprite.setDepth(DEFAULT_SPRITE_DEPTH + 1.5); // à frente do player pra não esconder atrás do corpo
    sprite.body.setSize(LAND_MINE_BODY, LAND_MINE_BODY);
    sprite.body.setOffset(
      (LAND_MINE_FRAME - LAND_MINE_BODY) / 2,
      (LAND_MINE_FRAME - LAND_MINE_BODY) / 2 + 28
    );
    sprite.body.setCollideWorldBounds(true);  // bate nas bordas do mapa
    sprite.body.setBounce(LAND_MINE_BOUNCE_X, 0); // X bate, Y não (queremos parar no chão)
    sprite.body.setDragX(120);
    const v = opts || {};
    sprite.body.setVelocity(v.vx ?? 0, v.vy ?? 0);
    if (this.platformZones) {
      this.physics.add.collider(sprite, this.platformZones, null, this.oneWayProcessCallback);
    }
    sprite.play('land_mine_idle');
    sprite.owner = owner;
    sprite.spawnedAt = this.time.now;
    sprite.triggered = false;
    sprite.armed = false;
    // Glow pulsante no topo (cor do owner)
    const glowColor = owner?.char?.tintColor ?? 0xff2222;
    const glow = this.add.circle(x, y - 22, 7, glowColor, 0.95)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(DEFAULT_SPRITE_DEPTH + 1.6); // junto com a mina, à frente do player
    sprite.glow = glow;
    sprite.glowPulse = this.tweens.add({
      targets: glow,
      scale: 1.7,
      alpha: 0.35,
      duration: 460,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    this.landMines.push(sprite);
  }

  destroyLandMineGlow(mine) {
    if (mine.glowPulse) {
      mine.glowPulse.stop();
      mine.glowPulse = null;
    }
    if (mine.glow) {
      mine.glow.destroy();
      mine.glow = null;
    }
    if (mine.pullRingPulse) {
      mine.pullRingPulse.stop();
      mine.pullRingPulse = null;
    }
    if (mine.pullRing) {
      mine.pullRing.destroy();
      mine.pullRing = null;
    }
  }

  generateLandMinePartySpawns() {
    const spawns = [];
    const count = Math.floor(LAND_MINE_L2_DURATION_MS / LAND_MINE_L2_SPAWN_INTERVAL_MS);
    const margin = 40;
    const active = []; // { x, y, deathMs } — minas vivas no momento de cada spawn
    for (let i = 0; i < count; i++) {
      const spawnMs = i * LAND_MINE_L2_SPAWN_INTERVAL_MS;
      // Prune minas que já explodiram antes deste tick
      for (let j = active.length - 1; j >= 0; j--) {
        if (active[j].deathMs <= spawnMs) active.splice(j, 1);
      }
      let placed = null;
      for (let tries = 0; tries < 14; tries++) {
        const rect = Phaser.Math.RND.pick(PLATFORM_RECTS);
        const x = Phaser.Math.Between(rect.x + margin, rect.x + rect.w - margin);
        const y = rect.y;
        const collides = active.some(
          (m) => Math.hypot(m.x - x, m.y - y) < LAND_MINE_L2_MIN_SPACING
        );
        if (!collides) { placed = { x, y }; break; }
      }
      if (!placed) continue; // todas plataformas cheias — pula esse tick
      spawns.push({ x: placed.x, y: placed.y, delayMs: spawnMs });
      active.push({ x: placed.x, y: placed.y, deathMs: spawnMs + LAND_MINE_L2_FUSE_MS });
    }
    return spawns;
  }

  castLandMineParty(fighter, partySpawns) {
    const spawns = partySpawns || this.generateLandMinePartySpawns();
    this.playSfx('sfx_landmine_explode', 0.4);
    for (const spawn of spawns) {
      this.time.delayedCall(spawn.delayMs, () => {
        if (!fighter || fighter.isDead) return;
        this.spawnPartyLandMine(spawn.x, spawn.y, fighter);
      });
    }
    return spawns;
  }

  spawnPartyLandMine(x, y, owner) {
    if (!this.landMines) this.landMines = [];
    // y é o topo da plataforma. Sprite L2 escalada; offset visual ajustado pra base ficar no chão.
    const spriteY = y - 22;
    const sprite = this.physics.add.sprite(x, spriteY, 'land_mine_l2_idle', 0);
    sprite.setScale(LAND_MINE_L2_SCALE);
    sprite.setDepth(DEFAULT_SPRITE_DEPTH + 1.5);
    sprite.body.setSize(LAND_MINE_BODY, LAND_MINE_BODY);
    sprite.body.setOffset(
      (LAND_MINE_FRAME - LAND_MINE_BODY) / 2,
      (LAND_MINE_FRAME - LAND_MINE_BODY) / 2 + 28
    );
    sprite.body.setAllowGravity(false);
    sprite.body.setVelocity(0, 0);
    sprite.play('land_mine_l2_idle');
    sprite.owner = owner;
    sprite.spawnedAt = this.time.now;
    sprite.triggered = false;
    sprite.armed = true;
    sprite.partyMine = true;
    sprite.partyExplodeAt = this.time.now + LAND_MINE_L2_FUSE_MS;

    // Glow vermelho/laranja mais intenso
    const glow = this.add.circle(sprite.x, spriteY - 22, 9, 0xff5a2c, 0.95)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(DEFAULT_SPRITE_DEPTH + 1.6);
    sprite.glow = glow;
    sprite.glowPulse = this.tweens.add({
      targets: glow,
      scale: 2.0,
      alpha: 0.4,
      duration: 280,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Anel de magnetismo (cor do caster — fica claro de quem é a área)
    const ownerColor = owner?.char?.tintColor ?? 0xff5a2c;
    const pullRing = this.add.circle(sprite.x, y - 8, LAND_MINE_L2_PULL_RADIUS, ownerColor, 0.10)
      .setStrokeStyle(3, ownerColor, 0.7)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(DEFAULT_SPRITE_DEPTH + 1.4);
    sprite.pullRing = pullRing;
    sprite.pullRingPulse = this.tweens.add({
      targets: pullRing,
      scale: 1.12,
      alpha: 0.95,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.spawnPartyLandMineMaterializeVfx(x, y);
    this.landMines.push(sprite);
  }

  spawnPartyLandMineMaterializeVfx(x, y) {
    const flash = this.add.circle(x, y - 30, 26, 0xff8a2c, 0.85)
      .setDepth(DEFAULT_SPRITE_DEPTH + 0.4)
      .setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({
      targets: flash,
      scale: 4.5,
      alpha: 0,
      duration: 520,
      ease: 'Cubic.easeOut',
      onComplete: () => flash.destroy(),
    });
    const ring = this.add.ellipse(x, y, 50, 18, 0xb91c1c, 0)
      .setStrokeStyle(3, 0xff5a2c, 1)
      .setDepth(DEFAULT_SPRITE_DEPTH + 0.3)
      .setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({
      targets: ring,
      scaleX: 4.5,
      scaleY: 4.5,
      alpha: 0,
      duration: 600,
      ease: 'Quad.easeOut',
      onComplete: () => ring.destroy(),
    });
    for (let i = 0; i < 10; i++) {
      const ang = Math.random() * Math.PI * 2;
      const dist = 6 + Math.random() * 22;
      const px = x + Math.cos(ang) * dist;
      const py = y + Math.sin(ang) * 6;
      const puff = this.add.circle(px, py, 3 + Math.random() * 3, 0xfca5a5, 0.95)
        .setDepth(DEFAULT_SPRITE_DEPTH + 0.35)
        .setBlendMode(Phaser.BlendModes.ADD);
      this.tweens.add({
        targets: puff,
        y: py - 60 - Math.random() * 40,
        x: px + (Math.random() - 0.5) * 24,
        scale: 0.1,
        alpha: 0,
        duration: 460 + Math.random() * 200,
        ease: 'Cubic.easeOut',
        onComplete: () => puff.destroy(),
      });
    }
    this.playSfx('sfx_landmine_explode', 0.35);
  }

  isFighterSlowed(f) {
    return !!(f && (f.curseSlowed || f.landMinePullSlowed));
  }

  updateLandMines(time, delta) {
    // Reset do flag de puxão a cada frame — só fica true se ainda dentro do raio de alguma party mine
    if (this.fighters) {
      for (const f of this.fighters) {
        if (f) f.landMinePullSlowed = false;
      }
    }
    if (!this.landMines || this.landMines.length === 0) return;
    for (let i = this.landMines.length - 1; i >= 0; i--) {
      const mine = this.landMines[i];
      if (!mine || !mine.active) {
        this.landMines.splice(i, 1);
        continue;
      }
      if (mine.triggered) continue;
      // Glow + ring de magnetismo seguem a mina
      if (mine.glow) mine.glow.setPosition(mine.x, mine.y - 22);
      if (mine.pullRing) mine.pullRing.setPosition(mine.x, mine.y + 22);
      // Fora do mapa
      if (mine.y > MAP_HEIGHT + 200) {
        this.destroyLandMineGlow(mine);
        mine.destroy();
        this.landMines.splice(i, 1);
        continue;
      }
      // Stops on first ground — congela imediatamente no primeiro contato vertical
      if (!mine.armed && (mine.body.blocked.down || mine.body.touching.down)) {
        mine.armed = true;
        mine.body.setVelocity(0, 0);
        mine.body.setAllowGravity(false);
        mine.body.setDragX(0);
        mine.body.setBounce(0, 0);
      }
      // Verifica fighters pisando — só dispara se já armada
      if (!mine.armed) continue;
      // Party mines: aplicam puxão magnético + auto-explodem após fuse
      if (mine.partyMine) {
        const dtSec = (delta || 16) / 1000;
        // Pull em fighters (caster imune)
        for (const f of this.fighters) {
          if (!f || f.isDead || f.isInvulnerable || f.isFrozen) continue;
          if (f === mine.owner) continue;
          const fb = f.sprite.body;
          const fcx = fb.x + fb.width / 2;
          const fcy = fb.y + fb.height / 2;
          const dx = mine.x - fcx;
          const dy = mine.y - fcy;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < LAND_MINE_L2_PULL_RADIUS) {
            const t = 1 - dist / LAND_MINE_L2_PULL_RADIUS;
            const accel = LAND_MINE_L2_PULL_ACCEL * t * dtSec;
            fb.velocity.x += (dx / dist) * accel;
            fb.velocity.y += (dy / dist) * accel * 0.55;
            f.landMinePullSlowed = true;
          }
        }
        // Pull em pets/esqueletos (deslocamento direto — eles não usam física)
        if (this.skeletons) {
          for (const fox of this.skeletons) {
            if (!fox || fox.state === 'dying') continue;
            if (fox.isFrozen) continue;
            const dx = mine.x - fox.x;
            const dy = mine.y - fox.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 0 && dist < LAND_MINE_L2_PULL_RADIUS) {
              const t = 1 - dist / LAND_MINE_L2_PULL_RADIUS;
              const step = LAND_MINE_L2_PULL_ACCEL * t * dtSec * 0.35;
              fox.x += (dx / dist) * step;
              if (fox.sprite) fox.sprite.setX(fox.x);
            }
          }
        }
        // Auto-fuse
        if (mine.partyExplodeAt && time >= mine.partyExplodeAt) {
          this.triggerLandMine(mine);
          continue;
        }
      }
      // Verifica fighters pisando — só dispara se já armada
      let triggered = false;
      for (const f of this.fighters) {
        if (!f || f.isDead || f.isInvulnerable) continue;
        if (f === mine.owner) continue; // owner sempre imune à própria mina
        const fb = f.sprite.body;
        const fcx = fb.x + fb.width / 2;
        const ffeet = fb.y + fb.height;
        const dx = fcx - mine.x;
        const dy = ffeet - mine.y;
        if (Math.abs(dx) < LAND_MINE_TRIGGER_DX && Math.abs(dy) < LAND_MINE_TRIGGER_DY) {
          this.triggerLandMine(mine);
          triggered = true;
          break;
        }
      }
      if (triggered) continue;
      // Esqueletos inimigos também ativam (caster ≠ mine.owner)
      if (this.skeletons) {
        for (const fox of this.skeletons) {
          if (!fox || fox.state === 'dying') continue;
          if (fox.caster === mine.owner) continue;
          const dx = fox.x - mine.x;
          const dy = fox.y - mine.y; // fox.y é o pé do esqueleto
          if (Math.abs(dx) < LAND_MINE_TRIGGER_DX && Math.abs(dy) < LAND_MINE_TRIGGER_DY + 20) {
            this.triggerLandMine(mine);
            break;
          }
        }
      }
    }
  }

  // Verifica se um retângulo (de wheel, heavens fury, etc.) atinge alguma mina e detona.
  // `caster` (opcional) — se passado, ignora minas do próprio caster (não quebra as próprias).
  checkLandMineHitByRect(left, right, top, bottom, caster) {
    if (!this.landMines || this.landMines.length === 0) return false;
    let any = false;
    for (const mine of this.landMines.slice()) {
      if (!mine || !mine.active || mine.triggered) continue;
      if (caster && mine.owner === caster) continue;
      if (mine.x > left && mine.x < right && mine.y > top && mine.y < bottom) {
        this.triggerLandMine(mine);
        any = true;
      }
    }
    return any;
  }

  triggerLandMine(mine, opts) {
    if (mine.triggered) return;
    if (mine.frozenOverlay) return; // mina congelada não dispara durante a tempestade
    mine.triggered = true;
    const cx = mine.x;
    const cy = mine.y;
    const visualOnly = !!(opts && opts.visualOnly);

    const radiusMult = mine.partyMine ? LAND_MINE_L2_RADIUS_MULT : 1;
    const explosionScale = 3.5 * (mine.partyMine ? 1.4 : 1);
    const damageRadius = LAND_MINE_RADIUS * 1.4 * radiusMult;

    // Visual: explosion spritesheet (frames 2-12 of explosion-b)
    const explosion = this.add.sprite(cx, cy, 'landmine_explosion', 2)
      .setDepth(15)
      .setScale(explosionScale);
    explosion.play('landmine_explosion');
    explosion.once('animationcomplete', () => explosion.destroy());

    if (!visualOnly) {
      // Damage in radius — caster imune ao próprio dano em party mines
      for (const f of this.fighters) {
        if (!f || f.isDead || f.isInvulnerable) continue;
        if (mine.partyMine && f === mine.owner) continue;
        const fb = f.sprite.body;
        const fcx = fb.x + fb.width / 2;
        const fcy = fb.y + fb.height / 2;
        const dist = Math.hypot(fcx - cx, fcy - cy);
        if (dist < damageRadius) {
          // Mina força death_1 — limpa flag sticky de hits anteriores
          f.pendingDeath2 = false;
          this.dealHit(f, {
            damage: LAND_MINE_DAMAGE,
            knockbackX: (fcx > cx ? 1 : -1) * 280,
            knockupY: -340,
            attackerIndex: mine.owner?.ownerIndex,
            playHitSfx: true,
            powerFlashColor: 0xff8a2c,
            cause: mine.partyMine ? 'land_mine_party' : 'land_mine',
          });
        }
      }
      // Esqueletos no raio morrem instantaneamente
      if (this.skeletons && this.skeletons.length > 0) {
        const skelRadius = LAND_MINE_RADIUS * radiusMult;
        this.damageSkeletonsInRect(
          mine.owner,
          cx - skelRadius,
          cx + skelRadius,
          cy - skelRadius,
          cy + skelRadius,
          SKELETON_MAX_HP + 1,
          new Set()
        );
      }
    }

    this.playSfx('sfx_landmine_explode', 1.2);
    this.destroyLandMineGlow(mine);
    if (mine.frozenOverlay) {
      mine.frozenOverlay.destroy();
      mine.frozenOverlay = null;
    }
    mine.destroy();

    // Broadcast to remotes so they destroy their local copy of this mine
    if (this.isMultiplayer && this.network && !visualOnly) {
      this.network.send({ type: 'mine_explode', x: cx, y: cy });
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
    fighter.upgradedPowers?.clear();
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

    const wantCx = body.x + body.width / 2;
    const wantCy = body.y + body.height / 2;

    sprite.setTexture('eye_flight', 0);
    sprite.setScale(EYE_SCALE);
    if (sprite.updateDisplayOrigin) sprite.updateDisplayOrigin();
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
      sprite.setPosition(0, 0);
      if (body.updateFromGameObject) body.updateFromGameObject();
      const offsetCenterX = body.x + body.width / 2;
      const offsetCenterY = body.y + body.height / 2;
      const newSpriteX = wantCx - offsetCenterX;
      const newSpriteY = wantCy - offsetCenterY;
      sprite.setPosition(newSpriteX, newSpriteY);
      if (body.reset) body.reset(newSpriteX, newSpriteY);
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
      const EYE_REVERT_LIFT_Y = 48;
      const wantCx = body.x + body.width / 2;
      const wantCy = body.y + body.height / 2;

      sprite.setTexture(orig.textureKey, orig.frameName);
      sprite.setScale(orig.scale);
      sprite.setFlipX(false);
      if (sprite.updateDisplayOrigin) sprite.updateDisplayOrigin();
      body.setSize(orig.bodyW, orig.bodyH);
      const revertOffsetX = sprite.flipX
        ? FRAME_WIDTH - BODY_OFFSET_X - BODY_WIDTH
        : BODY_OFFSET_X;
      body.setOffset(revertOffsetX, orig.bodyOffsetY);
      body.allowGravity = orig.allowGravity;
      body.setGravityY(orig.gravityY);
      body.setVelocity(0, 0);
      sprite.isEye = false;
      if (!skipReposition) {
        sprite.setPosition(0, 0);
        if (body.updateFromGameObject) body.updateFromGameObject();
        const offsetCenterX = body.x + body.width / 2;
        const offsetCenterY = body.y + body.height / 2;
        const newSpriteX = wantCx - offsetCenterX;
        const newSpriteY = wantCy - offsetCenterY - EYE_REVERT_LIFT_Y;
        sprite.setPosition(newSpriteX, newSpriteY);
        if (body.reset) body.reset(newSpriteX, newSpriteY);
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

  playKillSfx(killsCount) {
    const n = Math.max(1, Math.min(5, killsCount));
    this.playSfx(`sfx_kill_${n}`, 1);
  }

  addKillFeedEntry(killerIdx, victimIdx, causeKey, opts) {
    if (!this.killFeedEntries) this.killFeedEntries = [];
    const fromNetwork = !!(opts && opts.fromNetwork);
    const cause = KILL_CAUSES[causeKey] || KILL_CAUSES.basic_attack;
    const killer = this.fightersByIndex?.[killerIdx];
    const victim = this.fightersByIndex?.[victimIdx];
    const isSuicide = causeKey === 'fall' || killerIdx === victimIdx;
    const killerColor = killer?.char?.tintColor ?? 0x6b7280;
    const victimColor = victim?.char?.tintColor ?? 0x6b7280;

    const w = KILL_FEED_ENTRY_WIDTH;
    const h = KILL_FEED_ENTRY_HEIGHT;
    const pillW = KILL_FEED_PILL_WIDTH;
    const startX = this.killFeedX + 80;
    const startY = this.killFeedY;
    const c = this.add.container(startX, startY).setScrollFactor(0).setDepth(25);

    // Fundo do cartão: degradê killer → victim (fall: cor sólida do victim)
    const leftColor = isSuicide ? victimColor : killerColor;
    const gradKey = this.ensureKillFeedGradient(leftColor, victimColor);
    const grad = this.add.image(0, 0, gradKey).setOrigin(1, 0).setAlpha(0.55);
    c.add(grad);
    // Borda do cartão por cima do degradê
    const border = this.add.rectangle(0, 0, w, h, 0x000000, 0)
      .setStrokeStyle(2, 0x1e293b, 0.85)
      .setOrigin(1, 0);
    c.add(border);

    const drawPill = (rightAnchor, fighter, fallbackIdx) => {
      const headKey = fighter?.char ? `head_${fighter.char.id}` : null;
      const leftX = rightAnchor - pillW;
      const centerX = leftX + pillW / 2;
      if (headKey && this.textures.exists(headKey)) {
        const head = this.add.image(centerX, h / 2, headKey).setOrigin(0.5);
        const tex = this.textures.get(headKey).getSourceImage();
        const maxDim = Math.max(tex.width || 32, tex.height || 32);
        head.setScale((h - 4) / maxDim);
        c.add(head);
      } else {
        const label = this.add.text(
          centerX, h / 2,
          fighter?.nick || `P${fallbackIdx + 1}`,
          { font: 'bold 11px sans-serif', color: '#ffffff', stroke: '#000000', strokeThickness: 3 }
        ).setOrigin(0.5);
        c.add(label);
      }
    };

    if (!isSuicide) {
      drawPill(-(w - 6) + pillW, killer, killerIdx);
    }

    // ícone de causa centralizado — prioridade: runtimeKey (textura do jogo) > iconKey (customkillfield/) > fallback
    const causeX = -w / 2;
    let drawnIcon = false;
    if (cause.runtimeKey && this.textures.exists(cause.runtimeKey)) {
      const frame = cause.runtimeFrame ?? 0;
      const icon = this.add.image(causeX, h / 2, cause.runtimeKey, frame).setOrigin(0.5);
      const fr = icon.frame;
      const maxDim = Math.max(fr.width || 32, fr.height || 32);
      icon.setScale(KILL_FEED_ICON_PX / maxDim);
      c.add(icon);
      drawnIcon = true;
    } else if (cause.iconKey && this.textures.exists(cause.iconKey)) {
      const icon = this.add.image(causeX, h / 2, cause.iconKey).setOrigin(0.5);
      const tex = this.textures.get(cause.iconKey).getSourceImage();
      const maxDim = Math.max(tex.width || 32, tex.height || 32);
      icon.setScale(KILL_FEED_ICON_PX / maxDim);
      c.add(icon);
      drawnIcon = true;
    }
    if (!drawnIcon) {
      const causeBg = this.add.circle(causeX, h / 2, KILL_FEED_ICON_PX / 2, cause.color, 1)
        .setStrokeStyle(2, 0x000000, 0.6);
      c.add(causeBg);
      const causeText = this.add.text(causeX, h / 2, cause.label, {
        font: 'bold 13px sans-serif', color: '#ffffff', stroke: '#000000', strokeThickness: 3,
      }).setOrigin(0.5);
      c.add(causeText);
    }

    // pílula da vítima (sempre visível) — direita do cartão
    drawPill(-6, victim, victimIdx);

    const entry = { container: c, spawnedAt: this.time.now };
    this.killFeedEntries.push(entry);

    this.tweens.add({
      targets: c,
      x: this.killFeedX,
      duration: 240,
      ease: 'Cubic.easeOut',
    });

    while (this.killFeedEntries.length > KILL_FEED_MAX) {
      this.removeKillFeedEntry(this.killFeedEntries[0]);
    }
    this.layoutKillFeed();

  }

  layoutKillFeed() {
    if (!this.killFeedEntries) return;
    for (let i = 0; i < this.killFeedEntries.length; i++) {
      const e = this.killFeedEntries[i];
      const targetY = this.killFeedY + i * (KILL_FEED_ENTRY_HEIGHT + KILL_FEED_GAP);
      if (e.container.y !== targetY) {
        this.tweens.add({
          targets: e.container,
          y: targetY,
          duration: 200,
          ease: 'Cubic.easeOut',
        });
      }
    }
  }

  updateKillFeed(time) {
    if (!this.killFeedEntries) return;
    for (let i = this.killFeedEntries.length - 1; i >= 0; i--) {
      const e = this.killFeedEntries[i];
      if (time - e.spawnedAt >= KILL_FEED_LIFETIME_MS) {
        this.removeKillFeedEntry(e);
      }
    }
  }

  ensureKillFeedGradient(leftColor, rightColor) {
    const key = `kill_grad_${leftColor.toString(16)}_${rightColor.toString(16)}`;
    if (this.textures.exists(key)) return key;
    const w = KILL_FEED_ENTRY_WIDTH;
    const h = KILL_FEED_ENTRY_HEIGHT;
    const canvas = this.textures.createCanvas(key, w, h);
    const ctx = canvas.getContext();
    const toHex = (c) => `#${c.toString(16).padStart(6, '0')}`;
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, toHex(leftColor));
    grad.addColorStop(0.5, toHex(leftColor));
    grad.addColorStop(0.5001, toHex(rightColor));
    grad.addColorStop(1, toHex(rightColor));
    // queremos um degradê suave — sobrescreve com gradiente liso
    const smooth = ctx.createLinearGradient(0, 0, w, 0);
    smooth.addColorStop(0, toHex(leftColor));
    smooth.addColorStop(1, toHex(rightColor));
    ctx.fillStyle = smooth;
    ctx.fillRect(0, 0, w, h);
    canvas.refresh();
    return key;
  }

  removeKillFeedEntry(entry) {
    if (!entry || entry._removing) return;
    entry._removing = true;
    const idx = this.killFeedEntries.indexOf(entry);
    if (idx >= 0) this.killFeedEntries.splice(idx, 1);
    this.tweens.add({
      targets: entry.container,
      alpha: 0,
      x: entry.container.x + 80,
      duration: KILL_FEED_FADE_MS,
      onComplete: () => entry.container.destroy(),
    });
    this.layoutKillFeed();
  }

  createKillHud() {
    const cam = this.cameras.main;
    const lineH = 20;
    const rows = Math.max(1, this.fighters.length);
    const w = 220;
    const h = lineH * rows + 22;
    const x = cam.width - w - 14;
    const y = 86;
    this.killHudBg = this.add.rectangle(x, y, w, h, 0x0f172a, 0.7)
      .setOrigin(0, 0)
      .setStrokeStyle(2, 0x38bdf8, 0.7)
      .setScrollFactor(0)
      .setDepth(22);
    this.killHudTitle = this.add.text(x + w / 2, y + 4, 'Jogadores', {
      font: 'bold 12px sans-serif',
      color: '#93c5fd',
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(23);
    this.killHudLines = [];
    const sorted = this.fighters.slice().sort((a, b) => a.ownerIndex - b.ownerIndex);
    for (let i = 0; i < sorted.length; i++) {
      const f = sorted[i];
      const row = y + 22 + i * lineH;
      const colorHex = `#${(f.char.tintColor || 0xffffff).toString(16).padStart(6, '0')}`;
      const label = this.add.text(x + 10, row, f.nick || `P${f.ownerIndex + 1}`, {
        font: 'bold 13px sans-serif',
        color: colorHex,
        stroke: '#000000',
        strokeThickness: 2,
      }).setOrigin(0, 0).setScrollFactor(0).setDepth(23);
      const heart = this.add.text(x + w - 70, row, '♥', {
        font: 'bold 13px sans-serif',
        color: '#ef4444',
        stroke: '#000000',
        strokeThickness: 2,
      }).setOrigin(0, 0).setScrollFactor(0).setDepth(23);
      const livesText = this.add.text(x + w - 56, row, `${f.lives ?? 0}`, {
        font: 'bold 13px sans-serif',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2,
      }).setOrigin(0, 0).setScrollFactor(0).setDepth(23);
      const skull = this.add.text(x + w - 28, row, '☠', {
        font: 'bold 13px sans-serif',
        color: '#e5e7eb',
        stroke: '#000000',
        strokeThickness: 2,
      }).setOrigin(0, 0).setScrollFactor(0).setDepth(23);
      const countText = this.add.text(x + w - 10, row, '0', {
        font: 'bold 13px sans-serif',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2,
      }).setOrigin(1, 0).setScrollFactor(0).setDepth(23);
      this.killHudLines.push({ fighter: f, label, heart, livesText, skull, countText });
    }
  }

  updateKillHud() {
    if (!this.killHudLines) return;
    for (const line of this.killHudLines) {
      const k = line.fighter.kills || 0;
      if (line.lastKills !== k) {
        line.lastKills = k;
        line.countText.setText(String(k));
      }
      const lv = line.fighter.lives ?? 0;
      if (line.lastLives !== lv) {
        line.lastLives = lv;
        line.livesText.setText(String(lv));
      }
      const dead = line.fighter.isDead && line.fighter.lives <= 0;
      const a = dead ? 0.4 : 1;
      line.label.setAlpha(a);
      line.heart.setAlpha(a);
      line.livesText.setAlpha(a);
      line.skull.setAlpha(a);
      line.countText.setAlpha(a);
    }
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

  updateStormHud(time) {
    if (!this.stormHudText) return;
    let label = null;
    let endAt = 0;
    let strokeColor = 0xff8c63;
    let labelColor = '#fde047';
    if (this._snowstormActive) {
      label = 'SNOW STORM';
      // _snowstormEndTimer fires at full duration; estimate from last seen elapsed
      endAt = (this._snowstormStartedAt || time) + ICE_BEAM_L2_DURATION_MS;
      strokeColor = 0x88ccff;
      labelColor = '#bae6fd';
    } else if (this._firestormVisualActive) {
      label = 'FIRE STORM';
      // pick the latest end across all buffed fighters
      let maxUntil = 0;
      for (const f of this.fighters || []) {
        if (f && f.fireStormBuff && (f.fireStormBuffUntil || 0) > maxUntil) {
          maxUntil = f.fireStormBuffUntil;
        }
      }
      endAt = maxUntil;
      strokeColor = 0xff8c63;
      labelColor = '#fde047';
    }
    if (!label || !endAt) {
      this.stormHudBg.setVisible(false);
      this.stormHudLabel.setVisible(false);
      this.stormHudText.setVisible(false);
      return;
    }
    const remaining = Math.max(0, endAt - time);
    this.stormHudText.setText(`${(remaining / 1000).toFixed(1)}s`);
    this.stormHudLabel.setText(label);
    this.stormHudLabel.setColor(labelColor);
    this.stormHudBg.setStrokeStyle(2, strokeColor, 0.9);
    this.stormHudBg.setVisible(true);
    this.stormHudLabel.setVisible(true);
    this.stormHudText.setVisible(true);
  }

  applyIncomingHit(target, hit) {
    if (!target || target.isDead) return;
    if (hit.iceTick) {
      this.applyIceTick(target, hit.iceBeamId, hit.iceCasterIndex);
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
    this.damageFighter(target, hit.damage, {
      ignoreShield: !!hit.ignoreShield,
      attackerIndex: hit.attackerIndex,
      useDeath2: !!hit.useDeath2,
      cause: hit.cause,
    });
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
      if (hit.curse) this.applySkullCurse(target, hit.curseLevel || 1, hit.curseWaveId);
      if (hit.burn) this.applyBurn(target, {
        tickDamage: hit.burnTickDamage,
        tickInterval: hit.burnTickInterval,
        duration: hit.burnDuration,
      });
    }
    if (hit.powerFlashColor !== null && hit.powerFlashColor !== undefined) {
      this.triggerPowerFlash(target, hit.powerFlashColor);
    }
  }

  applyEyeHit(target, hit) {
    if (hit.powerFlashColor !== null && hit.powerFlashColor !== undefined) {
      this.triggerPowerFlash(target, hit.powerFlashColor);
    }
    if (hit.attackerIndex !== undefined) {
      target.lastAttackerIndex = hit.attackerIndex;
    }
    if (hit.heavensFury) {
      this.revertFromEye(target, { killAlso: true });
      return;
    }
    if (hit.curse) {
      this.revertFromEye(target);
      this.applySkullCurse(target, hit.curseLevel || 1, hit.curseWaveId);
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
    hit.attackerIndex = this.playerFighter?.ownerIndex ?? this.myIndex ?? 0;
    if (this.isMultiplayer && target !== this.playerFighter) {
      if (!target.isDead) {
        this.triggerHitFlash(target);
        if (hit.powerFlashColor !== null && hit.powerFlashColor !== undefined) {
          this.triggerPowerFlash(target, hit.powerFlashColor);
        }
        if (!target.isEye && hit.damage > 0) {
          const body = target.sprite.body;
          this.spawnDamageNumber(
            body.x + body.width / 2,
            body.y,
            hit.damage,
            '#ffffff',
          );
        }
      }
      this.network.send({ type: 'hit', targetIndex: target.ownerIndex, ...hit });
      return;
    }
    this.applyIncomingHit(target, hit);
  }

  spawnDamageNumber(x, y, amount, color) {
    if (amount <= 0) return;
    const rounded = Math.round(amount);
    if (rounded <= 0) return;
    const jitter = (Math.random() - 0.5) * 16;
    const txt = this.add.text(x + jitter, y - 4, String(rounded), {
      font: 'bold 13px sans-serif',
      color,
      stroke: '#000000',
      strokeThickness: 2,
    })
      .setOrigin(0.5, 1)
      .setDepth(25)
      .setAlpha(0.95);
    this.tweens.add({
      targets: txt,
      y: y - 32,
      alpha: 0,
      duration: 720,
      ease: 'Quad.easeOut',
      onComplete: () => txt.destroy(),
    });
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
      upgraded: f.upgradedPowers ? Array.from(f.upgradedPowers) : [],
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
    if (data.type === 'match_return_to_lobby' || data.type === 'match_restart') {
      if (this._restartingFromNetwork) return;
      this._restartingFromNetwork = true;
      window.dispatchEvent(new CustomEvent('match-return-to-lobby'));
      return;
    }
    if (data.type === 'kill_credit') {
      if (data.isKill !== false) {
        const killer = this.fightersByIndex[data.killerIndex];
        if (killer && data.killerIndex !== data.victimIndex) {
          killer.kills = (killer.kills || 0) + 1;
          if (data.killerIndex === this.myIndex) this.playKillSfx(killer.kills);
        }
      }
      this.addKillFeedEntry(data.killerIndex, data.victimIndex, data.cause || 'basic_attack', { fromNetwork: true });
      return;
    }
    if (data.type === 'ice_beam_aim') {
      if (this.iceBeams) {
        for (const b of this.iceBeams) {
          if (b.beamId === data.beamId) {
            b.aimX = data.aimX;
            b.aimY = data.aimY;
            break;
          }
        }
      }
      return;
    }
    if (data.type === 'double_jump_fx') {
      if (data.index === this.myIndex) return;
      const f = this.fightersByIndex[data.index];
      if (f && !f.isDead) this.spawnDoubleJumpEffect(f);
      return;
    }
    if (data.type === 'snowstorm_end') {
      this.endSnowstorm({ fromNetwork: true });
      return;
    }
    if (data.type === 'mine_explode') {
      if (!this.landMines) return;
      const tol = 60;
      let best = null;
      let bestDist = tol;
      for (const m of this.landMines) {
        if (!m || m.triggered || !m.active) continue;
        const d = Math.hypot(m.x - data.x, m.y - data.y);
        if (d < bestDist) { best = m; bestDist = d; }
      }
      if (best) this.triggerLandMine(best, { visualOnly: true });
      return;
    }
    if (data.type === 'skeleton_killed') {
      if (!this.skeletons) return;
      const target = this.skeletons.find((fox) => fox && fox.netId === data.netId && fox.state !== 'dying');
      if (target) this.startSkeletonDeath(target, { fromNetwork: true });
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
        this.firePower(caster, data.worldX, data.worldY, data.level || 1);
        if (data.bonusX != null) {
          this.time.delayedCall(600, () => {
            if (!caster || caster.isDead) return;
            this.firePower(caster, data.bonusX, 0, 1, { fastTelegraph: true, lowestSurface: true });
          });
        }
        if (data.bonus2X != null) {
          this.time.delayedCall(1200, () => {
            if (!caster || caster.isDead) return;
            this.firePower(caster, data.bonus2X, 0, 1, { fastTelegraph: true, sizeMult: 0.7, lowestSurface: true });
          });
        }
      } else if (data.power === 'shield') {
        if (!caster.isEye) this.applyShield(caster);
      } else if (data.power === 'skull_curse') {
        this.fireSkullCurse(caster, data.worldX, data.worldY, data.level || 1);
      } else if (data.power === 'wheel') {
        if ((data.level || 1) >= 2) this.fireWheelStorm(caster);
        else this.fireWheel(caster, data.worldX);
      } else if (data.power === 'ice_beam') {
        if ((data.level || 1) >= 2) {
          this.castSnowstorm(caster);
        } else {
          this.fireIceBeam(caster, data.worldX, data.worldY, {
            beamId: data.beamId,
            facing: data.facing,
          });
        }
      } else if (data.power === 'fire_storm') {
        this.fireFireStorm(caster, data.level || 1);
      } else if (data.power === 'skeleton_attack') {
        if ((data.level || 1) >= 2) {
          this.fireSkeletonTrio(caster, data.trioOrder, data.trioNetIds, data.trioTypes);
        } else {
          this.throwSkeletonBall(caster, data.worldX, data.worldY);
        }
      } else if (data.power === 'land_mine') {
        if ((data.level || 1) >= 2) {
          this.castLandMineParty(caster, data.partySpawns);
        } else {
          this.throwLandMine(caster, data.worldX, data.worldY);
        }
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
    if (Array.isArray(data.upgraded)) {
      remote.upgradedPowers = new Set(data.upgraded);
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
    if (data.shielded === true && !hasShieldVisual && !remote.isDead) {
      this.applyShield(remote);
    } else if (data.shielded === false && hasShieldVisual) {
      this.removeShield(remote);
    }
  }

  selectPower(powerKey) {
    const f = this.playerFighter;
    if (!f || f.isDead) return;
    this.grantPower(f, powerKey);
    if (this.refreshDevPowerButtons) this.refreshDevPowerButtons();
  }

  grantPower(fighter, powerKey) {
    if (powerKey === 'land_mine') {
      if (
        fighter.specialPowers.includes('land_mine') &&
        !fighter.upgradedPowers.has('land_mine')
      ) {
        fighter.upgradedPowers.add('land_mine');
      } else if (!fighter.specialPowers.includes('land_mine')) {
        if (fighter.specialPowers.length < 2) fighter.specialPowers.push('land_mine');
        else fighter.specialPowers[1] = 'land_mine';
      }
      fighter.landMineCharges = 2;
      return;
    }
    if (
      UPGRADABLE_POWERS.has(powerKey) &&
      fighter.specialPowers.includes(powerKey) &&
      !fighter.upgradedPowers.has(powerKey)
    ) {
      fighter.upgradedPowers.add(powerKey);
      return;
    }
    if (fighter.specialPowers.length < 2) fighter.specialPowers.push(powerKey);
    else fighter.specialPowers[1] = powerKey;
  }

  toggleEyeTransform() {
    const f = this.playerFighter;
    if (!f || f.isDead) return;
    if (f.isEye) this.revertFromEye(f);
    else this.transformToEye(f);
  }

  updateAIFighters(time, delta) {
    if (!this.fighters) return;
    for (const f of this.fighters) {
      if (f === this.playerFighter) continue;
      if (f.isDead) continue;
      if (f.isStunned || f.isFrozen) continue;
      if (f.isEye) continue;
      this.runFighterAI(f, time, delta);
    }
  }

  findNearestEnemy(self) {
    let best = null;
    let bestDist = Infinity;
    const sx = self.sprite.x;
    const sy = self.sprite.y;
    for (const f of this.fighters) {
      if (f === self || f.isDead) continue;
      const dx = f.sprite.x - sx;
      const dy = f.sprite.y - sy;
      const d = dx * dx + dy * dy;
      if (d < bestDist) {
        bestDist = d;
        best = f;
      }
    }
    return best;
  }

  findInterestingLoot(fighter) {
    if (!this.loots || this.loots.length === 0) return null;
    let best = null;
    let bestDist = Infinity;
    const sx = fighter.sprite.x;
    const sy = fighter.sprite.y;
    for (const loot of this.loots) {
      if (!loot || loot.isPickedUp) continue;
      if (!this.isLootBeneficial(fighter, loot)) continue;
      const dx = loot.x - sx;
      const dy = loot.y - sy;
      const d = dx * dx + dy * dy;
      if (d < bestDist && d < 600 * 600) {
        bestDist = d;
        best = loot;
      }
    }
    return best;
  }

  isLootBeneficial(fighter, loot) {
    switch (loot.lootType) {
      case 'hp':
        return fighter.hp < MAX_HP * 0.85;
      case 'shield':
        return (fighter.shieldCharges ?? 0) === 0;
      case 'wood':
      case 'skeleton_attack':
        return (fighter.specialPowers?.length ?? 0) < 2;
      case 'eye':
        return false; // AI não lida bem com eye-form ainda
      default:
        return false;
    }
  }

  shouldPreferLoot(fighter, loot) {
    if (loot.lootType === 'hp' && fighter.hp < MAX_HP * 0.6) return true;
    if (loot.lootType === 'shield' && (fighter.shieldCharges ?? 0) === 0) return true;
    if ((loot.lootType === 'wood' || loot.lootType === 'skeleton_attack') &&
        (fighter.specialPowers?.length ?? 0) < 2) return true;
    return false;
  }

  findNearestSkeletonThreat(self, range) {
    if (!this.skeletons || this.skeletons.length === 0) return null;
    const sx = self.sprite.x;
    const sy = self.sprite.y;
    let best = null;
    let bestDist = Infinity;
    for (const fox of this.skeletons) {
      if (!fox || fox.state === 'dying') continue;
      if (fox.caster === self) continue;
      const dx = fox.x - sx;
      const dy = fox.y - sy;
      const d = dx * dx + dy * dy;
      if (d < range * range && d < bestDist) {
        bestDist = d;
        best = fox;
      }
    }
    return best;
  }

  runFighterAI(fighter, time, delta) {
    const sprite = fighter.sprite;
    const body = sprite.body;
    const target = this.findNearestEnemy(fighter);
    const loot = this.findInterestingLoot(fighter);

    let desiredFlip = sprite.flipX;
    const grounded = body.blocked.down;

    if (grounded && body.velocity.y >= 0) {
      fighter.aiJumpsRemaining = MAX_JUMPS;
    }

    // Decide alvo de movimento (loot tem prioridade quando útil)
    let mvX = null, mvY = null;
    if (loot && (!target || target.isDead || this.shouldPreferLoot(fighter, loot))) {
      mvX = loot.x;
      mvY = loot.y;
    } else if (target && !target.isDead) {
      mvX = target.sprite.x;
      mvY = target.sprite.y;
    }

    if (mvX !== null && !fighter.isAttacking) {
      const dx = mvX - sprite.x;
      const dy = mvY - sprite.y;
      const absDx = Math.abs(dx);

      let speed = MOVE_SPEED;
      if (this.isFighterSlowed(fighter)) speed *= SKULL_CURSE_SLOW_FACTOR;
      if (fighter.iceSlowActive && fighter.iceSlowFactor) speed *= fighter.iceSlowFactor;
      if (fighter.fireStormBuff) speed *= FIRE_STORM_L2_SPEED_MULT;

      // Quando indo pra loot, parar mais perto. Quando perseguindo enemy, manter range de melee.
      const stopDist = (mvX === (loot && loot.x) && mvY === (loot && loot.y)) ? 24 : 80;

      if (absDx > stopDist) {
        this.setSlipperyVel(body, dx < 0 ? -speed : speed, fighter);
      } else {
        this.setSlipperyVel(body, 0, fighter);
      }

      // Face com histerese de 50px
      if (sprite.flipX && dx > 50) desiredFlip = false;
      else if (!sprite.flipX && dx < -50) desiredFlip = true;

      // Pulo (single + double)
      const jumpsLeft = fighter.aiJumpsRemaining ?? MAX_JUMPS;
      const wantsJump =
        (dy < -120 && absDx < 320) ||
        (grounded && absDx > stopDist && Math.random() < 0.003);
      if (wantsJump && time > (fighter.aiNextJumpAt || 0) && jumpsLeft > 0) {
        const isSecond = jumpsLeft < MAX_JUMPS;
        const slowMult = this.isFighterSlowed(fighter) ? SKULL_CURSE_SLOW_FACTOR : 1;
        const slipJumpMult = fighter.iceSlippery ? (fighter.iceJumpFactor || 1) : 1;
        body.setVelocityY((isSecond ? -DOUBLE_JUMP_VELOCITY : -JUMP_VELOCITY) * slowMult * slipJumpMult);
        fighter.aiJumpsRemaining = jumpsLeft - 1;
        fighter.aiNextJumpAt = time + 220;
      }

      // Slam quando alvo está abaixo
      if (!grounded && body.velocity.y > -50 && dy > 100 && Math.random() < 0.05) {
        const slowMult = this.isFighterSlowed(fighter) ? SKULL_CURSE_SLOW_FACTOR : 1;
        body.setVelocityY(SLAM_VELOCITY * slowMult);
      }
    } else if (!fighter.isAttacking) {
      body.setVelocityX(0);
    }

    // Ataque — escolhe entre enemy fighter ou esqueleto inimigo (o que estiver em range)
    if (!fighter.isAttacking && time > (fighter.aiAttackCooldownUntil || 0)) {
      let attackTarget = null;
      if (target && !target.isDead) {
        const dxT = target.sprite.x - sprite.x;
        const dyT = target.sprite.y - sprite.y;
        if (Math.abs(dxT) < 110 && Math.abs(dyT) < 80) attackTarget = target;
      }
      if (!attackTarget) {
        const fox = this.findNearestSkeletonThreat(fighter, 110);
        if (fox) {
          attackTarget = { sprite: { x: fox.x, y: fox.y } };
        }
      }
      if (attackTarget) {
        this.startAIAttack(fighter, attackTarget, time);
      }
    }

    // Cast power
    if (
      target && !target.isDead && !fighter.isAttacking &&
      fighter.specialPowers && fighter.specialPowers.length > 0 &&
      time > (fighter.aiPowerCooldownUntil || 0)
    ) {
      this.tryAICastPower(fighter, target, time);
    }

    // Dodge — sempre roda
    this.tryAIDodge(fighter, time);

    if (desiredFlip !== sprite.flipX) {
      const flipCompensation = (FRAME_WIDTH - 2 * BODY_OFFSET_X - BODY_WIDTH) * SPRITE_SCALE;
      if (fighter.isAttacking) {
        sprite.x -= fighter.attackSpriteShift;
      }
      sprite.x += desiredFlip ? -flipCompensation : flipCompensation;
      sprite.setFlipX(desiredFlip);
      if (fighter.isAttacking) {
        fighter.attackSpriteShift = -fighter.attackSpriteShift;
        sprite.x += fighter.attackSpriteShift;
      }
    }

    const effectiveFrameOffset = fighter.isAttacking && fighter.currentAttackAnim
      ? fighter.currentAttackAnim.charFrameOffsetX
      : BODY_OFFSET_X;
    body.offset.x = sprite.flipX
      ? FRAME_WIDTH - effectiveFrameOffset - BODY_WIDTH
      : effectiveFrameOffset;

    if (!fighter.isAttacking) {
      let animKey;
      if (grounded) {
        animKey = Math.abs(body.velocity.x) > 1 ? fighter.keys.run : fighter.keys.idle;
      } else {
        animKey = body.velocity.y > 0 ? fighter.keys.fall : fighter.keys.jump;
      }
      if (sprite.anims.currentAnim?.key !== animKey) {
        sprite.anims.play(animKey, true);
      }
    }
  }

  startAIAttack(fighter, target, time) {
    const sprite = fighter.sprite;
    const body = sprite.body;
    const dx = target.sprite.x - sprite.x;
    const shouldFlip = dx < 0;

    if (shouldFlip !== sprite.flipX) {
      const flipCompensation = (FRAME_WIDTH - 2 * BODY_OFFSET_X - BODY_WIDTH) * SPRITE_SCALE;
      sprite.x += shouldFlip ? -flipCompensation : flipCompensation;
      sprite.setFlipX(shouldFlip);
      body.offset.x = shouldFlip ? FRAME_WIDTH - BODY_OFFSET_X - BODY_WIDTH : BODY_OFFSET_X;
    }

    fighter.currentAttackAnim = fighter.keys.attackHorizontal;
    const charShift =
      (fighter.currentAttackAnim.charFrameOffsetX - BODY_OFFSET_X) * SPRITE_SCALE;
    fighter.attackSpriteShift = sprite.flipX ? charShift : -charShift;
    sprite.x += fighter.attackSpriteShift;

    fighter.isAttacking = true;
    fighter.aiAttackCooldownUntil = time + 700 + Math.random() * 400;
    sprite.anims.play(fighter.currentAttackAnim.animKey, true);
    this.playSfx('sfx_swing');

    body.setVelocityX(0);

    this.time.delayedCall(160, () => {
      if (!fighter.isAttacking || fighter.isDead) return;
      this.aiAttackHitCheck(fighter);
    });

    this.time.delayedCall(390, () => {
      if (fighter.isAttacking) {
        fighter.isAttacking = false;
        sprite.x -= fighter.attackSpriteShift;
        fighter.attackSpriteShift = 0;
      }
    });
  }

  aiAttackHitCheck(fighter) {
    const sprite = fighter.sprite;
    const body = sprite.body;
    const facing = sprite.flipX ? -1 : 1;
    const hbX = body.x + body.width / 2 + facing * 40;
    const hbY = body.y + body.height / 2;
    const hbW = ATTACK_HITBOX_WIDTH;
    const hbH = ATTACK_HITBOX_HEIGHT;
    const hbLeft = hbX - hbW / 2;
    const hbRight = hbX + hbW / 2;
    const hbTop = hbY - hbH / 2;
    const hbBottom = hbY + hbH / 2;

    for (const t of this.fighters) {
      if (t === fighter) continue;
      if (t.isDead || t.isInvulnerable) continue;
      const tb = t.sprite.body;
      if (
        hbRight > tb.x &&
        hbLeft < tb.x + tb.width &&
        hbBottom > tb.y &&
        hbTop < tb.y + tb.height
      ) {
        this.applyIncomingHit(t, {
          damage: ATTACK_DAMAGE,
          knockbackX: facing * 200,
          knockupY: -160,
          attackerIndex: fighter.ownerIndex,
          burn: !!fighter.fireStormBuff,
          cause: 'basic_attack',
        });
        this.playSfx('sfx_hit');
        if (this.triggerHitFlash) this.triggerHitFlash(t);
      }
    }
    // Também dana esqueletos inimigos no hitbox
    if (this.skeletons && this.skeletons.length > 0) {
      this.damageSkeletonsInRect(fighter, hbLeft, hbRight, hbTop, hbBottom, ATTACK_DAMAGE, new Set());
    }
  }

  tryAICastPower(fighter, target, time) {
    if (!target || target.isDead) return;
    if (fighter.isAttacking || fighter.isStunned || fighter.isFrozen) return;
    const power = fighter.specialPowers[0];
    if (!power) return;
    const sprite = fighter.sprite;
    const tx = target.sprite.x;
    const ty = target.sprite.y;
    const dx = tx - sprite.x;
    const dy = ty - sprite.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    let cast = false;
    if (power === 'shield') {
      if ((fighter.shieldCharges ?? 0) === 0 && fighter.hp < MAX_HP * 0.6) cast = true;
    } else if (power === 'heavens_fury') {
      if (absDx < 700 && Math.random() < 0.25) cast = true;
    } else if (power === 'skull_curse') {
      if (absDx < 600 && Math.random() < 0.2) cast = true;
    } else if (power === 'wheel') {
      if (absDx < 600 && absDy < 100 && Math.random() < 0.35) cast = true;
    } else if (power === 'fire_storm') {
      if (absDx < 250 && absDy < 200 && Math.random() < 0.3) cast = true;
    } else if (power === 'ice_beam') {
      if (absDx < 500 && Math.random() < 0.18) cast = true;
    } else if (power === 'skeleton_attack') {
      if (absDx < 500 && Math.random() < 0.22) cast = true;
    }
    if (!cast) return;

    fighter.aiPowerCooldownUntil = time + 1200 + Math.random() * 600;

    if (power === 'heavens_fury') {
      const level = fighter.upgradedPowers?.has('heavens_fury') ? 2 : 1;
      this.firePower(fighter, tx, ty, level);
      fighter.specialPowers.shift();
      if (level >= 2) fighter.upgradedPowers.delete('heavens_fury');
      if (level >= 2) {
        const ray1HalfWidth = HEAVENS_FURY_STRIKE_HALF_WIDTH * 2;
        const bonusHalfWidth = HEAVENS_FURY_STRIKE_HALF_WIDTH;
        const bX = this.pickHeavensFuryBonusX(
          [{ x: tx, halfWidth: ray1HalfWidth }],
          bonusHalfWidth,
        );
        this.time.delayedCall(600, () => {
          if (!fighter || fighter.isDead) return;
          this.firePower(fighter, bX, 0, 1, { fastTelegraph: true, lowestSurface: true });
        });
        const b2X = this.pickHeavensFuryBonusX(
          [
            { x: tx, halfWidth: ray1HalfWidth },
            { x: bX, halfWidth: bonusHalfWidth },
          ],
          bonusHalfWidth,
        );
        this.time.delayedCall(1200, () => {
          if (!fighter || fighter.isDead) return;
          this.firePower(fighter, b2X, 0, 1, { fastTelegraph: true, sizeMult: 0.7, lowestSurface: true });
        });
      }
    } else if (power === 'shield') {
      fighter.specialPowers.shift();
      this.applyShield(fighter);
    } else if (power === 'skull_curse') {
      const level = fighter.upgradedPowers?.has('skull_curse') ? 2 : 1;
      fighter.specialPowers.shift();
      if (level >= 2) fighter.upgradedPowers.delete('skull_curse');
      this.fireSkullCurse(fighter, tx, ty, level);
    } else if (power === 'wheel') {
      const level = fighter.upgradedPowers?.has('wheel') ? 2 : 1;
      fighter.specialPowers.shift();
      if (level >= 2) fighter.upgradedPowers.delete('wheel');
      if (level >= 2) this.fireWheelStorm(fighter);
      else this.fireWheel(fighter, tx);
    } else if (power === 'fire_storm') {
      const level = fighter.upgradedPowers?.has('fire_storm') ? 2 : 1;
      fighter.specialPowers.shift();
      if (level >= 2) fighter.upgradedPowers.delete('fire_storm');
      this.fireFireStorm(fighter, level);
    } else if (power === 'ice_beam') {
      const level = fighter.upgradedPowers?.has('ice_beam') ? 2 : 1;
      fighter.specialPowers.shift();
      if (level >= 2) fighter.upgradedPowers.delete('ice_beam');
      if (level >= 2) this.castSnowstorm(fighter);
      else this.fireIceBeam(fighter, tx, ty);
    } else if (power === 'skeleton_attack') {
      const level = fighter.upgradedPowers?.has('skeleton_attack') ? 2 : 1;
      fighter.specialPowers.shift();
      if (level >= 2) fighter.upgradedPowers.delete('skeleton_attack');
      if (level >= 2) this.fireSkeletonTrio(fighter);
      else this.throwSkeletonBall(fighter, tx, ty);
    }
  }

  tryAIDodge(fighter, time) {
    if (fighter.isDead || fighter.isAttacking || fighter.isStunned || fighter.isFrozen) return;
    if (time < (fighter.aiDodgeCooldownUntil || 0)) return;
    const sprite = fighter.sprite;
    const body = sprite.body;
    const sx = sprite.x;
    const sy = sprite.y;

    const lists = [this.skullProjectiles, this.wheelProjectiles];
    let nearestThreatDx = null;
    let nearestThreatDist = Infinity;
    for (const list of lists) {
      if (!list) continue;
      for (const p of list) {
        if (!p || p.ownerFighter === fighter) continue;
        const ddx = p.x - sx;
        const ddy = p.y - sy;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dist < 220 && dist < nearestThreatDist) {
          nearestThreatDist = dist;
          nearestThreatDx = ddx;
        }
      }
    }
    if (nearestThreatDx === null) return;

    const grounded = body.blocked.down;
    const slowMult = this.isFighterSlowed(fighter) ? SKULL_CURSE_SLOW_FACTOR : 1;
    const slipJumpMult = fighter.iceSlippery ? (fighter.iceJumpFactor || 1) : 1;
    if (grounded) {
      body.setVelocityY(-JUMP_VELOCITY * slowMult * slipJumpMult);
      fighter.aiJumpsRemaining = (fighter.aiJumpsRemaining ?? MAX_JUMPS) - 1;
    } else if ((fighter.aiJumpsRemaining ?? 0) > 0) {
      body.setVelocityY(-DOUBLE_JUMP_VELOCITY * slowMult * slipJumpMult);
      fighter.aiJumpsRemaining -= 1;
    }
    // Empurra lateralmente pro lado oposto da ameaça
    const sidestepDir = nearestThreatDx > 0 ? -1 : 1;
    body.setVelocityX(sidestepDir * MOVE_SPEED * slowMult);
    fighter.aiDodgeCooldownUntil = time + 700;
  }

  cycleControlledFighter(dir) {
    if (!this.isTestMode || !this.fighters || this.fighters.length <= 1) return;
    const currentIdx = this.fighters.indexOf(this.playerFighter);
    const n = this.fighters.length;
    for (let step = 1; step <= n; step++) {
      const candidateIdx = (currentIdx + dir * step + n * n) % n;
      const candidate = this.fighters[candidateIdx];
      if (candidate && !candidate.isDead && candidate !== this.playerFighter) {
        this.setControlledFighter(candidateIdx);
        return;
      }
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

    if (this.isTestMode) {
      if (Phaser.Input.Keyboard.JustDown(this.powerSelectKeys.p1)) this.selectPower('heavens_fury');
      else if (Phaser.Input.Keyboard.JustDown(this.powerSelectKeys.p2)) this.selectPower('shield');
      else if (Phaser.Input.Keyboard.JustDown(this.powerSelectKeys.p3)) this.selectPower('skull_curse');
      else if (Phaser.Input.Keyboard.JustDown(this.powerSelectKeys.p4)) this.selectPower('wheel');
      else if (Phaser.Input.Keyboard.JustDown(this.powerSelectKeys.p5)) this.selectPower('fire_storm');
      else if (Phaser.Input.Keyboard.JustDown(this.powerSelectKeys.p6)) this.toggleEyeTransform();
      else if (Phaser.Input.Keyboard.JustDown(this.powerSelectKeys.p7)) this.selectPower('ice_beam');
      else if (Phaser.Input.Keyboard.JustDown(this.powerSelectKeys.p8)) this.selectPower('skeleton_attack');
      else if (Phaser.Input.Keyboard.JustDown(this.powerSelectKeys.p9)) this.selectPower('land_mine');
    }

    this.updateLandMines(time, delta);

    if (this.isSinglePlayer) {
      this.updateAIFighters(time, delta);
    }

    if (this.isMultiplayer) {
      this.syncNetwork(time);
    }

    const fighter = this.playerFighter;
    const body = this.player.body;

    for (const f of this.fighters) {
      if (!f.isDead && f.sprite.y > MAP_HEIGHT + 100) {
        this.playSfx('sfx_death_fall');
        // Se sofreu dano nos últimos 2.5s, mantém o killer/cause anterior; senão, suicídio
        const recentDamageWindow = 5000;
        const hasRecentDamage =
          f.lastDamageAt &&
          this.time.now - f.lastDamageAt <= recentDamageWindow &&
          f.lastAttackerIndex !== undefined &&
          f.lastAttackerIndex !== null &&
          f.lastAttackerIndex !== f.ownerIndex;
        // Ícone sempre fica como queda; mas o killer fica como o último atacante (se houve dano recente) ou o próprio (suicídio)
        f.lastDamageCause = 'fall';
        if (!hasRecentDamage) {
          f.lastAttackerIndex = f.ownerIndex;
        }
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
    this.updateStormHud(time);
    this.updateSelfArrow();
    this.updateKillHud();
    this.updateKillFeed(time);
    this.updateIceBeams(time);
    this.updateFrozenStates(time);
    this.updateIceAmbientStop();
    this.updateSkeletons(time, delta);
    this.updateArcherArrows(time);

    if (!fighter.isDead && fighter.isEye && !fighter.isFrozen) {
      const inDash = time < fighter.eyeDashUntil;

      if (Phaser.Input.Keyboard.JustDown(this.keys.exitEye)) {
        this.revertFromEye(fighter);
        return;
      }

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
                useDeath2: true,
                cause: 'eye_attack',
              });
            }
          }
          if (this.isCrowHitByRect(hbLeft, hbRight, hbTop, hbBottom)) {
            this.killCrow();
          }
          this.damageSkeletonsInRect(fighter, hbLeft, hbRight, hbTop, hbBottom, SKELETON_MAX_HP + 1, this.targetsHitThisAttack);
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

      let speed = this.isFighterSlowed(fighter) ? MOVE_SPEED * SKULL_CURSE_SLOW_FACTOR : MOVE_SPEED;
      if (fighter.iceSlowActive && fighter.iceSlowFactor) speed *= fighter.iceSlowFactor;
      if (fighter.fireStormBuff) speed *= FIRE_STORM_L2_SPEED_MULT;
      if (leftDown && !rightDown) {
        this.setSlipperyVel(body, -speed, fighter);
        desiredFlip = true;
      } else if (rightDown && !leftDown) {
        this.setSlipperyVel(body, speed, fighter);
        desiredFlip = false;
      } else {
        this.setSlipperyVel(body, 0, fighter);
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
        const slowMult = this.isFighterSlowed(fighter) ? SKULL_CURSE_SLOW_FACTOR : 1;
        const slipJumpMult = fighter.iceSlippery ? (fighter.iceJumpFactor || 1) : 1;
        body.setVelocityY(
          (isSecondJump ? -DOUBLE_JUMP_VELOCITY : -JUMP_VELOCITY) * slowMult * slipJumpMult
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
        body.setVelocityY(SLAM_VELOCITY * (this.isFighterSlowed(fighter) ? SKULL_CURSE_SLOW_FACTOR : 1));
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
        const slipG = fighter.iceSlippery ? ICE_BEAM_L2_GRAVITY_FACTOR : 1;
        const slowG = fighter.landMinePullSlowed ? LAND_MINE_L2_GRAVITY_FACTOR : 1;
        body.setGravityY(this.physics.world.gravity.y * (multiplier * slipG * slowG - 1));
      } else {
        const slipG = fighter.iceSlippery ? ICE_BEAM_L2_GRAVITY_FACTOR : 1;
        const slowG = fighter.landMinePullSlowed ? LAND_MINE_L2_GRAVITY_FACTOR : 1;
        body.setGravityY(this.physics.world.gravity.y * (slipG * slowG - 1));
      }

      if (this.powerQueued && !fighter.isAttacking && fighter.specialPowers.length > 0) {
        this.castQueuedPower(fighter);
      }
      this.powerQueued = false;

      const leftmostAvailable = this.attackOrbs.indexOf(true);
      if (this.attackQueued && !fighter.isAttacking && !fighter.isCastingIceBeam && leftmostAvailable !== -1) {
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
                useDeath2: true,
                burn: !!fighter.fireStormBuff,
                cause: 'basic_attack',
              });
            }
          }
          if (
            this.isCrowHitByRect(hbLeft, hbRight, hbTop, hbBottom) ||
            (isHorizontal && this.isCrowHitByRect(backLeft, backRight, backTop, backBottom))
          ) {
            this.killCrow();
          }
          this.damageSkeletonsInRect(fighter, hbLeft, hbRight, hbTop, hbBottom, ATTACK_DAMAGE, this.targetsHitThisAttack, { frozenAmount: 90 });
          if (isHorizontal) {
            this.damageSkeletonsInRect(fighter, backLeft, backRight, backTop, backBottom, ATTACK_DAMAGE, this.targetsHitThisAttack, { frozenAmount: 90 });
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
        if (p.x < -60 || p.x > MAP_WIDTH + 60 || p.y > MAP_HEIGHT + 60) {
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
              curseLevel: p.curseLevel || 1,
              curseWaveId: p.waveId || null,
              playHitSfx: true,
              useDeath2: true,
              cause: 'skull_curse',
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
        // L2 rain skulls (falling chuva) should pass through skeletons — they apply poison
        // but keep falling. Otherwise the rain gets gutted by any pet pet on a platform and
        // subsequent waves visually "vanish" mid-air.
        const passThrough = (p.curseLevel || 1) >= 2;
        const hitSkeleton = this.poisonSkeletonsInRect(p.ownerFighter, pLeft, pRight, pTop, pBottom);
        if (!p.hasHit && hitSkeleton && !passThrough) {
          p.hasHit = true;
          p.body.setVelocityX(0);
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
          p.once('animationcomplete-skull_curse_hit', () => p.destroy());
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
      if (r.homingTarget && !r.homingTarget.isDead) {
        const tb = r.homingTarget.sprite.body;
        const tx = tb.x + tb.width / 2;
        const ty = tb.y + tb.height / 2;
        const dx = tx - r.x;
        const dy = ty - r.y;
        const dist = Math.hypot(dx, dy) || 1;
        const speed = r.homingSpeed || FIRE_STORM_L2_SPEED;
        if (dist <= FIRE_STORM_L2_RELEASE_DIST) {
          // Reached the caster — release outward in the direction it was traveling (away from caster)
          const releaseAngle = Math.atan2(-dy, -dx); // away from caster
          r.body.setVelocity(Math.cos(releaseAngle) * speed, Math.sin(releaseAngle) * speed);
          r.setRotation(releaseAngle);
          r.homingTarget = null; // stop homing → travels straight outward until off-map
        } else {
          const newAngle = Math.atan2(dy, dx);
          r.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
          r.setRotation(newAngle);
        }
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
            burn: r.isL2 ? true : false,
            burnTickDamage: r.isL2 ? 2 : undefined,
            burnTickInterval: r.isL2 ? 1000 : undefined,
            burnDuration: r.isL2 ? 4000 : undefined,
            cause: 'fire_storm',
          });
          this.spawnFireStormHit(target);
        }
      }
      if (this.isCrowHitByRect(rLeft, rRight, rTop, rBottom)) {
        this.killCrow();
      }
      this.damageSkeletonsInRect(r.ownerFighter, rLeft, rRight, rTop, rBottom, Math.round(FIRE_STORM_DAMAGE * SKELETON_POWER_CRIT_MULT), r.hitSet);
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
        const now = this.time.now;
        if (now - (w.lastTrailAt || 0) > 30) {
          w.lastTrailAt = now;
          const ghost = this.add.sprite(w.visual.x, w.visual.y, 'wheel', w.visual.frame.name)
            .setScale(w.visual.scaleX, w.visual.scaleY)
            .setOrigin(w.visual.originX, w.visual.originY)
            .setFlipX(w.visual.flipX)
            .setTintFill(0xffffff)
            .setAlpha(0.55)
            .setDepth(w.visual.depth - 0.1)
            .setBlendMode(Phaser.BlendModes.ADD);
          this.tweens.add({
            targets: ghost,
            alpha: 0,
            scaleX: ghost.scaleX * 0.6,
            scaleY: ghost.scaleY * 0.6,
            duration: 240,
            ease: 'Quad.easeOut',
            onComplete: () => ghost.destroy(),
          });
        }
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
          cause: 'wheel',
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
      this.applyWheelToSkeletons(w, wLeft, wRight, wTop, wBottom);
      this.checkLandMineHitByRect(wLeft, wRight, wTop, wBottom, w.ownerFighter);
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
        if (loot.shadow) {
          // sob a base do body — body bottom = platform top quando aterrissa
          loot.shadow.setPosition(loot.x, loot.body.y + loot.body.height + 2);
        }
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
    const hasSkeleton = slot0 === 'skeleton_attack';
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
    this.specialSkeletonSprite.setVisible(hasSkeleton);
    if (hasSkeleton && this.specialSkeletonPulse.paused) {
      this.specialSkeletonPulse.resume();
    } else if (!hasSkeleton && !this.specialSkeletonPulse.paused) {
      this.specialSkeletonPulse.pause();
      this.specialSkeletonSprite.setScale(1);
    }
    if (slot1) {
      const slot1Color =
        slot1 === 'heavens_fury' ? 0xfde047
        : slot1 === 'shield' ? 0x3b82f6
        : slot1 === 'skull_curse' ? 0xa855f7
        : slot1 === 'fire_storm' ? 0xff3b30
        : slot1 === 'skeleton_attack' ? 0xf97316
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
          const isUpgraded = f.upgradedPowers && f.upgradedPowers.has(power);
          icon.setScale(isUpgraded ? 1.7 : 1);
          icon.setStrokeStyle(isUpgraded ? 1.5 : 1, isUpgraded ? 0xffffff : 0x0f172a);
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
