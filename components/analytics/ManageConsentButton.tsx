"use client";

import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, resetConsent, type ConsentState } from "@/lib/consent";

const LABELS: Record<Exclude<ConsentState, "unset">, string> = {
  granted: "Analytics cookies are on.",
  denied: "Analytics cookies are off.",
};

/** Lets a visitor withdraw or revisit the choice made in the consent banner. */
export default function ManageConsentButton() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const sync = () => setConsent(readConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  // Analytics not configured for this build, or consent not yet read.
  if (!process.env.NEXT_PUBLIC_GA_ID || consent === null) return null;

  return (
    <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
      <button
        type="button"
        className="btn-secondary"
        style={{ height: "2.75rem", padding: "0 1.25rem", fontSize: "0.85rem" }}
        onClick={resetConsent}
      >
        Change Cookie Preferences
      </button>
      {consent !== "unset" && (
        <span style={{ fontSize: "0.85rem", color: "rgba(var(--foreground-rgb), 0.6)" }}>
          {LABELS[consent]}
        </span>
      )}
    </div>
  );
}
