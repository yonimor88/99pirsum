/**
 * Limited-time websites offer, shown as a strip above the header on every page.
 * It switches itself off at `ends`: the boot script below only adds the
 * `promo-on` class to <html> before then, so nothing flashes after it expires.
 */
export const promo = {
  id: "websites-2026-11-1300",
  label: "מבצע",
  text: "אתר מקצועי ב-1,300 ש״ח כולל מע״מ + שנת תחזוקה חינם",
  price: "1,300 ש״ח",
  /** Short version for tight spots (home hero, websites spotlight) */
  short: "אתר ב-1,300 ש״ח כולל מע״מ",
  extra: "+ 12 חודשי תחזוקה ותפעול חינם",
  until: "לאור הביקוש הרב, הוארך עד 30 בנובמבר",
  href: "/websites",
  /** End of 30 November, Israel time */
  ends: "2026-12-01T00:00:00+02:00",
} as const;

export const PROMO_DISMISS_KEY = "99p-promo-dismissed";

export const promoBootScript = `(function(){try{if(Date.now()<${Date.parse(promo.ends)}&&localStorage.getItem("${PROMO_DISMISS_KEY}")!=="${promo.id}")document.documentElement.classList.add("promo-on");}catch(e){}})();`;
