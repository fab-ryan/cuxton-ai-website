import React from "react";
import { sch, cx, Tag, Arrow, Bullets } from "./SchematicKit";

/* ═══════════════════════════════════════════════════════════════════
   CUXTON AI — OPERATING PRINCIPLE GRAPHICS
   One diagram per principle, built as HTML so it reflows: stacked on a
   phone, side by side once the visual card is wide enough.
   Strict solid token architecture. STRICTLY ZERO linear gradients.
   STRICTLY ZERO emojis.
   ═══════════════════════════════════════════════════════════════════ */

export function ProblemFirstGraphic() {
  return (
    <div className={sch.canvas}>
      <Tag caption>OPERATIONAL DIAGNOSTIC PIPELINE</Tag>
      <div className={cx(sch.flow, sch.flowSm)}>
        <div className={cx(sch.panel, sch.compact)}>
          <Tag tone="amber">01 · INGESTION</Tag>
          <p className={sch.title}>Workflow Friction</p>
          <p className={sch.note}>Manual Bottleneck</p>
        </div>
        <Arrow />
        <div className={cx(sch.panel, sch.compact, sch.chipBg, sch.edgeTeal)}>
          <Tag>02 · EVALUATION</Tag>
          <p className={sch.title}>Is AI Required?</p>
          <p className={sch.note}>Deterministic Gate</p>
        </div>
        <Arrow tone="amber" />
        <div className={cx(sch.panel, sch.compact, sch.edgeAmber)}>
          <Tag tone="amber">03 · OUTCOME</Tag>
          <p className={sch.title}>True ROI</p>
          <Tag>CLIENT FIRST</Tag>
        </div>
      </div>
      <div className={cx(sch.panel, sch.gap)}>
        <div className={cx(sch.stack, sch.pairSm)}>
          <div className={sch.stat}>
            <Tag tone="dim">VENDOR RESALE QUOTA</Tag>
            <p className={cx(sch.figure, sch.amber)}>0% (ZERO)</p>
          </div>
          <div className={sch.stat}>
            <Tag tone="dim">CLIENT INCENTIVE ALIGNMENT</Tag>
            <p className={sch.figure}>100% UNBIASED</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const FEASIBILITY_ROWS = [
  { label: "Data Quality & Cleanliness", value: "94% PASS" },
  { label: "Regulatory Bounds (GDPR/AI Act)", value: "100% CLEAR" },
  { label: "Technical Infrastructure Viability", value: "91% PASS" },
  { label: "Unit Economics Breakeven Horizon", value: "8-MONTH", amber: true },
];

export function HonestFeasibilityGraphic() {
  return (
    <div className={sch.canvas}>
      <Tag caption>CANDID FEASIBILITY &amp; RISK AUDIT</Tag>
      <div className={cx(sch.stack, sch.splitSm)}>
        <ul className={sch.list}>
          {FEASIBILITY_ROWS.map((r) => (
            <li key={r.label} className={sch.row}>
              <span>{r.label}</span>
              <Tag tone={r.amber ? "amber" : "teal"}>{r.value}</Tag>
            </li>
          ))}
        </ul>
        <div className={cx(sch.panel, sch.edgeAmberSoft)}>
          <Tag tone="amber">CAPITAL PROTECTION</Tag>
          <p className={sch.title}>Zero Sunk Costs</p>
          <p className={sch.note}>If an initiative is fatal, we stop early.</p>
          <Tag className={cx(sch.stamp, sch.stampChip)}>NO FALSE CLAIMS</Tag>
        </div>
      </div>
    </div>
  );
}

const PILOT_STEPS = [
  { when: "WEEKS 1–2", what: "Isolate Flow" },
  { when: "WEEKS 3–6", what: "Build & Test" },
  { when: "WEEKS 7–8", what: "Live Value", amber: true },
];

export function ControlledScopeGraphic() {
  return (
    <div className={sch.canvas}>
      <Tag caption>CONTROLLED PILOT BOUNDARY VS. SCOPE CREEP</Tag>
      <div className={cx(sch.panel, sch.edgeDashed)}>
        <Tag tone="faint">UNBOUNDED SCOPE (PROJECT FAILURE TRAP)</Tag>
        <div className={cx(sch.panel, sch.raised, sch.edgeAmber)}>
          <Tag tone="amber">CUXTON CONTROLLED PILOT PERIMETER</Tag>
          <div className={cx(sch.flow, sch.flowSm)}>
            {PILOT_STEPS.map((s, i) => (
              <React.Fragment key={s.when}>
                {i > 0 && <Arrow tone={s.amber ? "amber" : "teal"} />}
                <div className={cx(sch.panel, sch.compact, s.amber ? sch.edgeAmber : sch.edgeTeal)}>
                  <Tag tone={s.amber ? "amber" : "teal"}>{s.when}</Tag>
                  <p className={sch.title}>{s.what}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HumanOversightGraphic() {
  return (
    <div className={sch.canvas}>
      <Tag caption>IRREVOCABLE HUMAN DECISION AUTHORITY GATE</Tag>
      <div className={cx(sch.flow, sch.flowSm)}>
        <div className={cx(sch.panel, sch.compact)}>
          <div className={sch.head}><Tag>AI INFERENCE LAYER</Tag></div>
          <p className={sch.title}>Deep Synthesis</p>
          <Bullets items={["Draft Extraction", "Risk Flagging"]} />
          <Tag className={sch.stamp}>RECOMMENDATION ONLY</Tag>
        </div>
        <Arrow tone="amber" dashed />
        <div className={cx(sch.panel, sch.compact, sch.raised, sch.edgeAmber)}>
          <div className={cx(sch.head, sch.headAmber)}><Tag tone="amber">HUMAN OPERATOR GATE</Tag></div>
          <p className={sch.title}>Verified Approval</p>
          <Bullets items={["Personnel Signature", "Mandatory Sign-Off"]} />
          <Tag tone="amber" className={sch.stamp}>AUTHORITY REQUIRED</Tag>
        </div>
        <Arrow />
        <div className={cx(sch.panel, sch.compact, sch.edgeTeal, sch.fit)} style={{ justifyContent: "center" }}>
          <Tag>ACTION</Tag>
          <p className={sch.title}>Execute</p>
        </div>
      </div>
    </div>
  );
}

export function NoComplexityGraphic() {
  return (
    <div className={sch.canvas}>
      <Tag caption>ALGORITHMIC PROPORTIONALITY (OCCAM&apos;S RAZOR)</Tag>
      <div className={cx(sch.stack, sch.pairSm)}>
        <div className={cx(sch.panel, sch.edgeError)}>
          <Tag tone="error">REJECTED OVERHEAD</Tag>
          <p className={sch.title}>70B+ Monolithic Model</p>
          <Bullets items={["High Compute Bill ($$$)", "2,500ms Latency", "Black-Box Drift Risk"]} />
          <Tag tone="error" className={cx(sch.stamp, sch.stampError)}>UNNECESSARY COMPLEXITY</Tag>
        </div>
        <div className={cx(sch.panel, sch.chipBg, sch.edgeTeal)}>
          <Tag>CUXTON LEAN ARCHITECTURE</Tag>
          <p className={sch.title}>Task-Optimized Micro AI</p>
          <Bullets items={["92% Lower Compute Cost", "Sub-150ms Determinism", "Full Audit Transparency"]} />
          <Tag className={sch.stamp}>PROPORTIONAL &amp; RELIABLE</Tag>
        </div>
      </div>
    </div>
  );
}

const CUSTODY_PILLARS = [
  { tag: "01 · IP ASSET", title: "100% Client IP", points: ["All Code Owned", "Zero Lock-in"], stamp: "OWNERSHIP" },
  { tag: "02 · HANDOVER", title: "Internal Team", points: ["Runbooks", "Drills Passed"], stamp: "AUTONOMY", amber: true },
  { tag: "03 · VIGILANCE", title: "Telemetry", points: ["Drift Monitor", "SLA Retrain"], stamp: "RESILIENCE" },
];

export function LongTermThinkingGraphic() {
  return (
    <div className={sch.canvas}>
      <Tag caption>ASSET CUSTODY &amp; DRIFT MONITORING</Tag>
      <div className={cx(sch.stack, sch.trioSm)}>
        {CUSTODY_PILLARS.map((p) => (
          <div key={p.tag} className={cx(sch.panel, sch.compact, p.amber ? sch.edgeAmber : sch.edgeTeal)}>
            <Tag tone={p.amber ? "amber" : "teal"}>{p.tag}</Tag>
            <p className={sch.title}>{p.title}</p>
            <Bullets items={p.points} />
            <Tag tone={p.amber ? "amber" : "teal"} className={cx(sch.stamp, p.amber ? sch.stampAmber : sch.stampChip)}>
              {p.stamp}
            </Tag>
          </div>
        ))}
      </div>
    </div>
  );
}
