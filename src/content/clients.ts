import type { StaticImageData } from "next/image";

import barKolTov from "@/assets/images/clients/bar-kol-tov.png";
import boneiOlam from "@/assets/images/clients/bonei-olam.png";
import clalit from "@/assets/images/clients/clalit.png";
import gilGroup from "@/assets/images/clients/gil-group.png";
import mda from "@/assets/images/clients/mda.png";
import mizrahiTefahot from "@/assets/images/clients/mizrahi-tefahot.png";
import netivHachesed from "@/assets/images/clients/netiv-hachesed.png";
import potchimShavua from "@/assets/images/clients/potchim-shavua.png";
import shukMehadrin from "@/assets/images/clients/shuk-mehadrin.png";
import unitedHatzalah from "@/assets/images/clients/united-hatzalah.png";
import vaadHarabanim from "@/assets/images/clients/vaad-harabanim.png";
import xsos from "@/assets/images/clients/xsos.png";
import yosefDweck from "@/assets/images/clients/yosef-dweck.png";
import zoya from "@/assets/images/clients/zoya.png";

export type Client = { name: string; logo: StaticImageData };

export const clients: Client[] = [
  { name: "מגן דוד אדום", logo: mda },
  { name: "איחוד הצלה", logo: unitedHatzalah },
  { name: "כללית", logo: clalit },
  { name: "מזרחי טפחות", logo: mizrahiTefahot },
  { name: "גיל גרופ", logo: gilGroup },
  { name: "אקסוס", logo: xsos },
  { name: "פותחים שבוע", logo: potchimShavua },
  { name: "שוק מהדרין", logo: shukMehadrin },
  { name: "נתיב החסד", logo: netivHachesed },
  { name: "בר כל טוב", logo: barKolTov },
  { name: "בוני עולם", logo: boneiOlam },
  { name: "ועד הרבנים לענייני צדקה", logo: vaadHarabanim },
  { name: "יוסף דוויק", logo: yosefDweck },
  { name: "ZOYA", logo: zoya },
];
