import { ArrowUpLeft } from "lucide-react";
import type { Metadata } from "next";

import { PostCard } from "@/components/blog/post-card";
import { ContactSection } from "@/components/contact/contact-section";
import { ClientsWall } from "@/components/home/clients-wall";
import { CoverageExplorer } from "@/components/home/coverage";
import { FieldWall } from "@/components/home/field-wall";
import { Hero } from "@/components/home/hero";
import { Process } from "@/components/home/process";
import { Promise100 } from "@/components/home/promise-100";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { TestimonialLetters } from "@/components/home/testimonial-letters";
import { TickerBands } from "@/components/home/ticker-bands";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { PinnedPhoto } from "@/components/ui/pinned-photo";
import { Reveal } from "@/components/ui/reveal";
import { Mark, SectionHeading } from "@/components/ui/section-heading";
import { totals } from "@/content/cities";
import { lite, photos } from "@/content/media";
import { posts } from "@/content/posts";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { rssAlternate, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/", types: rssAlternate },
};

export default function HomePage() {
  const showcase = services.map((s) => ({
    slug: s.slug,
    title: s.title,
    blurb: s.blurb,
    summary: s.summary,
    accent: s.accent,
    icon: s.icon,
    image: lite(s.hero),
  }));

  return (
    <>
      <Hero />
      <TickerBands />

      {/* Services */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            index="01"
            eyebrow="השירותים שלנו"
            title={
              <>
                כל מה שהמסר שלכם צריך.
                <br />
                <Mark>תחת קורת גג אחת.</Mark>
              </>
            }
            description="מתכננים, מעצבים, מדפיסים ומפיצים — כך שאתם מדברים עם גורם אחד, ואנחנו דואגים לכל השאר."
          />
          <ServicesShowcase services={showcase} />
        </div>
      </section>

      <Promise100 />

      {/* Coverage */}
      <section className="py-24 lg:py-32">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <SectionHeading
              index="02"
              eyebrow="אזורי הפצה"
              title={
                <>
                  בכל מקום שיש ריכוז חרדי ודתי —
                  <br />
                  <Mark color="cyan">אנחנו שם.</Mark>
                </>
              }
            />
            <Reveal delay={0.1} className="w-full sm:w-auto">
              <dl className="grid grid-cols-3 gap-4 sm:flex sm:gap-12">
                {[
                  { v: totals.mailboxes, l: "תיבות דואר" },
                  { v: totals.buildings, l: "בניינים" },
                  { v: totals.boards, l: "לוחות מודעות" },
                ].map((t) => (
                  <div key={t.l} className="flex flex-col">
                    <dt className="order-2 text-sm text-muted">{t.l}</dt>
                    <dd className="order-1 font-display text-2xl font-black tabular-nums sm:text-4xl">
                      <Counter value={t.v} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <div className="mt-14">
            <CoverageExplorer />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-ink/10 bg-paper-2/60 py-24 lg:py-28">
        <div className="container-page">
          <SectionHeading
            index="03"
            eyebrow="איך זה עובד"
            title={
              <>
                ארבעה צעדים,
                <br />
                <Mark color="magenta">אפס כאבי ראש.</Mark>
              </>
            }
            description="אין צורך לתאם בין מעצב, בית דפוס, חברת הפצה ומדביקים. אנחנו מנהלים את הכל — ואתם מקבלים תמונות."
          />
          <Process />
        </div>
      </section>

      <FieldWall />

      {/* Testimonials */}
      <section className="relative py-24 lg:py-32">
        <div className="container-page">
          <SectionHeading
            index="05"
            eyebrow="ממליצים עלינו"
            title={
              <>
                לקוחות שחוזרים —
                <br />
                <Mark color="green">שנה אחרי שנה.</Mark>
              </>
            }
          />
          <Reveal delay={0.1}>
            <figure className="relative mx-auto mt-16 max-w-4xl text-center">
              <blockquote className="font-serif text-3xl leading-snug font-medium text-balance sm:text-4xl lg:text-5xl">
                ״אם תמונה אחת שווה אלף מילים, אז סיבוב אחד באלעד שווה אלף תמונות.״
              </blockquote>
              <figcaption className="mt-6 font-display text-muted">
                <span className="font-semibold text-ink">יוסף דוויק</span> · אחרי סבב הדבקה בלוחות המודעות באלעד
              </figcaption>
            </figure>
          </Reveal>
          <div className="mt-16">
            <TestimonialLetters items={testimonials} />
          </div>
          <div className="mt-12 text-center">
            <ButtonLink href="/testimonials" variant="outline">
              לכל ההמלצות
              <ArrowUpLeft className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="pb-24 lg:pb-32">
        <div className="container-page mb-10 text-center">
          <Reveal>
            <p className="eyebrow justify-center">בין לקוחותינו</p>
            <p className="mx-auto mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
              עמותות, חברות מובילות ולקוחות פרטיים מכל התחומים והמגזרים
            </p>
          </Reveal>
        </div>
        <ClientsWall />
      </section>

      {/* About teaser */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
        <div aria-hidden className="halftone absolute inset-0 text-paper/[0.05]" />
        <div className="container-page relative grid items-center gap-16 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <PinnedPhoto photo={photos.boardPosterCrew2} rotate={-3} imageClassName="aspect-[4/3]" />
            <div className="absolute -bottom-12 -left-3 w-[34%] sm:-left-8">
              <PinnedPhoto photo={photos.synagogueTall3} rotate={6} delay={0.2} imageClassName="aspect-[3/4]" />
            </div>
          </div>
          <div>
            <SectionHeading
              index="06"
              eyebrow="מי אנחנו"
              tone="paper"
              title={
                <>
                  מאלעד, מאז {site.foundingYear}.
                  <br />
                  <span className="text-yellow">לכל הארץ.</span>
                </>
              }
              description={
                <>
                  ההיכרות שלנו עם עולם הפרסום במגזר החרדי והדתי החלה בשנת {site.foundingYear} בעיר אלעד. מאז צברנו
                  ניסיון עשיר ושיתופי פעולה עם הגורמים המובילים בשוק — ולמדנו שלקוח שרוצה לפרסם לא צריך לרדוף
                  אחרי עשרה ספקים. הוא צריך גורם מקצועי אחד.
                </>
              }
            />
            <Reveal delay={0.2}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {["שקיפות", "אמינות", "מקצועיות", "יחס אישי"].map((v, i) => (
                  <li
                    key={v}
                    className="flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 font-display font-semibold"
                  >
                    <span className={["size-2 rounded-full bg-yellow", "size-2 rounded-full bg-green", "size-2 rounded-full bg-cyan", "size-2 rounded-full bg-magenta"][i]} />
                    {v}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/about" variant="paper" className="mt-10">
                הסיפור שלנו
                <ArrowUpLeft className="size-4" aria-hidden />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 lg:py-32">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              index="07"
              eyebrow="מאמרים וטיפים"
              title={
                <>
                  רוצים לדעת עוד?
                  <br />
                  <Mark color="yellow">הכנו לכם מדריכים.</Mark>
                </>
              }
            />
            <ButtonLink href="/blog" variant="outline">
              לכל המאמרים
              <ArrowUpLeft className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-ink/10 bg-paper-2/50">
        <ContactSection index="08" />
      </div>

      <JsonLd data={websiteJsonLd()} />
    </>
  );
}
