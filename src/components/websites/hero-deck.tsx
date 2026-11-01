"use client";

import { Gauge, Search, Smartphone } from "lucide-react";
import { AnimatePresence, m, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

import { usePrefersLessMotion } from "@/components/a11y/motion-provider";
import type { Website } from "@/content/websites";
import { cn } from "@/lib/cn";
import { BrowserFrame, PhoneFrame } from "./device-frames";

const CYCLE_MS = 4200;

/* Where each card sits in the deck, front (0) to back. */
const SLOTS = [
  { x: "0%", y: "0%", rotate: -1.5, scale: 1, opacity: 1 },
  { x: "-7%", y: "-11%", rotate: 3, scale: 0.92, opacity: 0.95 },
  { x: "6%", y: "-21%", rotate: -4.5, scale: 0.84, opacity: 0.75 },
  { x: "-3%", y: "-30%", rotate: 5, scale: 0.76, opacity: 0.5 },
];

type DeckSite = Pick<Website, "slug" | "name" | "domain" | "industry" | "glow"> & {
  shots: Pick<Website["shots"], "desktop" | "mobile">;
};

export function HeroDeck({ sites }: { sites: DeckSite[] }) {
  const [active, setActive] = useState(0);
  const [cycled, setCycled] = useState(false);
  const [paused, setPaused] = useState(false);
  const lessMotion = usePrefersLessMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Mouse tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });

  // The deck leans back and sinks as the hero scrolls away
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sink = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const lean = useTransform(scrollYProgress, [0, 1], [0, 18]);

  useEffect(() => {
    if (paused || lessMotion) return;
    const id = setTimeout(() => {
      setCycled(true);
      setActive((a) => (a + 1) % sites.length);
    }, CYCLE_MS);
    return () => clearTimeout(id);
  }, [active, paused, lessMotion, sites.length]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const current = sites[active];

  return (
    <div ref={ref} className="relative">
      <m.div style={lessMotion ? undefined : { y: sink, rotateX: lean }} className="[perspective:1800px]">
        <div
          onPointerMove={onMove}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => {
            setPaused(false);
            px.set(0);
            py.set(0);
          }}
          className="relative pt-[22%]"
        >
          {/* Glow in the active site's colour */}
          <m.div
            aria-hidden
            className="absolute inset-[10%] -z-10 rounded-full blur-3xl"
            animate={{ backgroundColor: current.glow, opacity: 0.45 }}
            transition={{ duration: 1.2 }}
          />

          <m.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative aspect-[16/11.4]">
            {sites.map((site, i) => {
              const slot = (i - active + sites.length) % sites.length;
              const s = SLOTS[Math.min(slot, SLOTS.length - 1)];
              const justLeftFront = cycled && slot === sites.length - 1;
              return (
                <m.div
                  key={site.slug}
                  className="absolute inset-x-[4%] bottom-0 origin-bottom"
                  style={{ zIndex: 40 - slot * 10 }}
                  initial={{ opacity: 0, y: "30%", rotateX: -30, scale: 0.9 }}
                  animate={
                    justLeftFront
                      ? {
                          x: ["0%", "-75%", s.x],
                          y: ["0%", "8%", s.y],
                          rotate: [-1.5, -14, s.rotate],
                          scale: [1, 0.9, s.scale],
                          opacity: [1, 0, s.opacity],
                          rotateX: 0,
                        }
                      : { ...s, rotateX: 0 }
                  }
                  transition={
                    justLeftFront
                      ? { duration: 1.1, ease: [0.65, 0, 0.35, 1], times: [0, 0.45, 1] }
                      : { type: "spring", stiffness: 140, damping: 20, delay: cycled ? 0.12 * slot : 0.15 + 0.12 * (sites.length - slot) }
                  }
                >
                  <BrowserFrame domain={site.domain}>
                    <Image
                      src={site.shots.desktop}
                      alt={slot === 0 ? `צילום מסך של האתר ${site.name}` : ""}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1024px) 46vw, 92vw"
                      className="object-cover object-top"
                    />
                  </BrowserFrame>
                </m.div>
              );
            })}
          </m.div>

          {/* Phone with the active site */}
          <m.div
            className="absolute -bottom-[9%] left-[-3%] z-50 w-[25%] sm:left-[-5%]"
            initial={{ opacity: 0, y: 60, rotate: -12 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.9 }}
          >
            <m.div animate={lessMotion ? undefined : { y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
              <PhoneFrame>
                <AnimatePresence initial={false}>
                  <m.div
                    key={current.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image src={current.shots.mobile} alt="" fill sizes="20vw" className="object-cover object-top" />
                  </m.div>
                </AnimatePresence>
              </PhoneFrame>
            </m.div>
          </m.div>

          {/* Floating proof chips */}
          <Chip className="top-[6%] -right-[2%]" delay={1.1} icon={<Gauge className="size-4" aria-hidden />} label="טעינה מהירה" dot="bg-green" />
          <Chip className="top-[44%] -left-[4%] hidden sm:flex" delay={1.25} icon={<Search className="size-4" aria-hidden />} label="מוכן לגוגל" dot="bg-cyan" />
          <Chip className="-bottom-[4%] right-[8%]" delay={1.4} icon={<Smartphone className="size-4" aria-hidden />} label="מושלם בנייד" dot="bg-magenta" />
        </div>
      </m.div>

      {/* Site switcher with a story-style timer */}
      <div role="group" aria-label="בחירת אתר להצגה" className="relative z-50 mt-16 flex flex-wrap justify-center gap-2 sm:mt-20">
        {sites.map((site, i) => {
          const on = i === active;
          return (
            <button
              key={site.slug}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setCycled(true);
                setActive(i);
              }}
              className={cn(
                "relative overflow-hidden rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors",
                on ? "border-ink bg-ink text-paper" : "border-ink/15 bg-paper/70 text-ink hover:border-ink/40",
              )}
            >
              {on && !paused && !lessMotion && (
                <m.span
                  key={`${site.slug}-${active}`}
                  aria-hidden
                  className="absolute inset-y-0 right-0 bg-paper/20"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                />
              )}
              <span className="relative">{site.name}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        מוצג כעת: {current.name}, {current.industry}
      </p>
    </div>
  );
}

function Chip({
  className,
  delay,
  icon,
  label,
  dot,
}: {
  className?: string;
  delay: number;
  icon: ReactNode;
  label: string;
  dot: string;
}) {
  return (
    <m.div
      aria-hidden
      className={cn("absolute z-50 flex", className)}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay }}
    >
      <m.span
        className="flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 font-display text-sm font-semibold text-ink shadow-[0_12px_30px_-10px_rgb(0_0_0/0.35)] backdrop-blur"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.6 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className={cn("grid size-6 place-items-center rounded-full text-ink", dot)}>{icon}</span>
        {label}
      </m.span>
    </m.div>
  );
}
