# Próxima Sessão

> Última atualização: 2026-04-19
> Sessão anterior: Implementado Poder 1 (HeavensFury) com telegraph e zonas de dano, Poder 2 (HolyShield) ativável com contador de charges, e polish do sistema de loot.

## Estado atual
- Projeto Phaser 3 + Vite rodando localmente (`npm run dev`). Diretório **não** é repo git ainda.
- `src/GameScene.js` é o único arquivo de gameplay — contém 3 personagens (WASD + mouse), 4 orbs de ataque, lives/respawn, loot genérico (wood box random power / HP), chuva pixel art, e dois poderes especiais funcionais.
- Assets atuais: Player 1/2/3 (idle/run/jump/fall/attack/attack_up/attack_down/death), Wood box, HP loot, HeavensFury + Smite (Poder 1), HolyShield + shield icon (Poder 2).
- Controles ativos: A/D andar, W/Espaço pular (2x), S slam, clique esquerdo ataque, clique direito especial, 1/2/3 trocar personagem.

## Por onde começar
1. **Testar o Poder 2 em jogo** — confirmar scale/pulse/posição do shield animado no personagem, e que os ícones HUD (shield icon azul) aparecem corretos no stored e no active (com contador "x2").
2. **Adicionar mais poderes ao `WOOD_POWER_POOL`** — hoje só tem `heavens_fury` e `shield`. Pode expandir com novos efeitos conforme o usuário criar spritesheets.
3. **Inicializar git + primeiro push pro GitHub** — diretório ainda não é repo. Usuário já tá logado no gh como `rafaelmesquita-spec`.
4. **Começar setup de multiplayer (Colyseus)** — singleplayer tá sólido o suficiente pra pensar em online.

## Contexto crítico
- **Gamefeel é prioridade sobre realismo.** Usuário rejeita mecânicas "flutuantes" e balanceamento realista. Referência é Chaos Faction, não plataforma tradicional.
- **Sem pulo variável.** Altura fixa, double jump disponível, gravidade 2.8x na queda normal, 3.8x depois do double jump. Não alterar sem pedir.
- **One-way platforms usam `body.prev.y`** em `oneWayProcessCallback` — se mexer na colisão de plataforma, preservar esse comportamento (boneco sobe através sem bater a cabeça e não atravessa caindo normal).
- **Body do hitbox de ataque rotaciona W/H** dependendo do ângulo (horizontal 130×100 vs vertical 100×130) porque arcade physics é AABB e não rotaciona nativamente.
- **Loot não pode spawnar em cima de player** — `spawnLoot` tenta até 20 posições filtrando por proximidade horizontal < 60px.
- **HeavensFury tem DUAS zonas de dano:** chão (±70px horizontais, 110px acima da superfície) = 80 dano, coluna/beam (±45px horizontais, qualquer altura acima) = 33 dano.
- **Telegraph do HeavensFury = 1.5s** com anim Smite (11 frames, `duration: 1500`) + colunas auxiliares em 10% alpha fixo. Sem isso o raio fica invencível demais.
- **Shield é ATIVÁVEL** (não mais passivo ao pegar). Pegou caixa → `specialPower = 'shield'` armazenado. Clique direito → `applyShield(fighter)` consome e aplica buff com 2 charges (80% redução de dano cada).
- **Enquanto shield ativo o player pode acumular outro `specialPower`** — o sprite active shield no HUD é independente do slot de stored power.
- **NÃO usar setas como controle principal.** WASD + mouse, sempre.

## Pendências conhecidas
- [ ] Inicializar git no diretório e criar repo no GitHub
- [ ] Salvar o GDD original (`chaos_faction_style_game_design.md`) em `docs/` — ainda só existe no histórico de conversa
- [ ] Testar shield no personagem (posição, tint branco, frequência do pulse) e HUD novo com shield_icon.png
- [ ] Adicionar mais poderes no pool (hoje só 2 opções no sorteio do wood box)
- [ ] Implementar novo personagem + armas pra completar MVP (2 personagens, 3 armas)
- [ ] Começar Colyseus / multiplayer online depois que singleplayer tá completo
- [ ] Som de impacto, som de ataque, sons dos poderes (só tem BGM hoje)
- [ ] Tela de fim de jogo quando um player perde todas as vidas

## Arquivos / locais relevantes
- `src/GameScene.js` — **único arquivo de gameplay**. ~1400 linhas. Tudo: fighters, loot, poderes, HUD, rain, colisão.
- `src/main.js` — config Phaser (1536×1024, gravidade 800, `debug: true`)
- `src/map1.js` — dimensões do mapa + `PLATFORM_RECTS` (4 plataformas)
- `index.html` — volume slider no canto inferior direito
- `public/sprites/Player 2|3/` — sprites dos personagens 2 e 3 (mesma estrutura do P1)
- `public/sprites/Wood/` — loot idle + catch
- `public/sprites/HP/` — loot HP (10 idle + 5 catch no mesmo sheet)
- `public/sprites/Poder 1/` — `HeavensFury_spritesheet.png` (1536×128, 12 frames) + `Smite_spritesheet.png` (704×64, 11 frames, telegraph)
- `public/sprites/Poder 2 (Shield)/` — `HolyShield_spritesheet.png` (704×64, 11 frames, anim no player) + `shield icon.png` (260×280, HUD)
- `public/maps/map1/` — background + platforms do mapa 1

## Comandos úteis
```bash
# Rodar em dev
cd "c:/Users/rafam/Desktop/Rpositórios Github - claude/Pessoal/Chaotic Game"
npm run dev

# Quando for iniciar git
rtk git init
rtk git add src public index.html package.json package-lock.json vite.config.js
rtk git commit -m "initial commit: Phaser 3 game base with 3 chars, loot, 2 powers"
gh repo create chaotic-game --public --source=. --push

# Para multiplayer (futuro)
npm install colyseus.js
# Servidor separado com Colyseus: criar repo `chaotic-game-server` quando chegar a hora
```
