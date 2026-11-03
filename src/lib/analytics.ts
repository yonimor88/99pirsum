import posthog from "posthog-js";

export type AnalyticsEvent =
  | "lead_submitted"
  | "lead_form_invalid"
  | "whatsapp_clicked"
  | "phone_clicked"
  | "email_clicked"
  | "directions_clicked"
  | "cookie_consent";

/** Safe to call anywhere on the client; does nothing when PostHog isn't set up. */
export function track(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  if (!posthog.__loaded) return;
  posthog.capture(event, properties);
}

/**
 * One listener for every contact link on the site (header, footer, floating
 * button, service pages, articles), so components don't each need tracking code.
 */
export function trackContactClicks() {
  document.addEventListener(
    "click",
    (e) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.href;
      const props = {
        link_text: link.textContent?.trim().slice(0, 80) || link.getAttribute("aria-label") || undefined,
        placement: placementOf(link),
      };

      if (href.startsWith("tel:")) track("phone_clicked", { ...props, phone: href.slice(4) });
      else if (href.startsWith("mailto:")) track("email_clicked", { ...props, email: href.slice(7).split("?")[0] });
      else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) track("whatsapp_clicked", props);
      else if (/^https:\/\/(waze\.com|www\.google\.com\/maps)\//.test(href))
        track("directions_clicked", { ...props, app: href.includes("waze") ? "waze" : "google_maps" });
    },
    { capture: true },
  );
}

/** Where on the page the link sits, from the nearest `data-placement` ("header", "footer", ...). */
function placementOf(el: Element) {
  return el.closest("[data-placement]")?.getAttribute("data-placement") ?? "content";
}
