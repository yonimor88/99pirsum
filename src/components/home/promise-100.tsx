import { Camera, Clock, RefreshCw, ShieldCheck, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";

import { ColorBar, RegMark } from "@/components/brand/ornaments";
import { cn } from "@/lib/cn";

const promises: { icon: LucideIcon; title: string; text: string; at: number; color: string }[] = [
  { icon: Camera, title: "תמונות מהשטח", text: "אחרי כל הדבקה נשלחות אליכם תמונות ישר לוואטסאפ.", at: 22, color: "bg-yellow" },
  { icon: ShieldCheck, title: "פיקוח מדגמי", text: "בסיום כל הפצה אנחנו בודקים בשטח שהחומר הגיע ליעדו.", at: 42, color: "bg-green" },
  { icon: RefreshCw, title: "הדבקה חוזרת", text: "מודעה נקרעה או הושחתה? אנחנו יוצאים לתקן.", at: 62, color: "bg-cyan" },
  {
    icon: Clock,
    title: "זמינות אמיתית",
    text: "״בשעות לא שעות — גם בשעות הקטנות של הלילה״, כפי שכתבו לנו לקוחות.",
    at: 82,
    color: "bg-magenta",
  },
];

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

/**
 * The number counts 0 → 100 and the promises light up as the section scrolls.
 * Pure CSS (view timeline + an animated integer custom property, see globals.css);
 * without support it shows a static 100%.
 */
export function Promise100() {
  return (
    <section className="promise-section relative bg-ink" aria-label="תמיד שואפים ל-100%">
      <div className="promise-sticky flex flex-col overflow-clip">
        <div aria-hidden className="halftone absolute inset-0 text-paper/[0.06]" />
        <div className="container-page relative grid flex-1 items-center gap-10 py-20 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative">
            <p className="sr-only">תמיד שואפים ל-100%</p>
            <div aria-hidden className="flex items-start font-display leading-[0.8] font-black text-paper" dir="ltr">
              <span className="promise-number text-[34vw] tabular-nums sm:text-[28vw] lg:text-[17rem] xl:text-[20rem]" />
              <span className="mt-[0.12em] text-[14vw] text-yellow sm:text-[11vw] lg:text-[7rem] xl:text-[8rem]">%</span>
            </div>
            <div className="promise-done absolute -top-4 right-0 flex gap-2 lg:top-0" aria-hidden>
              <span className="size-5 rounded-full bg-yellow" />
              <span className="size-5 rounded-full bg-green" />
              <span className="size-5 rounded-full bg-cyan" />
              <span className="size-5 rounded-full bg-magenta" />
            </div>
            <div className="mt-8 hidden max-w-xl lg:block">
              <Copy />
            </div>
          </div>

          <div>
            <div className="mb-8 lg:hidden">
              <Copy />
            </div>
            <ul className="space-y-3">
              {promises.map((p) => {
                const Icon = p.icon;
                return (
                  <li
                    key={p.title}
                    className="promise-item flex items-start gap-4 rounded-3xl border border-paper/10 bg-paper/[0.04] p-5 text-paper"
                    style={{ "--at": `${p.at}%` } as CSSProperties}
                  >
                    <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-paper/10">
                      <Icon className="size-6" aria-hidden />
                      <span className={cn("promise-dot absolute -top-1 -left-1 size-3.5 rounded-full ring-4 ring-ink", p.color)} aria-hidden />
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
        </div>

        <div className="relative h-1.5 w-full overflow-clip bg-paper/10" aria-hidden>
          <div className="promise-bar absolute inset-0">
            <ColorBar className="h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
