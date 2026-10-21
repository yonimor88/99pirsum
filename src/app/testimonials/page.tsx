import Image from "next/image";

import { ClientsWall } from "@/components/home/clients-wall";
import { TestimonialLetters } from "@/components/home/testimonial-letters";
import { CtaBand, PageHero } from "@/components/layout/page-blocks";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ממליצים עלינו",
  description:
    "מכתבי המלצה מלקוחות 99 פרסום ומדיה — גיל גרופ, פותחים שבוע, אקסוס, יוסף דוויק ועוד. לקוחות שעובדים איתנו כבר יותר מעשור.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const dweck = testimonials.find((t) => t.id === "yosef-dweck");
  return (
    <>
      <PageHero
        eyebrow="ממליצים עלינו"
        title="מה הלקוחות כותבים עלינו."
        crumbs={[{ name: "ממליצים עלינו", path: "/testimonials" }]}
        description="חלק מהלקוחות שלנו עובדים איתנו כבר יותר מעשור. אלה המכתבים שהם שלחו לנו, וליד כל אחד — המקור המלא לעיון."
      />

      <section className="pb-24">
        <div className="container-page">
          <TestimonialLetters items={testimonials} full />
        </div>
      </section>

      {dweck?.extra && (
        <section className="pb-24">
          <div className="container-page">
            <Reveal>
              <figure className="mx-auto grid max-w-4xl items-center gap-10 rounded-[2rem] bg-paper-2 p-8 sm:p-12 md:grid-cols-[1fr_1.1fr]">
                <div className="overflow-hidden rounded-2xl bg-white p-3 shadow-[0_24px_50px_-28px_rgba(20,20,20,0.5)]">
                  <Image src={dweck.extra.image} alt={dweck.extra.caption} placeholder="blur" sizes="(min-width: 768px) 40vw, 90vw" className="h-auto w-full" />
                </div>
                <figcaption>
                  <p className="font-serif text-3xl leading-snug font-medium">
                    ״שעות ספורות לאחר ההדבקה כבר נרשמה במערכת הטלפונית שלנו השיחה הראשונה.״
                  </p>
                  <p className="mt-5 text-muted">
                    <span className="font-display font-semibold text-ink">יוסף דוויק</span> — אחרי פרסום בלוחות המודעות באלעד,
                    בשבוע גשום וסוער במיוחד.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      <section className="pb-12">
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

      <CtaBand title="הלקוח הבא שממליץ עלינו — אתם?" />
    </>
  );
}
