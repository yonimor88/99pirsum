import { extractToc, readingMinutes, renderMarkdown } from "@/lib/markdown";
import { photos, type Photo } from "../media";
import { body as buildingEntrancePosters } from "./building-entrance-posters";
import { body as distributionPricing } from "./distribution-pricing";
import { body as doorHangersGuide } from "./door-hangers-guide";
import { body as fridgeMagnets } from "./fridge-magnets";
import { body as harediAdvertisingGuide } from "./haredi-advertising-guide";
import { body as harediCampaignPlanning } from "./haredi-campaign-planning";
import { body as harediMailboxDistribution } from "./haredi-mailbox-distribution";
import { body as streetPosterDesignRules } from "./street-poster-design-rules";
import { body as synagogueShabbatLeaflets } from "./synagogue-shabbat-leaflets";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  updated?: string;
  cover: Photo;
  relatedService: string;
};

type PostSource = PostMeta & { body: string };

/** Newest first. To add an article: create a file in this folder and add an entry here. */
const sources: PostSource[] = [
  {
    slug: "haredi-advertising-guide",
    title: "פרסום במגזר החרדי: המדריך המלא לעסקים",
    description:
      "מי הקהל, איפה הוא נמצא, אילו ערוצים באמת מגיעים אליו ומתי לפרסם — המדריך המלא לפרסום במגזר החרדי והדתי, מניסיון בשטח מאז 1994.",
    category: "מדריך",
    date: "2026-10-22",
    cover: photos.boardReader,
    relatedService: "advertising-branding",
    body: harediAdvertisingGuide,
  },
  {
    slug: "distribution-pricing",
    title: "כמה עולה הפצת עלונים? 7 דברים שקובעים את המחיר",
    description:
      "ערוץ, כמות, עיר, סוג החומר ותזמון — כל מה שמשפיע על מחיר הפצת עלונים, תלי דלת והדבקת מודעות, ואיך להשוות נכון בין הצעות מחיר.",
    category: "הפצה",
    date: "2026-10-22",
    cover: photos.doorDrop,
    relatedService: "mailbox-distribution",
    body: distributionPricing,
  },
  {
    slug: "fridge-magnets",
    title: "מגנטים למקרר לעסקים: הפרסום שנשאר במטבח",
    description:
      "למה מגנט מקרר הוא אחד מכלי הפרסום הכי ארוכי טווח, אילו גדלים יש, איך מעצבים מגנט שנשאר על המקרר ואיך הוא מגיע לשם.",
    category: "דפוס",
    date: "2026-10-22",
    cover: photos.doorHanger2,
    relatedService: "printing",
    body: fridgeMagnets,
  },
  {
    slug: "haredi-campaign-planning",
    title: "איך לתכנן קמפיין פרסום במגזר החרדי: מדריך צעד אחר צעד",
    description:
      "מטרה, קהל, ערוצים, תקציב ותזמון — חמישה צעדים לקמפיין שמגיע לקהל החרדי והדתי ומביא תוצאות.",
    category: "אסטרטגיה",
    date: "2026-10-21",
    cover: photos.boardPosterCrew,
    relatedService: "advertising-branding",
    body: harediCampaignPlanning,
  },
  {
    slug: "street-poster-design-rules",
    title: "7 כללים למודעת רחוב שעוצרת את העוברים ושבים",
    description:
      "לוח המודעות הוא אחד הערוצים החזקים במגזר החרדי — אבל רק אם המודעה בולטת. שבעה כללים מהשטח למודעה שקוראים.",
    category: "עיצוב",
    date: "2026-10-21",
    cover: photos.boardChesed,
    relatedService: "poster-boards",
    body: streetPosterDesignRules,
  },
  {
    slug: "synagogue-shabbat-leaflets",
    title: "פרסום בבתי כנסת: איך לנצל את הרגע השקט של השבת",
    description:
      "בשבת יש לקהל זמן לקרוא. כל מה שצריך לדעת על עלונים ומודעות בבתי כנסת ובמקוואות — מתי, איפה ואיך.",
    category: "הפצה",
    date: "2026-10-21",
    cover: photos.synagogueLeaflets2,
    relatedService: "synagogues",
    body: synagogueShabbatLeaflets,
  },
  {
    slug: "door-hangers-guide",
    title: "תלי דלת: הפרסום שנכנס הביתה (ונשאר על המקרר)",
    description:
      "למה תלי דלת מביא כל כך הרבה לידים, למי הוא מתאים וכמה זמן לוקחת חלוקה מסודרת.",
    category: "הפצה",
    date: "2026-10-21",
    cover: photos.doorHanger,
    relatedService: "door-hangers",
    body: doorHangersGuide,
  },
  {
    slug: "building-entrance-posters",
    title: "הדבקת מודעות בכניסות בניינים: הפרסום שאף אחד לא מפספס",
    description:
      "מודעה בכניסה לבניין נראית על ידי כל דייר, כמה פעמים ביום. כל מה שצריך לדעת על הערוץ המשתלם הזה — ואיך להפיק ממנו את המקסימום.",
    category: "מודעות",
    date: "2024-10-30",
    updated: "2026-10-21",
    cover: photos.entranceBoard,
    relatedService: "building-entrances",
    body: buildingEntrancePosters,
  },
  {
    slug: "haredi-mailbox-distribution",
    title: "הפצה בתיבות דואר למגזר החרדי: המדריך המלא",
    description:
      "למה תיבת הדואר עדיין עובדת כל כך טוב בציבור החרדי, איך מתכננים הפצה נכונה ומה לבדוק לפני שבוחרים חברת הפצה.",
    category: "הפצה",
    date: "2024-10-27",
    updated: "2026-10-21",
    cover: photos.mailboxes,
    relatedService: "mailbox-distribution",
    body: harediMailboxDistribution,
  },
];

export const posts: PostMeta[] = sources.map((source) => {
  const meta: PostMeta & { body?: string } = { ...source };
  delete meta.body;
  return meta;
});

export function getPost(slug: string) {
  const source = sources.find((p) => p.slug === slug);
  if (!source) return undefined;
  const { body, ...meta } = source;
  return {
    ...meta,
    html: renderMarkdown(body),
    toc: extractToc(body),
    minutes: readingMinutes(body),
  };
}

export function formatHebrewDate(iso: string) {
  return new Intl.DateTimeFormat("he-IL", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${iso}T12:00:00Z`),
  );
}
