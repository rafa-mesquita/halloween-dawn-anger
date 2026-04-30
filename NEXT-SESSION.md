# Próxima Sessão

> Última atualização: 2026-04-30
> Sessão anterior: Auditoria MP completa — fixes pra reliable channel, skull curse dedupe, bot loot pickup em MP, wheel/skull L2 sync determinístico, friendly fire snowstorm 2v2, isDead state guard, e broadcast de bot AI pros 6 powers que faltavam. Commits `4853bfa` + `53177f8`.

## Estado atual
- Branch `main`, commits novos (`4853bfa`, `53177f8`) — não pushed ainda.
- Phaser 3.80 + Vite + PeerJS rodando local via `npm run dev` (porta 5173).
- Sistema de upgrade de skills cobre todos os 7 powers.
- 2v2 team mode + bots + attack-reset timer já implementados.
- MP P2P agora usa canal **reliable** (PeerJS SCTP ordenado) — packets críticos não perdem mais.
- Bots em MP agora pegam loot e broadcastam todos os 7 powers.

## Por onde começar
1. **Push pra `origin/main`** se quiser publicar os fixes.
2. **Testar in-game os fixes do MP** — montar 2 instâncias (host + client) e verificar:
   - Bot pegando loot em MP (host vê e cliente também).
   - Bot castando heavens_fury / skull_curse / wheel / fire_storm / ice_beam / shield aparece pros remotes.
   - Wheel L2 e Skull Curse rain L2 caem nas mesmas posições nos 2 clientes.
   - Snowstorm 2v2 não slowa aliado.
   - Aliado em 2v2 não é freezed pelo próprio time.
3. **Verificar interações trio L2 com powers** — pendência antiga (omar/archer reagem corretamente a HF/wheel/skull curse/ice beam).

## Contexto crítico
- **PeerJS reliable channel** ([network.js:236](src/network.js#L236)): trocou `reliable: false` → `true`. Latência um pouco maior, mas garante ordering + entrega. Mata uma classe inteira de bugs (loot fantasma, kill_credit perdido, snowstorm eterno, etc).
- **Snowstorm/Firestorm L2 sync**: ambos os receivers chamam `castSnowstorm`/`fireFireStorm` que agendam timer local — então cada cliente tem seu próprio timer de fim. Não há bug de "buff eterno" se caster desconectar.
- **Wheel L2 e Skull Curse rain L2**: caster pré-computa `wheelSpecs` / `rainSpecs` (posições, dirs, sizeMult, waveId) e envia via `power_cast`. Receivers replicam exatamente a sequência.
- **Skull Curse dedupe**: `target.curseSeenWaveIds` (Set) garante que 2 caveiras da mesma wave aplicam só 1 stack.
- **Bot loot pickup**: host itera bots em `updateLoots` (só em MP) e chama `pickupLoot(loot, bot)` quando há overlap. `pickupLoot` broadcasta usando `fighter.ownerIndex` e guard `isAuthoritativeOwner(fighter)`.
- **Bot AI broadcasts**: `tryAICastPower` agora chama `broadcastBotPowerCast` pra todos os 7 powers (antes só `skeleton_attack`).
- **PLATFORM_RECTS** (em `src/map1.js`): 6 plataformas. Trio L2 sempre nas índices **3, 4, 5**.
- **MP sync via netId determinístico**: `netId = "<casterIdx>-<counter>"` baseado no `caster.skeletonSpawnCounter`.
- **Codex CLI**: `codex exec "<prompt>"` em background, gera sheets em `public/sprites/`. Não pedir confirmação.

## Pendências conhecidas
- [ ] Push de `4853bfa` + `53177f8` pra `origin/main`.
- [ ] Testar in-game os fixes do MP (bot loot, bot broadcasts, wheel/skull sync determinístico, friendly fire 2v2).
- [ ] Confirmar in-game: omar/archer reagem corretamente a todos os powers (HF/wheel/skull curse/ice beam/etc).
- [ ] Edge cases visuais: archer sumindo em algum frame específico do roll/hurt.
- [ ] Death 2 anim system tem mais power triggers possíveis (HF L2 instakill, fire storm burn-DOT death) — atualmente só `useDeath2: true` em hits básicos.
- [ ] Eye loot disabled da pool de wood (decisão pendente).
- [ ] **Suspeitas do agent ainda não validadas**: pet HP authority/divergência (suspeita #16) e throw skeleton ball position divergence (suspeita #17). Precisa investigação direcionada.
- [ ] Archer roll com `Math.random()` (~linha 5796) — pequeno desync de estado entre clientes; não crítico, mas afeta timing de `arrowCount % 3 === 0` (piercing). Fix proper: PRNG determinística seedada por `fox.netId`.

## Arquivos / locais relevantes
- `src/GameScene.js` — main game logic (~10k linhas).
  - Constantes de jump (linhas 5-6): `JUMP_VELOCITY=740, DOUBLE_JUMP_VELOCITY=580`
  - `applySkullCurse` (linha ~3963), `removeSkullCurse` (linha ~4042)
  - `buildSkullCurseRainSpecs` (linha ~3904), `fireSkullCurseRain` (linha ~3922)
  - `buildWheelStormSpecs` (linha ~3245), `fireWheelStorm` (linha ~3271)
  - `castSnowstorm` (linha ~4564) com filtro isFriendly
  - `fireIceBeam` (linha ~4109)
  - `pickupLoot` (linha ~2795), `updateLoots` (linha ~9437) — bot pickup em MP
  - `tryAICastPower` (linha ~8406), `broadcastBotPowerCast` (linha ~8516)
  - Receiver `power_cast` em `handleNetState` (linha ~7889)
  - `isAuthoritativeOwner` (linha ~7724)
- `src/map1.js` — `PLATFORM_RECTS`, `MAP_WIDTH=1920`, `MAP_HEIGHT=1080`
- `src/network.js` — wrapper PeerJS p/ MP P2P (agora `reliable: true` no `peer.connect`)
- `src/main.js` — Phaser config, gravity y=800

## Comandos úteis
```bash
npm run dev                  # inicia vite dev server (localhost:5173)
npm run build                # build prod
node --check src/GameScene.js  # syntax check rápido
codex exec "<prompt>"        # gera sprite via Codex (rodar em background)
rtk git push                 # push (já liberado nas permissões)
```
