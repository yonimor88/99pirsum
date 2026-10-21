import { posts } from "@/content/posts";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS feed of the articles (also reachable from the old WordPress /feed/ URL). */
export function GET() {
  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.slug}`);
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(p.description)}</description>
      <category>${escape(p.category)}</category>
      <pubDate>${new Date(`${p.date}T09:00:00+03:00`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} — מאמרים</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>מדריכים, טיפים ואסטרטגיות לפרסום במגזר החרדי והדתי</description>
    <language>he</language>
    <atom:link href="${absoluteUrl("/blog/feed.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
