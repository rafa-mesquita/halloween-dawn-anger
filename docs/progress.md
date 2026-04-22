# Progress — Godot 4 Port

## Sprint 0 — Setup
- [x] Branch `godot-port` criada
- [x] Arquivos JS removidos (src/, index.html, package.json, vite.config.js)
- [x] Assets copiados para godot/assets/ (sprites, audio, maps)
- [x] Estrutura de pastas criada (raiz, não subpasta godot/)
- [x] Assets movidos para `assets/` na raiz
- [x] Arquivos JS legados movidos para `_legacy/` (git ignored)
- [x] `.gitignore` atualizado
- [x] Agente documentador configurado (Stop hook + docs-agent/update_docs.sh)
- [x] Docs iniciais completos (AGENT_README, progress, fighter, combat, powers, loot, ui, audio, network, assets, decisions)
- [ ] `project.godot` criado no Godot Editor (abrir Godot → New Project na raiz do repo)
- [ ] Autoloads registrados no Project Settings

## Sprint 1 — Mapa e Física
- [ ] `scripts/constants/Map1.gd` com PLATFORM_RECTS
- [ ] `scenes/game/GameScene.tscn` com StaticBody2D por plataforma (one_way=true)
- [ ] Background + parallax (ParallaxBackground + 2 ParallaxLayer)
- [ ] Chuva (GPUParticles2D)
- [ ] Crow NPC (AnimatedSprite2D + Timer respawn 3s)

## Sprint 2 — Fighter Base
- [ ] `scenes/fighter/Fighter.tscn` (CharacterBody2D + AnimatedSprite2D)
- [ ] `scripts/autoloads/GameState.gd`
- [ ] Movimento horizontal (MOVE_SPEED=420)
- [ ] Pulo simples e duplo (-700 / -540)
- [ ] Gravidade extra na queda (FALL_MULT=2.8, DJUMP_FALL_MULT=3.8)
- [ ] Slam (velocidade +850 para baixo)
- [ ] Drop-through (S no chão)
- [ ] Todas as animações carregadas (idle, run, jump, fall, attack×3, death)
- [ ] 4 personagens via char_id

## Sprint 3 — Combate
- [ ] Hitbox de ataque por direção (ângulo do mouse)
- [ ] Active frames corretos (h: 2–4, up/down: 2–3)
- [ ] `deal_hit()` / `apply_incoming_hit()` / `damage_fighter()`
- [ ] Knockback (X: 140 por 120ms, Y: -80 ou ±160)
- [ ] Orbs de ataque (4 orbs, reset após 4s)
- [ ] Flash de hit (branco 280ms)
- [ ] DamageNumber.tscn flutuando
- [ ] Sistema de vidas + morte + respawn (1.5s delay)

## Sprint 4 — HUD
- [ ] CanvasLayer com HP bar, vidas, orbs, slots de poder
- [ ] HP bar acima de cada fighter
- [ ] Seta bobbing acima do próprio fighter

## Sprint 5 — Loot
- [ ] `scenes/loot/Loot.tscn`
- [ ] Spawn com timing (1.5–3.5s, máx 3 ativos)
- [ ] 4 tipos com raridades (wood 75%, hp 10%, shield 10%, eye 5%)
- [ ] Clearance check no spawn
- [ ] Pickup via Area2D.body_entered
- [ ] Despawn após 5–10s

## Sprint 6 — Poderes
- [ ] `scripts/constants/Powers.gd`
- [ ] Sistema de slots (2 slots, Q troca)
- [ ] HeavensFury (telegraph 1.3s, dano 100/80)
- [ ] HolyShield (2 cargas, 80% redução)
- [ ] SkullCurse (projétil 600px/s, DoT 30HP/10s, slow 40% 2s, mult 1.6×)
- [ ] Wheel (RigidBody2D, bounce, stun 4s, 3 hits quebra)
- [ ] FireStorm (2 ondas × 8 raios, dano 18HP)
- [ ] IceBeam (cast 0.8s, beam 3s, freeze a 10 hits, 4s frozen)
- [ ] FlyingEye (transform 20s, voo livre, dash, bite)

## Sprint 7 — VFX & Áudio
- [ ] `scripts/autoloads/AudioManager.gd`
- [ ] BGM em loop (35% volume)
- [ ] Todos os SFX mapeados (ver docs/systems/audio.md)
- [ ] VFX: double jump ring, slam trail, hit flash, damage number

## Sprint 8 — Multiplayer
- [ ] `scripts/autoloads/NetworkManager.gd` (ENet ou WebRTC)
- [ ] Lobby host/join com código 5 dígitos
- [ ] State sync 30Hz
- [ ] Damage authority (target aplica via RPC)
- [ ] Power cast sync
- [ ] Loot sync (host autoridade)
