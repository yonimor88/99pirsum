export const site = {
  name: "99 פרסום ומדיה",
  shortName: "99 פרסום",
  legalName: "99 פרסום ומדיה",
  url: "https://99pirsum.com",
  tagline: "תמיד שואפים ל-100%",
  description:
    "פרסום, הפצה ודפוס מאז 1994, עם התמחות במגזר החרדי והדתי: הפצת עלונים בתיבות דואר, הדבקת מודעות, תלי דלת, מיתוג ובניית אתרים — עם דיווח ותמונות מהשטח.",
  foundingYear: 1994,
  geo: { latitude: 32.0506, longitude: 34.9468 },
  phones: [
    { display: "050-844-5450", href: "tel:+972508445450" },
    { display: "050-909-6992", href: "tel:+972509096992" },
  ],
  whatsappNumber: "972508445450",
  email: "99Pirsum@gmail.com",
  address: {
    street: "הזמיר 1",
    city: "אלעד",
    zip: "4081701",
    full: "הזמיר 1, אלעד",
  },
  facebook: "https://www.facebook.com/profile.php?id=61553493055815",
  distributionDays: "שני וחמישי",
} as const;

export const primaryPhone = site.phones[0];

/** Direct line for website projects (/websites and the web & digital service). */
export const websitesPhone = { display: "054-397-1020", href: "tel:+972543971020" } as const;
export const websitesEmail = "yoni99pirsum@gmail.com";

export function whatsappLink(text = "שלום, הגעתי מהאתר ואשמח לקבל הצעת מחיר") {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const wazeLink = `https://waze.com/ul?q=${encodeURIComponent(site.address.full)}&navigate=yes`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.full)}`;

export type NavLink = { href: string; label: string; badge?: string };

export const mainNav: NavLink[] = [
  { href: "/services", label: "שירותים" },
  { href: "/websites", label: "אתרים", badge: "חדש" },
  { href: "/areas", label: "אזורי הפצה" },
  { href: "/work", label: "מהשטח" },
  { href: "/testimonials", label: "ממליצים" },
  { href: "/blog", label: "מאמרים" },
  { href: "/about", label: "מי אנחנו" },
];

export const footerCompanyNav: NavLink[] = [
  { href: "/about", label: "מי אנחנו" },
  { href: "/areas", label: "אזורי הפצה" },
  { href: "/work", label: "תמונות מהשטח" },
  { href: "/websites", label: "אתרים שבנינו" },
  { href: "/testimonials", label: "ממליצים עלינו" },
  { href: "/blog", label: "מאמרים וטיפים" },
  { href: "/glossary", label: "מילון מונחים" },
  { href: "/contact", label: "צור קשר" },
];

export const legalNav: NavLink[] = [
  { href: "/accessibility", label: "הצהרת נגישות" },
  { href: "/privacy", label: "מדיניות פרטיות" },
];
