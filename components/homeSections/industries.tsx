"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import s from "./industries.module.css";

export const IndustriesSection = () => {
  const [activeFinanceIndex, setActiveFinanceIndex] = useState(0);
  const [activeHealthIndex, setActiveHealthIndex] = useState(0);

  return (
    <section className={`section-py ${s.section}`} id="industries">
      <div className={`container max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 ${s.themeWrap}`}>
        {/* ─── SECTION HEADER ────────────────────────────────────────── */}
        <Reveal className={s.header}>
          <div className={s.headerCopy}>
            <h2 className={s.heading}>
              Built for environments<br />
              <span className={s.headingAccent}>where data cannot move.</span>
            </h2>
          </div>
          <p className={s.headerIntro}>
            In financial services, healthcare, and regulated enterprise, AI architecture must start with legal and operational data residency. CuxtonAI operates fully inside your private infrastructure with zero external data leakage.
          </p>
        </Reveal>

        {/* ─── 2 FLAGSHIP DEEP-DIVE SHOWCASES ───────────────────────── */}
        <div className={s.flagshipGrid}>
          {/* 1. Financial Services */}
          <Reveal className={s.flagshipCard}>
            <div className={s.cardHeader}>
              <div className={s.cardHeaderTitleGroup}>
                <span className={s.cardSub}>Banks, Insurers, Asset Managers, Market Infrastructure</span>
                <h3 className={s.cardTitle}>Financial Services</h3>
              </div>
              <div className={s.cardIconBadge}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>

            {/* 16:9 Visual Graphic Showcase */}
            <div className={s.mediaFrame}>
              <span className={s.cornerTl} aria-hidden="true" />
              <span className={s.cornerBr} aria-hidden="true" />

              <div className={s.telemetryChipLeft}>
                <span className={s.pulseDot} />
                <span>ZONE: AIR-GAPPED VPC</span>
              </div>
              <div className={s.telemetryChipRight}>
                <span>98.4% COMPLIANCE ADHERENCE</span>
              </div>

              <Image
                src="/industries/finance_enterprise_ai.jpg"
                alt="Financial Intelligence and Compliance AI Console"
                width={600}
                height={450}
                className={s.mediaImg}
                priority
              />
            </div>

            <div className={s.cardContent}>
              <p className={s.introText}>
                Financial institutions operate under rigorous supervisory requirements. Cuxton builds deterministic compliance monitoring, real-time risk intelligence, and knowledge retrieval that never expose client records.
              </p>

              {/* Regulatory Standards Row */}
              <div className={s.governanceRow}>
                <span className={s.govPill}>SEC Rule 17a-4</span>
                <span className={s.govPill}>FINRA Reg Notice 20-21</span>
                <span className={s.govPill}>SOX Section 404</span>
                <span className={s.boundaryPill}>Zero Third-Party Training</span>
              </div>

              {/* Interactive Use-Case Explorer */}
              <div className={s.useCaseList}>
                {financeUseCases.map((uc, idx) => {
                  const isActive = activeFinanceIndex === idx;
                  return (
                    <button
                      key={uc.title}
                      type="button"
                      onClick={() => setActiveFinanceIndex(idx)}
                      className={`${s.useCaseItem} ${isActive ? s.useCaseItemActive : ""}`}
                    >
                      <div className={s.useCaseHeader}>
                        <span className={s.useCaseTitle}>{uc.title}</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease",
                            color: isActive ? "var(--cuxton-amber)" : "inherit"
                          }}
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                      {isActive && <p className={s.useCaseDesc}>{uc.desc}</p>}
                    </button>
                  );
                })}
              </div>

              <div className={s.cardFooter}>
                <Link href="/industries#finance" className={s.actionLink}>
                  <span>Explore Financial Services Architecture</span></Link>
              </div>
            </div>
          </Reveal>

          {/* 2. Healthcare & Life Sciences */}
          <Reveal delay={120} className={s.flagshipCard}>
            <div className={s.cardHeader}>
              <div className={s.cardHeaderTitleGroup}>
                <span className={s.cardSub}>Hospitals, Clinics, Research Institutes, MedTech</span>
                <h3 className={s.cardTitle}>Healthcare &amp; Life Sciences</h3>
              </div>
              <div className={s.cardIconBadge}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
            </div>

            {/* 16:9 Visual Graphic Showcase */}
            <div className={s.mediaFrame}>
              <span className={s.cornerTl} aria-hidden="true" />
              <span className={s.cornerBr} aria-hidden="true" />

              <div className={s.telemetryChipLeft}>
                <span className={s.pulseDot} />
                <span>DATA: ON-PREM ENCLAVE</span>
              </div>
              <div className={s.telemetryChipRight}>
              </div>

              <Image
                src="/industries/healthcare_clinical_ai.jpg"
                alt="Healthcare Clinical Intelligence and HIPAA Data Enclave"
                width={600}
                height={450}
                className={s.mediaImg}
                priority
              />
            </div>

            <div className={s.cardContent}>
              <p className={s.introText}>
                Clinical AI requires ironclad patient-privacy guarantees and strict medical attribution. Cuxton equips clinicians with instant protocol synthesis and document support without making unverified diagnoses.
              </p>

              {/* Regulatory Standards Row */}
              <div className={s.governanceRow}>
                <span className={s.govPill}>HIPAA Security Rule</span>
                <span className={s.govPill}>HL7 / FHIR Native</span>
                <span className={s.govPill}>BAA-Compliant Boundary</span>
                <span className={s.boundaryPill}>De-Identified Memory</span>
              </div>

              {/* Interactive Use-Case Explorer */}
              <div className={s.useCaseList}>
                {healthUseCases.map((uc, idx) => {
                  const isActive = activeHealthIndex === idx;
                  return (
                    <button
                      key={uc.title}
                      type="button"
                      onClick={() => setActiveHealthIndex(idx)}
                      className={`${s.useCaseItem} ${isActive ? s.useCaseItemActive : ""}`}
                    >
                      <div className={s.useCaseHeader}>
                        <span className={s.useCaseTitle}>{uc.title}</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease",
                            color: isActive ? "var(--cuxton-amber)" : "inherit"
                          }}
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                      {isActive && <p className={s.useCaseDesc}>{uc.desc}</p>}
                    </button>
                  );
                })}
              </div>

              <div className={s.cardFooter}>
                <Link href="/industries#healthcare" className={s.actionLink}>
                  <span>Explore Healthcare Architecture</span></Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ─── 4 SPECIALIZED SECTOR BENTO CARDS ─────────────────────── */}
        <div className={s.secondaryGrid}>
          {secondarySectors.map((sec, i) => (
            <Reveal key={sec.name} delay={i * 80}>
              <Link href={sec.href} className={`${s.secondaryCard} ${s[`secondaryAccent${(i % 4) + 1}`]}`}>
                <div className={s.secondaryHead}>
                  <div className={s.secondaryIcon}>{sec.icon}</div>
                  <span className={s.secondaryStandard}>{sec.standard}</span>
                </div>
                <h4 className={s.secondaryTitle}>{sec.name}</h4>
                <p className={s.secondaryDesc}>{sec.desc}</p>
                <div className={s.secondaryMetricRow}>
                  <span>{sec.metricLabel}</span>
                  <span className={s.secondaryMetricVal}>{sec.metricVal}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* ─── SECTION FOOTER ────────────────────────────────────────── */}
        <div className={s.footerRow}>
          <Link href="/industries" className="btn-secondary">
            Explore All Industry Deployments</Link>
        </div>
      </div>
    </section>
  );
};

/* ─── STATIC DATA & USE CASES ─────────────────────────────────────── */

const financeUseCases = [
  {
    title: "Compliance Monitoring & Audit Trails",
    desc: "Autonomous monitoring assistants classify documents, review policy adherence, and log tamper-evident audit trails inside private networks."
  },
  {
    title: "Internal Knowledge Systems (RAG)",
    desc: "Connect LLMs strictly to approved internal regulations, fund prospectuses, and analyst notes without public cloud data transit."
  },
  {
    title: "Real-Time Fraud & Anomaly Screening",
    desc: "In-enclave stream analytics that flag transaction anomalies and suspicious activity for mandatory human compliance review."
  },
  {
    title: "Grounded Client Service AI Agents",
    desc: "Front-office client assistants operating strictly within deterministic response rules and pre-verified institutional boundaries."
  }
];

const healthUseCases = [
  {
    title: "Clinical Protocol & Drug Knowledge Assistants",
    desc: "Rapid retrieval of verified institutional care guidelines, contraindications, and hospital protocols without exposing patient records."
  },
  {
    title: "Medical Document Review & Summarisation",
    desc: "Accelerate patient chart reviews, discharge summary coding, and referral triage within HIPAA-compliant private compute enclaves."
  },
  {
    title: "Operational Flow & Capacity Analytics",
    desc: "Pattern analysis for bed management and staffing predictions executed completely on de-identified historical operational streams."
  },
  {
    title: "Biomedical Literature & Research RAG",
    desc: "Let research teams search medical literature directly, clinical trials, and genomic datasets with citation provenance."
  }
];

const secondarySectors = [
  {
    name: "Government & Defense",
    standard: "FedRAMP, ISO 27001",
    desc: "institutional knowledge systems, automated citizen service-request workflows, and air-gapped assistant architectures.",
    href: "/industries#government",
    metricLabel: "Deployment Model",
    metricVal: "Air-Gapped Cluster",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  },
  {
    name: "Legal & Professional Services",
    standard: "SOC 2, Bar Ethics",
    desc: "Evidence retrieval, contract clause comparison, internal work-product indexing, and cryptographically verifiable attribution trails.",
    href: "/industries#legal",
    metricLabel: "Attribution Guarantee",
    metricVal: "100% Verifiable Citations",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  },
  {
    name: "Telecommunications",
    standard: "Telecom Act, GDPR",
    desc: "High-throughput customer-service agents, operational telemetry triage, network anomaly discovery, and strict tenant separation.",
    href: "/industries#telecom",
    metricLabel: "Response Latency",
    metricVal: "<45ms Edge Inference",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1.05 4.05A11 11 0 0 1 22.95 19.95" />
        <path d="M4.22 7.22a7.5 7.5 0 0 1 10.56 10.56" />
        <path d="M7.39 10.39a4 4 0 0 1 5.66 5.66" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    )
  },
  {
    name: "Higher Education & Research",
    standard: "FERPA",
    desc: "Faculty research synthesis, institutional knowledge assistants, and student success support protected against model retraining.",
    href: "/industries#education",
    metricLabel: "Data Privacy",
    metricVal: "Zero Training On Student IP",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    )
  }
];