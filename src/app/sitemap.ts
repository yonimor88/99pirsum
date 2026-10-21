import type { MetadataRoute } from "next";

import { posts } from "@/content/posts";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

/** Bump when page content changes. */
const SITE_UPDATED = "2026-10-21";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services", "/areas", "/work", "/testimonials", "/about", "/blog", "/contact", "/accessibility", "/privacy"];
  return [
    ...pages.map((path) => ({
      url: absoluteUrl(path),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path === "/services" || path === "/contact" ? 0.9 : 0.6,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updated ?? p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
