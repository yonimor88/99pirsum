import { useId } from "react";

import { cn } from "@/lib/cn";
import { badge, badgeText, dots, glyphs, tagline } from "./logo-paths";

/** The four process dots of the logo, as circles (centre + radius from the vector file). */
export const LOGO_DOTS = [
  { cx: 57.951, cy: 96.989, fill: "var(--color-yellow)" },
  { cx: 119.293, cy: 174.571, fill: "var(--color-cyan)" },
  { cx: 155.251, cy: 96.989, fill: "var(--color-green)" },
  { cx: 215.207, cy: 174.571, fill: "var(--color-magenta)" },
] as const;
export const LOGO_DOT_R = 7.235;

type Props = { className?: string; title?: string };

/** "99" glyphs + dots. Glyphs use currentColor so the mark works on paper and on ink. */
export function LogoMark({ className, title = "99 פרסום ומדיה" }: Props) {
  return (
    <svg viewBox="40 80 193 112" className={cn("block", className)} role="img" aria-label={title}>
      {glyphs.map((p, i) => (
        <path key={i} transform={p.t} d={p.d} fill="currentColor" />
      ))}
      {dots.map((p, i) => (
        <path key={i} transform={p.t} d={p.d} fill={LOGO_DOTS[i].fill} />
      ))}
    </svg>
  );
}

/** Full lockup: mark, "פרסום ומדיה" badge (knocked out) and the tagline. */
export function LogoFull({ className, title = "99 פרסום ומדיה — תמיד שואפים ל-100%" }: Props) {
  const maskId = useId();
  return (
    <svg viewBox="38 80 196 150" className={cn("block", className)} role="img" aria-label={title}>
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="300" height="300" fill="white" />
          {badgeText.map((p, i) => (
            <path key={i} transform={p.t} d={p.d} fill="black" />
          ))}
        </mask>
      </defs>
      {glyphs.map((p, i) => (
        <path key={i} transform={p.t} d={p.d} fill="currentColor" />
      ))}
      {dots.map((p, i) => (
        <path key={i} transform={p.t} d={p.d} fill={LOGO_DOTS[i].fill} />
      ))}
      <g mask={`url(#${maskId})`}>
        {badge.map((p, i) => (
          <path key={i} transform={p.t} d={p.d} fill="currentColor" />
        ))}
      </g>
      {tagline.map((p, i) => (
        <path key={i} transform={p.t} d={p.d} fill="currentColor" />
      ))}
    </svg>
  );
}
