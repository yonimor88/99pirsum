/**
 * Colour-grades the field photos so they read as one consistent, professional set:
 * white balance (neutralises the yellow/orange cast of stairwells and synagogues),
 * levels, a gentle S-curve, a little vibrance and light sharpening.
 *
 * Reads the untouched originals from assets/photo-originals/work and writes the graded
 * copies over src/assets/images/work, so it can be re-run (or re-tuned) without stacking
 * edits. Graphics that aren't photos (mock-ups, maps, drawings) have no original here and
 * are left alone.
 *
 *   npm run photos                    # every original
 *   npm run photos -- door-hanger.jpg # only these files
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "assets/photo-originals/work");
const outDir = path.join(root, "src/assets/images/work");

const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);
const luma = (c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];

/** Stats from a small copy: the white reference, the average colour and luminance percentiles. */
async function analyse(file) {
  const { data, info } = await sharp(file)
    .resize(300, 300, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const n = info.width * info.height;
  const lum = new Float32Array(n);
  for (let i = 0; i < n; i++) lum[i] = luma([data[i * 3], data[i * 3 + 1], data[i * 3 + 2]]);
  const sorted = Float32Array.from(lum).sort();
  const pct = (p) => sorted[Math.min(n - 1, Math.floor(p * n))];

  // White patch: bright but unclipped pixels (paper, walls, posters), the 75th–98th percentile
  const wLo = pct(0.75);
  const wHi = pct(0.98);
  const white = [0, 0, 0];
  const mean = [0, 0, 0];
  let k = 0;
  for (let i = 0; i < n; i++) {
    for (let c = 0; c < 3; c++) mean[c] += data[i * 3 + c];
    if (lum[i] >= wLo && lum[i] <= wHi) {
      for (let c = 0; c < 3; c++) white[c] += data[i * 3 + c];
      k++;
    }
  }
  return {
    white: white.map((v) => v / k),
    mean: mean.map((v) => v / n),
    black: pct(0.004),
    bright: pct(0.997),
    median: pct(0.5),
  };
}

/** How strong a warm (orange/yellow) cast the frame has: 0 when neutral, 1 for tungsten-lit wood. */
function warmth(a) {
  return Math.min(1, Math.max(0, (a.mean[0] / Math.max(1, a.mean[2]) - 1.15) / 0.6));
}

/** One lookup table per channel: white balance, levels, midtone lift and an S-curve. */
function curves(a) {
  const warm = warmth(a);

  // White balance from the white patch, blended with grey-world when the whole frame has a heavy cast and may
  // hold nothing white. It moves part of the way to a slightly warm neutral, so the photos sit well on the
  // paper-toned site.
  const gw = 0.3 * warm;
  const est = a.white.map((w, i) => (1 - gw) * w + gw * a.mean[i] * (a.white[1] / a.mean[1]));
  const target = [1, 1, 0.96];
  const grey = (est[0] + est[1] + est[2]) / 3;
  const raw = est.map((c, i) => Math.min(1.2, Math.max(0.82, 1 + ((grey * target[i]) / c - 1) * 0.6)));
  // Keep the average brightness: cutting red on an orange frame would otherwise darken it
  const norm = luma(a.mean) / luma(a.mean.map((m, i) => m * raw[i]));
  const gains = raw.map((g) => g * norm);

  // Levels: most of the way to a full black point, only a mild white-point stretch so highlights don't clip
  const lo = Math.max(0, a.black * 0.75 - 2);
  const hi = Math.min(255, a.bright + (255 - a.bright) * 0.6);

  // Midtones: lift dark frames towards a median of ~0.48, never darken
  const med = Math.min(0.9, Math.max(0.1, (a.median - lo) / (hi - lo)));
  const gamma = 1 + (Math.min(1.35, Math.max(1, Math.log(0.48) / Math.log(med))) - 1) * 0.7;

  // S-curve, stronger in the shadows than the highlights. Lifted frames get less of it, so the lift stays.
  const kLo = gamma > 1.05 ? 0.16 : 0.32;
  const kHi = 0.1;

  return gains.map((gain) => {
    const lut = new Uint8ClampedArray(256);
    for (let v = 0; v < 256; v++) {
      let x = Math.min(1, Math.max(0, (v * gain - lo) / (hi - lo)));
      x = Math.pow(x, 1 / gamma);
      x += (x < 0.5 ? kLo : kHi) * x * (1 - x) * (x - 0.5) * 4; // 0, 0.5 and 1 stay put
      lut[v] = Math.round(clamp(x * 255));
    }
    return lut;
  });
}

async function grade(name) {
  const file = path.join(srcDir, name);
  const a = await analyse(file);
  const luts = curves(a);
  const warm = warmth(a);
  // Vibrance lifts muted colours more than vivid ones. Warm-cast frames get none, and a little less saturation.
  const vibrance = 0.15 * (1 - warm);
  const saturation = 1 - 0.22 * warm;

  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 3) {
    const r = luts[0][data[i]];
    const g = luts[1][data[i + 1]];
    const b = luts[2][data[i + 2]];
    const y = luma([r, g, b]);
    const max = Math.max(r, g, b);
    const s = max === 0 ? 0 : (max - Math.min(r, g, b)) / max;
    const f = saturation * (1 + vibrance * (1 - s));
    out[i] = clamp(y + (r - y) * f);
    out[i + 1] = clamp(y + (g - y) * f);
    out[i + 2] = clamp(y + (b - y) * f);
  }

  await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } })
    .sharpen({ sigma: 0.6, m1: 0.5, m2: 1.2 })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(outDir, name));
  return { name, warm };
}

const only = process.argv.slice(2);
const files = (await readdir(srcDir)).filter((f) => /\.jpe?g$/i.test(f) && (!only.length || only.includes(f)));
for (const f of files) {
  const { name, warm } = await grade(f);
  console.log(`graded ${name}${warm > 0.2 ? ` (warm cast ${warm.toFixed(2)})` : ""}`);
}
console.log(`${files.length} photo(s) → src/assets/images/work`);
