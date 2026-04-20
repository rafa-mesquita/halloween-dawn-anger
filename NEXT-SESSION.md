# Próxima Sessão

> Última atualização: 2026-04-19
> Sessão anterior: Implementado Poder 5 (Fire Storm) — 2 waves de 8 raios radiais, hit VFX seguindo caster/alvo, sons cast+wave, sync multiplayer; Skull Curse refatorado pra DoT + slow 2s.

## Estado atual
- Branch `main`, repo sincronizado com `origin/main`, deploy automático no GitHub Pages ativo.
- 5 poderes funcionais (HeavensFury, HolyShield, SkullCurse, Wheel, FireStorm) + sistema de 2 slots com Q pra trocar ordem.
- Multiplayer PeerJS até 4 jogadores funcional (host-as-hub, dano autoritário no alvo, visuais replicados).
- Assets novos não integrados: `public/sprites/Poder 6 (transform Flying Eye)/` (untracked, sem código ainda).

## Por onde começar
1. **Planejar/implementar Poder 6 (Transform Flying Eye)** — assets já estão em `public/sprites/Poder 6 (transform Flying Eye)/`. Perguntar ao usuário o design (buff? transformação com outros controles? novo ataque?) antes de codar.
2. **Testar Fire Storm com 2+ jogadores online** — confirmar que ambas waves + hit VFX + sons aparecem em todos os clients. Dano múltiplas waves pode acumular 50% HP em um alvo; validar se faz sentido no caótico.
3. **Balanceamento visual** — usuário pode pedir ajustes no Fire Storm depois do teste (velocidade dos raios, scale do hit VFX, volume dos sons, duração do intervalo entre waves=1.1s).
4. **Tela de fim de jogo** — pendência antiga: quando jogador perde todas as vidas, não há feedback visual claro de "fim".

## Contexto crítico
- **Adicionar novo poder segue checklist** (ver `memory/project_powers.md` seção "How to apply"): POWERS, preload, anims, método fireXxx, routing no update + handleNetState, HUD sprite+pulse, slot1 color, WOOD_POWER_POOL, botão dev no HTML.
- **Gamefeel > realismo.** Jogo é caótico estilo Chaos Faction, não balanceado.
- **Multiplayer: dano é autoritário no alvo.** Quem executa `dealHit` só manda o pacote; só o dono do fighter-alvo aplica `applyIncomingHit`. VFX que precisam aparecer em todos os clients: passar flag no pacote `hit` (ex: `fireStormHit: true`) e tratar em `handleNetState`.
- **VFX que segue fighter:** registrar o sprite em array (`fireStormHitVfx`), fazer `sprite.follow = fighter`, atualizar posição em cada frame no `update()` (ver padrão em GameScene linhas ~2770).
- **Loot authority é do host**, não do player local. `_isLootAuthority` controla.
- **Skull Curse agora é DoT** (não dano instantâneo): 30 HP ao longo de 10s, 3/s, bypass de curseMultiplier (usa `ignoreCurseMultiplier` no `damageFighter`). Slow 40% nos primeiros 2s (movimento/pulo/slam).
- **Down-attack flip compensa 2 offsets X** (body 49 horizontal vs 67 vertical) — não mexer nisso sem entender o bloco em `update()` com `flipCompensation` + `attackSpriteShift`.
- **Alt-tab freeze:** player em aba não-visível fica invulnerável + velocity zero + sem gravidade. Handler em `_onVisibilityChange`.

## Pendências conhecidas
- [ ] Integrar Poder 6 (Flying Eye) — assets presentes, sem código
- [ ] Tela de fim de jogo / HUD de ranking final
- [ ] Testar Fire Storm em sessão multiplayer real
- [ ] Segundo personagem + mais armas pro MVP completo
- [ ] Balanceamento do pool de poderes (hoje 4 opções no sorteio)

## Arquivos / locais relevantes
- `src/GameScene.js` — **único arquivo de gameplay**, ~3000+ linhas. Organização: constants → POWERS/LOOT_TYPES/CHARACTERS → preload → create → fighter/loot/power methods → syncNetwork/handleNetState → update
- `src/main.js` — config Phaser + lobby (single/host/join), picker de personagem
- `src/network.js` — NetworkManager PeerJS (host/join, broadcast, callbacks `onPeers`/`onStart`/`onState`)
- `src/map1.js` — dimensões + `PLATFORM_RECTS`
- `index.html` — lobby + volume + hitbox toggle + dev power panel (botões 1-5)
- `.github/workflows/deploy.yml` — CI Pages
- `public/sprites/Poder N (...)` — assets por poder
- `public/audio/powers/<power>/` — sons por poder

## Comandos úteis
```bash
# Dev
cd "c:/Users/rafam/Desktop/Rpositórios Github - claude/Pessoal/Chaotic Game"
npm run dev

# Build + syntax check rápido
node --check src/GameScene.js
npm run build

# Git
rtk git status
rtk git log -5 --oneline
rtk git push
```
