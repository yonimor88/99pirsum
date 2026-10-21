import { Quote } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { accentBg } from "@/content/service-nav";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/cn";
import { LetterViewer } from "./letter-viewer";

/** Testimonials shown as letters on paper; the original scan opens in a lightbox. */
export function TestimonialLetters({ items, full = false }: { items: Testimonial[]; full?: boolean }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
      {items.map((t, i) => (
        <article
          key={t.id}
          className="reveal relative flex rotate-(--rot) flex-col rounded-[1.75rem] bg-white p-7 shadow-[0_30px_60px_-36px_rgba(20,20,20,0.45)] transition-[rotate] duration-500 hover:rotate-0 sm:p-9"
          style={{ "--rot": `${i % 2 ? 0.8 : -0.8}deg`, "--reveal-delay": (i % 2) * 0.15 } as CSSProperties}
        >
          <span className={cn("absolute inset-x-9 top-0 h-1.5 rounded-b-full", accentBg[t.accent])} aria-hidden />
          <div className="flex items-start justify-between gap-6">
            <Image
              src={t.logo}
              alt={t.org}
              width={128}
              height={Math.round((128 * t.logo.height) / t.logo.width)}
              className="h-12 w-auto max-w-32 object-contain object-right"
            />
            <Quote className="size-10 shrink-0 -scale-x-100 text-ink/10" aria-hidden />
          </div>

          <blockquote className="mt-7 flex-1">
            <p className="font-serif text-2xl leading-snug font-medium text-ink sm:text-[1.7rem]">״{t.highlight}״</p>
            {full && (
              <div className="mt-6 space-y-3 leading-relaxed text-muted">
                {t.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            )}
          </blockquote>

          <footer className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-dashed border-ink/15 pt-5">
            <div>
              <p className="font-display text-lg font-bold">{t.author}</p>
              <p className="text-sm text-muted">
                {[t.role, t.org].filter(Boolean).join(" · ")}
                {t.date && <span> · {t.date}</span>}
              </p>
            </div>
            <LetterViewer letter={t.letter} alt={`מכתב ההמלצה של ${t.org}`} caption={`${t.author} — ${t.org}`} />
          </footer>
        </article>
      ))}
    </div>
  );
}
