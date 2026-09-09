import Link from "next/link";
import styles from "@/app/page.module.css";
import { fetchPublishedInsights } from "@/lib/supabase/build";
import HomeInsightsGrid from "./HomeInsightsGrid";

/* ═══════════════════════════════════════════════════════════════════
   Home page insights strip.

   Published posts are baked in at build and refreshed in the browser.
   Until anything is published the original placeholder titles stand in,
   so the section never renders empty.
   ═══════════════════════════════════════════════════════════════════ */

export const InsightsSection = async () => {
  const insights = (await fetchPublishedInsights()).slice(0, 6);

  return (
    <section className="section-py">
      <div className="section-container">
        <div className={styles.insights__header}>
          <div>
            <div className="section-label">Insights</div>
            <h2 className="section-heading">
              Practical thinking on
              <br />
              private and enterprise AI.
            </h2>
          </div>
          <Link
            href="/insights"
            className="btn-secondary"
            style={{ alignSelf: "center", whiteSpace: "nowrap" }}
          >
            All insights
          </Link>
        </div>

        <HomeInsightsGrid initial={insights} placeholders={placeholders} />
      </div>
    </section>
  );
};

/* Shown only while nothing has been published. */
const placeholders = [
  { title: "Private AI vs public AI: how to choose the right deployment model", tag: "Architecture" },
  { title: "A framework for choosing your first enterprise AI use case", tag: "AI Strategy" },
  { title: "What an AI agent can safely automate inside an institution", tag: "AI Agents" },
  { title: "Why enterprise AI needs authorised knowledge and source attribution", tag: "Grounding" },
  { title: "Building an enterprise AI governance model", tag: "Governance" },
  { title: "On-premise vs private cloud vs isolated tenancy for AI", tag: "Architecture" },
];
