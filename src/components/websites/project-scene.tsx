"use client";

import { ArrowUpLeft, Check } from "lucide-react";
import { m, useScroll, useTransform, type Variants } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { usePrefersLessMotion } from "@/components/a11y/motion-provider";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/content/site";
import type { Website } from "@/content/websites";
import { cn } from "@/lib/cn";
import { BROWSER_SCREEN_RATIO, BrowserFrame, PHONE_SCREEN_RATIO, PhoneFrame, scrollTravel } from "./device-frames";

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 18 } },
};
const pop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } },
};

/**
 * One project. On large screens the scene pins to the viewport while the page
 * scrolls, and the live site's full-page capture scrolls inside the laptop and
 * phone. On phones it's a normal block and the captures scroll as it passes.
 */
export function ProjectScene({ site, index, total }: { site: Website; index: number; total: number }) {
  const ref = useRef<HTMLElement>(null);
  const lessMotion = usePrefersLessMotion();
  const flip = index % 2 === 1;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const desktopY = useTransform(scrollYProgress, [0.27, 0.73], ["0%", `-${scrollTravel(site.shots.desktopLong, BROWSER_SCREEN_RATIO)}%`]);
  const phoneY = useTransform(scrollYProgress, [0.25, 0.75], ["0%", `-${scrollTravel(site.shots.mobileLong, PHONE_SCREEN_RATIO)}%`]);
  const progress = useTransform(scrollYProgress, [0.27, 0.73], [0, 1]);
  const enterScale = useTransform(scrollYProgress, [0.05, 0.27], [0.86, 1]);
  const enterTilt = useTransform(scrollYProgress, [0.05, 0.27], [14, 0]);
  const exitLift = useTransform(scrollYProgress, [0.73, 0.95], [0, -60]);
  const phoneLift = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [90, 0, -50]);
  const glowScale = useTransform(scrollYProgress, [0.1, 0.4, 0.9], [0.6, 1.1, 0.8]);

  const number = String(index + 1).padStart(2, "0");

  return (
    <section ref={ref} aria-labelledby={`site-${site.slug}`} className="relative lg:h-[300vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-14 lg:py-0">
          {/* Devices */}
          <div className={cn("relative lg:col-span-7", flip && "lg:order-2")}>
            <m.div
              aria-hidden
              className="absolute inset-[8%] -z-10 rounded-full opacity-50 blur-[90px]"
              style={{ backgroundColor: site.glow, scale: lessMotion ? 1 : glowScale }}
            />
            <div className="[perspective:1600px]">
              <m.div style={lessMotion ? undefined : { scale: enterScale, rotateX: enterTilt, y: exitLift }} className="origin-bottom">
                <BrowserFrame domain={site.domain} tone="dark">
                  <m.div style={{ y: desktopY }} className="absolute inset-x-0 top-0 will-change-transform">
                    <Image
                      src={site.shots.desktopLong}
                      alt={`צילום מסך מלא של האתר ${site.name}`}
                      sizes="(min-width: 1024px) 52vw, 92vw"
                      className="h-auto w-full"
                    />
                  </m.div>
                  {/* scroll progress */}
                  <m.span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1 origin-right"
                    style={{ scaleX: progress, backgroundColor: site.glow }}
                  />
                </BrowserFrame>
              </m.div>
            </div>
            <m.div
              className={cn("absolute -bottom-10 w-[26%] sm:-bottom-14", flip ? "-right-2 sm:-right-6" : "-left-2 sm:-left-6")}
              style={lessMotion ? undefined : { y: phoneLift }}
            >
              <PhoneFrame className={flip ? "rotate-[5deg]" : "-rotate-[5deg]"}>
                <m.div style={{ y: phoneY }} className="absolute inset-x-0 top-0 will-change-transform">
                  <Image src={site.shots.mobileLong} alt={`האתר ${site.name} בטלפון`} sizes="(min-width: 1024px) 14vw, 26vw" className="h-auto w-full" />
                </m.div>
              </PhoneFrame>
            </m.div>
          </div>

          {/* Story */}
          <m.div
            className={cn("relative lg:col-span-5", flip && "lg:order-1")}
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <m.div variants={item} className="flex items-center gap-4">
              <span className="text-outline font-display text-6xl leading-none font-black sm:text-7xl" style={{ WebkitTextStrokeColor: site.glow }}>
                {number}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-xs tracking-widest text-paper/40 tabular-nums">
                  {number} / {String(total).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 px-3 py-1 text-sm text-paper/80">
                  <span className="size-2 rounded-full" style={{ backgroundColor: site.glow }} />
                  {site.industry}
                </span>
              </span>
            </m.div>

            <m.h3 variants={item} id={`site-${site.slug}`} className="mt-6 text-4xl leading-none font-black text-paper sm:text-5xl lg:text-[3.4rem]">
              {site.name}
            </m.h3>
            <m.p variants={item} className="mt-3 font-display text-xl font-semibold sm:text-2xl" style={{ color: site.glow }}>
              {site.headline}
            </m.p>
            <m.p variants={item} className="mt-4 text-lg leading-relaxed text-paper/70 lg:[@media(max-height:820px)]:hidden">
              {site.summary}
            </m.p>

            <m.dl variants={item} className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-paper/10 bg-paper/[0.04] p-4">
                <dt className="text-xs font-semibold tracking-wide text-paper/45">האתגר</dt>
                <dd className="mt-1.5 leading-relaxed text-paper/85">{site.challenge}</dd>
              </div>
              <div className="rounded-2xl border border-paper/10 bg-paper/[0.04] p-4">
                <dt className="text-xs font-semibold tracking-wide text-paper/45">מה בנינו</dt>
                <dd className="mt-1.5 leading-relaxed text-paper/85">{site.solution}</dd>
              </div>
            </m.dl>

            <m.ul variants={list} className="mt-6 flex flex-wrap gap-2" aria-label="מה יש באתר">
              {site.features.map((f) => (
                <m.li
                  key={f}
                  variants={pop}
                  className="inline-flex items-center gap-1.5 rounded-full bg-paper/[0.08] px-3 py-1.5 text-sm text-paper/90"
                >
                  <Check className="size-3.5" style={{ color: site.glow }} strokeWidth={3} aria-hidden />
                  {f}
                </m.li>
              ))}
            </m.ul>

            <m.div variants={item} className="mt-6 flex items-center gap-3">
              <span className="text-xs text-paper/45">פלטת הצבעים</span>
              <m.span variants={list} className="flex -space-x-1.5 space-x-reverse">
                {site.palette.map((c) => (
                  <m.span
                    key={c}
                    variants={pop}
                    whileHover={{ y: -6, scale: 1.25 }}
                    title={c}
                    className="size-7 rounded-full ring-2 ring-ink"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </m.span>
            </m.div>

            <m.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex h-12 items-center gap-2 rounded-full bg-paper px-6 font-display font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: `-4px 4px 0 0 ${site.glow}` }}
              >
                לאתר החי
                <ArrowUpLeft className="size-4 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden />
                <span className="sr-only">(נפתח בלשונית חדשה)</span>
              </a>
              <a
                href={whatsappLink(`שלום, ראיתי באתר שלכם את האתר של ${site.name} ואשמח לאתר כזה לעסק שלי`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full px-4 font-display font-semibold text-paper/85 transition-colors hover:bg-paper/10 hover:text-paper"
              >
                <WhatsAppIcon className="size-5 text-whatsapp" />
                אני רוצה אתר כזה
              </a>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
