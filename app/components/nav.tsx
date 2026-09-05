"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import { usePathname } from "next/navigation";

/* Logo — art-directed by system color scheme. The browser fetches only the
   matching <source>, unlike a CSS-toggled pair of <Image>s which both load. */
const logoCommon = { alt: "Cuxton AI — home", width: 140, height: 34 };
const { props: logoLightProps } = getImageProps({ ...logoCommon, src: "/full_color.png" });
const { props: logoDarkProps } = getImageProps({ ...logoCommon, src: "/full_color-white.png" });

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

const flatLinks = [
  { label: "Technology", href: "/technology" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Company", href: "/company" },
];

/* ─── Icons (decorative — meaning is carried by adjacent text/labels) ─── */
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
    style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ─── Dot icon for menu items ─── */
const DotIcon = () => (
  <div aria-hidden="true" style={{
    width: 8, height: 8, borderRadius: "50%",
    background: "var(--cuxton-teal-mid)", flexShrink: 0, marginTop: 5,
  }} />
);

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"solutions" | "industries" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const solutionsBtnRef = useRef<HTMLButtonElement>(null);
  const industriesBtnRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

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

  /* Escape closes whichever menu is open and returns focus to its trigger */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      } else if (openMenu) {
        const ref = openMenu === "solutions" ? solutionsBtnRef : industriesBtnRef;
        setOpenMenu(null);
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen, openMenu]);

  /* Lock scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Move focus into the mobile panel when it opens; trap Tab while open */
  useEffect(() => {
    if (!mobileOpen) return;
    const panel = mobilePanelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    first?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  const toggleMenu = (menu: "solutions" | "industries") => {
    setOpenMenu(prev => prev === menu ? null : menu);
  };

  /* Close the open dropdown once keyboard focus leaves the header entirely */
  const handleHeaderBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setOpenMenu(null);
    }
  };

  const isCurrent = (href: string) => pathname === href;

  /* The homepage hero is a fixed-dark photo regardless of site theme (see
     app/page.module.css), so while the nav is transparent over it, its
     content needs fixed light colors instead of the usual theme tokens —
     which are correct everywhere else, including once scrolled (nav-blur
     picks up its own theme-matched background). */
  const overPhoto = pathname === "/" && !scrolled && !mobileOpen;
  const navTextColor = overPhoto ? "#eef2f7" : undefined;
  const flatLinkColor = (href: string) =>
    overPhoto
      ? "rgba(238,242,247,0.9)"
      : isCurrent(href) ? "var(--foreground)" : "rgba(var(--foreground-rgb),0.75)";

  const closeMobile = () => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        ref={navRef}
        onBlur={handleHeaderBlur}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
        className={scrolled || mobileOpen ? "nav-blur" : ""}
      >
        <div className="section-container">
          <nav aria-label="Primary" style={{
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}>

            {/* Logo — art-directed by system color scheme, except over the
                always-dark homepage hero photo, where the white mark always wins */}
            <Link href="/" onClick={() => { setOpenMenu(null); setMobileOpen(false); }}>
              {overPhoto ? (
                <picture>
                  <img {...logoDarkProps} alt={logoCommon.alt} className="object-contain" fetchPriority="high" />
                </picture>
              ) : (
                <picture>
                  {/* images.unoptimized means getImageProps never produces a srcSet — a bare src is a valid 1x srcset entry */}
                  <source media="(prefers-color-scheme: light)" srcSet={logoLightProps.srcSet || logoLightProps.src} />
                  <img {...logoDarkProps} alt={logoCommon.alt} className="object-contain" fetchPriority="high" />
                </picture>
              )}
            </Link>

            {/* Desktop nav links */}
            <div style={{
              alignItems: "center",
              gap: "0.25rem",
              flex: 1,
              justifyContent: "center",
            }} className="hidden lg:flex">

              {/* Solutions dropdown trigger */}
              <button
                ref={solutionsBtnRef}
                id="solutions-trigger"
                type="button"
                aria-expanded={openMenu === "solutions"}
                aria-haspopup="true"
                aria-controls="solutions-menu"
                onClick={() => toggleMenu("solutions")}
                style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  padding: "0.5rem 0.875rem", borderRadius: 10,
                  background: openMenu === "solutions" ? "rgba(27,107,138,0.1)" : "transparent",
                  border: "none", cursor: "pointer", color: navTextColor ?? "inherit",
                  fontSize: "0.875rem", fontWeight: 500,
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={() => setOpenMenu("solutions")}
              >
                Solutions <ChevronIcon open={openMenu === "solutions"} />
              </button>

              {/* Industries dropdown trigger */}
              <button
                ref={industriesBtnRef}
                id="industries-trigger"
                type="button"
                aria-expanded={openMenu === "industries"}
                aria-haspopup="true"
                aria-controls="industries-menu"
                onClick={() => toggleMenu("industries")}
                style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  padding: "0.5rem 0.875rem", borderRadius: 10,
                  background: openMenu === "industries" ? "rgba(27,107,138,0.1)" : "transparent",
                  border: "none", cursor: "pointer", color: navTextColor ?? "inherit",
                  fontSize: "0.875rem", fontWeight: 500,
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={() => setOpenMenu("industries")}
              >
                Industries <ChevronIcon open={openMenu === "industries"} />
              </button>

              {flatLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-current={isCurrent(href) ? "page" : undefined}
                  onClick={() => setOpenMenu(null)}
                  style={{
                    padding: "0.5rem 0.875rem", borderRadius: 10,
                    fontSize: "0.875rem", fontWeight: 500,
                    color: flatLinkColor(href),
                    textDecoration: "none",
                    transition: "color 0.2s ease, background 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = overPhoto ? "#eef2f7" : "var(--foreground)";
                    setOpenMenu(null);
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = flatLinkColor(href);
                  }}
                >
                  {label}
                </Link>
              ))}

              {/* ─── Mega-menu — Solutions (kept adjacent to its trigger in tab order) ─── */}
              {openMenu === "solutions" && (
                <div
                  id="solutions-menu"
                  role="region"
                  aria-label="Solutions"
                  onMouseLeave={() => setOpenMenu(null)}
                  style={{ position: "absolute", top: "100%", left: 0, right: 0, padding: "0.75rem 1.5rem 1.5rem" }}
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
                            <p style={{ fontSize: "0.75rem", color: "rgba(var(--foreground-rgb),0.65)", marginTop: "0.2rem", lineHeight: 1.4 }}>
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
                      <p style={{ fontSize: "0.8rem", color: "rgba(var(--foreground-rgb),0.6)" }}>
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
                  id="industries-menu"
                  role="region"
                  aria-label="Industries"
                  onMouseLeave={() => setOpenMenu(null)}
                  style={{ position: "absolute", top: "100%", left: 0, right: 0, padding: "0.75rem 1.5rem 1.5rem" }}
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
                            <p style={{ fontSize: "0.75rem", color: "rgba(var(--foreground-rgb),0.65)", marginTop: "0.2rem" }}>
                              {i.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop CTAs */}
            <div style={{ alignItems: "center", gap: "0.75rem" }}
              className="hidden lg:flex">
              <Link href="/contact" className="btn-ghost"
                aria-current={isCurrent("/contact") ? "page" : undefined}
                onClick={() => setOpenMenu(null)}
                style={{ color: overPhoto ? "rgba(238,242,247,0.85)" : undefined }}>
                Contact
              </Link>
              <Link href="/contact" className="btn-primary" onClick={() => setOpenMenu(null)}
                style={{ height: "2.625rem", padding: "0 1.25rem", fontSize: "0.8rem" }}>
                Book a Discovery Session
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMobileOpen(v => !v)}
              style={{
                alignItems: "center", justifyContent: "center",
                width: 42, height: 42, borderRadius: 10,
                background: "rgba(27,107,138,0.1)",
                border: "1px solid rgba(27,107,138,0.2)",
                cursor: "pointer", color: navTextColor ?? "inherit", flexShrink: 0,
              }}
              className="flex lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </nav>
        </div>
      </header>

      {/* ─── Mobile full-screen menu ─── */}
      <div
        id="mobile-menu"
        ref={mobilePanelRef}
        role="dialog"
        aria-modal={mobileOpen}
        aria-label="Mobile navigation menu"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        style={{
          position: "fixed", inset: 0, zIndex: 90,
          background: "var(--bg-surface)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          overflowY: "auto",
          paddingTop: 80, paddingBottom: 40,
        }}
      >
        <nav aria-label="Mobile" className="section-container" style={{ paddingTop: "1.5rem" }}>

          {/* Mobile: Solutions accordion */}
          <div style={{ marginBottom: "0.5rem" }}>
            <button
              type="button"
              id="mobile-solutions-trigger"
              aria-expanded={mobileExpanded === "solutions"}
              aria-controls="mobile-solutions-panel"
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
              <div id="mobile-solutions-panel" style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
                {solutions.map(s => (
                  <Link key={s.name} href={s.href}
                    onClick={closeMobile}
                    style={{
                      display: "block", padding: "0.625rem 0.5rem",
                      fontSize: "0.875rem", color: "rgba(var(--foreground-rgb),0.7)",
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
              type="button"
              id="mobile-industries-trigger"
              aria-expanded={mobileExpanded === "industries"}
              aria-controls="mobile-industries-panel"
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
              <div id="mobile-industries-panel" style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
                {industries.map(i => (
                  <Link key={i.name} href={i.href}
                    onClick={closeMobile}
                    style={{
                      display: "block", padding: "0.625rem 0.5rem",
                      fontSize: "0.875rem", color: "rgba(var(--foreground-rgb),0.7)",
                      textDecoration: "none",
                    }}>
                    {i.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: flat links */}
          {[...flatLinks, { label: "Contact", href: "/contact" }].map(({ label, href }) => (
            <Link key={label} href={href}
              aria-current={isCurrent(href) ? "page" : undefined}
              onClick={closeMobile}
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
              onClick={closeMobile}
              style={{ width: "100%", justifyContent: "center", height: "3.25rem", fontSize: "0.9rem" }}>
              Book a Discovery Session
            </Link>
          </div>
        </nav>
      </div>

      {/* Nav spacer */}
      <div style={{ height: 68 }} />
    </>
  );
}
