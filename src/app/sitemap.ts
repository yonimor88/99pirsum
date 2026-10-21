import type { MetadataRoute } from "next";

import { cities } from "@/content/cities";
import { gallery, photos, type Photo } from "@/content/media";
import { posts } from "@/content/posts";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

/** Bump when page content changes. */
const SITE_UPDATED = "2026-10-22";

const img = (list: Photo[]) => [...new Set(list.map((p) => absoluteUrl(p.src.src)))];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; images?: string[] }[] = [
    { path: "/", priority: 1, images: [absoluteUrl("/opengraph-image.png"), ...img([photos.boardReader, photos.mailboxesTall, photos.doorHangersHall])] },
    { path: "/services", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/areas", priority: 0.8, images: img([photos.cityAerial]) },
    { path: "/work", priority: 0.7, images: img(gallery) },
    { path: "/testimonials", priority: 0.6 },
    { path: "/about", priority: 0.6, images: img([photos.boardReaderTall]) },
    { path: "/blog", priority: 0.6 },
    { path: "/accessibility", priority: 0.2 },
    { path: "/privacy", priority: 0.2 },
  ];

  return [
    ...pages.map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: p.priority,
      ...(p.images && { images: p.images }),
    })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: img([s.hero, ...s.gallery]),
    })),
    ...cities.map((c) => ({
      url: absoluteUrl(`/areas/${c.slug}`),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updated ?? p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: img([p.cover]),
    })),
  ];
}
