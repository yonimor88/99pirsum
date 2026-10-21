import { ArrowUpLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ServiceGlyph } from "@/components/ui/icons";
import type { Service } from "@/content/services";
import { accentBg } from "@/content/service-nav";
import { cn } from "@/lib/cn";

export function ServiceCard({ service, index, large = false }: { service: Service; index?: number; large?: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_1px_0_0_rgb(20_20_20/0.06)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(20,20,20,0.45)]"
    >
      <div className={cn("relative overflow-hidden", large ? "aspect-[16/10]" : "aspect-[16/11]")}>
        <Image
          src={service.hero.src}
          alt={service.hero.alt}
          fill
          sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
        <span
          className={cn(
            "absolute top-4 right-4 grid size-12 place-items-center rounded-2xl text-ink transition-transform duration-500 group-hover:-rotate-6",
            accentBg[service.accent],
          )}
        >
          <ServiceGlyph icon={service.icon} className="size-6" />
        </span>
        {index !== undefined && (
          <span className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-3 py-1 font-display text-xs font-bold text-paper tabular-nums backdrop-blur">
            {String(index).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className={cn("font-display font-bold", large ? "text-3xl" : "text-2xl")}>{service.title}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted">{service.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-display font-semibold">
          <span className="link-underline">לפרטים</span>
          <ArrowUpLeft className="size-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
      <span className={cn("absolute inset-x-0 bottom-0 h-1 origin-right scale-x-0 transition-transform duration-500 group-hover:scale-x-100", accentBg[service.accent])} />
    </Link>
  );
}
