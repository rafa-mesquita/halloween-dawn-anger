extends BasePower

# ── Constantes (do original) ──────────────────────────────────────────────────
const TELEGRAPH_DURATION     := 1.3
const BEAM_HALF_WIDTH        := 85.0
const GROUND_ZONE_HEIGHT     := 110.0
const DAMAGE_BEAM            := 80.0
const DAMAGE_GROUND          := 100.0
const KNOCKBACK_Y            := -300.0
const IMPACT_FRAME_START     := 3
const IMPACT_FRAME_END       := 6

const SPRITE_SCALE           := 4.0
const SMITE_SCALE            := 4.0
const SMITE_FPS              := 14
const FURY_FPS               := 24
const SMITE_FRAMES           := 11
const FURY_FRAMES            := 12

const PATH_FURY  := "res://assets/sprites/Poder 1/HeavensFury_spritesheet.png"
const PATH_SMITE := "res://assets/sprites/Poder 1/Smite_spritesheet.png"
const FURY_FRAME_SIZE  := 128
const SMITE_FRAME_SIZE := 64

# ── Estado ────────────────────────────────────────────────────────────────────
var _surface_y    : float
var _hit_targets  : Array = []

# ── Execute ───────────────────────────────────────────────────────────────────
func execute() -> void:
	_surface_y = _find_surface_below(target_pos.x, target_pos.y)
	AudioManager.play_sfx("heavens_fury_cast")
	AudioManager.play_sfx("heavens_fury_belezam")
	_phase_telegraph()

# ── Fase 1: Telegraph ─────────────────────────────────────────────────────────
func _phase_telegraph() -> void:
	var beam_height: float = maxf(0.0, _surface_y)

	# Sprite smite no chão
	var smite: AnimatedSprite2D = _make_smite_sprite()
	smite.global_position = Vector2(target_pos.x, _surface_y)
	get_parent().add_child(smite)
	smite.play("smite")

	# Linha fina no centro (ADD blend)
	var core: ColorRect  = _make_rect(14.0, beam_height, Color(1.0, 0.965, 0.784, 0.1))
	core.global_position = Vector2(target_pos.x - 7.0, 0.0)
	_set_add_blend(core)
	get_parent().add_child(core)

	# Glow largo (ADD blend)
	var glow: ColorRect  = _make_rect(60.0, beam_height, Color(1.0, 0.835, 0.42, 0.1))
	glow.global_position = Vector2(target_pos.x - 30.0, 0.0)
	_set_add_blend(glow)
	get_parent().add_child(glow)

	await get_tree().create_timer(TELEGRAPH_DURATION).timeout

	smite.queue_free()
	core.queue_free()
	glow.queue_free()
	_phase_strike()

# ── Fase 2: Strike ────────────────────────────────────────────────────────────
func _phase_strike() -> void:
	AudioManager.play_sfx("heavens_fury_second")
	var beam_height: float = maxf(0.0, _surface_y)

	# Beam core (ADD)
	var beam_core: ColorRect  = _make_rect(26.0, beam_height, Color(1.0, 0.965, 0.784, 0.0))
	beam_core.global_position = Vector2(target_pos.x - 13.0, 0.0)
	_set_add_blend(beam_core)
	get_parent().add_child(beam_core)

	# Beam glow (ADD)
	var beam_glow: ColorRect  = _make_rect(90.0, beam_height, Color(1.0, 0.835, 0.42, 0.0))
	beam_glow.global_position = Vector2(target_pos.x - 45.0, 0.0)
	_set_add_blend(beam_glow)
	get_parent().add_child(beam_glow)

	# Tween: fade in → hold → fade out
	var t: Tween = create_tween()
	t.tween_property(beam_core, "modulate:a", 1.0, 0.08)
	t.parallel().tween_property(beam_glow, "modulate:a", 1.0, 0.08)
	t.tween_property(beam_core, "modulate:a", 0.0, 0.18).set_delay(0.18)
	t.parallel().tween_property(beam_glow, "modulate:a", 0.0, 0.18).set_delay(0.18)
	t.tween_callback(func() -> void:
		beam_core.queue_free()
		beam_glow.queue_free()
	)

	# Sprite do impacto
	var fury: AnimatedSprite2D = _make_fury_sprite()
	fury.global_position = Vector2(target_pos.x, _surface_y)
	get_parent().add_child(fury)
	fury.play("fury")

	# Dano nos frames corretos
	fury.frame_changed.connect(func() -> void:
		if fury.frame >= IMPACT_FRAME_START and fury.frame <= IMPACT_FRAME_END:
			_deal_damage()
	)

	fury.animation_finished.connect(func() -> void:
		fury.queue_free()
		finish()
	)

# ── Dano ──────────────────────────────────────────────────────────────────────
func _deal_damage() -> void:
	for fighter in get_tree().get_nodes_in_group("fighters"):
		if fighter == caster or fighter.get("is_dead") or fighter in _hit_targets:
			continue
		var fx: float = fighter.global_position.x
		var fy: float = fighter.global_position.y
		var ground_top: float    = _surface_y - GROUND_ZONE_HEIGHT
		var ground_bottom: float = _surface_y + 40.0

		if abs(fx - target_pos.x) <= BEAM_HALF_WIDTH and fy < ground_top:
			_hit_targets.append(fighter)
			deal_hit(fighter, DAMAGE_BEAM, 0.0, KNOCKBACK_Y)
		elif abs(fx - target_pos.x) <= BEAM_HALF_WIDTH and fy >= ground_top and fy <= ground_bottom:
			_hit_targets.append(fighter)
			deal_hit(fighter, DAMAGE_GROUND, 0.0, KNOCKBACK_Y)

# ── Helpers de sprite ─────────────────────────────────────────────────────────
func _make_smite_sprite() -> AnimatedSprite2D:
	var tex: Texture2D     = load(PATH_SMITE) as Texture2D
	var frames: SpriteFrames = SpriteFrames.new()
	frames.add_animation("smite")
	frames.set_animation_speed("smite", SMITE_FPS)
	frames.set_animation_loop("smite", false)
	var img_w: int = tex.get_width()
	for i in SMITE_FRAMES:
		var atlas: AtlasTexture = AtlasTexture.new()
		atlas.atlas  = tex
		atlas.region = Rect2(i * SMITE_FRAME_SIZE, 0, SMITE_FRAME_SIZE, SMITE_FRAME_SIZE)
		frames.add_frame("smite", atlas)
	var spr: AnimatedSprite2D = AnimatedSprite2D.new()
	spr.sprite_frames = frames
	spr.scale         = Vector2(SMITE_SCALE, SMITE_SCALE)
	spr.offset        = Vector2(0.0, -SMITE_FRAME_SIZE / 2.0)
	spr.z_index       = 5
	return spr

func _make_fury_sprite() -> AnimatedSprite2D:
	var tex: Texture2D       = load(PATH_FURY) as Texture2D
	var frames: SpriteFrames = SpriteFrames.new()
	frames.add_animation("fury")
	frames.set_animation_speed("fury", FURY_FPS)
	frames.set_animation_loop("fury", false)
	for i in FURY_FRAMES:
		var atlas: AtlasTexture = AtlasTexture.new()
		atlas.atlas  = tex
		atlas.region = Rect2(i * FURY_FRAME_SIZE, 0, FURY_FRAME_SIZE, FURY_FRAME_SIZE)
		frames.add_frame("fury", atlas)
	var spr: AnimatedSprite2D = AnimatedSprite2D.new()
	spr.sprite_frames = frames
	spr.scale         = Vector2(SPRITE_SCALE, SPRITE_SCALE)
	spr.offset        = Vector2(0.0, -FURY_FRAME_SIZE / 2.0)
	spr.z_index       = 6
	return spr

func _make_rect(w: float, h: float, col: Color) -> ColorRect:
	var r: ColorRect = ColorRect.new()
	r.size  = Vector2(w, h)
	r.color = col
	return r

func _set_add_blend(node: CanvasItem) -> void:
	var mat: CanvasItemMaterial = CanvasItemMaterial.new()
	mat.blend_mode = CanvasItemMaterial.BLEND_MODE_ADD
	node.material  = mat

# ── Encontra superfície abaixo do clique ──────────────────────────────────────
func _find_surface_below(wx: float, wy: float) -> float:
	var space: PhysicsDirectSpaceState2D = get_world_2d().direct_space_state
	var query: PhysicsRayQueryParameters2D = PhysicsRayQueryParameters2D.create(
		Vector2(wx, wy),
		Vector2(wx, wy + 2000.0)
	)
	query.collision_mask = 1
	var result: Dictionary = space.intersect_ray(query)
	if result:
		return result["position"].y
	return wy
