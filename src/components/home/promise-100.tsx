"use client";

import { Camera, Clock, RefreshCw, ShieldCheck, type LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { usePrefersLessMotion } from "@/components/a11y/motion-provider";
import { ColorBar, RegMark } from "@/components/brand/ornaments";
import { cn } from "@/lib/cn";

const promises: { icon: LucideIcon; title: string; text: string; at: number; color: string }[] = [
  {
    icon: Camera,
    title: "תמונות מהשטח",
    text: "אחרי כל הדבקה נשלחות אליכם תמונות ישר לוואטסאפ.",
    at: 0.22,
    color: "bg-yellow",
  },
  {
    icon: ShieldCheck,
    title: "פיקוח מדגמי",
    text: "בסיום כל הפצה אנחנו בודקים בשטח שהחומר הגיע ליעדו.",
    at: 0.42,
    color: "bg-green",
  },
  {
    icon: RefreshCw,
    title: "הדבקה חוזרת",
    text: "מודעה נקרעה או הושחתה? אנחנו יוצאים לתקן.",
    at: 0.62,
    color: "bg-cyan",
  },
  {
    icon: Clock,
    title: "זמינות אמיתית",
    text: "״בשעות לא שעות — גם בשעות הקטנות של הלילה״, כפי שכתבו לנו לקוחות.",
    at: 0.82,
    color: "bg-magenta",
  },
];

export function Promise100() {
  const lessMotion = usePrefersLessMotion();
  return lessMotion ? <StaticPromise /> : <ScrollPromise />;
}

function Copy() {
  return (
    <>
      <p className="eyebrow text-paper/55">
        <RegMark className="size-4" />
        למה דווקא 99?
      </p>
      <h2 className="mt-4 text-4xl leading-[1.05] font-black text-paper sm:text-5xl lg:text-6xl">
        כי 100% זה היעד.
        <br />
        <span className="text-yellow">בכל בניין, בכל לוח.</span>
      </h2>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-paper/65">
        אנחנו לא מבטיחים שלמות — בהפצה תמיד יכול להתפספס בניין בודד. אנחנו מבטיחים לשאוף אליה, כל יום,
        ולהראות לכם בדיוק מה נעשה בשטח.
      </p>
    </>
  );
}

function ScrollPromise() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const value = useTransform(scrollYProgress, [0.04, 0.9], [0, 100], { clamp: true });
  const display = useTransform(value, (v) => Math.round(v).toString());
  const barWidth = useTransform(value, (v) => `${v}%`);
  const doneScale = useTransform(value, [97, 100], [0, 1]);

  return (
    <section ref={ref} className="relative h-[280vh] bg-ink" aria-label="תמיד שואפים ל-100%">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div aria-hidden className="halftone absolute inset-0 text-paper/[0.06]" />
        <div className="container-page relative grid flex-1 items-center gap-10 py-20 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative">
            <div className="flex items-start font-display leading-[0.8] font-black text-paper" dir="ltr">
              <motion.span className="text-[34vw] tabular-nums sm:text-[28vw] lg:text-[17rem] xl:text-[20rem]">
                {display}
              </motion.span>
              <span className="mt-[0.12em] text-[14vw] text-yellow sm:text-[11vw] lg:text-[7rem] xl:text-[8rem]">%</span>
            </div>
            <motion.div
              className="absolute -top-4 right-0 flex gap-2 lg:top-0"
              style={{ scale: doneScale, opacity: doneScale }}
              aria-hidden
            >
              <span className="size-5 rounded-full bg-yellow" />
              <span className="size-5 rounded-full bg-green" />
              <span className="size-5 rounded-full bg-cyan" />
              <span className="size-5 rounded-full bg-magenta" />
            </motion.div>
            <div className="mt-8 hidden max-w-xl lg:block">
              <Copy />
            </div>
          </div>

          <div>
            <div className="mb-8 lg:hidden">
              <Copy />
            </div>
            <ul className="space-y-3">
              {promises.map((p) => (
                <PromiseItem key={p.title} item={p} progress={scrollYProgress} />
              ))}
            </ul>
          </div>
        </div>

        <div className="relative h-1.5 w-full bg-paper/10">
          <motion.div className="absolute inset-y-0 right-0 overflow-hidden" style={{ width: barWidth }}>
            <ColorBar className="h-full w-[100vw]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PromiseItem({
  item,
  progress,
}: {
  item: (typeof promises)[number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [item.at - 0.08, item.at], [0.25, 1]);
  const x = useTransform(progress, [item.at - 0.08, item.at], [-24, 0]);
  const dot = useTransform(progress, [item.at - 0.02, item.at + 0.02], [0, 1]);
  const Icon = item.icon;
  return (
    <motion.li
      style={{ opacity, x }}
      className="flex items-start gap-4 rounded-3xl border border-paper/10 bg-paper/[0.04] p-5 text-paper backdrop-blur-sm"
    >
      <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-paper/10">
        <Icon className="size-6" aria-hidden />
        <motion.span
          style={{ scale: dot }}
          className={cn("absolute -top-1 -left-1 size-3.5 rounded-full ring-4 ring-ink", item.color)}
          aria-hidden
        />
      </span>
      <span>
        <span className="block font-display text-xl font-bold">{item.title}</span>
        <span className="mt-1 block text-paper/65">{item.text}</span>
      </span>
    </motion.li>
  );
}

function StaticPromise() {
  return (
    <section className="relative bg-ink py-24" aria-label="תמיד שואפים ל-100%">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-display text-[8rem] leading-none font-black text-paper" dir="ltr">
            100<span className="text-yellow">%</span>
          </p>
          <div className="mt-6">
            <Copy />
          </div>
        </div>
        <ul className="space-y-3">
          {promises.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.title} className="flex items-start gap-4 rounded-3xl border border-paper/10 bg-paper/[0.04] p-5 text-paper">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-paper/10">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-xl font-bold">{p.title}</span>
                  <span className="mt-1 block text-paper/65">{p.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <ColorBar className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
