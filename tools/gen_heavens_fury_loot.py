"""
Gera sprites de loot do HeavensFury:
  - heavens_fury_loot_idle.png  (6 frames 64x64)
  - heavens_fury_loot_catch.png (7 frames 64x64)

Rodar: python3 tools/gen_heavens_fury_loot.py
"""

import math, random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

FRAME_W = 64
FRAME_H = 64
OUT_DIR = Path(__file__).parent.parent / "assets/sprites/Poder 1"

# Pontos fixos do zigzag (X varia por frame, Y fixo)
# Raio vai do topo ao fundo com ~5 quebras afiadas
BASE_POINTS = [
    (32, 4),
    (42, 14),
    (24, 26),
    (44, 38),
    (22, 50),
    (36, 60),
]

DIM_FRAMES = {1, 4}


def jitter_points(pts, amount=3, seed=0):
    rng = random.Random(seed)
    result = [pts[0]]  # topo fixo
    for p in pts[1:-1]:
        result.append((p[0] + rng.randint(-amount, amount),
                        p[1] + rng.randint(-1, 1)))
    result.append(pts[-1])  # base fixa
    return result


def draw_bolt_on(img: Image.Image, pts: list, width: int, color: tuple):
    d = ImageDraw.Draw(img)
    for i in range(len(pts) - 1):
        d.line([pts[i], pts[i+1]], fill=color, width=width)
    # Pontos de quebra (para cobrir joins)
    for p in pts:
        r = width // 2
        d.ellipse([p[0]-r, p[1]-r, p[0]+r, p[1]+r], fill=color)


def draw_idle_frame(idx: int) -> Image.Image:
    dim   = idx in DIM_FRAMES
    alpha = 0.45 if dim else 1.0
    pts   = jitter_points(BASE_POINTS, amount=2, seed=idx)

    base = Image.new("RGBA", (FRAME_W, FRAME_H), (0, 0, 0, 0))

    # Camada 1: glow externo (blur muito largo, amarelo suave)
    g3 = Image.new("RGBA", (FRAME_W, FRAME_H), (0, 0, 0, 0))
    draw_bolt_on(g3, pts, 10, (255, 200, 50, int(120 * alpha)))
    g3 = g3.filter(ImageFilter.GaussianBlur(radius=8))
    base = Image.alpha_composite(base, g3)

    # Camada 2: glow médio (amarelo)
    g2 = Image.new("RGBA", (FRAME_W, FRAME_H), (0, 0, 0, 0))
    draw_bolt_on(g2, pts, 5, (255, 230, 80, int(200 * alpha)))
    g2 = g2.filter(ImageFilter.GaussianBlur(radius=4))
    base = Image.alpha_composite(base, g2)

    # Camada 3: glow interno (branco-amarelado)
    g1 = Image.new("RGBA", (FRAME_W, FRAME_H), (0, 0, 0, 0))
    draw_bolt_on(g1, pts, 3, (255, 255, 200, int(240 * alpha)))
    g1 = g1.filter(ImageFilter.GaussianBlur(radius=1))
    base = Image.alpha_composite(base, g1)

    # Camada 4: núcleo branco puro (1px)
    core = Image.new("RGBA", (FRAME_W, FRAME_H), (0, 0, 0, 0))
    draw_bolt_on(core, pts, 1, (255, 255, 255, int(255 * alpha)))
    base = Image.alpha_composite(base, core)

    # Sparkle no ponto de origem (topo)
    if not dim:
        d = ImageDraw.Draw(base)
        cx, cy = pts[0]
        for length, a in [(7, 140), (4, 200), (2, 255)]:
            d.line([cx - length, cy, cx + length, cy], fill=(255, 255, 255, a), width=1)
            d.line([cx, cy - length, cx, cy + length], fill=(255, 255, 255, a), width=1)

    return base


def draw_catch_frame(idx: int, total: int = 7) -> Image.Image:
    t      = idx / max(total - 1, 1)
    img    = Image.new("RGBA", (FRAME_W, FRAME_H), (0, 0, 0, 0))
    cx, cy = FRAME_W // 2, FRAME_H // 2
    fa     = 1.0 - t

    # Flash radial expandindo
    flash_r = int(4 + t * 36)
    glow = Image.new("RGBA", (FRAME_W, FRAME_H), (0, 0, 0, 0))
    d    = ImageDraw.Draw(glow)
    for r in range(flash_r, 0, -1):
        ratio = r / flash_r
        a     = int(fa * ratio * 230)
        d.ellipse([cx-r, cy-r, cx+r, cy+r],
                  fill=(255, int(220 + 35*ratio), int(80 + 120*ratio), a))
    img = Image.alpha_composite(img, glow)

    # Raios saindo (frames iniciais)
    if idx < 5:
        d2   = ImageDraw.Draw(img)
        rays = 6
        for r in range(rays):
            angle = (r / rays) * math.pi * 2 + idx * 0.3
            reach = int(8 + t * 28)
            ex    = int(cx + math.cos(angle) * reach)
            ey    = int(cy + math.sin(angle) * reach)
            a     = int((1.0 - t) * 220)
            d2.line([cx, cy, ex, ey], fill=(255, 240, 100, a), width=2)
            d2.line([cx, cy, ex, ey], fill=(255, 255, 255, int(a * 0.6)), width=1)

    return img


def make_sheet(frames: list) -> Image.Image:
    sheet = Image.new("RGBA", (FRAME_W * len(frames), FRAME_H), (0, 0, 0, 0))
    for i, f in enumerate(frames):
        sheet.paste(f, (i * FRAME_W, 0))
    return sheet


if __name__ == "__main__":
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    idle_frames  = [draw_idle_frame(i)     for i in range(6)]
    catch_frames = [draw_catch_frame(i, 7) for i in range(7)]

    idle_path  = OUT_DIR / "heavens_fury_loot_idle.png"
    catch_path = OUT_DIR / "heavens_fury_loot_catch.png"

    make_sheet(idle_frames).save(idle_path)
    make_sheet(catch_frames).save(catch_path)

    print(f"Gerado: {idle_path}")
    print(f"Gerado: {catch_path}")
