"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const LAYERS = [
  { color: "var(--color-cyan)", x: "-0.07em", y: "-0.035em" },
  { color: "var(--color-magenta)", x: "0.055em", y: "0.05em" },
  { color: "var(--color-yellow)", x: "-0.03em", y: "0.075em" },
];

/**
 * Text that starts "off-register" — cyan, magenta and yellow plates offset like a
 * misaligned print run — and snaps into register. The brand's signature entrance.
 */
export function Misregistered({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={cn("relative inline-grid", className)}>
      {LAYERS.map((layer) => (
        <motion.span
          key={layer.color}
          aria-hidden
          className="pointer-events-none col-start-1 row-start-1 mix-blend-multiply select-none"
          style={{ color: layer.color }}
          initial={{ x: layer.x, y: layer.y, opacity: 1 }}
          animate={{ x: 0, y: 0, opacity: 0 }}
          transition={{
            x: { duration: 1.1, delay: delay + 0.35, ease: [0.65, 0, 0.35, 1] },
            y: { duration: 1.1, delay: delay + 0.35, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.4, delay: delay + 1.35 },
          }}
        >
          {children}
        </motion.span>
      ))}
      <span className="relative col-start-1 row-start-1">{children}</span>
    </span>
  );
}
