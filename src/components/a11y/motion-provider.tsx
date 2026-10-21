"use client";

import { useSyncExternalStore } from "react";

import { useA11ySettings } from "./a11y-store";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * True when the visitor asked for less motion (OS setting or our accessibility menu).
 * Always false during SSR and hydration, so server and client markup match.
 */
export function usePrefersLessMotion() {
  const system = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  const { noMotion } = useA11ySettings();
  return system || noMotion;
}
