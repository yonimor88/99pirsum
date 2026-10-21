"use client";

import { Camera, MessagesSquare, PenTool, Truck, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

const steps: { icon: LucideIcon; title: string; text: string; color: string }[] = [
  {
    icon: MessagesSquare,
    title: "שיחת היכרות",
    text: "מספרים לנו מה רוצים להשיג, למי ובאיזה תקציב — ונציע את תמהיל הערוצים הנכון, בלי לנפח.",
    color: "bg-yellow",
  },
  {
    icon: PenTool,
    title: "עיצוב והפקה",
    text: "הסטודיו מעצב, הדפוס מדפיס. יש לכם כבר קובץ או חומר מוכן? מצוין, ממשיכים משם.",
    color: "bg-green",
  },
  {
    icon: Truck,
    title: "יוצאים לשטח",
    text: "צוות קבוע מפיץ, מדביק ותולה — בימים קבועים, בכל העיר ובכל הערים.",
    color: "bg-cyan",
  },
  {
    icon: Camera,
    title: "דיווח ותמונות",
    text: "תמונות מהשטח ישר לוואטסאפ, פיקוח מדגמי ודיווח בסיום. אתם יודעים בדיוק מה נעשה.",
    color: "bg-magenta",
  },
];

export function Process() {
  return (
    <div className="relative mt-14">
      <svg
        aria-hidden
        className="absolute top-8 right-[12%] left-[12%] hidden h-4 w-[76%] lg:block"
        viewBox="0 0 1000 16"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M1000 8 H0"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 10"
          fill="none"
          className="text-ink/25"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 1.6, ease: EASE }}
        />
      </svg>

      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.li
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.18 }}
            >
              <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                <motion.span
                  className={cn("relative grid size-16 shrink-0 place-items-center rounded-2xl text-ink", step.color)}
                  initial={{ rotate: -14, scale: 0.7 }}
                  whileInView={{ rotate: i % 2 ? 5 : -5, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.3 + i * 0.18 }}
                >
                  <Icon className="size-7" strokeWidth={1.75} aria-hidden />
                  <span className="absolute -top-2 -left-2 grid size-7 place-items-center rounded-full bg-ink font-display text-xs font-bold text-paper tabular-nums">
                    {i + 1}
                  </span>
                </motion.span>
                <h3 className="font-display text-2xl font-bold lg:mt-6">{step.title}</h3>
              </div>
              <p className="mt-3 leading-relaxed text-muted lg:mt-2">{step.text}</p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
