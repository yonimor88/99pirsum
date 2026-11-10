// Renders ad.html to MP4, frame by frame, in headless Chromium (Edge or Chrome).
//
//   node websites-ad/render.mjs                      → out/99pirsum-websites-ad.mp4 (with soundtrack)
//   node websites-ad/render.mjs --fps 60
//   node websites-ad/render.mjs --stills 1,5.5,12    → out/stills/t-1.00.png …
//   node websites-ad/render.mjs --serve              → http://localhost:4599/video/websites-ad/ad.html?play
//
// The page lays itself out for any time t (window.__render), so every frame is deterministic.
// The soundtrack is synthesised in the same page with an OfflineAudioContext (window.__renderAudio).

import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ffmpegPath from "ffmpeg-static";
import puppeteer from "puppeteer-core";

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, "../.."); // the repo: the page loads screenshots and the logo from it
const OUT = path.resolve(here, "../out");

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1] ?? true;
};
const FPS = Number(flag("fps", 30));
const STILLS = flag("stills", null);
const SERVE = args.includes("--serve");
const SILENT = args.includes("--silent");
const AUDIO_ONLY = args.includes("--audio-only");
const FROM = Number(flag("from", 0));
const TO = flag("to", null);
const NAME = flag("name", "99pirsum-websites-ad");

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".css": "text/css" };

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = path.join(ROOT, url);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(SERVE ? 4599 : 0, "127.0.0.1", r));
const PAGE = `http://127.0.0.1:${server.address().port}/video/websites-ad/ad.html`;

if (SERVE) {
  console.log(`${PAGE}?play`);
} else {
  await main();
  server.close();
}

function findBrowser() {
  // `npx @puppeteer/browsers install chrome-headless-shell@stable --path ./.browsers` (from video/) puts one here
  const local = path.resolve(here, "../.browsers/chrome-headless-shell");
  const shell = fs.existsSync(local)
    ? fs.readdirSync(local).map((v) => path.join(local, v, "chrome-headless-shell-win64", "chrome-headless-shell.exe")).find((p) => fs.existsSync(p))
    : null;
  const candidates = [
    process.env.CHROME_PATH,
    shell,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean);
  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) throw new Error("No Chrome or Edge found. Set CHROME_PATH.");
  return found;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: findBrowser(),
    headless: "shell",
    args: ["--force-color-profile=srgb", "--hide-scrollbars", "--font-render-hinting=none", "--autoplay-policy=no-user-gesture-required"],
    defaultViewport: { width: 1080, height: 1920, deviceScaleFactor: 1 },
  });
  const page = await browser.newPage();
  page.on("console", (m) => console.log("[page]", m.text()));
  page.on("pageerror", (e) => console.error("[page error]", e.message));
  await page.goto(PAGE, { waitUntil: "networkidle0", timeout: 120_000 });
  await page.evaluate(() => window.__ready);
  const duration = await page.evaluate(() => window.__duration);

  if (STILLS) {
    const dir = path.join(OUT, "stills");
    fs.mkdirSync(dir, { recursive: true });
    for (const t of String(STILLS).split(",").map(Number)) {
      await page.evaluate((t) => window.__render(t), t);
      const file = path.join(dir, `t-${t.toFixed(2).padStart(5, "0")}.png`);
      await page.screenshot({ path: file, type: "png" });
      console.log(file);
    }
    await browser.close();
    return;
  }

  // soundtrack first, so ffmpeg can mux it in one pass
  let wav = null;
  if (!SILENT) {
    const b64 = await page.evaluate(() => window.__renderAudio && window.__renderAudio());
    if (b64) {
      wav = path.join(OUT, `${NAME}.wav`);
      fs.writeFileSync(wav, Buffer.from(b64, "base64"));
      console.log("audio →", wav);
    }
  }
  if (AUDIO_ONLY) {
    await browser.close();
    return;
  }

  const end = TO ? Number(TO) : duration;
  const frames = Math.round((end - FROM) * FPS);
  const mp4 = path.join(OUT, `${NAME}${SILENT ? "-silent" : ""}.mp4`);
  const ff = spawn(
    ffmpegPath,
    [
      "-y", "-loglevel", "error",
      "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
      ...(wav ? ["-ss", String(FROM), "-i", wav] : []),
      "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p", "-profile:v", "high",
      "-r", String(FPS), "-movflags", "+faststart",
      ...(wav ? ["-c:a", "aac", "-b:a", "192k", "-shortest"] : []),
      mp4,
    ],
    { stdio: ["pipe", "inherit", "inherit"] },
  );
  const done = new Promise((res, rej) => ff.on("close", (c) => (c === 0 ? res() : rej(new Error(`ffmpeg exited ${c}`)))));

  const started = Date.now();
  for (let f = 0; f < frames; f++) {
    const t = FROM + f / FPS;
    await page.evaluate((t) => window.__render(t), t);
    const buf = await page.screenshot({ type: "jpeg", quality: 96, optimizeForSpeed: true });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (f % FPS === 0) process.stdout.write(`\r${(t).toFixed(1)}s / ${end}s  (${((Date.now() - started) / 1000).toFixed(0)}s elapsed)   `);
  }
  ff.stdin.end();
  await done;
  await browser.close();
  console.log(`\nvideo → ${mp4}`);
}
