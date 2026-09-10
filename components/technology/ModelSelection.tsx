"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ModelSelection.module.css";

type ClassId = "open-weight" | "commercial" | "fine-tuned" | "ensemble";

/* ─── What actually decides the choice ───────────────────────────── */

const CRITERIA = [
  { label: "Data classification", note: "Where the data is allowed to be processed." },
  { label: "Latency budget", note: "How fast the answer has to come back." },
  { label: "Output precision", note: "How strictly the result must match a format." },
  { label: "Cost shape", note: "Whether spend is capital, per-call, or mixed." },
];

/* ─── Worked examples: a constraint, and where it lands ──────────── */

const EXAMPLES: { id: string; title: string; constraint: string; points: ClassId }[] = [
  {
    id: "deal",
    title: "Confidential deal analysis",
    constraint: "Nothing may leave the perimeter",
    points: "open-weight",
  },
  {
    id: "filing",
    title: "Regulatory filing extraction",
    constraint: "Output must match a fixed schema",
    points: "fine-tuned",
  },
  {
    id: "research",
    title: "Cross-border research synthesis",
    constraint: "Needs broad world knowledge",
    points: "commercial",
  },
  {
    id: "screening",
    title: "Transaction screening at volume",
    constraint: "High volume, tight latency budget",
    points: "ensemble",
  },
];

/* ─── The four classes ───────────────────────────────────────────── */

interface ModelClass {
  id: ClassId;
  num: string;
  name: string;
  positioning: string;
  chosenWhen: string[];
  runsOn: string;
  typical: string;
  tradeoff: string;
}

const CLASSES: ModelClass[] = [
  {
    id: "open-weight",
    num: "01",
    name: "Open-weight, self-hosted",
    positioning: "Weights you hold, running on hardware you control.",
    chosenWhen: [
      "Data cannot leave your perimeter, under any circumstance",
      "The deployment has to survive vendor deprecation and API changes",
      "Auditors need to inspect the full inference path",
    ],
    runsOn: "Bare-metal GPU or single-tenant VPC",
    typical: "Llama, Mistral, Qwen, DeepSeek",
    tradeoff: "You take on the capacity planning, the hardware and the upgrade cycle.",
  },
  {
    id: "commercial",
    name: "Commercial API, under contract",
    num: "02",
    positioning: "Frontier capability, used only where the contract permits it.",
    chosenWhen: [
      "The task genuinely needs frontier reasoning or broad world knowledge",
      "A zero-retention agreement is in place and the data classification allows it",
      "Traffic can run over private peering rather than the public internet",
    ],
    runsOn: "Private peering  Bedrock, Azure PrivateLink",
    typical: "Claude, GPT, Gemini",
    tradeoff: "You inherit someone else's roadmap, pricing and deprecation schedule.",
  },
  {
    id: "fine-tuned",
    num: "03",
    name: "Fine-tuned for the domain",
    positioning: "A smaller model taught your vocabulary and output format.",
    chosenWhen: [
      "Output has to follow an internal schema or house format every time",
      "The domain has terminology a general model reliably gets wrong",
      "The same task runs at volume and needs to stay inexpensive",
    ],
    runsOn: "Single-tenant inference cluster",
    typical: "LoRA adapters over an open-weight base",
    tradeoff: "Narrow by design  it needs retraining when the domain moves.",
  },
  {
    id: "ensemble",
    num: "04",
    name: "Routed ensemble",
    positioning: "Small models take the routine work; larger ones take the exceptions.",
    chosenWhen: [
      "Volume is high and most requests are genuinely routine",
      "High-consequence output should be checked by a second model before it ships",
      "Cost should track difficulty rather than a flat frontier rate",
    ],
    runsOn: "Mixed routed across the three above",
    typical: "Classifier, then generator, then reviewer",
    tradeoff: "More moving parts: routing rules and evaluation become their own workload.",
  },
];

/* ─── Honest comparison — qualitative, not invented numbers ──────── */

const COMPARISON: { label: string; values: Record<ClassId, string> }[] = [
  {
    label: "Where data is processed",
    values: {
      "open-weight": "Your hardware",
      commercial: "Vendor, under contract",
      "fine-tuned": "Your hardware",
      ensemble: "Mixed, by rule",
    },
  },
  {
    label: "Latency",
    values: {
      "open-weight": "Low, predictable",
      commercial: "Network-bound",
      "fine-tuned": "Lowest",
      ensemble: "Varies by route",
    },
  },
  {
    label: "Format precision",
    values: {
      "open-weight": "General purpose",
      commercial: "General purpose",
      "fine-tuned": "Highest",
      ensemble: "High, with review",
    },
  },
  {
    label: "Cost shape",
    values: {
      "open-weight": "Capital up front",
      commercial: "Per call",
      "fine-tuned": "Capital, then cheap to run",
      ensemble: "Tracks difficulty",
    },
  },
  {
    label: "Main trade-off",
    values: {
      "open-weight": "You run the infrastructure",
      commercial: "Vendor dependency",
      "fine-tuned": "Needs retraining",
      ensemble: "More to maintain",
    },
  },
];

export default function ModelSelection() {
  const [activeExample, setActiveExample] = useState<string | null>(null);

  const selected = EXAMPLES.find((e) => e.id === activeExample);
  const indicated = selected?.points ?? null;

  return (
    <section className={styles.section} id="model-selection" aria-labelledby="model-selection-heading">
      <div className="container py-16 lg:py-24 max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 text-left ">
        {/* Header */}
        <header className={styles.header}>
          <h2 id="model-selection-heading" className={styles.heading}>
            We don&apos;t have a preferred vendor.
            <br />
            <span className={styles.headingMuted}>The requirement picks the model.</span>
          </h2>
          <p className={styles.lead}>
            Every workload has constraints before it has a model: where the data is allowed to sit, how
            quickly the answer has to come back, how exactly the output has to be structured, and what it
            can cost to run. Those four things decide the architecture.
          </p>
        </header>

        {/* The four inputs to the decision */}
        <ul className={styles.criteria}>
          {CRITERIA.map((c) => (
            <li key={c.label} className={styles.criterion}>
              <span className={styles.criterionLabel}>{c.label}</span>
              <span className={styles.criterionNote}>{c.note}</span>
            </li>
          ))}
        </ul>

        {/* Worked examples — pick one, see where it lands */}
        <div className={styles.examples}>
          <p className={styles.examplesLead}>
            Four workloads we see often. Each one is decided by its constraint, not by preference.
          </p>
          <div className={styles.exampleRow}>
            {EXAMPLES.map((ex) => {
              const isActive = activeExample === ex.id;
              return (
                <button
                  key={ex.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveExample(isActive ? null : ex.id)}
                  className={`${styles.example} ${isActive ? styles.exampleActive : ""}`}
                >
                  <span className={styles.exampleTitle}>{ex.title}</span>
                  <span className={styles.exampleConstraint}>{ex.constraint}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The four classes, as an editorial index */}
        <div className={styles.index}>
          {CLASSES.map((c) => {
            const isIndicated = indicated === c.id;
            return (
              <article
                key={c.id}
                className={`${styles.entry} ${isIndicated ? styles.entryIndicated : ""}`}
              >
                <div className={styles.entryRail}>
                  <span className={styles.entryNum}>{c.num}</span>
                  {isIndicated && <span className={styles.entryFlag}>Fits this case</span>}
                </div>

                <div className={styles.entryMain}>
                  <h3 className={styles.entryName}>{c.name}</h3>
                  <p className={styles.entryPositioning}>{c.positioning}</p>

                  <p className={styles.entryLabel}>Chosen when</p>
                  <ul className={styles.entryList}>
                    {c.chosenWhen.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>

                <dl className={styles.entryMeta}>
                  <div className={styles.metaPair}>
                    <dt>Runs on</dt>
                    <dd>{c.runsOn}</dd>
                  </div>
                  <div className={styles.metaPair}>
                    <dt>Typically</dt>
                    <dd>{c.typical}</dd>
                  </div>
                  <div className={`${styles.metaPair} ${styles.metaTradeoff}`}>
                    <dt>Trade-off</dt>
                    <dd>{c.tradeoff}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>

        {/* Side-by-side, in plain language */}
        <div className={styles.compare}>
          <h3 className={styles.compareTitle}>Side by side</h3>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col" className={styles.rowHead}>
                    <span className={styles.srOnly}>Criterion</span>
                  </th>
                  {CLASSES.map((c) => (
                    <th
                      key={c.id}
                      scope="col"
                      className={indicated === c.id ? styles.colIndicated : undefined}
                    >
                      <span className={styles.colNum}>{c.num}</span>
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className={styles.rowHead}>
                      {row.label}
                    </th>
                    {CLASSES.map((c) => (
                      <td
                        key={c.id}
                        className={indicated === c.id ? styles.colIndicated : undefined}
                      >
                        {row.values[c.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className={styles.closing}>
          Most deployments end up using more than one of these.{" "}
          <Link href="/contact?topic=model-selection" className={styles.closingLink}>
            Talk through your constraints
          </Link>{" "}
          and we&apos;ll tell you which ones apply including where you don&apos;t need us.
        </p>
      </div>
    </section>
  );
}
