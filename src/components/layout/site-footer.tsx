import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ColorBar, Dots } from "@/components/brand/ornaments";
import { FacebookIcon, WazeIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Marquee } from "@/components/ui/marquee";
import { cities, moreCities } from "@/content/cities";
import { serviceNav } from "@/content/service-nav";
import { footerCompanyNav, legalNav, site, wazeLink, whatsappLink } from "@/content/site";

const year = process.env.NEXT_PUBLIC_BUILD_YEAR;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden>
      <Marquee duration="60s" className="border-b border-paper/10 py-6" trackClassName="gap-10 pe-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-5xl font-black whitespace-nowrap text-paper/[0.14] sm:text-7xl">
              תמיד שואפים ל-100%
            </span>
            <Dots size="size-3" />
          </span>
        ))}
      </Marquee>
      </div>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-10">
        <div>
          {/* Static file so it is cached once instead of inlined into every page */}
          <Image
            src="/logo-full-light.svg"
            alt="99 פרסום ומדיה — תמיד שואפים ל-100%"
            width={176}
            height={135}
            unoptimized
            className="w-44"
          />
          <p className="mt-6 max-w-xs leading-relaxed text-paper/65">
            פרסום, הפצה ודפוס למגזר החרדי והדתי בכל הארץ. מאז {site.foundingYear}, מאלעד לכל ריכוז חרדי ודתי.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-11 place-items-center rounded-full bg-paper/8 transition hover:bg-paper hover:text-ink"
              aria-label="הפייסבוק של 99 פרסום ומדיה"
            >
              <FacebookIcon className="size-5" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-11 place-items-center rounded-full bg-paper/8 transition hover:bg-whatsapp hover:text-ink"
              aria-label="שליחת הודעת וואטסאפ"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <a
              href={wazeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-11 place-items-center rounded-full bg-paper/8 transition hover:bg-cyan hover:text-ink"
              aria-label="ניווט אלינו בוויז"
            >
              <WazeIcon className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="שירותים">
          <h2 className="font-display text-sm font-bold text-paper/60">שירותים</h2>
          <ul className="mt-5 space-y-2.5">
            {serviceNav.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="link-underline text-paper/80 hover:text-paper">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="החברה">
          <h2 className="font-display text-sm font-bold text-paper/60">החברה</h2>
          <ul className="mt-5 space-y-2.5">
            {footerCompanyNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline text-paper/80 hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold text-paper/60">דברו איתנו</h2>
          <ul className="mt-5 space-y-3.5">
            {site.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="group flex items-center gap-3">
                  <Phone className="size-4 text-yellow" aria-hidden />
                  <span dir="ltr" className="font-display text-lg font-semibold tabular-nums group-hover:text-yellow">
                    {p.display}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="group flex items-center gap-3">
                <Mail className="size-4 text-cyan" aria-hidden />
                <span className="group-hover:text-cyan">{site.email}</span>
              </a>
            </li>
            <li>
              <a href={wazeLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                <MapPin className="size-4 text-magenta" aria-hidden />
                <span className="group-hover:text-magenta">{site.address.full}</span>
              </a>
            </li>
          </ul>
          <h2 className="mt-8 font-display text-sm font-bold text-paper/60">אזורי הפצה</h2>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/areas/${c.slug}`}
                  className="block rounded-full border border-paper/15 px-3 py-1 text-sm text-paper/75 transition hover:border-paper hover:text-paper"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            {moreCities.map((c) => (
              <li key={c} className="rounded-full border border-paper/15 px-3 py-1 text-sm text-paper/75">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-sm text-paper/50 sm:flex-row">
          <p>
            © {year} {site.name}. כל הזכויות שמורות.
          </p>
          <ul className="flex gap-5">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ColorBar />
    </footer>
  );
}
