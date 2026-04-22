extends Node2D
class_name BasePower

# ── Dados passados pelo FighterInventory antes de entrar na tree ──────────────
var caster     : CharacterBody2D
var target_pos : Vector2

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	execute()

# ── Override em cada poder ────────────────────────────────────────────────────
func execute() -> void:
	pass

# ── Helpers ───────────────────────────────────────────────────────────────────

## Aplica dano a todos os fighters dentro de um raio a partir de um ponto
func deal_aoe(origin: Vector2, radius: float, damage: float, knock_x: float, knock_y: float) -> void:
	for fighter in get_tree().get_nodes_in_group("fighters"):
		if fighter == caster:
			continue
		if fighter.get("is_dead"):
			continue
		var dist: float = (fighter.global_position - origin).length()
		if dist <= radius:
			var dir: float = sign(fighter.global_position.x - origin.x)
			fighter.apply_incoming_hit({
				"damage":  damage,
				"knock_x": dir * knock_x,
				"knock_y": knock_y,
			})

## Aplica dano a um fighter específico
func deal_hit(fighter: Node, damage: float, knock_x: float, knock_y: float) -> void:
	if fighter == caster:
		return
	if fighter.get("is_dead"):
		return
	fighter.apply_incoming_hit({
		"damage":  damage,
		"knock_x": knock_x,
		"knock_y": knock_y,
	})

## Direção do caster até o target (normalizada)
func direction_to_target() -> Vector2:
	return (target_pos - caster.global_position).normalized()

## Finaliza e remove a scene
func finish() -> void:
	queue_free()
