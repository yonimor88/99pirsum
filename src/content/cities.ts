export type City = {
  slug: string;
  name: string;
  /** "ב" + name, for sentences like "הפצה בבני ברק" */
  inName: string;
  buildings: number;
  mailboxes: number;
  boards: number;
  note?: string;
  /** One or two sentences specific to this city (city landing page). */
  intro: string;
  /** Extra local facts shown on the city page. */
  local?: string[];
};

/** Coverage figures as published by 99 פרסום ומדיה. */
export const cities: City[] = [
  {
    slug: "bnei-brak",
    name: "בני ברק",
    inName: "בבני ברק",
    buildings: 4504,
    mailboxes: 47000,
    boards: 200,
    intro:
      "בני ברק היא אחד מריכוזי האוכלוסייה החרדית הגדולים בעולם — ולכן גם אחד השווקים החשובים ביותר לכל מי שמפרסם במגזר. זו העיר עם מספר תיבות הדואר הגדול ביותר באזורי ההפצה שלנו.",
  },
  {
    slug: "jerusalem",
    name: "ירושלים",
    inName: "בירושלים",
    buildings: 4515,
    mailboxes: 45000,
    boards: 300,
    note: "בשכונות החרדיות והדתיות",
    intro:
      "בירושלים פרוסות שכונות חרדיות ודתיות רבות, ובהן מספר לוחות המודעות הגדול ביותר באזורי ההפצה שלנו. הנתונים בעמוד מתייחסים לשכונות החרדיות והדתיות בעיר.",
  },
  {
    slug: "beit-shemesh",
    name: "בית שמש",
    inName: "בבית שמש",
    buildings: 1600,
    mailboxes: 24000,
    boards: 200,
    intro:
      "בית שמש היא אחת הערים הצומחות במגזר החרדי והדתי, עם שכונות גדולות וקהל צעיר — קהל שממשיך לקרוא את מה שמגיע לתיבת הדואר ולוח המודעות.",
  },
  {
    slug: "beitar-illit",
    name: "ביתר עילית",
    inName: "בביתר עילית",
    buildings: 1100,
    mailboxes: 13000,
    boards: 200,
    intro:
      "ביתר עילית היא עיר חרדית מובהקת, עם קהילות רבות ולוחות מודעות פעילים בכל שכונה. מספר הלוחות בה גבוה במיוחד ביחס לגודל העיר.",
  },
  {
    slug: "modiin-illit",
    name: "מודיעין עילית",
    inName: "במודיעין עילית",
    buildings: 700,
    mailboxes: 12000,
    boards: 150,
    intro:
      "מודיעין עילית היא אחת הערים החרדיות הגדולות בארץ. הבנייה הצפופה בה — הרבה דירות בכל בניין — הופכת את ההפצה בתיבות הדואר ובכניסות הבניינים ליעילה במיוחד.",
  },
  {
    slug: "elad",
    name: "אלעד",
    inName: "באלעד",
    buildings: 850,
    mailboxes: 9000,
    boards: 120,
    note: "הבית שלנו מאז 1994",
    intro:
      "אלעד היא הבית שלנו: המשרד שלנו נמצא ברחוב הזמיר, ומכאן התחלנו את הדרך ב-1994. אנחנו מכירים את העיר לעומק — את הבניינים, את הלוחות ואת בתי הכנסת.",
    local: [
      "מדי שבוע אנחנו מדביקים את לוח הפרסום של העיתון ״פותחים שבוע״ בכל חדרי המדרגות באלעד, וכבר יותר מעשור מפיצים אותו בתיבות הדואר בעיר.",
      "בבתי הכנסת: קו מרכזי של כ-80 מוקדים או קו מורחב של כ-155 מוקדים, כולל מקוואות, בימי חמישי ושישי.",
      "״במוצאי שבת עשיתי סיבוב עם הרכב באלעד, וממש נהניתי לראות את העבודה היפה בפריסה על כל העיר.״ — יוסף דוויק, אחרי פרסום בלוחות המודעות באלעד.",
    ],
  },
];

export const moreCities = ["אשדוד", "פתח תקווה", "גבעת זאב"];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export const totals = cities.reduce(
  (acc, c) => ({
    buildings: acc.buildings + c.buildings,
    mailboxes: acc.mailboxes + c.mailboxes,
    boards: acc.boards + c.boards,
  }),
  { buildings: 0, mailboxes: 0, boards: 0 },
);

export const allCityNames = [...cities.map((c) => c.name), ...moreCities];
