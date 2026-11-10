# Video ads

Ads rendered from HTML, frame by frame, in headless Chrome. Kept out of the site's `package.json` so Vercel never installs these tools.

## websites-ad: "אתרים שגורמים ללקוחות להרים טלפון"

32 seconds, 1080×1920 (Reels, TikTok, WhatsApp Status, Shorts). It uses the real screenshots in `src/assets/images/sites/`, the logo in `public/` and the brand colours and fonts.

| Seconds | Scene |
| --- | --- |
| 0–4 | Hook: "אתרים שגורמים ללקוחות להרים טלפון", a phone ringing |
| 4–10.5 | Six sites we built, scrolling on phones |
| 10.5–16 | Google: a search result and the Lighthouse scores (same numbers as /websites) |
| 16–22 | A tap on the WhatsApp button, the chat, leads coming in |
| 22–26 | Everything included in every site |
| 26–32 | Logo, WhatsApp button, 054-397-1020, 99pirsum.com/websites |

```bash
cd video
npm install
npx @puppeteer/browsers install chrome-headless-shell@stable --path ./.browsers   # once (or set CHROME_PATH)

node websites-ad/render.mjs                 # out/99pirsum-websites-ad.mp4, with soundtrack
node websites-ad/render.mjs --silent        # no audio track, to add music inside Instagram/TikTok
node websites-ad/render.mjs --fps 60
node websites-ad/render.mjs --stills 2,12,29    # PNG frames in out/stills, for checking a change
node websites-ad/render.mjs --serve         # prints a URL that plays the ad in the browser (?play)
```

- **Copy and sites:** at the top of the script in `websites-ad/ad.html` (`SHOWCASE`, `SCORES`, `FEATURES`, `NOTIFS`). Headlines are in the HTML.
- **Timing:** on a 120 BPM grid (a beat every 0.5 s). The cue constants (`TAP_AT`, `CHIPS_AT` and so on) are shared with the soundtrack, so moving one keeps picture and sound together.
- **Soundtrack:** `websites-ad/audio.js`, synthesised with Web Audio (no samples, nothing to license).
