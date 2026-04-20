import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';

const root = path.resolve(process.cwd());
const src = path.join(root, 'public', 'sprites', 'player_idle.png');
const outDir = path.join(root, 'public');
const out = path.join(outDir, 'favicon.png');

const FRAME_W = 192;
const FRAME_H = 128;
const CROP = 128;
const OUT_SIZE = 64;

const raw = PNG.sync.read(fs.readFileSync(src));
if (raw.width < FRAME_W || raw.height < FRAME_H) {
  throw new Error(`unexpected source size ${raw.width}x${raw.height}`);
}

const srcX = Math.floor((FRAME_W - CROP) / 2);
const srcY = Math.floor((FRAME_H - CROP) / 2);
const dst = new PNG({ width: OUT_SIZE, height: OUT_SIZE });
const scale = CROP / OUT_SIZE;

for (let y = 0; y < OUT_SIZE; y++) {
  for (let x = 0; x < OUT_SIZE; x++) {
    const sx = Math.min(CROP - 1, Math.floor(x * scale)) + srcX;
    const sy = Math.min(CROP - 1, Math.floor(y * scale)) + srcY;
    const sIdx = (raw.width * sy + sx) << 2;
    const dIdx = (OUT_SIZE * y + x) << 2;
    dst.data[dIdx] = raw.data[sIdx];
    dst.data[dIdx + 1] = raw.data[sIdx + 1];
    dst.data[dIdx + 2] = raw.data[sIdx + 2];
    dst.data[dIdx + 3] = raw.data[sIdx + 3];
  }
}

fs.writeFileSync(out, PNG.sync.write(dst));
console.log(`wrote ${out} (${OUT_SIZE}x${OUT_SIZE})`);
