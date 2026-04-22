# System: Assets

## Localização

Todos os assets ficam em `assets/` na raiz do projeto Godot.

```
assets/
├── sprites/
│   ├── player_idle.png          ← personagem 1 (raiz)
│   ├── player_run.png
│   ├── player_jump.png
│   ├── player_fall.png
│   ├── player_attack.png
│   ├── player_attack_up.png
│   ├── attack down.png          ← atenção: nome com espaço
│   ├── player_death.png
│   ├── Player 2/                ← personagem 2 (mesmos arquivos)
│   ├── Player 3/
│   ├── Player 4/
│   ├── Poder 1 (Heavens Fury)/
│   │   ├── HeavensFury_spritesheet.png  (128px frame, 12 frames)
│   │   └── Smite_spritesheet.png        (64px frame, 11 frames)
│   ├── Poder 2 (Holy Shield)/
│   │   ├── HolyShield_spritesheet.png   (64px frame, 7 frames)
│   │   ├── shield carch.png
│   │   └── shield icon.png
│   ├── Poder 3 (Skull Curse)/
│   │   ├── 518.png                      (projétil)
│   │   ├── Dark VFX 1 (40x32).png       (debuff overlay)
│   │   ├── skull curse loot.png
│   │   └── skull curse loot catch.png
│   ├── Poder 4 (Wheel)/
│   │   ├── mid-Attack 3.png             (wheel sprite)
│   │   ├── mid-Attack 4.png
│   │   ├── mid-Attack 5.png
│   │   ├── stun.png                     (VFX stun)
│   │   └── Wheel loot.png
│   ├── Poder 5 (Fire Storm)/
│   │   ├── 579.png                      (raio spritesheet)
│   │   ├── Fire loot 3.png
│   │   ├── Fite Loot 2.png
│   │   ├── Fite Loot.png
│   │   ├── Fire catch.png
│   │   └── hit.png                      (hit VFX)
│   ├── Poder 6 (Transform Flying Eye)/  ← assets prontos, sem implementação
│   │   ├── Attack.png
│   │   ├── Death.png
│   │   ├── Flight.png
│   │   ├── Take Hit.png
│   │   ├── Loot power 6.png
│   │   ├── Loot Catch power 6.png
│   │   └── eye bite effect.png
│   ├── Power 7 (ice beam)/
│   │   ├── Spell cast.png               (VFX cast)
│   │   ├── particulas ice beam.png
│   │   ├── Player congelado.png         (overlay frozen)
│   │   ├── Ice VFX 1 Hit.png
│   │   ├── loot catch.png
│   │   └── shield carch.png
│   ├── loot/
│   │   ├── wood on map.png
│   │   └── wood catch.png
│   ├── hp/
│   │   └── hp effect.png
│   └── seta/
│       └── seta.png                     (seta do self arrow)
├── audio/
│   ├── bgm.mp3
│   ├── attacks/
│   ├── corvo/
│   ├── heal novo/
│   ├── jump/
│   ├── kills sounds/
│   ├── power catch/
│   ├── Fire Storm/
│   ├── Heavens Fury/
│   ├── Holy Shield/
│   ├── Skull Curse/
│   ├── Wheel/
│   └── ice beam/
└── maps/
    └── map1/
        ├── bg.png                       ← ~2MB, background
        ├── platform.png                 ← plataformas visuais
        └── ...
```

## Notas de importação no Godot

- Todos os spritesheets: Filter Mode = **Nearest** (pixel art)
- Frame sizes por spritesheet:
  - Personagens: 192×128 px
  - HeavensFury: 128×128 px
  - Smite: 64×64 px
  - HolyShield: 64×64 px
  - Skulls/Fire/etc: verificar no arquivo individualmente
- Áudio: deixar no formato original (mp3/wav), Godot importa nativamente

## Atenção: nomes de arquivo com espaços

Vários arquivos têm espaços no nome (ex: `attack down.png`, `mid-Attack 3.png`).
No GDScript usar: `load("res://assets/sprites/attack down.png")` — funciona normalmente.
