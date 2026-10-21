"use client";

import { FileText, Quote } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { Lightbox } from "@/components/ui/lightbox";
import { accentBg } from "@/content/service-nav";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Testimonials shown as letters on paper; the original scan opens in a lightbox. */
export function TestimonialLetters({ items, full = false }: { items: Testimonial[]; full?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const letters = items.map((t) => ({ src: t.letter, alt: `מכתב ההמלצה של ${t.org}`, caption: `${t.author} — ${t.org}` }));

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
        {items.map((t, i) => (
          <motion.article
            key={t.id}
            className="relative flex flex-col rounded-[1.75rem] bg-white p-7 shadow-[0_30px_60px_-36px_rgba(20,20,20,0.45)] sm:p-9"
            initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2.5 : -2.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 0.8 : -0.8 }}
            whileHover={{ rotate: 0, y: -4 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.1 }}
          >
            <span className={cn("absolute inset-x-9 top-0 h-1.5 rounded-b-full", accentBg[t.accent])} aria-hidden />
            <div className="flex items-start justify-between gap-6">
              <div className="relative h-12 w-32">
                <Image src={t.logo} alt={t.org} fill sizes="128px" className="object-contain object-right" />
              </div>
              <Quote className="size-10 shrink-0 -scale-x-100 text-ink/10" aria-hidden />
            </div>

            <blockquote className="mt-7 flex-1">
              <p className="font-serif text-2xl leading-snug font-medium text-ink sm:text-[1.7rem]">
                ״{t.highlight}״
              </p>
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
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-display text-sm font-semibold transition hover:border-ink hover:bg-ink hover:text-paper"
              >
                <FileText className="size-4" aria-hidden />
                למכתב המקורי
              </button>
            </footer>
          </motion.article>
        ))}
      </div>
      <Lightbox items={letters} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </>
  );
}
