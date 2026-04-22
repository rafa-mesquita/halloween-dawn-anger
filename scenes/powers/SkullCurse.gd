extends BasePower

# ── Constantes ────────────────────────────────────────────────────────────────
const SPEED        := 600.0
const DOT_INTERVAL := 0.5
const DOT_TICKS    := 20
const DOT_PER_TICK := 1.5
const DEBUFF_DUR   := 10.0
const MULT         := 1.6
const SLOW_DUR     := 2.0
const SLOW_FACTOR  := 0.4

const VFX_FRAME_W  := 64
const VFX_FRAME_H  := 67
const VFX_FRAMES   := 12
const VFX_FPS      := 14
const VFX_SCALE    := 1.8
const PATH_VFX     := "res://assets/sprites/Poder 3 (skull curse)/518.png"

# ── Nós ───────────────────────────────────────────────────────────────────────
@onready var _sprite : AnimatedSprite2D = $AnimatedSprite2D
@onready var _hitbox : Area2D           = $HitBox

# ── Estado ────────────────────────────────────────────────────────────────────
var _velocity : Vector2
var _has_hit  : bool = false

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	await get_tree().process_frame  # garante que @onready já foi resolvido
	execute()

# ── Execute ───────────────────────────────────────────────────────────────────
func execute() -> void:
	AudioManager.play_sfx("skull_cast", 1.6)

	var dir_vec: Vector2 = (target_pos - caster.global_position).normalized()
	_velocity        = dir_vec * SPEED
	global_position  = caster.global_position
	_sprite.flip_h   = dir_vec.x < 0
	_sprite.rotation = atan2(dir_vec.y, abs(dir_vec.x)) * sign(dir_vec.x) if dir_vec.x != 0 else atan2(dir_vec.y, 0)

	_hitbox.body_entered.connect(_on_body_entered)
	_sprite.play("fly")

# ── Movimento ─────────────────────────────────────────────────────────────────
func _process(delta: float) -> void:
	if _has_hit:
		return
	global_position += _velocity * delta
	var vp: Rect2 = get_viewport_rect()
	if global_position.x < -200 or global_position.x > vp.size.x + 200 \
	or global_position.y < -200 or global_position.y > vp.size.y + 200:
		finish()

# ── Hit ───────────────────────────────────────────────────────────────────────
func _on_body_entered(body: Node) -> void:
	if _has_hit or body == caster:
		return
	if not body.has_method("apply_incoming_hit"):
		return
	if body.get("is_dead") or body.get("is_invulnerable"):
		return
	_has_hit  = true
	_velocity = Vector2.ZERO
	_sprite.play("hit")
	_sprite.animation_finished.connect(finish)
	_apply_curse(body)

func _apply_curse(target: Node) -> void:
	AudioManager.play_sfx("skull_hit")
	target.set("curse_multiplier", MULT)
	target.set("curse_slow", SLOW_FACTOR)

	# VFX roxo no alvo
	_spawn_curse_vfx(target)

	# DoT
	var ticks_done: int = 0
	var do_tick: Callable
	do_tick = func() -> void:
		if not is_instance_valid(target) or target.get("is_dead"):
			return
		target.apply_incoming_hit({"damage": DOT_PER_TICK, "knock_x": 0.0, "knock_y": 0.0})
		ticks_done += 1
		if ticks_done < DOT_TICKS:
			get_tree().create_timer(DOT_INTERVAL).timeout.connect(do_tick)
	get_tree().create_timer(DOT_INTERVAL).timeout.connect(do_tick)

	# Remove slow
	get_tree().create_timer(SLOW_DUR).timeout.connect(func() -> void:
		if is_instance_valid(target):
			target.set("curse_slow", 1.0)
	)

	# Remove debuff completo
	get_tree().create_timer(DEBUFF_DUR).timeout.connect(func() -> void:
		if is_instance_valid(target):
			target.set("curse_multiplier", 1.0)
			target.set("curse_slow", 1.0)
	)

func _spawn_curse_vfx(target: Node) -> void:
	if not ResourceLoader.exists(PATH_VFX):
		return
	var tex: Texture2D       = load(PATH_VFX) as Texture2D
	var frames: SpriteFrames = SpriteFrames.new()
	frames.add_animation("vfx")
	frames.set_animation_speed("vfx", VFX_FPS)
	frames.set_animation_loop("vfx", false)
	for i in VFX_FRAMES:
		var a: AtlasTexture = AtlasTexture.new()
		a.atlas  = tex
		a.region = Rect2(i * VFX_FRAME_W, 0, VFX_FRAME_W, VFX_FRAME_H)
		frames.add_frame("vfx", a)
	var spr: AnimatedSprite2D = AnimatedSprite2D.new()
	spr.sprite_frames = frames
	spr.scale         = Vector2(VFX_SCALE, VFX_SCALE)
	spr.z_index       = 6
	var mat: CanvasItemMaterial = CanvasItemMaterial.new()
	mat.blend_mode = CanvasItemMaterial.BLEND_MODE_ADD
	spr.material   = mat
	target.add_child(spr)
	spr.play("vfx")
	spr.animation_finished.connect(spr.queue_free)
