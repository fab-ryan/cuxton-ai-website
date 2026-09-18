"use client";

import Link from "next/link";
import { writeConsent } from "@/lib/consent";

type ConsentBannerProps = {
  onChoice: () => void;
};

export default function ConsentBanner({ onChoice }: ConsentBannerProps) {
  const choose = (state: "granted" | "denied") => {
    writeConsent(state);
    onChoice();
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-heading"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "var(--bg-elevated)",
        borderTop: "1px solid var(--border)",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.25rem",
        }}
      >
        <div style={{ flex: "1 1 24rem", minWidth: 0 }}>
          <h2
            id="consent-heading"
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--foreground)",
              marginBottom: "0.4rem",
            }}
          >
            Analytics cookies
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "rgba(var(--foreground-rgb), 0.72)",
              margin: 0,
            }}
          >
            We&apos;d like to use Google Analytics to understand which pages are useful. Nothing is
            loaded unless you accept, and declining changes nothing about the site.{" "}
            <Link href="/cookies" className="btn-ghost" style={{ fontSize: "0.875rem" }}>
              Cookie Policy
            </Link>
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
          <button
            type="button"
            className="btn-secondary"
            style={{ height: "2.5rem", padding: "0 1.25rem", fontSize: "0.85rem" }}
            onClick={() => choose("denied")}
          >
            Decline
          </button>
          <button
            type="button"
            className="btn-primary"
            style={{ height: "2.5rem", padding: "0 1.25rem", fontSize: "0.85rem" }}
            onClick={() => choose("granted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
