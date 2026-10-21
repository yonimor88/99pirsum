"use client";

import { useSyncExternalStore } from "react";

export type A11ySettings = {
  text: 0 | 1 | 2;
  contrast: boolean;
  links: boolean;
  readable: boolean;
  noMotion: boolean;
};

export const A11Y_STORAGE_KEY = "99-a11y";

export const defaultA11y: A11ySettings = {
  text: 0,
  contrast: false,
  links: false,
  readable: false,
  noMotion: false,
};

let state: A11ySettings = defaultA11y;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(A11Y_STORAGE_KEY);
    if (raw) state = { ...defaultA11y, ...JSON.parse(raw) };
  } catch {
    // storage unavailable — keep defaults
  }
}

export function applyA11yClasses(s: A11ySettings) {
  const root = document.documentElement;
  root.classList.toggle("a11y-text-1", s.text === 1);
  root.classList.toggle("a11y-text-2", s.text === 2);
  root.classList.toggle("a11y-contrast", s.contrast);
  root.classList.toggle("a11y-links", s.links);
  root.classList.toggle("a11y-readable", s.readable);
  root.classList.toggle("a11y-no-motion", s.noMotion);
}

export function updateA11y(patch: Partial<A11ySettings>) {
  state = { ...state, ...patch };
  try {
    window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
  applyA11yClasses(state);
  listeners.forEach((l) => l());
}

export function resetA11y() {
  updateA11y(defaultA11y);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  load();
  return state;
}

function getServerSnapshot() {
  return defaultA11y;
}

export function useA11ySettings() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Inline script for <head>: applies saved settings before first paint. */
export const a11yBootScript = `(function(){try{var s=JSON.parse(localStorage.getItem("${A11Y_STORAGE_KEY}")||"{}");var c=document.documentElement.classList;if(s.text===1)c.add("a11y-text-1");if(s.text===2)c.add("a11y-text-2");if(s.contrast)c.add("a11y-contrast");if(s.links)c.add("a11y-links");if(s.readable)c.add("a11y-readable");if(s.noMotion)c.add("a11y-no-motion");}catch(e){}})();`;
