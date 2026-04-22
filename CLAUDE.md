# halloween-dawn-anger — Godot Port

## GDScript Rules

### Always specify variable types explicitly

**NEVER** use type inference (`var x := value`) when the type is not obvious from a literal.

**ALWAYS** declare types explicitly:

```gdscript
# ❌ Wrong — causes "Cannot infer the type" parser error
var spr := _f.sprite
var frames := sprite.sprite_frames
var t := create_tween()
var pct := _f.hp / _f.max_hp

# ✅ Correct
var spr: AnimatedSprite2D = _f.sprite as AnimatedSprite2D
var frames: SpriteFrames = sprite.sprite_frames
var t: Tween = create_tween()
var pct: float = _f.hp / _f.max_hp
```

This applies to **every variable declaration**, especially:
- Node references accessed via properties
- Return values from functions that return a base type
- Math operations that could be int or float
- Any `create_tween()`, `get_node()`, `load()`, `get_children()` call

---

## Project Structure

- Godot 4.x project at repo root (no `godot/` subfolder)
- Legacy JS code in `_legacy/` (gitignored)
- Auto-doc agent via Stop hook → updates `docs/`

## Component Architecture

Fighter uses child Node components (inside `Components` node):
- `FighterCombat` — attack, damage, knockback, orbs
- `FighterHUD` — HP bar, lives, orb dots
- `FighterVFX` — slam trail, double jump, hit flash, damage numbers
- `FighterRespawn` — die(), respawn, invulnerability blink

Components access Fighter via:
```gdscript
var _f: CharacterBody2D
func _ready() -> void:
    _f = get_parent().get_parent() as CharacterBody2D
```

When calling component methods from another component (where `_f` is typed as `CharacterBody2D`):
```gdscript
# Use .call() to avoid "method not found on CharacterBody2D" errors
_f.get_node("Components/FighterVFX").call("trigger_hit_flash")
_f.get_node("Components/FighterRespawn").call("die")
```
