"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

import { usePrefersLessMotion } from "@/components/a11y/motion-provider";

const fmt = new Intl.NumberFormat("he-IL");

/**
 * Counts up to `value` when scrolled into view. The final value is rendered on the
 * server, so the number is correct without JavaScript and for search engines.
 */
export function Counter({
  value,
  duration = 1.8,
  className,
  suffix = "",
}: {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const lessMotion = usePrefersLessMotion();
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || lessMotion || started.current) return;
    if (!inView) {
      node.textContent = fmt.format(0) + suffix;
      return;
    }
    started.current = true;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = fmt.format(Math.round(v)) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, lessMotion, value, duration, suffix]);

  return (
    <span ref={ref} className={className}>
      {fmt.format(value) + suffix}
    </span>
  );
}
