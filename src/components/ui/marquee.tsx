import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Infinite CSS marquee. Content is duplicated once for a seamless loop. */
export function Marquee({
  children,
  reverse = false,
  duration = "40s",
  className,
  trackClassName,
  pauseOnHover = true,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: string;
  className?: string;
  trackClassName?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn("group/marquee overflow-hidden", className)}
      style={{ "--marquee-duration": duration } as CSSProperties}
    >
      <div
        className={cn(
          "flex w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
      >
        <div className={cn("flex shrink-0 items-center", trackClassName)}>{children}</div>
        <div aria-hidden className={cn("flex shrink-0 items-center", trackClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
