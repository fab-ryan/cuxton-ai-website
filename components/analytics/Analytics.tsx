"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CONSENT_EVENT, readConsent, type ConsentState } from "@/lib/consent";
import ConsentBanner from "./ConsentBanner";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Gates Google Analytics behind an explicit opt-in.
 *
 * The site is a static export, so the prerendered HTML can't know the stored
 * choice — consent is read after mount, and until then neither the banner nor
 * the script renders. That keeps the first paint identical to the build output.
 */
export default function Analytics() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const sync = () => setConsent(readConsent());
    sync();

    window.addEventListener(CONSENT_EVENT, sync);
    // Keep other tabs in step when the choice is made or withdrawn.
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // No measurement ID configured — stay entirely out of the way.
  if (!GA_ID) return null;

  // Not yet read from storage.
  if (consent === null) return null;

  return (
    <>
      {consent === "granted" && <GoogleAnalytics gaId={GA_ID} />}
      {consent === "unset" && <ConsentBanner onChoice={() => setConsent(readConsent())} />}
    </>
  );
}
