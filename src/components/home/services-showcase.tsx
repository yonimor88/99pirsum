"use client";

import { ArrowUpLeft } from "lucide-react";
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
                    <span
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]",
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="overflow-hidden text-muted">
                        <span className="block pt-1.5 pe-6">{s.blurb}</span>
                      </span>
                    </span>
                  </span>
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-full transition-all duration-500",
                      isActive ? cn(accentBg[s.accent], "scale-100 text-ink") : "scale-75 bg-transparent text-ink/30",
                    )}
                  >
                    <ArrowUpLeft className="size-5" aria-hidden />
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-0 -right-4 bottom-0 w-1 rounded-full transition-transform duration-500",
                      isActive ? "scale-y-100" : "scale-y-0",
                    )}
                    style={{ backgroundColor: accentVar[s.accent] }}
                  />
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="relative">
          <div className="sticky top-28">
            <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2rem] bg-ink">
              {/* All previews stacked; the active one fades in */}
              {services.map((s, i) => (
                <Image
                  key={s.slug}
                  src={s.image.src}
                  alt={i === active ? s.image.alt : ""}
                  aria-hidden={i !== active}
                  fill
                  sizes="40vw"
                  className={cn(
                    "object-cover transition-[opacity,scale] duration-700 ease-[var(--ease-out-expo)]",
                    i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <span
                key={`${current.slug}-badge`}
                className={cn(
                  "pop-in absolute top-6 right-6 grid size-16 -rotate-6 place-items-center rounded-2xl text-ink",
                  accentBg[current.accent],
                )}
              >
                <ServiceGlyph icon={current.icon} className="size-7" />
              </span>
              <div key={current.slug} className="enter-rise absolute inset-x-0 bottom-0 p-8 text-paper">
                <p className="font-display text-3xl font-bold">{current.title}</p>
                <p className="mt-3 max-w-md leading-relaxed text-paper/80">{current.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: cards */}
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
        {services.map((s) => (
          <li key={s.slug} className="reveal">
            <Link href={`/services/${s.slug}`} className="group block overflow-hidden rounded-3xl bg-paper-2">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
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
          </li>
        ))}
      </ul>
    </>
  );
}
