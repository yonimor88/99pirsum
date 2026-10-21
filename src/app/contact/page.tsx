import { MapPin } from "lucide-react";

import { Dots } from "@/components/brand/ornaments";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactDetails } from "@/components/contact/contact-section";
import { PageHero } from "@/components/layout/page-blocks";
import { ButtonAnchor } from "@/components/ui/button";
import { WazeIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { mapsLink, site, wazeLink } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "צור קשר",
  description: `דברו עם 99 פרסום ומדיה: ${site.phones[0].display}, וואטסאפ או טופס הצעת מחיר. ${site.address.full}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="צור קשר"
        title="בואו נדבר."
        crumbs={[{ name: "צור קשר", path: "/contact" }]}
        description="ספרו לנו מה אתם רוצים לפרסם, איפה ולמי — ונחזור אליכם עם הצעה מסודרת. מעדיפים לדבר? אנחנו כאן בטלפון ובוואטסאפ."
      />
      <section className="pb-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <div className="relative rounded-[2rem] bg-paper-2 p-6 sm:p-10">
              <Dots className="absolute top-8 left-8" />
              <h2 className="font-display text-3xl font-bold">לקבלת הצעת מחיר</h2>
              <p className="mt-2 text-muted">שתי דקות, ואנחנו על זה.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactDetails />
            <div className="relative mt-6 overflow-hidden rounded-[1.5rem] bg-ink p-7 text-paper">
              <div aria-hidden className="halftone absolute inset-0 text-paper/10" />
              <div aria-hidden className="absolute top-1/2 left-10 -translate-y-1/2">
                <span className="relative grid size-16 place-items-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-magenta/40 [animation-duration:2.4s]" />
                  <MapPin className="relative size-9 text-magenta" />
                </span>
              </div>
              <p className="relative text-sm text-paper/60">המשרד שלנו</p>
              <p className="relative mt-1 font-display text-3xl font-bold">{site.address.full}</p>
              <p className="relative mt-1 text-paper/60">מיקוד {site.address.zip}</p>
              <div className="relative mt-6 flex flex-wrap gap-2">
                <ButtonAnchor href={wazeLink} target="_blank" rel="noopener noreferrer" variant="paper">
                  <WazeIcon className="size-5" />
                  ניווט ב-Waze
                </ButtonAnchor>
                <ButtonAnchor href={mapsLink} target="_blank" rel="noopener noreferrer" variant="outline-light">
                  Google Maps
                </ButtonAnchor>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
