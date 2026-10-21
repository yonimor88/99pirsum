"use client";

import { FileText } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useState } from "react";

import { Lightbox } from "@/components/ui/lightbox";

/** "Original letter" button that opens the scanned letter in the lightbox. */
export function LetterViewer({ letter, alt, caption }: { letter: StaticImageData; alt: string; caption: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(0)}
        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-display text-sm font-semibold transition hover:border-ink hover:bg-ink hover:text-paper"
      >
        <FileText className="size-4" aria-hidden />
        למכתב המקורי
      </button>
      <Lightbox items={[{ src: letter, alt, caption }]} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </>
  );
}
