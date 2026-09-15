import type { ReactNode } from "react";

import SocialIcon from "@/components/SocialIcon";
import { companyContact, type SocialProfile } from "@/data/company";
import styles from "./CompanyContact.module.css";

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/* ↗ for links that leave the site, → for ones that stay on it. */
const ArrowIcon = ({ external }: { external: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {external ? <path d="M7 17L17 7M7 7h10v10" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
  </svg>
);

/* Describes each network, not what CuxtonAI posts there. */
const channelNotes: Record<SocialProfile["id"], string> = {
  linkedin: "Company page",
  x: "Posts and updates",
  github: "Repositories",
};

type Entry = {
  key: string;
  label: string;
  value: string;
  action: string;
  href: string;
  external: boolean;
  icon: ReactNode;
};

function formatCoord(value: number, positive: string, negative: string) {
  return `${Math.abs(value).toFixed(4)}° ${value >= 0 ? positive : negative}`;
}

/* The contact "directory console" on /contact: a numbered ledger of every
   way to reach CuxtonAI beside the office on Google Maps. Everything is
   read from data/company.ts, which the footer shares. Sits on the global
   .section-container so it lines up with the enquiry form above it. */
export default function CompanyContact() {
  const { office, email, phone, socials } = companyContact;

  const entries: Entry[] = [
    {
      key: "office",
      label: "Office",
      value: office.lines.join(", "),
      action: "Directions",
      href: office.mapHref,
      external: true,
      icon: <PinIcon />,
    },
    phone
      ? {
          key: "phone",
          label: "Telephone",
          value: phone.display,
          action: "Call",
          href: phone.href,
          external: false,
          icon: <PhoneIcon />,
        }
      : {
          key: "phone",
          label: "Telephone",
          value: "Request a call back",
          action: "Use the form",
          href: "#enquiry",
          external: false,
          icon: <PhoneIcon />,
        },
    {
      key: "email",
      label: "Email",
      value: email,
      action: "Write",
      href: `mailto:${email}`,
      external: false,
      icon: <MailIcon />,
    },
    ...socials.map((profile) => ({
      key: profile.id,
      label: profile.label,
      value: channelNotes[profile.id],
      action: "Follow",
      href: profile.href,
      external: true,
      icon: <SocialIcon id={profile.id} size={16} />,
    })),
  ];

  return (
    <section className={styles.contactSection} aria-labelledby="company-contact-heading">
      <div className="section-container">
        <div className={styles.sectionHeader}>
          <h2 id="company-contact-heading" className={styles.heading}>
            Find us in London, or{" "}
            <span className={styles.headingHighlight}>reach us directly.</span>
          </h2>
          <p className={styles.lead}>
            Our office is in London. Write to us, request a call, or follow our work. Every
            enquiry receives a response within two business days.
          </p>
        </div>

        <div className={styles.console}>
          <div className={styles.consoleBar}>
            <span className={styles.consoleTitle}>
              <span className={styles.consoleDot} aria-hidden="true" />
              Contact directory
            </span>
            <span className={styles.consoleCount}>
              {String(entries.length).padStart(2, "0")} channels
            </span>
          </div>

          <ol className={styles.directory}>
            {entries.map((entry, i) => (
              <li key={entry.key}>
                <a
                  href={entry.href}
                  className={styles.row}
                  {...(entry.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className={styles.rowIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.rowIcon}>{entry.icon}</span>
                  <span className={styles.rowBody}>
                    <span className={styles.rowLabel}>{entry.label}</span>
                    <span className={styles.rowValue}>{entry.value}</span>
                  </span>
                  <span className={styles.rowAction}>
                    <span className={styles.rowActionText}>{entry.action}</span>
                    <ArrowIcon external={entry.external} />
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <div className={styles.mapPane}>
            {/* Registration marks framing the map, like a surveyed plate. */}
            <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
            <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
            <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
            <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

            <div className={styles.mapFrame}>
              <iframe
                src={office.mapEmbedSrc}
                title={`Google Map of the CuxtonAI office at ${office.lines.join(", ")}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className={styles.map}
              />
            </div>

            <div className={styles.readout}>
              <span className={styles.coords}>
                <span>{formatCoord(office.geo.lat, "N", "S")}</span>
                <span>{formatCoord(office.geo.lon, "E", "W")}</span>
              </span>
              <a href={office.mapViewHref} target="_blank" rel="noopener noreferrer" className={styles.readoutLink}>
                <span>Open in Google Maps</span>
                <ArrowIcon external />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
