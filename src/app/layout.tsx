import type { Metadata, Viewport } from "next";
import { Frank_Ruhl_Libre, Heebo, Rubik } from "next/font/google";

import { a11yBootScript } from "@/components/a11y/a11y-store";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import { localBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

const rubik = Rubik({ subsets: ["hebrew", "latin"], variable: "--font-rubik", display: "swap" });
const heebo = Heebo({ subsets: ["hebrew", "latin"], variable: "--font-heebo", display: "swap" });
const frank = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-frank",
  display: "swap",
  weight: ["400", "500", "700"],
  // only used for testimonial quotes further down the page
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "99 פרסום ומדיה — פרסום והפצה למגזר החרדי והדתי",
    template: "%s | 99 פרסום ומדיה",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: site.name,
    title: "99 פרסום ומדיה — פרסום והפצה למגזר החרדי והדתי",
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f2ea",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${rubik.variable} ${heebo.variable} ${frank.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: a11yBootScript }} />
      </head>
      <body className="paper-grain min-h-svh">
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <FloatingActions />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
