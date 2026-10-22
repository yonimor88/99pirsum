"use client";

import { ArrowUpLeft, Building, Mailbox, Newspaper } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";

import { Counter } from "@/components/ui/counter";
import { cities, moreCities, type City } from "@/content/cities";
import { cn } from "@/lib/cn";

const PER_DOT = 500;
const maxMailboxes = Math.max(...cities.map((c) => c.mailboxes));
const DOT_COLORS = ["bg-yellow", "bg-green", "bg-cyan", "bg-magenta"];

export function CoverageExplorer({ tone = "paper" }: { tone?: "paper" | "ink" }) {
  const [active, setActive] = useState(0);
  const city = cities[active];
  const baseId = useId();
  const dark = tone === "ink";

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr] lg:gap-10">
      <div role="tablist" aria-label="בחירת עיר" aria-orientation="vertical" className="flex flex-col gap-2">
        {cities.map((c, i) => {
          const selected = i === active;
          return (
            <button
              key={c.slug}
              id={`${baseId}-tab-${c.slug}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  const next = (i + (e.key === "ArrowDown" ? 1 : -1) + cities.length) % cities.length;
                  setActive(next);
                  document.getElementById(`${baseId}-tab-${cities[next].slug}`)?.focus();
                }
              }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border px-5 py-4 text-start transition-colors",
                selected
                  ? dark
                    ? "border-paper bg-paper text-ink"
                    : "border-ink bg-ink text-paper"
                  : dark
                    ? "border-paper/15 text-paper hover:border-paper/40"
                    : "border-ink/12 bg-paper hover:border-ink/40",
              )}
            >
              <span className="relative z-10 flex items-baseline justify-between gap-4">
                <span className="font-display text-xl font-bold">{c.name}</span>
                <span className={cn("text-sm tabular-nums", selected ? "opacity-70" : "opacity-60")}>
                  {c.mailboxes.toLocaleString("he-IL")} תיבות
                </span>
              </span>
              <span className={cn("relative z-10 mt-3 block h-1.5 overflow-hidden rounded-full", selected ? "bg-current/15" : "bg-current/10")}>
                <span
                  className={cn("grow-x-reveal absolute inset-y-0 right-0 rounded-full", selected ? "bg-yellow" : "bg-current/40")}
                  style={{ width: `${(c.mailboxes / maxMailboxes) * 100}%` }}
                />
              </span>
            </button>
          );
        })}
        <p className={cn("mt-2 px-1 text-sm", dark ? "text-paper/60" : "text-muted")}>
          ועוד: {moreCities.join(", ")} וכל מקום שיש בו ריכוז חרדי ודתי.
        </p>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${city.slug}`}
        className={cn(
          "relative overflow-hidden rounded-[2rem] p-6 sm:p-10",
          dark ? "bg-paper text-ink" : "bg-ink text-paper",
        )}
      >
        <div aria-hidden className={cn("halftone absolute inset-0", dark ? "text-ink/[0.05]" : "text-paper/[0.05]")} />
        <div key={city.slug} className="enter-rise relative">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={cn("font-display text-sm font-semibold", dark ? "text-muted" : "text-paper/55")}>
                  {city.note ?? "אזור הפצה פעיל"}
                </p>
                <h3 className="mt-1 text-5xl font-black sm:text-6xl">{city.name}</h3>
              </div>
              <Link
                href={`/areas/${city.slug}`}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-semibold transition",
                  dark ? "bg-ink text-paper hover:bg-ink-3" : "bg-paper text-ink hover:bg-yellow",
                )}
              >
                פרסום {city.inName}
                <ArrowUpLeft className="size-4" aria-hidden />
              </Link>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              <Stat icon={Building} label="בניינים" value={city.buildings} dark={dark} />
              <Stat icon={Mailbox} label="תיבות דואר" value={city.mailboxes} dark={dark} highlight />
              <Stat icon={Newspaper} label="לוחות מודעות" value={city.boards} dark={dark} />
            </dl>

            <DotField city={city} dark={dark} />
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  dark,
  highlight,
}: {
  icon: typeof Building;
  label: string;
  value: number;
  dark: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "@container flex min-w-0 flex-col rounded-2xl p-3 sm:p-5",
        highlight ? "bg-yellow text-ink" : dark ? "bg-paper-2" : "bg-paper/[0.07]",
      )}
    >
      <Icon className="order-1 size-5 opacity-70" aria-hidden />
      <dt className="order-3 mt-1 text-sm opacity-75">{label}</dt>
      <dd className="order-2 mt-3 font-display text-[clamp(1rem,17cqi,2.25rem)] leading-none font-extrabold whitespace-nowrap tabular-nums">
        <Counter value={value} duration={1.2} />
      </dd>
    </div>
  );
}

function DotField({ city, dark }: { city: City; dark: boolean }) {
  const count = Math.round(city.mailboxes / PER_DOT);
  return (
    <div className="mt-8">
      <div className="enter-fade flex flex-wrap gap-2" aria-hidden>
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className={cn("size-3 rounded-full sm:size-3.5", DOT_COLORS[i % 4])} />
        ))}
      </div>
      <p className={cn("mt-4 text-sm", dark ? "text-muted" : "text-paper/55")}>
        כל נקודה = {PER_DOT} תיבות דואר
      </p>
    </div>
  );
}
