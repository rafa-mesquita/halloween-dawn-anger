extends Node

# Estado global da partida
var mode: String = "single"   # "single", "host", "client"
var my_index: int = 0
var players: Array = []       # [{index, char_id, nick}]

var eye_active: bool = false  # bloqueia spawn do loot eye se true

func reset() -> void:
	eye_active = false
	players.clear()
