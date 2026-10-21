import { Mail, MapPin, Phone } from "lucide-react";

import { Dots } from "@/components/brand/ornaments";
import { WazeIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Mark, SectionHeading } from "@/components/ui/section-heading";
import { site, wazeLink, whatsappLink } from "@/content/site";
import { ContactForm } from "./contact-form";

export function ContactDetails() {
  return (
    <ul className="grid gap-3">
      {site.phones.map((p, i) => (
        <li key={p.href}>
          <a
            href={p.href}
            className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper p-4 transition hover:border-ink"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-yellow text-ink">
              <Phone className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block text-sm text-muted">{i === 0 ? "טלפון" : "טלפון נוסף"}</span>
              <span dir="ltr" className="block font-display text-2xl font-bold tabular-nums">
                {p.display}
              </span>
            </span>
          </a>
        </li>
      ))}
      <li>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper p-4 transition hover:border-ink"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-whatsapp text-ink">
            <WhatsAppIcon className="size-6" />
          </span>
          <span>
            <span className="block text-sm text-muted">וואטסאפ</span>
            <span className="block font-display text-xl font-bold">שלחו לנו הודעה</span>
          </span>
        </a>
      </li>
      <li>
        <a
          href={`mailto:${site.email}`}
          className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper p-4 transition hover:border-ink"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-cyan text-ink">
            <Mail className="size-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-sm text-muted">אימייל</span>
            <span className="block font-display text-lg font-bold break-all sm:text-xl">{site.email}</span>
          </span>
        </a>
      </li>
      <li>
        <a
          href={wazeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper p-4 transition hover:border-ink"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-magenta text-paper">
            <MapPin className="size-5" aria-hidden />
          </span>
          <span className="flex-1">
            <span className="block text-sm text-muted">המשרד שלנו</span>
            <span className="block font-display text-xl font-bold">{site.address.full}</span>
          </span>
          <WazeIcon className="size-6 text-muted transition group-hover:text-cyan-ink" />
        </a>
      </li>
    </ul>
  );
}

export function ContactSection({ index = "07" }: { index?: string }) {
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            index={index}
            eyebrow="צור קשר"
            title={
              <>
                אנחנו כאן
                <br />
                <Mark color="green">בשבילכם.</Mark>
              </>
            }
            description="השאירו פרטים ונחזור אליכם עם הצעה מסודרת — או פשוט התקשרו. מדברים איתנו ישירות, בלי מוקדנים."
          />
          <Reveal delay={0.15} className="mt-10">
            <ContactDetails />
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="relative rounded-[2rem] bg-paper-2 p-6 sm:p-10">
            <Dots className="absolute top-8 left-8" />
            <h3 className="font-display text-2xl font-bold">לקבלת הצעת מחיר</h3>
            <p className="mt-1 text-muted">שתי דקות, ואנחנו על זה.</p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
