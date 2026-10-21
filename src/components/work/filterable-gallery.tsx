"use client";

import { Expand } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Lightbox } from "@/components/ui/lightbox";
import { galleryCategories, type GalleryCategory, type GalleryItem } from "@/content/media";
import { cn } from "@/lib/cn";

export function FilterableGallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const visible = useMemo(() => (filter === "all" ? items : items.filter((i) => i.category === filter)), [filter, items]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((i) => map.set(i.category, (map.get(i.category) ?? 0) + 1));
    return map;
  }, [items]);

  const tabs = [{ id: "all" as const, label: "הכל", count: items.length }, ...galleryCategories.map((c) => ({ ...c, count: counts.get(c.id) ?? 0 }))];

  return (
    <>
      <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div role="group" aria-label="סינון לפי סוג עבודה" className="flex w-max gap-2">
          {tabs.map((t) => {
            const active = filter === t.id;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(t.id)}
                className={cn(
                  "relative rounded-full px-5 py-2.5 font-display font-semibold whitespace-nowrap transition-colors",
                  active ? "text-paper" : "text-ink hover:bg-ink/5",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {t.label}
                  <span className={cn("ms-1.5 text-sm tabular-nums", active ? "text-paper/60" : "text-muted-2")}>{t.count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.ul layout className="mt-10 grid grid-flow-dense auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 md:grid-cols-3 lg:auto-rows-[14rem] lg:grid-cols-4" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => {
            const tall = item.src.height > item.src.width;
            return (
              <motion.li
                key={item.src.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={cn(tall ? "row-span-2" : "")}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block h-full w-full overflow-hidden rounded-2xl bg-paper-2"
                  aria-label={`הגדלת תמונה: ${item.alt}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute right-3 bottom-3 left-12 text-start text-sm font-medium text-paper opacity-0 transition-opacity group-hover:opacity-100">
                    {item.alt}
                  </span>
                  <span className="absolute bottom-3 left-3 grid size-8 place-items-center rounded-full bg-paper text-ink opacity-0 transition-opacity group-hover:opacity-100">
                    <Expand className="size-4" aria-hidden />
                  </span>
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      <Lightbox items={visible} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </>
  );
}
