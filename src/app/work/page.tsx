import { CtaBand, PageHero } from "@/components/layout/page-blocks";
import { FilterableGallery } from "@/components/work/filterable-gallery";
import { gallery } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "תמונות מהשטח",
  description:
    "תמונות אמיתיות מהעבודה של 99 פרסום ומדיה: לוחות מודעות, כניסות בניינים, תלי דלת, תיבות דואר, בתי כנסת ושילוט.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="מהשטח"
        title="ככה זה נראה בשטח."
        crumbs={[{ name: "מהשטח", path: "/work" }]}
        description="לא סטוק ולא הדמיות. אלה תמונות מעבודות שביצענו — מהסוג שנשלח ללקוחות שלנו לוואטסאפ אחרי כל סבב."
      />
      <section className="pb-20">
        <div className="container-page">
          <FilterableGallery items={gallery} />
        </div>
      </section>
      <CtaBand title="רוצים לראות את המודעה שלכם כאן?" text="ספרו לנו מה אתם רוצים לפרסם ונחזור אליכם עם הצעה. את התמונות מהשטח תקבלו ישר לוואטסאפ." />
    </>
  );
}
