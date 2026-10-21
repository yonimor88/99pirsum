import { ArrowUpLeft, ChevronLeft, Phone, Plus } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Dots, RegMark } from "@/components/brand/ornaments";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Misregistered } from "@/components/ui/misregistered";
import { Reveal } from "@/components/ui/reveal";
import { primaryPhone, whatsappLink } from "@/content/site";
import { cn } from "@/lib/cn";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, tone = "ink" }: { items: Crumb[]; tone?: "ink" | "paper" }) {
  const all = [{ name: "דף הבית", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="פירורי לחם" className={cn("text-sm", tone === "paper" ? "text-paper/60" : "text-muted")}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronLeft className="size-3.5 opacity-60" aria-hidden />}
              {i === all.length - 1 ? (
                <span aria-current="page" className={tone === "paper" ? "text-paper" : "text-ink"}>
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="hover:underline">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}

/** Hero for inner pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  aside,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20", className)}>
      <div aria-hidden className="halftone halftone-fade absolute -top-24 -left-24 size-[28rem] text-ink/12" />
      <div className="container-page relative">
        <Breadcrumbs items={crumbs} />
        <div className={cn("mt-8 grid items-center gap-12", aside && "lg:grid-cols-[1.1fr_1fr] lg:gap-16")}>
          <div>
            <Reveal>
              <p className="eyebrow">
                <RegMark className="size-4" />
                {eyebrow}
              </p>
            </Reveal>
            <h1 className="mt-4 text-[2.7rem] leading-[1.02] font-black tracking-tight sm:text-6xl lg:text-7xl">
              <Misregistered>{title}</Misregistered>
            </h1>
            {description && (
              <Reveal delay={0.1}>
                <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{description}</div>
              </Reveal>
            )}
            {children && (
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3">{children}</div>
              </Reveal>
            )}
          </div>
          {aside && <div className="relative">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "יש לכם מסר? אנחנו נביא אותו לכל בית.",
  text = "ספרו לנו מה אתם רוצים לפרסם, איפה ולמי — ונחזור אליכם עם הצעה מסודרת.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-page py-16 lg:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-paper sm:px-12 lg:px-16 lg:py-20">
          <div aria-hidden className="halftone absolute inset-y-0 left-0 w-1/2 text-paper/10 [mask-image:linear-gradient(to_left,transparent,black)]" />
          <div aria-hidden className="absolute -bottom-16 -left-10 flex gap-3 opacity-90">
            <span className="size-24 rounded-full bg-yellow" />
            <span className="mt-10 size-24 rounded-full bg-green" />
            <span className="size-24 rounded-full bg-cyan" />
            <span className="mt-10 size-24 rounded-full bg-magenta" />
          </div>
          <div className="relative max-w-2xl">
            <Dots />
            <h2 className="mt-5 text-4xl leading-[1.08] font-black sm:text-5xl lg:text-6xl">{title}</h2>
            <p className="mt-5 text-lg text-paper/70 sm:text-xl">{text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="yellow" size="lg">
                לקבלת הצעת מחיר
                <ArrowUpLeft className="size-5" aria-hidden />
              </ButtonLink>
              <ButtonAnchor href={whatsappLink()} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg">
                <WhatsAppIcon className="size-5" />
                וואטסאפ
              </ButtonAnchor>
              <ButtonAnchor href={primaryPhone.href} variant="outline-light" size="lg">
                <Phone className="size-5" aria-hidden />
                <span dir="ltr" className="tabular-nums">
                  {primaryPhone.display}
                </span>
              </ButtonAnchor>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Faq({ items, title = "שאלות נפוצות" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
      <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {items.map((f) => (
          <details key={f.q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-semibold sm:text-xl">
              {f.q}
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/15 transition-all duration-300 group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-paper">
                <Plus className="size-4" aria-hidden />
              </span>
            </summary>
            <p className="max-w-3xl pb-6 text-lg leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqJsonLd(items)} />
    </div>
  );
}
