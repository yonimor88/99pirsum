import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";

import { CoverageExplorer } from "@/components/home/coverage";
import { CtaBand, PageHero } from "@/components/layout/page-blocks";
import { Counter } from "@/components/ui/counter";
import { PinnedPhoto } from "@/components/ui/pinned-photo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cities, moreCities, totals } from "@/content/cities";
import { photos } from "@/content/media";
import { serviceNav } from "@/content/service-nav";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "אזורי הפצה",
  description:
    "הפצה, הדבקה ופרסום בבני ברק, ירושלים, בית שמש, ביתר עילית, מודיעין עילית, אלעד, אשדוד ועוד. כ-150,000 תיבות דואר, יותר מ-13,000 בניינים ו-1,170 לוחות מודעות.",
  path: "/areas",
});

const fieldServices = serviceNav.filter((s) => s.group === "field");

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="אזורי הפצה"
        title="איפה שהקהל שלכם — שם אנחנו."
        crumbs={[{ name: "אזורי הפצה", path: "/areas" }]}
        description="אנחנו פועלים בכל הערים המרכזיות במגזר החרדי והדתי, ובכל מקום שיש בו ריכוז חרדי ודתי. אלה המספרים שאנחנו מכסים בשטח."
        aside={
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <PinnedPhoto photo={photos.cityAerial} rotate={-2} priority imageClassName="aspect-[4/3]" />
            <div className="absolute -bottom-8 -left-2 w-1/2">
              <PinnedPhoto photo={photos.boardTall4} rotate={6} delay={0.2} tape="corners" imageClassName="aspect-[3/4]" />
            </div>
          </div>
        }
      />

      <section className="pb-20">
        <div className="container-page">
          <RevealGroup className="grid gap-4 sm:grid-cols-3">
            {[
              { v: totals.mailboxes, l: "תיבות דואר", c: "bg-yellow" },
              { v: totals.buildings, l: "בניינים", c: "bg-green" },
              { v: totals.boards, l: "לוחות מודעות", c: "bg-cyan" },
            ].map((t) => (
              <RevealItem key={t.l} className="relative overflow-hidden rounded-[1.75rem] bg-ink p-8 text-paper">
                <span className={`absolute -top-6 -left-6 size-24 rounded-full ${t.c} opacity-90`} aria-hidden />
                <p className="relative font-display text-5xl font-black tabular-nums sm:text-6xl">
                  <Counter value={t.v} />
                </p>
                <p className="relative mt-2 text-paper/70">{t.l} בערים המרכזיות</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <Reveal>
            <h2 className="text-4xl font-extrabold sm:text-5xl">בחרו עיר</h2>
            <p className="mt-3 text-lg text-muted">מספר הבניינים, תיבות הדואר ולוחות המודעות שאנחנו מכסים בכל עיר.</p>
          </Reveal>
          <div className="mt-10">
            <CoverageExplorer />
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-paper-2/60 py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="text-4xl leading-tight font-extrabold">כל השירותים, בכל הערים</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              בכל אחת מהערים אפשר לשלב בין הערוצים — תיבות דואר, לוחות מודעות, כניסות בניינים, תלי דלת ובתי כנסת —
              בתיאום אחד מולנו.
            </p>
          </Reveal>
          <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2">
            {fieldServices.map((s) => (
              <RevealItem as="li" key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between rounded-2xl bg-paper p-5 font-display text-lg font-bold transition hover:bg-ink hover:text-paper"
                >
                  {s.title}
                  <ArrowUpLeft className="size-5 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="text-3xl font-extrabold sm:text-4xl">רשימת הערים</h2>
          </Reveal>
          <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-ink/10 bg-white">
            <table className="w-full min-w-[34rem] text-start">
              <caption className="sr-only">נתוני כיסוי לפי עיר</caption>
              <thead className="bg-paper-2 font-display text-sm text-muted">
                <tr>
                  <th scope="col" className="p-4 text-start font-semibold">עיר</th>
                  <th scope="col" className="p-4 text-start font-semibold">בניינים</th>
                  <th scope="col" className="p-4 text-start font-semibold">תיבות דואר</th>
                  <th scope="col" className="p-4 text-start font-semibold">לוחות מודעות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/8">
                {cities.map((c) => (
                  <tr key={c.slug}>
                    <th scope="row" className="p-4 text-start font-display text-lg font-bold">
                      {c.name}
                      {c.note && <span className="ms-2 text-sm font-normal text-muted">({c.note})</span>}
                    </th>
                    <td className="p-4 tabular-nums">{c.buildings.toLocaleString("he-IL")}</td>
                    <td className="p-4 tabular-nums">{c.mailboxes.toLocaleString("he-IL")}</td>
                    <td className="p-4 tabular-nums">{c.boards.toLocaleString("he-IL")}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="p-4 text-start font-display text-lg font-bold">ועוד</th>
                  <td colSpan={3} className="p-4 text-muted">
                    {moreCities.join(" · ")} — וכל מקום שיש בו ריכוז חרדי ודתי
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand title="העיר שלכם לא ברשימה?" text="כנראה שאנחנו שם בכל זאת. ספרו לנו לאן אתם צריכים להגיע, ונבנה לכם תוכנית הפצה." />
    </>
  );
}
