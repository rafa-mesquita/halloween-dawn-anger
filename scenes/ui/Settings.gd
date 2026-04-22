extends Control

# ── Referências ───────────────────────────────────────────────────────────────
@onready var _slider_master    : HSlider  = $Panel/VBox/RowMaster/SliderMaster
@onready var _slider_music     : HSlider  = $Panel/VBox/RowMusic/SliderMusic
@onready var _slider_sfx       : HSlider  = $Panel/VBox/RowSFX/SliderSFX
@onready var _check_fullscreen : CheckBox = $Panel/VBox/RowFullscreen/CheckFullscreen
@onready var _btn_back         : Button   = $Panel/VBox/BtnBack

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	# Popula com valores salvos
	_slider_master.value    = GameSettings.master_volume
	_slider_music.value     = GameSettings.music_volume
	_slider_sfx.value       = GameSettings.sfx_volume
	_check_fullscreen.button_pressed = GameSettings.fullscreen

	# Conecta sinais
	_slider_master.value_changed.connect(_on_master_changed)
	_slider_music.value_changed.connect(_on_music_changed)
	_slider_sfx.value_changed.connect(_on_sfx_changed)
	_check_fullscreen.toggled.connect(_on_fullscreen_toggled)
	_btn_back.pressed.connect(_on_back)

# ── Callbacks ─────────────────────────────────────────────────────────────────
func _on_master_changed(value: float) -> void:
	GameSettings.set_master_volume(value)

func _on_music_changed(value: float) -> void:
	GameSettings.set_music_volume(value)

func _on_sfx_changed(value: float) -> void:
	GameSettings.set_sfx_volume(value)

func _on_fullscreen_toggled(pressed: bool) -> void:
	GameSettings.set_fullscreen(pressed)

func _on_back() -> void:
	SceneTransition.go_to("res://scenes/ui/MainMenu.tscn")
