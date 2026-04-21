# Próxima Sessão

> Última atualização: 2026-04-21
> Sessão anterior: Implementado **Poder 8 — Skeleton Attack** (esqueleto Skeleton_White com 6 anims), bola arremessada que spawna o skeleton no topo da plataforma onde cai, freeze pelo ice beam, poison pelo skull curse, insta-kill por HF/Eye, wheel pass-through com stun+knockup, +30% crit damage de poderes, HP bar colorida por caster, damage numbers, todos os 5 SFX wirados, e fixes diversos (HP bar visual, hitbox separada da escala visual, ball quica em paredes laterais).

## Estado atual
- Branch `main`. Commit pendente com o Power 8 completo (não pushed ainda — ver "Por onde começar").
- **8 poderes funcionais** (HF, Shield-insta, SkullCurse, Wheel, FireStorm, Eye, IceBeam, **SkeletonAttack**) + sistema 2 slots + Q swap. Pool atualizado em `WOOD_POWER_POOL` para 6 opções (Eye e Shield ficam fora do pool).
- Single-player: tecla **1-8** seleciona o poder no slot 0 instantaneamente; **scroll do mouse** cicla entre personagens vivos. Multiplayer ignora ambos.
- Skeleton tem comportamento autônomo: patrulha a plataforma onde foi conjurado, ataca melee em alcance, alterna `attack1`/`attack2`, dá 30 dmg, cooldown 1.2s, 150 HP, duel skeleton-vs-skeleton se de casters diferentes na mesma plataforma.

## Por onde começar
1. **Testar Skeleton em playthrough completo** — todas as interações: HF insta-kill, Eye insta-kill, Wheel knockup+stun pass-through, Skull Curse poison loop até morte, Ice Beam freeze + 90 dmg melee no congelado, +30% crit em Wheel/FireStorm. Validar perto E longe (bug do ice beam de perto foi corrigido nesta sessão — ampliação das amostras).
2. **Commit + push** do trabalho da sessão. Está tudo working dir, nada pushed. Mensagem sugerida: "Power 8: Skeleton Attack (full implementation + interactions with all powers)".
3. **Avaliar balanceamento do Skeleton** — `SKELETON_MAX_HP=150`, `SKELETON_BITE_DAMAGE=30`, `SKELETON_BITE_COOLDOWN_MS=1200`, `SKELETON_PATROL_SPEED=90`. Provavelmente ajustar após primeiros testes em PvP. Constantes todas no topo do arquivo (~linhas 171-205).
4. **Próxima feature** — usuário tem pasta `public/sprites/poder 9(landmine)/` com `explosion-b.png` (untracked). Confirmar se quer começar Power 9 (landmine) na próxima sessão.

## Contexto crítico
- **Sprite scale ≠ hit scale.** `SKELETON_SCALE=2.3` é visual, `SKELETON_HIT_SCALE=2.5` é o multiplicador das hitboxes (damageSkeletonsInRect, applyWheelToSkeletons, poisonSkeletonsInRect). Mantém golpes "generosos" sem inflar o sprite.
- **Ice beam: amostras de hit precisam usar altura visual real do sprite, não bodyH genérico.** Bug crítico desta sessão: `bodyH = 100 * SKELETON_HIT_SCALE = 250` colocava amostras 250px acima da plataforma — beam horizontal (player perto) passava por baixo e não detectava. Fix: usar `visualH = SKELETON_FRAME_H * SKELETON_SCALE` (147) e amostrar 5 alturas (95%, 70%, 45%, 20%, feet) + 4 laterais. **Aplique mesmo padrão se adicionar outras detecções de raio em sprites grandes.**
- **Skeleton spawn = throw ball, não cast direto.** O cast do Power 8 não invoca o skeleton no caster — joga uma bolinha laranja (sprite reutilizado do loot) em arco até o mouse. Skeleton spawna onde a bola cair (touching.down em uma plataforma). Bola quica em paredes laterais e nas laterais de plataformas (`setBounce(1, 0)`, sem `oneWayProcessCallback`); só conta contato pelo TOPO da plataforma pra spawnar (checagem `body.touching.down`).
- **Múltiplos esqueletos por player** — `caster.skeletons` é array. Não despawna anteriores ao castar de novo. Death do caster despawna todos.
- **Wheel pass-through** — wheel não destrói ao bater no skeleton. Aplica dano + stun + knockup tween (visual `knockupOffset` aplicado a sprite.y e HP bar.y) e segue rolando. Dedup via `wheel.skeletonHitSet`.
- **Phaser Rectangle width:** setar `.width = X` no Rectangle Shape **não atualiza o display**. Use `setDisplaySize(w, h)` ou `setOrigin(0, 0.5) + setSize`. Bug da HP bar do skeleton (parecia bugada perto do 0) foi por isso. Fix aplicado em `positionSkeletonHpBar`.
- **Tecla 6 = toggle Eye transform**, não set power 'eye'. Isso porque eye só é ativável via loot pickup (transformToEye). Mantém atalho dev simétrico com os outros números.
- **Skull curse no skeleton aplica poison loop, não debuff.** Diferente dos fighters (curseMultiplier). Skeleton não tem mecânica de curse — `applyPoisonToSkeleton` cria timer `addEvent({delay: 500, loop: true})` com 12 dmg silent (sem hurt anim, sem hit SFX). Visualmente: tinta roxa pulsando + sprite `skull_curse_vfx` flutuando + som `sfx_skeleton_skull_curse` em loop até morte. Cleanup em `startSkeletonDeath` E `despawnSkeletonInstance`.
- **Damage opts no `damageSkeleton(fox, amount, opts)`:** `silent` (sem SFX), `skipHurtAnim` (não interrompe estado), `ignoreFreezeBreak` (não quebra gelo), `numberColor` (cor do damage number). Use combinados pra DOTs/efeitos passivos.
- **Stun mirror do caster removido** — esqueleto não pausa nem fica azul quando o caster toma stun/freeze. É independente.

## Pendências conhecidas
- [ ] **Commit + push** da sessão (~992 linhas + assets novos)
- [ ] Power 9 (landmine) — pasta criada com 1 sprite, sem código
- [ ] Tela de fim de jogo com ranking final (kills/vidas)
- [ ] Segundo personagem com moveset distinto (hoje 4 skins iguais)
- [ ] 3ª arma (hoje só melee + poderes)
- [ ] Validar revert do Eye em cenários adversos (item carregado da sessão anterior, ainda não testado)
- [ ] Validar ice beam em MP de 3+ players (idem)
- [ ] Sprite freeze do skeleton: hoje reusa `player_frozen` overlay, pode ficar pequeno num skeleton 2.3x maior. Ajustar scale do `frozenOverlay` se ficar feio (linha ~3531).
- [ ] HF damage no skeleton usa `fy = fox.y - 50` como ponto de teste; pode passar batido se caster cliclou no chão fora da hitbox. Validar em playtest.

## Arquivos / locais relevantes
- `src/GameScene.js` — único arquivo de gameplay, ~6000 linhas agora. Skeleton/Power 8 está concentrado entre as linhas ~3650-4200 (constants no topo ~171-205).
- `src/main.js` — lobby + Phaser config. Sem mudanças nesta sessão.
- `src/network.js` — PeerJS. Cast do skeleton replica via `power_cast` payload `{worldX, worldY}`.
- `src/map1.js` — `PLATFORM_RECTS` (4 plataformas). Spawn do skeleton procura plataforma com top y matching o ponto de impacto da bola.
- `index.html` — botão "8 - Skeleton Attack" no dev panel adicionado.
- `public/sprites/Power 8 (skeleton)/Skeleton_White/Skeleton_With_VFX/` — 6 spritesheets (Idle 8f, Walk 10f, Attack1 10f, Attack2 9f, Hurt 5f, Die 13f, frame 96x64).
- `public/audio/powers/skeleton/` — 5 sons (spawn, atack 2, Skeleton_hit damage, skeleton-death, skullcurse in skelleton).
- `public/sprites/poder 9(landmine)/explosion-b.png` — asset solto pra próxima feature.

## Comandos úteis
```bash
cd "c:/Users/rafam/Desktop/Rpositórios Github - claude/Pessoal/Chaotic Game"

# Dev
npm run dev

# Syntax check
node --check src/GameScene.js

# Git (commit + push pendente)
rtk git status
rtk git add src/GameScene.js index.html "public/sprites/Power 8 (skeleton)" "public/audio/powers/skeleton" .claude/settings.local.json
rtk git commit -m "Power 8: Skeleton Attack (full implementation + interactions with all powers)"
rtk git push

# Build prod
npm run build
```
