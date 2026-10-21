import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

/**
 * Text that starts "off-register" — cyan, magenta and yellow plates offset like a
 * misaligned print run — and snaps into register. The brand's signature entrance.
 * Pure CSS (see `.misreg` in globals.css): the plates are pseudo-elements, so the
 * text exists once in the HTML for search engines and screen readers.
 */
export function Misregistered({
  children,
  className,
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span
      className={cn("misreg", className)}
      data-text={children}
      style={{ "--mr-delay": `${delay}s` } as CSSProperties}
    >
      <span className="misreg-text" data-text={children}>
        {children}
      </span>
    </span>
  );
}
