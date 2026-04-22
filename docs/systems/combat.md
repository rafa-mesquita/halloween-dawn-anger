# System: Combat

Status: pendente (Sprint 3)

## Hitboxes de ataque

| Direção | Largura | Altura | Frames ativos (0-based) |
|---|---|---|---|
| horizontal | 95 | 75 | 2–4 |
| up | 75 | 125 | 2–3 |
| down | 75 | 125 | 2–3 |

A hitbox horizontal tem um "back hitbox" menor para acertar alvos atrás do fighter.

## Direção do ataque

Calculada pelo ângulo do mouse ao centro do fighter:
- `|angle| < 45°` → horizontal (frente)
- `|angle| > 135°` → horizontal (costas)
- `angle < -45° && > -135°` → up
- `angle > 45° && < 135°` → down

Down-attack no chão é redirecionado para horizontal.

## Dano base

`ATTACK_DAMAGE = 17` HP por hit. Um hit por alvo por swing (Set `targets_hit_this_attack`).

## Call chain

```gdscript
deal_hit(target, hit)
  └── se multiplayer e não autoridade → target.rpc("apply_incoming_hit", hit)
  └── se local → target.apply_incoming_hit(hit)

apply_incoming_hit(hit)
  ├── se is_invulnerable ou is_dead → return
  ├── se ice_tick → apply_ice_tick()
  ├── se is_eye → apply_eye_hit()
  ├── damage_fighter(amount)
  ├── velocity.x = knock_dir * 140 → zerar após 120ms
  └── velocity.y = knock_up_y (instantâneo)

damage_fighter(amount)
  ├── amount *= curse_multiplier
  ├── se shield_charges > 0 → amount *= 0.2, shield_charges -= 1
  ├── hp = max(0, hp - amount)
  ├── spawn_damage_number(amount)
  ├── trigger_hit_flash()  # branco 280ms
  └── se hp <= 0 → kill_fighter()
```

## Knockback

- X: `velocity.x = knock_dir * 140` → zerаr após `0.12s` via timer
- Y por direção:
  - horizontal → -80
  - vertical (up/down) → ±160

## Morte e respawn

```
kill_fighter()
  → play death animation (duração ~1s)
  → hide fighter
  → await 1.5s
  → respawn_fighter() em posição aleatória de plataforma
  → invulnerável por 1.5s
```

Em multiplayer, 0 vidas = eliminado permanentemente (banner de spectator).

## Orbs de ataque

- `MAX_ATTACK_ORBS = 4`
- Cada ataque consome 1 orb
- `ORB_FULL_RESET_MS = 4000` — reset completo após 4s sem atacar
- HP/Shield pickup reseta orbs imediatamente

## Autoridade de dano (multiplayer)

O target aplica o dano na própria instância (`@rpc("any_peer","reliable")`).
O atacante só envia o pacote. Isso evita duplicação mas aceita possível dessincronia leve.
