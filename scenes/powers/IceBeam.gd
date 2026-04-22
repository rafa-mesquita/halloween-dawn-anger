extends BasePower

# ── Constantes ────────────────────────────────────────────────────────────────
const CAST_DUR          := 0.8
const BEAM_DUR          := 3.0
const TICK_INTERVAL     := 0.1
const FOLLOW_STRENGTH   := 0.035
const BEAM_REACH        := 2400.0
const HIT_RADIUS        := 42.0
const HITS_TO_FREEZE    := 12
const FREEZE_DUR        := 4.0
const SLOW_START        := 0.55
const SLOW_MIN          := 0.15
const SLOW_DUR          := 0.7
const THICKNESS_BASE    := 22.0

const CAST_FRAME_SIZE := 64
const CAST_FRAMES     := 7
const CAST_FPS        := 14
const HIT_FRAME_SIZE  := 64
const HIT_FRAMES      := 12
const HIT_FPS         := 14
const HIT_SCALE       := 1.0

const PATH_CAST := "res://assets/sprites/Power 7 (ice beam)/Spell cast.png"
const PATH_HIT  := "res://assets/sprites/Power 7 (ice beam)/Ice VFX 1 Hit.png"

# ── Estado ────────────────────────────────────────────────────────────────────
var _state        : String = "casting"   # "casting" | "active" | "done"
var _elapsed      : float  = 0.0
var _tick_elapsed : float  = 0.0
var _angle        : float  = 0.0
var _line         : Line2D
var _cast_spr     : AnimatedSprite2D
var _cast_sfx     : AudioStreamPlayer
var _ice_counts   : Dictionary = {}   # target → int (tick count)

# ── Execute ───────────────────────────────────────────────────────────────────
func execute() -> void:
	_angle = atan2(target_pos.y - caster.global_position.y,
	               target_pos.x - caster.global_position.x)

	AudioManager.play_sfx("ice_cast", 0.9)

	_build_line()
	_build_cast_sprite()
	set_process(true)

func _build_line() -> void:
	_line = Line2D.new()
	_line.default_color = Color(0.88, 0.95, 1.0, 0.9)
	_line.width         = THICKNESS_BASE
	_line.visible       = false
	get_parent().add_child(_line)

func _build_cast_sprite() -> void:
	if not ResourceLoader.exists(PATH_CAST):
		return
	var tex: Texture2D       = load(PATH_CAST) as Texture2D
	var frames: SpriteFrames = SpriteFrames.new()
	frames.add_animation("cast")
	frames.set_animation_speed("cast", CAST_FPS)
	frames.set_animation_loop("cast", false)
	for i in CAST_FRAMES:
		var a: AtlasTexture = AtlasTexture.new()
		a.atlas  = tex
		a.region = Rect2(i * CAST_FRAME_SIZE, 0, CAST_FRAME_SIZE, CAST_FRAME_SIZE)
		frames.add_frame("cast", a)
	_cast_spr = AnimatedSprite2D.new()
	_cast_spr.sprite_frames = frames
	_cast_spr.scale = Vector2(3.2, 3.2)
	_cast_spr.z_index = 6
	get_parent().add_child(_cast_spr)
	_cast_spr.play("cast")

# ── Process ───────────────────────────────────────────────────────────────────
func _process(delta: float) -> void:
	if not is_instance_valid(caster) or caster.get("is_dead"):
		_end_beam()
		return

	_elapsed += delta
	var cx: float = caster.global_position.x
	var cy: float = caster.global_position.y

	# Segue o mouse suavemente
	var mouse: Vector2    = caster.get_viewport().get_mouse_position() + \
	                        caster.get_viewport().get_screen_transform().origin
	var target_angle: float = atan2(mouse.y - cy, mouse.x - cx)
	_angle = lerp_angle(_angle, target_angle, FOLLOW_STRENGTH)

	var end: Vector2 = Vector2(cx + cos(_angle) * BEAM_REACH,
	                           cy + sin(_angle) * BEAM_REACH)

	match _state:
		"casting":
			# Posiciona sprite de cast
			if _cast_spr:
				var facing: float = 1.0 if cos(_angle) >= 0.0 else -1.0
				_cast_spr.global_position = Vector2(cx + facing * 20.0, cy - 8.0)
				_cast_spr.flip_h = facing < 0.0

			if _elapsed >= CAST_DUR:
				_state = "active"
				_elapsed = 0.0
				if _cast_spr:
					_cast_spr.queue_free()
					_cast_spr = null
				_line.visible = true

		"active":
			_draw_beam(cx, cy, end.x, end.y, min(_elapsed / 0.3, 1.0))
			_tick_elapsed += delta
			if _tick_elapsed >= TICK_INTERVAL:
				_tick_elapsed = 0.0
				_do_tick(cx, cy, end.x, end.y)

			if _elapsed >= BEAM_DUR:
				_end_beam()

func _draw_beam(cx: float, cy: float, ex: float, ey: float, intensity: float) -> void:
	var thickness: float = THICKNESS_BASE * intensity
	_line.width = thickness
	_line.clear_points()
	_line.add_point(Vector2(cx, cy))
	_line.add_point(Vector2(ex, ey))

	# Cores em camadas via gradiente
	var grad: Gradient = Gradient.new()
	grad.set_color(0, Color(0.22, 0.75, 0.98, 0.3 * intensity))
	grad.set_color(1, Color(0.49, 0.85, 0.99, 0.6 * intensity))
	_line.gradient = grad

func _do_tick(cx: float, cy: float, ex: float, ey: float) -> void:
	for fighter in get_tree().get_nodes_in_group("fighters"):
		if fighter == caster or fighter.get("is_dead") or fighter.get("is_invulnerable"):
			continue
		if _point_near_segment(fighter.global_position, Vector2(cx, cy), Vector2(ex, ey)):
			_hit_fighter(fighter)

func _hit_fighter(target: Node) -> void:
	var count: int = _ice_counts.get(target, 0) + 1
	_ice_counts[target] = count

	var progress: float = minf(float(count) / HITS_TO_FREEZE, 1.0)
	var slow: float     = SLOW_START - progress * (SLOW_START - SLOW_MIN)
	target.set("curse_slow", slow)

	# Slow temporário
	get_tree().create_timer(SLOW_DUR).timeout.connect(func() -> void:
		if is_instance_valid(target) and not target.get("is_dead"):
			# Só reseta se não tiver outro slow ativo
			if _ice_counts.get(target, 0) <= 0:
				target.set("curse_slow", 1.0)
	)

	# Hit VFX
	_spawn_hit_vfx(target.global_position)
	AudioManager.play_sfx("ice_crash", 0.9)

	if count >= HITS_TO_FREEZE:
		_freeze(target)

func _freeze(target: Node) -> void:
	target.set("is_frozen", true)
	_ice_counts[target] = 0

	# Visual de congelado
	if ResourceLoader.exists("res://assets/sprites/Power 7 (ice beam)/Player congelado.png"):
		var frozen_spr: Sprite2D = Sprite2D.new()
		frozen_spr.texture  = load("res://assets/sprites/Power 7 (ice beam)/Player congelado.png") as Texture2D
		frozen_spr.z_index  = 7
		target.add_child(frozen_spr)
		get_tree().create_timer(FREEZE_DUR).timeout.connect(func() -> void:
			if is_instance_valid(frozen_spr):
				frozen_spr.queue_free()
		)

	get_tree().create_timer(FREEZE_DUR).timeout.connect(func() -> void:
		if is_instance_valid(target):
			target.set("is_frozen", false)
			target.set("curse_slow", 1.0)
	)

func _end_beam() -> void:
	if _state == "done":
		return
	_state = "done"
	if _cast_spr and is_instance_valid(_cast_spr):
		_cast_spr.queue_free()
	if _line and is_instance_valid(_line):
		_line.queue_free()
	finish()

# ── Helpers ───────────────────────────────────────────────────────────────────
func _point_near_segment(pt: Vector2, a: Vector2, b: Vector2) -> bool:
	var ab: Vector2 = b - a
	var ap: Vector2 = pt - a
	var t: float    = clamp(ap.dot(ab) / ab.length_squared(), 0.0, 1.0)
	var closest: Vector2 = a + ab * t
	return pt.distance_to(closest) <= HIT_RADIUS

func _spawn_hit_vfx(pos: Vector2) -> void:
	if not ResourceLoader.exists(PATH_HIT):
		return
	var tex: Texture2D       = load(PATH_HIT) as Texture2D
	var frames: SpriteFrames = SpriteFrames.new()
	frames.add_animation("hit")
	frames.set_animation_speed("hit", HIT_FPS)
	frames.set_animation_loop("hit", false)
	for i in HIT_FRAMES:
		var a: AtlasTexture = AtlasTexture.new()
		a.atlas  = tex
		a.region = Rect2(i * HIT_FRAME_SIZE, 0, HIT_FRAME_SIZE, HIT_FRAME_SIZE)
		frames.add_frame("hit", a)
	var spr: AnimatedSprite2D = AnimatedSprite2D.new()
	spr.sprite_frames    = frames
	spr.global_position  = pos
	spr.scale            = Vector2(HIT_SCALE, HIT_SCALE)
	spr.z_index          = 6
	get_parent().add_child(spr)
	spr.play("hit")
	spr.animation_finished.connect(spr.queue_free)
