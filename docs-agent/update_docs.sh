#!/bin/bash
# Agente documentador automático — roda após cada turno do Claude via Stop hook.
# Detecta arquivos Godot modificados e atualiza /docs/ com fatos para outros agentes.

CHANGED=$(git diff HEAD --name-only 2>/dev/null | grep -E "^godot/" | head -20)
STAGED=$(git diff --cached --name-only 2>/dev/null | grep -E "^godot/" | head -20)
ALL_CHANGED=$(printf "%s\n%s" "$CHANGED" "$STAGED" | sort -u | grep -v "^$")

[ -z "$ALL_CHANGED" ] && exit 0

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"
[ -z "$REPO_ROOT" ] && exit 0

cd "$REPO_ROOT" || exit 0

claude --print "
Você é um agente documentador do projeto halloween-dawn-anger (port JS→Godot 4).
Fale apenas em fatos secos — sem introdução, sem floreio. Docs são para outros agentes lerem.

Arquivos Godot modificados neste turno:
$ALL_CHANGED

Sua tarefa:
1. Leia cada arquivo modificado acima (use Read)
2. Identifique qual sistema cada arquivo implementa (fighter, combat, powers, loot, ui, audio, network)
3. Atualize o arquivo docs/systems/<sistema>.md correspondente com:
   - O que foi implementado (funções, constantes, nós Godot usados)
   - Valores numéricos relevantes
   - Decisões de design não óbvias
4. Atualize docs/progress.md marcando como [x] o que foi concluído
5. Se for uma decisão de arquitetura importante, adicione em docs/decisions/architecture.md

Referência de sistemas → arquivos docs:
- godot/scenes/fighter/ → docs/systems/fighter.md
- godot/scenes/powers/  → docs/systems/powers.md
- godot/scenes/loot/    → docs/systems/loot.md
- godot/scenes/ui/      → docs/systems/ui.md
- godot/scripts/autoloads/AudioManager.gd → docs/systems/audio.md
- godot/scripts/autoloads/NetworkManager.gd → docs/systems/network.md
- godot/scripts/constants/ → docs/systems/fighter.md ou powers.md
" --allowedTools "Read,Edit,Write" 2>/dev/null

exit 0
