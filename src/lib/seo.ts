import type { Metadata } from "next";

import { allCityNames } from "@/content/cities";
import { serviceNav } from "@/content/service-nav";
import { site } from "@/content/site";

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export const rssAlternate = { "application/rss+xml": [{ url: "/blog/feed.xml", title: "מאמרים — 99 פרסום ומדיה" }] };

const defaultOgImage = {
  src: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "99 פרסום ומדיה — המסר שלכם, בכל בית, בכל לוח",
};

export function pageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: { src: string; width: number; height: number; alt: string };
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path, types: rssAlternate },
    openGraph: {
      type,
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "he_IL",
      images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AdvertisingAgency",
    "@id": absoluteUrl("/#business"),
    name: site.name,
    alternateName: ["99 פרסום", "99pirsum"],
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    image: [absoluteUrl("/opengraph-image.png"), absoluteUrl("/logo.png")],
    geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.geo.latitude},${site.geo.longitude}`,
    knowsAbout: [
      "פרסום במגזר החרדי",
      "הפצת עלונים",
      "הדבקת מודעות",
      "תלי דלת",
      "עלוני שבת",
      "דפוס דיגיטלי",
      "שילוט",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "שירותי פרסום והפצה",
      itemListElement: serviceNav.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: absoluteUrl(`/services/${s.slug}`) },
      })),
    },
    telephone: "+972-50-844-5450",
    email: site.email,
    foundingDate: String(site.foundingYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.zip,
      addressCountry: "IL",
    },
    areaServed: allCityNames.map((name) => ({ "@type": "City", name })),
    sameAs: [site.facebook],
    contactPoint: site.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.href.replace("tel:", ""),
      contactType: "sales",
      areaServed: "IL",
      availableLanguage: ["Hebrew"],
    })),
  };
}

/** Tells Google the site's name (shown above results) and links it to the business. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: site.name,
    alternateName: ["99 פרסום", "99pirsum"],
    url: absoluteUrl("/"),
    inLanguage: "he-IL",
    publisher: { "@id": absoluteUrl("/#business") },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
