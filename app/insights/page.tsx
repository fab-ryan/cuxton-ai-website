import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InsightsIndex from "@/components/insights/InsightsIndex";
import { fetchPublishedInsights } from "@/lib/supabase/build";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical thinking on private and enterprise AI — deployment models, governance, knowledge grounding and agent design, from the CuxtonAI team.",
};

export default async function InsightsPage() {
  const insights = await fetchPublishedInsights();

  return (
    <div style={{ background: "var(--background)" }}>
      <PageHero
        breadcrumbs={[{ label: "Insights" }]}
        eyebrow="Insights"
        title="Practical thinking on"
        titleHighlight="private and enterprise AI."
        showVisual={false}
        description="Deployment models, governance, knowledge grounding and agent design — written for the people accountable for getting AI into production inside a regulated institution."
        tags={["Architecture", "Governance", "AI Agents", "AI Strategy"]}
      />

      <section className="section-py">
        <div className="section-container">
          <InsightsIndex initial={insights} />
        </div>
      </section>
    </div>
  );
}
