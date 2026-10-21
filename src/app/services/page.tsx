import { ArrowUpLeft } from "lucide-react";

import { Process } from "@/components/home/process";
import { CtaBand, PageHero } from "@/components/layout/page-blocks";
import { ServiceCard } from "@/components/services/service-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Mark, SectionHeading } from "@/components/ui/section-heading";
import { serviceGroups } from "@/content/service-nav";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "השירותים שלנו",
  description:
    "הפצה בתיבות דואר, הדבקת מודעות, מודעות בכניסות בניינים, תלי דלת, עלונים בבתי כנסת, דפוס, שילוט, קונסטרוקציה, מיתוג ובניית אתרים — הכל אצל גורם אחד.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="השירותים שלנו"
        title="כל הדרכים להגיע לקהל."
        crumbs={[{ name: "שירותים", path: "/services" }]}
        description="עשרה שירותים, צוות אחד. אנחנו מתאימים לכל לקוח את התמהיל הנכון לו — ולכיסו — מתוך כל ערוצי הפרסום הקיימים במגזר החרדי והדתי."
      >
        <ButtonLink href="/contact" size="lg">
          לא בטוחים מה מתאים? דברו איתנו
          <ArrowUpLeft className="size-5" aria-hidden />
        </ButtonLink>
      </PageHero>

      {serviceGroups.map((group) => {
        const items = services.filter((s) => s.group === group.id);
        return (
          <section key={group.id} className="pb-20 lg:pb-28">
            <div className="container-page">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/12 pb-5">
                  <h2 className="text-3xl font-extrabold sm:text-4xl">{group.title}</h2>
                  <p className="text-muted">{group.description}</p>
                </div>
              </Reveal>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s, i) => (
                  <Reveal key={s.slug} delay={(i % 3) * 0.06} className="h-full">
                    <ServiceCard service={s} index={services.indexOf(s) + 1} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-y border-ink/10 bg-paper-2/60 py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="איך זה עובד"
            title={
              <>
                מהשיחה הראשונה
                <br />
                <Mark color="magenta">ועד התמונה מהשטח.</Mark>
              </>
            }
          />
          <Process />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
