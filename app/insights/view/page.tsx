"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InsightArticle from "@/components/insights/InsightArticle";

/* ═══════════════════════════════════════════════════════════════════
   Client-rendered fallback for an insight published since the last
   deploy, which therefore has no prerendered page of its own yet.
   One HTML file serves every such post.
   ═══════════════════════════════════════════════════════════════════ */

function ViewInsight() {
  const slug = useSearchParams().get("slug") ?? "";
  return <InsightArticle slug={slug} initial={null} />;
}

export default function InsightViewPage() {
  return (
    <div style={{ background: "var(--background)" }}>
      <section className="section-py">
        <div className="section-container">
          <Suspense fallback={null}>
            <ViewInsight />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
