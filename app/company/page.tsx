import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Company — About Cuxton AI",
  description:
    "Cuxton AI is an enterprise AI consultancy helping institutions discover, integrate and deploy secure AI systems, agents and workflow automation.",
};

const principles = [
  { n: "01", label: "Problem-first", desc: "AI adoption should begin with a clear business problem, not a technology preference. We invest time in understanding the real objective before recommending any solution." },
  { n: "02", label: "Honesty about feasibility", desc: "We will tell a client when a use case is not viable, when data is not ready, or when the expected value does not justify the investment. Trust is more valuable than any single engagement." },
  { n: "03", label: "Data control", desc: "For institutions handling sensitive information, control over where data resides and how it is used is not optional. We design AI systems that respect and maintain that control." },
  { n: "04", label: "Appropriate use of AI", desc: "Not every problem requires AI, and not every AI system requires the most capable model. We recommend what the problem requires — not the most technically sophisticated option." },
  { n: "05", label: "Human oversight", desc: "Consequential decisions remain with authorised people. AI systems we build are designed to support human judgement, not replace it." },
  { n: "06", label: "Institutional knowledge", desc: "AI connected to an organisation's own authorised knowledge produces more relevant, more accurate and more trusted outputs than AI relying only on general training data." },
  { n: "07", label: "Long-term relationship", desc: "A well-deployed AI system continues to improve with use. We aim to be a long-term partner — not a one-time delivery team." },
];

/* ─────────────────────────────────────────────────────────
   PLACEHOLDER — replace with the real board before shipping.
   Each entry needs: name, role, bio, city, country, a photo
   (drop the file in public/team/ and point `photo` at it — omit
   `photo` to show the initials fallback), and social links.
   ───────────────────────────────────────────────────────── */
const boardMembers: {
  name: string;
  role: string;
  bio: string;
  city: string;
  country: string;
  photo?: string;
  linkedin?: string;
  x?: string;
}[] = [
  {
    name: "Full Name",
    role: "Board Role / Title",
    bio: "Add a short bio: their background, area of focus, and how it connects to Cuxton AI's mission.",
    city: "City",
    country: "Country",
    linkedin: "#",
    x: "#",
  },
  {
    name: "Full Name",
    role: "Board Role / Title",
    bio: "Add a short bio: their background, area of focus, and how it connects to Cuxton AI's mission.",
    city: "City",
    country: "Country",
    linkedin: "#",
    x: "#",
  },
  {
    name: "Full Name",
    role: "Board Role / Title",
    bio: "Add a short bio: their background, area of focus, and how it connects to Cuxton AI's mission.",
    city: "City",
    country: "Country",
    linkedin: "#",
    x: "#",
  },
  {
    name: "Full Name",
    role: "Board Role / Title",
    bio: "Add a short bio: their background, area of focus, and how it connects to Cuxton AI's mission.",
    city: "City",
    country: "Country",
    linkedin: "#",
    x: "#",
  },
];

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.24h4.56V23H.22V8.24zM8.34 8.24h4.37v2.01h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.99V23h-4.56v-6.99c0-1.67-.03-3.81-2.32-3.81-2.33 0-2.69 1.82-2.69 3.69V23H8.34V8.24z" />
  </svg>
);

const XIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.83-5.97 6.83H1.66l7.73-8.84L1.25 2.25h6.83l4.72 6.24 5.44-6.24zm-1.16 17.52h1.83L7.02 4.13H5.06l12.02 15.64z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(p => p[0]?.toUpperCase()).join("");
}

export default function CompanyPage() {
  return (
    <div style={{ background: "var(--background)" }}>

      {/* Hero */}
      <section style={{ padding: "5rem 0 4.5rem", position: "relative", overflow: "hidden" }}
        className="bg-cosmic scanlines">
        <div className="absolute inset-0 hex-grid pointer-events-none" />
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: 800, height: 800,
          background: "radial-gradient(circle, rgba(27,107,138,0.12) 0%, rgba(245,166,35,0.04) 50%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="section-container" style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <div className="section-label anim-fade d1">Company</div>
          <h1 className="section-heading anim-fade-up d2"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", marginBottom: "1.25rem" }}>
            Enterprise AI consultancy built for institutions that need control.
          </h1>
          <p className="section-sub anim-fade-up d3">
            Cuxton AI exists to help organisations with complex, sensitive or regulated operations
            find where AI can create real value — and then build, integrate and deploy it safely,
            responsibly and with lasting effect.
          </p>
        </div>
      </section>

      {/* What Cuxton AI is */}
      <section className="section-py">
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "start" }}
            className="company-grid">
            <div>
              <div className="section-label">What We Do</div>
              <h2 className="section-heading" style={{ marginBottom: "1.5rem" }}>
                From AI opportunity<br />to operational value.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  ["AI consultancy", "We help institutions understand where AI can create measurable value — before any technology decisions are made."],
                  ["AI integration", "We integrate existing AI models, tools and platforms into the organisation's approved environment and workflows."],
                  ["Custom AI development", "We design and build AI systems, agents and automation tailored to the organisation's specific needs."],
                  ["Private deployment", "We deploy AI within controlled infrastructure — on-premise, private cloud or isolated tenancy — for institutions where data sensitivity demands it."],
                  ["Enablement and support", "We train teams, establish governance procedures and provide ongoing support as AI capability matures."],
                ].map(([title, desc]) => (
                  <div key={title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cuxton-teal-light)", flexShrink: 0, marginTop: "0.5rem" }} />
                    <div>
                      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.3rem" }}>{title}</p>
                      <p style={{ fontSize: "0.83rem", color: "rgba(var(--foreground-rgb),0.5)", lineHeight: 1.65 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission card */}
            <div>
              <div className="card-enterprise" style={{ padding: "2rem", position: "relative", overflow: "hidden" }}>
                <div style={{
                  position: "absolute", top: -30, right: -30, width: 160, height: 160,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
                <p style={{
                  fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "var(--cuxton-amber)",
                  marginBottom: "1.25rem", opacity: 0.85,
                }}>
                  Mission
                </p>
                <p style={{
                  fontSize: "1.0625rem", fontWeight: 600, color: "var(--foreground)",
                  lineHeight: 1.65, marginBottom: "1.75rem",
                }}>
                  To help institutions discover where AI can create genuine value, and then build,
                  integrate and deploy that AI in a way that is controlled, trusted and lasting.
                </p>
                <div className="section-divider" style={{ marginBottom: "1.75rem" }} />
                <p style={{
                  fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "var(--cuxton-amber)",
                  marginBottom: "1.25rem", opacity: 0.85,
                }}>
                  Who we work with
                </p>
                {[
                  "Institutions handling sensitive or proprietary data",
                  "Organisations in regulated sectors",
                  "Enterprises with complex, data-rich operations",
                  "Organisations that want AI on their terms",
                ].map(item => (
                  <div key={item} style={{ display: "flex", gap: "0.625rem", marginBottom: "0.625rem" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--cuxton-teal-light)"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontSize: "0.82rem", color: "rgba(var(--foreground-rgb),0.55)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (min-width: 1024px) { .company-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>
      </section>

      {/* Operating principles */}
      <section className="section-py" style={{ background: "var(--bg-surface)" }}>
        <div className="section-container">
          <div className="section-label">Operating Principles</div>
          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            The convictions that guide our work.
          </h2>
          <p className="section-sub" style={{ marginBottom: "3rem" }}>
            These are not aspirational values for a website. They are the principles that determine
            how we approach every engagement, what we recommend and what we decline to recommend.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {principles.map((p, i) => (
              <div key={p.n}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem", padding: "1.75rem 0" }}
                  className="principle-row">
                  <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                    <span style={{
                      fontSize: "0.65rem", fontWeight: 800, color: "var(--cuxton-amber)",
                      letterSpacing: "0.08em", flexShrink: 0, marginTop: "0.2rem",
                    }}>
                      {p.n}
                    </span>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem" }}>
                        {p.label}
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "rgba(var(--foreground-rgb),0.5)", lineHeight: 1.7 }}>
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
                {i < principles.length - 1 && <div className="section-divider" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className={`section-py ${styles.leadership}`}>
        <div className="section-container">
          <div className={styles.leadership__header}>
            <div className="section-label">Leadership</div>
            <h2 className={styles.leadership__heading}>
              The people <span className={styles.leadership__headingMuted}>accountable for how Cuxton AI operates.</span>
            </h2>
            <p className="section-sub">
              Our board oversees the principles above in practice — including the data-control and
              human-oversight commitments that shape every engagement.
            </p>
          </div>

          <div className={styles.leadership__frame}>
            <svg className={`${styles.leadership__corner} ${styles.leadership__cornerTl}`} viewBox="0 0 14 14" fill="none"><path d="M1 6V1h5" stroke="currentColor" strokeWidth="1.5" /></svg>
            <svg className={`${styles.leadership__corner} ${styles.leadership__cornerTr}`} viewBox="0 0 14 14" fill="none"><path d="M8 1h5v5" stroke="currentColor" strokeWidth="1.5" /></svg>
            <svg className={`${styles.leadership__corner} ${styles.leadership__cornerBl}`} viewBox="0 0 14 14" fill="none"><path d="M6 13H1V8" stroke="currentColor" strokeWidth="1.5" /></svg>
            <svg className={`${styles.leadership__corner} ${styles.leadership__cornerBr}`} viewBox="0 0 14 14" fill="none"><path d="M13 8v5H8" stroke="currentColor" strokeWidth="1.5" /></svg>

            <div className={styles.leadership__grid}>
              {boardMembers.map((m, i) => (
                <div key={i} className={`card-enterprise ${styles.member}`}>
                  <div className={styles.member__top}>
                    {m.photo ? (
                      <Image src={m.photo} alt={m.name} width={64} height={64} className={styles.member__avatar} />
                    ) : (
                      <div className={styles.member__avatarFallback} aria-hidden="true">{initials(m.name)}</div>
                    )}
                    <div>
                      <p className={styles.member__name}>{m.name}</p>
                      <p className={styles.member__role}>{m.role}</p>
                    </div>
                  </div>

                  <p className={styles.member__bio}>{m.bio}</p>

                  <div className={styles.member__footer}>
                    <div className={styles.member__location}>
                      <LocationIcon />
                      <span className={styles.member__locationText}>{m.city}, {m.country}</span>
                    </div>
                    <div className={styles.member__social}>
                      {m.linkedin && (
                        <a href={m.linkedin} className={styles.member__socialLink} aria-label={`${m.name} on LinkedIn`} target="_blank" rel="noopener noreferrer">
                          <LinkedInIcon />
                        </a>
                      )}
                      {m.x && (
                        <a href={m.x} className={styles.member__socialLink} aria-label={`${m.name} on X`} target="_blank" rel="noopener noreferrer">
                          <XIcon />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className={styles.leadership__note}>
            Placeholder profiles — replace with the real board in app/company/page.tsx before this ships.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "4rem 0" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            Start with a conversation.
          </h2>
          <p className="section-sub" style={{ margin: "0 auto 2rem" }}>
            Every Cuxton AI engagement begins with a discovery conversation — understanding your objectives,
            context and constraints before any solution is proposed.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ height: "3.25rem", padding: "0 2rem" }}>
              Book an AI Discovery Session
            </Link>
            <Link href="/how-we-work" className="btn-secondary" style={{ height: "3.25rem", padding: "0 2rem" }}>
              How We Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
