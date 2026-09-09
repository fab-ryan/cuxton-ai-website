"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InsightEditor from "@/components/dashboard/InsightEditor";

/* The console ships inside a static export, where a dynamic segment such
   as /dashboard/insights/[id] would need every id known at build time.
   The record is addressed by query string instead, which needs no
   prerendered route. `useSearchParams` requires a Suspense boundary. */

function EditInsight() {
  const id = useSearchParams().get("id");
  return <InsightEditor insightId={id} />;
}

export default function EditInsightPage() {
  return (
    <Suspense fallback={null}>
      <EditInsight />
    </Suspense>
  );
}
