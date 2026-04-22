extends Control

# ── Referências ───────────────────────────────────────────────────────────────
@onready var _btn_play    : Button = $VBox/BtnPlay
@onready var _btn_settings: Button = $VBox/BtnSettings
@onready var _btn_quit    : Button = $VBox/BtnQuit

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	_btn_play.pressed.connect(_on_play)
	_btn_settings.pressed.connect(_on_settings)
	_btn_quit.pressed.connect(_on_quit)

# ── Callbacks ─────────────────────────────────────────────────────────────────
func _on_play() -> void:
	SceneTransition.go_to("res://scenes/ui/Lobby.tscn")

func _on_settings() -> void:
	SceneTransition.go_to("res://scenes/ui/Settings.tscn")

func _on_quit() -> void:
	get_tree().quit()
