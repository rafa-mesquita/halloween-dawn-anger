# System: Loot

Status: pendente (Sprint 5)

## Loot.tscn (Area2D)

```
Loot (Area2D)
├── CollisionShape2D (CircleShape2D: radius=10)
├── AnimatedSprite2D (scale=3.3, frame_size=32)
└── GlowSprite (Sprite2D, CanvasItemMaterial blend_mode=ADD)
```

## Tipos e raridades

| Tipo | Chance | Efeito |
|---|---|---|
| wood | 75% | Concede poder aleatório do WOOD_POWER_POOL |
| hp | 10% | Restaura 50 HP (HP_HEAL_AMOUNT) |
| shield | 10% | Aplica HolyShield (2 cargas) |
| eye | 5% | Transforma em FlyingEye (bloqueado se Eye ativo) |

## Spawn logic (host apenas)

```gdscript
const LOOT_SPAWN_MIN    = 1.5    # segundos entre spawns
const LOOT_SPAWN_MAX    = 3.5
const LOOT_LIFETIME_MIN = 5.0    # segundos até despawn
const LOOT_LIFETIME_MAX = 10.0
const LOOT_MAX_ACTIVE   = 3      # máximo de loots simultâneos

# Posição de spawn (30 tentativas):
# 1. Plataforma aleatória do PLATFORM_RECTS
# 2. X: rect.x + randi_range(40, rect.w - 40)
# 3. Y: rect.y - 80
# 4. Clearance: sem fighters dentro de 60px horizontal
# 5. Distância: sem outros loots dentro de 110px
```

## Pickup

- Detectado via `body_entered` signal do Area2D
- Chama `pickup_loot(loot, fighter)` no GameScene
- wood: adiciona poder ao `special_powers` do fighter (máx 2)
- hp: `fighter.hp = min(MAX_HP, fighter.hp + 50)`
- shield: `apply_shield(fighter)` → shield_charges = 2
- eye: `transform_to_eye(fighter)` — bloqueado se `eye_active` global

## Comportamento especial no Eye mode

- hp loot → reseta eye_hits_remaining + limpa cooldowns
- shield loot → +2 eye_hits (máx EYE_HITS_MAX = 4)
- eye loot → bloqueado enquanto qualquer fighter é Eye
