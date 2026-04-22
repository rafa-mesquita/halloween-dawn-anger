class_name Map1
extends RefCounted

const MAP_WIDTH  = 1536
const MAP_HEIGHT = 1024

# Posições exatas das plataformas (fonte: map1.js original)
# Rect2(x, y, largura, altura)
const PLATFORM_RECTS: Array[Rect2] = [
	Rect2(0,   224, 352, 48),   # plataforma esquerda (topo)
	Rect2(896, 496, 640, 32),   # plataforma direita (meio)
	Rect2(0,   672, 656, 32),   # plataforma esquerda (baixo)
	Rect2(720, 912, 816, 48),   # plataforma base (direita)
]

# Posições de spawn dos fighters (centro de cada plataforma, acima)
const SPAWN_POSITIONS: Array[Vector2] = [
	Vector2(176,  170),
	Vector2(1216, 442),
	Vector2(328,  618),
	Vector2(1128, 858),
]
