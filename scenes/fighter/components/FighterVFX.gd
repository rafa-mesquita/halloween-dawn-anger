extends Node
class_name FighterVFX

# ── VFX: Slam Trail ───────────────────────────────────────────────────────────
@export_group("VFX - Slam Trail")
@export var slam_trail_interval  := 0.028
@export var slam_trail_alpha     := 0.3
@export var slam_trail_duration  := 0.32
@export var slam_streak_radius   := 10.0
@export var slam_streak_alpha    := 0.5
@export var slam_streak_duration := 0.48

# ── VFX: Double Jump ──────────────────────────────────────────────────────────
@export_group("VFX - Double Jump")
@export var djump_plat_width    := 60.0
@export var djump_plat_height   := 8.0
@export var djump_plat_alpha    := 0.35
@export var djump_plat_duration := 0.32
@export var djump_plat_y_offset := 20.0
@export var djump_puff_count    := 6
@export var djump_puff_radius   := 6.0
@export var djump_puff_alpha    := 0.7
@export var djump_puff_distance := 55.0
@export var djump_ghost_alpha   := 0.5

# ── VFX: Glow Silhueta ────────────────────────────────────────────────────────
@export_group("VFX - Glow Silhueta")
@export var sil_glow_scale := 1.12
@export var sil_glow_alpha := 0.4

const HIT_FLASH_DURATION := 0.28

var _f              : CharacterBody2D
var _sil_shader     : Shader
var _slam_timer     := 0.0
var _hit_flash_spr  : Sprite2D

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	_f = get_parent().get_parent() as CharacterBody2D

func setup_hit_flash() -> void:
	var mat := ShaderMaterial.new()
	mat.shader = load("res://shaders/hit_flash_overlay.gdshader")
	mat.set_shader_parameter("silhouette_color", Color(1.0, 0.0, 0.0, 1.0))

	_hit_flash_spr              = Sprite2D.new()
	_hit_flash_spr.material     = mat
	_hit_flash_spr.modulate.a   = 0.0
	_hit_flash_spr.z_index      = _f.sprite.z_index + 1
	_f.add_child(_hit_flash_spr)

func _process(_delta: float) -> void:
	if not _hit_flash_spr or not _f.sprite or not _f.sprite.sprite_frames:
		return
	var spr: AnimatedSprite2D = _f.sprite as AnimatedSprite2D
	_hit_flash_spr.texture         = spr.sprite_frames.get_frame_texture(spr.animation, spr.frame)
	_hit_flash_spr.global_position = spr.global_position
	_hit_flash_spr.scale           = spr.scale
	_hit_flash_spr.flip_h          = spr.flip_h
	_hit_flash_spr.centered        = spr.centered

func trigger_hit_flash() -> void:
	if not _hit_flash_spr:
		return
	_hit_flash_spr.modulate.a = 1.0
	var t: Tween = create_tween()
	t.tween_property(_hit_flash_spr, "modulate:a", 0.0, 0.28)

# ── Slam Trail ────────────────────────────────────────────────────────────────
func update_slam_trail() -> void:
	if not _f._slamming:
		return
	_slam_timer -= get_physics_process_delta_time()
	if _slam_timer > 0.0:
		return
	_slam_timer = slam_trail_interval

	var pos := _f.global_position

	var sil := _make_silhouette(slam_trail_alpha)
	var t1  := sil.create_tween()
	t1.tween_property(sil, "modulate:a", 0.0, slam_trail_duration).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
	t1.tween_callback(sil.queue_free)

	var streak := _make_glow_circle(pos, slam_streak_radius, _f.char_color, slam_streak_alpha)
	var t2     := streak.create_tween()
	t2.tween_property(streak, "modulate:a", 0.0, slam_streak_duration).set_trans(Tween.TRANS_EXPO)
	t2.parallel().tween_property(streak, "scale", Vector2(0.3, 0.3), slam_streak_duration)
	t2.tween_callback(streak.queue_free)

# ── Double Jump ───────────────────────────────────────────────────────────────
func spawn_double_jump_effect() -> void:
	var pos := _f.global_position

	# Mini plataforma
	var plat      := ColorRect.new()
	plat.color    = Color(_f.char_color.r, _f.char_color.g, _f.char_color.b, djump_plat_alpha)
	plat.size     = Vector2(djump_plat_width, djump_plat_height)
	plat.position = Vector2(-djump_plat_width / 2.0, 0.0)
	plat.z_index  = _f.sprite.z_index - 1

	var wrap := Node2D.new()
	wrap.global_position = Vector2(pos.x, pos.y + djump_plat_y_offset)
	wrap.add_child(plat)
	get_tree().current_scene.add_child(wrap)

	var t1 := wrap.create_tween()
	t1.tween_property(wrap, "scale", Vector2(1.6, 0.1), djump_plat_duration).set_trans(Tween.TRANS_EXPO).set_ease(Tween.EASE_OUT)
	t1.parallel().tween_property(wrap, "modulate:a", 0.0, djump_plat_duration).set_trans(Tween.TRANS_SINE)
	t1.tween_callback(wrap.queue_free)

	# Puffs
	for i in djump_puff_count:
		var angle  := (PI * 2.0 / djump_puff_count) * i
		var puff   := _make_glow_circle(pos, djump_puff_radius, _f.char_color, djump_puff_alpha)
		var target := pos + Vector2(cos(angle), sin(angle)) * djump_puff_distance
		var t2 := puff.create_tween()
		t2.tween_property(puff, "global_position", target, 0.32).set_trans(Tween.TRANS_EXPO).set_ease(Tween.EASE_OUT)
		t2.parallel().tween_property(puff, "modulate:a", 0.0, 0.32)
		t2.tween_callback(puff.queue_free)

	# Ghost
	var ghost := _make_silhouette(djump_ghost_alpha)
	var t3    := ghost.create_tween()
	t3.tween_property(ghost, "modulate:a", 0.0, 0.3).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
	t3.tween_callback(ghost.queue_free)

# ── Hit Flash & Damage Number ─────────────────────────────────────────────────
func spawn_damage_number(amount: float) -> void:
	var label := Label.new()
	label.text = str(int(amount))
	label.add_theme_font_size_override("font_size", 18)
	label.add_theme_color_override("font_color", Color.WHITE)
	label.global_position = _f.global_position + Vector2(-10, -60)
	get_tree().current_scene.add_child(label)

	var t := label.create_tween()
	t.tween_property(label, "position:y", label.position.y - 50, 0.6).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
	t.parallel().tween_property(label, "modulate:a", 0.0, 0.6).set_trans(Tween.TRANS_SINE)
	t.tween_callback(label.queue_free)

# ── Helpers ───────────────────────────────────────────────────────────────────
func _make_silhouette(alpha: float) -> Sprite2D:
	if not _sil_shader:
		_sil_shader = load("res://shaders/silhouette.gdshader")

	var spr: AnimatedSprite2D = _f.sprite
	var tex: Texture2D = spr.sprite_frames.get_frame_texture(spr.animation, spr.frame)
	var col: Color = Color(_f.char_color.r, _f.char_color.g, _f.char_color.b, 1.0)

	# Glow
	var glow     := Sprite2D.new()
	var glow_mat := ShaderMaterial.new()
	glow_mat.shader = _sil_shader
	glow_mat.set_shader_parameter("silhouette_color", Color(col.r, col.g, col.b, alpha * sil_glow_alpha))
	glow.material        = glow_mat
	glow.texture         = tex
	glow.global_position = spr.global_position
	glow.scale           = spr.scale * sil_glow_scale
	glow.flip_h          = spr.flip_h
	glow.centered        = spr.centered
	glow.z_index         = spr.z_index - 2
	get_tree().current_scene.add_child(glow)
	var tg := glow.create_tween()
	tg.tween_property(glow, "modulate:a", 0.0, 0.35).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
	tg.tween_callback(glow.queue_free)

	# Silhueta
	var sil     := Sprite2D.new()
	var sil_mat := ShaderMaterial.new()
	sil_mat.shader = _sil_shader
	sil_mat.set_shader_parameter("silhouette_color", Color(col.r, col.g, col.b, alpha))
	sil.material        = sil_mat
	sil.texture         = tex
	sil.global_position = spr.global_position
	sil.scale           = spr.scale
	sil.flip_h          = spr.flip_h
	sil.centered        = spr.centered
	sil.z_index         = spr.z_index - 1
	get_tree().current_scene.add_child(sil)

	return sil

func _make_glow_circle(pos: Vector2, radius: float, color: Color, alpha: float) -> Sprite2D:
	var grad        := GradientTexture2D.new()
	grad.width      = int(radius * 2)
	grad.height     = int(radius * 2)
	grad.fill       = GradientTexture2D.FILL_RADIAL
	var g           := Gradient.new()
	g.set_color(0, Color(color.r, color.g, color.b, 1.0))
	g.set_color(1, Color(color.r, color.g, color.b, 0.0))
	grad.gradient   = g

	var s           := Sprite2D.new()
	s.texture         = grad
	s.global_position = pos
	s.modulate        = Color(1, 1, 1, alpha)
	s.z_index         = _f.sprite.z_index - 1
	var mat           := CanvasItemMaterial.new()
	mat.blend_mode    = CanvasItemMaterial.BLEND_MODE_ADD
	s.material        = mat
	get_tree().current_scene.add_child(s)

	return s
