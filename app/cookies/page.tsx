import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/university/LegalPage";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "This website sets no cookies and runs no analytics. What that means in practice.",
  alternates: { canonical: "/cookies" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      label="Cookie policy"
      title="Cookie policy"
      lead="The short version: this site sets no cookies at all. The longer version explains what your browser still does on its own."
      updated="18 September 2026"
      sections={[
        {
          heading: "No cookies are set",
          body: (
            <p>
              This website does not set cookies, does not use local or session
              storage to identify you, and does not run an analytics script. There
              is no banner to dismiss because there is nothing to consent to.
            </p>
          ),
        },
        {
          heading: "What your browser still does",
          body: (
            <p>
              Your browser caches pages, images and typefaces so that the site
              loads faster next time. That cache is held on your own device, is not
              readable by us, and can be cleared from your browser settings at any
              time.
            </p>
          ),
        },
        {
          heading: "No third-party embeds",
          body: (
            <p>
              No maps, videos, chat widgets, advertising pixels or social embeds are
              loaded into these pages. Where the site points to an external service,
              such as a map of the campus address, it is a plain link that opens in
              a new tab, so nothing is loaded until you choose to follow it.
            </p>
          ),
        },
        {
          heading: "Typefaces",
          body: (
            <p>
              Fonts are downloaded at build time and served from this site. Loading
              a page does not contact an external font service.
            </p>
          ),
        },
        {
          heading: "If this changes",
          body: (
            <p>
              If the site ever needs a cookie to work, this page will say what it is
              and why, and consent will be asked for before it is set. See the{" "}
              <Link href="/privacy">privacy notice</Link> for how personal
              information is handled more generally.
            </p>
          ),
        },
      ]}
    />
  );
}
