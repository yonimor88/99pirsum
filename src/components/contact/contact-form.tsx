"use client";

import { ArrowUpLeft, CheckCircle2, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useActionState, useId } from "react";

import { submitLead, type LeadState } from "@/app/contact/actions";
import { buttonClasses } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { serviceNav } from "@/content/service-nav";
import { whatsappLink } from "@/content/site";
import { cn } from "@/lib/cn";

const initial: LeadState = { status: "idle" };

export function ContactForm({ defaultService, tone = "paper" }: { defaultService?: string; tone?: "paper" | "white" }) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const id = useId();

  const fieldClass = cn(
    "w-full rounded-2xl border-2 border-transparent px-4 py-3.5 text-lg text-ink transition-colors outline-none placeholder:text-muted-2 focus:border-ink",
    tone === "white" ? "bg-paper" : "bg-white",
  );

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <motion.div
            key="success"
            className="flex flex-col items-start py-10"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            role="status"
          >
            <div className="flex gap-2" aria-hidden>
              {["bg-yellow", "bg-green", "bg-cyan", "bg-magenta"].map((c, i) => (
                <motion.span
                  key={c}
                  className={cn("size-5 rounded-full", c)}
                  initial={{ y: -30, scale: 0 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12, delay: i * 0.08 }}
                />
              ))}
            </div>
            <CheckCircle2 className="mt-6 size-10 text-green-ink" aria-hidden />
            <h3 className="mt-4 font-display text-3xl font-bold">תודה! הפנייה התקבלה.</h3>
            <p className="mt-2 text-lg text-muted">נחזור אליכם בהקדם. רוצים לזרז? אפשר תמיד לשלוח לנו הודעה בוואטסאפ.</p>
          </motion.div>
        ) : state.status === "fallback" ? (
          <motion.div key="fallback" className="py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status">
            <h3 className="font-display text-3xl font-bold">כמעט סיימנו</h3>
            <p className="mt-3 text-lg text-muted">
              לחצו על הכפתור כדי לשלוח לנו את הפרטים בוואטסאפ — ההודעה כבר מוכנה, רק לשלוח.
            </p>
            <a
              href={whatsappLink(state.whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variant: "whatsapp", size: "lg", className: "mt-6" })}
            >
              <WhatsAppIcon className="size-5" />
              שליחת הפרטים בוואטסאפ
            </a>
          </motion.div>
        ) : (
          <motion.form key="form" action={action} className="grid gap-4" initial={false} exit={{ opacity: 0 }} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="שם מלא" htmlFor={`${id}-name`} error={state.errors?.name}>
                <input
                  id={`${id}-name`}
                  name="name"
                  autoComplete="name"
                  required
                  className={fieldClass}
                  placeholder="איך לפנות אליכם?"
                  aria-invalid={Boolean(state.errors?.name)}
                />
              </Field>
              <Field label="טלפון" htmlFor={`${id}-phone`} error={state.errors?.phone}>
                <input
                  id={`${id}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  dir="ltr"
                  className={cn(fieldClass, "text-right")}
                  placeholder="050-0000000"
                  aria-invalid={Boolean(state.errors?.phone)}
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="במה נוכל לעזור?" htmlFor={`${id}-service`}>
                <select
                  id={`${id}-service`}
                  name="service"
                  defaultValue={defaultService ?? ""}
                  className={cn(fieldClass, "appearance-none bg-[length:1.1rem] bg-[left_1rem_center] bg-no-repeat")}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23141414' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                  }}
                >
                  <option value="">בחרו שירות</option>
                  {serviceNav.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="אחר / עוד לא בטוחים">אחר / עוד לא בטוחים</option>
                </select>
              </Field>
              <Field label="עיר (לא חובה)" htmlFor={`${id}-city`}>
                <input id={`${id}-city`} name="city" className={fieldClass} placeholder="למשל: בני ברק" />
              </Field>
            </div>
            <Field label="ספרו לנו קצת (לא חובה)" htmlFor={`${id}-message`}>
              <textarea
                id={`${id}-message`}
                name="message"
                rows={4}
                className={cn(fieldClass, "resize-none")}
                placeholder="מה רוצים לפרסם, כמות משוערת, תאריך יעד..."
              />
            </Field>
            {/* honeypot */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                חברה
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <button type="submit" disabled={pending} className={buttonClasses({ size: "lg", className: "disabled:opacity-70" })}>
                {pending ? (
                  <>
                    <LoaderCircle className="size-5 animate-spin" aria-hidden />
                    שולחים...
                  </>
                ) : (
                  <>
                    שליחה
                    <ArrowUpLeft className="size-5" aria-hidden />
                  </>
                )}
              </button>
              <p className="text-sm text-muted">הפרטים משמשים רק כדי לחזור אליכם.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block font-display text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm font-medium text-magenta-ink" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
