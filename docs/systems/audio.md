# System: Audio

Status: pendente (Sprint 7)

## AudioManager.gd (Autoload)

```gdscript
var master_volume: float = 1.0  # controlado pelo usuário via UI

func play_sfx(key: String, volume_mult: float = 1.0) -> AudioStreamPlayer:
    # Cria AudioStreamPlayer, toca e destrói ao terminar
    # volume_db = linear_to_db(master_volume * volume_mult)

func play_bgm() -> void:
    # AudioStreamPlayer dedicado, loop=true, volume = 0.35 * master_volume

func stop_sfx(player: AudioStreamPlayer) -> void:
    # Para e destrói o player (para sons em loop como Wheel/IceBeam)
```

## Mapeamento de chaves → arquivos

| Chave (SFX_MAP) | Caminho em assets/audio/ |
|---|---|
| `bgm` | `bgm.mp3` |
| `jump` | `jump/30_Jump_03.wav` |
| `attack_swing` | `attacks/Hit.mp3` |
| `attack_hit` | `attacks/atack.mp3` |
| `power_catch` | `power catch/power cath.mp3` |
| `heal` | `heal novo/93eeb9fc-8eab-44db-aa09-270a2550a130.mp3` |
| `crow_die` | `corvo/corvo die.mp3` |
| `heavens_fury_cast` | `Heavens Fury/Cast.mp3` |
| `heavens_fury_second` | `Heavens Fury/Second.mp3` |
| `heavens_fury_belezam` | `Heavens Fury/belezam.mp3` |
| `shield_cast` | `Holy Shield/cast.mp3` |
| `shield_break` | `Holy Shield/broke shield.mp3` |
| `skull_cast` | `Skull Curse/cast skull curse.mp3` |
| `skull_hit` | `Skull Curse/hit skull.mp3` |
| `fire_cast` | `Fire Storm/Cast and wave 2.mp3` |
| `fire_cast_2` | `Fire Storm/Cast and wave 2_2.mp3` |
| `wheel_air` | `Wheel/Moviment_Air.mp3` |
| `wheel_ground` | `Wheel/Moviment_ground.mp3` |
| `wheel_hit` | `Wheel/Hit.mp3` |
| `wheel_hit_2` | `Wheel/hit2.mp3` |
| `ice_cast` | `ice beam/ice cast.mp3` |
| `ice_crash` | `ice beam/crash ice.mp3` |
| `kill_1` | `kills sounds/1-kill.mp3` |
| `kill_2` | `kills sounds/2-kills.mp3` |
| `kill_3` | `kills sounds/3-kills.mp3` |
| `kill_4` | `kills sounds/4-kills.mp3` |
| `kill_5` | `kills sounds/5-kills.mp3` |

## Sons em loop (requerem referência para parar)

- `wheel_air` — enquanto Wheel está no ar
- `wheel_ground` — enquanto Wheel está rolando no chão
- `skull_hit` — durante DoT do Skull Curse
- `ice_cast` — durante cast + active do Ice Beam

Estes devem ser criados com `play_sfx_loop(key)` que retorna o player para posterior `stop_sfx(player)`.

## Volume BGM

BGM toca a 35% do master volume (`volume_mult = 0.35`).
