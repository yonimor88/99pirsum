"use client";

import { ArrowUpLeft, Pause, Play } from "lucide-react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  cubicBezier,
  domAnimation,
  easeIn,
  easeOut,
  m,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

import { usePrefersLessMotion } from "@/components/a11y/motion-provider";
import { LogoFull, LogoMark } from "@/components/brand/logo";
import { glyphs } from "@/components/brand/logo-paths";
import { Dots } from "@/components/brand/ornaments";
import { cn } from "@/lib/cn";

/*
 * A sign construction built in front of the visitor: blueprint, foundation, steel frame,
 * panels and print, then lights on at dusk. Everything hangs off one timeline value `t`
 * (seconds), so the chapter buttons can jump around it like a video's chapters, and the
 * scene is real CSS 3D: the steel is stacked SVG slices, the plate and panels are planes.
 */

type MV = MotionValue<number>;

/** One loop of the timeline, in seconds */
const LOOP = 18;
/** The finished sign with its lights on: the first frame, and the only one when motion is off */
const STILL = 17.2;

type Chapter = { start: number; end: number; label: string; title: string; text: string; tone: string };

const CHAPTERS: Chapter[] = [
  {
    start: 0,
    end: 2.8,
    label: "שרטוט",
    title: "שרטוט הנדסי",
    text: "כל שלט מתחיל בתוכנית מדויקת: מידות, חומרים וביסוס — עוד לפני שמזיזים בורג.",
    tone: "bg-cyan",
  },
  {
    start: 2.8,
    end: 5.4,
    label: "ביסוס",
    title: "ביסוס ועיגון",
    text: "פלטת בסיס וברגי עיגון, כדי שהשלט יעמוד יציב — ברוח, בגשם ולאורך שנים.",
    tone: "bg-yellow",
  },
  {
    start: 5.4,
    end: 8.8,
    label: "שלד",
    title: "שלד פלדה",
    text: "מבנה שמותאם בדיוק לגודל השלט, למיקום ולתנאי השטח.",
    tone: "bg-green",
  },
  {
    start: 8.8,
    end: 12.4,
    label: "חיפוי",
    title: "חיפוי והדפסה",
    text: "מלבישים את המבנה בפנלים, ועליהם ההדפסה של המותג שלכם.",
    tone: "bg-magenta",
  },
  {
    start: 12.4,
    end: 17.3,
    label: "העמדה",
    title: "העמדה בשטח",
    text: "צוות שמגיע לשטח, מעמיד ומתקין. ואת כל זה רואים בהדמיה — עוד לפני שמתחילים לבנות.",
    tone: "bg-[linear-gradient(to_left,var(--color-yellow),var(--color-green),var(--color-cyan),var(--color-magenta))]",
  },
];

function chapterAt(time: number) {
  let index = 0;
  CHAPTERS.forEach((c, i) => {
    if (time >= c.start) index = i;
  });
  return index;
}

const expoOut = cubicBezier(0.16, 1, 0.3, 1);
const softOut = cubicBezier(0.25, 0.8, 0.3, 1);
const smooth = cubicBezier(0.65, 0, 0.35, 1);

/* ------------------------------------------------------------------ *
 * Model geometry: a 400 × 420 grid, 1 unit = 1 cm. Ground at y = 380.
 * ------------------------------------------------------------------ */

const MW = 400;
const MH = 420;

const box = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: `${(x / MW) * 100}%`,
  top: `${(y / MH) * 100}%`,
  width: `${(w / MW) * 100}%`,
  height: `${(h / MH) * 100}%`,
});

/** A length in model units; `--u` (one unit in CSS pixels) is set on the stage */
const u = (n: number) => `calc(var(--u) * ${n})`;
const tz = (n: number) => `translateZ(${u(n)})`;

type Grow = "up" | "down" | "rtl" | "center";
type Member = { x: number; y: number; w: number; h: number; from: number; to: number; grow: Grow };

/** Steel members, 10 × 10 cm tube, in build order */
const MEMBERS: Member[] = [
  // posts, rising out of the base plate
  { x: 135, y: 240, w: 10, h: 132, from: 4.05, to: 5.0, grow: "up" },
  { x: 255, y: 240, w: 10, h: 132, from: 4.2, to: 5.15, grow: "up" },
  // the frame
  { x: 50, y: 230, w: 300, h: 10, from: 5.45, to: 6.1, grow: "center" },
  { x: 340, y: 40, w: 10, h: 200, from: 5.95, to: 6.65, grow: "up" },
  { x: 50, y: 40, w: 10, h: 200, from: 6.05, to: 6.75, grow: "up" },
  { x: 50, y: 40, w: 300, h: 10, from: 6.55, to: 7.2, grow: "rtl" },
  { x: 60, y: 135, w: 280, h: 10, from: 7.0, to: 7.6, grow: "rtl" },
  { x: 195, y: 50, w: 10, h: 85, from: 7.45, to: 8.0, grow: "down" },
  { x: 255, y: 145, w: 10, h: 85, from: 7.6, to: 8.1, grow: "up" },
  { x: 195, y: 145, w: 10, h: 85, from: 7.7, to: 8.2, grow: "up" },
  { x: 135, y: 145, w: 10, h: 85, from: 7.8, to: 8.3, grow: "up" },
];

/** Depth slices of the steel (z, in units) and their paint: lit front, shaded sides, back */
const SLICES = [-5, -3, -1, 1, 3, 5] as const;

/** Welds: where two members meet, and when */
const SPARKS = [
  { x: 140, y: 235, at: 5.55 },
  { x: 260, y: 235, at: 5.6 },
  { x: 345, y: 235, at: 5.98 },
  { x: 55, y: 235, at: 6.08 },
  { x: 345, y: 45, at: 6.6 },
  { x: 345, y: 140, at: 7.03 },
  { x: 55, y: 45, at: 7.12 },
  { x: 55, y: 140, at: 7.52 },
  { x: 200, y: 140, at: 7.95 },
  { x: 260, y: 140, at: 8.05 },
  { x: 140, y: 140, at: 8.25 },
];

/** Cladding panels, one per frame cell, in the four process colours */
const PANELS = [
  { x: 200, y: 40, w: 150, h: 100, color: "var(--color-yellow)", rx: -18, ry: 26 },
  { x: 50, y: 40, w: 150, h: 100, color: "var(--color-cyan)", rx: -12, ry: -22 },
  { x: 260, y: 140, w: 90, h: 100, color: "var(--color-green)", rx: 16, ry: 30 },
  { x: 200, y: 140, w: 60, h: 100, color: "var(--color-magenta)", rx: 20, ry: 10 },
  { x: 140, y: 140, w: 60, h: 100, color: "var(--color-yellow)", rx: 14, ry: -12 },
  { x: 50, y: 140, w: 90, h: 100, color: "var(--color-cyan)", rx: 18, ry: -28 },
];

/** Anchor bolts on the base plate: the logo's four dots */
const BOLTS = [
  { left: "92%", top: "24%", color: "var(--color-yellow)", at: 3.55 },
  { left: "8%", top: "24%", color: "var(--color-cyan)", at: 3.7 },
  { left: "92%", top: "76%", color: "var(--color-green)", at: 3.85 },
  { left: "8%", top: "76%", color: "var(--color-magenta)", at: 4.0 },
];

/** Print plates that start out of register and snap in, like the headings on the site */
const PLATES = [
  { color: "var(--color-cyan)", dx: -2.6, dy: -2 },
  { color: "var(--color-magenta)", dx: 2.2, dy: 2.2 },
  { color: "var(--color-yellow)", dx: -1.2, dy: 3.2 },
];

/** A city skyline for the dusk backdrop, from a fixed seed so server and client agree */
const SKYLINE = (() => {
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const buildings: { x: number; w: number; h: number }[] = [];
  const windows: { x: number; y: number; early: boolean }[] = [];
  for (let x = 0; x < 2400; ) {
    const w = Math.round(36 + rnd() * 64);
    const h = Math.round(34 + rnd() * 120);
    buildings.push({ x, w, h });
    if (rnd() > 0.4) {
      for (let wy = 200 - h + 10; wy < 190; wy += 15) {
        for (let wx = x + 7; wx < x + w - 10; wx += 12) {
          if (rnd() > 0.68) windows.push({ x: wx, y: wy, early: rnd() > 0.7 });
        }
      }
    }
    x += w + Math.round(rnd() * 5);
  }
  return { buildings, windows };
})();

const STARS = [
  [8, 9], [17, 22], [26, 6], [38, 15], [47, 4], [58, 19], [66, 8], [74, 26], [83, 11], [91, 21], [12, 34], [52, 30], [70, 38], [95, 6],
] as const;

/* ------------------------------------------------------------------ */

export function SignBuildSimulation({ caption }: { caption: string }) {
  const lessMotion = usePrefersLessMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={lessMotion ? "always" : "user"}>
        <Simulation caption={caption} lessMotion={lessMotion} />
      </MotionConfig>
    </LazyMotion>
  );
}

function Simulation({ caption, lessMotion }: { caption: string; lessMotion: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.3 });
  const [paused, setPaused] = useState(false);
  const [chapter, setChapter] = useState(() => chapterAt(STILL));

  const t = useMotionValue(STILL);
  const unit = useMotionValue(1);
  const sway = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useMotionValueEvent(t, "change", (v) => setChapter(chapterAt(v)));

  // The server renders the finished sign. With motion allowed, rewind to the first frame right away
  // (the section sits well below the fold); with motion off, stay on the finished sign.
  useEffect(() => {
    t.set(lessMotion ? STILL : 0);
  }, [lessMotion, t]);

  // The clock: runs only while the stage is on screen and not paused
  const playing = inView && !paused && !lessMotion;
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const next = t.get() + dt;
      t.set(next >= LOOP ? 0 : next);
      sway.set(Math.sin(now / 1700) * 2.5);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, t, sway]);

  // One model unit in CSS pixels, for the moves that animate depth
  useEffect(() => {
    const el = modelRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => unit.set(entry.contentRect.width / MW));
    ro.observe(el);
    return () => ro.disconnect();
  }, [unit]);

  // Camera: a flat elevation drawing first, then it swings round to show the depth
  const camY = useTransform(t, [0, 2.6, 4.2, 8.8, 10.3, 12.4, 14, LOOP], [0, 0, -30, -20, 22, 16, 12, 9], { ease: smooth });
  const camX = useTransform(t, [0, 2.6, 4.2, 8.8, 12.4, LOOP], [0, 0, -14, -10, -8, -6], { ease: smooth });
  const camZoom = useTransform(t, [0, 2.6, 4.2, 8.8, 12.4, 14, LOOP], [1, 1, 0.92, 0.95, 1, 1.05, 1.07], { ease: smooth });
  const springY = useSpring(camY, { stiffness: 70, damping: 22 });
  const springX = useSpring(camX, { stiffness: 70, damping: 22 });
  const springZoom = useSpring(camZoom, { stiffness: 70, damping: 22 });
  const easedPointerX = useSpring(pointerX, { stiffness: 50, damping: 18 });
  const easedPointerY = useSpring(pointerY, { stiffness: 50, damping: 18 });
  const liveY = useTransform(() => springY.get() + sway.get() - easedPointerX.get() * 12);
  const liveX = useTransform(() => springX.get() + easedPointerY.get() * 7);
  const rotateY = lessMotion ? camY : liveY;
  const rotateX = lessMotion ? camX : liveX;
  const scale = lessMotion ? camZoom : springZoom;

  const sceneOpacity = useTransform(t, [17.3, 17.9], [1, 0]);
  const sky = useTransform(t, [12.4, 13.4, 17.3, 17.9], [0, 1, 1, 0]);
  const light = useTransform(t, [13.15, 13.24, 13.32, 13.4, 13.6], [0, 1, 0.2, 1, 1]);
  const angle = useTransform(rotateY, (v) => `${Math.round(v)}°`);

  const jump = (i: number) => {
    const c = CHAPTERS[i];
    t.set(lessMotion ? Math.min(c.end - 0.05, STILL) : c.start + 0.001);
    setPaused(false);
  };

  const current = CHAPTERS[chapter];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 sm:mb-10">
        <div>
          <p className="eyebrow">
            <Dots />
            איך זה נבנה
          </p>
          <h2 className="mt-3 text-4xl leading-tight font-extrabold sm:text-5xl">מהשרטוט ועד השלט בשטח</h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-muted">{caption}</p>
      </div>

      <figure ref={rootRef} className="overflow-hidden rounded-[2rem] bg-ink text-paper shadow-[0_30px_80px_-30px_rgb(20_20_20/0.55)]">
        <div className="relative">
          <div
            role="img"
            aria-label={`${caption}: שרטוט, ביסוס, שלד פלדה, חיפוי והדפסה, והעמדה בשטח`}
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse" || lessMotion) return;
              const r = e.currentTarget.getBoundingClientRect();
              pointerX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
              pointerY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
            }}
            onPointerLeave={() => {
              pointerX.set(0);
              pointerY.set(0);
            }}
            className="relative aspect-square overflow-hidden [container-type:size] [--cx:50%] [--cy:56%] [--mw:min(74cqw,66cqh)] [--u:calc(var(--mw)/400)] sm:aspect-[16/10] sm:[--cy:53%] sm:[--mw:min(56cqw,68cqh)] lg:aspect-video lg:[--cx:34%] lg:[--cy:52%] lg:[--mw:min(42cqw,68cqh)]"
          >
            <Backdrop sky={sky} light={light} rotateY={rotateY} />

            <m.div
              className="absolute inset-0"
              style={{
                opacity: sceneOpacity,
                perspective: "calc(var(--mw) * 2.2)",
                perspectiveOrigin: "var(--cx) var(--cy)",
              }}
            >
              <m.div
                ref={modelRef}
                className="absolute aspect-[400/420] [transform-style:preserve-3d]"
                style={{
                  left: "calc(var(--cx) - var(--mw) / 2)",
                  top: "calc(var(--cy) - var(--mw) * 0.525)",
                  width: "var(--mw)",
                  rotateX,
                  rotateY,
                  scale,
                  originY: 0.6,
                }}
              >
                <Floor t={t} light={light} />
                <Blueprint t={t} />
                <Foundation t={t} unit={unit} />
                {SLICES.map((z) => (
                  <SteelSlice key={z} t={t} z={z} />
                ))}
                <LowerPanel t={t} />
                <Sparks t={t} />
                <Cladding t={t} unit={unit} />
                <Print t={t} sky={sky} light={light} />
                <Lamps t={t} light={light} />
              </m.div>
            </m.div>

            {/* Vignette, and a scrim behind the caption on large screens */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.45))]" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] bg-gradient-to-l from-ink/90 via-ink/55 to-transparent lg:block" />

            {/* HUD */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-ink/60 px-3 py-1.5 font-display text-xs font-semibold text-paper/85 backdrop-blur-sm sm:text-sm">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-cyan opacity-70 motion-reduce:animate-none" />
                  <span className="relative size-2 rounded-full bg-cyan" />
                </span>
                הדמיה תלת־ממדית
              </span>
              <LogoMark className="h-7 text-paper sm:h-9" />
            </div>
            <div aria-hidden className="pointer-events-none absolute bottom-4 left-4 hidden font-display text-xs leading-relaxed text-paper/45 tabular-nums sm:block sm:bottom-6 sm:left-6">
              <p>3.00 × 2.00 מ׳ · גובה 3.40 מ׳</p>
              <p>
                זווית מצלמה{" "}
                <m.span dir="ltr" className="inline-block min-w-[3ch] text-paper/70">
                  {angle}
                </m.span>
              </p>
            </div>
          </div>

          {/* Caption: under the stage on small screens, beside the model on large ones */}
          <div className="relative min-h-[11.5rem] px-5 pt-6 sm:min-h-[10rem] sm:px-8 lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:min-h-0 lg:w-[40%] lg:items-center lg:p-12 xl:p-14">
            <span
              aria-hidden
              className="text-outline pointer-events-none absolute top-10 right-10 hidden font-display text-[11rem] leading-none font-black tabular-nums lg:block"
              style={{ WebkitTextStrokeColor: "rgb(246 242 234 / 0.14)" }}
            >
              0{chapter + 1}
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={chapter}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="relative lg:pointer-events-auto"
              >
                <p className="flex items-center gap-2 font-display text-sm font-semibold text-paper/55">
                  <span className={cn("size-2.5 rounded-full", current.tone)} />
                  שלב {chapter + 1} מתוך {CHAPTERS.length}
                </p>
                <h3 className="mt-2 font-display text-3xl leading-tight font-black sm:text-4xl lg:text-5xl">{current.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-paper/70 sm:text-lg">{current.text}</p>
                {chapter === CHAPTERS.length - 1 && (
                  <a
                    href="#quote"
                    className="group mt-5 inline-flex items-center gap-2 rounded-full bg-yellow px-5 py-2.5 font-display font-bold text-ink shadow-[-4px_4px_0_0_var(--color-magenta)] transition-transform hover:-translate-y-0.5"
                  >
                    רוצים הדמיה לשלט שלכם?
                    <ArrowUpLeft className="size-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </a>
                )}
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Chapters */}
        <div className="flex items-center gap-3 px-5 pt-3 pb-5 sm:gap-5 sm:px-8 sm:pb-7">
          <ol className="grid flex-1 grid-cols-5 gap-2 sm:gap-3">
            {CHAPTERS.map((c, i) => (
              <li key={c.label}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-label={`שלב ${i + 1}: ${c.title}`}
                  aria-current={i === chapter ? "step" : undefined}
                  className="group block w-full rounded-md py-2 text-start"
                >
                  <span className="block h-1 overflow-hidden rounded-full bg-paper/15">
                    <ChapterFill t={t} chapter={c} />
                  </span>
                  <span
                    className={cn(
                      "mt-2 flex items-center gap-1.5 font-display text-xs font-semibold transition-colors sm:text-sm",
                      i === chapter ? "text-paper" : "text-paper/45 group-hover:text-paper/80",
                    )}
                  >
                    <span className="hidden text-paper/35 tabular-nums sm:inline">0{i + 1}</span>
                    {c.label}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          {!lessMotion && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "הפעלת ההדמיה" : "השהיית ההדמיה"}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              {paused ? <Play className="size-4 fill-current" aria-hidden /> : <Pause className="size-4 fill-current" aria-hidden />}
            </button>
          )}
        </div>
      </figure>
    </div>
  );
}

function ChapterFill({ t, chapter }: { t: MV; chapter: Chapter }) {
  const scaleX = useTransform(t, [chapter.start, chapter.end], [0, 1]);
  return <m.span className={cn("block h-full origin-right", chapter.tone)} style={{ scaleX }} />;
}

/* ------------------------------------------------------------------ *
 * Backdrop: a blueprint grid that gives way to a city at dusk
 * ------------------------------------------------------------------ */

function Backdrop({ sky, light, rotateY }: { sky: MV; light: MV; rotateY: MV }) {
  const blueprint = useTransform(sky, (v) => 1 - v);
  const shift = useTransform(rotateY, (v) => v * -2.5);
  const earlyWindows = useTransform(sky, [0.5, 1], [0, 0.9]);
  return (
    <div aria-hidden className="absolute inset-0">
      <m.div className="absolute inset-0" style={{ opacity: blueprint }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--cx)_45%,rgb(13_181_232/0.16),transparent_60%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgb(13 181 232 / 0.09) 1px, transparent 1px), linear-gradient(90deg, rgb(13 181 232 / 0.09) 1px, transparent 1px), linear-gradient(rgb(13 181 232 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(13 181 232 / 0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px, 64px 64px, 16px 16px, 16px 16px",
            backgroundPosition: "center",
            maskImage: "radial-gradient(ellipse 75% 70% at var(--cx) 50%, black 25%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 70% at var(--cx) 50%, black 25%, transparent 100%)",
          }}
        />
      </m.div>

      <m.div className="absolute inset-0" style={{ opacity: sky }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0f0d1c_0%,#1d1530_26%,#432047_46%,#8c3a7c_58%,#d0626e_65%,#f39a5a_69%,#fdbe52_70%,#251a17_70.3%,#141212_80%,#0c0c0c_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_14%_at_50%_70%,rgb(253_190_82/0.55),transparent)]" />
        {STARS.map(([x, y]) => (
          <span key={`${x}-${y}`} className="absolute size-[2px] rounded-full bg-paper/60" style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
        <m.svg
          viewBox="0 0 2400 200"
          preserveAspectRatio="xMidYMax meet"
          className="absolute bottom-[30%] left-1/2 h-[19%] w-auto max-w-none -translate-x-1/2"
          style={{ x: shift }}
        >
          {SKYLINE.buildings.map((b) => (
            <rect key={b.x} x={b.x} y={200 - b.h} width={b.w} height={b.h} fill="#0b0a12" />
          ))}
          <m.g fill="#fdbe52" style={{ opacity: earlyWindows }}>
            {SKYLINE.windows
              .filter((w) => w.early)
              .map((w) => (
                <rect key={`${w.x}-${w.y}`} x={w.x} y={w.y} width="5" height="7" />
              ))}
          </m.g>
          <m.g fill="#fdbe52" style={{ opacity: light }}>
            {SKYLINE.windows
              .filter((w) => !w.early)
              .map((w) => (
                <rect key={`${w.x}-${w.y}`} x={w.x} y={w.y} width="5" height="7" opacity="0.8" />
              ))}
          </m.g>
        </m.svg>
      </m.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * The model
 * ------------------------------------------------------------------ */

/** Floor-plane box, centred on (x, z) in model units */
const floorBox = (x: number, z: number, w: number, d: number): CSSProperties => ({
  left: `${((x - w / 2 + 250) / 900) * 100}%`,
  top: `${((z - d / 2 + 260) / 520) * 100}%`,
  width: `${(w / 900) * 100}%`,
  height: `${(d / 520) * 100}%`,
});

function Floor({ t, light }: { t: MV; light: MV }) {
  const grid = useTransform(t, [2.5, 3.6, 12.4, 13.4], [0, 1, 1, 0.3]);
  const shadow = useTransform(t, [3.3, 3.7, 6, 8.4], [0, 0.5, 0.5, 0.8]);
  const dust = useTransform(t, [3.32, 4.3], [0, 1], { ease: expoOut });
  const dustScale = useTransform(dust, [0, 1], [0.5, 2]);
  const dustOpacity = useTransform(dust, [0, 0.05, 1], [0, 0.8, 0]);
  return (
    <div className="absolute" style={{ ...box(-250, 120, 900, 520), transform: "rotateX(90deg)" }}>
      <m.div
        className="absolute inset-0"
        style={{
          opacity: grid,
          backgroundImage:
            "linear-gradient(rgb(13 181 232 / 0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(13 181 232 / 0.5) 1px, transparent 1px)",
          backgroundSize: `${u(20)} ${u(20)}`,
          backgroundPosition: "center",
          maskImage: "radial-gradient(closest-side, black 20%, transparent)",
          WebkitMaskImage: "radial-gradient(closest-side, black 20%, transparent)",
        }}
      />
      <m.div
        className="absolute rounded-[50%] bg-[radial-gradient(closest-side,rgb(0_0_0/0.75),transparent)]"
        style={{ ...floorBox(200, 0, 280, 110), opacity: shadow }}
      />
      <m.div
        className="absolute rounded-[50%] bg-[radial-gradient(closest-side,rgb(253_190_82/0.4),transparent)]"
        style={{ ...floorBox(200, 90, 420, 220), opacity: light }}
      />
      <m.div className="absolute rounded-[50%] border-2 border-paper/60" style={{ ...floorBox(200, 0, 190, 80), scale: dustScale, opacity: dustOpacity }} />
    </div>
  );
}

function DrawPath({ t, d, from, to, width = 1.4 }: { t: MV; d: string; from: number; to: number; width?: number }) {
  const pathLength = useTransform(t, [from, to], [0, 1], { ease: smooth });
  const opacity = useTransform(pathLength, (v) => (v > 0.001 ? 1 : 0));
  return <m.path d={d} stroke="currentColor" strokeWidth={width} style={{ pathLength, opacity }} />;
}

function DimLabel({ t, at, x, y, vertical, children }: { t: MV; at: number; x: number; y: number; vertical?: boolean; children: string }) {
  const opacity = useTransform(t, [at, at + 0.35], [0, 1]);
  return (
    <g transform={vertical ? `rotate(-90 ${x} ${y})` : undefined}>
      <m.text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-paper font-display text-[11px] font-semibold"
        stroke="#141414"
        strokeWidth={7}
        strokeLinejoin="round"
        style={{ opacity, paintOrder: "stroke" }}
      >
        {children}
      </m.text>
    </g>
  );
}

/** Stage 1: the elevation drawing, in front of everything, fading to a ghost as the steel goes up */
function Blueprint({ t }: { t: MV }) {
  const opacity = useTransform(t, [3.1, 4.4, 8.3, 9.0], [1, 0.2, 0.2, 0]);
  const reg = useTransform(t, [1.1, 1.5], [0, 1], { ease: expoOut });
  return (
    <div className="absolute inset-0" style={{ transform: tz(9) }}>
      <m.svg viewBox="0 0 400 420" fill="none" className="absolute inset-0 size-full overflow-visible text-cyan" style={{ opacity }}>
        <DrawPath t={t} d="M-40 380 H440" from={0.1} to={0.9} width={1} />
        <DrawPath t={t} d="M50 40 H350 V240 H50 Z M60 50 H340 V230 H60 Z" from={0.25} to={1.35} />
        <DrawPath t={t} d="M60 140 H340 M200 50 V140 M140 140 V230 M200 140 V230 M260 140 V230" from={0.9} to={1.7} width={1.1} />
        <DrawPath t={t} d="M135 240 V372 M145 240 V372 M255 240 V372 M265 240 V372" from={1.3} to={1.9} width={1.1} />
        <DrawPath t={t} d="M120 372 H280 V380 H120 Z" from={1.6} to={2.1} />
        <m.g style={{ opacity: reg }}>
          <m.circle cx={200} cy={92} r={9} stroke="currentColor" strokeWidth={1} style={{ pathLength: reg }} />
          <path d="M186 92 H214 M200 78 V106" stroke="currentColor" strokeWidth={1} />
        </m.g>
        {/* dimensions */}
        <DrawPath t={t} d="M50 20 H350 M50 13 V27 M350 13 V27" from={1.8} to={2.3} width={1} />
        <DrawPath t={t} d="M374 40 V240 M367 40 H381 M367 240 H381" from={1.9} to={2.4} width={1} />
        <DrawPath t={t} d="M22 40 V380 M15 40 H29 M15 380 H29" from={2.0} to={2.5} width={1} />
        <DimLabel t={t} at={2.15} x={200} y={20}>
          3.00 מ׳
        </DimLabel>
        <DimLabel t={t} at={2.25} x={374} y={140} vertical>
          2.00 מ׳
        </DimLabel>
        <DimLabel t={t} at={2.35} x={22} y={300} vertical>
          3.40 מ׳
        </DimLabel>
      </m.svg>
    </div>
  );
}

/** Stage 2: the base plate drops onto the ground and the anchor bolts go in */
function Foundation({ t, unit }: { t: MV; unit: MV }) {
  const drop = useTransform(t, [2.9, 3.32, 3.45, 3.56], [1, 0, 0.05, 0], { ease: [easeIn, easeOut, easeIn] });
  const y = useTransform(() => -drop.get() * 150 * unit.get());
  const visibility = useTransform(t, (v) => (v >= 2.9 ? "visible" : "hidden"));
  return (
    <m.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ y, visibility }}>
      <div
        className="absolute rounded-[3px] bg-[linear-gradient(135deg,#cfd4da,#9aa1aa_55%,#b9bfc6)]"
        style={{ ...box(120, 342, 160, 60), transform: "rotateX(90deg)" }}
      >
        {BOLTS.map((b) => (
          <Bolt key={b.color} t={t} {...b} />
        ))}
      </div>
      <div className="absolute bg-[#79808a]" style={{ ...box(120, 372, 160, 8), transform: tz(30) }} />
      <div className="absolute bg-[#555b63]" style={{ ...box(120, 372, 160, 8), transform: `${tz(-30)} rotateY(180deg)` }} />
      <div className="absolute bg-[#666d75]" style={{ ...box(250, 372, 60, 8), transform: "rotateY(90deg)" }} />
      <div className="absolute bg-[#666d75]" style={{ ...box(90, 372, 60, 8), transform: "rotateY(-90deg)" }} />
    </m.div>
  );
}

function Bolt({ t, at, left, top, color }: { t: MV; at: number; left: string; top: string; color: string }) {
  const scale = useTransform(t, [at, at + 0.18, at + 0.32], [0, 1.45, 1]);
  const ring = useTransform(t, [at + 0.05, at + 0.65], [0, 1]);
  const ringScale = useTransform(ring, [0, 1], [1, 3.2]);
  const ringOpacity = useTransform(ring, [0, 0.1, 1], [0, 0.9, 0]);
  return (
    <span className="absolute aspect-square w-[7.5%]" style={{ left, top, translate: "-50% -50%" }}>
      <m.span className="absolute inset-0 rounded-full border-2" style={{ borderColor: color, scale: ringScale, opacity: ringOpacity }} />
      <m.span
        className="absolute inset-0 rounded-full shadow-[inset_0_-2px_0_rgb(0_0_0/0.35),0_1px_2px_rgb(0_0_0/0.4)]"
        style={{ background: color, scale }}
      />
    </span>
  );
}

const STEEL_FRONT_V = "steel-v";
const STEEL_FRONT_H = "steel-h";

/** Stage 3: one depth slice of the steel. Six of them stacked read as solid tube. */
function SteelSlice({ t, z }: { t: MV; z: number }) {
  const id = useId();
  const front = z === SLICES[SLICES.length - 1];
  const back = z === SLICES[0];
  const fillFor = (mb: Member) => {
    if (front) return `url(#${id}-${mb.w > mb.h ? STEEL_FRONT_H : STEEL_FRONT_V})`;
    return back ? "#5d636b" : "#3d4249";
  };
  return (
    <div className="absolute inset-0" style={{ transform: tz(z) }}>
      <svg viewBox="0 0 400 420" className="absolute inset-0 size-full overflow-visible">
        {front && (
          <defs>
            <linearGradient id={`${id}-${STEEL_FRONT_V}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#8a919a" />
              <stop offset="0.35" stopColor="#eef1f4" />
              <stop offset="0.65" stopColor="#b9c0c7" />
              <stop offset="1" stopColor="#7d848d" />
            </linearGradient>
            <linearGradient id={`${id}-${STEEL_FRONT_H}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#eef1f4" />
              <stop offset="0.5" stopColor="#b9c0c7" />
              <stop offset="1" stopColor="#7d848d" />
            </linearGradient>
          </defs>
        )}
        {MEMBERS.map((mb, i) => (
          <MemberRect key={i} t={t} mb={mb} fill={fillFor(mb)} />
        ))}
      </svg>
    </div>
  );
}

function MemberRect({ t, mb, fill }: { t: MV; mb: Member; fill: string }) {
  const p = useTransform(t, [mb.from, mb.to], [0, 1], { ease: softOut });
  const opacity = useTransform(p, (v) => (v > 0.001 ? 1 : 0));
  const grow =
    mb.grow === "up" || mb.grow === "down"
      ? { scaleY: p, originY: mb.grow === "up" ? 1 : 0 }
      : { scaleX: p, originX: mb.grow === "rtl" ? 1 : 0.5 };
  return <m.rect x={mb.x} y={mb.y} width={mb.w} height={mb.h} fill={fill} style={{ ...grow, opacity }} />;
}

/** The galvanised sheet between the posts */
function LowerPanel({ t }: { t: MV }) {
  const p = useTransform(t, [8.15, 8.75], [0, 1], { ease: expoOut });
  const opacity = useTransform(p, (v) => (v > 0.001 ? 1 : 0));
  const badge = useTransform(t, [11.9, 12.4], [0, 1]);
  return (
    <m.div
      className="absolute bg-[linear-gradient(160deg,#dde2e7_0%,#a9b1ba_45%,#cdd3d9_70%,#9aa2ab_100%)]"
      style={{ ...box(145, 240, 110, 132), scaleY: p, originY: 1, opacity }}
    >
      <m.div className="absolute inset-0 grid place-items-center" style={{ opacity: badge }}>
        <LogoMark className="w-[52%] text-ink/70" />
      </m.div>
    </m.div>
  );
}

function Sparks({ t }: { t: MV }) {
  const id = useId();
  return (
    <div className="absolute inset-0" style={{ transform: tz(6.5) }}>
      <svg viewBox="0 0 400 420" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <radialGradient id={id}>
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.35" stopColor="#fdbe52" />
            <stop offset="1" stopColor="#fdbe52" stopOpacity="0" />
          </radialGradient>
        </defs>
        {SPARKS.map((s, i) => (
          <Spark key={i} t={t} {...s} seed={i} glow={`url(#${id})`} />
        ))}
      </svg>
    </div>
  );
}

function Spark({ t, x, y, at, seed, glow }: { t: MV; x: number; y: number; at: number; seed: number; glow: string }) {
  const p = useTransform(t, [at, at + 0.55], [0, 1]);
  const opacity = useTransform(p, [0, 0.04, 0.6, 1], [0, 1, 0.8, 0]);
  const r = useTransform(p, [0, 0.15, 1], [2, 16, 5]);
  const d = useTransform(p, (v) => {
    const e = 1 - Math.pow(1 - v, 3);
    let path = "";
    for (let k = 0; k < 7; k++) {
      const a = (k / 7) * Math.PI * 2 + seed * 0.9;
      const r0 = 4 + e * 15;
      const r1 = r0 + 3 + (1 - v) * 7;
      const fall = v * v * 10;
      path += `M${(x + Math.cos(a) * r0).toFixed(1)} ${(y + Math.sin(a) * r0 + fall).toFixed(1)}L${(x + Math.cos(a) * r1).toFixed(1)} ${(y + Math.sin(a) * r1 + fall * 1.2).toFixed(1)}`;
    }
    return path;
  });
  return (
    <m.g style={{ opacity }}>
      <m.circle cx={x} cy={y} r={r} fill={glow} />
      <m.path d={d} stroke="#ffe7b0" strokeWidth={1.4} strokeLinecap="round" />
    </m.g>
  );
}

/** Stage 4a: panels fly in from the camera and settle onto the frame */
function Cladding({ t, unit }: { t: MV; unit: MV }) {
  return (
    <div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: tz(7) }}>
      {PANELS.map((p, i) => (
        <Panel key={i} t={t} unit={unit} {...p} at={8.95 + i * 0.24} />
      ))}
    </div>
  );
}

function Panel({
  t,
  unit,
  x,
  y,
  w,
  h,
  color,
  rx,
  ry,
  at,
}: {
  t: MV;
  unit: MV;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  rx: number;
  ry: number;
  at: number;
}) {
  const p = useTransform(t, [at, at + 0.8], [0, 1], { ease: expoOut });
  const z = useTransform(() => (1 - p.get()) * 260 * unit.get());
  const rotateX = useTransform(p, (v) => (1 - v) * rx);
  const rotateY = useTransform(p, (v) => (1 - v) * ry);
  const opacity = useTransform(p, [0, 0.12], [0, 1]);
  return (
    <div className="absolute [transform-style:preserve-3d]" style={box(x, y, w, h)}>
      <m.div
        className="absolute rounded-[2px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.35)]"
        style={{
          inset: u(0.8),
          z,
          rotateX,
          rotateY,
          opacity,
          background: `linear-gradient(160deg, color-mix(in srgb, ${color} 70%, white), ${color} 55%, color-mix(in srgb, ${color} 85%, black))`,
        }}
      />
    </div>
  );
}

/** Stage 4b: the print goes on right to left under a printer head, plates snap into register; 5: lights */
function Print({ t, sky, light }: { t: MV; sky: MV; light: MV }) {
  const wipe = useTransform(t, [10.9, 12.0], [0, 1], { ease: smooth });
  const clipPath = useTransform(wipe, (v) => `inset(0 0 0 ${((1 - v) * 100).toFixed(2)}%)`);
  const visibility = useTransform(t, (v) => (v >= 10.9 ? "visible" : "hidden"));
  const headLeft = useTransform(wipe, (v) => `${(1 - v) * 100}%`);
  const headOpacity = useTransform(t, [10.8, 10.95, 11.95, 12.1], [0, 1, 1, 0]);
  const misreg = useTransform(t, [11.55, 12.35], [1, 0], { ease: smooth });
  const plates = useTransform(t, [11.45, 11.6, 12.2, 12.4], [0, 1, 1, 0]);
  const dim = useTransform(() => sky.get() * (1 - light.get()) * 0.55);
  return (
    <div className="absolute" style={{ ...box(50, 40, 300, 200), transform: tz(7.6) }}>
      <m.div
        className="absolute inset-0"
        style={{ opacity: light, boxShadow: `0 0 ${u(70)} ${u(14)} rgb(253 190 82 / 0.42)` }}
      />
      <m.div className="absolute inset-0 overflow-hidden bg-paper" style={{ clipPath, visibility }}>
        <div className="absolute inset-x-[17%] top-[7%]">
          <LogoFull className="w-full text-ink" />
          <div className="absolute top-0 left-[1.02%] h-[74.67%] w-[98.47%]">
            {PLATES.map((pl) => (
              <Plate key={pl.color} misreg={misreg} opacity={plates} {...pl} />
            ))}
          </div>
        </div>
        <span className="absolute inset-x-0 bottom-0 flex h-[3.5%]">
          <span className="flex-1 bg-cyan" />
          <span className="flex-1 bg-magenta" />
          <span className="flex-1 bg-yellow" />
          <span className="flex-1 bg-green" />
          <span className="flex-1 bg-ink" />
        </span>
        <m.div className="absolute inset-0 bg-ink" style={{ opacity: dim }} />
        <m.div
          className="absolute inset-0 bg-[radial-gradient(28%_38%_at_23%_0%,rgb(255_244_214/0.55),transparent_80%),radial-gradient(28%_38%_at_77%_0%,rgb(255_244_214/0.55),transparent_80%)]"
          style={{ opacity: light }}
        />
      </m.div>
      {/* printer head */}
      <m.div className="absolute -inset-y-[6%] w-[3%] -translate-x-1/2" style={{ left: headLeft, opacity: headOpacity }}>
        <span className="absolute inset-0 rounded-[2px] bg-ink-3 shadow-[0_0_18px_rgb(13_181_232/0.7)]" />
        <span className="absolute inset-y-[10%] left-[30%] flex w-[40%] flex-col gap-[2px]">
          <span className="flex-1 rounded-full bg-cyan" />
          <span className="flex-1 rounded-full bg-magenta" />
          <span className="flex-1 rounded-full bg-yellow" />
          <span className="flex-1 rounded-full bg-paper" />
        </span>
      </m.div>
    </div>
  );
}

function Plate({ misreg, opacity, color, dx, dy }: { misreg: MV; opacity: MV; color: string; dx: number; dy: number }) {
  const x = useTransform(misreg, (v) => `${v * dx}%`);
  const y = useTransform(misreg, (v) => `${v * dy}%`);
  return (
    <m.svg viewBox="40 80 193 112" className="absolute inset-0 size-full mix-blend-multiply" style={{ x, y, opacity }}>
      {glyphs.map((p, i) => (
        <path key={i} transform={p.t} d={p.d} fill={color} />
      ))}
    </m.svg>
  );
}

/** Stage 5: two floodlights on arms over the face, and their beams */
function Lamps({ t, light }: { t: MV; light: MV }) {
  const show = useTransform(t, [12.55, 13.0], [0, 1], { ease: expoOut });
  const beam = useTransform(light, (v) => v * 0.55);
  return (
    <>
      {[118, 282].map((lx) => (
        <div key={lx} className="absolute inset-0 [transform-style:preserve-3d]">
          {/* arm, lying flat from the top of the frame out towards the camera */}
          <div className="absolute" style={{ ...box(lx - 1.5, 22, 3, 38), transform: `${tz(25)} rotateX(90deg)` }}>
            <m.div className="absolute inset-0 bg-[#3a3f46]" style={{ opacity: show }} />
          </div>
          {/* head */}
          <div className="absolute" style={{ ...box(lx - 13, 37, 26, 8), transform: `${tz(44)} rotateX(-55deg)` }}>
            <m.div className="absolute inset-0 rounded-[2px] bg-[#2b2f35]" style={{ opacity: show, scale: show }}>
              <m.span
                className="absolute inset-x-[8%] bottom-0 h-[40%] rounded-[1px] bg-[#fff3cf]"
                style={{ opacity: light, boxShadow: `0 0 ${u(14)} ${u(4)} rgb(253 190 82 / 0.85)` }}
              />
            </m.div>
          </div>
          {/* beam, from the head down onto the face */}
          <div className="absolute" style={{ ...box(lx - 60, 41, 120, 134), transform: `${tz(44)} rotateX(-15.8deg)`, transformOrigin: "50% 0" }}>
            <m.div
              className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(255_236_190/0.55),rgb(255_236_190/0))] [clip-path:polygon(44%_0,56%_0,100%_100%,0_100%)]"
              style={{ opacity: beam }}
            />
          </div>
        </div>
      ))}
    </>
  );
}
