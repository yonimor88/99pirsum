"use client";

import posthog from "posthog-js";
import { useSyncExternalStore } from "react";

import { track } from "@/lib/analytics";

/**
 * The visitor's cookie choice. Until they choose (and if they decline) PostHog
 * runs cookieless: anonymous counts only, nothing stored in the browser.
 */
export type Consent = "granted" | "denied" | "pending";

export const CONSENT_STORAGE_KEY = "99-cookie-consent";

type ConsentState = { consent: Consent | null; settingsOpen: boolean };

/** `consent: null` until read from storage, so the server render shows no drawer */
let state: ConsentState = { consent: null, settingsOpen: false };
let loaded = false;
const listeners = new Set<() => void>();

export function readConsent(): Consent {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : "pending";
  } catch {
    return "pending";
  }
}

function emit(next: Partial<ConsentState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

export function setConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // storage unavailable: the choice lasts for this page only
  }
  if (posthog.__loaded) {
    if (value === "granted") {
      posthog.opt_in_capturing({ captureEventName: "cookie_consent", captureProperties: { choice: value } });
    } else {
      posthog.opt_out_capturing();
      track("cookie_consent", { choice: value });
    }
  }
  emit({ consent: value, settingsOpen: false });
}

/** Brings PostHog in line with the stored choice; called once PostHog has loaded */
export function syncPosthogConsent() {
  const stored = readConsent();
  const current = posthog.get_explicit_consent_status();
  if (stored === current) return;
  if (stored === "granted") posthog.opt_in_capturing({ captureEventName: false });
  else if (stored === "denied") posthog.opt_out_capturing();
  else posthog.clear_opt_in_out_capturing();
}

export function openCookieSettings() {
  emit({ settingsOpen: true });
}

export function closeCookieSettings() {
  emit({ settingsOpen: false });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  if (!loaded) {
    loaded = true;
    state = { ...state, consent: readConsent() };
  }
  return state;
}

const serverSnapshot: ConsentState = { consent: null, settingsOpen: false };

export function useCookieConsent() {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}
