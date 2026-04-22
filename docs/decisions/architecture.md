# Decisões de Arquitetura

## 2026-04-20 — Estrutura de pastas: raiz, não subpasta

**Decisão:** O projeto Godot fica na raiz do repositório (não em `godot/`).
**Motivo:** Simplicidade — Godot abre `project.godot` onde estiver. Evita nesting desnecessário.
**Consequência:** `project.godot`, `scenes/`, `scripts/`, `assets/`, `shaders/` ficam na raiz.

## 2026-04-20 — Assets legados em `_legacy/` (git ignored)

**Decisão:** `public/` (assets JS originais) e `scripts/gen-favicon.mjs` movidos para `_legacy/`.
**Motivo:** Referência histórica sem poluir o projeto Godot. `.gitignore` exclui `_legacy/`.
**Assets em uso:** Copiados para `assets/` na raiz antes de mover o original.

## 2026-04-20 — Renderer: Compatibility

**Decisão:** Usar renderer **Compatibility** no Godot 4.
**Motivo:** Melhor suporte para export HTML5/WebGL2. O jogo original rodava no browser.
**Trade-off:** Sem algumas features avançadas do Forward+ / Mobile renderers, mas o jogo não precisa delas.

## 2026-04-20 — Gravidade extra manual (sem setGravityY)

**Decisão:** Replicar o `body.setGravityY()` do Phaser aplicando `velocity.y +=` manualmente em `_physics_process`.
**Motivo:** Godot não tem equivalente direto ao `setGravityY` por corpo. A abordagem manual é mais explícita.
**Valores:** FALL_MULT=2.8 (queda normal), DJUMP_FALL_MULT=3.8 (após double jump).

## 2026-04-20 — Autoridade de dano no multiplayer

**Decisão:** O target aplica o dano via `@rpc("reliable")`, não o atacante.
**Motivo:** Herdado do design JS original. Evita que dois atacantes dupliquem dano.
**Risco:** Pequena latência percebida pelo atacante (não vê o hit imediatamente).

## 2026-04-20 — ENet para multiplayer (não WebRTC/PeerJS)

**Decisão:** Usar Godot High-Level Multiplayer API com ENet para o build nativo.
**Motivo:** Mais simples, sem broker externo, confiabilidade garantida nativamente.
**Nota:** Para export HTML5, avaliar WebRTCMultiplayerPeer (requer servidor de sinalização).

## 2026-04-20 — Agente documentador automático via Stop hook

**Decisão:** `.claude/settings.json` configura Stop hook que roda `docs-agent/update_docs.sh` após cada turno.
**Motivo:** Manter docs atualizados para outros agentes sem intervenção manual.
**Script:** Detecta arquivos Godot modificados via `git diff` e invoca `claude --print` para atualizar `docs/systems/`.
