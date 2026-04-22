extends Node
class_name FighterInventory

var _f: CharacterBody2D

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	_f = get_parent().get_parent() as CharacterBody2D

# ── API pública ───────────────────────────────────────────────────────────────
func try_cast(target_pos: Vector2) -> void:
	if _f.is_dead or _f.special_powers.is_empty():
		return
	var power: String = _f.special_powers[0]
	_dispatch(power, target_pos)
	_f.special_powers.remove_at(0)
	_f.get_node("Components/FighterHUD").call("update")

func swap_powers() -> void:
	if _f.special_powers.size() < 2:
		return
	var tmp: String      = _f.special_powers[0]
	_f.special_powers[0] = _f.special_powers[1]
	_f.special_powers[1] = tmp
	_f.get_node("Components/FighterHUD").call("update")

# ── Dispatch ──────────────────────────────────────────────────────────────────
func _dispatch(power: String, target_pos: Vector2) -> void:
	match power:
		"holy_shield":   _cast_holy_shield()
		"heavens_fury":  _cast_power_scene("res://scenes/powers/HeavensFury.tscn",  target_pos)
		"skull_curse":   _cast_power_scene("res://scenes/powers/SkullCurse.tscn",   target_pos)
		"wheel":         _cast_power_scene("res://scenes/powers/Wheel.tscn",        target_pos)
		"fire_storm":    _cast_power_scene("res://scenes/powers/FireStorm.tscn",    target_pos)
		"ice_beam":      _cast_power_scene("res://scenes/powers/IceBeam.tscn",      target_pos)
		_:
			push_warning("FighterInventory: poder desconhecido '%s'" % power)

# ── Holy Shield ───────────────────────────────────────────────────────────────
func _cast_holy_shield() -> void:
	_f.shield_charges = 2
	_f.get_node("Components/FighterCombat").call("reset_orbs")
	_f.get_node("Components/FighterHUD").call("update")
	AudioManager.play_sfx("shield_cast")

# ── Instancia scene de poder ──────────────────────────────────────────────────
func _cast_power_scene(path: String, target_pos: Vector2) -> void:
	if not ResourceLoader.exists(path):
		push_warning("FighterInventory: scene não encontrada '%s'" % path)
		return
	var scene: PackedScene = load(path) as PackedScene
	var inst: Node         = scene.instantiate()
	# Passa referências antes de entrar na tree
	inst.set("caster",     _f)
	inst.set("target_pos", target_pos)
	_f.get_parent().add_child(inst)
