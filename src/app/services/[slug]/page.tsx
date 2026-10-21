import { ArrowUpLeft, Check, Phone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/blog/post-card";
import { ContactForm } from "@/components/contact/contact-form";
import { CtaBand, Faq, PageHero } from "@/components/layout/page-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceCard } from "@/components/services/service-card";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { ServiceGlyph, WhatsAppIcon } from "@/components/ui/icons";
import { PhotoGrid } from "@/components/ui/photo-grid";
import { PinnedPhoto } from "@/components/ui/pinned-photo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { posts } from "@/content/posts";
import { accentBg } from "@/content/service-nav";
import { lite } from "@/content/media";
import { getService, services } from "@/content/services";
import { primaryPhone, site, whatsappLink } from "@/content/site";
import { cn } from "@/lib/cn";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: {
      src: service.hero.src.src,
      width: service.hero.src.width,
      height: service.hero.src.height,
      alt: service.hero.alt,
    },
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related.map((r) => getService(r)).filter((s) => s !== undefined);
  const articles = posts.filter((p) => p.relatedService === service.slug || service.related.includes(p.relatedService)).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.headline}
        crumbs={[
          { name: "שירותים", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        description={service.summary}
        aside={
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <PinnedPhoto photo={service.hero} rotate={2.5} priority imageClassName="aspect-[4/3]" sizes="(min-width: 1024px) 45vw, 90vw" />
            <span
              className={cn(
                "absolute -bottom-6 -right-4 grid size-20 -rotate-6 place-items-center rounded-3xl text-ink shadow-xl",
                accentBg[service.accent],
              )}
            >
              <ServiceGlyph icon={service.icon} className="size-9" />
            </span>
          </div>
        }
      >
        <ButtonLink href="#quote" size="lg">
          לקבלת הצעת מחיר
          <ArrowUpLeft className="size-5" aria-hidden />
        </ButtonLink>
        <ButtonAnchor href={whatsappLink(`שלום, אשמח לשמוע פרטים על ${service.title}`)} target="_blank" rel="noopener noreferrer" variant="outline" size="lg">
          <WhatsAppIcon className="size-5 text-green-ink group-hover/btn:text-paper" />
          וואטסאפ
        </ButtonAnchor>
      </PageHero>

      {/* Facts strip */}
      <section className="pb-16">
        <div className="container-page">
          <RevealGroup className="grid gap-px overflow-hidden rounded-[1.75rem] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {service.facts.map((f) => (
              <RevealItem key={f.label} className="bg-paper-2 p-6">
                <p className="text-sm text-muted">{f.label}</p>
                <p className="mt-2 font-display text-xl leading-snug font-bold">{f.value}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Intro + sticky contact */}
      <section className="pb-20 lg:pb-28">
        <div className="container-page grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <div className="space-y-6 text-xl leading-[1.85] text-ink-3">
              {service.intro.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={cn(i === 0 && "font-display text-2xl leading-relaxed font-medium text-ink")}>{p}</p>
                </Reveal>
              ))}
            </div>

            {service.sections?.map((sec) => (
              <Reveal key={sec.title} className="mt-14">
                <h2 className="text-3xl font-extrabold">{sec.title}</h2>
                {sec.paragraphs?.map((p) => (
                  <p key={p} className="mt-4 text-lg leading-relaxed text-ink-3">
                    {p}
                  </p>
                ))}
                {sec.bullets && (
                  <ul className="mt-5 grid gap-3">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-lg">
                        <span className={cn("mt-1 grid size-6 shrink-0 place-items-center rounded-full text-ink", accentBg[service.accent])}>
                          <Check className="size-3.5" strokeWidth={3} aria-hidden />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {sec.note && <p className="mt-5 rounded-2xl bg-paper-2 p-5 leading-relaxed text-muted">{sec.note}</p>}
              </Reveal>
            ))}
          </div>

          <aside className="lg:pt-2">
            <div className="sticky top-28 rounded-[1.75rem] bg-ink p-7 text-paper">
              <p className="font-display text-sm text-paper/60">רוצים לשמוע עוד?</p>
              <p className="mt-2 font-display text-2xl font-bold">מדברים איתנו ישירות.</p>
              <p className="mt-3 text-paper/70">נשמח להתאים לכם את השירות ולתת הצעת מחיר מסודרת.</p>
              <div className="mt-6 grid gap-3">
                <ButtonAnchor href={primaryPhone.href} variant="paper" size="lg" className="w-full">
                  <Phone className="size-5" aria-hidden />
                  <span dir="ltr" className="tabular-nums">
                    {primaryPhone.display}
                  </span>
                </ButtonAnchor>
                <ButtonAnchor
                  href={whatsappLink(`שלום, אשמח לשמוע פרטים על ${service.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                >
                  <WhatsAppIcon className="size-5" />
                  וואטסאפ
                </ButtonAnchor>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-ink/10 bg-paper-2/60 py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-2xl text-4xl leading-tight font-extrabold sm:text-5xl">
              מה מקבלים כשעובדים איתנו
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <RevealItem key={f.title} className="group relative rounded-[1.5rem] bg-paper p-7 transition-colors hover:bg-white">
                <span className="font-display text-sm font-bold text-muted-2 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-2xl font-bold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{f.text}</p>
                <span className={cn("absolute top-7 left-7 size-3 rounded-full transition-transform group-hover:scale-150", accentBg[service.accent])} aria-hidden />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Video */}
      {service.video && (
        <section className="py-20 lg:py-28">
          <div className="container-page">
            <Reveal>
              <figure className="overflow-hidden rounded-[2rem] bg-ink">
                <video
                  className="aspect-video w-full object-cover"
                  src={service.video.src}
                  poster={service.video.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={service.video.caption}
                />
                <figcaption className="p-5 text-center text-paper/70">{service.video.caption}</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      {/* Gallery */}
      {service.gallery.length > 0 && (
        <section className={cn(service.video ? "pb-20 lg:pb-28" : "py-20 lg:py-28")}>
          <div className="container-page">
            <Reveal>
              <h2 className="text-4xl font-extrabold sm:text-5xl">מהשטח</h2>
              <p className="mt-3 text-lg text-muted">תמונות אמיתיות מעבודות שביצענו.</p>
            </Reveal>
            <PhotoGrid photos={[service.hero, ...service.gallery].map(lite)} className="mt-10" />
          </div>
        </section>
      )}

      {/* FAQ + form */}
      <section id="quote" className="border-t border-ink/10 py-20 lg:py-28">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Faq items={service.faqs} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] bg-paper-2 p-6 sm:p-10">
              <h2 className="font-display text-3xl font-bold">הצעת מחיר ל{service.title}</h2>
              <p className="mt-2 text-muted">השאירו פרטים ונחזור אליכם בהקדם.</p>
              <div className="mt-7">
                <ContactForm defaultService={service.title} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related articles */}
      {articles.length > 0 && (
        <section className="pb-20">
          <div className="container-page">
            <Reveal>
              <h2 className="text-3xl font-extrabold sm:text-4xl">מאמרים שכדאי לקרוא</h2>
            </Reveal>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="pb-8">
        <div className="container-page">
          <Reveal>
            <h2 className="text-3xl font-extrabold sm:text-4xl">שירותים שמשתלבים</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.06} className="h-full">
                <ServiceCard service={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.metaDescription,
          serviceType: service.title,
          url: absoluteUrl(`/services/${service.slug}`),
          image: absoluteUrl(service.hero.src.src),
          provider: { "@id": absoluteUrl("/#business"), name: site.name },
          areaServed: { "@type": "Country", name: "ישראל" },
        }}
      />
    </>
  );
}
