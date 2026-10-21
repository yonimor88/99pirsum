import { ArrowUpLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReadingProgress, ShareButtons } from "@/components/blog/article-chrome";
import { PostCard } from "@/components/blog/post-card";
import { Dots } from "@/components/brand/ornaments";
import { Breadcrumbs, CtaBand } from "@/components/layout/page-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Misregistered } from "@/components/ui/misregistered";
import { Reveal } from "@/components/ui/reveal";
import { formatHebrewDate, getPost, posts } from "@/content/posts";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const meta = pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    image: { src: post.cover.src.src, width: post.cover.src.width, height: post.cover.src.height, alt: post.cover.alt },
  });
  return {
    ...meta,
    // Long article titles skip the brand suffix so search results don't truncate them
    title: post.title.length > 44 ? { absolute: post.title } : post.title,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const service = getService(post.relatedService);
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const url = absoluteUrl(`/blog/${post.slug}`);

  return (
    <>
      <ReadingProgress />
      <article>
        <header className="relative overflow-hidden pt-28 pb-10 sm:pt-32 lg:pt-36">
          <div aria-hidden className="halftone halftone-fade absolute -top-24 -left-24 size-[26rem] text-ink/12" />
          <div className="container-page relative max-w-4xl">
            <Breadcrumbs
              items={[
                { name: "מאמרים", path: "/blog" },
                { name: post.title, path: `/blog/${post.slug}` },
              ]}
            />
            <Reveal>
              <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow px-3 py-1 font-display text-sm font-bold">
                {post.category}
              </p>
            </Reveal>
            <h1 className="mt-5 text-4xl leading-[1.08] font-black tracking-tight sm:text-5xl lg:text-6xl">
              <Misregistered>{post.title}</Misregistered>
            </h1>
            <Reveal delay={0.1}>
              <p className="mt-6 text-xl leading-relaxed text-muted">{post.description}</p>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-4">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
                  <span className="font-display font-semibold text-ink">{site.name}</span>
                  <time dateTime={post.date}>{formatHebrewDate(post.date)}</time>
                  {post.updated && <span>עודכן: {formatHebrewDate(post.updated)}</span>}
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" aria-hidden />
                    {post.minutes} דקות קריאה
                  </span>
                </div>
                <ShareButtons url={url} title={post.title} />
              </div>
            </Reveal>
          </div>
        </header>

        <Reveal className="container-page max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-paper-2">
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="container-page grid max-w-6xl gap-12 py-16 lg:grid-cols-[15rem_1fr] lg:gap-16 lg:py-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="font-display text-sm font-bold text-muted">בכתבה</p>
              <ol className="mt-4 space-y-1 border-s border-ink/10">
                {post.toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="-ms-px block border-s-2 border-transparent py-1.5 ps-4 text-sm leading-snug text-muted transition hover:border-ink hover:text-ink">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
              {service && (
                <Link
                  href={`/services/${service.slug}`}
                  className="group mt-8 block rounded-2xl bg-ink p-5 text-paper"
                >
                  <Dots />
                  <p className="mt-3 text-sm text-paper/60">שירות קשור</p>
                  <p className="mt-1 font-display text-lg font-bold">{service.title}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-yellow">
                    לפרטים
                    <ArrowUpLeft className="size-4" aria-hidden />
                  </span>
                </Link>
              )}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="prose-99" dangerouslySetInnerHTML={{ __html: post.html }} />

            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] bg-paper-2 p-6 sm:p-8">
              <div>
                <p className="font-display text-2xl font-bold">רוצים ליישם את זה בעסק שלכם?</p>
                <p className="mt-1 text-muted">נשמח לבנות לכם תוכנית פרסום מותאמת.</p>
              </div>
              <ButtonLink href="/contact">
                לקבלת הצעת מחיר
                <ArrowUpLeft className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-ink/10 py-20">
        <div className="container-page">
          <h2 className="text-3xl font-extrabold sm:text-4xl">עוד מאמרים</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: absoluteUrl(post.cover.src.src),
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          inLanguage: "he",
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@id": absoluteUrl("/#business"), name: site.name },
        }}
      />
    </>
  );
}
