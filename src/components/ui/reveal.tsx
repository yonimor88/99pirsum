import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

/*
 * Scroll reveals use native CSS scroll-driven animations (`.reveal` in
 * globals.css): no JavaScript, nothing to hydrate, and content is visible
 * without JS or in browsers that don't support them.
 */

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger step, 0–0.3 */
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article" | "span";
};

/** Fade-and-rise as the element scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28, as: Tag = "div" }: RevealProps) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={{ "--reveal-delay": delay, "--rise-y": `${y}px` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Children reveal with a small stagger across each row of three. */
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  return <Tag className={cn("reveal-group", className)}>{children}</Tag>;
}

export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return <Tag className={cn("reveal", className)}>{children}</Tag>;
}
