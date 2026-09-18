"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
import { companyContact } from "@/data/company";

/* ═══════════════════════════════════════════════════════════════════
   Briefing opt-out, reached from the link at the foot of every email.

   It waits for a click rather than unsubscribing on load: corporate mail
   gateways open links to scan them, and would otherwise unsubscribe
   readers who never asked to leave.
   ═══════════════════════════════════════════════════════════════════ */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type State = "confirm" | "working" | "done" | "not_found" | "error";

function Unsubscribe() {
  const token = useSearchParams().get("token") ?? "";
  const [state, setState] = useState<State>("confirm");

  const validToken = UUID.test(token);

  async function unsubscribe() {
    const supabase = getSupabase();
    if (!supabase) return setState("error");

    setState("working");
    const { data, error } = await supabase.rpc("unsubscribe_from_briefings", { p_token: token });
    if (error) return setState("error");
    setState(data ? "done" : "not_found");
  }

  const contactLink = (
    <a
      href={`mailto:${companyContact.email}?subject=Unsubscribe%20from%20briefings`}
      style={{ color: "var(--cuxton-teal-text)", fontWeight: 600, textDecoration: "none" }}
    >
      {companyContact.email}
    </a>
  );

  if (!validToken || state === "not_found") {
    return (
      <Card title="This unsubscribe link is not recognised">
        The link may have been cut short when it was copied. Open it again from the briefing email,
        or write to {contactLink} and we will remove you by hand.
      </Card>
    );
  }

  if (state === "done") {
    return (
      <Card title="You have been unsubscribed">
        No further Executive AI Briefings will be sent to this address. If you change your mind,
        you can rejoin at any time from the footer below.
        <Actions>
          <Link href="/" className="btn-primary">
            Back to homepage
          </Link>
        </Actions>
      </Card>
    );
  }

  return (
    <Card title="Unsubscribe from Executive AI Briefings?">
      You will stop receiving the monthly briefing at this address. Nothing else about your
      relationship with CuxtonAI changes.
      {state === "error" && (
        <span role="alert" style={{ display: "block", marginTop: "1rem", color: "var(--status-error)" }}>
          We could not process that just now. Please try again, or write to {contactLink}.
        </span>
      )}
      <Actions>
        <button
          type="button"
          className="btn-primary"
          onClick={unsubscribe}
          disabled={state === "working"}
          style={{ opacity: state === "working" ? 0.6 : 1 }}
        >
          {state === "working" ? "Unsubscribing…" : "Unsubscribe"}
        </button>
        <Link href="/" className="btn-secondary">
          Keep my subscription
        </Link>
      </Actions>
    </Card>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="card-enterprise" style={{ maxWidth: 560, margin: "0 auto", padding: "2.25rem 2rem" }}>
      <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--cuxton-amber-text)", marginBottom: "0.6rem" }}>
        Executive AI Briefings
      </p>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.9rem" }}>
        {title}
      </h1>
      <div style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(var(--foreground-rgb), 0.7)" }}>
        {children}
      </div>
    </article>
  );
}

function Actions({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.75rem" }}>{children}</div>;
}

export default function UnsubscribePage() {
  return (
    <div style={{ background: "var(--background)" }}>
      <section className="section-py">
        <div className="section-container">
          <Suspense fallback={null}>
            <Unsubscribe />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
