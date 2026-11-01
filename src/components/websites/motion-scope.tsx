"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

import { usePrefersLessMotion } from "@/components/a11y/motion-provider";

/**
 * Motion for the /websites page only: the lighter `domAnimation` feature set,
 * loaded once for every animated block below, and switched off when the
 * visitor asks for less motion (OS setting or our accessibility menu).
 */
export function MotionScope({ children }: { children: ReactNode }) {
  const lessMotion = usePrefersLessMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={lessMotion ? "always" : "user"}>{children}</MotionConfig>
    </LazyMotion>
  );
}
