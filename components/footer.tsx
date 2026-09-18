"use client";

import { useState } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import SocialIcon from "@/components/SocialIcon";
import { companyContact } from "@/data/company";
import { getSupabase } from "@/lib/supabase/client";
import styles from "./footer.module.css";

/* ═══════════════════════════════════════════════════════════════════
   CUXTON AI — Enterprise Footer Component
   • Brand & trust column with social links
   • Solutions / Industries / Company navigation
   • Lightweight executive briefings signup
   • Legal & utility bar
   ═══════════════════════════════════════════════════════════════════ */

const footerLogoCommon = { alt: "CuxtonAI — Enterprise AI", width: 148, height: 36 };
const { props: footerLogoDarkProps } = getImageProps({ ...footerLogoCommon, src: "/logo/CUXTONAI_Logo_1.png" });

type LinkItem = {
  label: string;
  href: string;
  tag?: string;
};

const solutionLinks: LinkItem[] = [
  { label: "AI Strategy & Discovery", href: "/solutions#strategy" },
  { label: "Private AI Deployment", href: "/solutions#private-ai", tag: "Core" },
  { label: "Knowledge-Grounded AI", href: "/solutions#knowledge" },
  { label: "AI Agents & Orchestration", href: "/solutions#agents", tag: "New" },
  { label: "Workflow Automation", href: "/solutions#automation" },
  { label: "Enterprise Integration", href: "/solutions#integration" },
  { label: "Custom AI Solutions", href: "/solutions#custom" },
  { label: "Real-Time Intelligence", href: "/solutions#realtime" },
  { label: "AI Training & Enablement", href: "/solutions#training" },
];

const industryLinks: LinkItem[] = [
  { label: "Financial Services", href: "/industries#finance" },
  { label: "Healthcare & Life Sciences", href: "/industries#healthcare" },
  { label: "Government & Public Sector", href: "/industries#government" },
  { label: "Education & Research", href: "/industries#education" },
  { label: "Telecommunications", href: "/industries#telecom" },
  { label: "Legal & Audit", href: "/industries#legal" },
];

const companyLinks: LinkItem[] = [
  { label: "About CuxtonAI", href: "/company" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Technology Stack", href: "/technology" },
  { label: "Operating Principles", href: "/company#principles" },
  { label: "Book Discovery Session", href: "/contact", tag: "Talk" },
  { label: "Direct Inquiries", href: "/contact" },
];

const trustBadges = [
  "SOC 2 Aligned",
  "Zero Data Retention",
  "100% IP ownership",
  "VPC / On-Premise Ready",
];

const legalLinks: LinkItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Security & Governance", href: "/privacy#security" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  /* Sign-ups go through the subscribe_to_briefings() function in
     supabase/schema.sql rather than a table insert, so the response is the
     same whether or not the address was already on the list. */
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const address = email.trim();
    if (!address) return;

    setError(null);

    const supabase = getSupabase();
    if (!supabase) {
      setError(`Briefings are not connected yet. Email ${companyContact.email} to be added.`);
      return;
    }

    setStatus("submitting");
    const { error: rpcError } = await supabase.rpc("subscribe_to_briefings", {
      p_email: address,
      p_source: "footer",
    });

    if (rpcError) {
      setStatus("idle");
      setError(
        rpcError.code === "22023"
          ? "That email address does not look right. Please check it."
          : "We could not enrol you just now. Please try again shortly."
      );
      return;
    }

    setStatus("success");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Site Footer">
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.glowTopBorder} aria-hidden="true" />

      <div className={styles.container}>
        {/* ─── 1. Executive Briefings Strip ─── */}
        <div className={styles.briefingStrip}>
          <div className={styles.briefingCopy}>
            <p className={styles.briefingEyebrow}>Executive AI Briefings</p>
            <h3 className={styles.briefingHeading}>
              One concise briefing a month, straight from our architects.
            </h3>
          </div>

          {status === "success" ? (
            <div className={styles.briefingSuccess} role="status">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>Thank you. You are enrolled in executive briefings.</span>
            </div>
          ) : (
            /* `on-dark` keeps the error's status colour legible: the footer
               stays dark even when the page is in light mode. */
            <div className={`on-dark ${styles.briefingAction}`}>
              <form onSubmit={handleSubscribe} className={styles.briefingForm} aria-label="Subscribe to Executive Briefings">
                <input
                  type="email"
                  required
                  placeholder="Enter corporate email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                  aria-label="Corporate Email Address"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "briefing-error" : undefined}
                  disabled={status === "submitting"}
                />
                <button
                  type="submit"
                  className={styles.briefingSubmit}
                  disabled={status === "submitting"}
                  aria-label="Join Briefings"
                >
                  {status === "submitting" ? "Connecting..." : "Join"}
                </button>
              </form>
              {error && (
                <p id="briefing-error" className={styles.briefingError} role="alert">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ─── 2. Main Footer Navigation Columns ─── */}
        <div className={styles.navGrid}>
          {/* Brand & Trust Column */}
          <div className={styles.brandColumn}>
            <Link href="/" aria-label="CuxtonAI Home" style={{ display: "inline-block", lineHeight: 0 }}>
              <img {...footerLogoDarkProps} alt={footerLogoCommon.alt} className="object-contain" />
            </Link>

            <p className={styles.brandTagline}>
              Enterprise AI consultancy, integration and solutions. Transforming institutional knowledge
              and critical workflows into secure, resilient, and private AI capabilities.
            </p>

            {/* Architecture Standards Chips */}
            <div className={styles.trustChips} aria-label="Architecture Standards">
              {trustBadges.map((badge) => (
                <span key={badge} className={styles.trustChip}>
                  {badge}
                </span>
              ))}
            </div>

            {/* Office & Direct Contact — from data/company.ts */}
            <address className={styles.contactBlock}>
              <a
                href={companyContact.office.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLine}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {/* Wraps only between address parts, never inside one —
                    a postcode split across lines reads as two addresses. */}
                <span>
                  {companyContact.office.lines.map((line, i, all) => (
                    <span key={line}>
                      <span className={styles.addressPart}>
                        {line}
                        {i < all.length - 1 && ","}
                      </span>
                      {i < all.length - 1 && " "}
                    </span>
                  ))}
                </span>
              </a>
              {companyContact.phone && (
                <a href={companyContact.phone.href} className={styles.contactLine}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{companyContact.phone.display}</span>
                </a>
              )}
              <a href={`mailto:${companyContact.email}`} className={styles.contactLine}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{companyContact.email}</span>
              </a>
            </address>

            {/* Social Profiles */}
            <div className={styles.socialRow} aria-label="Social and Professional Profiles">
              {companyContact.socials.map((profile) => (
                <a
                  key={profile.id}
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  title={`${profile.label} Profile`}
                  aria-label={`CuxtonAI on ${profile.label}`}
                >
                  <SocialIcon id={profile.id} />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions Column */}
          <nav aria-label="Footer Solutions Navigation">
            <h4 className={styles.colHeader}>
              <span className={styles.colHeaderDot} aria-hidden="true" />
              Solutions
            </h4>
            <ul className={styles.linkList}>
              {solutionLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.navLink}>
                    <span className={styles.linkArrow} aria-hidden="true">›</span>
                    <span>{item.label}</span>
                    {item.tag && <span className={styles.linkTag}>{item.tag}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Industries Column */}
          <nav aria-label="Footer Industries Navigation">
            <h4 className={styles.colHeader}>
              <span className={styles.colHeaderDot} aria-hidden="true" />
              Industries
            </h4>
            <ul className={styles.linkList}>
              {industryLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.navLink}>
                    <span className={styles.linkArrow} aria-hidden="true">›</span>
                    <span>{item.label}</span>
                    {item.tag && <span className={styles.linkTag}>{item.tag}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company & Governance Column */}
          <nav aria-label="Footer Company Navigation">
            <h4 className={styles.colHeader}>
              <span className={styles.colHeaderDot} aria-hidden="true" />
              Company
            </h4>
            <ul className={styles.linkList}>
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.navLink}>
                    <span className={styles.linkArrow} aria-hidden="true">›</span>
                    <span>{item.label}</span>
                    {item.tag && <span className={styles.linkTag}>{item.tag}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ─── 3. Bottom Utility Bar ─── */}
        <div className={styles.bottomDivider} aria-hidden="true" />

        <div className={styles.bottomBar}>
          <div className={styles.bottomMeta}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} CuxtonAI Ltd. All rights reserved.
            </p>
            <p className={styles.sovereigntyNote}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Engineered for data sovereignty, zero unauthorized retention, and human oversight.</span>
            </p>
          </div>

          <div className={styles.bottomActions}>
            <nav className={styles.legalLinks} aria-label="Legal and Compliance Links">
              {legalLinks.map((item) => (
                <Link key={item.label} href={item.href} className={styles.legalLink}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={scrollToTop}
              className={styles.backToTopBtn}
              aria-label="Scroll back to top of page"
            >
              <span>Back to top</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
