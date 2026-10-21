import { ArrowUpLeft } from "lucide-react";
import type { CSSProperties } from "react";

import { Dots } from "@/components/brand/ornaments";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Misregistered } from "@/components/ui/misregistered";
import { Mark } from "@/components/ui/section-heading";
import { totals } from "@/content/cities";
import { site, whatsappLink } from "@/content/site";
import { HeroVisual } from "./hero-visual";

const stats = [
  { value: totals.mailboxes, label: "תיבות דואר" },
  { value: totals.buildings, label: "בניינים" },
  { value: totals.boards, label: "לוחות מודעות" },
];

const delay = (s: number) => ({ "--intro-delay": `${s}s` }) as CSSProperties;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-24 sm:pt-32 lg:pt-36 lg:pb-32">
      <div aria-hidden className="halftone halftone-fade absolute -top-32 -left-40 size-[42rem] text-ink/12" />
      <div aria-hidden className="halftone halftone-fade absolute -right-32 bottom-0 size-[26rem] text-magenta/25" />

      <div className="container-page relative grid items-center gap-16 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
        {/* Copy */}
        <div className="relative z-10">
          <div className="intro-rise inline-flex items-center gap-2.5 rounded-full border border-ink/12 bg-paper/80 px-3.5 py-1.5 text-sm font-medium text-ink/80 backdrop-blur">
            <Dots size="size-1.5" />
            <h1 className="font-medium">פרסום והפצה למגזר החרדי והדתי</h1>
            <span aria-hidden>·</span>
            <span>מאז {site.foundingYear}</span>
          </div>

          <p className="mt-7 font-display text-[3.4rem] leading-[0.98] font-black tracking-tight sm:text-7xl lg:text-[5.6rem] xl:text-[6.2rem]">
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
          </p>

          <p className="intro-rise mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={delay(0.35)}>
            99 פרסום ומדיה מתכננת, מעצבת, מדפיסה ומפיצה את הפרסום שלכם — הפצת עלונים בתיבות הדואר, הדבקת מודעות
            על לוחות המודעות, תלי דלת ועלונים בבתי הכנסת. גורם אחד, מהרעיון ועד התמונה האחרונה מהשטח.
          </p>

          <div className="intro-rise mt-9 flex flex-wrap gap-3" style={delay(0.45)}>
            <ButtonLink href="/contact" size="lg">
              לקבלת הצעת מחיר
              <ArrowUpLeft
                className="size-5 transition-transform group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5"
                aria-hidden
              />
            </ButtonLink>
            <ButtonAnchor href={whatsappLink()} target="_blank" rel="noopener noreferrer" variant="outline" size="lg">
              <WhatsAppIcon className="size-5 text-green-ink group-hover/btn:text-paper" />
              דברו איתנו בוואטסאפ
            </ButtonAnchor>
          </div>

          <dl
            className="intro-rise mt-12 grid max-w-xl grid-cols-3 divide-x divide-x-reverse divide-ink/12 border-y border-ink/12"
            style={delay(0.55)}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col px-4 py-4 first:ps-0">
                <dt className="order-2 mt-0.5 text-sm text-muted">{s.label}</dt>
                <dd className="order-1 font-display text-2xl font-extrabold tabular-nums sm:text-3xl">
                  <Counter value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
