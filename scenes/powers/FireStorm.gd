extends BasePower

# ── Constantes ────────────────────────────────────────────────────────────────
const WAVES          := 2
const WAVE_DELAY     := 1.1
const RAYS           := 8
const SPEED          := 520.0
const DAMAGE         := 18.0
const RAY_BODY       := 42.0
const SPRITE_SCALE   := 2.5
const FPS            := 20
const FRAME_W        := 64
const FRAME_H        := 64
const FRAMES_PER_ROW := 14
const HIT_FRAME_SIZE := 160
const HIT_FRAMES     := 8
const HIT_FPS        := 20
const HIT_SCALE      := 1.4
const RAY_LIFETIME   := 1.5

const PATH_RAY := "res://assets/sprites/Poder 5 (fire storm)/579.png"
const PATH_HIT := "res://assets/sprites/Poder 5 (fire storm)/hit.png"

# ── Estado ────────────────────────────────────────────────────────────────────
# Cada ray: { node, vel, elapsed, hit_set }
var _rays    : Array = []
var _waves_done : int = 0

# ── Execute ───────────────────────────────────────────────────────────────────
func execute() -> void:
	_spawn_wave()
	if WAVES > 1:
		get_tree().create_timer(WAVE_DELAY).timeout.connect(func() -> void:
			if is_instance_valid(self) and is_instance_valid(caster) and not caster.get("is_dead"):
				_spawn_wave()
		)

func _spawn_wave() -> void:
	AudioManager.play_sfx("fire_cast",   1.0, 0.2)
	AudioManager.play_sfx("fire_cast_2", 1.0, 0.4)

	var origin: Vector2 = caster.global_position
	_spawn_hit_vfx(origin)

	var hit_set: Array = []
	for i in RAYS:
		var angle: float = (TAU / RAYS) * i
		_add_ray(origin, angle, hit_set)

func _add_ray(origin: Vector2, angle: float, hit_set: Array) -> void:
	var ray_node: Node2D = Node2D.new()
	ray_node.global_position = origin
	get_parent().add_child(ray_node)

	# Sprite
	var spr: AnimatedSprite2D = _make_ray_sprite()
	spr.rotation = angle
	var mat: CanvasItemMaterial = CanvasItemMaterial.new()
	mat.blend_mode = CanvasItemMaterial.BLEND_MODE_ADD
	spr.material   = mat
	ray_node.add_child(spr)
	spr.play("ray")

	# Hitbox
	var area: Area2D          = Area2D.new()
	area.collision_layer = 0
	area.collision_mask  = 1
	var col: CollisionShape2D = CollisionShape2D.new()
	var circ: CircleShape2D   = CircleShape2D.new()
	circ.radius = RAY_BODY
	col.shape   = circ
	area.add_child(col)
	ray_node.add_child(area)

	var vel: Vector2 = Vector2(cos(angle), sin(angle)) * SPEED
	area.body_entered.connect(func(body: Node) -> void:
		if body == caster or body in hit_set:
			return
		if not body.has_method("apply_incoming_hit"):
			return
		if body.get("is_dead") or body.get("is_invulnerable"):
			return
		hit_set.append(body)
		deal_hit(body, DAMAGE, vel.x * 0.2, -150.0)
	)

	_rays.append({ "node": ray_node, "vel": vel, "elapsed": 0.0 })

# ── Process — move todos os raios ─────────────────────────────────────────────
func _process(delta: float) -> void:
	var vp: Rect2 = get_viewport_rect()
	var to_remove: Array = []

	for ray in _rays:
		var node: Node2D = ray["node"]
		if not is_instance_valid(node):
			to_remove.append(ray)
			continue
		ray["elapsed"] += delta
		node.global_position += (ray["vel"] as Vector2) * delta

		var pos: Vector2 = node.global_position
		if ray["elapsed"] > RAY_LIFETIME \
		or pos.x < -150 or pos.x > vp.size.x + 150 \
		or pos.y < -150 or pos.y > vp.size.y + 150:
			node.queue_free()
			to_remove.append(ray)

	for r in to_remove:
		_rays.erase(r)

	# Destroi o poder quando não há mais raios e já passou tempo suficiente
	if _rays.is_empty() and not _waves_done < WAVES:
		finish()

# ── VFX de impacto no caster ──────────────────────────────────────────────────
func _spawn_hit_vfx(pos: Vector2) -> void:
	if not ResourceLoader.exists(PATH_HIT):
		return
	var spr: AnimatedSprite2D = _make_hit_sprite()
	spr.global_position = pos
	get_parent().add_child(spr)
	spr.play("hit")
	spr.animation_finished.connect(spr.queue_free)

# ── Sprites ───────────────────────────────────────────────────────────────────
func _make_ray_sprite() -> AnimatedSprite2D:
	var tex: Texture2D       = load(PATH_RAY) as Texture2D
	var frames: SpriteFrames = SpriteFrames.new()
	frames.add_animation("ray")
	frames.set_animation_speed("ray", FPS)
	frames.set_animation_loop("ray", false)
	var cols: int = tex.get_width()  / FRAME_W
	var rows: int = tex.get_height() / FRAME_H
	var total: int = cols * rows
	for i in total:
		var c: int = i % cols
		var r: int = i / cols
		var a: AtlasTexture = AtlasTexture.new()
		a.atlas  = tex
		a.region = Rect2(c * FRAME_W, r * FRAME_H, FRAME_W, FRAME_H)
		frames.add_frame("ray", a)
	var spr: AnimatedSprite2D = AnimatedSprite2D.new()
	spr.sprite_frames = frames
	spr.scale         = Vector2(SPRITE_SCALE, SPRITE_SCALE)
	spr.z_index       = 5
	return spr

func _make_hit_sprite() -> AnimatedSprite2D:
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
	spr.sprite_frames = frames
	spr.scale         = Vector2(HIT_SCALE, HIT_SCALE)
	spr.z_index       = 6
	var mat: CanvasItemMaterial = CanvasItemMaterial.new()
	mat.blend_mode = CanvasItemMaterial.BLEND_MODE_ADD
	spr.material   = mat
	return spr
