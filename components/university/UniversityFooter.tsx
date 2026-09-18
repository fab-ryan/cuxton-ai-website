import Link from "next/link";
import SocialIcon from "@/components/SocialIcon";
import { companyContact } from "@/data/company";
import { UNIVERSITY_CONTACT } from "@/data/university";
import styles from "./footer.module.css";

/* Only routes that exist are linked. If a section is added to the site,
   it is added here; nothing is listed speculatively. */
const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Study",
    links: [
      { label: "All programmes", href: "/programs" },
      { label: "Admissions", href: "/admissions" },
      { label: "Fees and funding", href: "/admissions#fees" },
      { label: "Entry requirements", href: "/admissions#requirements" },
    ],
  },
  {
    title: "University",
    links: [
      { label: "About", href: "/about" },
      { label: "Research", href: "/research" },
      { label: "Faculty", href: "/faculty" },
      { label: "Campus life", href: "/campus-life" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "News and events", href: "/news" },
      { label: "Contact the university", href: "/contact" },
      { label: "Open days", href: "/news/autumn-open-day" },
      { label: "Public lectures", href: "/news/public-lecture-machine-reasoning" },
    ],
  },
];

export default function UniversityFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} on-dark`}>
      <div className="section-container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.crest}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/university/crest.svg" alt="" width={300} height={340} />
              <div>
                <p className={styles.name}>CuxtonAI Academy University</p>
                <p className={styles.parent}>Established by {companyContact.legalName}</p>
              </div>
            </div>

            <p className={styles.blurb}>
              Teaching artificial intelligence, computing, data, security and
              digital business across five schools, from undergraduate degrees to
              doctoral research.
            </p>

            <ul className={styles.contactList}>
              {UNIVERSITY_CONTACT.offices.map((office) => (
                <li key={office.email}>
                  <a href={`mailto:${office.email}`}>
                    {office.title}: {office.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className={styles.colTitle}>{column.title}</h2>
              <ul className={styles.links}>
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bar}>
          <p className={styles.copyright}>
            © {year} CuxtonAI Academy University. {companyContact.office.lines.join(", ")},{" "}
            {companyContact.office.country}.
          </p>

          <div className={styles.legal}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies">Cookies</Link>
          </div>

          <div className={styles.socials}>
            {companyContact.socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                className={styles.social}
                aria-label={social.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                <SocialIcon id={social.id} />
              </a>
            ))}
          </div>
        </div>

        <p className={styles.note}>
          This site is a demonstration build. Programmes, faculty, news and events
          shown here are illustrative placeholder content rather than a record of
          a real institution.
        </p>
      </div>
    </footer>
  );
}
