import type { NextConfig } from "next";

/**
 * Old WordPress URLs (Hebrew slugs) → new routes, so existing links and
 * search rankings keep working after the move off WordPress.
 */
const legacyRedirects: Record<string, string> = {
  "דף-הבית": "/",
  "אודותינו": "/about",
  "מי-אנחנו": "/about",
  "מה-אנחנו-עושים": "/services",
  "המומחיות-שלנו": "/services",
  "ממליצים": "/testimonials",
  "ממליצים-עלינו": "/testimonials",
  "פרסום": "/services/advertising-branding",
  "שילוט": "/services/signage",
  "הפצת-עלונים": "/services/mailbox-distribution",
  "תלי-דלת": "/services/door-hangers",
  "הדבקת-מודעות": "/services/poster-boards",
  "עלוני-שבת": "/services/synagogues",
  "דפוס": "/services/printing",
  "קונסטרוקציה-לשלטים": "/services/sign-construction",
  "מאמרים": "/blog",
  "הדבקת-מודעות-בכניסות-בניינים": "/blog/building-entrance-posters",
  "הפצה-בתיבות-דואר": "/blog/haredi-mailbox-distribution",
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return Object.entries(legacyRedirects).flatMap(([slug, destination]) => {
      const encoded = encodeURIComponent(slug);
      const variants = new Set([encoded, encoded.toLowerCase()]);
      return [...variants].map((source) => ({
        source: `/${source}`,
        destination,
        permanent: true,
      }));
    });
  },
};

export default nextConfig;
