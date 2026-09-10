import type { Metadata } from "next";
import InsightArticle from "@/components/insights/InsightArticle";
import { fetchPublishedInsights } from "@/lib/supabase/build";

/* ═══════════════════════════════════════════════════════════════════
   One static HTML file per published insight, baked at build time so
   each article is indexable.

   Under `output: "export"` the set of routes is fixed at build. A post
   published afterwards is linked to /insights/view instead — see
   `insightHref` — so it stays readable until the next deploy gives it
   a page of its own here.
   ═══════════════════════════════════════════════════════════════════ */

export const dynamicParams = false;

/* A static export must generate at least one route. This one is never
   linked; it exists so a build with nothing published still succeeds. */
const FALLBACK_SLUG = "not-found";

export async function generateStaticParams() {
  const insights = await fetchPublishedInsights();
  if (insights.length === 0) return [{ slug: FALLBACK_SLUG }];
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = (await fetchPublishedInsights()).find((i) => i.slug === slug);

  if (!insight) return { title: "Insight", robots: { index: false, follow: true } };

  return {
    title: insight.title,
    description: insight.excerpt,
    openGraph: {
      type: "article",
      title: insight.title,
      description: insight.excerpt,
      publishedTime: insight.published_at ?? undefined,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = (await fetchPublishedInsights()).find((i) => i.slug === slug) ?? null;

  return (
    <div style={{ background: "var(--background)" }}>
      <section className="section-py">
        <div className="section-container">
          <InsightArticle slug={slug} initial={insight} />
        </div>
      </section>
    </div>
  );
}
