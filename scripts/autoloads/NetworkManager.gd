extends Node

# Stub — implementado no Sprint 8
# Por enquanto expõe a interface que o resto do jogo usa

var is_host: bool = false
var is_connected: bool = false
var my_index: int = 0
var peers: Array = []

signal state_received(data: Dictionary)
signal match_started(players: Array)
signal peer_connected(index: int)
signal peer_disconnected(index: int)

func host_game() -> String:
	# TODO Sprint 8: inicializar ENetMultiplayerPeer como servidor
	var code = str(randi() % 90000 + 10000)
	is_host = true
	return code

func join_game(_code: String) -> void:
	# TODO Sprint 8: conectar via ENetMultiplayerPeer como cliente
	pass

func send_state(data: Dictionary) -> void:
	# TODO Sprint 8: broadcast não-confiável 30Hz
	pass

func broadcast_power_cast(params: Dictionary) -> void:
	# TODO Sprint 8: RPC confiável para todos
	pass
