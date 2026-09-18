import type { Metadata } from "next";

/* Reached only from the link in a briefing email; nothing here belongs
   in search results. */
export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export default function UnsubscribeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
