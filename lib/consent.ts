/**
 * Analytics consent. Nothing is loaded until the visitor opts in, so the
 * stored value is the single gate in front of the Google Analytics script.
 *
 * Absence of the key means "not yet asked" — distinct from "declined", which
 * is recorded explicitly so we stop prompting.
 */

export type ConsentState = "granted" | "denied" | "unset";

const STORAGE_KEY = "cuxton-analytics-consent";

/** Fired on `window` whenever consent changes, so the gate can re-render. */
export const CONSENT_EVENT = "cuxton:consent-change";

export function readConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : "unset";
  } catch {
    // Private mode or blocked storage — treat as never asked, never assume consent.
    return "unset";
  }
}

export function writeConsent(state: Exclude<ConsentState, "unset">) {
  try {
    window.localStorage.setItem(STORAGE_KEY, state);
  } catch {
    // Storage unavailable; the choice holds for this page view only.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}

/** Clears the stored choice so the banner is shown again. */
export function resetConsent() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing stored to clear.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}
