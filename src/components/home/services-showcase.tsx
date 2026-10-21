"use client";

import { ArrowUpLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ServiceGlyph } from "@/components/ui/icons";
import type { Photo } from "@/content/media";
import { accentBg, accentVar, type Accent, type ServiceIcon } from "@/content/service-nav";
import { cn } from "@/lib/cn";

export type ShowcaseService = {
  slug: string;
  title: string;
  blurb: string;
  summary: string;
  accent: Accent;
  icon: ServiceIcon;
  image: Photo;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServicesShowcase({ services }: { services: ShowcaseService[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <>
      {/* Desktop: hover list + sticky preview */}
      <div className="mt-14 hidden gap-12 lg:grid lg:grid-cols-[1.15fr_1fr]">
        <ol className="border-t border-ink/12">
          {services.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.slug} className="border-b border-ink/12">
                <Link
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative flex items-center gap-6 py-5"
                >
                  <span
                    className={cn(
                      "w-8 font-display text-sm font-semibold tabular-nums transition-colors",
                      isActive ? "text-ink" : "text-muted-2",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block font-display text-[1.9rem] leading-tight font-bold transition-all duration-500",
                        isActive ? "translate-x-[-0.4rem] text-ink" : "text-ink/45",
                      )}
                    >
                      {s.title}
                    </span>
                    <motion.span
                      className="block overflow-hidden text-muted"
                      initial={false}
                      animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <span className="block pt-1.5 pe-6">{s.blurb}</span>
                    </motion.span>
                  </span>
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-full transition-all duration-500",
                      isActive ? cn(accentBg[s.accent], "scale-100 text-ink") : "scale-75 bg-transparent text-ink/30",
                    )}
                  >
                    <ArrowUpLeft className="size-5" aria-hidden />
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="service-rail"
                      className="absolute top-0 -right-4 bottom-0 w-1 rounded-full"
                      style={{ backgroundColor: accentVar[s.accent] }}
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="relative">
          <div className="sticky top-28">
            <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2rem] bg-ink">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <Image
                    src={current.image.src}
                    alt={current.image.alt}
                    fill
                    sizes="40vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <motion.div
                key={`${current.slug}-badge`}
                className={cn("absolute top-6 right-6 grid size-16 place-items-center rounded-2xl text-ink", accentBg[current.accent])}
                initial={{ rotate: -20, scale: 0.6, opacity: 0 }}
                animate={{ rotate: -6, scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
              >
                <ServiceGlyph icon={current.icon} className="size-7" />
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 p-8 text-paper">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <p className="font-display text-3xl font-bold">{current.title}</p>
                    <p className="mt-3 max-w-md leading-relaxed text-paper/80">{current.summary}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: cards */}
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
        {services.map((s, i) => (
          <motion.li
            key={s.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.06 }}
          >
            <Link href={`/services/${s.slug}`} className="group block overflow-hidden rounded-3xl bg-paper-2">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className={cn("absolute top-4 right-4 grid size-11 place-items-center rounded-xl text-ink", accentBg[s.accent])}>
                  <ServiceGlyph icon={s.icon} className="size-5" />
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <p className="font-display text-xl font-bold">{s.title}</p>
                  <p className="mt-1 text-muted">{s.blurb}</p>
                </div>
                <ArrowUpLeft className="mt-1 size-5 shrink-0" aria-hidden />
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
