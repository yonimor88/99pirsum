"use client";

import { useEffect, useRef } from "react";

import { usePrefersLessMotion } from "@/components/a11y/motion-provider";

const fmt = new Intl.NumberFormat("he-IL");
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Counts up to `value` when it comes on screen. The final value is rendered on the
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
  const lessMotion = usePrefersLessMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || lessMotion) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / (duration * 1000));
        node.textContent = fmt.format(Math.round(value * easeOutExpo(t))) + suffix;
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    // Start from zero only if the number is not already visible on load
    const rect = node.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) node.textContent = fmt.format(0) + suffix;
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [lessMotion, value, duration, suffix]);

  return (
    <span ref={ref} className={className}>
      {fmt.format(value) + suffix}
    </span>
  );
}
