extends CanvasLayer

# ── Configuração ──────────────────────────────────────────────────────────────
const FADE_DURATION := 0.35

# ── Nós internos ──────────────────────────────────────────────────────────────
var _overlay : ColorRect
var _tween   : Tween

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	layer = 128

	_overlay = ColorRect.new()
	_overlay.color             = Color.BLACK
	_overlay.mouse_filter      = Control.MOUSE_FILTER_IGNORE
	_overlay.anchor_right      = 1.0
	_overlay.anchor_bottom     = 1.0
	_overlay.modulate.a        = 0.0
	add_child(_overlay)

# ── API pública ───────────────────────────────────────────────────────────────
func go_to(path: String) -> void:
	_fade_in()
	await get_tree().create_timer(FADE_DURATION).timeout
	get_tree().change_scene_to_file(path)
	_fade_out()

func _fade_in() -> void:
	if _tween:
		_tween.kill()
	_overlay.mouse_filter = Control.MOUSE_FILTER_STOP
	_tween = create_tween()
	_tween.tween_property(_overlay, "modulate:a", 1.0, FADE_DURATION).set_trans(Tween.TRANS_SINE)

func _fade_out() -> void:
	if _tween:
		_tween.kill()
	_tween = create_tween()
	_tween.tween_property(_overlay, "modulate:a", 0.0, FADE_DURATION).set_trans(Tween.TRANS_SINE)
	_tween.tween_callback(func() -> void: _overlay.mouse_filter = Control.MOUSE_FILTER_IGNORE)
