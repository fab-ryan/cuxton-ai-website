"use client";

import { useState } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import styles from "./footer.module.css";

/* ═══════════════════════════════════════════════════════════════════
   CUXTON AI — Enterprise Footer Component
   • Brand & trust column with social links
   • Solutions / Industries / Company navigation
   • Lightweight executive briefings signup
   • Legal & utility bar
   ═══════════════════════════════════════════════════════════════════ */

const footerLogoCommon = { alt: "CuxtonAI — Enterprise AI", width: 148, height: 36 };
const { props: footerLogoDarkProps } = getImageProps({ ...footerLogoCommon, src: "/full_color-white.png" });

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 600);
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
            <form onSubmit={handleSubscribe} className={styles.briefingForm} aria-label="Subscribe to Executive Briefings">
              <input
                type="email"
                required
                placeholder="Enter corporate email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
                aria-label="Corporate Email Address"
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

            {/* Social & Contact Buttons */}
            <div className={styles.socialRow} aria-label="Social and Professional Profiles">
              {/* Direct Mail */}
              <a
                href="mailto:hello@cuxtonai.com"
                className={styles.socialBtn}
                title="Email CuxtonAI"
                aria-label="Email CuxtonAI"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="LinkedIn Profile"
                aria-label="CuxtonAI on LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="X Profile"
                aria-label="CuxtonAI on X"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title="GitHub Profile"
                aria-label="CuxtonAI on GitHub"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
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
