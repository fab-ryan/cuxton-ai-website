import Link from "next/link";
import { getImageProps } from "next/image";

const footerLogoCommon = { alt: "Cuxton AI", width: 150, height: 36 };
const { props: footerLogoLightProps } = getImageProps({ ...footerLogoCommon, src: "/full_color.png" });
const { props: footerLogoDarkProps } = getImageProps({ ...footerLogoCommon, src: "/full_color-white.png" });

const solutionLinks = [
  ["AI Strategy & Discovery", "/solutions#strategy"],
  ["Private AI Deployment", "/solutions#private-ai"],
  ["Knowledge-Grounded AI", "/solutions#knowledge"],
  ["AI Agents", "/solutions#agents"],
  ["Workflow Automation", "/solutions#automation"],
  ["Enterprise Integration", "/solutions#integration"],
  ["Custom AI Solutions", "/solutions#custom"],
  ["Real-Time Intelligence", "/solutions#realtime"],
  ["AI Training & Enablement", "/solutions#training"],
];

const industryLinks = [
  ["Financial Services", "/industries#finance"],
  ["Healthcare", "/industries#healthcare"],
  ["Government", "/industries#government"],
  ["Education & Research", "/industries#education"],
  ["Telecommunications", "/industries#telecom"],
  ["Legal & Audit", "/industries#legal"],
];

const companyLinks = [
  ["About Cuxton AI", "/company"],
  ["How We Work", "/how-we-work"],
  ["Technology", "/technology"],
  ["Contact", "/contact"],
];

const legalLinks = [
  ["Privacy Policy", "/privacy"],
  ["Terms of Use", "/terms"],
  ["Cookie Policy", "/cookies"],
];

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link {
          font-size: 0.85rem;
          color: rgba(var(--foreground-rgb),0.48);
          text-decoration: none;
          transition: color 0.2s ease;
          display: block;
        }
        .footer-link:hover { color: rgba(var(--foreground-rgb),0.9); }
        .footer-legal-link {
          font-size: 0.78rem;
          color: rgba(var(--foreground-rgb),0.3);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-legal-link:hover { color: rgba(var(--foreground-rgb),0.6); }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 3.5rem;
        }
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        }
      `}</style>

      <footer style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid rgba(27,107,138,0.12)",
        paddingTop: "4rem",
        paddingBottom: "2.5rem",
      }}>
        <div className="section-container">
          {/* Top grid */}
          <div className="footer-grid">

            {/* Brand column */}
            <div style={{ maxWidth: 320 }}>
              <picture>
                <source media="(prefers-color-scheme: light)" srcSet={footerLogoLightProps.srcSet || footerLogoLightProps.src} />
                <img {...footerLogoDarkProps} alt={footerLogoCommon.alt} className="object-contain" />
              </picture>
              <p style={{
                marginTop: "1.25rem",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(var(--foreground-rgb),0.45)",
              }}>
                Enterprise AI consultancy, integration and solutions. Helping institutions turn data,
                knowledge and workflows into secure, useful AI capabilities.
              </p>
              <Link href="/contact" className="btn-primary"
                style={{
                  marginTop: "1.5rem",
                  height: "2.75rem",
                  padding: "0 1.25rem",
                  fontSize: "0.8rem",
                  display: "inline-flex",
                }}>
                Book a Discovery Session
              </Link>
            </div>

            {/* Solutions */}
            <div>
              <p style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--cuxton-amber)",
                marginBottom: "1rem", opacity: 0.8,
              }}>Solutions</p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {solutionLinks.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="footer-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <p style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--cuxton-amber)",
                marginBottom: "1rem", opacity: 0.8,
              }}>Industries</p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {industryLinks.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="footer-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--cuxton-amber)",
                marginBottom: "1rem", opacity: 0.8,
              }}>Company</p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {companyLinks.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="footer-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="section-divider" style={{ marginBottom: "1.75rem" }} />

          {/* Bottom bar */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}>
            <p style={{ fontSize: "0.78rem", color: "rgba(var(--foreground-rgb),0.3)" }}>
              © {new Date().getFullYear()} Cuxton AI. All rights reserved.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
              {legalLinks.map(([label, href]) => (
                <Link key={label} href={href} className="footer-legal-link">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
