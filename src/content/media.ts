import type { StaticImageData } from "next/image";

import bannerHanging from "@/assets/images/work/banner-hanging.jpg";
import billboardCollection from "@/assets/images/work/billboard-collection.jpg";
import billboardSorgad from "@/assets/images/work/billboard-sorgad.jpg";
import billboardTall1 from "@/assets/images/work/billboard-tall-1.jpg";
import billboardTall2 from "@/assets/images/work/billboard-tall-2.jpg";
import billboardTall3 from "@/assets/images/work/billboard-tall-3.jpg";
import billboardTall4 from "@/assets/images/work/billboard-tall-4.jpg";
import billboardYes from "@/assets/images/work/billboard-yes.jpg";
import board2024a from "@/assets/images/work/board-2024-1.jpg";
import board2024b from "@/assets/images/work/board-2024-2.jpg";
import board2024c from "@/assets/images/work/board-2024-3.jpg";
import board2024d from "@/assets/images/work/board-2024-4.jpg";
import boardChesed from "@/assets/images/work/board-chesed.jpg";
import boardCloseup from "@/assets/images/work/board-closeup.jpg";
import boardOrange from "@/assets/images/work/board-orange.jpg";
import boardPosterCrew from "@/assets/images/work/board-poster-crew.jpg";
import boardPosterCrew2 from "@/assets/images/work/board-poster-crew-2.jpg";
import boardReader from "@/assets/images/work/board-reader.jpg";
import boardReaderTall from "@/assets/images/work/board-reader-tall.jpg";
import boardStreet from "@/assets/images/work/board-street.jpg";
import boardTall1 from "@/assets/images/work/board-tall-1.jpg";
import boardTall2 from "@/assets/images/work/board-tall-2.jpg";
import boardTall3 from "@/assets/images/work/board-tall-3.jpg";
import boardTall4 from "@/assets/images/work/board-tall-4.jpg";
import boardTall5 from "@/assets/images/work/board-tall-5.jpg";
import boardWall from "@/assets/images/work/board-wall.jpg";
import brandingMockup from "@/assets/images/work/branding-mockup.jpg";
import cityAerial from "@/assets/images/work/city-aerial.jpg";
import doorDrop from "@/assets/images/work/door-drop.jpg";
import doorHanger from "@/assets/images/work/door-hanger.jpg";
import doorHanger2 from "@/assets/images/work/door-hanger-2.jpg";
import doorHangersCorridor from "@/assets/images/work/door-hangers-corridor.jpg";
import doorHangersHall from "@/assets/images/work/door-hangers-hall.jpg";
import doorHangerTall1 from "@/assets/images/work/door-hanger-tall-1.jpg";
import doorHangerTall2 from "@/assets/images/work/door-hanger-tall-2.jpg";
import doorHangerTall3 from "@/assets/images/work/door-hanger-tall-3.jpg";
import entranceBoard from "@/assets/images/work/entrance-board.jpg";
import entranceBoard2 from "@/assets/images/work/entrance-board-2.jpg";
import entranceBoardTall from "@/assets/images/work/entrance-board-tall.jpg";
import entranceWall from "@/assets/images/work/entrance-wall.jpg";
import mailboxes from "@/assets/images/work/mailboxes.jpg";
import mailboxesTall from "@/assets/images/work/mailboxes-tall.jpg";
import mailboxesWide from "@/assets/images/work/mailboxes-wide.jpg";
import printPress from "@/assets/images/work/print-press.jpg";
import signPlan from "@/assets/images/work/sign-plan.jpg";
import synagogueDoor from "@/assets/images/work/synagogue-door.jpg";
import synagogueDoorTall from "@/assets/images/work/synagogue-door-tall.jpg";
import synagogueLeaflets from "@/assets/images/work/synagogue-leaflets.jpg";
import synagogueLeaflets2 from "@/assets/images/work/synagogue-leaflets-2.jpg";
import synagogueLeaflets3 from "@/assets/images/work/synagogue-leaflets-3.jpg";
import synagogueTall1 from "@/assets/images/work/synagogue-tall-1.jpg";
import synagogueTall2 from "@/assets/images/work/synagogue-tall-2.jpg";
import synagogueTall3 from "@/assets/images/work/synagogue-tall-3.jpg";
import webDesign from "@/assets/images/work/web-design.jpg";

export type Photo = { src: StaticImageData; alt: string };

const photo = (src: StaticImageData, alt: string): Photo => ({ src, alt });

export const photos = {
  boardReader: photo(boardReader, "אברך עוצר לקרוא את לוח המודעות ברחוב"),
  boardReaderTall: photo(boardReaderTall, "עובר אורח קורא מודעות על לוח מודעות עירוני"),
  boardPosterCrew: photo(boardPosterCrew, "עובד הדבקה מדביק מודעה חדשה על לוח מודעות"),
  boardPosterCrew2: photo(boardPosterCrew2, "לוח מודעות עירוני מלא במודעות טריות"),
  boardChesed: photo(boardChesed, "לוח מודעות עמוס פרסומים צבעוניים ברחוב"),
  boardStreet: photo(boardStreet, "לוח מודעות ברחוב עם מודעות בגודל גיליון וחצי גיליון"),
  boardCloseup: photo(boardCloseup, "תקריב של מודעות מסודרות על לוח מודעות"),
  boardOrange: photo(boardOrange, "מודעות רחוב על קיר אבן"),
  boardWall: photo(boardWall, "לוח מודעות עם מודעות מסודרות בשורות"),
  boardTall1: photo(boardTall1, "מודעות רחוב על קיר בשכונת מגורים"),
  boardTall2: photo(boardTall2, "לוח מודעות ברחוב עם מודעות חדשות"),
  boardTall3: photo(boardTall3, "מודעות תלויות על קיר בכניסה"),
  boardTall4: photo(boardTall4, "לוח מודעות מרכזי עם מודעות בגדלים שונים"),
  boardTall5: photo(boardTall5, "לוח מודעות עירוני עם שלט עליון"),
  board2024a: photo(board2024a, "לוח מודעות לאחר סבב הדבקה"),
  board2024b: photo(board2024b, "מודעות צבעוניות בלוח מודעות"),
  board2024c: photo(board2024c, "מודעות פרסום בגודל גיליון על לוח"),
  board2024d: photo(board2024d, "מודעות על לוח מודעות לאחר הדבקה"),
  entranceBoard: photo(entranceBoard, "לוח מודעות בכניסה לבניין מגורים"),
  entranceBoard2: photo(entranceBoard2, "מודעות על לוח שעם בכניסה לבניין"),
  entranceBoardTall: photo(entranceBoardTall, "לוח מודעות בחדר המדרגות של בניין"),
  entranceWall: photo(entranceWall, "מודעות תלויות בכניסה לבניין"),
  billboardYes: photo(billboardYes, "שלט חוצות גדול על גדר ברחוב"),
  billboardSorgad: photo(billboardSorgad, "שלט חוצות ממותג ליד מבנה ציבור"),
  billboardCollection: photo(billboardCollection, "שלט פרסום גדול על לוח עירוני"),
  billboardTall1: photo(billboardTall1, "שלט חוצות על גדר בשכונה"),
  billboardTall2: photo(billboardTall2, "שלט פרסום מעל לוח מודעות"),
  billboardTall3: photo(billboardTall3, "שלט עליון על לוח מודעות עמוס"),
  billboardTall4: photo(billboardTall4, "שלט חוצות בצבעים עזים"),
  bannerHanging: photo(bannerHanging, "תליית שלט בד על גדר"),
  doorHanger: photo(doorHanger, "תלי דלת על דלת כניסה לדירה"),
  doorHanger2: photo(doorHanger2, "תלי דלת על ידית של דלת עץ"),
  doorHangersHall: photo(doorHangersHall, "תלי דלת על שתי דלתות סמוכות במבואת הבניין"),
  doorHangersCorridor: photo(doorHangersCorridor, "תלי דלת על דלתות במסדרון בניין"),
  doorHangerTall1: photo(doorHangerTall1, "תלי דלת תלוי על דלת"),
  doorHangerTall2: photo(doorHangerTall2, "תלי דלת על דלת כהה"),
  doorHangerTall3: photo(doorHangerTall3, "תלי דלת על דלתות בקומה"),
  doorDrop: photo(doorDrop, "עלון פרסומי שהונח בפתח הדלת"),
  mailboxes: photo(mailboxes, "עלונים בתיבות הדואר של בניין מגורים"),
  mailboxesTall: photo(mailboxesTall, "תיבות דואר עם עלונים"),
  mailboxesWide: photo(mailboxesWide, "שורת תיבות דואר עם עלונים צבעוניים"),
  synagogueLeaflets: photo(synagogueLeaflets, "עלוני שבת מונחים על שולחן בבית הכנסת"),
  synagogueLeaflets2: photo(synagogueLeaflets2, "ערימת עלונים על שולחן בבית מדרש"),
  synagogueLeaflets3: photo(synagogueLeaflets3, "עלונים מונחים על שולחן בבית הכנסת"),
  synagogueDoor: photo(synagogueDoor, "מודעות על דלת הכניסה לבית הכנסת"),
  synagogueDoorTall: photo(synagogueDoorTall, "מודעות בכניסה לבית הכנסת"),
  synagogueTall1: photo(synagogueTall1, "עלונים על ספסל בבית הכנסת"),
  synagogueTall2: photo(synagogueTall2, "עלונים על שולחן בבית הכנסת"),
  synagogueTall3: photo(synagogueTall3, "עלונים על שולחן קטן בבית מדרש"),
  cityAerial: photo(cityAerial, "מבט אווירי על שכונת מגורים"),
  printPress: photo(printPress, "מכונת דפוס דיגיטלי בפעולה"),
  webDesign: photo(webDesign, "עיצוב ופיתוח אתרי אינטרנט"),
  brandingMockup: photo(brandingMockup, "מיתוג עסקי: כרטיסי ביקור, ניירת ושקיות"),
  signPlan: photo(signPlan, "שרטוט הנדסי של קונסטרוקציה לשלט"),
} satisfies Record<string, Photo>;

export type GalleryCategory =
  | "boards"
  | "entrances"
  | "door-hangers"
  | "mailboxes"
  | "synagogues"
  | "signage";

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "boards", label: "לוחות מודעות" },
  { id: "entrances", label: "כניסות בניינים" },
  { id: "door-hangers", label: "תלי דלת" },
  { id: "mailboxes", label: "תיבות דואר" },
  { id: "synagogues", label: "בתי כנסת" },
  { id: "signage", label: "שילוט" },
];

export type GalleryItem = Photo & { category: GalleryCategory };

const g = (p: Photo, category: GalleryCategory): GalleryItem => ({ ...p, category });

export const gallery: GalleryItem[] = [
  g(photos.boardReader, "boards"),
  g(photos.doorHangersHall, "door-hangers"),
  g(photos.boardPosterCrew, "boards"),
  g(photos.mailboxes, "mailboxes"),
  g(photos.billboardYes, "signage"),
  g(photos.synagogueLeaflets, "synagogues"),
  g(photos.entranceBoard, "entrances"),
  g(photos.boardReaderTall, "boards"),
  g(photos.doorHanger, "door-hangers"),
  g(photos.board2024b, "boards"),
  g(photos.billboardSorgad, "signage"),
  g(photos.synagogueDoor, "synagogues"),
  g(photos.boardChesed, "boards"),
  g(photos.mailboxesTall, "mailboxes"),
  g(photos.entranceBoard2, "entrances"),
  g(photos.bannerHanging, "signage"),
  g(photos.doorHangerTall3, "door-hangers"),
  g(photos.board2024c, "boards"),
  g(photos.synagogueLeaflets2, "synagogues"),
  g(photos.boardStreet, "boards"),
  g(photos.entranceWall, "entrances"),
  g(photos.billboardCollection, "signage"),
  g(photos.doorDrop, "mailboxes"),
  g(photos.boardTall4, "boards"),
  g(photos.doorHangersCorridor, "door-hangers"),
  g(photos.synagogueTall1, "synagogues"),
  g(photos.boardCloseup, "boards"),
  g(photos.billboardTall2, "signage"),
  g(photos.board2024a, "boards"),
  g(photos.entranceBoardTall, "entrances"),
  g(photos.mailboxesWide, "mailboxes"),
  g(photos.doorHanger2, "door-hangers"),
  g(photos.boardOrange, "boards"),
  g(photos.synagogueLeaflets3, "synagogues"),
  g(photos.billboardTall4, "signage"),
  g(photos.board2024d, "boards"),
  g(photos.boardTall1, "boards"),
  g(photos.synagogueDoorTall, "synagogues"),
  g(photos.boardWall, "boards"),
  g(photos.doorHangerTall1, "door-hangers"),
  g(photos.billboardTall1, "signage"),
  g(photos.boardTall2, "boards"),
  g(photos.boardPosterCrew2, "boards"),
  g(photos.synagogueTall2, "synagogues"),
  g(photos.billboardTall3, "signage"),
  g(photos.boardTall5, "boards"),
  g(photos.doorHangerTall2, "door-hangers"),
  g(photos.boardTall3, "entrances"),
  g(photos.synagogueTall3, "synagogues"),
];
