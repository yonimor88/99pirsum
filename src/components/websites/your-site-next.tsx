"use client";

import { ArrowUpLeft, Phone, Sparkles } from "lucide-react";
import { m, useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { usePrefersLessMotion } from "@/components/a11y/motion-provider";
import { buttonClasses } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { primaryPhone, whatsappLink } from "@/content/site";
import { BrowserFrame } from "./device-frames";

const DOMAINS = ["העסק-שלכם.co.il", "your-business.co.il", "המותג-הבא.com"];

/** Closing call to action: an empty browser window waiting for the visitor's site. */
export function YourSiteNext() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const lessMotion = usePrefersLessMotion();
  const [text, setText] = useState(DOMAINS[0]);

  // Type, pause, delete, next domain
  useEffect(() => {
    if (!inView || lessMotion) return;
    let word = 0;
    let len = 0;
    let deleting = false;
    let id: ReturnType<typeof setTimeout>;
    const step = () => {
      const target = DOMAINS[word];
      len += deleting ? -1 : 1;
      setText(target.slice(0, len));
      let wait = deleting ? 35 : 85;
      if (!deleting && len === target.length) {
        deleting = true;
        wait = 1800;
      } else if (deleting && len === 0) {
        deleting = false;
        word = (word + 1) % DOMAINS.length;
        wait = 300;
      }
      id = setTimeout(step, wait);
    };
    id = setTimeout(step, 400);
    return () => clearTimeout(id);
  }, [inView, lessMotion]);

  return (
    <section className="container-page py-16 lg:py-24">
      <div ref={ref} className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-paper sm:px-12 lg:px-16 lg:py-20">
        <div aria-hidden className="halftone absolute inset-y-0 left-0 w-1/2 text-paper/10 [mask-image:linear-gradient(to_left,transparent,black)]" />
        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-paper/60">
              <Sparkles className="size-4 text-yellow" aria-hidden />
              המקום הבא בתיק העבודות
            </p>
            <h2 className="mt-5 text-4xl leading-[1.05] font-black sm:text-5xl lg:text-6xl">
              האתר הבא כאן?
              <br />
              <span className="text-yellow">שיהיה שלכם.</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg text-paper/70 sm:text-xl">
              ספרו לנו על העסק בכמה מילים — ונחזור אליכם עם רעיון, כיוון עיצובי והצעת מחיר מסודרת.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={whatsappLink("שלום, ראיתי את האתרים שבניתם ואשמח לשמוע על אתר לעסק שלי")}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "whatsapp", size: "lg" })}
              >
                <WhatsAppIcon className="size-5" />
                בואו נדבר על האתר שלי
              </a>
              <Link href="/contact" className={buttonClasses({ variant: "yellow", size: "lg" })}>
                להשאיר פרטים
                <ArrowUpLeft className="size-5" aria-hidden />
              </Link>
              <a href={primaryPhone.href} className={buttonClasses({ variant: "outline-light", size: "lg" })}>
                <Phone className="size-5" aria-hidden />
                <span dir="ltr" className="tabular-nums">
                  {primaryPhone.display}
                </span>
              </a>
            </div>
          </div>

          <m.div
            aria-hidden
            initial={{ opacity: 0, y: 50, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 80, damping: 16 }}
          >
            <BrowserFrame
              domain={
                <span dir="ltr">
                  {text}
                  <span className="ms-px inline-block h-3 w-px translate-y-0.5 animate-pulse bg-current" />
                </span>
              }
            >
              <div className="absolute inset-0 flex flex-col gap-3 bg-paper p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="h-4 w-20 rounded-full bg-ink/80" />
                  <span className="flex gap-2">
                    <span className="h-2.5 w-10 rounded-full bg-ink/15" />
                    <span className="h-2.5 w-10 rounded-full bg-ink/15" />
                    <span className="h-2.5 w-10 rounded-full bg-ink/15" />
                  </span>
                </div>
                <div className="mt-4 grid flex-1 grid-cols-[1.2fr_1fr] gap-5">
                  <div className="flex flex-col justify-center gap-2.5">
                    <Shimmer className="h-6 w-full" />
                    <Shimmer className="h-6 w-4/5" />
                    <Shimmer className="mt-2 h-2.5 w-full opacity-60" />
                    <Shimmer className="h-2.5 w-3/4 opacity-60" />
                    <span className="mt-3 h-8 w-28 rounded-full bg-yellow" />
                  </div>
                  <div className="grid place-items-center rounded-2xl border-2 border-dashed border-ink/20 p-3 text-center">
                    <span className="font-display text-sm font-bold text-ink/50 sm:text-base">
                      המקום הזה
                      <br />
                      שמור לכם
                    </span>
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </m.div>
        </div>
      </div>
    </section>
  );
}

function Shimmer({ className }: { className?: string }) {
  return (
    <span className={`relative block overflow-hidden rounded-full bg-ink/10 ${className ?? ""}`}>
      <m.span
        className="absolute inset-y-0 w-1/2 bg-gradient-to-l from-transparent via-white/80 to-transparent"
        initial={{ x: "-120%" }}
        animate={{ x: "320%" }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
      />
    </span>
  );
}
