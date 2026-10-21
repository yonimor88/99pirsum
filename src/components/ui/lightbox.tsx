"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef } from "react";

export type LightboxItem = { src: StaticImageData; alt: string; caption?: string };

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
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // RTL: left arrow moves forward
      if (e.key === "ArrowLeft") go(1);
      if (e.key === "ArrowRight") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocus.current?.focus();
    };
  }, [open, onClose, go]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute top-4 left-4 z-10 grid size-12 place-items-center rounded-full bg-paper text-ink transition hover:bg-yellow"
            aria-label="סגירה"
          >
            <X className="size-6" />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute top-1/2 right-3 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink transition hover:bg-yellow sm:right-6"
                aria-label="התמונה הקודמת"
              >
                <ChevronRight className="size-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute top-1/2 left-3 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink transition hover:bg-yellow sm:left-6"
                aria-label="התמונה הבאה"
              >
                <ChevronLeft className="size-6" />
              </button>
            </>
          )}

          <motion.figure
            key={index}
            className="relative flex max-h-full max-w-6xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
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
                <span className="ms-3 font-display text-sm text-paper/50 tabular-nums">
                  {index + 1} / {items.length}
                </span>
              )}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
