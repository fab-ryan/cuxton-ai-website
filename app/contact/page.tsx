"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getSupabase } from "@/lib/supabase/client";

/* ── Form state ── */
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  role: string;
  sector: string;
  teamSize: string;
  message: string;
  topics: string[];
};

const INITIAL: FormData = {
  firstName: "", lastName: "", email: "",
  organisation: "", role: "", sector: "",
  teamSize: "", message: "", topics: [],
};

const discussionTopics = [
  "AI Strategy & Opportunity Discovery",
  "Private AI Deployment",
  "Knowledge-Grounded AI",
  "AI Agents",
  "Workflow Automation",
  "Enterprise Integration",
  "Custom AI Solutions",
  "Real-Time Data Intelligence",
  "AI Training & Enablement",
];

const sectors = [
  "Financial Services", "Healthcare", "Government",
  "Education & Research", "Telecommunications", "Legal & Audit",
  "Other",
];

const teamSizes = [
  "Under 50", "50–250", "250–1,000", "1,000–5,000", "Over 5,000",
];

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const set = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const toggleTopic = (topic: string) =>
    setForm(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic],
    }));

  /* Submissions land in the `contacts` table, where the console reads them.
     The anon key is public, so the "anyone may submit a contact" policy in
     supabase/schema.sql grants INSERT and nothing else — a visitor cannot
     read back what anyone, including themselves, has sent. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMessage(
        "The enquiry form is not connected yet. Please email hello@cuxtonai.com instead."
      );
      setStatus("error");
      return;
    }

    const { error } = await supabase.from("contacts").insert({
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      email: form.email.trim(),
      organisation: form.organisation.trim() || null,
      role: form.role.trim() || null,
      sector: form.sector || null,
      team_size: form.teamSize || null,
      message: form.message.trim(),
      topics: form.topics,
    });

    if (error) {
      setErrorMessage(
        "We could not record your enquiry. Please try again, or email hello@cuxtonai.com."
      );
      setStatus("error");
      return;
    }

    setStatus("sent");
  };

  return (
    <div style={{ background: "var(--background)" }}>

      <PageHero
        breadcrumbs={[{ label: "Contact" }]}
        eyebrow="Contact & Engagement"
        title="Book an"
        titleHighlight="AI Discovery Session."
        showVisual={false}
        description="A focused conversation to understand your organisation's objectives, current environment, data boundaries and where AI could create measurable value. No commitment required."
        tags={[
          "Direct Architect Access",
          "Zero Sales Pressure",
          "Institutional Privacy First",
          "NDA Ready",
        ]}
      />

      {/* Form + sidebar */}
      <section className="section-py">
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "start" }}
            className="contact-outer">

            {/* ─── Sidebar ─── */}
            <aside style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

              {/* What to expect */}
              <div className="card-enterprise" style={{ padding: "1.75rem" }}>
                <p style={{
                  fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "var(--cuxton-amber)",
                  marginBottom: "1.25rem", opacity: 0.85,
                }}>
                  What to Expect
                </p>
                {[
                  ["Initial response within 2 business days", "We&apos;ll review your submission and suggest a time to connect."],
                  ["A focused 45–60 minute conversation", "We discuss your objectives, current environment, data constraints and candidate AI opportunities."],
                  ["No pitch. No product demo.", "This session is for us to understand your situation — not to sell you a solution."],
                  ["A clear next step", "If there&apos;s a good fit, we&apos;ll outline potential directions. If not, we&apos;ll say so."],
                ].map(([title, desc]) => (
                  <div key={title} style={{ display: "flex", gap: "0.875rem", marginBottom: "1rem", alignItems: "flex-start" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cuxton-teal-light)"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <div>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.2rem" }}
                        dangerouslySetInnerHTML={{ __html: title }} />
                      <p style={{ fontSize: "0.78rem", color: "rgba(var(--foreground-rgb),0.45)", lineHeight: 1.55 }}
                        dangerouslySetInnerHTML={{ __html: desc }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Privacy note */}
              <div style={{
                background: "rgba(27,107,138,0.06)",
                border: "1px solid rgba(27,107,138,0.15)",
                 padding: "1.25rem",
              }}>
                <p style={{ fontSize: "0.78rem", color: "rgba(var(--foreground-rgb),0.4)", lineHeight: 1.65 }}>
                  <span style={{ color: "var(--cuxton-teal-light)", fontWeight: 700 }}>Privacy: </span>
                  Do not submit confidential client data, patient-identifiable information or sensitive
                  internal data through this public form. Describe your situation at a high level we
                  can discuss details under a formal confidentiality arrangement if appropriate.
                </p>
              </div>

              {/* Direct email */}
              <p style={{ fontSize: "0.8rem", color: "rgba(var(--foreground-rgb),0.35)", lineHeight: 1.6 }}>
                Prefer email?{" "}
                <a href="mailto:hello@cuxtonai.com" style={{ color: "var(--cuxton-teal-light)", textDecoration: "none" }}>
                  hello@cuxtonai.com
                </a>
              </p>
            </aside>

            {/* ─── Form ─── */}
            <div>
              {status === "sent" ? (
                <div className="card-enterprise" style={{ padding: "3rem", textAlign: "center" }}>
                  <div style={{
                    width: 56, height: 56,
                    background: "rgba(27,107,138,0.15)",
                    border: "1px solid rgba(27,107,138,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cuxton-teal-light)"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 style={{ fontSize: "1.375rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "0.75rem" }}>
                    Submission received.
                  </h2>
                  <p style={{ fontSize: "0.9rem", color: "rgba(var(--foreground-rgb),0.5)", lineHeight: 1.7, marginBottom: "2rem" }}>
                    Thank you for getting in touch. We&apos;ll review your submission and follow up within 2
                    business days to arrange a time to connect.
                  </p>
                  <Link href="/" className="btn-secondary">Return to homepage</Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="card-enterprise" style={{ padding: "2rem 2.25rem" }}>
                    <p style={{
                      fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
                      textTransform: "uppercase", color: "var(--cuxton-amber)",
                      marginBottom: "1.75rem", opacity: 0.85,
                    }}>
                      Your Details
                    </p>

                    {/* Name row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label htmlFor="firstName" className="form-label">First name *</label>
                        <input id="firstName" type="text" required
                          className="form-field"
                          value={form.firstName}
                          onChange={e => set("firstName", e.target.value)}
                          placeholder="Jane"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="form-label">Last name *</label>
                        <input id="lastName" type="text" required
                          className="form-field"
                          value={form.lastName}
                          onChange={e => set("lastName", e.target.value)}
                          placeholder="Smith"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: "1rem" }}>
                      <label htmlFor="email" className="form-label">Work email address *</label>
                      <input id="email" type="email" required
                        className="form-field"
                        value={form.email}
                        onChange={e => set("email", e.target.value)}
                        placeholder="jane.smith@organisation.com"
                      />
                    </div>

                    {/* Organisation + role */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label htmlFor="organisation" className="form-label">Organisation *</label>
                        <input id="organisation" type="text" required
                          className="form-field"
                          value={form.organisation}
                          onChange={e => set("organisation", e.target.value)}
                          placeholder="Organisation name"
                        />
                      </div>
                      <div>
                        <label htmlFor="role" className="form-label">Your role</label>
                        <input id="role" type="text"
                          className="form-field"
                          value={form.role}
                          onChange={e => set("role", e.target.value)}
                          placeholder="Head of Technology"
                        />
                      </div>
                    </div>

                    {/* Sector + team size */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.75rem" }}>
                      <div>
                        <label htmlFor="sector" className="form-label">Sector</label>
                        <select id="sector"
                          className="form-field form-select"
                          value={form.sector}
                          onChange={e => set("sector", e.target.value)}>
                          <option value="">Select sector</option>
                          {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="teamSize" className="form-label">Organisation size</label>
                        <select id="teamSize"
                          className="form-field form-select"
                          value={form.teamSize}
                          onChange={e => set("teamSize", e.target.value)}>
                          <option value="">Select size</option>
                          {teamSizes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="section-divider" style={{ marginBottom: "1.75rem" }} />

                    {/* Discussion topics */}
                    <p style={{
                      fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
                      textTransform: "uppercase", color: "var(--cuxton-amber)",
                      marginBottom: "1rem", opacity: 0.85,
                    }}>
                      Topics you&apos;d like to discuss
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.5rem", marginBottom: "1.75rem" }}>
                      {discussionTopics.map(topic => {
                        const selected = form.topics.includes(topic);
                        return (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => toggleTopic(topic)}
                            style={{
                              display: "flex", alignItems: "center", gap: "0.5rem",
                              padding: "0.5rem 0.75rem",  cursor: "pointer",
                              background: selected ? "rgba(27,107,138,0.15)" : "rgba(var(--bg-surface-rgb),0.6)",
                              border: `1px solid ${selected ? "rgba(27,107,138,0.4)" : "rgba(27,107,138,0.14)"}`,
                              color: selected ? "var(--cuxton-teal-light)" : "rgba(var(--foreground-rgb),0.45)",
                              fontSize: "0.78rem", fontWeight: selected ? 600 : 400,
                              textAlign: "left", transition: "all 0.2s ease",
                            }}
                          >
                            <div style={{
                              width: 14, height: 14, flexShrink: 0,
                              border: `1.5px solid ${selected ? "var(--cuxton-teal-light)" : "rgba(27,107,138,0.35)"}`,
                              background: selected ? "var(--cuxton-teal-light)" : "transparent",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              {selected && (
                                <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6l3 3 5-5" stroke="#101b26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            {topic}
                          </button>
                        );
                      })}
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: "1.75rem" }}>
                      <label htmlFor="message" className="form-label">
                        Briefly describe your situation or objective *
                      </label>
                      <textarea id="message" required
                        className="form-field form-textarea"
                        value={form.message}
                        onChange={e => set("message", e.target.value)}
                        placeholder="Describe your organisation's current situation, the problem you're looking to solve, or the outcome you're hoping to achieve. Do not include confidential client data or patient-identifiable information."
                        rows={5}
                      />
                    </div>

                    {/* Submit */}
                    {status === "error" && (
                      <p style={{
                        fontSize: "0.8rem", color: "#f87171",
                        marginBottom: "1rem", padding: "0.75rem 1rem",
                        background: "rgba(248,113,113,0.06)",
                        border: "1px solid rgba(248,113,113,0.15)",
                      }}>
                        {errorMessage ?? "Something went wrong. Please try again."} If the problem
                        persists, email us directly at{" "}
                        <a href="mailto:hello@cuxtonai.com" style={{ color: "#f87171" }}>hello@cuxtonai.com</a>.
                      </p>
                    )}

                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                      <p style={{ fontSize: "0.72rem", color: "rgba(var(--foreground-rgb),0.25)", maxWidth: 360, lineHeight: 1.5 }}>
                        By submitting this form you agree to being contacted by Cuxton AI regarding your enquiry.
                        We do not share your information with third parties.
                      </p>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-primary"
                        style={{
                          height: "3rem", padding: "0 1.75rem",
                          opacity: status === "sending" ? 0.7 : 1,
                          cursor: status === "sending" ? "wait" : "pointer",
                          border: "none",
                        }}
                      >
                        {status === "sending" ? "Sending…" : "Submit enquiry"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
