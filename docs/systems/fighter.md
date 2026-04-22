# System: Fighter

Status: pendente (Sprint 2)

## Nó raiz

`Fighter.tscn` — `CharacterBody2D`

## Hierarquia

```
Fighter (CharacterBody2D)
├── CollisionShape2D (CapsuleShape2D: width=16, height=25, offset=(49,55))
├── AnimatedSprite2D (scale=4, centered=false)
├── AttackArea (Area2D, disabled por padrão)
│   └── CollisionShape2D (RectangleShape2D)
└── HUD (Node2D — HP bar + power dots, setScrollFactor equivalente via CanvasLayer separado)
```

## Constantes (Fighter.gd)

```gdscript
const MOVE_SPEED       = 420.0
const JUMP_VELOCITY    = -700.0
const DOUBLE_JUMP_VEL  = -540.0
const SLAM_VELOCITY    = 850.0
const JUMP_LOCKOUT_MS  = 120        # ms entre pulos
const FALL_MULT        = 2.8        # gravidade extra caindo normalmente
const DJUMP_FALL_MULT  = 3.8        # gravidade extra após double jump

const BODY_WIDTH       = 16
const BODY_HEIGHT      = 25
const BODY_OFFSET      = Vector2(49, 55)

const MAX_HP           = 100
const STARTING_LIVES   = 3
const MULTIPLAYER_LIVES = 5
const RESPAWN_DELAY    = 1.5        # segundos
const INVULN_DURATION  = 1.5        # segundos de invulnerabilidade após respawn
const HIT_FLASH_DUR    = 0.28       # segundos
```

## Estados do fighter (variáveis)

```gdscript
var hp: float
var lives: int
var is_dead: bool
var is_invulnerable: bool
var is_attacking: bool
var is_slamming: bool
var is_stunned: bool
var is_frozen: bool
var is_eye: bool                  # modo Flying Eye ativo
var shield_charges: int           # 0, 1 ou 2
var curse_multiplier: float       # 1.0 normal, 1.6 cursado
var special_powers: Array[String] # máx 2 itens
var char_id: String               # "p1", "p2", "p3", "p4"
```

## Física de gravidade

Phaser usava `body.setGravityY(world_gravity * (mult - 1))`.
Godot: aplicar manualmente cada frame.

```gdscript
func _physics_process(delta):
    if not is_on_floor() and velocity.y > 0:
        var mult = DJUMP_FALL_MULT if _double_jumped else FALL_MULT
        velocity.y += ProjectSettings.get("physics/2d/default_gravity") * (mult - 1) * delta
    move_and_slide()
```

## Spritesheets (frame 192×128, escala 4×)

| Animação | Frames | Arquivo |
|---|---|---|
| idle | 6 | player_idle.png |
| run | 4 | player_run.png |
| jump | 3 | player_jump.png |
| fall | 3 | player_fall.png |
| attack_h | 7 | player_attack.png |
| attack_up | 6 | player_attack_up.png |
| attack_down | 6 | player_attack_down.png |
| death | 3 | player_death.png |

## Personagens

Todos usam a mesma cena Fighter.tscn. `char_id` determina a pasta de sprites:
- p1: `assets/sprites/` (raiz)
- p2: `assets/sprites/Player 2/`
- p3: `assets/sprites/Player 3/`
- p4: `assets/sprites/Player 4/`
