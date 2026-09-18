import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/university/LegalPage";
import { UNIVERSITY_CONTACT } from "@/data/university";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How CuxtonAI Academy University handles personal information, and what this website does and does not collect.",
  alternates: { canonical: "/privacy" },
};

const general = UNIVERSITY_CONTACT.offices[3];

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Privacy notice"
      title="Privacy notice"
      lead="What this website collects, what happens to anything you send us, and the rights you have over it."
      updated="18 September 2026"
      sections={[
        {
          heading: "Who this notice covers",
          body: (
            <p>
              This notice covers CuxtonAI Academy University and this website. The
              university is established by CuxtonAI Ltd, which acts as the data
              controller for information collected through the site.
            </p>
          ),
        },
        {
          heading: "What this website collects",
          body: (
            <>
              <p>
                Nothing. This site is published as static files. It runs no
                analytics, sets no cookies of its own, has no login for visitors,
                and sends no data to a third party as you browse.
              </p>
              <p>
                Typefaces are served from this site rather than fetched from an
                external font service, so loading a page does not tell anyone else
                that you visited.
              </p>
            </>
          ),
        },
        {
          heading: "The enquiry form",
          body: (
            <p>
              The form on the{" "}
              <Link href="/contact">contact page</Link> does not submit anything to
              a server. It assembles what you typed into a message and hands it to
              your own email application, which you then choose to send or discard.
              Until you send it, the university has no record of it.
            </p>
          ),
        },
        {
          heading: "When you write to us",
          body: (
            <>
              <p>
                Email you send to a university address is held by the office that
                receives it and used to answer you. Admissions correspondence is
                retained alongside your application; general correspondence is
                deleted once it has been dealt with.
              </p>
              <p>
                We do not sell correspondence, share it for marketing, or add you
                to a mailing list because you asked a question.
              </p>
            </>
          ),
        },
        {
          heading: "Applicant and student records",
          body: (
            <>
              <p>
                Information supplied in an application is used to assess it, to make
                and administer an offer, and to meet the university&apos;s statutory
                reporting duties. It is available to the staff involved in those
                decisions and no one else.
              </p>
              <p>
                Records for applicants who do not take up a place are kept only as
                long as needed to handle appeals and reapplication, then destroyed.
              </p>
            </>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <>
              <p>You may ask us to:</p>
              <ul>
                <li>tell you what personal information we hold about you;</li>
                <li>correct anything that is wrong;</li>
                <li>delete information we no longer need to keep;</li>
                <li>stop using your information for a particular purpose.</li>
              </ul>
              <p>
                Write to <a href={`mailto:${general.email}`}>{general.email}</a> and
                the request will be acknowledged and answered.
              </p>
            </>
          ),
        },
        {
          heading: "Changes to this notice",
          body: (
            <p>
              If this notice changes, the date at the top of the page changes with
              it. Material changes affecting applicants or students are notified
              directly rather than only published here.
            </p>
          ),
        },
      ]}
    />
  );
}
