"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "../Reveal";
import s from "./aiAgent.module.css";

export const AiAgentsSection = () => {
  const [activeScenario, setActiveScenario] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const scenario = scenarios[activeScenario];
  const step = scenario.steps[activeStep] || scenario.steps[0];

  return (
    <section className={s.section} id="agents">
      {/* ─── SOLID ARCHITECTURAL BACKDROP & SEAMLESS SECTION BLENDS ─── */}
      <div className={s.bgOverlay} />
      <div className={s.edgeTransitionTop} aria-hidden="true" />
      <div className={s.edgeTransitionBottom} aria-hidden="true" />

      <div className={`container max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 text-left ${s.themeWrap}`}>
        {/* ─── SECTION HEADER ────────────────────────────────────────── */}
        <Reveal className={`${s.header} text-left`}>
          <div className="section-label">Autonomous Workflows &amp; AI Agents</div>
          <h2 className={s.heading}>
            AI that executes.<br />
            <span className={s.headingAccent}>Within defined guardrails.</span>
          </h2>
          <p className={s.subHeading}>
            Cuxton develops enterprise AI agents that perform approved multi-step operational tasks on behalf of teams  retrieving authorized company information, processing transactions, and routing workflows, while keeping humans in final command.
          </p>
        </Reveal>

        {/* ─── SCENARIO SELECTOR TABS ────────────────────────────────── */}
        <Reveal delay={80} className={s.tabsContainer}>
          {scenarios.map((sc, i) => (
            <button
              key={sc.name}
              type="button"
              onClick={() => {
                setActiveScenario(i);
                setActiveStep(0);
              }}
              className={`${s.scenarioTab} ${activeScenario === i ? s.scenarioTabActive : ""}`}
            >
              <span className={s.tabIcon}>{sc.icon}</span>
              <span>{sc.name}</span>
            </button>
          ))}
        </Reveal>

        {/* ─── INTERACTIVE AGENT ORCHESTRATION CONSOLE ───────────────── */}
        <div className={s.consoleGrid}>
          {/* Left Column: Visual Pipeline Steps */}
          <Reveal delay={120} className={s.pipelineCard}>
            <div className={s.consoleHeader}>
              <div className={s.consoleTitleGroup}>
                <span className={s.consolePulseDot} />
                <span className={s.consoleTitle}>{scenario.name} Pipeline</span>
              </div>
              <span className={s.consoleBadge}>EXECUTION: CONTROLLED</span>
            </div>

            <div className={s.stepList}>
              {scenario.steps.map((st, idx) => {
                const isCurrent = activeStep === idx;
                return (
                  <button
                    key={st.label}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`${s.stepButton} ${isCurrent ? s.stepButtonActive : ""}`}
                  >
                    <span className={s.stepIndex}>0{idx + 1}</span>
                    <div className={s.stepTextGroup}>
                      <span className={s.stepLabel}>{st.label}</span>
                      <span className={s.stepSummary}>{st.summary}</span>
                    </div>
                    <span
                      className={`${s.stepStatusChip} ${
                        st.status === "COMPLETE" ? s.statusComplete : s.statusReview
                      }`}
                    >
                      {st.status === "COMPLETE" ? "VERIFIED" : "HUMAN GATE"}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Right Column: Execution Inspector Terminal */}
          <Reveal delay={160} className={s.inspectorCard}>
            <div>
              <div className={s.terminalTopBar}>
                <div className={s.terminalDots}>
                  <span className={s.terminalDot} />
                  <span className={s.terminalDot} />
                  <span className={s.terminalDot} />
                </div>
                <span className={s.terminalFileName}>
                  agent_orchestrator://step_0{activeStep + 1}.log
                </span>
                <span className={s.consoleBadge}>RBAC VERIFIED</span>
              </div>

              <div className={s.inspectorBody}>
                <div className={s.inspectorRow}>
                  <span className={s.inspectorFieldLabel}>Active Tool Call</span>
                  <div className={s.codeBlock}>
                    <code>{step.toolCall}</code>
                  </div>
                </div>

                <div className={s.inspectorRow}>
                  <span className={s.inspectorFieldLabel}>Security Scope &amp; Authorization</span>
                  <span className={s.inspectorFieldValue}>{step.scope}</span>
                </div>

                <div className={s.inspectorRow}>
                  <span className={s.inspectorFieldLabel}>Deterministic Governance Rule</span>
                  <span className={s.inspectorFieldValue}>{step.rule}</span>
                </div>
              </div>
            </div>

            {/* Live Telemetry Box */}
            <div className={s.inspectorTelemetryGrid}>
              <div className={s.telemetryBox}>
                <span className={s.telemetryLabel}>Execution Latency</span>
                <span className={s.telemetryValue}>{scenario.telemetry.latency}</span>
              </div>
              <div className={s.telemetryBox}>
                <span className={s.telemetryLabel}>Confidence Score</span>
                <span className={s.telemetryValue}>{scenario.telemetry.confidence}</span>
              </div>
              <div className={s.telemetryBox}>
                <span className={s.telemetryLabel}>Audit Hash</span>
                <span className={s.telemetryValue}>{scenario.telemetry.auditHash}</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ─── GOVERNANCE TRIAD BENTO CARDS ──────────────────────────── */}
        <div className={s.governanceGrid}>
          {governanceTriad.map((gov, i) => (
            <Reveal key={gov.title} delay={i * 100} className={s.govCard}>
              <div className={s.govIcon}>{gov.icon}</div>
              <h3 className={s.govTitle}>{gov.title}</h3>
              <p className={s.govDesc}>{gov.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* ─── ACTIONS FOOTER ────────────────────────────────────────── */}
        <Reveal delay={200} className={s.ctaRow}>
          <Link href="/solutions#agents" className="btn-primary">
            Learn About AI Agents
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/contact" className={`btn-secondary ${s.ctaSecondary}`}>
            Schedule an Agent Discovery Session
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

/* ─── STATIC DATA & ENTERPRISE PIPELINE SCENARIOS ─────────────────── */

const scenarios = [
  {
    name: "Customer Operations",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    ),
    telemetry: {
      latency: "124ms",
      confidence: "99.4%",
      auditHash: "#9A2F-881"
    },
    steps: [
      {
        label: "Inbound Request Intake",
        summary: "Enquiry arrives through authenticated portal webhook",
        toolCall: "webhook_receiver(channel=\"portal_auth\", payload_sanitized=true)",
        scope: "Tier-1 Ingress / Token Authenticated",
        rule: "Enforce schema validation; strip prompt-injection patterns before model queue.",
        status: "COMPLETE"
      },
      {
        label: "Intent Classification & Triage",
        summary: "Evaluates policy tier and determines routing SLA",
        toolCall: "classifier_engine(intent=\"billing_dispute\", confidence_threshold=0.95)",
        scope: "Customer Ops Policy Layer (Read-Only)",
        rule: "Deterministic routing; cannot alter account state during classification phase.",
        status: "COMPLETE"
      },
      {
        label: "Knowledge Retrieval (RAG)",
        summary: "Fetches approved institutional billing guidelines",
        toolCall: "vector_search(collection=\"billing_sop_2024\", tenant_filter=true)",
        scope: "Private Knowledge Enclave (Zero Public Transit)",
        rule: "Retrieval bounded to verified documents; strict source attribution mandatory.",
        status: "COMPLETE"
      },
      {
        label: "Draft Resolution Proposal",
        summary: "Prepares compliant response grounded in contract terms",
        toolCall: "synthesizer(temp=0.1, cite_provenance=true, check_hallucination=true)",
        scope: "Air-Gapped LLM Execution Cluster",
        rule: "Output strictly clamped to retrieved source clauses; zero ungrounded facts.",
        status: "COMPLETE"
      },
      {
        label: "Human Escalation & Sign-Off Gate",
        summary: "Routes refund recommendations to representative with audit trail",
        toolCall: "escalate_to_queue(role=\"billing_supervisor\", audit_trail=\"#9A2F-881\")",
        scope: "Mandatory Dual-Signoff Tier",
        rule: "State modification or financial credits strictly blocked until supervisor confirms.",
        status: "REVIEW"
      }
    ]
  },
  {
    name: "Financial Document Audit",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    telemetry: {
      latency: "210ms",
      confidence: "99.8%",
      auditHash: "#B41C-702"
    },
    steps: [
      {
        label: "Filing Ingestion & Verification",
        summary: "Securely ingests 10-Q filing via encrypted vault API",
        toolCall: "vault_reader(doc_id=\"10Q_Q3.pdf\", sha256_verify=true)",
        scope: "Air-Gapped Financial Vault / KMS Encrypted",
        rule: "Verify cryptographic document signature before memory extraction.",
        status: "COMPLETE"
      },
      {
        label: "Table Extraction & Normalization",
        summary: "Parses GAAP balance sheets and cash flow disclosures",
        toolCall: "table_extractor(format=\"gaap_structured\", precision=4)",
        scope: "Confidential Compute Enclave",
        rule: "Preserve raw cell coordinates and metadata linking to original document.",
        status: "COMPLETE"
      },
      {
        label: "Cross-Ledger Reconciliation",
        summary: "Queries internal ERP general ledger records",
        toolCall: "erp_reconciler(endpoint=\"v1/ledger\", rbac_token=\"auditor_readonly\")",
        scope: "ERP Endpoint (Strict Read-Only)",
        rule: "Service token restricted to read-only access; write endpoints blocked at network layer.",
        status: "COMPLETE"
      },
      {
        label: "Variance & Discrepancy Flagging",
        summary: "Computes delta against internal accounts with 2% threshold",
        toolCall: "anomaly_scanner(delta_threshold=0.02, generate_flags=true)",
        scope: "Deterministic Risk Model",
        rule: "Mathematically deterministic calculation; zero probabilistic rounding.",
        status: "COMPLETE"
      },
      {
        label: "Compliance Officer Approval",
        summary: "Submits findings to senior auditor for formal sign-off",
        toolCall: "audit_gateway(signoff_required=true, log_standard=\"SOX_404\")",
        scope: "Cryptographic Officer Key Required",
        rule: "SOX 404 compliance requires cryptographic key signature from licensed officer.",
        status: "REVIEW"
      }
    ]
  },
  {
    name: "SecOps Incident Remediation",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    telemetry: {
      latency: "88ms",
      confidence: "99.6%",
      auditHash: "#D80E-519"
    },
    steps: [
      {
        label: "SIEM Telemetry Stream Scan",
        summary: "Continuously monitors authentication events for anomalies",
        toolCall: "siem_stream_reader(events_per_sec=50000, filter=\"auth_fail\")",
        scope: "SIEM Read-Only Telemetry Pipe",
        rule: "Low-latency streaming ingestion without payload retention on disk.",
        status: "COMPLETE"
      },
      {
        label: "Threat Pattern Classification",
        summary: "Correlates brute-force pattern against MITRE ATT&CK",
        toolCall: "threat_classifier(framework=\"MITRE_T1078\", threshold=0.98)",
        scope: "Local Threat Intelligence Engine",
        rule: "Match against verified threat matrices; false-positive filter active.",
        status: "COMPLETE"
      },
      {
        label: "Quarantine Sandbox Probe",
        summary: "Inspects target host process tree in isolated VPC",
        toolCall: "probe_host(host_id=\"srv-cluster-08\", sandbox_mode=true)",
        scope: "Isolated Quarantine VPC",
        rule: "Zero production network egress; diagnostic probes fully contained.",
        status: "COMPLETE"
      },
      {
        label: "Generate Network Policy Patch",
        summary: "Drafts targeted IP block and session invalidation rule",
        toolCall: "generate_security_patch(action=\"block_cidr\", dry_run=true)",
        scope: "Firewall Staging Sandbox",
        rule: "Dry-run validation required; automated deployment to edge strictly prohibited.",
        status: "COMPLETE"
      },
      {
        label: "SecOps Engineer Verification Gate",
        summary: "Dispatches MFA prompt to on-call security engineer",
        toolCall: "engineer_approval_prompt(channel=\"pager_mfa\", timeout=\"15m\")",
        scope: "FIDO2 / Hardware MFA Required",
        rule: "No firewall rule may be applied to active edge without engineer MFA confirmation.",
        status: "REVIEW"
      }
    ]
  }
];

const governanceTriad = [
  {
    title: "Deterministic Guardrails",
    desc: "Agents execute exclusively within pre-approved tool schemas and parameter boundaries. Uncontrolled actions and hallucinations are mechanically blocked at the execution boundary.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    title: "RBAC & Identity Inheritance",
    desc: "Every tool call, document lookup, and API execution automatically inherits the invoking employee's Active Directory and SSO security clearance. Agents cannot see what users cannot see.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: "Mandatory Human Oversight",
    desc: "High-volume analysis and synthesis execute in milliseconds, but consequential state changes (transactions, customer messages, code changes) automatically pause for human verification.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
];
