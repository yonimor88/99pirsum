import type { StaticImageData } from "next/image";

import dianaDesktop from "@/assets/images/sites/diana-desktop.webp";
import dianaDesktopLong from "@/assets/images/sites/diana-desktop-long.webp";
import dianaMobile from "@/assets/images/sites/diana-mobile.webp";
import dianaMobileLong from "@/assets/images/sites/diana-mobile-long.webp";
import gilaDesktop from "@/assets/images/sites/gila-desktop.webp";
import gilaDesktopLong from "@/assets/images/sites/gila-desktop-long.webp";
import gilaMobile from "@/assets/images/sites/gila-mobile.webp";
import gilaMobileLong from "@/assets/images/sites/gila-mobile-long.webp";
import hezkiDesktop from "@/assets/images/sites/hezki-desktop.webp";
import hezkiDesktopLong from "@/assets/images/sites/hezki-desktop-long.webp";
import hezkiMobile from "@/assets/images/sites/hezki-mobile.webp";
import hezkiMobileLong from "@/assets/images/sites/hezki-mobile-long.webp";
import pirsumDesktop from "@/assets/images/sites/99pirsum-desktop.webp";
import pirsumDesktopLong from "@/assets/images/sites/99pirsum-desktop-long.webp";
import pirsumMobile from "@/assets/images/sites/99pirsum-mobile.webp";
import pirsumMobileLong from "@/assets/images/sites/99pirsum-mobile-long.webp";

/**
 * Websites we designed and built. Screenshots are real captures of the live
 * sites: `desktop` / `mobile` are the first screen, the `*Long` captures are
 * full pages that scroll inside the device frames on /websites.
 */
export type Website = {
  slug: string;
  name: string;
  url: string;
  /** What shows in the mock browser's address bar */
  domain: string;
  industry: string;
  headline: string;
  summary: string;
  /** What the business needed */
  challenge: string;
  /** What we built */
  solution: string;
  features: string[];
  /** Brand colours of the site itself */
  palette: string[];
  /** Glow colour behind the devices */
  glow: string;
  shots: {
    desktop: StaticImageData;
    mobile: StaticImageData;
    desktopLong: StaticImageData;
    mobileLong: StaticImageData;
  };
};

export const websites: Website[] = [
  {
    slug: "99pirsum",
    name: "99 פרסום ומדיה",
    url: "https://99pirsum.com",
    domain: "99pirsum.com",
    industry: "פרסום והפצה",
    headline: "מאתר וורדפרס ישן — לאתר שמוכר 24/7.",
    summary:
      "האתר שאתם גולשים בו עכשיו. בנינו אותו מאפס: שפה עיצובית בהשראת עולם הדפוס, עשרות עמודי שירות, אזורי הפצה ומאמרים — וכל דרך ליצור קשר במרחק לחיצה.",
    challenge: "אתר ישן ואיטי שלא שיקף יותר מ-30 שנות ניסיון, ולא הביא פניות מגוגל.",
    solution:
      "36 עמודים מהירים עם תשתית SEO מלאה, עמוד לכל עיר ולכל שירות, מערכת מאמרים ותפריט נגישות מובנה. כל כתובת ישנה מפנה לעמוד החדש — בלי לאבד דירוג.",
    features: ["36 עמודים", "SEO מתקדם", "תפריט נגישות", "בלוג מאמרים", "עמוד לכל עיר", "טופס לוואטסאפ"],
    palette: ["#141414", "#f6f2ea", "#fdbe52", "#0db5e8", "#b357a1", "#49bb82"],
    glow: "#fdbe52",
    shots: { desktop: pirsumDesktop, mobile: pirsumMobile, desktopLong: pirsumDesktopLong, mobileLong: pirsumMobileLong },
  },
  {
    slug: "hezki",
    name: "ענק הברזל",
    url: "https://hezki.vercel.app",
    domain: "hezki.vercel.app",
    industry: "ברזל ופלדה",
    headline: "אתר חזק כמו פלדה.",
    summary:
      "גלריות, מרפסות תלויות ובנייה קלה בשלד פלדה. אתר שמעביר בדיוק את מה שהלקוח צריך לשמוע: איכות, אמינות ו-19 שנות ניסיון בשטח.",
    challenge: "עסק עם עבודות מרשימות בשטח ובלי שום נוכחות ברשת.",
    solution:
      "אתר תדמית עם גלריית פרויקטים, תהליך עבודה מונפש שלב אחר שלב, המלצות לקוחות וטופס שנפתח ישר בוואטסאפ — ו-5 פלטות צבעים שהגולש בוחר בעצמו.",
    features: ["גלריית פרויקטים", "5 פלטות צבעים", "תהליך עבודה מונפש", "טופס לוואטסאפ", "המלצות לקוחות"],
    palette: ["#262d2f", "#efeae4", "#b5532a", "#ff6b1a", "#3cc2ff"],
    glow: "#b5532a",
    shots: { desktop: hezkiDesktop, mobile: hezkiMobile, desktopLong: hezkiDesktopLong, mobileLong: hezkiMobileLong },
  },
  {
    slug: "diana-klein",
    name: "דייאנה קליין",
    url: "https://diana-klein.vercel.app",
    domain: "diana-klein.vercel.app",
    industry: "מוזיקה והופעות",
    headline: "במה דיגיטלית לזמרת והרכב של 8 נגניות.",
    summary:
      "אתר רשמי לזמרת־יוצרת ופסיכולוגית שיקומית, ולהרכב הנשי ״מיתרי הנשמה״. אווירה של אולם הופעות — אורות במה, זהב וחום — כבר מהשנייה הראשונה.",
    challenge: "להעביר ברשת את החוויה הרגשית של מופע חי, ולמלא את האולמות.",
    solution:
      "דף בית קולנועי, לוח הופעות קרובות, גלריית תמונות וסרטונים, בלוג וראיונות — והזמנת ערב שירה בלחיצה אחת.",
    features: ["לוח הופעות", "גלריה וסרטונים", "בלוג וראיונות", "הזמנת מופע", "עיצוב קולנועי"],
    palette: ["#1c1410", "#f3e9dc", "#e9a23b", "#f2c45a", "#6b2a24"],
    glow: "#e9a23b",
    shots: { desktop: dianaDesktop, mobile: dianaMobile, desktopLong: dianaDesktopLong, mobileLong: dianaMobileLong },
  },
  {
    slug: "gila",
    name: "גילה שמעונוב",
    url: "https://gila-face-arts.vercel.app",
    domain: "gila-face-arts.vercel.app",
    industry: "איפור קבוע",
    headline: "אלגנטי, עדין — ומלא בתורים.",
    summary:
      "אתר לאומנית איפור קבוע: גבות, שפתיים, איילינר והסרה. עיצוב יוקרתי ורך, בדיוק כמו התוצאה שהלקוחות שלה מקבלות.",
    challenge: "בתחום שבו הכול ויזואלי, לשכנע לקוחה חדשה לקבוע תור ראשון.",
    solution:
      "סליידר ״לפני ואחרי״ אינטראקטיבי, כרטיס מפורט לכל טיפול, תהליך הטיפול צעד אחר צעד, שאלות נפוצות ותיאום ייעוץ בוואטסאפ — עם בורר פלטות צבעים.",
    features: ["סליידר לפני/אחרי", "4 טיפולים", "תיאום בוואטסאפ", "בורר פלטות", "שאלות נפוצות"],
    palette: ["#2a1f1d", "#fbf3ef", "#d0868b", "#c49a6c", "#f2d5d0"],
    glow: "#d0868b",
    shots: { desktop: gilaDesktop, mobile: gilaMobile, desktopLong: gilaDesktopLong, mobileLong: gilaMobileLong },
  },
];
