import { cn } from "@/lib/cn";

const DOT_CLASSES = ["bg-yellow", "bg-green", "bg-cyan", "bg-magenta"];

/** The four brand dots in a row — used as separators and bullets. */
export function Dots({ className, size = "size-2" }: { className?: string; size?: string }) {
  return (
    <span aria-hidden className={cn("inline-flex items-center gap-1", className)}>
      {DOT_CLASSES.map((c) => (
        <span key={c} className={cn("rounded-full", size, c)} />
      ))}
    </span>
  );
}

/** Printer's registration mark. */
export function RegMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-5", className)} fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="6" strokeWidth="1.25" />
      <path d="M12 0v24M0 12h24" strokeWidth="1.25" />
    </svg>
  );
}

/** Crop marks in the four corners of the parent (parent must be relative). */
export function CropMarks({ className, inset = "-0.75rem" }: { className?: string; inset?: string }) {
  const corner = "absolute size-4 border-current";
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0 text-ink/40", className)}>
      <span className={cn(corner, "border-t border-r")} style={{ top: inset, right: inset }} />
      <span className={cn(corner, "border-t border-l")} style={{ top: inset, left: inset }} />
      <span className={cn(corner, "border-b border-r")} style={{ bottom: inset, right: inset }} />
      <span className={cn(corner, "border-b border-l")} style={{ bottom: inset, left: inset }} />
    </span>
  );
}

/** Thin CMYK colour bar, like the strip on a print proof. */
export function ColorBar({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex h-1.5 w-full", className)}>
      <span className="flex-1 bg-cyan" />
      <span className="flex-1 bg-magenta" />
      <span className="flex-1 bg-yellow" />
      <span className="flex-1 bg-green" />
      <span className="flex-1 bg-ink" />
    </span>
  );
}
