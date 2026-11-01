"use client";

import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { cn } from "@/lib/cn";

const steps = [
  { title: "שיחת היכרות", text: "מבינים את העסק, את הלקוחות שלכם ומה האתר צריך להשיג. בגובה העיניים, בלי ז׳רגון.", dot: "bg-yellow" },
  { title: "קונספט ועיצוב", text: "שפה עיצובית שנבנית סביב העסק שלכם — צבעים, טיפוגרפיה ותנועה. לא תבנית מוכנה.", dot: "bg-magenta" },
  { title: "פיתוח ותוכן", text: "אתר מהיר, נגיש ומותאם לנייד, עם תוכן שמוכר וכפתורי וואטסאפ וחיוג בכל מקום.", dot: "bg-cyan" },
  { title: "השקה וחיבור לשטח", text: "עולים לאוויר, מחברים לגוגל — ואם תרצו, גם לקמפיין עלונים ומודעות עם קוד QR לאתר.", dot: "bg-green" },
];

export function ProcessSteps() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <ol ref={ref} className="relative grid gap-10 md:grid-cols-4 md:gap-6">
      {/* the track and its drawn fill */}
      <span aria-hidden className="absolute top-7 right-7 left-7 hidden h-0.5 bg-ink/10 md:block" />
      <m.span aria-hidden style={{ scaleX: line }} className="absolute top-7 right-7 left-7 hidden h-0.5 origin-right bg-ink md:block" />
      <span aria-hidden className="absolute top-7 right-7 bottom-7 w-0.5 bg-ink/10 md:hidden" />
      <m.span aria-hidden style={{ scaleY: line }} className="absolute top-7 right-7 bottom-7 w-0.5 origin-top bg-ink md:hidden" />

      {steps.map((s, i) => (
        <m.li
          key={s.title}
          className="relative flex gap-5 md:block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 110, damping: 18, delay: i * 0.12 }}
        >
          <m.span
            className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper font-display text-lg font-black tabular-nums"
            whileHover={{ scale: 1.12, rotate: -8 }}
          >
            {String(i + 1).padStart(2, "0")}
            <span className={cn("absolute -top-1 -left-1 size-4 rounded-full ring-4 ring-paper", s.dot)} />
          </m.span>
          <div className="md:mt-6">
            <h3 className="text-2xl font-extrabold">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
          </div>
        </m.li>
      ))}
    </ol>
  );
}
