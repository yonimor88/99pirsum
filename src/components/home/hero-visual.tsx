"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";

import { LogoMark } from "@/components/brand/logo";
import { CropMarks } from "@/components/brand/ornaments";
import { PinnedPhoto } from "@/components/ui/pinned-photo";
import { photos } from "@/content/media";

/** Pinned field photos with scroll parallax, the rotating stamp and floating brand dots. */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const ySmallA = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const ySmallB = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const rotateStamp = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div ref={ref} className="relative mx-auto aspect-[1/1.02] w-full max-w-[34rem] lg:max-w-none">
      <motion.div className="absolute inset-x-[6%] top-[4%] bottom-[14%]" style={{ y: yMain }}>
        <div className="relative h-full">
          <CropMarks />
          <PinnedPhoto
            photo={photos.boardReader}
            rotate={-2.5}
            priority
            intro
            fill
            className="h-full"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
        </div>
      </motion.div>

      <motion.div className="absolute top-[-4%] left-[-4%] w-[38%]" style={{ y: ySmallA }}>
        <PinnedPhoto photo={photos.mailboxesTall} rotate={-7} intro delay={0.25} tape="corners" sizes="200px" />
      </motion.div>

      <motion.div className="absolute right-[-2%] bottom-[-2%] w-[44%]" style={{ y: ySmallB }}>
        <PinnedPhoto photo={photos.doorHangersHall} rotate={5} intro delay={0.4} sizes="260px" />
      </motion.div>

      <div
        className="pop-in absolute bottom-[10%] left-[2%] z-20 size-32 sm:size-36"
        style={{ "--intro-delay": "0.8s" } as CSSProperties}
      >
        <motion.div style={{ rotate: rotateStamp }} className="size-full">
          <Stamp />
        </motion.div>
      </div>

      {[
        { c: "bg-yellow", pos: "top-[10%] right-[0%]", d: 0.6 },
        { c: "bg-green", pos: "top-[48%] right-[-4%]", d: 0.7 },
        { c: "bg-cyan", pos: "bottom-[2%] left-[36%]", d: 0.8 },
        { c: "bg-magenta", pos: "top-[30%] left-[-6%]", d: 0.9 },
      ].map((dot) => (
        <span
          key={dot.c}
          aria-hidden
          className={`float-dot absolute ${dot.pos} z-10 size-5 rounded-full ${dot.c} sm:size-6`}
          style={{ "--intro-delay": `${dot.d}s` } as CSSProperties}
        />
      ))}
    </div>
  );
}

/**
 * Lays Hebrew text around a circle, reading right-to-left along the top.
 * Characters go counter-clockwise in logical order; runs of digits are reversed
 * so numbers like "100%" still read left-to-right, as they do in Hebrew text.
 */
function circleChars(text: string) {
  return text
    .split(/([0-9%]+)/)
    .flatMap((run) => (/^[0-9%]+$/.test(run) ? [...run].reverse() : [...run]));
}

const STAMP_TEXT = "תמיד שואפים ל-100% • מאז 1994 • ";

function Stamp() {
  const chars = circleChars(STAMP_TEXT);
  const step = 360 / chars.length;
  return (
    <div className="relative size-full rounded-full bg-yellow text-ink shadow-[0_14px_30px_-12px_rgba(20,20,20,0.5)]">
      <div aria-hidden className="absolute inset-[8%]">
        {chars.map((ch, i) => (
          <span
            key={i}
            className="absolute top-0 left-1/2 h-1/2 w-3 -translate-x-1/2 origin-bottom text-center font-display text-[12px] leading-none font-bold sm:text-[13px]"
            style={{ transform: `rotate(${-i * step}deg)` }}
          >
            {ch}
          </span>
        ))}
      </div>
      <div className="absolute inset-[30%] grid place-items-center">
        <LogoMark className="w-full text-ink" title="" />
      </div>
    </div>
  );
}
