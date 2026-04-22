extends Node

var master_volume: float = 1.0
var _bgm_player: AudioStreamPlayer = null

const SFX_MAP: Dictionary = {
	"bgm":                "bgm.mp3",
	"jump":               "jump/30_Jump_03.wav",
	"attack_swing":       "attacks/Hit.mp3",
	"attack_hit":         "attacks/atack.mp3",
	"power_catch":        "power catch/power cath.mp3",
	"heal":               "heal novo/93eeb9fc-8eab-44db-aa09-270a2550a130.mp3",
	"crow_die":           "corvo/corvo die.mp3",
	"heavens_fury_cast":   "powers/heavens_fury/Cast.mp3",
	"heavens_fury_second": "powers/heavens_fury/Second.mp3",
	"heavens_fury_belezam":"powers/heavens_fury/belezam.mp3",
	"shield_cast":         "powers/shield/cast.mp3",
	"shield_break":        "powers/shield/broke shield.mp3",
	"skull_cast":          "powers/skull_curse/cast skull curse.mp3",
	"skull_hit":           "powers/skull_curse/hit skull.mp3",
	"fire_cast":           "powers/fire_storm/Cast and wave 2.mp3",
	"fire_cast_2":         "powers/fire_storm/Cast and wave 2_2.mp3",
	"wheel_air":           "powers/wheel/Moviment_Air.mp3",
	"wheel_ground":        "powers/wheel/Moviment_ground.mp3",
	"wheel_hit":           "powers/wheel/Hit.mp3",
	"wheel_hit_2":         "powers/wheel/hit2.mp3",
	"ice_cast":            "powers/icebeam/ice cast.mp3",
	"ice_crash":           "powers/icebeam/crash ice.mp3",
	"kill_1":             "kills sounds/1-kill.mp3",
	"kill_2":             "kills sounds/2-kills.mp3",
	"kill_3":             "kills sounds/3-kills.mp3",
	"kill_4":             "kills sounds/4-kills.mp3",
	"kill_5":             "kills sounds/5-kills.mp3",
}

func play_bgm() -> void:
	if _bgm_player:
		return
	_bgm_player = AudioStreamPlayer.new()
	_bgm_player.bus = "Music"
	add_child(_bgm_player)
	var stream: AudioStream = load("res://assets/audio/" + SFX_MAP["bgm"]) as AudioStream
	_bgm_player.stream = stream
	_bgm_player.play()

func stop_bgm() -> void:
	if _bgm_player:
		_bgm_player.stop()
		_bgm_player.queue_free()
		_bgm_player = null

func play_sfx(key: String, volume_mult: float = 1.0, seek: float = 0.0) -> AudioStreamPlayer:
	if not SFX_MAP.has(key):
		push_warning("AudioManager: chave desconhecida '%s'" % key)
		return null
	var path: String = "res://assets/audio/" + SFX_MAP[key]
	if not ResourceLoader.exists(path):
		push_warning("AudioManager: arquivo não encontrado '%s'" % path)
		return null
	var player: AudioStreamPlayer = AudioStreamPlayer.new()
	player.bus = "SFX"
	add_child(player)
	player.stream = load(path) as AudioStream
	player.volume_db = linear_to_db(volume_mult)
	player.play(seek)
	player.finished.connect(player.queue_free)
	return player

func play_sfx_loop(key: String, volume_mult: float = 1.0) -> AudioStreamPlayer:
	if not SFX_MAP.has(key):
		return null
	var player: AudioStreamPlayer = AudioStreamPlayer.new()
	player.bus = "SFX"
	add_child(player)
	player.stream = load("res://assets/audio/" + SFX_MAP[key]) as AudioStream
	player.volume_db = linear_to_db(volume_mult)
	player.play()
	return player

func stop_sfx(player: AudioStreamPlayer) -> void:
	if player and is_instance_valid(player):
		player.stop()
		player.queue_free()

func set_volume(value: float) -> void:
	master_volume = clamp(value, 0.0, 1.0)
