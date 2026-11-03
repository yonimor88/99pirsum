import type { NextConfig } from "next";

import { posthogConfig, posthogHosts } from "./src/lib/posthog-config";

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
  "הדבקת-מודעות-בכניסות-בניינים-פרסום-שא": "/blog/building-entrance-posters",
  "הפצה-בתיבות-דואר": "/blog/haredi-mailbox-distribution",
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // PostHog's endpoints end in a slash (/e/, /flags/). Next's automatic slash-stripping redirect
  // would break them behind /ingest, so it's off and the first redirect below does the job instead.
  skipTrailingSlashRedirect: true,
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
  images: {
    formats: ["image/avif", "image/webp"],
    // Source photos are at most 1600px wide; fewer widths = shorter srcset in every <img>
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [96, 192, 384],
  },
  async redirects() {
    const hebrew = Object.entries(legacyRedirects).flatMap(([slug, destination]) => {
      const encoded = encodeURIComponent(slug);
      const variants = new Set([encoded, encoded.toLowerCase()]);
      return [...variants].map((source) => ({
        source: `/${source}`,
        destination,
        permanent: true,
      }));
    });
    return [
      // Same as Next's default trailing-slash redirect (/about/ → /about), except for /ingest
      { source: "/:first((?!ingest(?![^/]))[^/]+)/:rest*/", destination: "/:first/:rest*", permanent: true },
      ...hebrew,
      // Other WordPress leftovers that search engines may still request
      { source: "/feed", destination: "/blog/feed.xml", permanent: true },
      { source: "/wp-content/uploads/:path*", destination: "/work", permanent: true },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/post-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
  async rewrites() {
    // Analytics proxy: the site's own domain forwards to PostHog (see src/lib/analytics.ts)
    const { apiPath } = posthogConfig;
    return [
      { source: `${apiPath}/static/:path*`, destination: `${posthogHosts.assets}/static/:path*` },
      { source: `${apiPath}/array/:path*`, destination: `${posthogHosts.assets}/array/:path*` },
      { source: `${apiPath}/:path*`, destination: `${posthogHosts.api}/:path*` },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Keep the *.vercel.app copies of the site out of search results
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.+\\.vercel\\.app)" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
