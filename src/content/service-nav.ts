/**
 * Lightweight service index — safe to import from client components
 * (header mega-menu, footer). Full page content lives in services.ts.
 */
export type Accent = "yellow" | "cyan" | "green" | "magenta";

export type ServiceIcon =
  | "mailbox"
  | "boards"
  | "building"
  | "door"
  | "synagogue"
  | "printer"
  | "signpost"
  | "construction"
  | "sparkles"
  | "monitor";

export type ServiceGroup = "field" | "production" | "creative";

export type ServiceNavItem = {
  slug: string;
  title: string;
  blurb: string;
  icon: ServiceIcon;
  accent: Accent;
  group: ServiceGroup;
};

export const serviceGroups: { id: ServiceGroup; title: string; description: string }[] = [
  { id: "field", title: "הפצה ושטח", description: "המסר שלכם בכל בית, בכל לוח ובכל בית כנסת" },
  { id: "production", title: "הפקה ודפוס", description: "מהקובץ ועד השלט שעומד ברחוב" },
  { id: "creative", title: "קריאייטיב ודיגיטל", description: "אסטרטגיה, מיתוג, עיצוב ונוכחות ברשת" },
];

export const serviceNav: ServiceNavItem[] = [
  {
    slug: "mailbox-distribution",
    title: "הפצה בתיבות דואר",
    blurb: "עלונים, חוברות ופליירים לכל תיבה",
    icon: "mailbox",
    accent: "yellow",
    group: "field",
  },
  {
    slug: "poster-boards",
    title: "הדבקת מודעות רחוב",
    blurb: "לוחות המודעות העירוניים בריכוזים החרדיים",
    icon: "boards",
    accent: "magenta",
    group: "field",
  },
  {
    slug: "building-entrances",
    title: "מודעות בכניסות בניינים",
    blurb: "בכל חדר מדרגות, מול עיני כל הדיירים",
    icon: "building",
    accent: "green",
    group: "field",
  },
  {
    slug: "door-hangers",
    title: "תלי דלת",
    blurb: "הפרסום שנכנס הביתה ונשאר על המקרר",
    icon: "door",
    accent: "cyan",
    group: "field",
  },
  {
    slug: "synagogues",
    title: "עלונים בבתי כנסת",
    blurb: "עלוני שבת ומודעות בבתי כנסת ומקוואות",
    icon: "synagogue",
    accent: "yellow",
    group: "field",
  },
  {
    slug: "printing",
    title: "דפוס דיגיטלי",
    blurb: "מודעות, פליירים, מגנטים וכל מה שביניהם",
    icon: "printer",
    accent: "magenta",
    group: "production",
  },
  {
    slug: "signage",
    title: "שילוט",
    blurb: "שלטי חוצות, שילוט פנים ושלטים מוארים",
    icon: "signpost",
    accent: "cyan",
    group: "production",
  },
  {
    slug: "sign-construction",
    title: "קונסטרוקציה לשלטים",
    blurb: "תכנון והקמה של מבני שילוט",
    icon: "construction",
    accent: "green",
    group: "production",
  },
  {
    slug: "advertising-branding",
    title: "פרסום, מיתוג ועיצוב",
    blurb: "אסטרטגיה, עיצוב ברמת סטודיו ויחסי ציבור",
    icon: "sparkles",
    accent: "yellow",
    group: "creative",
  },
  {
    slug: "web-digital",
    title: "בניית אתרים ודיגיטל",
    blurb: "אתרים ודפי נחיתה שמביאים פניות",
    icon: "monitor",
    accent: "magenta",
    group: "creative",
  },
];

export const accentBg: Record<Accent, string> = {
  yellow: "bg-yellow",
  cyan: "bg-cyan",
  green: "bg-green",
  magenta: "bg-magenta",
};

export const accentText: Record<Accent, string> = {
  yellow: "text-yellow",
  cyan: "text-cyan",
  green: "text-green",
  magenta: "text-magenta",
};

export const accentVar: Record<Accent, string> = {
  yellow: "var(--color-yellow)",
  cyan: "var(--color-cyan)",
  green: "var(--color-green)",
  magenta: "var(--color-magenta)",
};
