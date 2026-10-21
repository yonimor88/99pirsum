import type { CSSProperties, ReactNode } from "react";

import { RegMark } from "@/components/brand/ornaments";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type Props = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  tone?: "ink" | "paper";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "start",
  tone = "ink",
  className,
  titleClassName,
  as: Tag = "h2",
}: Props) {
  const onDark = tone === "paper";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <p className={cn("eyebrow", onDark && "text-paper/60", align === "center" && "justify-center")}>
          <RegMark className="size-4" />
          {index && <span className="tabular-nums">{index}</span>}
          {index && <span aria-hidden>/</span>}
          <span>{eyebrow}</span>
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <Tag
          className={cn(
            "mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[3.6rem]",
            onDark ? "text-paper" : "text-ink",
            titleClassName,
          )}
        >
          {title}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <div
            className={cn(
              "mt-5 text-lg leading-relaxed sm:text-xl",
              onDark ? "text-paper/70" : "text-muted",
              align === "center" && "mx-auto max-w-2xl",
            )}
          >
            {description}
          </div>
        </Reveal>
      )}
    </div>
  );
}

/**
 * Highlighter-marker stroke behind a phrase. Drawn as an inline background with
 * `box-decoration-break: clone`, so it wraps across lines instead of forcing the
 * phrase onto one line (which overflowed narrow phones).
 */
export function Mark({ children, color = "yellow" }: { children: ReactNode; color?: "yellow" | "cyan" | "green" | "magenta" }) {
  return (
    <span className="mark-hl" style={{ "--mark": `var(--color-${color})` } as CSSProperties}>
      {children}
    </span>
  );
}
