"use client";

import { Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import type { Photo } from "@/content/media";
import { cn } from "@/lib/cn";
import { Lightbox } from "./lightbox";

/** Masonry of photos that open in a lightbox. */
export function PhotoGrid({ photos, className }: { photos: Photo[]; className?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <div className={cn("columns-2 gap-3 sm:gap-4 lg:columns-3", className)}>
        {photos.map((p, i) => (
          <button
            key={p.src.src}
            type="button"
            onClick={() => setIndex(i)}
            className="reveal group relative mb-3 block w-full overflow-hidden rounded-xl bg-paper-2 sm:mb-4"
            aria-label={`הגדלת תמונה: ${p.alt}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 30vw, 50vw"
              className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
            <span className="absolute bottom-3 left-3 grid size-9 place-items-center rounded-full bg-paper/90 text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand className="size-4" aria-hidden />
            </span>
          </button>
        ))}
      </div>
      <Lightbox items={photos} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </>
  );
}
