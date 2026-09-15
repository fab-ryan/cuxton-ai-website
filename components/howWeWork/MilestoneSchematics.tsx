"use client";

import React from "react";
import { sch, cx, Tag, Arrow, Bullets, Meter, CheckIcon } from "./SchematicKit";

/* ═══════════════════════════════════════════════════════════════════
   CUXTON AI — BESPOKE MILESTONE TECHNICAL SCHEMATICS & TOPOLOGY RADAR
   The milestone schematics are HTML so they reflow: stacked on a phone,
   side by side once their frame is wide enough (see Schematic.module.css).
   Strict solid token architecture. STRICTLY ZERO linear gradients.
   STRICTLY ZERO emojis.
   ═══════════════════════════════════════════════════════════════════ */

/* ─── 01. DISCOVER: Workflow & Friction Scanner ───────────────────── */
export function DiscoverSchematic() {
  return (
    <div className={sch.canvas}>
      <div className={cx(sch.flow, sch.flowMd)}>
        <div className={sch.group}>
          <Tag caption>INPUT CHANNELS</Tag>
          <ul className={sch.list}>
            <li className={sch.chip}><span className={cx(sch.dot, sch.dotAmber)} />Executive Strategic Intent</li>
            <li className={sch.chip}><span className={sch.dot} />Operational Workflow Logs</li>
            <li className={sch.chip}><span className={sch.dot} />Enterprise IT Systems Map</li>
            <li className={sch.chip}><span className={cx(sch.dot, sch.dotAmber)} />Compliance &amp; Policy Boundary</li>
          </ul>
        </div>

        <Arrow />

        <div className={cx(sch.panel, sch.raised, sch.edgeTeal, sch.wide)}>
          <div className={sch.head}><Tag tone="amber">FRICTION DIAGNOSTIC ENGINE</Tag></div>
          <Meter label="Manual Bottleneck Isolation" value={88} />
          <Meter label="Data Ingestion Readiness Score" value={94} tone="amber" />
          <Tag tone="dim" className={sch.stamp}>STATUS: 14 FRICTION POINTS IDENTIFIED</Tag>
        </div>

        <Arrow tone="amber" dashed />

        <div className={sch.group}>
          <Tag caption>VERIFIED ASSET</Tag>
          <div className={cx(sch.panel, sch.edgeAmberSoft)}>
            <p className={cx(sch.title, sch.amber)}>AI Opportunity Catalog</p>
            <p className={sch.note}>Quantified Value Sizing</p>
            <hr className={sch.rule} />
            <Bullets strong items={["12 Candidate Use Cases", "Baseline ROI Estimates"]} />
            <Tag>READY FOR STAGE 02 GATE</Tag>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 02. ASSESS: 6-Pillar Feasibility Radar Matrix ────────────────── */
const RADAR_SCORES = [
  { label: "Data Quality", value: "94%" },
  { label: "Compliance", value: "100%" },
  { label: "Scalability", value: "92%" },
  { label: "ROI Speed", value: "86%" },
  { label: "Adoption", value: "88%" },
  { label: "Tech Viable", value: "91%" },
];

const PILLARS = [
  "Data Provenance",
  "EU AI Act / GDPR",
  "Latency & Compute",
  "API Security Bounds",
  "ROI Breakeven Target",
  "Operational Readiness",
];

export function AssessSchematic() {
  return (
    <div className={sch.canvas}>
      <div className={sch.assess}>
        <div className={cx(sch.group, sch.assessRadar)}>
          <Tag caption>FEASIBILITY RADAR</Tag>
          <div className={sch.radar}>
            {/* Shape only — the scores are in the legend beside it. Clockwise
                from the top, in the same order as the legend. */}
            <svg className={sch.radarShape} viewBox="0 0 120 120" fill="none" aria-hidden="true">
              <polygon points="60,8 105,34 105,86 60,112 15,86 15,34" stroke="var(--sch-line)" />
              <polygon points="60,32 84,46 84,74 60,88 36,74 36,46" stroke="var(--sch-line)" />
              <path d="M60 8V112M105 34L15 86M105 86L15 34" stroke="var(--sch-line)" strokeDasharray="2 3" />
              <polygon
                points="60,11 105,34 101,84 60,105 20,83 19,36"
                fill="rgba(var(--cuxton-teal-mid-rgb), 0.18)"
                stroke="var(--cuxton-teal-light)"
                strokeWidth="2"
              />
            </svg>
            <ul className={sch.legend}>
              {RADAR_SCORES.map((s) => (
                <li key={s.label}>
                  <span>{s.label}</span>
                  <span>{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={cx(sch.group, sch.assessPillars)}>
          <Tag caption>SIX-PILLAR STRESS TESTING</Tag>
          <ul className={sch.pillars}>
            {PILLARS.map((name, i) => (
              <li key={name} className={cx(sch.panel, sch.compact, sch.edgeTeal)}>
                <div className={sch.check}>
                  <div>
                    <Tag tone="dim">PILLAR 0{i + 1}</Tag>
                    <p className={sch.title}>{name}</p>
                  </div>
                  <CheckIcon />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={cx(sch.group, sch.assessAudit)}>
          <Tag tone="amber" caption>RISK AUDIT CLEARANCE</Tag>
          <div className={cx(sch.panel, sch.edgeAmberSoft)}>
            <Tag className={sch.badge}>ZERO BLOCKERS</Tag>
            <p className={sch.title}>Feasibility Score</p>
            <p className={cx(sch.figure, sch.amber)}>92.4 / 100</p>
            <p className={sch.note}>Confidence: High</p>
            <Tag>APPROVED FOR PRIORITISATION</Tag>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 03. PRIORITISE: Value vs. Complexity Decision Quadrant ───────── */
const QUADRANT_POINTS = [
  { id: "#2", x: 22, y: 30 },
  { id: "#4", x: 25, y: 73 },
  { id: "#3", x: 70, y: 77 },
];

export function PrioritiseSchematic() {
  return (
    <div className={sch.canvas}>
      <div className={cx(sch.stack, sch.splitMd)}>
        <div className={sch.group}>
          <Tag caption>VALUE VS. COMPLEXITY DECISION QUADRANT</Tag>
          <div className={sch.quad}>
            <Tag tone="dim" className={sch.quadAxisY}>BUSINESS VALUE ↑</Tag>
            <div className={sch.quadPlot}>
              <div className={sch.quadTarget}>
                <Tag tone="amber">HIGH IMPACT / HIGH FEASIBILITY</Tag>
              </div>
              {QUADRANT_POINTS.map((p) => (
                <span key={p.id} className={sch.quadPoint} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                  {p.id}
                </span>
              ))}
              <span className={cx(sch.quadPoint, sch.quadPilot)} style={{ left: "80%", top: "42%" }}>
                #1
              </span>
            </div>
            <Tag tone="dim" className={sch.quadAxisX}>IMPLEMENTATION FEASIBILITY &amp; VELOCITY →</Tag>
            <ul className={sch.quadLegend}>
              <li><b className={sch.amber}>#1</b> Pilot selection</li>
              <li><b>#2</b> High complexity</li>
              <li><b>#3</b> Low leverage</li>
              <li><b>#4</b> Low ROI</li>
            </ul>
          </div>
        </div>

        <div className={sch.group}>
          <Tag tone="amber" caption>PILOT PROJECT CHARTER</Tag>
          <div className={cx(sch.panel, sch.edgeAmberSoft)}>
            <p className={sch.title}>Charter Scope Boundary</p>
            <p className={sch.note}>Unanimous Steering Consensus</p>
            <hr className={sch.rule} />
            <Bullets strong items={["Targeted Velocity: 6-Week Deployment", "Commercial KPI: 65% Process Reduction"]} />
            <Tag className={sch.stamp}>STATUS: RESOURCE ALLOCATED</Tag>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 04. DESIGN: Zero-Trust Architecture Blueprint ────────────────── */
const DESIGN_BLOCKS = [
  { tag: "01 · INGESTION", title: "Automated Sanitizer", points: ["PII Masking Engine", "Prompt Injection Shield"], status: "INPUT HARDENED" },
  { tag: "02 · PERMISSIONS", title: "Contextual RBAC", points: ["Session Claim Token", "Zero Data Retention"], status: "ACCESS ISOLATED" },
  { tag: "03 · INFERENCE", title: "Target Model Enclave", points: ["Temperature Locked", "Secondary Guardrail Check"], status: "DETERMINISTIC BOUND", amber: true },
  { tag: "04 · AUDIT VAULT", title: "Cryptographic Log", points: ["SHA-256 Attribution", "SIEM Integration"], status: "SOC2 COMPLIANT" },
];

export function DesignSchematic() {
  return (
    <div className={sch.canvas}>
      <Tag caption>ZERO-TRUST SYSTEM ARCHITECTURE SPECIFICATION</Tag>
      <div className={cx(sch.flow, sch.flowLg)}>
        {DESIGN_BLOCKS.map((b, i) => (
          <React.Fragment key={b.tag}>
            {i > 0 && <Arrow />}
            <div className={cx(sch.panel, b.amber ? sch.edgeAmber : sch.edgeTeal)}>
              <div className={cx(sch.head, b.amber && sch.headAmber)}><Tag tone="amber">{b.tag}</Tag></div>
              <p className={sch.title}>{b.title}</p>
              <Bullets items={b.points} />
              <Tag tone={b.amber ? "amber" : "teal"} className={sch.stamp}>{b.status}</Tag>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ─── 05. PROTOTYPE: Controlled Sandbox Validation Lab ─────────────── */
const SANDBOX_METRICS = [
  { label: "Inference Latency", value: "142 ms", status: "TARGET < 250ms OK" },
  { label: "Deterministic Accuracy", value: "99.2%", status: "GATE PASSED", amber: true },
  { label: "Hallucination Bound", value: "< 0.05%", status: "VERIFIED SECURE" },
];

export function PrototypeSchematic() {
  return (
    <div className={sch.canvas}>
      <div className={cx(sch.stack, sch.splitMd)}>
        <div className={sch.group}>
          <Tag caption>CONTROLLED AIR-GAPPED PROTOTYPE LAB</Tag>
          <div className={cx(sch.panel, sch.deep, sch.edgeTeal, sch.edgeDashed)}>
            <Tag tone="amber">AIR-GAPPED BENCHMARK SANDBOX</Tag>
            <div className={cx(sch.stack, sch.trioSm)}>
              {SANDBOX_METRICS.map((m) => (
                <div key={m.label} className={cx(sch.panel, sch.compact)}>
                  <p className={sch.note}>{m.label}</p>
                  <p className={cx(sch.figure, m.amber && sch.amber)}>{m.value}</p>
                  <Tag tone="ok">{m.status}</Tag>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={sch.group}>
          <Tag tone="amber" caption>USER TESTING RESULTS</Tag>
          <div className={cx(sch.panel, sch.edgeAmberSoft)}>
            <p className={sch.title}>End-User Usability Score</p>
            <p className={sch.figure}>94.8%</p>
            <hr className={sch.rule} />
            <Bullets strong items={["18 Pilot Testers Completed", "Production Gap Matrix Clear"]} />
            <Tag tone="amber">READY FOR PRODUCTION BUILD</Tag>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 06. DEPLOY: Hardened Production Deployment Topology ─────────── */
const DEPLOY_COMPONENTS = [
  { tag: "API GATEWAY", title: "Hardened Edge", detail: "Rate Limited / mTLS", status: "ACTIVE 24/7", tone: "ok" as const },
  { tag: "CONTAINER CLUSTER", title: "Multi-Zone Pods", detail: "Zero-Downtime Failover", status: "HEALTHY (3 REPLICAS)", tone: "ok" as const },
  { tag: "INFRASTRUCTURE SEC", title: "Pen-Test Verified", detail: "Zero Critical Defects", status: "AUDIT CERTIFIED", tone: "amber" as const },
  { tag: "RUNBOOKS & SRE", title: "Disaster Recovery", detail: "RTO < 5m / RPO < 1m", status: "OPS CLEARED", tone: "teal" as const },
];

export function DeploySchematic() {
  return (
    <div className={sch.canvas}>
      <Tag caption>DEDICATED CLIENT TENANT INFRASTRUCTURE</Tag>
      <div className={cx(sch.panel, sch.deep, sch.edgeTeal)}>
        <div className={sch.tab}><Tag tone="amber">SECURE ENCLAVE BOUNDARY</Tag></div>
        <div className={cx(sch.flow, sch.flowLg)}>
          {DEPLOY_COMPONENTS.map((c, i) => (
            <React.Fragment key={c.tag}>
              {i > 0 && <Arrow />}
              <div className={cx(sch.panel, sch.compact, c.tone === "amber" && sch.edgeAmber)}>
                <Tag tone={c.tone === "amber" ? "amber" : "teal"}>{c.tag}</Tag>
                <p className={sch.title}>{c.title}</p>
                <p className={sch.note}>{c.detail}</p>
                <Tag tone={c.tone}>{c.status}</Tag>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── 07. ENABLE: Workforce Certification & Custody Handover ──────── */
const ENABLE_TRACKS = [
  { tag: "TRACK 01 · OPERATORS", title: "Interactive Academy", points: ["Workflow Integration Labs", "Exception Handling Drills"], status: "100% OPERATORS CERTIFIED" },
  { tag: "TRACK 02 · SYSTEM ADMINS", title: "Operational Custody", points: ["Incident Response Playbooks", "Independent Drill Execution"], status: "ADMIN DRILL PASSED", amber: true },
  { tag: "TRACK 03 · LEADERSHIP", title: "Governance Protocol", points: ["Continuous Audit Dashboard", "Escalation Threshold Framework"], status: "GOVERNANCE CODIFIED" },
];

export function EnableSchematic() {
  return (
    <div className={sch.canvas}>
      <Tag caption>WORKFORCE ENABLEMENT &amp; CUSTODY MATRIX</Tag>
      <div className={cx(sch.stack, sch.trioMd)}>
        {ENABLE_TRACKS.map((t) => (
          <div key={t.tag} className={cx(sch.panel, t.amber ? sch.edgeAmber : sch.edgeTeal)}>
            <div className={cx(sch.head, t.amber && sch.headAmber)}><Tag tone="amber">{t.tag}</Tag></div>
            <p className={sch.title}>{t.title}</p>
            <Bullets items={t.points} />
            <Tag tone={t.amber ? "amber" : "teal"} className={sch.stamp}>{t.status}</Tag>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── 08. OPERATE: Continuous Telemetry & Drift Observability ──────── */
export function OperateSchematic() {
  return (
    <div className={sch.canvas}>
      <Tag caption>CONTINUOUS OBSERVABILITY &amp; DRIFT TELEMETRY</Tag>
      <div className={cx(sch.stack, sch.splitMd)}>
        <div className={sch.panel}>
          <div className={sch.stats}>
            <div className={sch.stat}>
              <Tag tone="dim">SYSTEM AVAILABILITY</Tag>
              <p className={cx(sch.figure, sch.strong)}>99.98%</p>
            </div>
            <div className={sch.stat}>
              <Tag tone="dim">DATA DRIFT VARIANCE</Tag>
              <p className={cx(sch.figure, sch.ok)}>0.02%</p>
              <Tag tone="ok">NOMINAL</Tag>
            </div>
            <div className={sch.stat}>
              <Tag tone="dim">AUTOMATED RETRAIN</Tag>
              <p className={cx(sch.figure, sch.amber)}>ACTIVE BOUND</p>
            </div>
          </div>
          {/* Stretches to any width; the stroke stays 2px regardless. */}
          <div className={sch.trace} aria-hidden="true">
            <svg viewBox="0 0 360 40" preserveAspectRatio="none" fill="none">
              <path
                d="M0 20 Q 30 5, 60 20 T 120 20 T 180 22 T 240 18 T 300 20 T 360 19"
                stroke="var(--cuxton-teal-light)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className={sch.traceEnd} />
          </div>
          <Tag>24/7 SIEM DRIFT OBSERVABILITY ACTIVE</Tag>
        </div>

        <div className={cx(sch.panel, sch.edgeAmberSoft)}>
          <Tag tone="amber">QUARTERLY EXPANSION HORIZON</Tag>
          <p className={sch.title}>Value Scale Roadmap</p>
          <Bullets items={["Quarterly Steering Review", "Adjacent Workflow Mapping"]} />
          <Tag className={sch.stamp}>ENTERPRISE SCALE CERTIFIED</Tag>
        </div>
      </div>
    </div>
  );
}

/* ─── STICKY COMMAND DECK TOPOLOGY RADAR ───────────────────────────── */
/* Desktop-only (the deck is hidden below 1024px), so it stays an SVG. */
export function TopologyRadarDeck({ activeStepIndex }: { activeStepIndex: number }) {
  const steps = [
    { n: "01", name: "Discover", angle: -90 },
    { n: "02", name: "Assess", angle: -45 },
    { n: "03", name: "Prioritise", angle: 0 },
    { n: "04", name: "Design", angle: 45 },
    { n: "05", name: "Prototype", angle: 90 },
    { n: "06", name: "Deploy", angle: 135 },
    { n: "07", name: "Enable", angle: 180 },
    { n: "08", name: "Operate", angle: 225 },
  ];

  const centerX = 130;
  const centerY = 90;
  const radius = 64;

  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background Container */}
      <rect x="0" y="0" width="260" height="180" rx="10" fill="var(--sch-deep)" stroke="rgba(27,107,138,0.25)" strokeWidth="1" />

      {/* Concentric Radar Rings (Zero linear gradient) */}
      <circle cx={centerX} cy={centerY} r={radius} stroke="rgba(27,107,138,0.3)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx={centerX} cy={centerY} r={radius * 0.55} stroke="rgba(27,107,138,0.2)" strokeWidth="1" />
      <circle cx={centerX} cy={centerY} r={8} fill="var(--sch-panel)" stroke="var(--cuxton-teal-light)" strokeWidth="1.5" />
      <circle cx={centerX} cy={centerY} r={3} fill="var(--cuxton-amber)" />

      {/* Axis Lines */}
      <line x1={centerX - radius - 10} y1={centerY} x2={centerX + radius + 10} y2={centerY} stroke="rgba(27,107,138,0.15)" strokeWidth="1" />
      <line x1={centerX} y1={centerY - radius - 10} x2={centerX} y2={centerY + radius + 10} stroke="rgba(27,107,138,0.15)" strokeWidth="1" />

      {/* 8 Milestone Nodes Spaced along Perimeter */}
      {steps.map((s, idx) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(rad);
        const y = centerY + radius * Math.sin(rad);
        const isActive = idx === activeStepIndex;
        const isPast = idx < activeStepIndex;

        return (
          <g key={s.n}>
            {/* Connector to Center */}
            <line
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke={isActive ? "var(--cuxton-amber)" : isPast ? "var(--cuxton-teal-light)" : "rgba(27,107,138,0.2)"}
              strokeWidth={isActive ? 1.5 : 1}
            />

            {/* Node Circle */}
            <circle
              cx={x}
              cy={y}
              r={isActive ? 12 : 9}
              fill={isActive ? "var(--cuxton-amber)" : isPast ? "var(--sch-panel-2)" : "var(--sch-deep)"}
              stroke={isActive ? "var(--sch-text)" : isPast ? "var(--cuxton-teal-light)" : "rgba(27,107,138,0.4)"}
              strokeWidth={isActive ? 2 : 1.2}
            />

            {/* Node Text */}
            <text
              x={x}
              y={y + 3.5}
              fill={isActive ? "var(--sch-deep)" : isPast ? "var(--cuxton-teal-light)" : "var(--sch-text-dim)"}
              fontSize={isActive ? "8.5" : "7.5"}
              fontWeight="600"
              fontFamily="monospace"
              textAnchor="middle"
            >
              {s.n}
            </text>
          </g>
        );
      })}

      {/* Live Label at Bottom */}
      <text x={centerX} y="168" fill="var(--cuxton-amber)" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="monospace">
        Step {steps[activeStepIndex].n} — {steps[activeStepIndex].name}
      </text>
    </svg>
  );
}

/* ─── Component Factory: Render Schematic by Step Number ──────────── */
export default function MilestoneSchematic({ stepNumber }: { stepNumber: string }) {
  switch (stepNumber) {
    case "01":
      return <DiscoverSchematic />;
    case "02":
      return <AssessSchematic />;
    case "03":
      return <PrioritiseSchematic />;
    case "04":
      return <DesignSchematic />;
    case "05":
      return <PrototypeSchematic />;
    case "06":
      return <DeploySchematic />;
    case "07":
      return <EnableSchematic />;
    case "08":
      return <OperateSchematic />;
    default:
      return null;
  }
}
