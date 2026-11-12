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
import hanezerDesktop from "@/assets/images/sites/hanezer-desktop.webp";
import hanezerDesktopLong from "@/assets/images/sites/hanezer-desktop-long.webp";
import hanezerMobile from "@/assets/images/sites/hanezer-mobile.webp";
import hanezerMobileLong from "@/assets/images/sites/hanezer-mobile-long.webp";
import stamDesktop from "@/assets/images/sites/stam-desktop.webp";
import stamDesktopLong from "@/assets/images/sites/stam-desktop-long.webp";
import stamMobile from "@/assets/images/sites/stam-mobile.webp";
import stamMobileLong from "@/assets/images/sites/stam-mobile-long.webp";
import lishkatDesktop from "@/assets/images/sites/lishkat-desktop.webp";
import lishkatDesktopLong from "@/assets/images/sites/lishkat-desktop-long.webp";
import lishkatMobile from "@/assets/images/sites/lishkat-mobile.webp";
import lishkatMobileLong from "@/assets/images/sites/lishkat-mobile-long.webp";
import shachorDesktop from "@/assets/images/sites/shachor-desktop.webp";
import shachorDesktopLong from "@/assets/images/sites/shachor-desktop-long.webp";
import shachorMobile from "@/assets/images/sites/shachor-mobile.webp";
import shachorMobileLong from "@/assets/images/sites/shachor-mobile-long.webp";
import kitchenDesktop from "@/assets/images/sites/kitchen-desktop.webp";
import kitchenDesktopLong from "@/assets/images/sites/kitchen-desktop-long.webp";
import kitchenMobile from "@/assets/images/sites/kitchen-mobile.webp";
import kitchenMobileLong from "@/assets/images/sites/kitchen-mobile-long.webp";
import neveDesktop from "@/assets/images/sites/neve-desktop.webp";
import neveDesktopLong from "@/assets/images/sites/neve-desktop-long.webp";
import neveMobile from "@/assets/images/sites/neve-mobile.webp";
import neveMobileLong from "@/assets/images/sites/neve-mobile-long.webp";
import adashaDesktop from "@/assets/images/sites/adasha-desktop.webp";
import adashaDesktopLong from "@/assets/images/sites/adasha-desktop-long.webp";
import adashaMobile from "@/assets/images/sites/adasha-mobile.webp";
import adashaMobileLong from "@/assets/images/sites/adasha-mobile-long.webp";
import chevyonDesktop from "@/assets/images/sites/chevyon-desktop.webp";
import chevyonDesktopLong from "@/assets/images/sites/chevyon-desktop-long.webp";
import chevyonMobile from "@/assets/images/sites/chevyon-mobile.webp";
import chevyonMobileLong from "@/assets/images/sites/chevyon-mobile-long.webp";
import pirsumDesktop from "@/assets/images/sites/99pirsum-desktop.webp";
import pirsumDesktopLong from "@/assets/images/sites/99pirsum-desktop-long.webp";
import pirsumMobile from "@/assets/images/sites/99pirsum-mobile.webp";
import pirsumMobileLong from "@/assets/images/sites/99pirsum-mobile-long.webp";
import hasidiDesktop from "@/assets/images/sites/hasidi-desktop.webp";
import hasidiDesktopLong from "@/assets/images/sites/hasidi-desktop-long.webp";
import hasidiMobile from "@/assets/images/sites/hasidi-mobile.webp";
import hasidiMobileLong from "@/assets/images/sites/hasidi-mobile-long.webp";
import tamarDesktop from "@/assets/images/sites/tamar-raz-desktop.webp";
import tamarDesktopLong from "@/assets/images/sites/tamar-raz-desktop-long.webp";
import tamarMobile from "@/assets/images/sites/tamar-raz-mobile.webp";
import tamarMobileLong from "@/assets/images/sites/tamar-raz-mobile-long.webp";

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
  /** A demo site we designed for a made-up business (shown under "אתרי קונספט") */
  concept?: true;
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
  {
    slug: "hasidi-photo",
    name: "צלמי חזון אי״ש",
    url: "https://hasidi-photo.vercel.app",
    domain: "hasidi-photo.vercel.app",
    industry: "צילום אירועים",
    headline: "אלבום חי של רגעים — בשמנת וזהב.",
    summary:
      "אתר חדש לצוות צלמי אירועים מהמגזר החרדי: חתונות, בר מצוות ובריתות. קיר תמונות מוטה שזז עם העכבר, גלריות עם 191 תמונות של הלקוח, ושפה עיצובית בשמנת וזהב — כמו החותם של העסק, עם בס״ד בראש כל עמוד.",
    challenge:
      "אתר וורדפרס עם גלריות כבדות ואיטיות, שלא שיקף את איכות הצילום — והדירוג שלו בגוגל היה חייב לעבור איתו לאתר החדש.",
    solution:
      "אתר מהיר בהתאמה אישית: קיר תמונות אינטראקטיבי בפתיחה, גלריה לכל סוג אירוע עם תצוגה מלאה והחלקה, תמונות שנדחסות אוטומטית לכל מסך, וכל כתובת מהאתר הישן נשמרה — כדי שלקוחות ימשיכו למצוא אותו בגוגל.",
    features: ["קיר תמונות אינטראקטיבי", "191 תמונות בגלריות", "תצוגה מלאה בהחלקה", "5 פלטות צבעים", "שמירת דירוג בגוגל", "טופס פנייה למייל"],
    palette: ["#f4ecdc", "#946c22", "#1d1912", "#fffdf8", "#c9a24b"],
    glow: "#b08532",
    shots: { desktop: hasidiDesktop, mobile: hasidiMobile, desktopLong: hasidiDesktopLong, mobileLong: hasidiMobileLong },
  },
];

/**
 * Concept sites, mostly for the Haredi sector: made-up businesses, real live sites.
 * Built to show what we can do; contact details on them are ours.
 */
export const concepts: Website[] = [
  {
    slug: "hechal-hanezer",
    name: "היכל הנזר",
    url: "https://hechal-hanezer.vercel.app",
    domain: "hechal-hanezer.vercel.app",
    industry: "אולם שמחות",
    headline: "הזמנה לחתונה — שהפכה לאתר.",
    summary:
      "אתר לאולם אירועים למגזר החרדי: חתונות, בר מצוות ושבע ברכות. שנהב, זהב שמפניה וירוק אמרלד, וחופה מוזהבת שנפתחת לכל רוחב המסך.",
    challenge: "משפחות רוצות לדעת מהר אם התאריך פנוי, כמה זה יעלה ואיך תיראה הישיבה הנפרדת.",
    solution:
      "לוח שנה עברי־לועזי עם תאריכים פנויים, מחשבון הערכת מחיר לפי מספר אורחים, מפת ישיבה עם מחיצה שמשתנה בלחיצה, תפריטים וכשרות — ומצב שבת שסוגר את האתר אוטומטית.",
    features: ["לוח תאריכים עברי", "הערכת מחיר", "ישיבה נפרדת", "מצב שבת", "מותאם לנטפרי"],
    palette: ["#1d3a2f", "#faf6ec", "#b08d57", "#d8be8a", "#29251f"],
    glow: "#b08d57",
    concept: true,
    shots: { desktop: hanezerDesktop, mobile: hanezerMobile, desktopLong: hanezerDesktopLong, mobileLong: hanezerMobileLong },
  },
  {
    slug: "stam-hadar",
    name: "הדר סת״ם",
    url: "https://stam-hadar.vercel.app",
    domain: "stam-hadar.vercel.app",
    industry: "סת״ם ויודאיקה",
    headline: "כל אות — בהידור.",
    summary:
      "אתר לבית מלאכה לסת״ם: מזוזות, תפילין, מגילות וספרי תורה. דיו, קלף ועלי זהב — והשם נכתב על המסך כמו בקולמוס.",
    challenge: "להסביר ללקוח מה ההבדל בין מזוזה כשרה למהודרת — ולמה זה שווה את המחיר.",
    solution:
      "קטלוג לפי רמת הידור וכתב, הסבר מונפש שכותב את האותיות משיכה אחר משיכה, מגילה שנפתחת בגלילה, מחשבון מזוזות לדירה חדשה והזמנת בדיקה — הכול בטלפון או בוואטסאפ.",
    features: ["קטלוג לפי הידור", "הסבר הידור מונפש", "מחשבון מזוזות", "מצב שבת", "מותאם לנטפרי"],
    palette: ["#0d1624", "#f2e8d2", "#c9a24a", "#e9d08d", "#5e4a2e"],
    glow: "#c9a24a",
    concept: true,
    shots: { desktop: stamDesktop, mobile: stamMobile, desktopLong: stamDesktopLong, mobileLong: stamMobileLong },
  },
  {
    slug: "lishkat-hagazit",
    name: "כולל לשכת הגזית",
    url: "https://lishkat-hagazit.vercel.app",
    domain: "lishkat-hagazit.vercel.app",
    industry: "מוסד תורני ותרומות",
    headline: "קמפיין שמרגישים שהוא חי.",
    summary:
      "אתר תרומות לכולל אברכים בירושלים, הקרוי על שם לשכת הגזית: אבן ירושלמית באור יום, קמפיין שנבנה אבן על אבן ותרומות שנכנסות בזמן אמת, הנצחות והוראות קבע.",
    challenge: "לגרום לתורם להרגיש שהתרומה שלו משנה — עכשיו — ולתת לו לתרום גם מטלפון כשר.",
    solution:
      "קיר קמפיין חי שנבנה אבן אחר אבן עם הכפלת תרומות, בחירת סכום והקדשה (לע״נ, לרפואה, להצלחה), כרטיסי הנצחה, סדר יום מונפש ותרומה בטלפון מכל מקום באתר — שעוצרת בשבת.",
    features: ["קמפיין חי", "הוראת קבע", "הנצחות", "מצב שבת", "מותאם לנטפרי"],
    palette: ["#3e4a2c", "#f4ecdd", "#b5832c", "#e0b25a", "#2a2117"],
    glow: "#b5832c",
    concept: true,
    shots: { desktop: lishkatDesktop, mobile: lishkatMobile, desktopLong: lishkatDesktopLong, mobileLong: lishkatMobileLong },
  },
  {
    slug: "shachor-bordo",
    name: "שחור ובורדו",
    url: "https://shachor-bordo.vercel.app",
    domain: "shachor-bordo.vercel.app",
    industry: "חליפות וכובעים",
    headline: "חנות בגדים שנראית כמו מגזין אופנה.",
    summary:
      "אתר לבוטיק חליפות וכובעים לגברים: שחור־לבן של מגזין אופנה, כותרות ענק ונגיעה אחת של בורדו — שגם נתנה לחנות את שמה, כמו גיליון חדש שנפתח על המסך.",
    challenge: "לגרום לחתן ולאבא שלו להגיע למדידה — ולהבין מראש מה מקבלים בחבילת חתן.",
    solution:
      "לוקבוק לחול, לשבת ולשמחה שמתדפדף כמו מגזין, חתן ״בלתי נראה״ שמתלבש פריט אחר פריט בגלילה, מדריך כובעים שבו הכובע משנה צורה, טבלת מידות חיה וקביעת מדידה לפי תאריך עברי.",
    features: ["לוקבוק מתדפדף", "חבילות חתן", "מדריך כובעים", "קביעת מדידה", "מצב שבת"],
    palette: ["#0d0d0d", "#f3f2ef", "#6e1823", "#8b8985", "#262626"],
    glow: "#8e2332",
    concept: true,
    shots: { desktop: shachorDesktop, mobile: shachorMobile, desktopLong: shachorDesktopLong, mobileLong: shachorMobileLong },
  },
  {
    slug: "neve-oren",
    name: "נווה אורן",
    url: "https://neve-oren.vercel.app",
    domain: "neve-oren.vercel.app",
    industry: "פרויקט מגורים",
    headline: "דירה שבוחרים מתוך השרטוט.",
    summary:
      "אתר לפרויקט מגורים חדש בבית שמש, שבנוי כמו סט שרטוטים של אדריכל: הבניינים מסתרטטים ועולים קומה אחר קומה, והשמש חוצה את השמיים בגלילה.",
    challenge: "זוגות צעירים והורים שקונים לילדים רוצים לדעת הכול לפני שמגיעים למשרד המכירות: מה פנוי, כמה זה עולה ומה יש ליד הבית.",
    solution:
      "חזית בניין שבה כל דירה לחיצה, תוכנית דירה שמשורטטת מול העיניים עם מרפסת סוכה ומטבח בשרי־חלבי, מפת קהילה עם דקות הליכה לבתי כנסת ולמוסדות, ומחשבון משכנתא — והכול נשלח לוואטסאפ.",
    features: ["איתור דירה אינטראקטיבי", "תוכניות דירה", "מפת קהילה", "מחשבון משכנתא", "מצב שבת"],
    palette: ["#22201c", "#f4efe6", "#b4532a", "#c9b99c", "#a39b8e"],
    glow: "#b4532a",
    concept: true,
    shots: { desktop: neveDesktop, mobile: neveMobile, desktopLong: neveDesktopLong, mobileLong: neveMobileLong },
  },
  {
    slug: "shabbat-kitchen",
    name: "המטבח של שבת",
    url: "https://shabbat-kitchen.vercel.app",
    domain: "shabbat-kitchen.vercel.app",
    industry: "אוכל מוכן לשבת",
    headline: "אתר שמריח כמו יום שישי.",
    summary:
      "אתר לטייק אווי לשבת: צבעוני, שמח ומאויר ביד — סיר צ׳ולנט מעלה אדים, חלה שנקלעת מול העיניים ותפריט שמתחלף לפי פרשת השבוע.",
    challenge: "משפחות גדולות מזמינות כל שבוע, ממהרות, ולפעמים מטלפון כשר — וההזמנה חייבת להגיע עד יום חמישי.",
    solution:
      "תפריט שבועי לפי פרשה עם מגש הזמנה שהמנות קופצות אליו, שעון ספירה לאחור עד סגירת ההזמנות, סלי שבת למשפחה, תפריטי חג ופסח, ושליחת ההזמנה בוואטסאפ או בטלפון.",
    features: ["תפריט לפי פרשה", "מגש הזמנה", "ספירה לאחור", "סלי שבת", "מצב שבת"],
    palette: ["#3b2015", "#fbf3e4", "#d63c24", "#f2a516", "#6b7a2a"],
    glow: "#f2a516",
    concept: true,
    shots: { desktop: kitchenDesktop, mobile: kitchenMobile, desktopLong: kitchenDesktopLong, mobileLong: kitchenMobileLong },
  },
  {
    slug: "adasha-niggun",
    name: "עדשה וניגון",
    url: "https://adasha-niggun.vercel.app",
    domain: "adasha-niggun.vercel.app",
    industry: "צילום שמחות ואולפן",
    headline: "שני עולמות. אתר אחד.",
    summary:
      "אתר לצלם שמחות ולאולפן הקלטות תחת קורת גג אחת: מסך פתיחה שנחצה לעדשה ולניגון, גלריה שנגללת כמו סליל צילום — ומיקסר אמיתי שאפשר לנגן בו.",
    challenge: "להציג שני עסקים, צילום ואולפן, בלי לבלבל — ולהראות שמחות בלי אף תמונה של אנשים.",
    solution:
      "מסך פתיחה מפוצל שמתרחב לצד שמעניין אתכם, צלם לצד הגברים וצלמת לצד הנשים, גלריית אולמות, תפילין ונרות שנגללת לרוחב, ומיקסר עם ארבעה ערוצים שמנגן בזמן אמת בדפדפן — ונעצר בשבת.",
    features: ["מסך פתיחה מפוצל", "מיקסר אינטראקטיבי", "גלריה כמו סרט", "מצב שבת", "מותאם לנטפרי"],
    palette: ["#0c0b0a", "#f3ece1", "#e9b872", "#ff4d3a", "#211e1b"],
    glow: "#ff4d3a",
    concept: true,
    shots: { desktop: adashaDesktop, mobile: adashaMobile, desktopLong: adashaDesktopLong, mobileLong: adashaMobileLong },
  },
  {
    slug: "chevyon",
    name: "חביון",
    url: "https://chevyon.vercel.app",
    domain: "chevyon.vercel.app",
    industry: "סטודיו כושר לנשים",
    headline: "מבחוץ זכוכית חלבית. מבפנים — שלך.",
    summary:
      "אתר לסטודיו כושר לנשים בלבד למגזר החרדי: פילאטיס מכשירים, כוח, הריון ואחרי לידה, ומשחקייה לקטנים. זכוכית חלבית, שזיף עמוק ונגיעה של משמש — וחלון מקושת שנפתח בגלילה עד שהסטודיו ממלא את המסך.",
    challenge:
      "אישה חרדית צריכה לדעת עוד לפני שהיא באה שאין גברים, שאין מצלמות, שאי אפשר לראות פנימה מהרחוב ושיש מי שישמור על הקטנים — בלי שתצטרך לשאול.",
    solution:
      "סיור אינטראקטיבי בתוכנית הסטודיו מהכניסה הנפרדת ועד המשחקייה, מערכת שעות לפי ימי השבוע עם סינון ושריון מקום בוואטסאפ, שאלון קצר שממליץ על שיעור, שעון יום עם ״כמה עמוס עכשיו״, הרשמה גם מטלפון כשר — ומצב שבת.",
    features: ["סיור פרטיות אינטראקטיבי", "מערכת שעות ושריון מקום", "שאלון התאמת שיעור", "מצב שבת", "מותאם לנטפרי"],
    palette: ["#3a2742", "#fbf9f6", "#a893c9", "#ee9f75", "#24182a"],
    glow: "#a893c9",
    concept: true,
    shots: { desktop: chevyonDesktop, mobile: chevyonMobile, desktopLong: chevyonDesktopLong, mobileLong: chevyonMobileLong },
  },
  {
    slug: "tamar-raz",
    name: "תמר רז",
    url: "https://tamar-raz.vercel.app",
    domain: "tamar-raz.vercel.app",
    industry: "גרפולוגיה",
    headline: "כתב יד שנכתב מול העיניים.",
    summary:
      "אתר לגרפולוגית: ענני דיו חיים בתלת־ממד, חוט זהב שכותב את עצמו על המסך ופרח דליה שעליו עשויים מלולאות של עט. אינדיגו עמוק, נייר שמנת וזהב — כמו שולחן כתיבה בשעת לילה.",
    challenge: "להסביר מה גרפולוגית באמת בודקת בכתב היד, ולבנות אמון מספיק כדי שישלחו לה דף כתוב.",
    solution:
      "שמונה סימני כתב שמוסברים אחד־אחד על דוגמת כתב חיה, משטח כתיבה שבו הגולש כותב שורה באצבע ורואה נטייה, גודל וקצב, שירותים לאנשים ולארגונים, תהליך עבודה בארבעה צעדים, שאלות נפוצות וטופס שנפתח ישר בוואטסאפ.",
    features: ["רקע דיו חי בתלת־ממד", "משטח כתיבה אינטראקטיבי", "8 סימני כתב מוסברים", "טופס לוואטסאפ", "שאלות נפוצות"],
    palette: ["#0f1024", "#f4eee4", "#2c3170", "#7b2d45", "#d9b98a"],
    glow: "#a14a66",
    concept: true,
    shots: { desktop: tamarDesktop, mobile: tamarMobile, desktopLong: tamarDesktopLong, mobileLong: tamarMobileLong },
  },
];
