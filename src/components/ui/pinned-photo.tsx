import Image from "next/image";
import type { CSSProperties } from "react";

import type { Photo } from "@/content/media";
import { cn } from "@/lib/cn";

/**
 * A photo print taped to the wall. Straightens and lifts on hover.
 * `intro` plays a time-based entrance (for above-the-fold heroes); otherwise the
 * print is revealed as it scrolls into view. Pure CSS — see `.pinned` in globals.css.
 */
export function PinnedPhoto({
  photo,
  rotate = -3,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 30vw, 80vw",
  priority = false,
  intro = false,
  delay = 0,
  tape = "top",
  caption,
  fill = false,
}: {
  photo: Photo;
  rotate?: number;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  intro?: boolean;
  delay?: number;
  tape?: "top" | "corners" | "none";
  caption?: string;
  fill?: boolean;
}) {
  return (
    <figure
      className={cn(
        "pinned relative bg-white p-2 pb-2 shadow-[0_24px_50px_-24px_rgba(20,20,20,0.55)] sm:p-2.5",
        intro ? "pin-intro" : "pin-reveal",
        caption && "pb-10 sm:pb-11",
        className,
      )}
      style={{ "--rot": `${rotate}deg`, "--intro-delay": `${delay}s` } as CSSProperties}
    >
      {tape === "top" && <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" aria-hidden />}
      {tape === "corners" && (
        <>
          <span className="tape -top-2 -right-6 w-16 rotate-[38deg]" aria-hidden />
          <span className="tape -bottom-2 -left-6 w-16 rotate-[38deg]" aria-hidden />
        </>
      )}
      <div className={cn("relative overflow-hidden bg-paper-2", fill && "h-full")}>
        <Image
          src={photo.src}
          alt={photo.alt}
          sizes={sizes}
          placeholder="blur"
          preload={priority}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </div>
      {caption && (
        <figcaption className="absolute inset-x-3 bottom-2.5 truncate font-display text-sm text-muted sm:bottom-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
