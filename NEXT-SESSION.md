# Próxima Sessão

> Última atualização: 2026-04-29
> Sessão anterior: Skeleton Attack L2 (trio: skeleton + omar + archer) implementada — 6 dos 7 power upgrades estão prontos. Commit `a29fcce` pushed pra `origin/main`.

## Estado atual
- Branch `main` no `origin/main` (commit `a29fcce`).
- Phaser 3.80 + Vite + PeerJS rodando local via `npm run dev` (porta padrão 5173).
- Sistema de upgrade de skills (`UPGRADABLE_POWERS`) cobre 6/7 powers: heavens_fury, skull_curse, ice_beam (snowstorm), wheel (storm), fire_storm (heat aura), skeleton_attack (trio).
- HUD timer no topo da tela mostra tempo restante das tempestades de neve/fogo.
- Codex CLI integrado e funcional — `codex exec "<prompt>"` em background gera sprite sheets direto pra `public/sprites/`.

## Por onde começar
1. **Land Mine L2** — único upgrade pendente. Sugestões já discutidas na sessão: minas mais potentes, +1 carga, AoE maior, mina-armadilha invisível. Pedir ao usuário qual direção quer e implementar. Adicionar `'land_mine'` ao `UPGRADABLE_POWERS` (linha ~312 de `GameScene.js`).
2. **Testar interações do trio com powers existentes** — confirmar in-game que omar/archer reagem certinho a HF/wheel/skull curse/ice beam (deveriam herdar via `isSkeletonPet: true`, mas user pediu pra checar). Especial atenção: freeze visual do `applyFreezeSkeleton` em sprites diferentes do skeleton padrão.
3. **Bug pendente skull curse L2 + skeleton hit**: usuário relatou "segunda leva nao desce" quando atinge esqueleto. Apliquei pass-through (linha ~8442 de `GameScene.js`) que aplica poison sem destruir o projétil. Se o problema persistir após o fix, investigar os `delayedCall` de wave 2 (talvez algum side-effect afetando o `fighter` capturado no closure).
4. **Polimento visual residual**: usuário relatou archer sumindo em "alguns frames específicos" do roll/hurt. Encurtei pra 16-21 e 48-51 mas pode haver edge case. Se persistir, isolar o frame específico que dispara o problema.

## Contexto crítico
- **PLATFORM_RECTS** (em `src/map1.js`): 6 plataformas. As "principais" usadas pelo trio L2 são índices **3, 4, 5** (médio-direita y=481, baixo-esquerda y=721, baixo-direita y=925). As outras (0, 1, 2) são pequenas/no topo e não recebem o trio.
- **Spawn do trio NÃO usa bola caindo do céu** — o ball-drop pegava a plataforma mais alta na coluna X (problema com plats 4 e 5 que têm plats 1 e 3 acima delas). Agora `dropTrioBall` chama `fireSkeleton/fireOmar/fireArcher` direto na plataforma com `spawnGreenMaterializeVfx` (flash verde + ground ring + 14 partículas subindo).
- **MP sync via netId determinístico**: cada esqueleto/omar/archer tem `netId = "<casterIdx>-<counter>"` baseado no contador de bolas do caster. `trioOrder`, `trioNetIds`, `trioTypes` viajam no `power_cast` pra todos os clientes terem mesmo layout (qual entidade em qual plataforma).
- **L2 skull curse skulls atravessam esqueletos** (`passThrough = curseLevel >= 2`): aplicam poison mas não destroem. L1 mantém comportamento de destruir no contato.
- **Snowstorm/Firestorm "latest wins"**: castar uma cancela a outra (`endFireStorm()` ou `endSnowstorm()` chamados no início do cast). HUD timer detecta automaticamente qual está ativa pelos flags `_snowstormActive` xor `_firestormVisualActive`.
- **L2 ice beam empoderada (snowstorm caster casta L1)**: 15 dmg/tick (throttled 600ms via `target.snowBeamLastDmgAt`) + instant freeze. Outro player que cast L1 durante a snowstorm não tem empowerment. Verificação por `casterIndex === this._snowstormCaster?.ownerIndex`.
- **Codex CLI**: instalado em `~/AppData/Roaming/npm/codex` (v0.125+). Rodar com `Bash(codex exec "<prompt>", run_in_background=true)`. Resultados aparecem onde o prompt indicar (geralmente em `public/sprites/<power>/`). Não precisa pedir confirmação ao usuário pra rodar — é o fluxo padrão dele. Memória `reference_codex_cli.md` cobre isso.
- **Limite de 2000px em imagens lidas pelo Read tool** — algumas sheets do projeto passam disso (ex: `player_death 2.png` é 2304x1152). Usar PowerShell + `System.Drawing.Image` pra inspecionar dimensões e cortar antes de ler.
- **Formato dos sheets do trio**:
  - `Omar Caveira/Skeleton enemy.png` 832×320, 13×5 grid de 64×64. Anims trimadas pra evitar frames vazios: attack 0-9, die 13-22, walk 26-33, hurt 39-41, idle 52-53.
  - `arqueiro fantastico/spritesheet.png` 512×512, 8×8 grid de 64×64. Anims: run 0-7, die 8-15, roll 16-21, aim 24-27, shoot 32-39 (definido mas NÃO USADO porque tem células vazias), idle 40-43, hurt 48-51 (era 44-47 antes do fix).
- **Archer arrow piercing**: a cada 3ª flecha (`fox.arrowCount % 3 === 0`), spawna roxa/grande (scale 4.5x, tint 0xc084fc, glow_purple_light com pulse), 50 dmg, atravessa todos os fighters via `pierceHitSet` até sair do mapa, trail mais agressivo.

## Pendências conhecidas
- [ ] Land Mine L2 — único upgrade pendente do WOOD_POWER_POOL
- [ ] Confirmar in-game: omar/archer reagem corretamente a todos os powers (HF/wheel/skull curse/ice beam/etc)
- [ ] Testar fix do skull curse L2 com hit em esqueleto — se ainda falhar, investigar mais
- [ ] Edge cases visuais: archer sumindo em algum frame específico do roll/hurt
- [ ] Death 2 anim system tem mais power triggers possíveis (HF L2 instakill, fire storm burn-DOT death) — atualmente só `useDeath2: true` em hits básicos
- [ ] Eye loot está disabled da pool de wood (decisão pendente)

## Arquivos / locais relevantes
- `src/GameScene.js` — main game logic, ~10k linhas, todos os powers e MP sync. Constantes do trio em ~linha 320-345.
- `src/map1.js` — `PLATFORM_RECTS` (6 plats com x/y/w/h) e `MAP_WIDTH=1920, MAP_HEIGHT=1080`
- `src/main.js` — Phaser config, scenes, char selection
- `src/network.js` — wrapper PeerJS pra MP P2P
- `public/sprites/Power 8 (skeleton)/Omar Caveira/` — sheet do omar (com .aseprite source)
- `public/sprites/Power 8 (skeleton)/arqueiro fantastico/` — sheet do archer + `projectile.png` (40×5, flecha)
- `public/sprites/Poder 5 (fire storm)/aura/sheet-transparent.png` — Codex-gerada flame aura (8 frames 128×128)
- `public/maps/Mapa 1 - Graveyard of Souls/` — Fundo.png, Plataformas.png, Hitbox.png, Crow.png, Fundo nevado.png, Fundo fire storm.png
- `public/audio/powers/icebeam/` — snow storm.mp3 (ambient loop), vento.mp3 (skip 1.5s no início), crash ice.mp3, ice cast.mp3
- `public/audio/powers/skull_curse/skull up.mp3` — cast extra da skull curse L2

## Comandos úteis
```bash
npm run dev                  # inicia vite dev server (localhost:5173)
npm run build                # build prod
node -c src/GameScene.js     # syntax check rápido (não roda — só valida parser)
codex exec "<prompt>"        # gera sprite via Codex (rodar em background com run_in_background=true)
git push origin main         # push (já liberado nas permissões)
```
