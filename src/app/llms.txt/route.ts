import { cities, moreCities } from "@/content/cities";
import { posts } from "@/content/posts";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

/** Plain-text summary of the business for AI assistants and answer engines (llmstxt.org). */
export function GET() {
  const fmt = (n: number) => n.toLocaleString("he-IL");
  const text = `# ${site.name}

> ${site.description}

${site.name} היא חברת פרסום, הפצה ודפוס שמתמחה במגזר החרדי והדתי בישראל, ופועלת מאז ${site.foundingYear} מהעיר אלעד.

- כתובת: ${site.address.full}
- טלפון: ${site.phones.map((p) => p.display).join(", ")}
- אימייל: ${site.email}
- וואטסאפ: https://wa.me/${site.whatsappNumber}
- ימי הפצה והדבקה קבועים: שני וחמישי. חלוקה בבתי כנסת: חמישי ושישי.

## שירותים

${services.map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`).join("\n")}

## אזורי הפצה

${cities
  .map(
    (c) =>
      `- [${c.name}](${absoluteUrl(`/areas/${c.slug}`)}): כ-${fmt(c.mailboxes)} תיבות דואר, ${fmt(c.buildings)} בניינים, ${fmt(c.boards)} לוחות מודעות${c.note ? ` (${c.note})` : ""}`,
  )
  .join("\n")}
- ועוד: ${moreCities.join(", ")} וכל ריכוז חרדי ודתי.

## מאמרים

${posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`).join("\n")}

## עמודים נוספים

- [מי אנחנו](${absoluteUrl("/about")})
- [ממליצים עלינו](${absoluteUrl("/testimonials")})
- [תמונות מהשטח](${absoluteUrl("/work")})
- [מילון מונחים](${absoluteUrl("/glossary")})
- [צור קשר והצעת מחיר](${absoluteUrl("/contact")})
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
