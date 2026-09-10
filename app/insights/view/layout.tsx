import type { Metadata } from "next";

/* The prerendered /insights/<slug> page is the canonical one; this
   fallback must not compete with it in search results. */
export const metadata: Metadata = {
  title: "Insight",
  robots: { index: false, follow: true },
};

export default function InsightViewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
