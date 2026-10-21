import { Marked, type Tokens } from "marked";

export type TocItem = { id: string; text: string };

export function slugifyHeading(text: string) {
  return text
    .trim()
    .replace(/[*_`"'״׳:?!.,()]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

const marked = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth, text }: Tokens.Heading) {
      const inner = this.parser.parseInline(tokens);
      const id = slugifyHeading(text);
      return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
    },
    link({ href, title, tokens }: Tokens.Link) {
      const inner = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href) && !href.startsWith("https://99pirsum.com");
      const titleAttr = title ? ` title="${title}"` : "";
      const rel = external ? ` target="_blank" rel="noopener noreferrer"` : "";
      return `<a href="${href}"${titleAttr}${rel}>${inner}</a>`;
    },
  },
});

export function renderMarkdown(md: string) {
  const html = marked.parse(md, { async: false }) as string;
  // Wide tables scroll inside their own box instead of widening the page on phones
  return html.replace(/<table>/g, '<div class="table-scroll"><table>').replace(/<\/table>/g, "</table></div>");
}

export function extractToc(md: string): TocItem[] {
  return marked
    .lexer(md)
    .filter((t): t is Tokens.Heading => t.type === "heading" && t.depth === 2)
    .map((t) => ({ id: slugifyHeading(t.text), text: t.text.replace(/\*\*/g, "") }));
}

export function readingMinutes(md: string) {
  const words = md.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 150));
}
