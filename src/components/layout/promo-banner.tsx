"use client";

import { ArrowUpLeft, X } from "lucide-react";
import Link from "next/link";

import { PROMO_DISMISS_KEY, promo } from "@/content/promo";

/** Strip above the header. Hidden unless <html> has `promo-on` (see promoBootScript). */
export function PromoBanner() {
  const [before, after] = promo.text.split(promo.price);

  const dismiss = () => {
    document.documentElement.classList.remove("promo-on");
    try {
      localStorage.setItem(PROMO_DISMISS_KEY, promo.id);
    } catch {}
  };

  return (
    <div className="hidden bg-ink text-paper [.promo-on_&]:block">
      <div className="container-page relative flex h-10 items-center justify-center">
        <Link href={promo.href} className="group flex min-w-0 items-center gap-2.5 pe-8 font-display text-sm sm:pe-0 sm:text-[0.95rem]">
          <span className="shrink-0 rounded-full bg-yellow px-2.5 py-0.5 text-xs font-bold text-ink">{promo.label}</span>
          <span className="truncate">
            {before}
            <strong className="font-bold text-yellow">{promo.price}</strong>
            {after}
          </span>
          <span className="hidden shrink-0 text-paper/55 sm:inline">· {promo.until}</span>
          <span className="hidden shrink-0 items-center gap-1 font-semibold underline-offset-4 group-hover:underline md:flex">
            לפרטים
            <ArrowUpLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="absolute end-2 grid size-8 place-items-center rounded-full text-paper/60 transition-colors hover:bg-paper/10 hover:text-paper sm:end-4"
          aria-label="סגירת הודעת המבצע"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
