extends Area2D
class_name LootItem

# ── Sinais ────────────────────────────────────────────────────────────────────
signal picked_up
signal despawned

# ── Exports (configurados em cada scene filha) ────────────────────────────────
@export var loot_type    : String = ""      ## "hp" | "shield" | "eye" | "loot_pool"
@export var power        : String = ""      ## "heavens_fury" | "skull_curse" | etc.
@export var glow_color   : Color  = Color.WHITE
@export var tint_color   : Color  = Color.WHITE
@export var sprite_scale : float  = 3.3    ## Escala do sprite idle/catch
@export var shield_wobble: bool   = false   ## Ativa pulso+balanço do shield

# ── Referências de nós ────────────────────────────────────────────────────────
@onready var _sprite      : AnimatedSprite2D = $Sprite
@onready var _tint_overlay: AnimatedSprite2D = $TintOverlay
@onready var _glow        : Sprite2D         = $Glow
@onready var _col_shape   : CollisionShape2D = $CollisionShape2D

# ── Estado ────────────────────────────────────────────────────────────────────
var is_picked_up  : bool  = false
var _glow_tween   : Tween
var _shield_tween : Tween
var _tint_tween   : Tween
var _lifetime_timer: Timer

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	collision_layer = 0
	collision_mask  = 1

	_sprite.scale       = Vector2(sprite_scale, sprite_scale)
	_tint_overlay.scale = Vector2(sprite_scale, sprite_scale)
	_setup_glow()
	_setup_tint_overlay()
	_start_lifetime()

	if shield_wobble:
		_start_shield_wobble()

	body_entered.connect(_on_body_entered)
	_sprite.play("idle")

# ── Glow ──────────────────────────────────────────────────────────────────────
func _setup_glow() -> void:
	_glow.texture = _make_radial_glow_tex(glow_color)

	var mat: CanvasItemMaterial = CanvasItemMaterial.new()
	mat.blend_mode = CanvasItemMaterial.BLEND_MODE_ADD
	_glow.material = mat

	var base_scale: Vector2  = _glow.scale
	var pulse_scale: Vector2 = base_scale * 1.3
	_glow_tween = create_tween().set_loops()
	_glow_tween.tween_property(_glow, "scale",      pulse_scale, 0.7).set_trans(Tween.TRANS_SINE)
	_glow_tween.tween_property(_glow, "modulate:a", 0.7,         0.7).set_trans(Tween.TRANS_SINE)
	_glow_tween.tween_property(_glow, "scale",      base_scale,  0.7).set_trans(Tween.TRANS_SINE)
	_glow_tween.tween_property(_glow, "modulate:a", 1.0,         0.7).set_trans(Tween.TRANS_SINE)

# ── Tint overlay ──────────────────────────────────────────────────────────────
func _setup_tint_overlay() -> void:
	if not _tint_overlay.sprite_frames:
		return
	_tint_overlay.self_modulate = tint_color
	_tint_overlay.modulate.a   = 0.0
	_tint_overlay.play("idle")

	_tint_tween = create_tween().set_loops()
	_tint_tween.tween_property(_tint_overlay, "modulate:a", 0.28, 0.5).set_trans(Tween.TRANS_SINE)
	_tint_tween.tween_property(_tint_overlay, "modulate:a", 0.0,  0.5).set_trans(Tween.TRANS_SINE)

# ── Shield wobble ─────────────────────────────────────────────────────────────
func _start_shield_wobble() -> void:
	var base_scale: Vector2 = _sprite.scale
	_shield_tween = create_tween().set_loops()
	_shield_tween.tween_property(_sprite, "scale", base_scale * 1.12, 0.52).set_trans(Tween.TRANS_SINE)
	_shield_tween.tween_property(_sprite, "scale", base_scale,         0.52).set_trans(Tween.TRANS_SINE)

	var t2: Tween = create_tween().set_loops()
	t2.tween_property(_sprite, "rotation_degrees",  6.0, 0.44).set_trans(Tween.TRANS_SINE)
	t2.tween_property(_sprite, "rotation_degrees", -6.0, 0.44).set_trans(Tween.TRANS_SINE)

# ── Lifetime ──────────────────────────────────────────────────────────────────
func _start_lifetime() -> void:
	_lifetime_timer          = Timer.new()
	_lifetime_timer.one_shot = true
	_lifetime_timer.timeout.connect(despawn)
	add_child(_lifetime_timer)

func start_lifetime(duration: float) -> void:
	_lifetime_timer.wait_time = duration
	_lifetime_timer.start()

# ── Pickup ────────────────────────────────────────────────────────────────────
func _on_body_entered(body: Node) -> void:
	if is_picked_up:
		return
	if not body.has_method("apply_incoming_hit"):
		return
	_do_pickup(body)

func _do_pickup(fighter: Node) -> void:
	is_picked_up = true
	_lifetime_timer.stop()
	_kill_tweens()
	_apply_effect(fighter)
	emit_signal("picked_up")
	_play_catch()

func _apply_effect(fighter: Node) -> void:
	match loot_type:
		"hp":
			var hp: float     = fighter.get("hp") as float
			var max_hp: float = fighter.get("max_hp") as float
			fighter.set("hp", min(hp + 50.0, max_hp))
			fighter.get_node("Components/FighterCombat").call("reset_orbs")
			fighter.get_node("Components/FighterHUD").call("update")
			AudioManager.play_sfx("heal", 0.6, 0.3)

		"shield":
			fighter.set("shield_charges", 2)
			fighter.get_node("Components/FighterCombat").call("reset_orbs")
			AudioManager.play_sfx("shield_cast")

		"loot_pool":
			var powers: Array = fighter.get("special_powers") as Array
			if powers.size() < 2:
				powers.append(power)
			else:
				powers[1] = power
			fighter.set("special_powers", powers)
			AudioManager.play_sfx("power_catch", 1.0, 0.4)

		"eye":
			pass  # Sprint 6

func _play_catch() -> void:
	_tint_overlay.visible = false
	_glow.visible         = false
	_col_shape.disabled   = true

	if _sprite.sprite_frames and _sprite.sprite_frames.has_animation("catch"):
		_sprite.play("catch")
		_sprite.animation_finished.connect(queue_free)
	else:
		var t: Tween = create_tween()
		t.tween_property(_sprite, "modulate:a", 0.0, 0.25)
		t.tween_callback(queue_free)

# ── Despawn ───────────────────────────────────────────────────────────────────
func despawn() -> void:
	if is_picked_up:
		return
	is_picked_up = true
	_lifetime_timer.stop()
	_kill_tweens()
	emit_signal("despawned")

	var t: Tween = create_tween()
	t.tween_property(self, "modulate:a", 0.0, 0.4).set_trans(Tween.TRANS_SINE)
	t.tween_callback(queue_free)

# ── Helpers ───────────────────────────────────────────────────────────────────
func _kill_tweens() -> void:
	if _glow_tween:   _glow_tween.kill()
	if _tint_tween:   _tint_tween.kill()
	if _shield_tween: _shield_tween.kill()

func _make_radial_glow_tex(color: Color) -> ImageTexture:
	var size: int       = 128
	var img: Image      = Image.create(size, size, false, Image.FORMAT_RGBA8)
	var center: Vector2 = Vector2(size / 2.0, size / 2.0)
	var radius: float   = size / 2.0
	for y in size:
		for x in size:
			var dist : float = Vector2(x, y).distance_to(center)
			var t    : float = clamp(1.0 - dist / radius, 0.0, 1.0)
			# Falloff suave: forte no centro, cai devagar
			var alpha: float = pow(t, 0.6)
			img.set_pixel(x, y, Color(color.r, color.g, color.b, alpha))
	return ImageTexture.create_from_image(img)
