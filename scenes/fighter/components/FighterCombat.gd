extends Node
class_name FighterCombat

# ── Constantes ────────────────────────────────────────────────────────────────
const KNOCKBACK_RESET_TIME := 0.12

const HITBOX_H    := { "size": Vector2(95, 75),  "ox": 60.0, "oy":   0.0 }
const HITBOX_UP   := { "size": Vector2(75, 125), "ox":  0.0, "oy": -80.0 }
const HITBOX_DOWN := { "size": Vector2(75, 125), "ox":  0.0, "oy":  80.0 }

const ACTIVE_FRAMES_H := [2, 3, 4]
const ACTIVE_FRAMES_V := [2, 3]

# ── Stats ─────────────────────────────────────────────────────────────────────
@export_group("Stats - Combate")
@export var attack_damage        := 17.0
@export var attack_knockback_x   := 140.0
@export var attack_knockback_y_h := -80.0
@export var attack_knockback_y_v := -160.0
@export var attack_knockback_y_d :=  160.0
@export var max_attack_orbs      := 4
@export var orb_reset_time       := 4.0

# ── Estado ────────────────────────────────────────────────────────────────────
var is_attacking      := false
var attack_dir        := "horizontal"
var attack_orbs       := 4
var kill_count        := 0
var _last_attack_time := 0.0
var _knockback_timer  := 0.0
var _hit_targets      : Array = []

var _f: CharacterBody2D   # referência ao Fighter pai

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	_f = get_parent().get_parent() as CharacterBody2D

func setup() -> void:
	attack_orbs = max_attack_orbs
	if _f.attack_area:
		_f.attack_area.collision_layer = 0
		_f.attack_area.collision_mask  = 1
		_f.attack_area.body_entered.connect(_on_attack_body_entered)
	if _f.sprite:
		_f.sprite.frame_changed.connect(_on_sprite_frame_changed)

func update(delta: float) -> void:
	_update_knockback(delta)
	_update_orb_reset()

# ── Ataque ────────────────────────────────────────────────────────────────────
func try_attack() -> void:
	if is_attacking or attack_orbs <= 0:
		return

	attack_orbs -= 1
	_last_attack_time = Time.get_ticks_msec() / 1000.0
	is_attacking = true
	_hit_targets.clear()

	if Input.is_action_pressed("ui_up"):
		attack_dir = "up"
	elif Input.is_action_pressed("ui_down") and not _f.is_on_floor():
		attack_dir = "down"
	else:
		attack_dir = "horizontal"

	_setup_hitbox(attack_dir)
	AudioManager.play_sfx("attack_swing")

	match attack_dir:
		"up":   _f.sprite.play("attack_up")
		"down": _f.sprite.play("attack_down")
		_:      _f.sprite.play("attack_h")

	var frames: SpriteFrames = _f.sprite.sprite_frames
	var anim_duration := float(frames.get_frame_count(_f.sprite.animation)) / frames.get_animation_speed(_f.sprite.animation)
	await get_tree().create_timer(anim_duration + 0.05).timeout
	_end_attack()

func _setup_hitbox(dir: String) -> void:
	if not _f.attack_shape:
		return
	var cfg := HITBOX_H
	match dir:
		"up":   cfg = HITBOX_UP
		"down": cfg = HITBOX_DOWN
	var rect := RectangleShape2D.new()
	rect.size = cfg["size"]
	_f.attack_shape.shape    = rect
	_f.attack_shape.position = Vector2(cfg["ox"] * _f._facing, cfg["oy"])
	_f.attack_shape.disabled = true

func _end_attack() -> void:
	is_attacking = false
	if _f.attack_shape:
		_f.attack_shape.disabled = true

func _on_sprite_frame_changed() -> void:
	if not is_attacking or not _f.attack_shape:
		return
	var active := ACTIVE_FRAMES_H if attack_dir == "horizontal" else ACTIVE_FRAMES_V
	_f.attack_shape.disabled = not (_f.sprite.frame in active)

func _on_attack_body_entered(body: Node) -> void:
	if not is_attacking:
		return
	if body == _f or body in _hit_targets:
		return
	if not body.has_method("apply_incoming_hit"):
		return
	_hit_targets.append(body)

	var knock_x: float = _f._facing * attack_knockback_x
	var knock_y: float = attack_knockback_y_h
	match attack_dir:
		"up":   knock_y = attack_knockback_y_v
		"down": knock_y = attack_knockback_y_d

	body.apply_incoming_hit({ "damage": attack_damage, "knock_x": knock_x, "knock_y": knock_y })
	var body_hp: float = body.get("hp") as float
	if body_hp <= 0.0:
		kill_count += 1
		var idx: int = clampi(kill_count, 1, 5)
		AudioManager.play_sfx("kill_" + str(idx))

# ── Receber dano ──────────────────────────────────────────────────────────────
func apply_incoming_hit(hit: Dictionary) -> void:
	if _f.is_invulnerable or _f.is_dead:
		return

	AudioManager.play_sfx("attack_hit")
	var amount: float = hit["damage"] * _f.curse_multiplier
	if _f.shield_charges > 0:
		amount *= 0.2
		_f.shield_charges -= 1

	_f.hp = max(0.0, _f.hp - amount)
	_f.get_node("Components/FighterHUD").call("update")
	_f.get_node("Components/FighterVFX").call("spawn_damage_number", amount)
	_f.get_node("Components/FighterVFX").call("trigger_hit_flash")

	_f.velocity.x = hit["knock_x"]
	_f.velocity.y = hit["knock_y"]
	_knockback_timer = KNOCKBACK_RESET_TIME

	if _f.hp <= 0.0:
		_f.get_node("Components/FighterRespawn").call("die")

# ── Helpers ───────────────────────────────────────────────────────────────────
func _update_knockback(delta: float) -> void:
	if _knockback_timer > 0.0:
		_knockback_timer -= delta
		if _knockback_timer <= 0.0:
			_f.velocity.x = 0.0

func reset_orbs() -> void:
	attack_orbs = max_attack_orbs

func _update_orb_reset() -> void:
	if attack_orbs >= max_attack_orbs:
		return
	var now := Time.get_ticks_msec() / 1000.0
	if now - _last_attack_time >= orb_reset_time:
		attack_orbs = max_attack_orbs
