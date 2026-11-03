import posthog from "posthog-js";

import { trackContactClicks } from "@/lib/analytics";
import { syncPosthogConsent } from "@/lib/consent";
import { posthogConfig, posthogHosts } from "@/lib/posthog-config";

// Analytics only on the live site, so local dev and preview deploys don't pollute the numbers
const isLiveSite = window.location.hostname === "99pirsum.com" || window.location.hostname === "www.99pirsum.com";

if (posthogConfig.key && isLiveSite) {
  try {
    posthog.init(posthogConfig.key, {
      api_host: posthogConfig.apiPath,
      ui_host: posthogHosts.ui,
      // Pageviews on client-side navigation, autocapture, web vitals and the rest of PostHog's current defaults
      defaults: "2026-08-30",
      person_profiles: "identified_only",
      // No cookies until the visitor accepts them in the cookie drawer (or if they decline):
      // PostHog still counts visits, using an anonymous server-side hash instead of an ID in the browser
      cookieless_mode: "on_reject",
      opt_out_capturing_by_default: true,
      loaded: syncPosthogConsent,
      session_recording: {
        // Never record what visitors type into the contact form
        maskAllInputs: true,
      },
    });
    trackContactClicks();
  } catch (err) {
    console.error("[analytics] PostHog failed to start", err);
  }
}
