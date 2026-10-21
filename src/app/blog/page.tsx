import { PostCard } from "@/components/blog/post-card";
import { CtaBand, PageHero } from "@/components/layout/page-blocks";
import { Reveal } from "@/components/ui/reveal";
import { posts } from "@/content/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "מאמרים וטיפים",
  description:
    "מדריכים, טיפים ואסטרטגיות לפרסום אפקטיבי במגזר החרדי והדתי: הפצה בתיבות דואר, מודעות רחוב, תלי דלת, בתי כנסת ותכנון קמפיין.",
  path: "/blog",
});

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero
        eyebrow="מאמרים וטיפים"
        title="כל מה שרציתם לדעת על פרסום במגזר."
        crumbs={[{ name: "מאמרים", path: "/blog" }]}
        description="מדריכים, טיפים ואסטרטגיות מהשטח — כדי שהפרסום הבא שלכם יעבוד טוב יותר."
      />
      <section className="pb-24">
        <div className="container-page">
          <Reveal>
            <PostCard post={featured} featured />
          </Reveal>
          <div className="mt-16 grid gap-x-8 gap-y-14 border-t border-ink/10 pt-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
