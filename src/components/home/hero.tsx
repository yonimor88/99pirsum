"use client";

import { ArrowUpLeft } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { LogoMark } from "@/components/brand/logo";
import { CropMarks, Dots } from "@/components/brand/ornaments";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Misregistered } from "@/components/ui/misregistered";
import { PinnedPhoto } from "@/components/ui/pinned-photo";
import { Mark } from "@/components/ui/section-heading";
import { totals } from "@/content/cities";
import { photos } from "@/content/media";
import { site, whatsappLink } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: totals.mailboxes, label: "תיבות דואר" },
  { value: totals.buildings, label: "בניינים" },
  { value: totals.boards, label: "לוחות מודעות" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const ySmallA = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const ySmallB = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const rotateStamp = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 pb-24 sm:pt-32 lg:pt-36 lg:pb-32">
      <div aria-hidden className="halftone halftone-fade absolute -top-32 -left-40 size-[42rem] text-ink/12" />
      <div aria-hidden className="halftone halftone-fade absolute -right-32 bottom-0 size-[26rem] text-magenta/25" />

      <div className="container-page relative grid items-center gap-16 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
        {/* Copy */}
        <div className="relative z-10">
          <motion.p
            className="inline-flex items-center gap-2.5 rounded-full border border-ink/12 bg-paper/80 px-3.5 py-1.5 text-sm font-medium text-ink/80 backdrop-blur"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Dots size="size-1.5" />
            פרסום והפצה למגזר החרדי והדתי · מאז {site.foundingYear}
          </motion.p>

          <h1 className="mt-7 font-display text-[3.4rem] leading-[0.98] font-black tracking-tight sm:text-7xl lg:text-[5.6rem] xl:text-[6.2rem]">
            <span className="block">
              <Misregistered>המסר שלכם</Misregistered>
            </span>
            <span className="block">
              <Misregistered delay={0.1}>בכל בית,</Misregistered>
            </span>
            <span className="block">
              <Mark>
                <Misregistered delay={0.2}>בכל לוח.</Misregistered>
              </Mark>
            </span>
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          >
            99 פרסום ומדיה מתכננת, מעצבת, מדפיסה ומפיצה את הפרסום שלכם — בתיבות הדואר, על לוחות
            המודעות, על הדלתות ובבתי הכנסת. גורם אחד, מהרעיון ועד התמונה האחרונה מהשטח.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          >
            <ButtonLink href="/contact" size="lg">
              לקבלת הצעת מחיר
              <ArrowUpLeft className="size-5 transition-transform group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden />
            </ButtonLink>
            <ButtonAnchor href={whatsappLink()} target="_blank" rel="noopener noreferrer" variant="outline" size="lg">
              <WhatsAppIcon className="size-5 text-green-ink group-hover/btn:text-paper" />
              דברו איתנו בוואטסאפ
            </ButtonAnchor>
          </motion.div>

          <motion.dl
            className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-x-reverse divide-ink/12 border-y border-ink/12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-4 first:ps-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-extrabold tabular-nums sm:text-3xl">
                  <Counter value={s.value} />
                </dd>
                <dd className="mt-0.5 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Visual */}
        <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[34rem] lg:max-w-none">
          <motion.div className="absolute inset-x-[6%] top-[4%] bottom-[14%]" style={{ y: yMain }}>
            <div className="relative h-full">
              <CropMarks />
              <PinnedPhoto
                photo={photos.boardReader}
                rotate={-2.5}
                priority
                fill
                className="h-full"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </div>
          </motion.div>

          <motion.div className="absolute top-[-4%] left-[-4%] w-[38%]" style={{ y: ySmallA }}>
            <PinnedPhoto photo={photos.mailboxesTall} rotate={-7} delay={0.25} tape="corners" sizes="200px" />
          </motion.div>

          <motion.div className="absolute right-[-2%] bottom-[-2%] w-[44%]" style={{ y: ySmallB }}>
            <PinnedPhoto photo={photos.doorHangersHall} rotate={5} delay={0.4} sizes="260px" />
          </motion.div>

          {/* Rotating stamp */}
          <motion.div
            className="absolute bottom-[10%] left-[2%] z-20 size-32 sm:size-36"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.9 }}
          >
            <motion.div style={{ rotate: rotateStamp }} className="size-full">
              <Stamp />
            </motion.div>
          </motion.div>

          {/* Floating brand dots */}
          {[
            { c: "bg-yellow", pos: "top-[10%] right-[0%]", d: 0.6 },
            { c: "bg-green", pos: "top-[48%] right-[-4%]", d: 0.7 },
            { c: "bg-cyan", pos: "bottom-[2%] left-[36%]", d: 0.8 },
            { c: "bg-magenta", pos: "top-[30%] left-[-6%]", d: 0.9 },
          ].map((dot) => (
            <motion.span
              key={dot.c}
              aria-hidden
              className={`absolute ${dot.pos} z-10 size-5 rounded-full ${dot.c} sm:size-6`}
              initial={{ scale: 0, y: -40 }}
              animate={{ scale: 1, y: [0, -8, 0] }}
              transition={{
                scale: { type: "spring", stiffness: 300, damping: 12, delay: dot.d },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: dot.d + 0.6 },
              }}
            />
          ))}
        </div>
      </div>
    </section>
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
