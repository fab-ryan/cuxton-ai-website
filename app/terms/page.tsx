import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/university/LegalPage";
import { UNIVERSITY_CONTACT } from "@/data/university";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The terms governing use of the CuxtonAI Academy University website, including the status of the content published on it.",
  alternates: { canonical: "/terms" },
};

const general = UNIVERSITY_CONTACT.offices[3];

export default function TermsPage() {
  return (
    <LegalPage
      label="Terms of use"
      title="Terms of use"
      lead="The terms on which this website is published, and what its content does and does not commit the university to."
      updated="18 September 2026"
      sections={[
        {
          heading: "Accepting these terms",
          body: (
            <p>
              Using this website means accepting the terms below. If you do not
              accept them, please stop using the site.
            </p>
          ),
        },
        {
          heading: "The status of this content",
          body: (
            <>
              <p>
                This site is a demonstration build. The programmes, modules,
                faculty, news items and events it describes are illustrative
                placeholder content, written to show how the site works rather than
                to record a real institution.
              </p>
              <p>
                Nothing published here is an offer of a place, a prospectus, a
                contract, or a statement of accreditation, and it should not be
                relied on as any of those things.
              </p>
            </>
          ),
        },
        {
          heading: "Accuracy",
          body: (
            <p>
              Where the site describes a process, we aim to describe it accurately,
              but content may be changed or withdrawn at any time without notice.
              Before acting on anything you read here, confirm it with the relevant
              office through the <Link href="/contact">contact page</Link>.
            </p>
          ),
        },
        {
          heading: "Acceptable use",
          body: (
            <>
              <p>You agree not to:</p>
              <ul>
                <li>use the site in a way that disrupts it or anyone else&apos;s use of it;</li>
                <li>attempt to gain access to any part of it you have not been given access to;</li>
                <li>reproduce substantial parts of it commercially without permission.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              The text, layout, illustrations and marks on this site belong to
              CuxtonAI Ltd unless stated otherwise. You may quote from it with
              attribution and link to it freely.
            </p>
          ),
        },
        {
          heading: "Links to other sites",
          body: (
            <p>
              Links to external sites are provided for convenience. The university
              does not control them and is not responsible for their content or
              their handling of your data.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              The site is provided as it stands. To the extent the law allows, the
              university is not liable for loss arising from reliance on its
              content. Nothing here limits liability that cannot lawfully be
              limited.
            </p>
          ),
        },
        {
          heading: "Questions",
          body: (
            <p>
              Questions about these terms go to{" "}
              <a href={`mailto:${general.email}`}>{general.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
