import { ArrowDown, ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";

import { RegMark } from "@/components/brand/ornaments";
import { Breadcrumbs, Faq } from "@/components/layout/page-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonAnchor } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Marquee } from "@/components/ui/marquee";
import { Misregistered } from "@/components/ui/misregistered";
import { Reveal } from "@/components/ui/reveal";
import { Mark, SectionHeading } from "@/components/ui/section-heading";
import { Capabilities, type Score } from "@/components/websites/capabilities";
import { HeroDeck } from "@/components/websites/hero-deck";
import { MotionScope } from "@/components/websites/motion-scope";
import { ProcessSteps } from "@/components/websites/process-steps";
import { ProjectScene } from "@/components/websites/project-scene";
import { YourSiteNext } from "@/components/websites/your-site-next";
import { lite, photos } from "@/content/media";
import { whatsappLink } from "@/content/site";
import { websites } from "@/content/websites";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "אתרים שבנינו: תיק עבודות בניית אתרים",
  description:
    "אתרים שעיצבנו ובנינו לעסקים: מהירים, מותאמים לנייד, עם ציון SEO מושלם בגוגל ופניות ישר לוואטסאפ. צפו בעבודות וקבלו הצעת מחיר לאתר לעסק שלכם.",
  path: "/websites",
  image: {
    src: websites[0].shots.desktop.src,
    width: websites[0].shots.desktop.width,
    height: websites[0].shots.desktop.height,
    alt: "אתרים שבנינו — 99 פרסום ומדיה",
  },
});

/*
 * Google Lighthouse, desktop, measured on the live sites in November 2026.
 * SEO and best practices were 100 on all four, on mobile too.
 */
const scores: Score[] = [
  { label: "ביצועים", value: 96 },
  { label: "נגישות", value: 96 },
  { label: "שיטות עבודה", value: 100 },
  { label: "קידום בגוגל", value: 100 },
];

const faq = [
  {
    q: "כמה עולה לבנות אתר?",
    a: "זה תלוי בהיקף: דף נחיתה, אתר תדמית או אתר עם עמודי שירות ובלוג. אחרי שיחה קצרה על העסק נשלח לכם הצעת מחיר מסודרת וברורה.",
  },
  {
    q: "האתר יופיע בגוגל?",
    a: "כל אתר נבנה כך שגוגל יבין אותו: כותרת ותיאור לכל עמוד, מבנה מסודר ומהירות טעינה גבוהה. כל האתרים בעמוד הזה קיבלו ציון 100 בבדיקת הקידום של גוגל.",
  },
  {
    q: "האתר יהיה מהיר ויציב?",
    a: "כן. כל אתר נבנה במיוחד בשבילכם, בלי תבניות כבדות ובלי תוספים מיותרים — כך שהוא נטען מהר, עובד חלק בכל מכשיר ונשאר יציב.",
  },
  {
    q: "כבר יש לי אתר. אפשר לשדרג אותו?",
    a: "בהחלט. כך בדיוק נבנה 99pirsum.com: האתר הישן בוורדפרס הוחלף באתר חדש ומהיר, וכל הכתובות הישנות מפנות לעמודים החדשים — כדי לא לאבד את הדירוג בגוגל.",
  },
  {
    q: "איך הלקוחות יוצרים איתי קשר דרך האתר?",
    a: "כפתורי וואטסאפ וחיוג בכל עמוד, וטופס יצירת קשר שמגיע ישר אליכם — למייל או לוואטסאפ. כל פנייה מגיעה למקום אחד.",
  },
];

const ticker = ["עיצוב אישי", "מהירות", "קידום בגוגל", "מותאם לנייד", "נגישות", "פניות לוואטסאפ", "אנימציות", "חוויית משתמש"];

export default function WebsitesPage() {
  return (
    <MotionScope>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-20">
        <div aria-hidden className="halftone halftone-fade absolute -top-24 -left-24 size-[28rem] text-ink/12" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ name: "אתרים שבנינו", path: "/websites" }]} />
          <div className="mt-8 grid items-center gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
            <div>
              <p className="eyebrow intro-rise">
                <RegMark className="size-4" />
                סטודיו לבניית אתרים
              </p>
              <h1 className="mt-4 text-[2.7rem] leading-[1.02] font-black tracking-tight sm:text-6xl lg:text-[4.6rem]">
                <Misregistered>אתרים שגורמים ללקוחות</Misregistered>{" "}
                <Mark color="yellow">להרים טלפון.</Mark>
              </h1>
              <p className="intro-rise mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={{ "--intro-delay": "0.15s" } as CSSProperties}>
                אנחנו מעצבים ובונים אתרים מהירים, ממותגים עד הפרט האחרון ומותאמים לנייד — לעסקים שרוצים להיראות הכי טוב שיש, ולקבל
                פניות. הנה כמה מהאתרים שבנינו.
              </p>
              <div className="intro-rise mt-8 flex flex-wrap gap-3" style={{ "--intro-delay": "0.25s" } as CSSProperties}>
                <ButtonAnchor
                  href={whatsappLink("שלום, ראיתי את האתרים שבניתם ואשמח לשמוע על אתר לעסק שלי")}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                >
                  <WhatsAppIcon className="size-5 text-whatsapp" />
                  אני רוצה אתר כזה
                </ButtonAnchor>
                <ButtonAnchor href="#projects" variant="outline" size="lg">
                  לעבודות
                  <ArrowDown className="size-5" aria-hidden />
                </ButtonAnchor>
              </div>
              <dl className="intro-rise mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl bg-ink/10" style={{ "--intro-delay": "0.35s" } as CSSProperties}>
                <div className="bg-paper p-4">
                  <dt className="text-xs text-muted sm:text-sm">ציון SEO בכל האתרים</dt>
                  <dd className="mt-1 font-display text-3xl font-black tabular-nums sm:text-4xl">
                    <Counter value={100} />
                  </dd>
                </div>
                <div className="bg-paper p-4">
                  <dt className="text-xs text-muted sm:text-sm">ממוצע מהירות במחשב</dt>
                  <dd className="mt-1 font-display text-3xl font-black tabular-nums sm:text-4xl">
                    <Counter value={96} />
                  </dd>
                </div>
                <div className="bg-paper p-4">
                  <dt className="text-xs text-muted sm:text-sm">תבניות מוכנות</dt>
                  <dd className="mt-1 font-display text-3xl font-black tabular-nums sm:text-4xl">0</dd>
                </div>
              </dl>
            </div>
            <HeroDeck
              sites={websites.map(({ slug, name, domain, industry, glow, shots }) => ({
                slug,
                name,
                domain,
                industry,
                glow,
                shots: { desktop: shots.desktop, mobile: shots.mobile },
              }))}
            />
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div aria-hidden className="relative z-10 overflow-hidden py-6">
        <div className="-rotate-[1.5deg] scale-x-[1.04] bg-yellow py-3.5 text-ink sm:py-4">
          <Marquee duration="45s" trackClassName="gap-7 pe-7">
            {ticker.map((t) => (
              <span key={t} className="flex items-center gap-7">
                <span className="font-display text-xl font-bold whitespace-nowrap sm:text-2xl">{t}</span>
                <span className="text-xl">✦</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Projects */}
      <section id="projects" aria-labelledby="projects-title" className="relative -mt-4 overflow-x-clip rounded-t-[2.5rem] bg-ink pt-20 text-paper lg:pt-28">
        <div aria-hidden className="halftone absolute inset-x-0 top-0 h-96 text-paper/[0.06] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-page relative">
          <SectionHeading
            tone="paper"
            eyebrow="תיק עבודות"
            title={
              <span id="projects-title">
                ארבעה עסקים. <span className="text-yellow">ארבעה עולמות.</span>
              </span>
            }
            description="גללו לאט — האתרים זזים בתוך המסכים בדיוק כמו אצל הגולשים. כל מה שאתם רואים הוא צילום של האתר החי."
          />
        </div>
        <div className="relative pb-24 lg:pb-10">
          {websites.map((site, i) => (
            <ProjectScene key={site.slug} site={site} index={i} total={websites.length} />
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="מה כל אתר מקבל"
            title={
              <>
                לא רק יפה. <Mark color="cyan">בנוי להביא לקוחות.</Mark>
              </>
            }
            description="מאחורי כל אתר שבנינו עומדת אותה רשימת בדיקות — כדי שהאתר יעבוד בשבילכם, לא רק ייראה טוב."
          />
          <div className="mt-12">
            <Capabilities
              scores={scores}
              scoreNote="ממוצע ארבעת האתרים בבדיקת Google Lighthouse במחשב, נובמבר 2026."
              palettes={websites.map((w) => w.palette)}
              fieldPhoto={lite(photos.doorHanger)}
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="pb-20 lg:pb-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="איך זה עובד"
            title={
              <>
                מהשיחה הראשונה <Mark color="magenta">ועד שהאתר באוויר.</Mark>
              </>
            }
          />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-8">
        <div className="container-page max-w-4xl">
          <Reveal>
            <Faq items={faq} title="שאלות על בניית אתרים" />
          </Reveal>
          <Reveal className="mt-10">
            <Link href="/services/web-digital" className="link-underline inline-flex items-center gap-2 font-display text-lg font-semibold">
              עוד על שירות בניית האתרים שלנו
              <ArrowUpLeft className="size-5" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <YourSiteNext />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "אתרים שבנינו",
          url: absoluteUrl("/websites"),
          about: { "@id": absoluteUrl("/#business") },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: websites.map((w, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "WebSite", name: w.name, url: w.url },
            })),
          },
        }}
      />
    </MotionScope>
  );
}
