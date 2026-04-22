# Agent README — halloween-dawn-anger (Godot 4 Port)

## O que é este projeto

Port de um platform fighter 2D (Phaser 3 + PeerJS → Godot 4 GDScript).
Jogo: arena single-screen, até 4 jogadores locais/online, 7 poderes, estilo Chaos Faction.
Branch: `godot-port` — JS foi removido, apenas assets (sprites/audio/maps) foram mantidos.

## Como navegar

| Documento | Conteúdo |
|---|---|
| `docs/progress.md` | Checklist de sprints — o que está feito |
| `docs/systems/fighter.md` | Física, movimento, estados do personagem |
| `docs/systems/combat.md` | Hitboxes, dano, knockback, morte/respawn |
| `docs/systems/powers.md` | Cada poder implementado |
| `docs/systems/loot.md` | Sistema de loot (spawn, pickup, tipos) |
| `docs/systems/ui.md` | HUD, lobby, menus |
| `docs/systems/audio.md` | AudioManager, mapeamento de sons |
| `docs/systems/network.md` | Multiplayer, RPCs, autoridade de dano |
| `docs/systems/assets.md` | Mapeamento de assets JS → Godot |
| `docs/decisions/architecture.md` | Decisões de design não óbvias |

## Estrutura do projeto Godot (raiz do repo)

```
/ (raiz)
├── project.godot
├── assets/sprites/   ← spritesheets dos personagens e poderes
├── assets/audio/     ← todos os SFX e BGM
├── assets/maps/      ← background e elementos do mapa
├── scenes/
│   ├── game/         ← GameScene (cena principal)
│   ├── fighter/      ← Fighter.tscn (CharacterBody2D)
│   ├── powers/       ← uma cena por poder
│   ├── loot/         ← Loot.tscn (Area2D)
│   ├── ui/           ← HUD.tscn, Lobby.tscn
│   └── vfx/          ← DamageNumber.tscn, etc
├── scripts/
│   ├── autoloads/    ← GameState, AudioManager, NetworkManager
│   └── constants/    ← Map1.gd, Powers.gd
├── shaders/          ← IceBeam.gdshader
├── _legacy/          ← arquivos JS originais (ignorado pelo git)
├── docs/             ← docs para agentes (este arquivo)
└── docs-agent/       ← script do Stop hook documentador
```

## Autoloads registrados

- `GameState` → `res://scripts/autoloads/GameState.gd`
- `AudioManager` → `res://scripts/autoloads/AudioManager.gd`
- `NetworkManager` → `res://scripts/autoloads/NetworkManager.gd`

## Valores críticos (fonte: GameScene.js original)

- Viewport: 1536 × 1024
- Gravidade: 800 px/s²
- MOVE_SPEED: 420, JUMP_VELOCITY: -700, DOUBLE_JUMP_VEL: -540
- MAX_HP: 100, ATTACK_DAMAGE: 17
- FALL_MULT: 2.8, DJUMP_FALL_MULT: 3.8

## Sprint atual

Ver `docs/progress.md`.
