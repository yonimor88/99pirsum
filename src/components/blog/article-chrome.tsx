"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";

import { FacebookIcon, WhatsAppIcon } from "@/components/ui/icons";

/** Scroll progress bar — a CSS scroll-driven animation (`.reading-progress`). */
export function ReadingProgress() {
  return (
    <div
      aria-hidden
      className="reading-progress fixed inset-x-0 top-0 z-[55] h-1 bg-[linear-gradient(to_left,var(--color-cyan),var(--color-magenta),var(--color-yellow),var(--color-green))]"
    />
  );
}

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };
  const btn =
    "grid size-11 place-items-center rounded-full border border-ink/12 bg-paper transition hover:border-ink hover:bg-ink hover:text-paper";
  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="שיתוף בוואטסאפ"
      >
        <WhatsAppIcon className="size-5" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="שיתוף בפייסבוק"
      >
        <FacebookIcon className="size-5" />
      </a>
      <button type="button" onClick={copy} className={btn} aria-label={copied ? "הקישור הועתק" : "העתקת קישור"}>
        {copied ? <Check className="size-5" aria-hidden /> : <Link2 className="size-5" aria-hidden />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "הקישור הועתק" : ""}
      </span>
    </div>
  );
}
