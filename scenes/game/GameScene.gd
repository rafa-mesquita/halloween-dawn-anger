extends Node2D

# ── Configuração da partida ───────────────────────────────────────────────────
@export var map_scene: PackedScene  ## Mapa a carregar (Map1.tscn, Map2.tscn, etc.)

# ── Referências dinâmicas ─────────────────────────────────────────────────────
var _map      : Node2D = null  # instância do mapa atual
var _fighters : Array  = []    # todos os fighters ativos

@onready var _loot_manager: LootItemManager = $LootManager

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	_load_map()
	_build_debug_ui()
	AudioManager.play_bgm()

func _load_map() -> void:
	if not map_scene:
		push_error("GameScene: nenhum map_scene configurado!")
		return
	_map = map_scene.instantiate()
	$MapContainer.add_child(_map)

# ── Fighters ──────────────────────────────────────────────────────────────────
func register_fighter(fighter: CharacterBody2D) -> void:
	if fighter not in _fighters:
		_fighters.append(fighter)

func get_fighters() -> Array:
	return _fighters

# ── Debug UI ──────────────────────────────────────────────────────────────────
@export var debug_fighter: CharacterBody2D

var _debug_panel: CanvasLayer

func _build_debug_ui() -> void:
	_debug_panel = CanvasLayer.new()
	_debug_panel.layer = 100
	add_child(_debug_panel)

	var vbox := VBoxContainer.new()
	vbox.position = Vector2(12, 12)
	_debug_panel.add_child(vbox)

	var label := Label.new()
	label.text = "DEBUG"
	label.add_theme_color_override("font_color", Color.YELLOW)
	vbox.add_child(label)

	_add_debug_button(vbox, "Matar Fighter", _on_kill_pressed)

func _add_debug_button(parent: Control, text: String, callback: Callable) -> void:
	var btn := Button.new()
	btn.text = text
	btn.pressed.connect(callback)
	parent.add_child(btn)

func _on_kill_pressed() -> void:
	if debug_fighter and debug_fighter.has_method("apply_incoming_hit"):
		debug_fighter.apply_incoming_hit({ "damage": 9999.0, "knock_x": 0.0, "knock_y": 0.0 })
