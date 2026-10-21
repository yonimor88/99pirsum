# 99 פרסום ומדיה — 99pirsum.com

The website of **99 פרסום ומדיה**: advertising, distribution and printing for the Haredi and religious sector in Israel since 1994.

Built with **Next.js 16** (App Router, Cache Components), **Tailwind CSS 4**, **Motion** and TypeScript. Hebrew, right-to-left, fully static.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| Business details (phones, email, address, WhatsApp) | `src/content/site.ts` |
| Services (10 pages: copy, facts, FAQs, photos) | `src/content/services.ts`, `src/content/service-nav.ts` |
| Coverage numbers per city | `src/content/cities.ts` |
| Testimonials (from the clients' letters) | `src/content/testimonials.ts` |
| Client logos | `src/content/clients.ts` |
| Photos and gallery categories | `src/content/media.ts`, images in `src/assets/images` |
| Blog articles (Markdown) | `src/content/posts/` |
| Design tokens (colors, fonts, utilities) | `src/app/globals.css` |
| Logo (true vector, from the original `.ai` file) | `src/components/brand/` |

### Adding a blog article

1. Create `src/content/posts/my-article.ts` exporting `body` (Markdown).
2. Add an entry at the top of the `sources` list in `src/content/posts/index.ts` (title, description, date, cover photo, related service).

### Adding photos

Put the image in `src/assets/images/work/`, import it in `src/content/media.ts`, give it a Hebrew `alt`, and add it to `gallery` with a category.

## Contact form

The form posts to a server action (`src/app/contact/actions.ts`).

- With `RESEND_API_KEY` set, leads are emailed to `CONTACT_TO_EMAIL` (default `99Pirsum@gmail.com`) through [Resend](https://resend.com).
- Without it, visitors get a one-click button that sends the same details over WhatsApp, so no lead is lost.

See `.env.example`. On Vercel, set these under Project → Settings → Environment Variables.

## SEO

- Per-page metadata, Open Graph image, `sitemap.xml`, `robots.txt`, web manifest.
- JSON-LD: `AdvertisingAgency` (local business), `Service`, `BlogPosting`, `FAQPage`, `BreadcrumbList`.
- All old WordPress URLs (Hebrew slugs such as `/מי-אנחנו/`, `/תלי-דלת/`) permanently redirect to the new pages. See `next.config.ts`.

## Accessibility

Skip link, keyboard navigation, focus styles, semantic structure, alt text, `prefers-reduced-motion` support, and a built-in accessibility menu (text size, high contrast, link highlighting, readable font, stop animations). The accessibility statement is at `/accessibility`.

## Deploy

Import the GitHub repo in Vercel (framework preset: Next.js, no extra settings needed). Then point the `99pirsum.com` domain at the Vercel project.
