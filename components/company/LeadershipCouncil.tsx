"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./LeadershipCouncil.module.css";

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

const ChevronLeftIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.24h4.56V23H.22V8.24zM8.34 8.24h4.37v2.01h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.99V23h-4.56v-6.99c0-1.67-.03-3.81-2.32-3.81-2.33 0-2.69 1.82-2.69 3.69V23H8.34V8.24z" />
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.83-5.97 6.83H1.66l7.73-8.84L1.25 2.25h6.83l4.72 6.24 5.44-6.24zm-1.16 17.52h1.83L7.02 4.13H5.06l12.02 15.64z" />
  </svg>
);

interface CouncilMember {
  code: string;
  name: string;
  role: string;
  shortRole: string;
  domain: string;
  bio: string;
  /* Placeholder copy, same as the bios — review before shipping. */
  mandate: string[];
  city: string;
  country: string;
  photo: string;
  linkedin: string;
  x: string;
}

const council: CouncilMember[] = [
  {
    code: "CUX-EXE-01",
    name: "Alistair Vance",
    role: "Chief Executive & Founder",
    shortRole: "Chief Executive",
    domain: "Executive Strategy",
    bio: "Former enterprise systems architect with two decades advising tier-1 capital markets and aerospace institutions on infrastructure.",
    mandate: [
      "Final approval on every institutional engagement mandate",
      "Chairs the client data-custody and escalation board",
      "Owns independence: no vendor resale, no referral commissions",
    ],
    city: "London",
    country: "United Kingdom",
    photo: "/team/alistair_vance.jpg",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
  },
  {
    code: "CUX-EXE-02",
    name: "Dr. Elena Rostova",
    role: "Head of Intelligence",
    shortRole: "Intelligence",
    domain: "Research & Verification",
    bio: "PhD in Formal Methods and Distributed Machine Learning. Directs private model fine-tuning, deterministic evaluation, and zero-hallucination pipelines.",
    mandate: [
      "Signs off model evaluation gates before any production release",
      "Owns hallucination-boundary thresholds and drift criteria",
      "Directs private fine-tuning and deterministic evaluation design",
    ],
    city: "Zurich",
    country: "Switzerland",
    photo: "/team/elena_rostova.jpg",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
  },
  {
    code: "CUX-EXE-03",
    name: "Marcus Thorne",
    role: "VP of Regulatory Governance & Risk",
    shortRole: "Governance & Risk",
    domain: "Compliance & Audit",
    bio: "Ex-regulatory compliance counsel specializing in EU AI Act, FCA, HIPAA, and Basel III institutional AI governance frameworks.",
    mandate: [
      "Maps every deployment to its statutory control framework",
      "Owns audit evidence, retention policy and regulator liaison",
      "Holds veto on releases that fail compliance clearance",
    ],
    city: "Frankfurt",
    country: "Germany",
    photo: "/team/marcus_thorne.jpg",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
  },
  {
    code: "CUX-EXE-04",
    name: "Siddharth Mehta",
    role: "Chief Enclave Architect",
    shortRole: "Enclave Architecture",
    domain: "Network & Security",
    bio: "Pioneer in air-gapped cryptographic enclaves and hardware security modules (HSM) for defense-grade and banking compute clusters.",
    mandate: [
      "Designs enclave topology and key-custody boundaries",
      "Certifies air-gap and egress controls before handover",
      "Owns HSM integration and the cryptographic key lifecycle",
    ],
    city: "New York",
    country: "United States",
    photo: "/team/siddharth_mehta.jpg",
    linkedin: "https://linkedin.com",
    x: "https://x.com",
  },
];

export default function LeadershipCouncil() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = council[activeIdx];
  const total = council.length;

  const goPrev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const goNext = () => setActiveIdx((i) => (i + 1) % total);

  return (
    <section className={styles.section} aria-labelledby="council-heading">
      <div className={styles.bgImage} aria-hidden="true" />
      <div className={styles.washOverlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="council-heading" className={styles.heading}>
            Leadership{" "}
            <span className={styles.headingHighlight}>accountable for how Cuxton AI operates.</span>
          </h2>
          <p className={styles.lead}>
            Our executive council directly oversees institutional engagements, enforcing strict data-custody
            guarantees, ethical alignment, and human-in-the-loop oversight principles.
          </p>
        </div>

        {/* Selector rail */}
        <div className={styles.rail} role="tablist" aria-label="Executive council members">
          {council.map((m, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={m.code}
                type="button"
                role="tab"
                id={`council-tab-${i}`}
                aria-selected={isActive}
                aria-controls="council-stage"
                className={`${styles.railBtn} ${isActive ? styles.railBtnActive : ""}`}
                onClick={() => setActiveIdx(i)}
              >
                <span className={styles.railAvatar}>
                  <Image
                    src={m.photo}
                    alt=""
                    fill
                    sizes="42px"
                    className={styles.railAvatarImg}
                  />
                </span>
                <span className={styles.railText}>
                  <span className={styles.railName}>{m.name}</span>
                  <span className={styles.railRole}>{m.shortRole}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Stage */}
        <div
          className={styles.stage}
          id="council-stage"
          role="tabpanel"
          aria-labelledby={`council-tab-${activeIdx}`}
        >
          <div className={styles.stageGrid}>
            <div className={styles.portraitPane}>
              <Image
                key={active.photo}
                src={active.photo}
                alt={`${active.name} — ${active.role}`}
                fill
                priority={activeIdx === 0}
                sizes="(max-width: 1024px) 100vw, 420px"
                className={styles.portrait}
              />
              <div className={styles.portraitScrim} aria-hidden="true" />
              <span className={styles.portraitIndex} aria-hidden="true">
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
              <span className={styles.portraitBadge}>
                <span className={styles.portraitBadgeDot} aria-hidden="true" />
                <span>{active.domain}</span>
              </span>
            </div>

            <div className={styles.recordPane}>
              <div className={styles.recordTop}>
                <span className={styles.recordCounter}>
                  <span>Council {String(activeIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                  <span className={styles.recordCounterDot} aria-hidden="true" />
                  <span>Governance</span>
                </span>
                <span className={styles.recordCode}>{active.code}</span>
              </div>

              <h3 className={styles.recordName}>{active.name}</h3>
              <p className={styles.recordRole}>{active.role}</p>
              <p className={styles.recordBio}>{active.bio}</p>

              <div className={styles.mandateBox}>
                <p className={styles.mandateTitle}>Oversight Mandate</p>
                <ul className={styles.mandateList}>
                  {active.mandate.map((item) => (
                    <li key={item} className={styles.mandateItem}>
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.recordFooter}>
                <span className={styles.recordLocation}>
                  {active.city}, {active.country}
                </span>

                <div className={styles.footerControls}>
                  <a
                    href={active.linkedin}
                    className={styles.socialBtn}
                    aria-label={`${active.name} on LinkedIn`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href={active.x}
                    className={styles.socialBtn}
                    aria-label={`${active.name} on X`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <XIcon />
                  </a>

                  <span className={styles.controlDivider} aria-hidden="true" />

                  <button
                    type="button"
                    onClick={goPrev}
                    className={styles.pagerBtn}
                    aria-label="Previous council member"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className={styles.pagerBtn}
                    aria-label="Next council member"
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.charterNotice}>
          <span className={styles.charterNoticeDot} aria-hidden="true" />
          <span>
            <strong>Institutional Governance Charter:</strong> Every engagement is bound by contractual
            guarantees that prohibit the unauthorized exfiltration, multi-tenant sharing, or public retraining
            of client institutional data.
          </span>
        </div>
      </div>
    </section>
  );
}
