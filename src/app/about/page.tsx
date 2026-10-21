import { ArrowUpLeft, Eye, HeartHandshake, ShieldCheck, Target } from "lucide-react";

import { ClientsWall } from "@/components/home/clients-wall";
import { CtaBand, PageHero } from "@/components/layout/page-blocks";
import { ButtonLink } from "@/components/ui/button";
import { PinnedPhoto } from "@/components/ui/pinned-photo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Mark, SectionHeading } from "@/components/ui/section-heading";
import { allCityNames } from "@/content/cities";
import { photos } from "@/content/media";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "מי אנחנו — פרסום למגזר החרדי מאז 1994",
  description:
    "99 פרסום ומדיה — המומחים בפרסום למגזר החרדי והדתי. מאז 1994 מאלעד, עם צוות קבוע, שיתופי פעולה עם הגורמים המובילים בשוק ושירות מהרעיון ועד ההפצה.",
  path: "/about",
});

const timeline = [
  {
    year: String(site.foundingYear),
    title: "ההתחלה באלעד",
    text: "ההיכרות שלנו עם עולם הפרסום במגזר החרדי והדתי מתחילה בעיר אלעד — עם הפצה והדבקה בשטח.",
  },
  {
    year: "השנים שאחרי",
    title: "מכירים את השוק לעומק",
    text: "היכרות אישית ושיתופי פעולה עם הגורמים המובילים בשוק הפרסום והמדיה בציבור החרדי והדתי.",
  },
  {
    year: "היום",
    title: "גורם אחד לכל הפרסום",
    text: "אסטרטגיה, עיצוב, דפוס, שילוט, הפצה ודיגיטל — בכל הריכוזים החרדיים והדתיים בארץ.",
  },
];

const values = [
  { icon: Eye, title: "שקיפות", text: "תמונות מהשטח, פיקוח מדגמי ודיווח. אתם יודעים בדיוק מה נעשה עם התקציב שלכם." },
  { icon: ShieldCheck, title: "אמינות", text: "צוות קבוע שנבחר בקפידה ונבדק על ידינו שוב ושוב — לא עובדים מזדמנים." },
  { icon: Target, title: "מקצועיות", text: "התאמה מדויקת של הערוץ, המסר והתזמון לקהל — מתוך היכרות עמוקה עם המגזר." },
  { icon: HeartHandshake, title: "יחס אישי", text: "״אתם שם תמיד בשבילנו, בשעות לא שעות״ — כך כתבו לנו לקוחות, וזה מה שאנחנו שואפים להיות." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="מי אנחנו"
        title="המומחים בפרסום למגזר החרדי והדתי."
        crumbs={[{ name: "מי אנחנו", path: "/about" }]}
        description={
          <>
            99 פרסום ומדיה מתמחה בפתרונות פרסום שמותאמים לצרכים הייחודיים של המגזר החרדי והדתי בכל רחבי הארץ. עם ניסיון
            עשיר מאז {site.foundingYear} ושיתופי פעולה עם הגורמים המובילים בתחום, אנחנו מבטיחים לכל לקוח שירות ברמה הגבוהה
            ביותר.
          </>
        }
        aside={
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <PinnedPhoto photo={photos.boardReaderTall} rotate={-3} priority imageClassName="aspect-[4/5]" />
            <div className="absolute -bottom-8 -left-4 w-1/2">
              <PinnedPhoto photo={photos.doorHangerTall3} rotate={5} delay={0.2} tape="corners" imageClassName="aspect-[3/4]" />
            </div>
          </div>
        }
      />

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="הסיפור שלנו"
            title={
              <>
                למדנו שלקוח לא צריך
                <br />
                <Mark>עשרה ספקים.</Mark>
              </>
            }
          />
          <div className="space-y-6 text-xl leading-[1.85] text-ink-3">
            <Reveal>
              <p>
                ההיכרות שלנו עם תחום הפרסום במגזר החרדי והדתי החלה בשנת {site.foundingYear} בעיר אלעד. לאורך השנים הכרנו את
                שוק הפרסום וההפצה לעומק — דרך היכרות אישית ושיתופי פעולה עם הגורמים המובילים בשוק הפרסום והמדיה בציבור החרדי
                והדתי.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                ובדרך למדנו משהו חשוב: אין סיבה שמי שרוצה לפרסם יחפש מענה מול כל כך הרבה גורמים. גורם מקצועי אחד, שמנהל את
                הליך הפרסום מתחילתו ועד סופו, חוסך המון טרדות וכאבי ראש מיותרים — ונותן תוצאה טובה יותר.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-display text-2xl font-semibold text-ink">הצלחתכם היא הצלחתנו.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper">
        <div aria-hidden className="halftone absolute inset-0 text-paper/[0.05]" />
        <div className="container-page relative">
          <SectionHeading eyebrow="לאורך הדרך" tone="paper" title="מאלעד, לכל הארץ." />
          <RevealGroup as="ol" className="mt-14 grid gap-6 md:grid-cols-3">
            {timeline.map((t, i) => (
              <RevealItem as="li" key={t.title} className="relative rounded-[1.75rem] border border-paper/12 bg-paper/[0.04] p-8">
                <span
                  className={["absolute top-8 left-8 size-3 rounded-full bg-yellow", "absolute top-8 left-8 size-3 rounded-full bg-green", "absolute top-8 left-8 size-3 rounded-full bg-cyan"][i]}
                  aria-hidden
                />
                <p className="font-display text-4xl font-black text-yellow">{t.year}</p>
                <h3 className="mt-4 font-display text-2xl font-bold">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-paper/70">{t.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="הערך שלנו ללקוחות"
            title={
              <>
                ארבעה דברים
                <br />
                <Mark color="green">שאנחנו לא מוותרים עליהם.</Mark>
              </>
            }
            description="אנחנו מתחייבים להיות שם עבורכם בכל שלב בדרך — ולתת לכם את הכלים והשירותים כדי לבלוט בשוק ולהצליח."
          />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <RevealItem key={v.title} className="rounded-[1.75rem] bg-paper-2 p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-ink text-paper">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Team + where */}
      <section className="border-y border-ink/10 bg-paper-2/60 py-24">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-4xl font-extrabold sm:text-5xl">הצוות שלנו</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-3">
              הצוות של 99 פרסום ומדיה מורכב ממומחים בתחומים שונים של פרסום ומדיה, עם ידע וניסיון רב בעולם החרדי והדתי —
              מהסטודיו ועד הצוות שמפיץ ומדביק בשטח. כל אחד מאיתנו מחויב להצלחה של הלקוחות שלנו ולהבאת המותגים שלהם לקדמת
              הבמה.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl font-extrabold sm:text-5xl">איפה תמצאו אותנו</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-3">
              אנחנו פועלים בכל הערים המרכזיות במגזר החרדי והדתי, ובכל אזור עם ריכוז חרדי ודתי. המשרד שלנו נמצא ב{site.address.full}.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {allCityNames.map((c) => (
                <li key={c} className="rounded-full border border-ink/15 bg-paper px-4 py-1.5 font-display font-semibold">
                  {c}
                </li>
              ))}
            </ul>
            <ButtonLink href="/areas" variant="outline" className="mt-8">
              לנתוני ההפצה בכל עיר
              <ArrowUpLeft className="size-4" aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page mb-10 text-center">
          <Reveal>
            <p className="eyebrow justify-center">בין לקוחותינו</p>
          </Reveal>
        </div>
        <ClientsWall />
      </section>

      <CtaBand title="בואו נכיר." text="ספרו לנו על העסק שלכם ועל מה שאתם רוצים להשיג. אנחנו נדאג לכל השאר." />
    </>
  );
}
