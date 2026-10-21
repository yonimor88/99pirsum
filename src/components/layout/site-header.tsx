"use client";

import { ArrowUpLeft, ChevronDown, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import megaPhoto from "@/assets/images/work/board-reader.jpg";
import { LogoMark } from "@/components/brand/logo";
import { Dots } from "@/components/brand/ornaments";
import { buttonClasses } from "@/components/ui/button";
import { ServiceGlyph, WhatsAppIcon } from "@/components/ui/icons";
import { accentBg, serviceGroups, serviceNav } from "@/content/service-nav";
import { mainNav, primaryPhone, whatsappLink } from "@/content/site";
import { cn } from "@/lib/cn";

/*
 * Menus mount on first use (keeping the initial page light), then stay in the DOM
 * (inert while closed). They animate with CSS transitions; the first opening
 * uses @starting-style (Tailwind's `starting:` variant) for its entry.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaMounted, setMegaMounted] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaOpenedAt = useRef(0);
  const state = useRef({ menuOpen, megaOpen });

  useEffect(() => {
    state.current = { menuOpen, megaOpen };
  }, [menuOpen, megaOpen]);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 12);
      if (state.current.megaOpen && Math.abs(y - megaOpenedAt.current) > 60) setMegaOpen(false);
      setHidden(y > 480 && y > last + 2 && !state.current.menuOpen && !state.current.megaOpen);
      last = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setMegaOpen(false);
  };

  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    if (!megaOpen) megaOpenedAt.current = window.scrollY;
    setMegaMounted(true);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMegaOpen(false), 160);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const solid = scrolled || megaOpen;

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 right-3 z-[120] -translate-y-24 rounded-full bg-ink px-5 py-3 font-display text-paper transition focus:translate-y-0"
      >
        דלג לתוכן הראשי
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out-expo)]",
          hidden && "-translate-y-[110%]",
        )}
        onMouseLeave={scheduleCloseMega}
      >
        <div
          className={cn(
            "transition-[background-color,box-shadow,backdrop-filter] duration-500",
            solid ? "bg-paper/88 shadow-[0_1px_0_0_rgb(20_20_20/0.08)] backdrop-blur-xl" : "bg-transparent",
          )}
        >
          <div className="container-page flex h-[4.5rem] items-center gap-6 lg:h-20">
            <Link href="/" onClick={closeAll} className="group flex shrink-0 items-center gap-3" aria-label="99 פרסום ומדיה — דף הבית">
              <LogoMark className="h-9 w-auto text-ink transition-transform duration-500 group-hover:-rotate-3 lg:h-10" title="" />
              <span className="hidden flex-col leading-none sm:flex">
                <span className="font-display text-[1.05rem] font-bold text-ink">פרסום ומדיה</span>
                <span className="mt-1 text-xs text-muted">תמיד שואפים ל-100%</span>
              </span>
            </Link>

            <nav aria-label="ניווט ראשי" className="hidden flex-1 justify-center lg:flex">
              <ul className="flex items-center gap-1">
                {mainNav.map((item) =>
                  item.href === "/services" ? (
                    <li key={item.href} onMouseEnter={openMega}>
                      <button
                        type="button"
                        className={cn(
                          "relative flex items-center gap-1.5 rounded-full px-4 py-2 font-display font-medium text-ink transition-colors hover:bg-ink/5",
                          (megaOpen || isActive(item.href)) && "bg-ink/5",
                        )}
                        aria-expanded={megaOpen}
                        aria-controls="mega-menu"
                        onClick={() => (megaOpen ? setMegaOpen(false) : openMega())}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn("size-4 transition-transform duration-300", megaOpen && "rotate-180")}
                          aria-hidden
                        />
                      </button>
                    </li>
                  ) : (
                    <li key={item.href} onMouseEnter={scheduleCloseMega}>
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        className="group relative flex rounded-full px-4 py-2 font-display font-medium text-ink transition-colors hover:bg-ink/5"
                        aria-current={isActive(item.href) ? "page" : undefined}
                      >
                        {item.label}
                        {isActive(item.href) && (
                          <span className="pop-in absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-magenta" />
                        )}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="ms-auto flex items-center gap-2 lg:ms-0">
              <a
                href={primaryPhone.href}
                className="hidden items-center gap-2 rounded-full px-3 py-2 font-display font-semibold text-ink tabular-nums transition-colors hover:bg-ink/5 xl:flex"
                dir="ltr"
              >
                <span>{primaryPhone.display}</span>
                <Phone className="size-4" aria-hidden />
              </a>
              <Link
                href="/contact"
                onClick={closeAll}
                className={buttonClasses({
                  variant: "ink",
                  className: "h-10 px-4 text-sm max-[359px]:hidden sm:h-11 sm:px-5 sm:text-[0.95rem]",
                })}
              >
                לקבלת הצעת מחיר
              </Link>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full bg-ink text-paper lg:hidden"
                onClick={() => {
                  setMenuMounted(true);
                  setMenuOpen(true);
                }}
                aria-label="פתיחת תפריט"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        {megaMounted && (
          <div
            id="mega-menu"
            inert={!megaOpen}
            className={cn(
              "absolute inset-x-0 top-full hidden transition-[opacity,translate,visibility] duration-300 ease-[var(--ease-out-expo)] lg:block",
              megaOpen
                ? "visible translate-y-0 opacity-100 starting:-translate-y-3 starting:opacity-0"
                : "invisible -translate-y-3 opacity-0",
            )}
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <div className="container-page">
              <div className="grid grid-cols-[1fr_1fr_1fr_17rem] gap-8 rounded-b-[2rem] border border-t-0 border-ink/8 bg-paper p-8 shadow-[0_40px_80px_-40px_rgba(20,20,20,0.45)]">
                {serviceGroups.map((group) => (
                  <div key={group.id}>
                    <p className="font-display text-xs font-bold tracking-wide text-muted">{group.title}</p>
                    <ul className="mt-4 space-y-1">
                      {serviceNav
                        .filter((s) => s.group === group.id)
                        .map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              onClick={closeAll}
                              className="group flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-paper-2"
                            >
                              <span
                                className={cn(
                                  "grid size-10 shrink-0 place-items-center rounded-xl text-ink transition-transform duration-300 group-hover:-rotate-6",
                                  accentBg[s.accent],
                                )}
                              >
                                <ServiceGlyph icon={s.icon} className="size-5" />
                              </span>
                              <span>
                                <span className="block font-display font-semibold text-ink">{s.title}</span>
                                <span className="mt-0.5 block text-sm leading-snug text-muted">{s.blurb}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
                <Link
                  href="/services"
                  onClick={closeAll}
                  className="group relative flex flex-col justify-end overflow-hidden rounded-3xl bg-ink p-5 text-paper"
                >
                  <Image
                    src={megaPhoto}
                    alt=""
                    fill
                    sizes="17rem"
                    className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <span className="relative">
                    <Dots />
                    <span className="mt-3 block font-display text-xl font-bold">כל השירותים</span>
                    <span className="mt-1 block text-sm text-paper/70">לא בטוחים מה מתאים לכם? נשמח לייעץ.</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-yellow">
                      לסקירה המלאה
                      <ArrowUpLeft className="size-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {menuMounted && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="תפריט"
          inert={!menuOpen}
          className={cn(
            "fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-paper transition-[clip-path,visibility] duration-600 ease-[var(--ease-out-expo)] lg:hidden",
            menuOpen
              ? "visible [clip-path:circle(150%_at_2.5rem_2.25rem)] starting:[clip-path:circle(0%_at_2.5rem_2.25rem)]"
              : "invisible [clip-path:circle(0%_at_2.5rem_2.25rem)]",
          )}
        >
          <div className="container-page flex h-[4.5rem] shrink-0 items-center justify-between">
            <Link href="/" onClick={closeAll} aria-label="דף הבית">
              <LogoMark className="h-9 w-auto text-paper" title="" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="grid size-11 place-items-center rounded-full bg-paper text-ink"
              aria-label="סגירת תפריט"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="ניווט ראשי (נייד)" className="container-page flex-1 pt-6 pb-10">
            <ul className="space-y-1">
              {[{ href: "/", label: "דף הבית" }, ...mainNav, { href: "/contact", label: "צור קשר" }].map((item, i) => (
                <li
                  key={item.href}
                  className={cn(
                    "transition-[opacity,translate] duration-500 ease-[var(--ease-out-expo)]",
                    menuOpen ? "translate-x-0 opacity-100 starting:translate-x-10 starting:opacity-0" : "translate-x-10 opacity-0",
                  )}
                  style={{ transitionDelay: menuOpen ? `${150 + i * 50}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    className={cn(
                      "flex items-center justify-between border-b border-paper/10 py-3.5 font-display text-3xl font-bold",
                      (item.href === "/" ? pathname === "/" : isActive(item.href)) && "text-yellow",
                    )}
                  >
                    {item.label}
                    <ArrowUpLeft className="size-6 text-paper/40" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className={cn(
                "mt-8 transition-opacity duration-500",
                menuOpen ? "opacity-100 delay-500 starting:opacity-0" : "opacity-0",
              )}
            >
              <p className="font-display text-sm font-semibold text-paper/50">השירותים שלנו</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {serviceNav.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      onClick={closeAll}
                      className="flex items-center gap-2 rounded-xl bg-paper/5 px-3 py-2.5 text-sm leading-tight"
                    >
                      <span className={cn("size-2 shrink-0 rounded-full", accentBg[s.accent])} aria-hidden />
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <a href={primaryPhone.href} className={buttonClasses({ variant: "paper", size: "lg", className: "w-full" })}>
                <Phone className="size-5" aria-hidden />
                התקשרו
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "whatsapp", size: "lg", className: "w-full" })}
              >
                <WhatsAppIcon className="size-5" />
                וואטסאפ
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
