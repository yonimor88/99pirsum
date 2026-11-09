"use client";

import { ArrowDown, ArrowUpLeft, Check, ChevronsDown, Lock } from "lucide-react";
import { m, useScroll, useTransform, type Variants } from "motion/react";
import Image from "next/image";
import { useRef, type CSSProperties, type RefObject } from "react";

import { usePrefersLessMotion } from "@/components/a11y/motion-provider";
import { WhatsAppIcon } from "@/components/ui/icons";
import { websitesWhatsappLink } from "@/content/site";
import type { Website } from "@/content/websites";
import { cn } from "@/lib/cn";
import { BROWSER_SCREEN_RATIO, BrowserFrame, PHONE_SCREEN_RATIO, PhoneFrame, scrollTravel } from "./device-frames";

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 18 } },
};
const pop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } },
};

/** Where the phone stage's skip button goes: the next project, or past the last one */
export type SceneLink = { href: string; label: string };

/**
 * One project. The live site's full-page capture scrolls inside the laptop and
 * phone while they stay pinned to the viewport. On large screens the whole
 * scene pins; below that only the devices pin, and the story follows below.
 * On phones a laptop is too small to read, so the devices give way to one big
 * phone (`PhoneStage`) showing the mobile site.
 */
export function ProjectScene({
  id,
  site,
  index,
  total,
  next,
}: {
  id: string;
  site: Website;
  index: number;
  total: number;
  next: SceneLink;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const lessMotion = usePrefersLessMotion();
  const flip = index % 2 === 1;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const desktopY = useTransform(scrollYProgress, [0.27, 0.73], ["0%", `-${scrollTravel(site.shots.desktopLong, BROWSER_SCREEN_RATIO)}%`]);
  const phoneY = useTransform(scrollYProgress, [0.25, 0.75], ["0%", `-${scrollTravel(site.shots.mobileLong, PHONE_SCREEN_RATIO)}%`]);
  const progress = useTransform(scrollYProgress, [0.27, 0.73], [0, 1]);
  const enterScale = useTransform(scrollYProgress, [0.05, 0.27], [0.86, 1]);
  const enterTilt = useTransform(scrollYProgress, [0.05, 0.27], [14, 0]);
  const exitLift = useTransform(scrollYProgress, [0.73, 0.95], [0, -60]);
  const phoneLift = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [90, 0, -50]);
  const glowScale = useTransform(scrollYProgress, [0.1, 0.4, 0.9], [0.6, 1.1, 0.8]);

  const number = String(index + 1).padStart(2, "0");

  return (
    <section
      id={id}
      aria-labelledby={`site-${site.slug}`}
      // Below lg: --dev-h is the height of the pinned devices, --pin how far the page scrolls while they stay
      // pinned. Phones: the full-screen phone stage, pinned for as long as its capture takes to scroll past at
      // finger speed. Tablets: the browser frame + the phone hanging below it, pinned for 200vh.
      style={{ "--phone-pin": phoneStagePin(site.shots.mobileLong) } as CSSProperties}
      // -scroll-mt-24 cancels the page's 6rem scroll-padding-top, so a jump here lands with the devices pinned
      className="relative -scroll-mt-24 [--dev-h:100svh] [--pin:var(--phone-pin)] md:[--dev-h:calc((100vw-4rem)*0.625+5.5rem)] md:[--pin:200vh] lg:h-[300vh]"
    >
      {/*
        Scroll ruler for the capture animation. Large screens: the whole pinned scene. Tablets: only the devices
        pin, vertically centred, for 200vh — the ruler is shifted up by that centring offset so the mapping is the same.
        Phones don't use it: the phone stage tracks its own pin.
      */}
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[calc(var(--dev-h)/2_-_50svh)] h-[300vh] lg:top-0"
      />
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
        <div className="container-page grid items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-14 lg:pb-0">
          {/* Devices */}
          <div ref={devicesRef} className={cn("h-[calc(var(--pin)_+_var(--dev-h))] lg:col-span-7 lg:h-auto", flip && "lg:order-2")}>
            <div className="sticky top-[calc(50svh_-_var(--dev-h)/2)] lg:static">
              <PhoneStage
                site={site}
                number={number}
                total={total}
                track={devicesRef}
                hint={index === 0}
                next={next}
                className="md:hidden"
              />
              <div className="relative hidden w-full md:block">
                <m.div
                  aria-hidden
                  className="absolute inset-[8%] -z-10 rounded-full opacity-50 blur-[90px]"
                  style={{ backgroundColor: site.glow, scale: lessMotion ? 1 : glowScale }}
                />
                <div className="[perspective:1600px]">
                  <m.div style={lessMotion ? undefined : { scale: enterScale, rotateX: enterTilt, y: exitLift }} className="origin-bottom">
                    <BrowserFrame domain={site.domain} tone="dark">
                      <m.div style={{ y: desktopY }} className="absolute inset-x-0 top-0 will-change-transform">
                        <Image
                          src={site.shots.desktopLong}
                          alt={`צילום מסך מלא של האתר ${site.name}`}
                          sizes="(min-width: 1024px) 52vw, 92vw"
                          className="h-auto w-full"
                        />
                      </m.div>
                      {/* scroll progress */}
                      <m.span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1 origin-right"
                        style={{ scaleX: progress, backgroundColor: site.glow }}
                      />
                    </BrowserFrame>
                  </m.div>
                </div>
                <m.div
                  className={cn("absolute -bottom-10 w-[26%] sm:-bottom-14", flip ? "-right-2 sm:-right-6" : "-left-2 sm:-left-6")}
                  style={lessMotion ? undefined : { y: phoneLift }}
                >
                  <PhoneFrame className={flip ? "rotate-[5deg]" : "-rotate-[5deg]"}>
                    <m.div style={{ y: phoneY }} className="absolute inset-x-0 top-0 will-change-transform">
                      <Image src={site.shots.mobileLong} alt={`האתר ${site.name} בטלפון`} sizes="(min-width: 1024px) 14vw, 26vw" className="h-auto w-full" />
                    </m.div>
                  </PhoneFrame>
                </m.div>
              </div>
            </div>
          </div>

          {/* Story */}
          <m.div
            className={cn("relative lg:col-span-5", flip && "lg:order-1")}
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* On phones the stage above already shows all of this, so it stays for screen readers only */}
            <m.div variants={item} className="flex items-center gap-4 max-md:sr-only">
              <span className="text-outline font-display text-6xl leading-none font-black sm:text-7xl short:text-5xl" style={{ WebkitTextStrokeColor: site.glow }}>
                {number}
              </span>
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-xs tracking-widest text-paper/40 tabular-nums">
                  {number} / {String(total).padStart(2, "0")}
                  {site.concept && <span className="rounded-full bg-yellow px-2 py-0.5 font-bold tracking-normal text-ink">אתר קונספט</span>}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 px-3 py-1 text-sm text-paper/80">
                  <span className="size-2 rounded-full" style={{ backgroundColor: site.glow }} />
                  {site.industry}
                </span>
              </span>
            </m.div>

            <m.h3 variants={item} id={`site-${site.slug}`} className="text-4xl leading-none font-black text-paper sm:text-5xl md:mt-6 lg:text-[3.4rem] short:mt-4 short:text-[2.75rem]">
              {site.name}
            </m.h3>
            <m.p variants={item} className="mt-3 font-display text-xl font-semibold sm:text-2xl short:mt-2 short:text-xl" style={{ color: site.glow }}>
              {site.headline}
            </m.p>
            <m.p variants={item} className="mt-4 text-lg leading-relaxed text-paper/70 lg:[@media(max-height:960px)]:sr-only">
              {site.summary}
            </m.p>

            <m.dl variants={item} className="mt-6 grid gap-3 sm:grid-cols-2 short:mt-4">
              <div className="rounded-2xl border border-paper/10 bg-paper/[0.04] p-4 short:p-3.5">
                <dt className="text-xs font-semibold tracking-wide text-paper/45">האתגר</dt>
                <dd className="mt-1.5 leading-relaxed text-paper/85 short:mt-1 short:text-[0.95rem] short:leading-normal">{site.challenge}</dd>
              </div>
              <div className="rounded-2xl border border-paper/10 bg-paper/[0.04] p-4 short:p-3.5">
                <dt className="text-xs font-semibold tracking-wide text-paper/45">מה בנינו</dt>
                <dd className="mt-1.5 leading-relaxed text-paper/85 short:mt-1 short:text-[0.95rem] short:leading-normal">{site.solution}</dd>
              </div>
            </m.dl>

            <m.ul variants={list} className="mt-6 flex flex-wrap gap-2 short:mt-4 shorter:sr-only" aria-label="מה יש באתר">
              {site.features.map((f) => (
                <m.li
                  key={f}
                  variants={pop}
                  className="inline-flex items-center gap-1.5 rounded-full bg-paper/[0.08] px-3 py-1.5 text-sm text-paper/90 short:py-1 short:text-[0.8rem]"
                >
                  <Check className="size-3.5" style={{ color: site.glow }} strokeWidth={3} aria-hidden />
                  {f}
                </m.li>
              ))}
            </m.ul>

            <m.div variants={item} className="mt-6 flex items-center gap-3 short:hidden">
              <span className="text-xs text-paper/45">פלטת הצבעים</span>
              <m.span variants={list} className="flex -space-x-1.5 space-x-reverse">
                {site.palette.map((c) => (
                  <m.span
                    key={c}
                    variants={pop}
                    whileHover={{ y: -6, scale: 1.25 }}
                    title={c}
                    className="size-7 rounded-full ring-2 ring-ink"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </m.span>
            </m.div>

            <m.div variants={item} className="mt-8 flex flex-wrap items-center gap-3 short:mt-5">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex h-12 items-center gap-2 rounded-full bg-paper px-6 font-display font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: `-4px 4px 0 0 ${site.glow}` }}
              >
                לאתר החי
                <ArrowUpLeft className="size-4 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden />
                <span className="sr-only">(נפתח בלשונית חדשה)</span>
              </a>
              <a
                href={websitesWhatsappLink(`שלום, ראיתי באתר שלכם את האתר של ${site.name} ואשמח לאתר כזה לעסק שלי`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full px-4 font-display font-semibold text-paper/85 transition-colors hover:bg-paper/10 hover:text-paper"
              >
                <WhatsAppIcon className="size-5 text-whatsapp" />
                אני רוצה אתר כזה
              </a>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

/** Scroll thumb height, as a share of its track */
const THUMB = 0.14;

/**
 * How fast the phone stage's capture scrolls relative to the page: 1 moves the site under the visitor's finger
 * exactly as if they were scrolling it themselves. Higher is faster but keeps the page shorter.
 */
const PHONE_SCROLL_SPEED = 1;

/**
 * How long the phone stage stays pinned: the distance its capture has to travel, ÷ PHONE_SCROLL_SPEED. CSS works
 * the travel out from the stage's layout — the screen is the phone (at most 25rem, inside the page's 1.25rem
 * gutters) less its 0.625rem bezels, and is as tall as the viewport less ~10rem of caption, bezel and address bar.
 * Keep in step with `PhoneStage`.
 */
function phoneStagePin(capture: { width: number; height: number }) {
  const ratio = (capture.height / capture.width).toFixed(4);
  const travel = `(min(25rem, 100vw - 2.5rem) - 1.25rem) * ${ratio} - 100svh + 10rem`;
  return `max(100vh, calc((${travel}) / ${PHONE_SCROLL_SPEED}))`;
}

/**
 * Phones only: the stage fills the screen while it's pinned. One big phone, close to
 * the real size of the visitor's own, runs off the bottom of the screen and scrolls
 * through the mobile site, with the project's name and number above it.
 */
function PhoneStage({
  site,
  number,
  total,
  track,
  hint,
  next,
  className,
}: {
  site: Website;
  number: string;
  total: number;
  /** The box the stage is pinned inside: it stays on screen from the box's top reaching the top of the viewport to its bottom reaching the bottom */
  track: RefObject<HTMLDivElement | null>;
  /** Show the "scroll to browse" cue */
  hint: boolean;
  /** The skip button at the bottom */
  next: SceneLink;
  className?: string;
}) {
  const lessMotion = usePrefersLessMotion();

  // enter: 0 → 1 as the stage scrolls up into place. p: 0 → 1 while it's pinned.
  const { scrollYProgress: enter } = useScroll({ target: track, offset: ["start end", "start start"] });
  const { scrollYProgress: p } = useScroll({ target: track, offset: ["start start", "end end"] });
  // Two layers move the capture by p × (screen height − capture height) without measuring either:
  // the outer one goes down a share of the screen, the inner one up the same share of the capture.
  const down = useTransform(p, (v) => `${v * 100}%`);
  const up = useTransform(p, (v) => `${v * -100}%`);
  const thumbY = useTransform(p, (v) => `${v * (1 / THUMB - 1) * 100}%`);
  const rise = useTransform(enter, [0.24, 1], [80, 0]);
  const grow = useTransform(enter, [0.24, 1], [0.9, 1]);
  // Brightens as the stage arrives, then dims a little on the way through
  const glowIn = useTransform(enter, [0.24, 1], [0.15, 0.55]);
  const glowOut = useTransform(p, [0, 1], [0.55, 0.35]);
  const glow = useTransform([glowIn, glowOut], ([a, b]: number[]) => Math.min(a, b));
  const hintOpacity = useTransform(p, [0.01, 0.05], [1, 0]);

  return (
    <div className={cn("relative flex h-svh flex-col pt-5", className)}>
      {/* Caption: the story below repeats it in full */}
      <div aria-hidden className="flex shrink-0 items-center gap-3 pb-4">
        <span className="text-outline font-display text-[2.75rem] leading-none font-black" style={{ WebkitTextStrokeColor: site.glow }}>
          {number}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-display text-xl leading-tight font-bold text-paper">{site.name}</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-sm text-paper/60">
            <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: site.glow }} />
            <span className="truncate">{site.industry}</span>
          </span>
        </span>
        <span className="ms-auto flex shrink-0 flex-col items-end gap-1.5 text-xs tracking-widest text-paper/40 tabular-nums">
          <span dir="ltr">
            {number} / {String(total).padStart(2, "0")}
          </span>
          {site.concept && <span className="rounded-full bg-yellow px-2 py-0.5 font-bold tracking-normal text-ink">קונספט</span>}
        </span>
      </div>

      {/* The phone, running off the bottom of the screen */}
      <div className="relative isolate min-h-0 flex-1">
        <m.div
          aria-hidden
          className="absolute inset-x-[6%] top-[4%] -z-10 h-3/4 rounded-full blur-[70px]"
          style={{ backgroundColor: site.glow, opacity: lessMotion ? 0.45 : glow }}
        />
        <m.div
          style={lessMotion ? undefined : { y: rise, scale: grow }}
          className="relative mx-auto h-full max-w-[25rem] origin-bottom"
        >
          {/* Side buttons */}
          <span aria-hidden className="absolute top-24 -left-[3px] h-9 w-[3px] rounded-l-sm bg-ink-3" />
          <span aria-hidden className="absolute top-36 -left-[3px] h-14 w-[3px] rounded-l-sm bg-ink-3" />
          <span aria-hidden className="absolute top-32 -right-[3px] h-20 w-[3px] rounded-r-sm bg-ink-3" />

          <div className="h-full rounded-t-[2.75rem] bg-ink-2 p-2.5 pb-0 shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.14)]">
            <div className="flex h-full flex-col overflow-hidden rounded-t-[2.2rem] bg-white">
              {/* Status bar and address bar */}
              <div dir="ltr" className="shrink-0 bg-paper-2 px-4 pt-2 pb-2.5">
                <span aria-hidden className="mx-auto block h-[1.15rem] w-[4.75rem] rounded-full bg-ink" />
                <span className="mx-auto mt-2 flex w-fit max-w-full items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs text-muted shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
                  <Lock className="size-3 shrink-0" aria-hidden />
                  <span className="truncate">{site.domain}</span>
                </span>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden">
                <m.div style={{ y: down }} className="absolute inset-0 will-change-transform">
                  <m.div style={{ y: up }} className="will-change-transform">
                    <Image
                      src={site.shots.mobileLong}
                      alt={`האתר ${site.name} בטלפון`}
                      sizes="(min-width: 448px) 25rem, 90vw"
                      className="h-auto w-full"
                    />
                  </m.div>
                </m.div>

                {/* Scroll indicator */}
                <span aria-hidden className="absolute inset-y-2 right-1 w-1">
                  <m.span className="block w-full rounded-full" style={{ height: `${THUMB * 100}%`, y: thumbY, backgroundColor: site.glow }} />
                </span>

                {hint && (
                  <m.p
                    aria-hidden
                    style={{ opacity: hintOpacity }}
                    className="pointer-events-none absolute inset-x-0 top-[38%] mx-auto flex w-fit items-center gap-2 rounded-full bg-ink/85 px-4 py-2 font-display text-sm font-semibold text-paper shadow-[0_12px_30px_-10px_rgb(0_0_0/0.5)] backdrop-blur"
                  >
                    <ChevronsDown className={cn("size-4", !lessMotion && "animate-bounce")} aria-hidden />
                    גללו כדי לדפדף באתר
                  </m.p>
                )}
              </div>
            </div>
          </div>
        </m.div>

        {/*
          Fades the phone into the page. A fade drawn over it rather than a mask on it: Chrome can leave the
          bottom pixel rows of a masked, scrolling capture unmasked. Wider than the stage to cover the glow's
          edges, and a little past its bottom for rounding — not more, or it would hide the story below.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-8 top-[70%] -bottom-2 bg-linear-to-b from-ink/0 to-ink to-86%"
        />
      </div>

      {/* Skip ahead, level with the floating WhatsApp and accessibility buttons in the corners */}
      <a
        href={next.href}
        className="absolute bottom-6 left-1/2 inline-flex h-12 -translate-x-1/2 items-center gap-2 rounded-full bg-paper px-5 font-display font-semibold whitespace-nowrap text-ink transition-transform active:scale-95"
        style={{ boxShadow: `-3px 3px 0 0 ${site.glow}` }}
      >
        {next.label}
        <ArrowDown className="size-4" aria-hidden />
      </a>
    </div>
  );
}
