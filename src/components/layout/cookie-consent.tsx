"use client";

import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { buttonClasses } from "@/components/ui/button";
import { closeCookieSettings, openCookieSettings, setConsent, useCookieConsent } from "@/lib/consent";
import { cn } from "@/lib/cn";

/** Bottom drawer asking about analytics cookies; reopened from the footer link. */
export function CookieConsent() {
  const { consent, settingsOpen } = useCookieConsent();
  const [delayPassed, setDelayPassed] = useState(false);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  // Let the page settle first instead of greeting visitors with a banner
  useEffect(() => {
    const timer = window.setTimeout(() => setDelayPassed(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCookieSettings();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [settingsOpen]);

  const open = settingsOpen || (delayPassed && consent === "pending");
  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-labelledby={titleId}
      className="enter-rise fixed inset-x-3 bottom-3 z-[45] mx-auto max-w-xl rounded-3xl bg-ink p-5 text-paper ring-1 ring-paper/15 shadow-[0_30px_60px_-20px_rgba(20,20,20,0.6)] sm:bottom-6 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <span className="hidden size-12 shrink-0 place-items-center rounded-full bg-yellow text-ink sm:grid" aria-hidden>
          <Cookie className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 id={titleId} className="font-display text-xl font-bold">
              עוגיות? רק כדי להשתפר
            </h2>
            {settingsOpen && (
              <button
                type="button"
                onClick={closeCookieSettings}
                className="-mt-1 -me-2 grid size-9 shrink-0 place-items-center rounded-full hover:bg-paper/10"
                aria-label="סגירה"
              >
                <X className="size-4" aria-hidden />
              </button>
            )}
          </div>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-paper/80">
            נשמח להשתמש בעוגיות כדי להבין אילו עמודים באמת עוזרים לכם ולשפר את האתר. בלי אישור נמדוד רק נתונים כלליים,
            בלי עוגיות ובלי לזהות אתכם.{" "}
            <Link href="/privacy" className="font-medium text-paper underline underline-offset-4 hover:text-yellow">
              מדיניות הפרטיות
            </Link>
          </p>
          {settingsOpen && consent !== "pending" && (
            <p className="mt-2 text-sm text-paper/60">
              הבחירה הנוכחית שלכם: {consent === "granted" ? "אישרתם עוגיות" : "בלי עוגיות"}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setConsent("granted")}
              className={buttonClasses({ variant: "paper" })}
            >
              מאשרים, בכיף
            </button>
            <button
              type="button"
              onClick={() => setConsent("denied")}
              className={buttonClasses({ variant: "outline-light" })}
            >
              לא, תודה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the drawer to change the choice */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={cn("cursor-pointer", className)}>
      הגדרות עוגיות
    </button>
  );
}
