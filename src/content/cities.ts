export type City = {
  slug: string;
  name: string;
  buildings: number;
  mailboxes: number;
  boards: number;
  note?: string;
};

/** Coverage figures as published by 99 פרסום ומדיה. */
export const cities: City[] = [
  { slug: "bnei-brak", name: "בני ברק", buildings: 4504, mailboxes: 47000, boards: 200 },
  {
    slug: "jerusalem",
    name: "ירושלים",
    buildings: 4515,
    mailboxes: 45000,
    boards: 300,
    note: "בשכונות החרדיות והדתיות",
  },
  { slug: "beit-shemesh", name: "בית שמש", buildings: 1600, mailboxes: 24000, boards: 200 },
  { slug: "beitar-illit", name: "ביתר עילית", buildings: 1100, mailboxes: 13000, boards: 200 },
  { slug: "modiin-illit", name: "מודיעין עילית", buildings: 700, mailboxes: 12000, boards: 150 },
  {
    slug: "elad",
    name: "אלעד",
    buildings: 850,
    mailboxes: 9000,
    boards: 120,
    note: "הבית שלנו מאז 1994",
  },
];

export const moreCities = ["אשדוד", "פתח תקווה", "גבעת זאב"];

export const totals = cities.reduce(
  (acc, c) => ({
    buildings: acc.buildings + c.buildings,
    mailboxes: acc.mailboxes + c.mailboxes,
    boards: acc.boards + c.boards,
  }),
  { buildings: 0, mailboxes: 0, boards: 0 },
);

export const allCityNames = [...cities.map((c) => c.name), ...moreCities];
