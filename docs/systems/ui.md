# System: UI

Status: pendente (Sprint 4)

## HUD.tscn (CanvasLayer)

Todos os elementos do HUD ficam num único `CanvasLayer` (layer=1) para garantir que fiquem sobre o jogo.

### Elementos por fighter (próprio)

| Elemento | Tipo | Detalhes |
|---|---|---|
| HP bar background | ColorRect | 160×12 px |
| HP bar fill | ColorRect | largura = 158 * (hp/MAX_HP) |
| Vidas | Label | "Vidas: X" |
| Orbs de ataque | 4× ColorRect circular | radius=10, spacing=28, azul=cheio / cinza=vazio |
| Slot poder 1 | Sprite2D / ColorRect | círculo colorido com cor do poder ativo |
| Slot poder 2 | ColorRect menor | cor do poder secundário |
| Shield indicator | Sprite2D + Label | ícone de escudo + "x2" / "x1", visível se shield_charges > 0 |
| Seta self | Sprite2D | seta/seta.png, bobbing tween ±8px, acima do fighter |

### HP bar colors

```gdscript
if hp_pct > 0.5:   color = Color(0.2, 0.8, 0.3)   # verde
elif hp_pct > 0.25: color = Color(0.9, 0.8, 0.1)  # amarelo
else:               color = Color(0.9, 0.2, 0.1)   # vermelho
```

### Elementos acima de cada fighter (world space)

- HP bar 60px de largura, Node2D acima do sprite, acompanha posição do fighter
- 2 dots menores mostrando cores dos poderes nos slots

### HUD do Flying Eye (substitui HUD normal durante transform)

- Timer centralizado na tela: "EYE: Xs" contando regressivamente
- Ícones de eye_hits (corações/olhos) substituindo o HP bar
- Barra de dash cooldown acima do fighter
- Barra de attack cooldown acima do fighter

### Damage numbers

`DamageNumber.tscn`: Label instanciada no mundo, flutua +60px e fades em 0.8s.

```gdscript
# Ao instanciar:
label.text = str(int(damage))
var tween = create_tween()
tween.tween_property(label, "position:y", label.position.y - 60, 0.8)
tween.parallel().tween_property(label, "modulate:a", 0.0, 0.8)
tween.tween_callback(label.queue_free)
```

## Lobby.tscn

- 3 botões: Solo / Host / Join
- Host: gera código 5 dígitos, exibe para copiar, aguarda jogadores
- Join: input field para código, conecta
- Seleção de personagem: 4 botões com prévia do sprite idle
- Input de nick: máx 12 chars
- Botão "Iniciar" (host only): habilitado quando ≥2 jogadores com nick

## Controles hint

Texto fixo no topo da tela durante o jogo:
`"A/D: mover | W/Space: pular | S: slam/descer | Click: atacar | RClick: poder | Q: trocar poder"`
