import { ArrowUpLeft, Building, Mailbox, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/contact/contact-form";
import { CtaBand, Faq, PageHero } from "@/components/layout/page-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { ServiceGlyph } from "@/components/ui/icons";
import { PhotoGrid } from "@/components/ui/photo-grid";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cities, getCity, type City } from "@/content/cities";
import { lite, photos } from "@/content/media";
import { accentBg } from "@/content/service-nav";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const fmt = (n: number) => n.toLocaleString("he-IL");

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[city]">): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return pageMetadata({
    title: `הפצת עלונים והדבקת מודעות ${city.inName}`,
    description: `הפצת עלונים בתיבות דואר, הדבקת מודעות, תלי דלת ועלונים בבתי כנסת ${city.inName}: כ-${fmt(city.mailboxes)} תיבות דואר, ${fmt(city.buildings)} בניינים ו-${fmt(city.boards)} לוחות מודעות. דיווח ותמונות מהשטח.`,
    path: `/areas/${city.slug}`,
  });
}

function cityServiceLine(slug: string, city: City): string | undefined {
  switch (slug) {
    case "mailbox-distribution":
      return `כ-${fmt(city.mailboxes)} תיבות דואר ${city.inName}, בימי שני וחמישי, עם פיקוח מדגמי ודיווח בסיום.`;
    case "poster-boards":
      return `כ-${fmt(city.boards)} לוחות מודעות ${city.inName}, עם תמונות מהלוחות ישר לוואטסאפ.`;
    case "building-entrances":
      return `סבב בכניסות של כ-${fmt(city.buildings)} בניינים ${city.inName}, בסיום תוך 72 שעות.`;
    case "door-hangers":
      return `תלי דלת ומגנטים על הדלתות ${city.inName}, עם תמונות מדגמיות ומפת חלוקה.`;
    case "synagogues":
      return `עלונים ומודעות בבתי הכנסת ובמקוואות ${city.inName}, לקראת השבת.`;
  }
}

function cityFaqs(city: City) {
  return [
    {
      q: `כמה תיבות דואר יש ${city.inName}?`,
      a: `לפי הנתונים שלנו יש ${city.inName} כ-${fmt(city.mailboxes)} תיבות דואר ב-${fmt(city.buildings)} בניינים${city.note === "בשכונות החרדיות והדתיות" ? ", בשכונות החרדיות והדתיות" : ""}. אפשר להפיץ לכל העיר או רק לשכונות מסוימות.`,
    },
    {
      q: `באילו ימים מתבצעת ההפצה ${city.inName}?`,
      a: "ההפצה בתיבות הדואר וההדבקה בכניסות ובלוחות מתבצעות בימי שני וחמישי, והחלוקה בבתי הכנסת בימי חמישי ושישי. יציאות מיוחדות בימים אחרים מתואמות בהצעת מחיר נפרדת.",
    },
    {
      q: `כמה לוחות מודעות אתם מכסים ${city.inName}?`,
      a: `כ-${fmt(city.boards)} לוחות מודעות. אנחנו מדביקים מודעות בגודל חצי גיליון (50×70 ס״מ) וגיליון (100×70 ס״מ), ושולחים תמונות מהלוחות לוואטסאפ מיד לאחר ההדבקה.`,
    },
    {
      q: `כמה עולה פרסום ${city.inName}?`,
      a: "המחיר תלוי בשירות, בכמות, בסוג החומר ובאזור ההפצה. השאירו פרטים — או שלחו הודעה בוואטסאפ — ונחזור אליכם עם הצעת מחיר מסודרת.",
    },
  ];
}

export default async function CityPage({ params }: PageProps<"/areas/[city]">) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const fieldServices = services.filter((s) => s.group === "field");
  const faqs = cityFaqs(city);
  const others = cities.filter((c) => c.slug !== city.slug);

  return (
    <>
      <PageHero
        eyebrow={`אזורי הפצה · ${city.name}`}
        title={`הפצה ופרסום ${city.inName}.`}
        crumbs={[
          { name: "אזורי הפצה", path: "/areas" },
          { name: city.name, path: `/areas/${city.slug}` },
        ]}
        description={city.intro}
      >
        <ButtonLink href="#quote" size="lg">
          הצעת מחיר ל{city.name}
          <ArrowUpLeft className="size-5" aria-hidden />
        </ButtonLink>
      </PageHero>

      <section className="pb-16">
        <div className="container-page">
          <RevealGroup className="grid gap-4 sm:grid-cols-3">
            {[
              { v: city.mailboxes, l: "תיבות דואר", icon: Mailbox, c: "bg-yellow text-ink" },
              { v: city.buildings, l: "בניינים", icon: Building, c: "bg-ink text-paper" },
              { v: city.boards, l: "לוחות מודעות", icon: Newspaper, c: "bg-ink text-paper" },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <RevealItem key={t.l} className={cn("rounded-[1.75rem] p-7", t.c)}>
                  <Icon className="size-6 opacity-70" aria-hidden />
                  <p className="mt-4 font-display text-5xl font-black tabular-nums">
                    <Counter value={t.v} />
                  </p>
                  <p className="mt-1 opacity-75">
                    {t.l} {city.inName}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
          {city.note && <p className="mt-4 text-sm text-muted">* {city.note}</p>}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <Reveal>
            <h2 className="text-3xl font-extrabold sm:text-4xl">מה אפשר לעשות {city.inName}</h2>
          </Reveal>
          <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fieldServices.map((s) => (
              <RevealItem as="li" key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-[1.5rem] bg-white p-6 transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(20,20,20,0.45)]"
                >
                  <span className={cn("grid size-12 place-items-center rounded-2xl text-ink", accentBg[s.accent])}>
                    <ServiceGlyph icon={s.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold">
                    {s.title} {city.inName}
                  </h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted">{cityServiceLine(s.slug, city)}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-display font-semibold">
                    לפרטי השירות
                    <ArrowUpLeft className="size-4" aria-hidden />
                  </span>
                </Link>
              </RevealItem>
            ))}
            <RevealItem as="li">
              <Link
                href="/services"
                className="flex h-full flex-col justify-center rounded-[1.5rem] border-2 border-dashed border-ink/15 p-6 text-center transition hover:border-ink"
              >
                <p className="font-display text-xl font-bold">ועוד: דפוס, שילוט ומיתוג</p>
                <p className="mt-2 text-muted">לכל השירותים</p>
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {city.local && (
        <section className="border-y border-ink/10 bg-paper-2/60 py-20">
          <div className="container-page max-w-4xl">
            <Reveal>
              <h2 className="text-3xl font-extrabold sm:text-4xl">{city.name} מקרוב</h2>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {city.local.map((l) => (
                <Reveal as="li" key={l} className="rounded-2xl bg-paper p-6 text-lg leading-relaxed">
                  {l}
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="text-3xl font-extrabold sm:text-4xl">מהשטח</h2>
            <p className="mt-3 text-lg text-muted">תמונות מעבודות שביצענו באזורי ההפצה שלנו.</p>
          </Reveal>
          <PhotoGrid
            photos={[photos.boardReader, photos.mailboxes, photos.doorHangersHall, photos.entranceBoard, photos.synagogueLeaflets, photos.boardPosterCrew].map(lite)}
            className="mt-10"
          />
        </div>
      </section>

      <section id="quote" className="border-t border-ink/10 py-20 lg:py-28">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Faq items={faqs} title={`שאלות נפוצות על פרסום ${city.inName}`} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] bg-paper-2 p-6 sm:p-10">
              <h2 className="font-display text-3xl font-bold">הצעת מחיר לפרסום {city.inName}</h2>
              <p className="mt-2 text-muted">השאירו פרטים ונחזור אליכם בהקדם.</p>
              <div className="mt-7">
                <ContactForm defaultCity={city.name} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold">אזורי הפצה נוספים</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/areas/${c.slug}`}
                  className="inline-flex rounded-full border border-ink/15 px-5 py-2.5 font-display font-semibold transition hover:border-ink hover:bg-ink hover:text-paper"
                >
                  פרסום {c.inName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`יש לכם מסר ל${city.name}?`} text={`ספרו לנו מה אתם רוצים לפרסם ${city.inName} ונחזור אליכם עם תוכנית והצעת מחיר.`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `פרסום והפצה ${city.inName}`,
          serviceType: "הפצת עלונים, הדבקת מודעות ופרסום",
          url: absoluteUrl(`/areas/${city.slug}`),
          provider: { "@id": absoluteUrl("/#business"), name: site.name },
          areaServed: { "@type": "City", name: city.name },
        }}
      />
    </>
  );
}
