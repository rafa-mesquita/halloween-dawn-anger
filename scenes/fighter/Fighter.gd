extends CharacterBody2D

# ── Constantes ────────────────────────────────────────────────────────────────
const JUMP_LOCKOUT      := 0.12
const HIT_FLASH_DURATION := 0.28

# ── Referências de nós ────────────────────────────────────────────────────────
@export var sprite       : AnimatedSprite2D
@export var glow_light   : PointLight2D
@export var attack_area  : Area2D
@export var attack_shape : CollisionShape2D

# ── Componentes (filhos na scene tree) ────────────────────────────────────────
@onready var combat       : FighterCombat  = $Components/FighterCombat
@onready var hud          : FighterHUD     = $Components/FighterHUD
@onready var vfx          : FighterVFX     = $Components/FighterVFX
@onready var respawn_comp : FighterRespawn = $Components/FighterRespawn
@onready var inventory    : FighterInventory = $Components/FighterInventory

# ── Controle ──────────────────────────────────────────────────────────────────
@export_group("Controle")
@export var player_controlled: bool = true

# ── Stats ─────────────────────────────────────────────────────────────────────
@export_group("Stats")
@export var move_speed      := 420.0
@export var jump_velocity   := -700.0
@export var double_jump_vel := -540.0
@export var slam_velocity   :=  850.0
@export var fall_mult       := 2.8
@export var djump_fall_mult := 3.8
@export var max_hp          := 100.0

# ── Aparência ─────────────────────────────────────────────────────────────────
@export_group("Aparência")
@export var char_color           : Color = Color(1.0, 0.5, 0.1)
@export var helmet_source_hue    : float = 0.0
@export var helmet_hue_tolerance : float = 30.0
@export var helmet_min_saturation: float = 0.2

# ── Estado ────────────────────────────────────────────────────────────────────
var hp               := 100.0
var lives            := 3
var is_dead          := false
var is_invulnerable  := false
var shield_charges   := 0
var curse_multiplier := 1.0
var curse_slow       := 1.0   ## fator de slow da skull curse (1.0 = normal)
var is_stunned       := false  ## stun da wheel
var is_frozen        := false  ## freeze do ice beam
var ice_tick_count   := 0      ## acumulador de hits do ice beam
var special_powers   : Array[String] = []

var _double_jumped   := false
var _jump_count      := 0
var _last_jump_time  := 0.0
var _facing          := 1
var _slamming        := false

var _sprite_base_offset: Vector2
var _gravity: float = ProjectSettings.get_setting("physics/2d/default_gravity")

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	hp = max_hp
	collision_layer = 1  # layer 1 = fighter (colide com plataformas)
	collision_mask  = 2  # mask 2 = só plataformas, não colide com outros fighters
	add_to_group("fighters")

	if glow_light:
		glow_light.color = char_color
	if sprite:
		_sprite_base_offset = sprite.offset
	_apply_palette_swap()

	# Inicializa componentes após todos os _ready filhos terem rodado
	combat.setup()
	hud.build_orbs(combat.max_attack_orbs)
	vfx.setup_hit_flash()

func _unhandled_input(event: InputEvent) -> void:
	if not player_controlled or is_dead:
		return
	if event is InputEventMouseButton and event.pressed:
		if event.button_index == MOUSE_BUTTON_LEFT:
			combat.try_attack()
		elif event.button_index == MOUSE_BUTTON_RIGHT:
			inventory.try_cast(get_global_mouse_position())
	if event is InputEventKey and event.pressed and not event.echo:
		if event.keycode == KEY_Q:
			inventory.swap_powers()

func _physics_process(delta: float) -> void:
	if is_dead:
		return
	_apply_gravity(delta)
	if player_controlled:
		_handle_movement()
		_handle_jump()
	else:
		velocity.x = 0.0
	_update_animation()
	vfx.update_slam_trail()
	combat.update(delta)
	hud.update()
	move_and_slide()

# ── Física ────────────────────────────────────────────────────────────────────
func _apply_gravity(delta: float) -> void:
	if is_on_floor():
		_jump_count    = 0
		_double_jumped = false
		_slamming      = false
		return
	if velocity.y > 0:
		var mult := djump_fall_mult if _double_jumped else fall_mult
		velocity.y += _gravity * (mult - 1.0) * delta
	else:
		velocity.y += _gravity * delta

func _handle_movement() -> void:
	if is_stunned or is_frozen:
		velocity.x = 0.0
		return
	var dir := Input.get_axis("ui_left", "ui_right")
	velocity.x = dir * move_speed * curse_slow
	if dir != 0:
		_facing = int(sign(dir))
		sprite.flip_h    = _facing < 0
		sprite.offset.x  = _sprite_base_offset.x * _facing

func _handle_jump() -> void:
	var now := Time.get_ticks_msec() / 1000.0

	if Input.is_action_just_pressed("ui_down"):
		if is_on_floor():
			_drop_through()
		else:
			velocity.y = slam_velocity
			_slamming  = true
		return

	if Input.is_action_just_pressed("ui_accept") or Input.is_action_just_pressed("ui_up"):
		if (now - _last_jump_time) < JUMP_LOCKOUT:
			return
		if is_on_floor():
			velocity.y      = jump_velocity
			_jump_count     = 1
			_last_jump_time = now
			AudioManager.play_sfx("jump", 2.5)
		elif _jump_count < 2:
			velocity.y      = double_jump_vel
			_jump_count     = 2
			_double_jumped  = true
			_last_jump_time = now
			vfx.spawn_double_jump_effect()
			AudioManager.play_sfx("jump", 2.5)

func _drop_through() -> void:
	set_collision_mask_value(2, false)
	await get_tree().create_timer(0.25).timeout
	set_collision_mask_value(2, true)

# ── Animação ──────────────────────────────────────────────────────────────────
func _update_animation() -> void:
	if not sprite or combat.is_attacking:
		return
	if not is_on_floor():
		sprite.play("jump" if velocity.y < 0 else "fall")
	elif abs(velocity.x) > 0:
		sprite.play("run")
	else:
		sprite.play("idle")

# ── Aparência ─────────────────────────────────────────────────────────────────
func _apply_palette_swap() -> void:
	if not sprite:
		push_error("Fighter: sprite não conectado!")
		return
	var mat := ShaderMaterial.new()
	mat.shader = load("res://shaders/palette_swap.gdshader")
	mat.set_shader_parameter("source_hue",     helmet_source_hue)
	mat.set_shader_parameter("hue_tolerance",  helmet_hue_tolerance)
	mat.set_shader_parameter("swap_color",     char_color)
	mat.set_shader_parameter("min_saturation", helmet_min_saturation)
	sprite.material = mat

# ── Interface pública ─────────────────────────────────────────────────────────
## Chamado por outros fighters ao acertar um hit
func apply_incoming_hit(hit: Dictionary) -> void:
	combat.apply_incoming_hit(hit)

func flash_hit() -> void:
	sprite.modulate = Color(1.0, 0.15, 0.15, 1.0)
	var t: Tween = create_tween()
	t.tween_property(sprite, "modulate", Color.WHITE, HIT_FLASH_DURATION)
