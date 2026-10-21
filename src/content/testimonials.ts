import type { StaticImageData } from "next/image";

import gilLogo from "@/assets/images/clients/gil-group.png";
import potchimLogo from "@/assets/images/clients/potchim-shavua.png";
import xsosLogo from "@/assets/images/clients/xsos.png";
import dweckLogo from "@/assets/images/clients/yosef-dweck.png";
import gilLetter from "@/assets/images/letters/gil-group.jpg";
import potchimLetter from "@/assets/images/letters/potchim-shavua.jpg";
import xsosLetter from "@/assets/images/letters/xsos.jpg";
import dweckLetter from "@/assets/images/letters/yosef-dweck.jpg";
import dweckMessage from "@/assets/images/letters/yosef-dweck-message.jpg";
import { noBlur } from "./media";
import type { Accent } from "./service-nav";

export type Testimonial = {
  id: string;
  org: string;
  author: string;
  role?: string;
  date?: string;
  highlight: string;
  body: string[];
  logo: StaticImageData;
  letter: StaticImageData;
  extra?: { image: StaticImageData; caption: string };
  accent: Accent;
};

/** Quotes are verbatim from the recommendation letters clients sent us. */
export const testimonials: Testimonial[] = [
  {
    id: "gil-group",
    org: "גיל גרופ — תקשורת שיווקית ומדיה",
    author: "חננאל שלוש",
    role: "חטיבת גיל סטריט",
    date: "ינואר 2023",
    highlight:
      "גם בלו״זים הכי צפופים שיש ובעבודות מאתגרות, תמיד ידעתם למצוא פתרון יצירתי ולהשאיר אותנו מרוצים.",
    body: [
      "אחרי מעל עשור של שיתוף פעולה פורה, אני גאה ושמח להמליץ עליכם — משרד פרסום 99.",
      "נתי וחזקי נותנים שירות מעולה, ומבצעים את העבודה באופן מושלם לשביעות רצוננו.",
      "גם בלו״זים הכי צפופים שיש ובעבודות מאתגרות, תמיד ידעתם למצוא פתרון יצירתי ולהשאיר אותנו מרוצים.",
      "תודה רבה, ומאחל שתמשיכו תמיד להוביל ולהצליח!",
    ],
    logo: noBlur(gilLogo),
    letter: noBlur(gilLetter),
    accent: "yellow",
  },
  {
    id: "yosef-dweck",
    org: "יוסף דוויק — אימון, גמילה, תוצאות",
    author: "יוסף דוויק",
    date: "טבת תשפ״ב",
    highlight: "אם תמונה אחת שווה אלף מילים, אז סיבוב אחד באלעד שווה אלף תמונות.",
    body: [
      "בשבוע שעבר עשינו הרצאת מבוא באלעד, ולצורך כך עשינו פרסום בלוחות המודעות באלעד בימים שני וחמישי.",
      "ראשית אציין את רמת השירות הגבוהה של כל אנשי הצוות, שמגלים אכפתיות להצלחת הפרסום האישי שלך וזמינים לכל שאלה ובקשה.",
      "למרות שהיה שבוע מאוד גשום וסוער, שעות ספורות לאחר ההדבקה כבר נרשמה במערכת הטלפונית שלנו השיחה הראשונה.",
      "במוצאי שבת לפני ההרצאה עשיתי סיבוב עם הרכב באלעד, וממש נהניתי לראות את העבודה היפה בפריסה על כל העיר.",
      "אין ספק כי יש לי למי לפנות בפעם הבאה בעז״ה.",
    ],
    logo: noBlur(dweckLogo),
    letter: noBlur(dweckLetter),
    extra: { image: noBlur(dweckMessage), caption: "ההודעה ששלח לנו יוסף אחרי ההרצאה" },
    accent: "magenta",
  },
  {
    id: "potchim-shavua",
    org: "פותחים שבוע — פרסום שמזניק עסקים",
    author: "שמעון קאהן",
    role: "פרסום יחד, ביתר עילית",
    highlight:
      "אנו חוגגים עשר שנים של עבודה משותפת. היחס האישי והמענה לכל פנייה — במהירות ובמקצועיות.",
    body: [
      "אנו חוגגים עשר שנים של עבודה משותפת יחד. אנו מקבלים מכם שירות בהפצת העיתון ״פותחים שבוע״ באלעד כבר למעלה מעשור.",
      "במשך השנים עשיתם עבורנו פרויקטים נוספים של ״תלי דלת״, ובתקופה האחרונה אף נכנסנו יחד איתכם לפרויקט חדש בתחום המודעות בכניסות — לוח פרסומי של ״פותחים שבוע״ שמודבק על ידכם אחת לשבוע בכל חדרי המדרגות באלעד.",
      "כל צוות ״פותחים שבוע״ רוצה להודות לכם על השירות הנפלא שאנו זוכים לו, היחס האישי והמענה לכל פנייה מצידנו במהירות ובמקצועיות.",
      "נשמח גם להמליץ עליכם ללקוחות ולספר להם כמה אנחנו מרוצים מהשירות הנפלא והאיכות האנושית של כל הצוות וההנהלה שלכם.",
    ],
    logo: noBlur(potchimLogo),
    letter: noBlur(potchimLetter),
    accent: "cyan",
  },
  {
    id: "xsos",
    org: "אקסוס",
    author: "צוות אקסוס",
    highlight:
      "אתם שם תמיד בשבילנו, בשעות לא שעות — גם בשעות הקטנות של הלילה.",
    body: [
      "ברוך השם חלפה לה עוד שנה של שיתוף פעולה, ואני ממש שמח לחדש את הפרסום ולרכוש עוד עסקת פרסום לשנה הבאה.",
      "אני במיוחד נהנה לעבוד עם אנשים שמחוברים ומבינים את מהות וחשיבות הפרסום, ושמים את חזון הלקוח מול עיניהם.",
      "אתם שם תמיד בשבילנו, בשעות לא שעות — גם בשעות הקטנות של הלילה.",
      "הלוואי שעוד תצליחו ותעלו מעלה מעלה, ושירבו עסקים ואנשים כמותכם.",
    ],
    logo: noBlur(xsosLogo),
    letter: noBlur(xsosLetter),
    accent: "green",
  },
];
