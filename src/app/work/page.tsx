import { CtaBand, PageHero } from "@/components/layout/page-blocks";
import { FilterableGallery } from "@/components/work/filterable-gallery";
import { gallery, noBlur } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "תמונות מהשטח: הפצה, הדבקת מודעות ושילוט",
  description:
    "תמונות אמיתיות מהעבודה של 99 פרסום ומדיה: לוחות מודעות, כניסות בניינים, תלי דלת, תיבות דואר, בתי כנסת ושילוט.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="מהשטח"
        title="תמונות מהשטח: הפצה, הדבקה ושילוט."
        crumbs={[{ name: "מהשטח", path: "/work" }]}
        description="ככה זה נראה בשטח — לא סטוק ולא הדמיות. אלה תמונות מעבודות שביצענו — מהסוג שנשלח ללקוחות שלנו לוואטסאפ אחרי כל סבב."
      />
      <section className="pb-20">
        <div className="container-page">
          <FilterableGallery items={gallery.map((g) => ({ ...g, src: noBlur(g.src) }))} />
        </div>
      </section>
      <CtaBand title="רוצים לראות את המודעה שלכם כאן?" text="ספרו לנו מה אתם רוצים לפרסם ונחזור אליכם עם הצעה. את התמונות מהשטח תקבלו ישר לוואטסאפ." />
    </>
  );
}
