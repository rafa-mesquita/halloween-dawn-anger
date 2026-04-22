extends Node
class_name LootItemManager

# ── Constantes ────────────────────────────────────────────────────────────────
const SPAWN_MIN         := 1.5
const SPAWN_MAX         := 3.5
const LIFETIME_MIN      := 5.0
const LIFETIME_MAX      := 10.0
const MAX_ACTIVE        := 3
const SPAWN_MARGIN      := 40.0
const CLEARANCE_FIGHTER := 60.0
const CLEARANCE_LOOT    := 110.0
const SPAWN_Y_OFFSET    := -30.0

# Scenes fixas — paths nunca mudam
const SCENE_HP     := "res://scenes/loot/loots/LootHP.tscn"
const SCENE_SHIELD := "res://scenes/loot/loots/LootShield.tscn"
const SCENE_EYE    := "res://scenes/loot/loots/LootEye.tscn"

# Pool — escaneia automaticamente esta pasta (exclui as fixas pelo nome)
# Para adicionar novo poder: crie a scene e coloque nesta pasta. Zero código.
const POOL_DIR      := "res://scenes/loot/loots/"
const POOL_EXCLUDE  := ["LootHP.tscn", "LootShield.tscn", "LootEye.tscn"]

# ── Estado ────────────────────────────────────────────────────────────────────
var _active_loots : Array = []
var _spawn_timer  : float = 2.0
var _eye_active   : bool  = false
var _pool_scenes  : Array = []  # Array[PackedScene]

# ── Lifecycle ─────────────────────────────────────────────────────────────────
func _ready() -> void:
	_load_pool_scenes()

func _process(delta: float) -> void:
	_spawn_timer -= delta
	if _spawn_timer <= 0.0:
		_try_spawn()
		_spawn_timer = randf_range(SPAWN_MIN, SPAWN_MAX)

# ── Carrega pool dinamicamente ─────────────────────────────────────────────────
func _load_pool_scenes() -> void:
	_pool_scenes.clear()
	var dir: DirAccess = DirAccess.open(POOL_DIR)
	if not dir:
		push_warning("LootManager: pasta pool nao encontrada: " + POOL_DIR)
		return
	dir.list_dir_begin()
	var file: String = dir.get_next()
	while file != "":
		if file.ends_with(".tscn") and file not in POOL_EXCLUDE:
			var path: String       = POOL_DIR + file
			var scene: PackedScene = load(path) as PackedScene
			if scene:
				_pool_scenes.append(scene)
		file = dir.get_next()
	dir.list_dir_end()
	print("LootManager: %d scenes na pool" % _pool_scenes.size())

# ── Spawn ─────────────────────────────────────────────────────────────────────
func _try_spawn() -> void:
	if _active_loots.size() >= MAX_ACTIVE:
		return

	var loot_type: String  = _pick_type()
	var scene: PackedScene = _get_scene(loot_type)
	if not scene:
		return

	var pos: Vector2 = _pick_position()
	if pos == Vector2.ZERO:
		return

	var loot: LootItem = scene.instantiate() as LootItem
	get_parent().add_child(loot)
	loot.global_position = pos
	loot.start_lifetime(randf_range(LIFETIME_MIN, LIFETIME_MAX))
	loot.picked_up.connect(_on_loot_removed.bind(loot))
	loot.despawned.connect(_on_loot_removed.bind(loot))
	_active_loots.append(loot)

func _pick_type() -> String:
	var eye_on_map : bool  = _active_loots.any(func(l: Node) -> bool: return l.get("loot_type") == "eye")
	var eye_blocked: bool  = _eye_active or eye_on_map
	var roll       : float = randf()
	if roll < 0.10:
		return "hp"
	if roll < 0.20:
		return "shield"
	if roll < 0.25 and not eye_blocked:
		return "eye"
	return "loot_pool"

func _get_scene(loot_type: String) -> PackedScene:
	match loot_type:
		"hp":       return load(SCENE_HP)     as PackedScene
		"shield":   return load(SCENE_SHIELD) as PackedScene
		"eye":      return load(SCENE_EYE)    as PackedScene
		"loot_pool":
			if _pool_scenes.is_empty():
				return null
			return _pool_scenes[randi() % _pool_scenes.size()] as PackedScene
	return null

func _pick_position() -> Vector2:
	var platforms: Array[Rect2] = Map1.PLATFORM_RECTS
	for _attempt in range(30):
		var rect: Rect2 = platforms[randi() % platforms.size()]
		var cx: float   = rect.position.x + randf_range(SPAWN_MARGIN, max(SPAWN_MARGIN, rect.size.x - SPAWN_MARGIN))
		var cy: float   = rect.position.y + SPAWN_Y_OFFSET
		if not _is_blocked(cx, cy):
			return Vector2(cx, cy)
	return Vector2.ZERO

func _is_blocked(cx: float, cy: float) -> bool:
	for fighter in get_tree().get_nodes_in_group("fighters"):
		if fighter.get("is_dead"):
			continue
		if abs(fighter.global_position.x - cx) < CLEARANCE_FIGHTER:
			return true
	for loot in _active_loots:
		if not is_instance_valid(loot):
			continue
		var dx: float = loot.global_position.x - cx
		var dy: float = loot.global_position.y - cy
		if dx * dx + dy * dy < CLEARANCE_LOOT * CLEARANCE_LOOT:
			return true
	return false

func _on_loot_removed(loot: LootItem) -> void:
	_active_loots.erase(loot)
	if loot.loot_type == "eye":
		_eye_active = false

func notify_eye_active() -> void:
	_eye_active = true

func notify_eye_ended() -> void:
	_eye_active = false
