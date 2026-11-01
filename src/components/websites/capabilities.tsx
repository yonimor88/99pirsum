"use client";

import { Accessibility, Palette, QrCode, Search, Smartphone, Zap } from "lucide-react";
import { AnimatePresence, m, useInView, type Variants } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { usePrefersLessMotion } from "@/components/a11y/motion-provider";
import { WhatsAppIcon } from "@/components/ui/icons";
import type { Photo } from "@/content/media";
import { cn } from "@/lib/cn";

export type Score = { label: string; value: number };

const tile: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 90, damping: 18 } },
};

export function Capabilities({
  scores,
  scoreNote,
  palettes,
  fieldPhoto,
}: {
  scores: Score[];
  scoreNote: string;
  palettes: string[][];
  fieldPhoto: Photo;
}) {
  return (
    <m.div
      className="grid gap-4 md:grid-cols-6 lg:gap-5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ show: { transition: { staggerChildren: 0.09 } } }}
    >
      <Tile
        className="bg-ink text-paper md:col-span-4"
        icon={<Zap className="size-5" aria-hidden />}
        title="ציונים מושלמים מגוגל"
        text="כל אתר עובר את הבדיקה של Google Lighthouse — מהירות, נגישות, קוד נקי וקידום בגוגל. אלה הציונים האמיתיים של האתרים שבנינו."
        dark
      >
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {scores.map((s, i) => (
            <ScoreRing key={s.label} {...s} delay={i * 0.15} />
          ))}
        </div>
        <p className="mt-6 text-xs text-paper/40">{scoreNote}</p>
      </Tile>

      <Tile
        className="bg-paper-2 md:col-span-2"
        icon={<Smartphone className="size-5" aria-hidden />}
        title="נבנה קודם לנייד"
        text="רוב הגולשים מגיעים מהטלפון. אצלנו הנייד הוא לא מחשבה שנייה."
      >
        <PhoneDemo />
      </Tile>

      <Tile
        className="bg-paper-2 md:col-span-2"
        icon={<Search className="size-5" aria-hidden />}
        title="מוכן לגוגל מהיום הראשון"
        text="כותרות, תיאורים, Schema ומפת אתר בכל עמוד."
      >
        <SearchDemo />
      </Tile>

      <Tile
        className="bg-paper-2 md:col-span-2"
        icon={<WhatsAppIcon className="size-5" />}
        title="פניות ישר לוואטסאפ"
        text="כפתורי וואטסאפ וחיוג בכל עמוד, וטפסים שמגיעים אליכם מיד."
      >
        <ChatDemo />
      </Tile>

      <Tile
        className="bg-paper-2 md:col-span-2"
        icon={<Palette className="size-5" aria-hidden />}
        title="עיצוב אישי. אפס תבניות."
        text="כל אתר מקבל שפה עיצובית משלו — צבעים, פונטים ותנועה."
      >
        <PaletteDemo palettes={palettes} />
      </Tile>

      <Tile
        className="overflow-hidden bg-yellow md:col-span-4"
        icon={<QrCode className="size-5" aria-hidden />}
        title="היתרון שרק לנו יש: האתר מחובר לפרסום בשטח"
        text="אנחנו גם מפיצים את העלונים, תלי הדלת והמודעות. אז אותה שפה, אותו מסר וקוד QR שמוביל ישר לאתר — וכל הפניות מגיעות למקום אחד."
      >
        <FieldDemo photo={fieldPhoto} />
      </Tile>

      <Tile
        className="bg-paper-2 md:col-span-2"
        icon={<Accessibility className="size-5" aria-hidden />}
        title="נגיש לכולם"
        text="ניווט במקלדת, ניגודיות, טקסט חלופי ותפריט נגישות."
      >
        <A11yDemo />
      </Tile>
    </m.div>
  );
}

function Tile({
  className,
  icon,
  title,
  text,
  children,
  dark,
}: {
  className?: string;
  icon: ReactNode;
  title: string;
  text: string;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <m.article
      variants={tile}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn("relative flex flex-col rounded-[1.75rem] p-6 sm:p-8", className)}
    >
      <span className={cn("grid size-10 place-items-center rounded-full", dark ? "bg-paper/10 text-yellow" : "bg-ink text-paper")}>{icon}</span>
      <h3 className="mt-5 text-2xl leading-tight font-extrabold sm:text-[1.7rem]">{title}</h3>
      <p className={cn("mt-2 max-w-xl leading-relaxed", dark ? "text-paper/65" : "text-ink-3/80")}>{text}</p>
      <div className="mt-auto">{children}</div>
    </m.article>
  );
}

/* ---------- Lighthouse rings ---------- */

function ScoreRing({ label, value, delay }: Score & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const lessMotion = usePrefersLessMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || lessMotion) return;
    let frame = 0;
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - start) / 1400));
      setShown(Math.round(value * (1 - (1 - t) ** 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, lessMotion, value, delay]);

  const color = value >= 90 ? "var(--color-green)" : value >= 50 ? "var(--color-yellow)" : "var(--color-magenta)";
  return (
    <div ref={ref} className="flex flex-col items-center gap-3 text-center">
      <div className="relative size-24 sm:size-28">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="7" className="text-paper/10" />
          <m.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: value / 100 } : undefined}
            transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-3xl font-black tabular-nums sm:text-4xl" style={{ color }}>
          {shown}
        </span>
      </div>
      <span className="text-sm font-semibold text-paper/80">{label}</span>
    </div>
  );
}

/* ---------- Phone: blocks stacking into a page ---------- */

function PhoneDemo() {
  const blocks = [
    "h-10 bg-ink",
    "h-4 w-3/4 bg-ink/25",
    "h-4 w-1/2 bg-ink/15",
    "h-16 bg-yellow",
    "h-8 bg-magenta/70",
    "h-8 bg-cyan/70",
  ];
  return (
    <div aria-hidden className="mt-6 flex justify-center">
      <div className="w-32 rounded-[1.4rem] bg-ink p-1.5">
        <m.div
          className="flex h-56 flex-col gap-2 overflow-hidden rounded-[1.1rem] bg-white p-2.5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.8 }}
          variants={{ show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }}
        >
          {blocks.map((b, i) => (
            <m.span
              key={i}
              className={cn("block shrink-0 rounded-md", b.includes("w-") ? "" : "w-full", b)}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 18 } },
              }}
            />
          ))}
        </m.div>
      </div>
    </div>
  );
}

/* ---------- Search: a query typing in, results appearing ---------- */

const QUERY = "פרסום במגזר החרדי";

function SearchDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.7 });
  const lessMotion = usePrefersLessMotion();
  const [typed, setTyped] = useState(QUERY.length);

  useEffect(() => {
    if (!inView || lessMotion) return;
    let i = -1;
    const id = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= QUERY.length) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, [inView, lessMotion]);

  const done = typed >= QUERY.length;
  return (
    <div ref={ref} aria-hidden className="mt-6 space-y-3">
      <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm">
        <Search className="size-4 text-muted-2" />
        <span className="text-sm">
          {QUERY.slice(0, typed)}
          <span className="ms-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-ink" />
        </span>
      </div>
      <AnimatePresence>
        {done && (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="rounded-2xl bg-white p-4 shadow-sm"
          >
            <p dir="ltr" className="text-end text-xs text-muted">
              99pirsum.com › services
            </p>
            <p className="mt-1 font-display font-bold text-cyan-ink">פרסום והפצה למגזר החרדי והדתי | 99 פרסום ומדיה</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">הפצת עלונים בתיבות דואר, הדבקת מודעות, תלי דלת ועלונים בבתי כנסת…</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- WhatsApp: a lead coming in ---------- */

function ChatDemo() {
  const bubble: Variants = {
    hidden: { opacity: 0, y: 14, scale: 0.85 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
  };
  return (
    <m.div
      aria-hidden
      className="mt-6 space-y-2 rounded-2xl bg-[#e9e2d6] p-3 text-sm"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.7 }}
      variants={{ show: { transition: { staggerChildren: 0.7, delayChildren: 0.3 } } }}
    >
      <m.div variants={bubble} className="flex items-center gap-2 text-xs text-muted">
        <span className="grid size-6 place-items-center rounded-full bg-whatsapp text-ink">
          <WhatsAppIcon className="size-3.5" />
        </span>
        פנייה חדשה מהאתר
      </m.div>
      <m.p variants={bubble} className="ms-auto w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
        שלום, הגעתי מהאתר ואשמח להצעת מחיר 🙂
      </m.p>
      <m.p variants={bubble} className="w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 shadow-sm">
        היי! בשמחה, איך קוראים לך?
      </m.p>
    </m.div>
  );
}

/* ---------- Palette: cycling through our clients' brand colours ---------- */

function PaletteDemo({ palettes }: { palettes: string[][] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const lessMotion = usePrefersLessMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView || lessMotion) return;
    const id = setInterval(() => setI((n) => (n + 1) % palettes.length), 1800);
    return () => clearInterval(id);
  }, [inView, lessMotion, palettes.length]);

  const [ink, paper, a, b] = palettes[i];
  return (
    <div ref={ref} aria-hidden className="mt-6">
      <m.div className="overflow-hidden rounded-2xl p-4 shadow-sm" animate={{ backgroundColor: paper }} transition={{ duration: 0.6 }}>
        <m.span className="block h-3 w-1/3 rounded-full" animate={{ backgroundColor: ink }} transition={{ duration: 0.6 }} />
        <m.span className="mt-3 block h-7 w-4/5 rounded-lg" animate={{ backgroundColor: ink }} transition={{ duration: 0.6 }} />
        <m.span className="mt-2 block h-2.5 w-3/5 rounded-full opacity-40" animate={{ backgroundColor: ink }} transition={{ duration: 0.6 }} />
        <div className="mt-4 flex gap-2">
          <m.span className="h-8 w-20 rounded-full" animate={{ backgroundColor: a }} transition={{ duration: 0.6 }} />
          <m.span className="h-8 w-14 rounded-full" animate={{ backgroundColor: b }} transition={{ duration: 0.6, delay: 0.08 }} />
        </div>
      </m.div>
      <div className="mt-3 flex justify-center gap-1.5">
        {palettes.map((p, n) => (
          <span key={n} className={cn("h-1.5 rounded-full transition-all duration-500", n === i ? "w-6 bg-ink" : "w-1.5 bg-ink/20")} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Field: door hanger → QR → website ---------- */

function FieldDemo({ photo }: { photo: Photo }) {
  return (
    <div aria-hidden className="mt-8 flex items-center gap-4 sm:gap-6">
      <m.div
        className="relative w-[38%] shrink-0 rotate-[-4deg] overflow-hidden rounded-xl bg-white p-1.5 shadow-lg"
        initial={{ opacity: 0, x: 40, rotate: 4 }}
        whileInView={{ opacity: 1, x: 0, rotate: -4 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: "spring", stiffness: 100, damping: 16 }}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={photo.src} alt="" fill sizes="(min-width: 768px) 22vw, 38vw" className="object-cover" />
        </div>
      </m.div>
      <div className="relative flex flex-1 items-center">
        <svg viewBox="0 0 200 40" className="h-10 w-full text-ink" fill="none">
          <m.path
            d="M195 20 C 150 0, 110 40, 60 20 S 15 20, 5 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="1 7"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
          />
        </svg>
        <m.span
          className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-ink text-yellow shadow-xl"
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.8 }}
        >
          <QrCode className="size-7" />
        </m.span>
      </div>
      <m.div
        className="w-[24%] shrink-0 rounded-[1.1rem] bg-ink p-1"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: "spring", stiffness: 120, damping: 16, delay: 1.3 }}
      >
        <div className="flex aspect-[9/16] flex-col gap-1.5 rounded-[0.85rem] bg-paper p-2">
          <span className="h-5 rounded bg-ink" />
          <span className="h-2 w-3/4 rounded-full bg-ink/25" />
          <span className="h-10 rounded bg-yellow" />
          <span className="mt-auto flex h-6 items-center justify-center rounded-full bg-whatsapp">
            <WhatsAppIcon className="size-3 text-ink" />
          </span>
        </div>
      </m.div>
    </div>
  );
}

/* ---------- Accessibility: text size toggling ---------- */

function A11yDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.7 });
  const lessMotion = usePrefersLessMotion();
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!inView || lessMotion) return;
    const id = setInterval(() => setOn((v) => !v), 2000);
    return () => clearInterval(id);
  }, [inView, lessMotion]);

  return (
    <div ref={ref} aria-hidden className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">הגדלת טקסט</span>
        <span dir="ltr" className={cn("flex h-6 w-11 items-center rounded-full p-0.5 transition-colors duration-300", on ? "bg-green" : "bg-ink/15")}>
          <m.span animate={{ x: on ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="size-5 rounded-full bg-white shadow" />
        </span>
      </div>
      <m.p animate={{ fontSize: on ? "1.35rem" : "0.95rem" }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="mt-3 font-display leading-snug font-bold">
        טקסט קריא לכולם
      </m.p>
    </div>
  );
}
