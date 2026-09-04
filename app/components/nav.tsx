"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Nav data ─── */
const solutions = [
  { name: "AI Strategy & Discovery", href: "/solutions#strategy", desc: "Identify high-value AI opportunities first" },
  { name: "Private AI Deployment", href: "/solutions#private-ai", desc: "AI in controlled, approved environments" },
  { name: "Knowledge-Grounded AI", href: "/solutions#knowledge", desc: "Connect AI to authorised institutional knowledge" },
  { name: "AI Agents", href: "/solutions#agents", desc: "Task-oriented agents across approved workflows" },
  { name: "Workflow Automation", href: "/solutions#automation", desc: "Reduce repetitive manual work with AI" },
  { name: "Enterprise Integration", href: "/solutions#integration", desc: "Connect AI to existing systems safely" },
  { name: "Custom AI Solutions", href: "/solutions#custom", desc: "Specialised applications for unique needs" },
  { name: "Real-Time Intelligence", href: "/solutions#realtime", desc: "Patterns, anomalies and operational signals" },
  { name: "AI Training & Enablement", href: "/solutions#training", desc: "Prepare teams to adopt AI responsibly" },
];

const industries = [
  { name: "Financial Services", href: "/industries#finance", desc: "Banks, insurers, asset managers" },
  { name: "Healthcare", href: "/industries#healthcare", desc: "Hospitals and research organisations" },
  { name: "Government", href: "/industries#government", desc: "Ministries and public institutions" },
  { name: "Education & Research", href: "/industries#education", desc: "Universities and research bodies" },
  { name: "Telecommunications", href: "/industries#telecom", desc: "Large enterprise and data-rich operations" },
  { name: "Legal & Audit", href: "/industries#legal", desc: "Document-intensive professional services" },
];

/* ─── Icons ─── */
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12" fill="none"
    style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ─── Dot icon for menu items ─── */
const DotIcon = () => (
  <div style={{
    width: 8, height: 8, borderRadius: "50%",
    background: "var(--cuxton-teal-mid)", flexShrink: 0, marginTop: 5,
  }} />
);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"solutions" | "industries" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  /* Scroll handler */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Lock scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleMenu = (menu: "solutions" | "industries") => {
    setOpenMenu(prev => prev === menu ? null : menu);
  };

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
        className={scrolled || mobileOpen ? "nav-blur" : ""}
      >
        <div className="section-container">
          <nav style={{
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}>

            {/* Logo */}
            <Link href="/" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}>
              <Image
                src="/full_color-white.png"
                alt="Cuxton AI"
                width={140}
                height={34}
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop nav links */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              flex: 1,
              justifyContent: "center",
            }} className="hidden lg:flex">

              {/* Solutions dropdown trigger */}
              <button
                onClick={() => toggleMenu("solutions")}
                style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  padding: "0.5rem 0.875rem", borderRadius: 10,
                  background: openMenu === "solutions" ? "rgba(27,107,138,0.1)" : "transparent",
                  border: "none", cursor: "pointer", color: "inherit",
                  fontSize: "0.875rem", fontWeight: 500,
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={() => setOpenMenu("solutions")}
              >
                Solutions <ChevronIcon open={openMenu === "solutions"} />
              </button>

              {/* Industries dropdown trigger */}
              <button
                onClick={() => toggleMenu("industries")}
                style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  padding: "0.5rem 0.875rem", borderRadius: 10,
                  background: openMenu === "industries" ? "rgba(27,107,138,0.1)" : "transparent",
                  border: "none", cursor: "pointer", color: "inherit",
                  fontSize: "0.875rem", fontWeight: 500,
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={() => setOpenMenu("industries")}
              >
                Industries <ChevronIcon open={openMenu === "industries"} />
              </button>

              {[
                { label: "Technology", href: "/technology" },
                { label: "How We Work", href: "/how-we-work" },
                { label: "Company", href: "/company" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpenMenu(null)}
                  style={{
                    padding: "0.5rem 0.875rem", borderRadius: 10,
                    fontSize: "0.875rem", fontWeight: 500,
                    color: "rgba(232,237,245,0.75)",
                    textDecoration: "none",
                    transition: "color 0.2s ease, background 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = "var(--foreground)";
                    setOpenMenu(null);
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = "rgba(232,237,245,0.75)";
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
              className="hidden lg:flex">
              <Link href="/contact" className="btn-ghost" onClick={() => setOpenMenu(null)}>
                Contact
              </Link>
              <Link href="/contact" className="btn-primary" onClick={() => setOpenMenu(null)}
                style={{ height: "2.625rem", padding: "0 1.25rem", fontSize: "0.8rem" }}>
                Book a Discovery Session
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 42, height: 42, borderRadius: 10,
                background: "rgba(27,107,138,0.1)",
                border: "1px solid rgba(27,107,138,0.2)",
                cursor: "pointer", color: "inherit", flexShrink: 0,
              }}
              className="lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </nav>
        </div>

        {/* ─── Mega-menu — Solutions ─── */}
        {openMenu === "solutions" && (
          <div
            onMouseLeave={() => setOpenMenu(null)}
            style={{ position: "absolute", top: "100%", left: 0, right: 0, padding: "0.75rem 1.5rem 1.5rem" }}
            className="hidden lg:block"
          >
            <div className="mega-menu section-container" style={{ padding: "1.75rem" }}>
              <p style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--cuxton-amber)",
                marginBottom: "1rem", opacity: 0.8,
              }}>
                Solutions
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.25rem" }}>
                {solutions.map(s => (
                  <Link key={s.name} href={s.href} className="mega-menu-item"
                    onClick={() => setOpenMenu(null)}>
                    <DotIcon />
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--foreground)", lineHeight: 1.3 }}>
                        {s.name}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "rgba(232,237,245,0.45)", marginTop: "0.2rem", lineHeight: 1.4 }}>
                        {s.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{
                marginTop: "1.25rem", paddingTop: "1.25rem",
                borderTop: "1px solid rgba(27,107,138,0.12)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <p style={{ fontSize: "0.8rem", color: "rgba(232,237,245,0.4)" }}>
                  Not sure where to start?
                </p>
                <Link href="/contact" className="btn-primary"
                  onClick={() => setOpenMenu(null)}
                  style={{ height: "2.375rem", padding: "0 1.125rem", fontSize: "0.8rem" }}>
                  Book an AI Discovery Session →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ─── Mega-menu — Industries ─── */}
        {openMenu === "industries" && (
          <div
            onMouseLeave={() => setOpenMenu(null)}
            style={{ position: "absolute", top: "100%", left: 0, right: 0, padding: "0.75rem 1.5rem 1.5rem" }}
            className="hidden lg:block"
          >
            <div className="mega-menu section-container" style={{ padding: "1.75rem" }}>
              <p style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--cuxton-amber)",
                marginBottom: "1rem", opacity: 0.8,
              }}>
                Industries
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.25rem" }}>
                {industries.map(i => (
                  <Link key={i.name} href={i.href} className="mega-menu-item"
                    onClick={() => setOpenMenu(null)}>
                    <DotIcon />
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--foreground)", lineHeight: 1.3 }}>
                        {i.name}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "rgba(232,237,245,0.45)", marginTop: "0.2rem" }}>
                        {i.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ─── Mobile full-screen menu ─── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 90,
        background: "var(--bg-surface)",
        transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        overflowY: "auto",
        paddingTop: 80, paddingBottom: 40,
      }}>
        <div className="section-container" style={{ paddingTop: "1.5rem" }}>

          {/* Mobile: Solutions accordion */}
          <div style={{ marginBottom: "0.5rem" }}>
            <button
              onClick={() => setMobileExpanded(v => v === "solutions" ? null : "solutions")}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                justifyContent: "space-between", padding: "0.875rem 0",
                background: "none", border: "none", cursor: "pointer",
                color: "var(--foreground)", fontSize: "1rem", fontWeight: 600,
                borderBottom: "1px solid rgba(27,107,138,0.1)",
              }}
            >
              Solutions
              <ChevronIcon open={mobileExpanded === "solutions"} />
            </button>
            {mobileExpanded === "solutions" && (
              <div style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
                {solutions.map(s => (
                  <Link key={s.name} href={s.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block", padding: "0.625rem 0.5rem",
                      fontSize: "0.875rem", color: "rgba(232,237,245,0.7)",
                      textDecoration: "none", borderRadius: 8,
                      transition: "color 0.2s",
                    }}>
                    {s.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: Industries accordion */}
          <div style={{ marginBottom: "0.5rem" }}>
            <button
              onClick={() => setMobileExpanded(v => v === "industries" ? null : "industries")}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                justifyContent: "space-between", padding: "0.875rem 0",
                background: "none", border: "none", cursor: "pointer",
                color: "var(--foreground)", fontSize: "1rem", fontWeight: 600,
                borderBottom: "1px solid rgba(27,107,138,0.1)",
              }}
            >
              Industries
              <ChevronIcon open={mobileExpanded === "industries"} />
            </button>
            {mobileExpanded === "industries" && (
              <div style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
                {industries.map(i => (
                  <Link key={i.name} href={i.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block", padding: "0.625rem 0.5rem",
                      fontSize: "0.875rem", color: "rgba(232,237,245,0.7)",
                      textDecoration: "none",
                    }}>
                    {i.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: flat links */}
          {[
            { label: "Technology", href: "/technology" },
            { label: "How We Work", href: "/how-we-work" },
            { label: "Company", href: "/company" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <Link key={label} href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block", padding: "0.875rem 0",
                fontSize: "1rem", fontWeight: 600,
                color: "var(--foreground)", textDecoration: "none",
                borderBottom: "1px solid rgba(27,107,138,0.1)",
              }}>
              {label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <div style={{ marginTop: "2rem" }}>
            <Link href="/contact" className="btn-primary"
              onClick={() => setMobileOpen(false)}
              style={{ width: "100%", justifyContent: "center", height: "3.25rem", fontSize: "0.9rem" }}>
              Book a Discovery Session
            </Link>
          </div>
        </div>
      </div>

      {/* Nav spacer */}
      <div style={{ height: 68 }} />
    </>
  );
}
