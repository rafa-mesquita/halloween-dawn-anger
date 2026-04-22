extends Control

# ── Referências ───────────────────────────────────────────────────────────────
@onready var _input_nick   : LineEdit = $Panel/VBox/RowNick/InputNick
@onready var _btn_play     : Button   = $Panel/VBox/BtnPlay
@onready var _btn_settings : Button   = $Panel/VBox/BtnSettings
@onready var _btn_back     : Button   = $Panel/VBox/BtnBack

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	_input_nick.text = GameSettings.nickname

	_input_nick.text_changed.connect(_on_nick_changed)
	_btn_play.pressed.connect(_on_play)
	_btn_settings.pressed.connect(_on_settings)
	_btn_back.pressed.connect(_on_back)

# ── Callbacks ─────────────────────────────────────────────────────────────────
func _on_nick_changed(value: String) -> void:
	GameSettings.nickname = value
	GameSettings.save_settings()

func _on_play() -> void:
	SceneTransition.go_to("res://scenes/game/game_scene.tscn")

func _on_settings() -> void:
	SceneTransition.go_to("res://scenes/ui/Settings.tscn")

func _on_back() -> void:
	SceneTransition.go_to("res://scenes/ui/MainMenu.tscn")
