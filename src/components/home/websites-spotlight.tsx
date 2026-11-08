import { ArrowUpLeft, CalendarDays, Gauge, Phone, ShieldCheck, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Dots } from "@/components/brand/ornaments";
import { buttonClasses } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Marquee } from "@/components/ui/marquee";
import { websitesPhone, whatsappLink } from "@/content/site";
import { concepts, websites, type Website } from "@/content/websites";

const perks = [
  { icon: Gauge, title: "ציון 100 בגוגל", text: "מהירים ובנויים לקידום מהיום הראשון" },
  { icon: Smartphone, title: "מושלמים בנייד", text: "רוב הגולשים מגיעים מהטלפון" },
  { icon: CalendarDays, title: "מצב שבת ותאריך עברי", text: "האתר שובת בשבת — אוטומטית" },
  { icon: ShieldCheck, title: "עובדים גם בנטפרי", text: "נראים טוב גם כשתמונות נחסמות" },
];

function Thumb({ site }: { site: Website }) {
  return (
    <div className="w-[15rem] shrink-0 overflow-hidden rounded-xl bg-ink-3 shadow-[0_24px_40px_-20px_rgb(0_0_0/0.8)] ring-1 ring-paper/10 sm:w-[19rem]">
      <div dir="ltr" className="flex items-center gap-1.5 bg-ink-2 px-3 py-1.5">
        <span className="size-1.5 rounded-full bg-magenta" />
        <span className="size-1.5 rounded-full bg-yellow" />
        <span className="size-1.5 rounded-full bg-green" />
        <span className="mx-auto truncate text-[0.6rem] text-paper/50">{site.domain}</span>
      </div>
      <div className="relative aspect-[16/10]" style={{ backgroundColor: site.palette[0] }}>
        <Image src={site.shots.desktop} alt="" fill sizes="(min-width: 640px) 19rem, 15rem" className="object-cover object-top" />
      </div>
    </div>
  );
}

/** Home page: the websites studio, right under the hero, with a moving wall of sites we built. */
export function WebsitesSpotlight() {
  // Sites whose first screen features women stay on /websites but off the home page, which every visitor sees first
  const all = [...websites, ...concepts].filter((s) => !["gila", "diana-klein"].includes(s.slug));
  const rows = [all, [...all].reverse()];

  return (
    <section aria-labelledby="home-websites-title" className="relative pb-10 lg:pb-16">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink text-paper">
          <div aria-hidden className="halftone absolute inset-x-0 top-0 h-80 text-paper/[0.06] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div aria-hidden className="absolute -top-40 left-1/4 size-[36rem] rounded-full bg-magenta/25 blur-[140px]" />

          <div className="relative grid gap-12 px-6 pt-14 sm:px-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-16 lg:pt-20">
            <div>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-paper/15 px-3.5 py-1.5 text-sm font-medium text-paper/85">
                <span className="rounded-full bg-magenta px-2 py-0.5 text-xs font-bold text-paper">חדש</span>
                סטודיו לבניית אתרים
                <Dots size="size-1.5" />
              </p>
              <h2 id="home-websites-title" className="mt-6 text-5xl leading-[0.98] font-black sm:text-6xl lg:text-7xl">
                מלוח המודעות
                <br />
                <span className="text-yellow">אל המסך.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70 sm:text-xl">
                אחרי שלושים שנה בפרסום, אנחנו בונים גם אתרים: מהירים, ממותגים עד הפרט האחרון ומותאמים לנייד — לעסקים
                שרוצים להיראות הכי טוב שיש, ולקבל פניות.
              </p>

              <p className="mt-6 hidden w-fit flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-2xl bg-yellow px-4 py-2.5 font-display text-ink [.promo-on_&]:flex">
                <span className="text-sm font-bold">מבצע</span>
                <span className="text-lg font-black whitespace-nowrap sm:text-xl">אתר החל מ-500 ש״ח</span>
                <span className="text-sm whitespace-nowrap text-ink/70">עד 15 בנובמבר</span>
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/websites" className={buttonClasses({ variant: "yellow", size: "lg" })}>
                  לאתרים שבנינו
                  <ArrowUpLeft className="size-5" aria-hidden />
                </Link>
                <a
                  href={whatsappLink("שלום, ראיתי באתר שאתם בונים אתרים ואשמח לשמוע על אתר לעסק שלי")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses({ variant: "outline-light", size: "lg" })}
                >
                  <WhatsAppIcon className="size-5 text-whatsapp" />
                  אני רוצה אתר
                </a>
                <a href={websitesPhone.href} className={buttonClasses({ variant: "outline-light", size: "lg" })}>
                  <Phone className="size-5" aria-hidden />
                  <span dir="ltr" className="tabular-nums">
                    {websitesPhone.display}
                  </span>
                </a>
              </div>
            </div>

            <ul className="grid grid-cols-2 content-center gap-2.5 sm:gap-3">
              {perks.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl border border-paper/10 bg-paper/[0.04] p-4 sm:p-5">
                  <Icon className="size-6 text-yellow" aria-hidden />
                  <p className="mt-3 font-display leading-tight font-bold sm:text-lg">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-paper/60 sm:text-sm">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Moving wall of sites we built (decorative; the button above links to all of them) */}
          <div aria-hidden className="relative mt-14 -rotate-[2deg] space-y-4 pb-16 lg:mt-20 lg:pb-20 [mask-image:linear-gradient(to_left,transparent,black_8%,black_92%,transparent)]">
            <Marquee duration="70s" trackClassName="gap-4 pe-4">
              {rows[0].map((s) => (
                <Thumb key={s.slug} site={s} />
              ))}
            </Marquee>
            <Marquee duration="80s" reverse trackClassName="gap-4 pe-4">
              {rows[1].map((s) => (
                <Thumb key={s.slug} site={s} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
