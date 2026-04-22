extends BasePower

# ── Constantes ────────────────────────────────────────────────────────────────
const SPEED      := 650.0
const VEL_Y      := -360.0
const BOUNCE_X   := 1.0
const BOUNCE_Y   := 0.25
const DAMAGE     := 25.0
const KNOCKUP    := -380.0
const STUN_DUR   := 4.0

const PATH_STUN := "res://assets/sprites/Poder 4 (Wheel)/stun.png"

# ── Nós ───────────────────────────────────────────────────────────────────────
@onready var _sprite : AnimatedSprite2D = $AnimatedSprite2D
@onready var _hitbox : Area2D           = $HitBox

# ── Estado ────────────────────────────────────────────────────────────────────
var _dir     : float  = 1.0
var _vel     : Vector2
var _gravity : float  = ProjectSettings.get_setting("physics/2d/default_gravity")
var _has_hit : bool   = false
var _air_sfx    : AudioStreamPlayer
var _ground_sfx : AudioStreamPlayer
var _on_ground  : bool = false

# ── Execute ───────────────────────────────────────────────────────────────────
func execute() -> void:
	_dir            = 1.0 if target_pos.x >= caster.global_position.x else -1.0
	_vel            = Vector2(_dir * SPEED, VEL_Y)
	global_position = caster.global_position
	_sprite.flip_h  = _dir > 0
	_sprite.play("roll")

	_hitbox.body_entered.connect(_on_body_entered)
	_air_sfx = AudioManager.play_sfx_loop("wheel_air")

# ── Physics manual ────────────────────────────────────────────────────────────
func _process(delta: float) -> void:
	if _has_hit:
		return

	_vel.y          += _gravity * delta
	global_position += _vel * delta

	var vp: Rect2 = get_viewport_rect()

	# Bounce nas bordas horizontais
	if global_position.x < 0.0 or global_position.x > vp.size.x:
		_vel.x         *= -BOUNCE_X
		global_position.x = clamp(global_position.x, 0.0, vp.size.x)

	# Bounce no chão via raycast
	if _vel.y > 0.0:
		var space: PhysicsDirectSpaceState2D    = get_world_2d().direct_space_state
		var q    : PhysicsRayQueryParameters2D  = PhysicsRayQueryParameters2D.create(
			global_position, global_position + Vector2(0, 10)
		)
		q.collision_mask = 2  # layer 2 = plataformas
		var hit: Dictionary = space.intersect_ray(q)
		if hit:
			if not _on_ground:
				_on_ground = true
				_switch_to_ground_sound()
			_vel.y            *= -BOUNCE_Y
			global_position.y  = (hit["position"] as Vector2).y - 4.0

	# Sai pela base
	if global_position.y > vp.size.y + 200:
		_cleanup_sounds()
		finish()

# ── Hit ───────────────────────────────────────────────────────────────────────
func _on_body_entered(body: Node) -> void:
	if _has_hit or body == caster:
		return
	if not body.has_method("apply_incoming_hit"):
		return
	if body.get("is_dead") or body.get("is_invulnerable"):
		return

	_has_hit = true
	AudioManager.play_sfx("wheel_hit",   0.5, 0.3)
	AudioManager.play_sfx("wheel_hit_2", 1.0, 1.3)

	deal_hit(body, DAMAGE, _dir * 80.0, KNOCKUP)
	_apply_stun(body)
	_spawn_explosion()
	_cleanup_sounds()
	finish()

func _apply_stun(target: Node) -> void:
	target.set("is_stunned", true)
	target.set("velocity",   Vector2.ZERO)

	if ResourceLoader.exists(PATH_STUN):
		var tex: Texture2D       = load(PATH_STUN) as Texture2D
		var frames: SpriteFrames = SpriteFrames.new()
		frames.add_animation("stun")
		frames.set_animation_speed("stun", 8.0)
		frames.set_animation_loop("stun", true)
		var a: AtlasTexture = AtlasTexture.new()
		a.atlas  = tex
		a.region = Rect2(0, 0, tex.get_width(), tex.get_height())
		frames.add_frame("stun", a)
		var spr: AnimatedSprite2D = AnimatedSprite2D.new()
		spr.sprite_frames = frames
		spr.position      = Vector2(0.0, -80.0)
		spr.scale         = Vector2(1.2, 1.2)
		spr.z_index       = 6
		target.add_child(spr)
		spr.play("stun")
		get_tree().create_timer(STUN_DUR).timeout.connect(func() -> void:
			if is_instance_valid(spr): spr.queue_free()
		)

	get_tree().create_timer(STUN_DUR).timeout.connect(func() -> void:
		if is_instance_valid(target):
			target.set("is_stunned", false)
	)

func _spawn_explosion() -> void:
	var pos: Vector2 = global_position
	# Ring principal
	var ring: Node2D = Node2D.new()
	get_parent().add_child(ring)
	ring.global_position = pos
	var mat: CanvasItemMaterial = CanvasItemMaterial.new()
	mat.blend_mode = CanvasItemMaterial.BLEND_MODE_ADD
	ring.material  = mat
	var t: Tween   = ring.create_tween()
	t.tween_property(ring, "scale",       Vector2(4.0, 4.0), 0.42).set_trans(Tween.TRANS_CUBIC)
	t.parallel().tween_property(ring, "modulate:a", 0.0, 0.42)
	t.tween_callback(ring.queue_free)

	# Puffs radiais
	for i in 8:
		var puff: Node2D = Node2D.new()
		get_parent().add_child(puff)
		puff.global_position = pos
		var angle: float = (TAU / 8.0) * i + randf() * 0.6
		var dist : float = 35.0 + randf() * 30.0
		var tp   : Tween = puff.create_tween()
		tp.tween_property(puff, "global_position",
			pos + Vector2(cos(angle), sin(angle)) * dist + Vector2(0, -10), 0.38
		).set_trans(Tween.TRANS_CUBIC)
		tp.parallel().tween_property(puff, "modulate:a", 0.0, 0.38)
		tp.tween_callback(puff.queue_free)

# ── Sons ──────────────────────────────────────────────────────────────────────
func _switch_to_ground_sound() -> void:
	if _air_sfx: AudioManager.stop_sfx(_air_sfx)
	_air_sfx    = null
	_ground_sfx = AudioManager.play_sfx_loop("wheel_ground")

func _cleanup_sounds() -> void:
	if _air_sfx:    AudioManager.stop_sfx(_air_sfx)
	if _ground_sfx: AudioManager.stop_sfx(_ground_sfx)
