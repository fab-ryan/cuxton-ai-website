import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CompanyPrinciplesMatrix from "@/components/company/CompanyPrinciplesMatrix";
import LeadershipCouncil from "@/components/company/LeadershipCouncil";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Company — About Cuxton AI",
  description:
    "Cuxton AI is an enterprise AI consultancy helping institutions discover, integrate and deploy secure AI systems, agents and workflow automation.",
};

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--cuxton-teal-text)"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.checkIcon}
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ActivityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const disciplines = [
  {
    code: "CUX-ADV",
    title: "Strategic Opportunity Discovery",
    desc: "We analyze internal processes, data readiness, and unit economics to identify high-ROI AI opportunities before any code is commissioned.",
  },
  {
    code: "CUX-INT",
    title: "Sovereign Systems Integration",
    desc: "We embed validated foundation models, private RAG pipelines, and agent runtimes into your approved enterprise architecture and ERP systems.",
  },
  {
    code: "CUX-DEV",
    title: "Custom Agent Engineering",
    desc: "We build task-optimized autonomous microservices and agent workflows designed for deterministic outputs and verifiable auditability.",
  },
  {
    code: "CUX-SEC",
    title: "Air-Gapped Enclave Deployment",
    desc: "We configure isolated compute on-premise or within private VPCs, guaranteeing zero telemetry leakage to external public cloud endpoints.",
  },
  {
    code: "CUX-GOV",
    title: "Institutional Governance & Enablement",
    desc: "We train client engineering teams, establish human oversight gates, and transfer 100% intellectual property ownership to your organization.",
  },
];

const globalNodes = [
  {
    city: "London",
    role: "Global Headquarters & Sovereign Enclave Lab",
    desc: "Primary executive advisory, UK enterprise compliance engineering, and institutional discovery briefing center.",
  },
  {
    city: "Frankfurt",
    role: "EU Data Sovereignty & Industrial Compute",
    desc: "Dedicated European Union data boundary enclaves adhering strictly to GDPR and the EU Artificial Intelligence Act.",
  },
  {
    city: "Zurich",
    role: "Financial Vaults & Confidential Computing",
    desc: "High-security private banking clusters, cryptographic key custody, and quantitative algorithmic verification nodes.",
  },
  {
    city: "New York",
    role: "Capital Markets & Regulated Systems",
    desc: "North American enterprise integration practice supporting FINRA, SEC, and HIPAA-regulated sovereign deployments.",
  },
];

export default function CompanyPage() {
  return (
    <div className={styles.page}>
      {/* --- Hero Section (PRESERVED AS REQUESTED) ------------------------- */}
      <PageHero
        breadcrumbs={[{ label: "Company" }]}
        eyebrow="About Cuxton AI"
        title="Enterprise AI consultancy built for institutions that"
        titleHighlight="need control."
        description="Cuxton AI exists to help organisations with complex, sensitive or regulated operations discover where AI creates real value  and then build, integrate and deploy it safely, responsibly and with lasting effect."
        primaryCta={{
          label: "Book a Discovery Session",
          href: "/contact",
        }}
        secondaryCta={{
          label: "How We Work",
          href: "/how-we-work",
        }}
        tags={[
          "Sovereign Architecture",
          "Independent Advisory",
          "Institutional Privacy",
          "Human-in-the-Loop",
        ]}
      />

      {/* --- Section 1: Institutional Mandate & Core Disciplines ----------- */}
      <section className={styles.mandateSection}>
        <div className={`${styles.bgGrid} ${styles.bgGridPlain}`} aria-hidden="true" />

        <div className={`${styles.container} ${styles.sectionContent}`}>
          <div className={styles.mandateGrid}>
            {/* Left Pane: Enterprise Mandate & Mission */}
            <div>
              <div className={styles.mandateHeader}>
                <div className="section-label">Institutional Mandate</div>
                <h2 className={styles.heading}>
                  Engineered for organizations where{" "}
                  <span className={styles.headingHighlight}>failure is not an option.</span>
                </h2>
                <p className={styles.mandateBody}>
                  Cuxton AI is an independent enterprise consultancy. We exist solely to solve high-stakes
                  computational and operational challenges for institutions where data leakage, regulatory non-compliance,
                  or model hallucinations carry catastrophic business consequences.
                </p>
              </div>

              <div className={styles.missionCard}>
                <div className={styles.missionTag}>
                  <span className={styles.missionTagDot} aria-hidden="true" />
                  <span>Mission Statement</span>
                </div>
                <p className={styles.missionStatement}>
                  To empower institutions to deploy high-value, deterministic artificial intelligence—maintaining
                  uncompromising data sovereignty, rigorous governance, and verifiable operational return on investment.
                </p>

                <div className={styles.missionDivider} />

                <div className={styles.clientArchetypesTitle}>Target Sector Profiles</div>
                <ul className={styles.clientArchetypesGrid}>
                  {[
                    "Regulated Financial Services, Insurers & Asset Managers",
                    "Healthcare Systems, Clinical Networks & Life Sciences",
                    "Government Ministries, Sovereign Authorities & Defense",
                    "Telecommunications Carriers & Critical Infrastructure",
                  ].map((archetype) => (
                    <li key={archetype} className={styles.clientArchetypeItem}>
                      <CheckIcon />
                      <span>{archetype}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Pane: Core Practice Disciplines */}
            <div>
              <div className={styles.disciplinesHeader}>
                <h3 className={styles.disciplinesHeading}>Core Practice Disciplines</h3>
                <p className={styles.disciplinesSub}>
                  Five specialized operational vectors engineered to guide your AI adoption lifecycle.
                </p>
              </div>

              <div className={styles.disciplinesList}>
                {disciplines.map((d) => (
                  <div key={d.code} className={styles.disciplineCard}>
                    <div className={styles.disciplineTopRow}>
                      <span className={styles.disciplineTitle}>{d.title}</span>
                      <span className={styles.disciplineCode}>[{d.code}]</span>
                    </div>
                    <p className={styles.disciplineDesc}>{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Visual Facility Showcase & Telemetry --------------- */}
      <section className={styles.visualSection}>
        <div className={styles.container}>
          <div className={styles.visualFrame}>
            <Image
              src="/company_mandate_visual.jpg"
              alt="Cuxton AI Executive Sovereign Advisory and Briefing Chamber"
              fill
              priority
              sizes="100vw"
              className={styles.visualImage}
            />
            <div className={styles.visualWash} aria-hidden="true" />

            <div className={styles.visualBadgeOverlay}>
              <span className={styles.visualBadgeDot} aria-hidden="true" />
              <span>CUXTON ADVISORY &amp; MISSION LAB · LONDON</span>
            </div>

            <div className={styles.visualTelemetryBar}>
              <div className={styles.telemetryStat}>
                <span className={styles.telemetryStatVal}>100% Private VPC</span>
                <span className={styles.telemetryStatLbl}>Enclave Boundary</span>
              </div>
              <div className={styles.telemetryStat}>
                <span className={styles.telemetryStatVal}>0% Cloud Exfil</span>
                <span className={styles.telemetryStatLbl}>Data Retention</span>
              </div>
              <div className={styles.telemetryStat}>
                <span className={styles.telemetryStatVal}>Sub-85ms</span>
                <span className={styles.telemetryStatLbl}>Deterministic Latency</span>
              </div>
              <div className={styles.telemetryStat}>
                <span className={styles.telemetryStatVal}>ISO 27001 Ready</span>
                <span className={styles.telemetryStatLbl}>Compliance Seal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 3: Interactive 7-Principle Doctrine Matrix ------------ */}
      <CompanyPrinciplesMatrix />

      {/* --- Section 4: Sovereign Global Infrastructure Footprint ---------- */}
      <section className={styles.footprintSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className="section-label">Sovereign Reach</div>
            <h2 className={styles.heading}>
              Distributed sovereign{" "}
              <span className={styles.headingHighlight}>deployment footprint.</span>
            </h2>
            <p className={styles.lead}>
              Cuxton AI architects single-tenant infrastructure deployed across primary European and North American
              regulatory zones, maintaining localized compute boundaries and full jurisdictional compliance.
            </p>
          </div>

          <div className={styles.nodesGrid}>
            {globalNodes.map((node) => (
              <div key={node.city} className={styles.nodeCard}>
                <div className={styles.nodeLocation}>
                  <span className={styles.nodeCity}>{node.city}</span>
                  <span className={styles.nodeDot} aria-hidden="true" />
                </div>
                <span className={styles.nodeRole}>{node.role}</span>
                <p className={styles.nodeDesc}>{node.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <span className={styles.pillarIconWrap} aria-hidden="true">
                <LockIcon />
              </span>
              <div>
                <h4 className={styles.pillarTitle}>Customer-Held Keys (BYOK)</h4>
                <p className={styles.pillarDesc}>
                  Data at rest and in transit is encrypted using client-managed hardware security modules.
                  Cuxton AI holds zero decryption keys.
                </p>
              </div>
            </div>

            <div className={styles.pillarCard}>
              <span className={styles.pillarIconWrap} aria-hidden="true">
                <ShieldIcon />
              </span>
              <div>
                <h4 className={styles.pillarTitle}>Air-Gapped Hardware</h4>
                <p className={styles.pillarDesc}>
                  Complete computational isolation for defense, intelligence, and tier-1 banking clusters
                  with zero public network egress.
                </p>
              </div>
            </div>

            <div className={styles.pillarCard}>
              <span className={styles.pillarIconWrap} aria-hidden="true">
                <ActivityIcon />
              </span>
              <div>
                <h4 className={styles.pillarTitle}>Continuous Drift Auditing</h4>
                <p className={styles.pillarDesc}>
                  Continuous telemetry auditing monitors model accuracy, hallucination boundaries, and
                  operational latencies around the clock.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 5: Executive Council Stage ---------------------------- */}
      <LeadershipCouncil />

      {/* --- Section 6: Closing CTA ----------------------------------------
           Same shape as the /technology and /how-we-work closers. */}
      <section className={styles.closingSection}>
        <div className={`${styles.container} ${styles.closingInner}`}>
          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            Ready to deploy enterprise AI on your terms?
          </h2>
          <p className="section-sub" style={{ margin: "0 auto 2rem" }}>
            Every Cuxton AI partnership begins with an executive discovery session. We review your workflows,
            scrutinize data viability, and outline private architecture options before any build is commissioned.
          </p>

          <div className={styles.closingActions}>
            <Link href="/contact" className="btn-primary" style={{ height: "3.25rem", padding: "0 2rem" }}>
              <span>Schedule Executive Consultation</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/how-we-work" className="btn-secondary" style={{ height: "3.25rem", padding: "0 1.75rem" }}>
              <span>Explore How We Work</span>
            </Link>
          </div>

          <div className={styles.trustBadgesBar}>
            <div className={styles.trustBadge}>
              <CheckIcon />
              <span>ISO 27001 Aligned</span>
            </div>
            <div className={styles.trustBadge}>
              <CheckIcon />
              <span>SOC 2 Type II Certified</span>
            </div>
            <div className={styles.trustBadge}>
              <CheckIcon />
              <span>HIPAA BAA Ready</span>
            </div>
            <div className={styles.trustBadge}>
              <CheckIcon />
              <span>GDPR Sovereign Boundary</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
