"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { usePrefersLessMotion } from "@/components/a11y/motion-provider";

/** The mobile menu locks <body>; the lightbox is a modal <dialog>. Either way the page itself mustn't move. */
const pageLocked = () => document.body.style.overflow === "hidden" || document.querySelector("dialog[open]") !== null;

/**
 * Eased wheel scrolling for the whole site, and smooth jumps for in-page links
 * like `#projects`. Touch keeps the phone's native scrolling. Off entirely when
 * the visitor asks for less motion (OS setting or our accessibility menu).
 */
export function SmoothScroll() {
  const lessMotion = usePrefersLessMotion();

  useEffect(() => {
    if (lessMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
      virtualScroll: () => !pageLocked(),
    });

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      e.preventDefault();
      // Lenis honours scroll-padding-top / scroll-margin-top, so headings clear the header like native jumps
      lenis.scrollTo(target, { duration: 1.2 });
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      // Move focus like a native jump would, for keyboard and screen reader users (e.g. the skip link)
      if (!target.hasAttribute("tabindex") && !target.matches("a[href], button, input, select, textarea")) {
        target.setAttribute("tabindex", "-1");
      }
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [lessMotion]);

  return null;
}
