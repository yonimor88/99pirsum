"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef } from "react";

export type LightboxItem = { src: StaticImageData; alt: string; caption?: string };

/**
 * Full-screen image viewer on the native <dialog> element: the browser handles
 * focus trapping, Escape and the backdrop. Arrow keys move between images.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  const item = index !== null ? items[index] : null;

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={item?.alt}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        // RTL: left arrow moves forward
        if (e.key === "ArrowLeft") go(1);
        if (e.key === "ArrowRight") go(-1);
      }}
    >
      {item && index !== null && (
        <div
          className="flex h-full w-full items-center justify-center p-4 sm:p-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="absolute top-4 left-4 z-10 grid size-12 place-items-center rounded-full bg-paper text-ink transition hover:bg-yellow"
            aria-label="סגירה"
          >
            <X className="size-6" aria-hidden />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute top-1/2 right-3 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink transition hover:bg-yellow sm:right-6"
                aria-label="התמונה הקודמת"
              >
                <ChevronRight className="size-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute top-1/2 left-3 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink transition hover:bg-yellow sm:left-6"
                aria-label="התמונה הבאה"
              >
                <ChevronLeft className="size-6" aria-hidden />
              </button>
            </>
          )}

          <figure key={index} className="enter-rise relative flex max-h-full max-w-6xl flex-col items-center">
            <div className="bg-white p-2 sm:p-3">
              <Image
                src={item.src}
                alt={item.alt}
                placeholder={item.src.blurDataURL ? "blur" : "empty"}
                sizes="90vw"
                className="max-h-[78svh] w-auto object-contain"
              />
            </div>
            <figcaption className="mt-4 text-center text-paper/80">
              {item.caption ?? item.alt}
              {items.length > 1 && (
                <span dir="ltr" className="ms-3 inline-block font-display text-sm text-paper/50 tabular-nums">
                  {index + 1} / {items.length}
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </dialog>
  );
}
