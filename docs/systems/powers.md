# System: Powers

Status: pendente (Sprint 6)

## Sistema de slots

- 2 slots por fighter (`special_powers: Array[String]`, máx 2)
- Q troca a ordem dos slots
- Slot 1 = poder ativo (clique direito usa)
- Poderes coletados via loot wood

## Pool de poderes no loot

```gdscript
const WOOD_POWER_POOL = ["heavens_fury", "skull_curse", "wheel", "fire_storm", "ice_beam"]
```

## HeavensFury

```
Arquivo cena: scenes/powers/HeavensFury.tscn
Telegraph: 1300ms antes do strike
Ground zone: Rect2(alvo_x - 130, surface_y, 260, 110) — dano 100 HP, ignora shield
Beam acima: Rect2(alvo_x - 85, 0, 170, surface_y) — dano 80 HP
Active frames: frame 3–6 do spritesheet HeavensFury_spritesheet.png (128px, 12 frames)
Também destrói loots no mapa.
```

## HolyShield

```
Instância no fighter, não cena separada.
Charges: 2 (SHIELD_CHARGES)
Redução de dano: 80% (amount *= 0.2)
Visual: AnimatedSprite2D com HolyShield_spritesheet.png (64px, 7 frames) em volta do fighter
Pulso: tween scale/alpha a cada 900ms
Quebra shield: hit com breakShield=true consome 1 charge
```

## SkullCurse

```
Arquivo cena: scenes/powers/SkullCurse.tscn (Area2D com velocidade manual)
Velocidade projétil: 600 px/s (direção pelo ângulo mouse→fighter)
Body: 28×22
Em hit: damage=0, aplica debuffs via apply_skull_curse(target)

Debuffs aplicados:
- curse_multiplier = 1.6 por 10s
- curse_slow = true por 2s (move/jump * 0.4)
- DoT: 10 ticks × 3 HP = 30 HP total em 10s
  - DoT ignora shield e curse_multiplier

Sons: skull_cast ao lançar, hit_skull ao acertar (loop durante DoT)
```

## Wheel

```
Arquivo cena: scenes/powers/Wheel.tscn (RigidBody2D)
Velocidade inicial: (dir * 650, -360) — dir baseado em pointerX vs fighterX
Bounce: PhysicsMaterial com bounce=1.0 (X) — implementar bounce Y=0.25 manualmente
Body: 24×24
Hit: damage=25, stun=true, knock_up=-380

Stun (apply_stun):
- is_stunned = true por 4s
- stun_hits_remaining = 3 (3 hits quebram o stun antes do timer)
- Fighter treme (tween rotation -1.5°..+1.5°, 140ms, repeat)
- VFX de estrelas acima da cabeça (stun.png)

Sons: wheel_air (loop no ar), wheel_ground (loop no chão), wheel_hit ao acertar
```

## FireStorm

```
Arquivo cena: scenes/powers/FireStorm.tscn
2 ondas com 1.1s de intervalo
Cada onda: 8 raios em ângulos 0°, 45°, 90°... 315° a partir do caster
Velocidade raio: 520 px/s
Body raio: CircleShape2D radius=21 (42px diameter)
Damage: 18 HP (MAX_HP * 0.18)
Hit set por onda: cada target atingido 1× por onda

VFX: burst glow_orange no centro (ADD blend), raios com 579.png
```

## IceBeam

```
Arquivo cena: scenes/powers/IceBeam.tscn + shaders/IceBeam.gdshader
Estados: casting (0.8s) → active (3s) → done

Casting: mira lerp para direção do mouse (follow_strength=0.035 por frame)
Active: beam renderizado como Line2D + shader

Tick detection (a cada 0.1s):
- Testa 5 pontos do body do alvo vs segmento do beam
- Hit radius: 42px (distância ponto→segmento)
- Em hit: apply_ice_tick(target)

apply_ice_tick:
- ice_hit_count++ (máx 10)
- ice_slow_factor: lerp de 0.55 a 0.15 conforme hit_count sobe
- ice_slow_active = true por 0.7s
- Se ice_hit_count >= 10: freeze por 4s (velocity=0, gravidade pausada)

Sons: ice_cast em loop durante cast+active, ice_crash ao freeze
```

## FlyingEye (transform loot, não castável)

```
Arquivo cena: scenes/powers/FlyingEye.tscn
Não está no WOOD_POWER_POOL — coletado via loot eye (5% raridade)
Transforma o fighter em Flying Eye por 20s

Estado Eye:
- Gravidade = 0
- Movimento 8-direcional: EYE_MOVE_SPEED = 500
- Dash: Space, velocidade 850, duração 0.32s, cooldown 3s
- Ataque: clique, cooldown 3s, hitbox 40px forward + 6px padding

Danos do Eye:
- Ataque normal: 50% MAX_HP (50 HP)
- Dash-combo (ataque dentro de 0.7s após dash): 75% MAX_HP (75 HP)
- Curse + dash-combo: 200% MAX_HP (200 HP)

Eye hits:
- eye_hits_remaining: começa em 2 (base), até 4 com shield loot
- Ao chegar em 0: reverte para fighter normal

Bloqueio: apenas 1 Eye ativo por vez (loot eye não spawna se Eye ativo)
```
