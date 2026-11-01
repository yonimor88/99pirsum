import { Lock } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Desktop browser window. The screen keeps a 16:10 ratio; children fill it. */
export function BrowserFrame({
  domain,
  children,
  className,
  tone = "light",
}: {
  domain: ReactNode;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[0.9rem] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.55),0_0_0_1px_rgb(0_0_0/0.08)] sm:rounded-[1.1rem]",
        dark ? "bg-ink-3" : "bg-white",
        className,
      )}
    >
      <div dir="ltr" className={cn("flex items-center gap-3 px-3 py-2 sm:px-4 sm:py-2.5", dark ? "bg-ink-2" : "bg-paper-2")}>
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-magenta sm:size-3" />
          <span className="size-2.5 rounded-full bg-yellow sm:size-3" />
          <span className="size-2.5 rounded-full bg-green sm:size-3" />
        </span>
        <span
          className={cn(
            "mx-auto flex min-w-0 items-center gap-1.5 rounded-full px-3 py-1 text-[0.65rem] sm:text-xs",
            dark ? "bg-ink-3 text-paper/70" : "bg-white text-muted",
          )}
        >
          <Lock className="size-3 shrink-0" aria-hidden />
          <span className="truncate">{domain}</span>
        </span>
        <span aria-hidden className="w-10 sm:w-12" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  );
}

/** Phone with a 9:19.5 screen. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[1.6rem] bg-ink p-[5%] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6),inset_0_0_0_1.5px_rgb(255_255_255/0.12)] sm:rounded-[2.2rem]",
        className,
      )}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.15rem] bg-white sm:rounded-[1.7rem]">
        {children}
        <span aria-hidden className="absolute top-[1.6%] left-1/2 z-10 h-[3.2%] w-[32%] -translate-x-1/2 rounded-full bg-ink" />
      </div>
    </div>
  );
}

/** Screen height ÷ width for each frame, used to work out how far a long capture can scroll. */
export const BROWSER_SCREEN_RATIO = 10 / 16;
export const PHONE_SCREEN_RATIO = 19.5 / 9;

/** How far (in % of its own height) a long capture must move up to reach its bottom. */
export function scrollTravel(img: { width: number; height: number }, screenRatio: number) {
  const visible = screenRatio / (img.height / img.width);
  return Math.max(0, (1 - visible) * 100);
}
