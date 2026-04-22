extends Node
class_name FighterHUD

# ── Referências ───────────────────────────────────────────────────────────────
@export var hp_bar_fill    : ColorRect
@export var lives_label    : Label
@export var nickname_label : Label    ## Label acima do fighter com o nome do jogador
@export var orbs_node      : Node2D   ## Node2D dos attack orbs (já existente)
@export var power_orbs_node: Node2D   ## Node2D dos power orbs (novo — criar na scene)
@export var shield_vfx     : Node2D   ## AnimatedSprite2D do escudo no Fighter

# ── Constantes — attack orbs ──────────────────────────────────────────────────
const ORB_SIZE      := 8.0
const ORB_SPACING   := 12.0
const ORB_COLOR_ON  := Color("#38bdf8")
const ORB_COLOR_OFF := Color("#1e3a5f")

# ── Constantes — power orbs ───────────────────────────────────────────────────
const POWER_ORB_SIZE    := 8.0
const POWER_ORB_SPACING := 12.0
const POWER_ORB_OFF     := Color("#2a1a3a")

const POWER_COLORS: Dictionary = {
	"heavens_fury": Color("#fde047"),
	"holy_shield":  Color("#38bdf8"),
	"skull_curse":  Color("#a855f7"),
	"wheel":        Color("#ffffff"),
	"ice_beam":     Color("#7dd3fc"),
	"fire_storm":   Color("#ff3b30"),
	"eye":          Color("#78350f"),
}

# ── Estado ────────────────────────────────────────────────────────────────────
var _orb_rects       : Array[ColorRect] = []
var _power_orb_rects : Array[ColorRect] = []
var _f: CharacterBody2D

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	_f = get_parent().get_parent() as CharacterBody2D
	_build_power_orbs()
	_setup_nickname()

# ── Attack orbs ───────────────────────────────────────────────────────────────
func build_orbs(count: int) -> void:
	if not orbs_node:
		return
	orbs_node.visible = _f.player_controlled
	for child in orbs_node.get_children():
		child.queue_free()
	_orb_rects.clear()

	var total_width: float = count * ORB_SIZE + (count - 1) * (ORB_SPACING - ORB_SIZE)
	var start_x    : float = -total_width / 2.0

	for i in count:
		var orb: ColorRect = ColorRect.new()
		orb.size     = Vector2(ORB_SIZE, ORB_SIZE)
		orb.position = Vector2(start_x + i * ORB_SPACING, 0.0)
		orb.color    = ORB_COLOR_ON
		orbs_node.add_child(orb)
		_orb_rects.append(orb)

func add_orbs(extra: int) -> void:
	build_orbs(_orb_rects.size() + extra)

# ── Power orbs ────────────────────────────────────────────────────────────────
func _build_power_orbs() -> void:
	if not power_orbs_node:
		return
	power_orbs_node.visible = _f.player_controlled
	for child in power_orbs_node.get_children():
		child.queue_free()
	_power_orb_rects.clear()

	# 2 slots fixos, sempre visíveis (cheio ou vazio)
	var total_width: float = 2 * POWER_ORB_SIZE + (POWER_ORB_SPACING - POWER_ORB_SIZE)
	var start_x    : float = -total_width / 2.0

	for i in 2:
		var orb: ColorRect = ColorRect.new()
		orb.size     = Vector2(POWER_ORB_SIZE, POWER_ORB_SIZE)
		orb.position = Vector2(start_x + i * POWER_ORB_SPACING, 0.0)
		orb.color    = POWER_ORB_OFF
		power_orbs_node.add_child(orb)
		_power_orb_rects.append(orb)

# ── Update ────────────────────────────────────────────────────────────────────
func update() -> void:
	_update_hp_bar()
	_update_lives()
	_update_orbs()
	_update_power_orbs()
	_update_shield_vfx()

func _update_hp_bar() -> void:
	if not hp_bar_fill:
		return
	var pct: float = _f.hp / _f.max_hp
	hp_bar_fill.size.x = 60.0 * pct
	if pct > 0.5:
		hp_bar_fill.color = Color("#22c55e")
	elif pct > 0.25:
		hp_bar_fill.color = Color("#eab308")
	else:
		hp_bar_fill.color = Color("#ef4444")

func _update_lives() -> void:
	if lives_label:
		lives_label.text = "x" + str(_f.lives)

func _update_orbs() -> void:
	for i in _orb_rects.size():
		_orb_rects[i].color = ORB_COLOR_ON if i < _f.combat.attack_orbs else ORB_COLOR_OFF

func _update_power_orbs() -> void:
	if _power_orb_rects.is_empty():
		return
	var powers: Array = _f.special_powers
	for i in _power_orb_rects.size():
		var orb: ColorRect = _power_orb_rects[i]
		if i < powers.size() and POWER_COLORS.has(powers[i]):
			orb.color = POWER_COLORS[powers[i]]
		else:
			orb.color = POWER_ORB_OFF

func _setup_nickname() -> void:
	if not nickname_label:
		return
	nickname_label.text                = GameSettings.nickname if not GameSettings.nickname.is_empty() else "Player"
	nickname_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

func _update_shield_vfx() -> void:
	if not shield_vfx:
		return
	var has_shield: bool = _f.shield_charges > 0
	if shield_vfx.visible != has_shield:
		shield_vfx.visible = has_shield
