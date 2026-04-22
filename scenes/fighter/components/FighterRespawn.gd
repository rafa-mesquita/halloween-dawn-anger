extends Node
class_name FighterRespawn

# ── Constantes ────────────────────────────────────────────────────────────────
const SPAWN_COOLDOWN := 5.0

static var _spawn_last_used: Dictionary = {}

# ── Stats ─────────────────────────────────────────────────────────────────────
@export_group("Respawn")
@export var respawn_delay   := 1.5
@export var invuln_duration := 1.5
@export var blink_interval  := 0.08

var _f: CharacterBody2D

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	_f = get_parent().get_parent() as CharacterBody2D

# ── Morte e Respawn ───────────────────────────────────────────────────────────
func die() -> void:
	_f.is_dead    = true
	_f.velocity   = Vector2.ZERO
	_f.lives     -= 1
	_f.sprite.play("death")
	await _f.sprite.animation_finished

	if _f.lives <= 0:
		_f.queue_free()
		return

	await get_tree().create_timer(respawn_delay).timeout
	_respawn()

func _respawn() -> void:
	_f.global_position      = _pick_spawn_point()
	_f.hp                   = _f.max_hp
	_f.combat.attack_orbs   = _f.combat.max_attack_orbs
	_f.is_dead              = false
	_f.is_invulnerable      = true
	_f.velocity             = Vector2.ZERO
	_f.sprite.play("idle")
	_start_invuln_blink()

func _pick_spawn_point() -> Vector2:
	var spawn_node := get_tree().get_first_node_in_group("spawn_points")
	if not spawn_node:
		spawn_node = _find_node_by_name(get_tree().current_scene, "SpawnPoints")
	if not spawn_node:
		return _f.global_position

	var now     := Time.get_ticks_msec() / 1000.0
	var markers := spawn_node.get_children()

	var available: Array = markers.filter(func(m: Node) -> bool:
		var key := str(m.get_path())
		return not _spawn_last_used.has(key) or (now - _spawn_last_used[key]) >= SPAWN_COOLDOWN
	)

	if available.is_empty():
		available = markers

	var chosen: Marker2D = available[randi() % available.size()]
	_spawn_last_used[str(chosen.get_path())] = now
	return chosen.global_position

func _find_node_by_name(node: Node, target: String) -> Node:
	if node.name == target:
		return node
	for child in node.get_children():
		var result := _find_node_by_name(child, target)
		if result:
			return result
	return null

func _start_invuln_blink() -> void:
	var elapsed := 0.0
	while elapsed < invuln_duration:
		_f.sprite.modulate.a = 0.0
		await get_tree().create_timer(blink_interval).timeout
		_f.sprite.modulate.a = 1.0
		await get_tree().create_timer(blink_interval).timeout
		elapsed += blink_interval * 2.0
	_f.sprite.modulate = Color.WHITE
	_f.is_invulnerable = false
