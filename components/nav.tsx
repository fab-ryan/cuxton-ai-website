"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import { usePathname } from "next/navigation";
import s from "./nav.module.css";

/* ═══════════════════════════════════════════════════════════════
   PREMIUM ENTERPRISE NAVBAR — Cuxton AI
   
   Features:
   • Progressive frosted-glass blur on scroll
   • Animated mega-menu dropdowns (fade + slide, mouse-leave delay)
   • Active-page amber underline indicator with glow
   • Animated hamburger ≡ → × morph
   • Staggered mobile menu entrance animations
   • Full keyboard accessibility (Escape, Tab trap, focus management)
   • Art-directed logo (light/dark system preference)
   • Solutions mega-menu with featured CTA sidebar
   • Reduced-motion support
   ═══════════════════════════════════════════════════════════════ */

/* ─── Logo — art-directed by system color scheme ─── */
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

const flatLinks: { label: string; href: string }[] = [
  // { label: "Technology", href: "/technology" },
  // { label: "How We Work", href: "/how-we-work" },
  // { label: "Company", href: "/company" },
];

/* ─── Focusable selector for Tab trapping ─── */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* ─── Chevron icon ─── */
function ChevronSvg() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 4.5L6 7.5L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Small arrow for mobile links ─── */
function ArrowSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}


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
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ─── Scroll listener ─── */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler(); // set initial state
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* ─── Close dropdown on outside click ─── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ─── Escape key handler ─── */
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

  /* ─── Scroll lock when mobile menu is open ─── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ─── Focus trap for mobile menu ─── */
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

  /* ─── Mouse-leave delay for mega-menu ─── */
  const handleMegaMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 180);
  }, []);

  const handleMegaMouseEnter = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const toggleMenu = (menu: "solutions" | "industries") => {
    setOpenMenu(prev => prev === menu ? null : menu);
  };

  /* Close on blur outside header */
  const handleHeaderBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setOpenMenu(null);
    }
  };

  const isCurrent = (href: string) => pathname === href;
  const isSection = (prefix: string) => pathname.startsWith(prefix);

  const closeMobile = () => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  };

  /* ─── Header class composition ───
     The homepage hero is a fixed dark photo that never follows the
     light/dark theme (its own copy uses hardcoded light colours for
     the same reason). While the nav is still transparent over it —
     home route, not yet scrolled, no opaque dropdown behind it — nav
     links need to stay light too, regardless of theme. Once scrolled
     (or a mega-menu opens the glass backdrop) the bar sits on a
     theme-matched surface again and links can follow --foreground. */
  const onHero = pathname === "/" && !scrolled && !openMenu;
  const headerClass = [
    s.header,
    scrolled ? s["header--scrolled"] : "",
    openMenu ? s["header--menuOpen"] : "",
    onHero ? s["header--onHero"] : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        ref={navRef}
        onBlur={handleHeaderBlur}
        className={headerClass}
      >
        <div className={s.headerInner}>
          <div className="section-container">
            <nav aria-label="Primary" className={s.nav}>

              {/* ─── Logo ─── */}
              <Link
                href="/"
                className={s.logo}
                onClick={() => { setOpenMenu(null); setMobileOpen(false); }}
              >
                <picture>
                  <source media="(prefers-color-scheme: light)" srcSet={logoLightProps.srcSet || logoLightProps.src} />
                  <img {...logoDarkProps} alt={logoCommon.alt} className="object-contain" fetchPriority="high" />
                </picture>
              </Link>

              {/* ─── Desktop nav links ─── */}
              <div className={s.desktopLinks}>

                {/* Solutions trigger */}
                <button
                  ref={solutionsBtnRef}
                  id="solutions-trigger"
                  type="button"
                  aria-expanded={openMenu === "solutions"}
                  aria-haspopup="true"
                  aria-controls="solutions-menu"
                  onClick={() => toggleMenu("solutions")}
                  onMouseEnter={() => {
                    handleMegaMouseEnter();
                    setOpenMenu("solutions");
                  }}
                  className={[
                    s.navLink,
                    openMenu === "solutions" ? s["navLink--open"] : "",
                    isSection("/solutions") ? s["navLink--active"] : "",
                  ].filter(Boolean).join(" ")}
                >
                  Solutions
                  <span className={`${s.chevron} ${openMenu === "solutions" ? s["chevron--open"] : ""}`}>
                    <ChevronSvg />
                  </span>
                </button>

                {/* Industries trigger */}
                <button
                  ref={industriesBtnRef}
                  id="industries-trigger"
                  type="button"
                  aria-expanded={openMenu === "industries"}
                  aria-haspopup="true"
                  aria-controls="industries-menu"
                  onClick={() => toggleMenu("industries")}
                  onMouseEnter={() => {
                    handleMegaMouseEnter();
                    setOpenMenu("industries");
                  }}
                  className={[
                    s.navLink,
                    openMenu === "industries" ? s["navLink--open"] : "",
                    isSection("/industries") ? s["navLink--active"] : "",
                  ].filter(Boolean).join(" ")}
                >
                  Industries
                  <span className={`${s.chevron} ${openMenu === "industries" ? s["chevron--open"] : ""}`}>
                    <ChevronSvg />
                  </span>
                </button>

                {/* Flat links */}
                {flatLinks  && flatLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-current={isCurrent(href) ? "page" : undefined}
                    onClick={() => setOpenMenu(null)}
                    onMouseEnter={() => setOpenMenu(null)}
                    className={[
                      s.navLink,
                      isCurrent(href) ? s["navLink--active"] : "",
                    ].filter(Boolean).join(" ")}
                  >
                    {label}
                  </Link>
                ))}

                {/* ─── MEGA-MENU: Solutions ─── */}
                {openMenu === "solutions" && (
                  <div
                    id="solutions-menu"
                    role="region"
                    aria-label="Solutions"
                    className={s.megaWrap}
                    onMouseLeave={handleMegaMouseLeave}
                    onMouseEnter={handleMegaMouseEnter}
                  >
                    <div className={`${s.megaPanel} section-container`}>
                      <div className={s.megaSolutions}>
                        {/* Left: items grid */}
                        <div>
                          <p className={s.megaLabel}>Solutions</p>
                          <div className={s.megaGrid}>
                            {solutions.map(item => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={s.megaItem}
                                onClick={() => setOpenMenu(null)}
                              >
                                <div className={s.megaItemDot} aria-hidden="true" />
                                <div>
                                  <p className={s.megaItemTitle}>{item.name}</p>
                                  <p className={s.megaItemDesc}>{item.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Right: featured sidebar */}
                        <div className={s.megaFeatured}>
                          <div>
                            <p className={s.megaFeaturedLabel}>Get Started</p>
                            <p className={s.megaFeaturedTitle}>
                              Not sure which solution fits your challenge?
                            </p>
                            <p className={s.megaFeaturedBody}>
                              Start with a focused discovery conversation. We&apos;ll help you identify
                              the highest-value AI opportunity.
                            </p>
                          </div>
                          <Link
                            href="/contact"
                            className="btn-primary"
                            onClick={() => setOpenMenu(null)}
                            style={{ fontSize: "0.8rem", height: "2.5rem", justifyContent: "center" }}
                          >
                            Book an AI Discovery Session →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── MEGA-MENU: Industries ─── */}
                {openMenu === "industries" && (
                  <div
                    id="industries-menu"
                    role="region"
                    aria-label="Industries"
                    className={s.megaWrap}
                    onMouseLeave={handleMegaMouseLeave}
                    onMouseEnter={handleMegaMouseEnter}
                  >
                    <div className={`${s.megaPanel} section-container`}>
                      <p className={s.megaLabel}>Industries</p>
                      <div className={`${s.megaGrid} ${s["megaGrid--industries"]}`}>
                        {industries.map(item => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={s.megaItem}
                            onClick={() => setOpenMenu(null)}
                          >
                            <div className={s.megaItemDot} aria-hidden="true" />
                            <div>
                              <p className={s.megaItemTitle}>{item.name}</p>
                              <p className={s.megaItemDesc}>{item.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className={s.megaFooter}>
                        <p className={s.megaFooterText}>
                          We work with any data-sensitive institution.
                        </p>
                        <Link
                          href="/industries"
                          className="btn-secondary"
                          onClick={() => setOpenMenu(null)}
                          style={{ height: "2.375rem", padding: "0 1.125rem", fontSize: "0.8rem" }}
                        >
                          All industries
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Desktop CTAs ─── */}
              <div className={s.desktopCtas}>

                <Link
                  href="/contact"
                  className={`btn-primary ${s.ctaGlow}`}
                  onClick={() => setOpenMenu(null)}
                  style={{ height: "2.625rem", padding: "0 1.25rem", fontSize: "0.8rem" }}
                >
                  Book a Discovery Session
                </Link>
              </div>

              {/* ─── Hamburger ─── */}
              <button
                ref={hamburgerRef}
                type="button"
                onClick={() => setMobileOpen(v => !v)}
                className={`${s.hamburger} ${mobileOpen ? s["hamburger--open"] : ""}`}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <div className={s.hamburgerBars}>
                  <span className={s.hamburgerBar} />
                  <span className={s.hamburgerBar} />
                  <span className={s.hamburgerBar} />
                </div>
              </button>

            </nav>
          </div>
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
        className={`${s.mobileOverlay} ${mobileOpen ? s["mobileOverlay--open"] : ""}`}
      >
        <nav aria-label="Mobile" className={`section-container ${s.mobileNav}`}>

          {/* Mobile: Solutions accordion */}
          <div className={s.mobileItem}>
            <button
              type="button"
              id="mobile-solutions-trigger"
              aria-expanded={mobileExpanded === "solutions"}
              aria-controls="mobile-solutions-panel"
              onClick={() => setMobileExpanded(v => v === "solutions" ? null : "solutions")}
              className={s.mobileAccordion}
            >
              Solutions
              <span className={`${s.chevron} ${mobileExpanded === "solutions" ? s["chevron--open"] : ""}`}>
                <ChevronSvg />
              </span>
            </button>
            {mobileExpanded === "solutions" && (
              <div id="mobile-solutions-panel" className={s.mobilePanel}>
                <div className={s.mobilePanelInner}>
                  {solutions.map(item => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobile}
                      className={s.mobileSubLink}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile: Industries accordion */}
          <div className={s.mobileItem}>
            <button
              type="button"
              id="mobile-industries-trigger"
              aria-expanded={mobileExpanded === "industries"}
              aria-controls="mobile-industries-panel"
              onClick={() => setMobileExpanded(v => v === "industries" ? null : "industries")}
              className={s.mobileAccordion}
            >
              Industries
              <span className={`${s.chevron} ${mobileExpanded === "industries" ? s["chevron--open"] : ""}`}>
                <ChevronSvg />
              </span>
            </button>
            {mobileExpanded === "industries" && (
              <div id="mobile-industries-panel" className={s.mobilePanel}>
                <div className={s.mobilePanelInner}>
                  {industries.map(item => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobile}
                      className={s.mobileSubLink}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile: flat links */}
          {[...flatLinks].map(({ label, href }) => (
            <div key={label} className={s.mobileItem}>
              <Link
                href={href}
                aria-current={isCurrent(href) ? "page" : undefined}
                onClick={closeMobile}
                className={`${s.mobileLink} ${isCurrent(href) ? s["mobileLink--active"] : ""}`}
              >
                {label}
                <span className={s.mobileLinkArrow}>
                  <ArrowSvg />
                </span>
              </Link>
            </div>
          ))}

          {/* Mobile CTA */}
          <div className={s.mobileCta}>
            <Link
              href="/contact"
              className="btn-primary"
              onClick={closeMobile}
              style={{ width: "100%", justifyContent: "center", height: "3.25rem", fontSize: "0.9rem" }}
            >
              Book a Discovery Session
            </Link>
          </div>

        </nav>
      </div>

      {/* Nav spacer */}
      <div className={s.spacer} />
    </>
  );
}
