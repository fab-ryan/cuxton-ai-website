"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SubscribersConsole from "@/components/dashboard/SubscribersConsole";

/* `?insight=<id>` preselects that insight in the composer — the editor's
   "Email this insight" link lands here. `useSearchParams` requires a
   Suspense boundary under the static export. */

function Subscribers() {
  const insightId = useSearchParams().get("insight");
  return <SubscribersConsole initialInsightId={insightId} />;
}

export default function DashboardSubscribersPage() {
  return (
    <Suspense fallback={null}>
      <Subscribers />
    </Suspense>
  );
}
