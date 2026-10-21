import { ArrowUpLeft } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { PinnedPhoto } from "@/components/ui/pinned-photo";
import { Mark, SectionHeading } from "@/components/ui/section-heading";
import { photos } from "@/content/media";

const wall = [
  { photo: photos.boardPosterCrew, rotate: -3, caption: "סבב הדבקה בשטח", className: "col-span-6 lg:col-span-5" },
  { photo: photos.doorHanger, rotate: 4, caption: "תלי דלת", className: "col-span-6 lg:col-span-3 lg:mt-16" },
  { photo: photos.synagogueLeaflets, rotate: -2, caption: "עלוני שבת", className: "col-span-6 lg:col-span-4 lg:mt-6" },
  { photo: photos.billboardSorgad, rotate: 3, caption: "שלט חוצות", className: "col-span-6 lg:col-span-4 lg:-mt-6" },
  { photo: photos.mailboxes, rotate: -4, caption: "הפצה בתיבות דואר", className: "col-span-6 lg:col-span-4 lg:mt-10" },
  { photo: photos.entranceBoard, rotate: 2.5, caption: "כניסות בניינים", className: "col-span-6 lg:col-span-4" },
];

export function FieldWall() {
  return (
    <section className="relative overflow-hidden bg-paper-2 py-24 lg:py-32">
      <div aria-hidden className="halftone absolute inset-0 text-ink/[0.07]" />
      <div className="container-page relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index="04"
            eyebrow="מהשטח"
            title={
              <>
                לא סטוק. <Mark color="cyan">תמונות אמיתיות</Mark>
                <br />
                מהעבודה שלנו.
              </>
            }
            description="ככה זה נראה אחרי שאנחנו עוברים בעיר: לוחות מסודרים, דלתות עם תלי, תיבות מלאות ועלונים שמחכים על השולחן."
          />
          <ButtonLink href="/work" variant="outline">
            לכל התמונות מהשטח
            <ArrowUpLeft className="size-4" aria-hidden />
          </ButtonLink>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-10 sm:gap-x-8 lg:gap-x-10 lg:gap-y-14">
          {wall.map((w, i) => (
            <div key={w.caption} className={w.className}>
              <PinnedPhoto
                photo={w.photo}
                rotate={w.rotate}
                caption={w.caption}
                delay={(i % 3) * 0.08}
                imageClassName="aspect-[4/3]"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
