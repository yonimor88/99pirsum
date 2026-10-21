"use client";

import { MotionConfig, useReducedMotion } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

import { useA11ySettings } from "./a11y-store";

export function MotionProvider({ children }: { children: ReactNode }) {
  const { noMotion } = useA11ySettings();
  return <MotionConfig reducedMotion={noMotion ? "always" : "user"}>{children}</MotionConfig>;
}

const subscribeNoop = () => () => {};

/** False during SSR and hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

/**
 * True when the visitor asked for less motion (OS setting or our accessibility menu).
 * Always false until hydration completes, so server and client markup match.
 */
export function usePrefersLessMotion() {
  const system = useReducedMotion();
  const { noMotion } = useA11ySettings();
  const hydrated = useHydrated();
  return hydrated && (Boolean(system) || noMotion);
}
