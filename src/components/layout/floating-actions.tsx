"use client";

import { Accessibility, Contrast, Link2, Minus, Pause, Plus, RotateCcw, Type, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { applyA11yClasses, resetA11y, updateA11y, useA11ySettings } from "@/components/a11y/a11y-store";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/content/site";
import { cn } from "@/lib/cn";

/** WhatsApp button (bottom-left) and accessibility menu (bottom-right). */
export function FloatingActions() {
  return (
    <>
      <WhatsAppFab />
      <AccessibilityMenu />
    </>
  );
}

function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שליחת הודעת וואטסאפ ל-99 פרסום ומדיה"
      className="group fixed bottom-5 left-5 z-40 flex items-center gap-3 sm:bottom-7 sm:left-7"
      initial={{ opacity: 0, scale: 0.4, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.4 }}
    >
      <span className="relative grid size-14 place-items-center rounded-full bg-whatsapp text-ink shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-transform group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-25 [animation-duration:2.6s]" aria-hidden />
        <WhatsAppIcon className="relative size-7" />
      </span>
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-ink px-4 py-2 font-display text-sm font-semibold text-paper opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 md:block">
        דברו איתנו בוואטסאפ
      </span>
    </motion.a>
  );
}

function AccessibilityMenu() {
  const settings = useA11ySettings();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyA11yClasses(settings);
  }, [settings]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const toggles = [
    { key: "contrast", label: "ניגודיות גבוהה", icon: Contrast },
    { key: "links", label: "הדגשת קישורים", icon: Link2 },
    { key: "readable", label: "גופן קריא", icon: Type },
    { key: "noMotion", label: "עצירת אנימציות", icon: Pause },
  ] as const;

  return (
    <div className="fixed right-5 bottom-5 z-40 sm:right-7 sm:bottom-7">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-label="תפריט נגישות"
            className="absolute right-0 bottom-16 w-72 rounded-3xl border border-ink/10 bg-paper p-4 shadow-[0_30px_60px_-20px_rgba(20,20,20,0.45)]"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "bottom right" }}
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-bold">נגישות</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-full hover:bg-ink/5"
                aria-label="סגירת תפריט נגישות"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-2xl bg-paper-2 p-2">
              <span className="ps-2 text-sm font-medium">גודל טקסט</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full bg-paper disabled:opacity-40"
                  onClick={() => updateA11y({ text: Math.max(0, settings.text - 1) as 0 | 1 | 2 })}
                  disabled={settings.text === 0}
                  aria-label="הקטנת טקסט"
                >
                  <Minus className="size-4" aria-hidden />
                </button>
                <span className="w-8 text-center font-display text-sm tabular-nums" aria-live="polite">
                  {["100%", "112%", "125%"][settings.text]}
                </span>
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full bg-paper disabled:opacity-40"
                  onClick={() => updateA11y({ text: Math.min(2, settings.text + 1) as 0 | 1 | 2 })}
                  disabled={settings.text === 2}
                  aria-label="הגדלת טקסט"
                >
                  <Plus className="size-4" aria-hidden />
                </button>
              </div>
            </div>

            <ul className="mt-2 grid grid-cols-2 gap-2">
              {toggles.map(({ key, label, icon: Icon }) => {
                const active = settings[key];
                return (
                  <li key={key}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => updateA11y({ [key]: !active })}
                      className={cn(
                        "flex h-full w-full flex-col items-start gap-2 rounded-2xl border p-3 text-start text-sm font-medium transition-colors",
                        active ? "border-ink bg-ink text-paper" : "border-ink/10 bg-paper hover:border-ink/30",
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3 text-sm">
              <button type="button" onClick={resetA11y} className="flex items-center gap-1.5 font-medium hover:underline">
                <RotateCcw className="size-4" aria-hidden />
                איפוס
              </button>
              <Link href="/accessibility" onClick={() => setOpen(false)} className="font-medium underline-offset-4 hover:underline">
                הצהרת נגישות
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="תפריט נגישות"
        className="grid size-12 place-items-center rounded-full bg-ink text-paper shadow-lg ring-2 ring-paper/30 transition hover:scale-105 hover:bg-cyan-ink"
      >
        <Accessibility className="size-6" aria-hidden />
      </button>
    </div>
  );
}
