extends Node

const SETTINGS_PATH := "user://settings.cfg"

# ── Valores padrão ────────────────────────────────────────────────────────────
var master_volume : float  = 1.0
var music_volume  : float  = 0.35
var sfx_volume    : float  = 1.0
var fullscreen    : bool   = false
var nickname      : String = ""

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	load_settings()
	_apply_fullscreen()

# ── Salvar / Carregar ─────────────────────────────────────────────────────────
func save_settings() -> void:
	var cfg := ConfigFile.new()
	cfg.set_value("audio",   "master_volume", master_volume)
	cfg.set_value("audio",   "music_volume",  music_volume)
	cfg.set_value("audio",   "sfx_volume",    sfx_volume)
	cfg.set_value("display", "fullscreen",    fullscreen)
	cfg.set_value("player",  "nickname",      nickname)
	cfg.save(SETTINGS_PATH)

func load_settings() -> void:
	var cfg := ConfigFile.new()
	if cfg.load(SETTINGS_PATH) != OK:
		return
	master_volume = cfg.get_value("audio",   "master_volume", 1.0)
	music_volume  = cfg.get_value("audio",   "music_volume",  0.35)
	sfx_volume    = cfg.get_value("audio",   "sfx_volume",    1.0)
	fullscreen    = cfg.get_value("display", "fullscreen",    false)
	nickname      = cfg.get_value("player",  "nickname",      "")

# ── Aplicar ───────────────────────────────────────────────────────────────────
func _apply_fullscreen() -> void:
	if fullscreen:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN)
	else:
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED)

func set_fullscreen(value: bool) -> void:
	fullscreen = value
	_apply_fullscreen()
	save_settings()

func set_master_volume(value: float) -> void:
	master_volume = value
	AudioServer.set_bus_volume_db(AudioServer.get_bus_index("Master"), linear_to_db(value))
	save_settings()

func set_music_volume(value: float) -> void:
	music_volume = value
	var idx: int = AudioServer.get_bus_index("Music")
	if idx >= 0:
		AudioServer.set_bus_volume_db(idx, linear_to_db(value))
	save_settings()

func set_sfx_volume(value: float) -> void:
	sfx_volume = value
	var idx: int = AudioServer.get_bus_index("SFX")
	if idx >= 0:
		AudioServer.set_bus_volume_db(idx, linear_to_db(value))
	save_settings()
