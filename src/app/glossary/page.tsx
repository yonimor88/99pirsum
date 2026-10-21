import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";

import { CtaBand, PageHero } from "@/components/layout/page-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { glossary } from "@/content/glossary";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "מילון מונחים: פרסום והפצה במגזר החרדי",
  description:
    "מה זה חצי גיליון, ראש לוח, שמירה או קו מורחב? כל המונחים של עולם ההפצה, הדבקת המודעות והדפוס במגזר החרדי — מוסברים בפשטות.",
  path: "/glossary",
});

const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, "he"));
const letters = [...new Set(sorted.map((t) => t.term[0]))];

export default function GlossaryPage() {
  return (
    <>
      <PageHero
        eyebrow="מילון מונחים"
        title="מילון מונחי פרסום והפצה."
        crumbs={[{ name: "מילון מונחים", path: "/glossary" }]}
        description="גיליון או חצי גיליון? מה זה ״שמירה״, ומה ההבדל בין קו מרכזי לקו מורחב? כל המונחים שתשמעו מאיתנו — מוסברים בפשטות."
      />

      <section className="pb-24">
        <div className="container-page max-w-4xl">
          <nav aria-label="אותיות" className="flex flex-wrap gap-2">
            {letters.map((l) => (
              <a
                key={l}
                href={`#${sorted.find((t) => t.term[0] === l)?.id}`}
                className="grid size-10 place-items-center rounded-full border border-ink/15 font-display font-bold transition hover:border-ink hover:bg-ink hover:text-paper"
              >
                {l}
              </a>
            ))}
          </nav>

          <dl className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {sorted.map((t) => (
              <div key={t.id} id={t.id} className="reveal scroll-mt-28 py-7">
                <dt className="font-display text-2xl font-bold">{t.term}</dt>
                <dd className="mt-2 max-w-3xl text-lg leading-relaxed text-ink-3">{t.definition}</dd>
                {t.link && (
                  <dd className="mt-3">
                    <Link
                      href={t.link.href}
                      className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-magenta-ink hover:underline"
                    >
                      {t.link.label}
                      <ArrowUpLeft className="size-4" aria-hidden />
                    </Link>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand title="עדיין יש שאלות?" text="אנחנו כאן כדי להסביר — ולבנות לכם תוכנית פרסום שמתאימה בדיוק למה שאתם צריכים." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          "@id": absoluteUrl("/glossary"),
          name: "מילון מונחי פרסום והפצה במגזר החרדי",
          inLanguage: "he",
          hasDefinedTerm: sorted.map((t) => ({
            "@type": "DefinedTerm",
            "@id": absoluteUrl(`/glossary#${t.id}`),
            name: t.term,
            description: t.definition,
            inDefinedTermSet: absoluteUrl("/glossary"),
          })),
        }}
      />
    </>
  );
}
