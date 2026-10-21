import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "ink" | "paper" | "outline" | "outline-light" | "whatsapp" | "yellow";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,color] duration-300 ease-[var(--ease-out-expo)] active:translate-y-0 active:shadow-none";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-paper shadow-[-4px_4px_0_0_var(--color-yellow)] hover:-translate-y-0.5 hover:shadow-[-6px_6px_0_0_var(--color-yellow)]",
  paper:
    "bg-paper text-ink shadow-[-4px_4px_0_0_var(--color-magenta)] hover:-translate-y-0.5 hover:shadow-[-6px_6px_0_0_var(--color-magenta)]",
  yellow:
    "bg-yellow text-ink shadow-[-4px_4px_0_0_var(--color-ink)] hover:-translate-y-0.5 hover:shadow-[-6px_6px_0_0_var(--color-ink)]",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
  "outline-light": "border-2 border-paper/70 text-paper hover:bg-paper hover:text-ink",
  whatsapp:
    "bg-whatsapp text-ink shadow-[-4px_4px_0_0_var(--color-ink)] hover:-translate-y-0.5 hover:shadow-[-6px_6px_0_0_var(--color-ink)]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-lg",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function buttonClasses({ variant = "ink", size = "md", className }: Omit<CommonProps, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}

/** For tel:, mailto: and external links. */
export function ButtonAnchor({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<"a">) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </a>
  );
}
