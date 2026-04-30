# Próxima Sessão

> Última atualização: 2026-04-29
> Sessão anterior: Fix flecha invisível do arqueiro no MP, MP-sync de skeleton_attack castado por bot, e tweak no range do pulo. Commit `2da6002` pushed pra `origin/main`.

## Estado atual
- Branch `main` no `origin/main` (commit `2da6002`).
- Phaser 3.80 + Vite + PeerJS rodando local via `npm run dev` (porta 5173).
- Sistema de upgrade de skills cobre 6/7 powers — falta só `land_mine`.
- 2v2 team mode + bots + attack-reset timer já implementados (commits `3be9d2b`, `9ba5b29`).
- Flecha do arqueiro agora aparece pros remote clients; bot castando skeleton agora também aparece.

## Por onde começar
1. **Estender broadcast de bot AI pros outros powers** — só `skeleton_attack` foi resolvido. Mesmo bug afeta `heavens_fury`, `skull_curse`, `wheel`, `fire_storm`, `ice_beam`, `shield` quando castados por bot (host roda AI sem broadcast). Padrão pronto: usar `broadcastBotPowerCast` (linha ~8474 de `GameScene.js`).
2. **Land Mine L2** — único upgrade pendente do `UPGRADABLE_POWERS` (linha ~312 de `GameScene.js`). Pedir direção ao usuário (mais potente, +1 carga, AoE maior, mina-armadilha).
3. **Testar in-game o fix da flecha + bot skeleton no MP** — confirmar que arrow aparece pros 2 jogadores e que bot castando skeleton spawna trio/ball em ambos os lados.
4. **Verificar interações trio L2 com powers** — pendência da sessão anterior, ainda não foi testada (omar/archer reagem corretamente a HF/wheel/skull curse/ice beam).

## Contexto crítico
- **Bug da flecha invisível**: a AI do skeleton/archer roda em todos os clientes (`updateSkeletons` sem gate de MP). O spawn da flecha estava gated por `isAuthoritativeOwner(caster)`, fazendo só o autoritativo ver a flecha. Fix: removido o gate no spawn (linha ~5662 de `GameScene.js`); o dano continua gated dentro de `updateArcherArrows` (linha ~5325). Trade-off: pode haver leve desync visual da flecha já que cada cliente computa vx/vy a partir da posição local do fox, mas as posições do fox são ~consistentes via AI determinística + state messages.
- **Bug do bot skeleton invisível no MP**: `tryAICastPower` (que só roda no host pros bots) chamava `fireSkeletonTrio`/`throwSkeletonBall` localmente sem mandar `power_cast` pela rede. Fix: novo helper `broadcastBotPowerCast(fighter, power, params)` que o host usa quando bot casta. Usa `casterIndex = fighter.ownerIndex` (não `myIndex`).
- **Mesmo bug em outros powers**: heavens_fury, skull_curse, wheel, fire_storm, ice_beam, shield castados por bot continuam não broadcastando. User não pediu pra fixar todos — só skeleton.
- **Jump velocity tweak**: 700→740 (single), 540→580 (double). Bumb de ~6% no airtime. User testou 820/640 e achou alto demais. Atual foi escolha do user diretamente.
- **PLATFORM_RECTS** (em `src/map1.js`): 6 plataformas. Trio L2 sempre nas índices **3, 4, 5** (médio-direita y=481, baixo-esquerda y=721, baixo-direita y=925).
- **MP sync via netId determinístico**: `netId = "<casterIdx>-<counter>"` baseado no `caster.skeletonSpawnCounter`. `trioOrder`, `trioNetIds`, `trioTypes` viajam no `power_cast` pra L2.
- **Snowstorm/Firestorm "latest wins"**: castar uma cancela a outra; HUD timer detecta automaticamente pelo flag ativo.
- **Codex CLI**: `codex exec "<prompt>"` em background, gera sheets em `public/sprites/`. Não pedir confirmação — fluxo padrão.
- **Limite de 2000px no Read tool**: algumas sheets passam disso (ex: `player_death 2.png` 2304x1152). Usar PowerShell + `System.Drawing.Image` pra inspecionar dimensões antes.

## Pendências conhecidas
- [ ] Estender `broadcastBotPowerCast` pros outros 6 powers (heavens_fury, skull_curse, wheel, fire_storm, ice_beam, shield)
- [ ] Land Mine L2 — único upgrade pendente do `UPGRADABLE_POWERS`
- [ ] Confirmar in-game: omar/archer reagem corretamente a todos os powers (HF/wheel/skull curse/ice beam/etc)
- [ ] Testar in-game os 2 fixes desta sessão (flecha visível + bot skeleton sync)
- [ ] Edge cases visuais: archer sumindo em algum frame específico do roll/hurt (pendente da sessão anterior)
- [ ] Death 2 anim system tem mais power triggers possíveis (HF L2 instakill, fire storm burn-DOT death) — atualmente só `useDeath2: true` em hits básicos
- [ ] Eye loot disabled da pool de wood (decisão pendente)
- [ ] AI da `Math.random()` para roll do archer (linha ~5760) pode causar pequeno desync de estado entre clientes — não crítico

## Arquivos / locais relevantes
- `src/GameScene.js` — main game logic (~10k linhas).
  - Constantes de jump (linhas 5-6): `JUMP_VELOCITY=740, DOUBLE_JUMP_VELOCITY=580`
  - Constantes do trio (linhas ~320-348)
  - `spawnArcherArrow` (linha ~5235), `updateArcherArrows` (linha ~5287)
  - `fireArcher` (linha ~5074), `fireSkeleton` (linha ~4930), `fireOmar` (linha ~5014)
  - `fireSkeletonTrio` (linha ~5134), `dropTrioBall` (linha ~5175)
  - `tryAICastPower` (linha ~8363), `broadcastBotPowerCast` (linha ~8474)
  - Receiver `power_cast` em `handleNetState` (linha ~7846)
  - `isAuthoritativeOwner` (linha ~7681)
- `src/map1.js` — `PLATFORM_RECTS`, `MAP_WIDTH=1920`, `MAP_HEIGHT=1080`
- `src/network.js` — wrapper PeerJS p/ MP P2P
- `src/main.js` — Phaser config, gravity y=800
- `public/sprites/Power 8 (skeleton)/Omar Caveira/` — sheet do omar
- `public/sprites/Power 8 (skeleton)/arqueiro fantastico/` — sheet do archer + `projectile.png`

## Comandos úteis
```bash
npm run dev                  # inicia vite dev server (localhost:5173)
npm run build                # build prod
node --check src/GameScene.js  # syntax check rápido
codex exec "<prompt>"        # gera sprite via Codex (rodar em background)
rtk git push                 # push (já liberado nas permissões)
```
