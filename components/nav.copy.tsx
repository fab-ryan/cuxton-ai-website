"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import s from "./nav.module.css";

/* ═══════════════════════════════════════════════════════════════
   COMMAND-CENTRE NAVBAR — CuxtonAI

   • Full-width and transparent over the hero, then detaches into a
     framed glass console panel with bracket corner ticks on scroll
   • Mono, letterspaced route labels; the active route is bracketed
   • Mega-menus as indexed, icon-led capability cards
   • Brand-gradient scroll progress rail along the bar's bottom edge
   • Full keyboard support (Escape, Tab trap, focus management)
   • Art-directed logo — colour on light, white on dark *and* over
     the hero photo, which stays dark in either theme
   ═══════════════════════════════════════════════════════════════ */

/* ─── Logo — art-directed by system colour scheme ─── */
const LOGO_ALT = "CuxtonAI — home";

/* ─── Icon wrapper — keeps every menu glyph on the same grid ─── */
function I({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ─── Nav data ─── */
const solutions = [
  {
    name: "AI Strategy & Discovery",
    href: "/solutions#strategy",
    desc: "Identify high-value AI opportunities first",
    icon: <I><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.1 5-5 2.1 2.1-5z" /></I>,
  },
  {
    name: "Private AI Deployment",
    href: "/solutions#private-ai",
    desc: "AI in controlled, approved environments",
    icon: <I><path d="M12 21s7-3.5 7-9V6l-7-3-7 3v6c0 5.5 7 9 7 9z" /><path d="M12 11v3" /></I>,
  },
  {
    name: "Knowledge-Grounded AI",
    href: "/solutions#knowledge",
    desc: "Connect AI to authorised institutional knowledge",
    icon: <I><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M20 12c0 1.7-3.6 3-8 3s-8-1.3-8-3" /></I>,
  },
  {
    name: "AI Agents",
    href: "/solutions#agents",
    desc: "Task-oriented agents across approved workflows",
    icon: <I><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></I>,
  },
  {
    name: "Workflow Automation",
    href: "/solutions#automation",
    desc: "Reduce repetitive manual work with AI",
    icon: <I><path d="M13 2 4.5 13H11l-1 9 8.5-11H12z" /></I>,
  },
  {
    name: "Enterprise Integration",
    href: "/solutions#integration",
    desc: "Connect AI to existing systems safely",
    icon: <I><path d="M9.5 14.5a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.2 1.2" /><path d="M14.5 9.5a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.2-1.2" /></I>,
  },
  {
    name: "Custom AI Solutions",
    href: "/solutions#custom",
    desc: "Specialised applications for unique needs",
    icon: <I><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" /><path d="M1 14h6M9 8h6M17 16h6" /></I>,
  },
  {
    name: "Real-Time Intelligence",
    href: "/solutions#realtime",
    desc: "Patterns, anomalies and operational signals",
    icon: <I><path d="M3 12h4l3 8 4-16 3 8h4" /></I>,
  },
  {
    name: "AI Training & Enablement",
    href: "/solutions#training",
    desc: "Prepare teams to adopt AI responsibly",
    icon: <I><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="3.5" /><path d="M19 8v6M22 11h-6" /></I>,
  },
];

const industries = [
  {
    name: "Financial Services",
    href: "/industries#finance",
    desc: "Banks, insurers, asset managers",
    icon: <I><path d="M12 2v20" /><path d="M17 6.5c0-2-2.2-3.2-5-3.2s-5 1.2-5 3.4c0 4.4 10 2.4 10 6.8 0 2.2-2.2 3.5-5 3.5s-5-1.2-5-3.2" /></I>,
  },
  {
    name: "Healthcare",
    href: "/industries#healthcare",
    desc: "Hospitals and research organisations",
    icon: <I><path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5z" /></I>,
  },
  {
    name: "Government",
    href: "/industries#government",
    desc: "Ministries and public institutions",
    icon: <I><path d="M3 21h18" /><path d="M4 21V9.5L12 4l8 5.5V21" /><path d="M9.5 21v-6h5v6" /></I>,
  },
  {
    name: "Education & Research",
    href: "/industries#education",
    desc: "Universities and research bodies",
    icon: <I><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22z" /><path d="M8 7h8M8 11h5" /></I>,
  },
  {
    name: "Telecommunications",
    href: "/industries#telecom",
    desc: "Large enterprise and data-rich operations",
    icon: <I><path d="M5 17.5a9 9 0 0 1 0-11M19 6.5a9 9 0 0 1 0 11" /><path d="M8.5 14.5a4.5 4.5 0 0 1 0-5M15.5 9.5a4.5 4.5 0 0 1 0 5" /><circle cx="12" cy="12" r="1.5" /></I>,
  },
  {
    name: "Legal & Audit",
    href: "/industries#legal",
    desc: "Document-intensive professional services",
    icon: <I><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="m9 14 2 2 4-4" /></I>,
  },
];

const flatLinks: { label: string; href: string }[] = [
  { label: "Technology", href: "/technology" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Company", href: "/company" },
];

/* ─── Focusable selector for Tab trapping ─── */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const pad = (n: number) => String(n).padStart(2, "0");

function ChevronSvg() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 4.5L6 7.5L9.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


/* Bracket ticks that frame the bar and the mega panels */
function CornerTicks() {
  return (
    <>
      <span className={`${s.tick} ${s.tickTl}`} aria-hidden="true" />
      <span className={`${s.tick} ${s.tickTr}`} aria-hidden="true" />
      <span className={`${s.tick} ${s.tickBl}`} aria-hidden="true" />
      <span className={`${s.tick} ${s.tickBr}`} aria-hidden="true" />
    </>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"solutions" | "industries" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const solutionsBtnRef = useRef<HTMLButtonElement>(null);
  const industriesBtnRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ─── Scroll: collapse state + progress rail ───
     Progress is written straight to a CSS custom property so the rail
     tracks the scrollbar without re-rendering the tree on every frame. */
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      navRef.current?.style.setProperty(
        "--nav-progress",
        max > 0 ? String(Math.min(Math.max(y / max, 0), 1)) : "0"
      );
    };
    const handler = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
      if (frame) cancelAnimationFrame(frame);
    };
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
  const handleHeaderBlur = (e: React.FocusEvent<HTMLElement>) => {
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
     home route, not yet scrolled, no opaque dropdown behind it — the
     bar's contents stay light too, regardless of theme. Once scrolled
     (or a mega-menu opens the glass backdrop) the bar sits on a
     theme-matched surface again and can follow --foreground. */
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
          <CornerTicks />

          <div className={s.navInner}>
            <nav aria-label="Primary" className={s.nav}>

              {/* ─── Brand cluster ─── */}
              <div className={s.brand}>
                <Link
                  href="/"
                  className={s.logo}
                  onClick={() => { setOpenMenu(null); setMobileOpen(false); }}
                >
                  {/* Both marks ship; CSS picks one, so switching between the
                      hero and the rest of the page never remounts the image. */}
                  <Image src="/full_color-white.png" alt={LOGO_ALT} width={140} height={34} className={s.logoOnDark} fetchPriority="high" />
                  <Image src="/full_color.png" alt={LOGO_ALT} width={140} height={34} className={s.logoOnLight} fetchPriority="high" />
                </Link>

                <span className={s.brandDivider} aria-hidden="true" />

                <span className={s.status}>
                  <span className={s.statusDot} aria-hidden="true" />
                  Private AI
                </span>
              </div>

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
                  <span className={s.navUnderline} aria-hidden="true" />
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
                  <span className={s.navUnderline} aria-hidden="true" />
                </button>

                {/* Flat links */}
                {flatLinks.map(({ label, href }) => (
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
                    <span className={s.navUnderline} aria-hidden="true" />
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
                    <div className={s.megaPanel}>
                      <CornerTicks />

                      <div className={s.megaHead}>
                        <span className={s.megaLabel}>Solutions</span>
                        <span className={s.megaMeta}>{pad(solutions.length)} capabilities</span>
                      </div>

                      <div className={s.megaSolutions}>
                        <div className={s.megaGrid}>
                          {solutions.map((item, i) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={s.megaItem}
                              onClick={() => setOpenMenu(null)}
                            >
                              <span className={s.megaItemIcon}>{item.icon}</span>
                              <span className={s.megaItemText}>
                                <span className={s.megaItemTop}>
                                  <span className={s.megaItemIndex}>{pad(i + 1)}</span>
                                  <span className={s.megaItemTitle}>{item.name}</span>
                                </span>
                                <span className={s.megaItemDesc}>{item.desc}</span>
                              </span>
                            </Link>
                          ))}
                        </div>

                        {/* Featured console card */}
                        <div className={s.megaFeatured}>
                          <div>
                            <span className={s.megaFeaturedLabel}>
                              <span className={s.statusDot} aria-hidden="true" />
                              Get started
                            </span>
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
                            className={`${s.navCta} ${s["navCta--block"]}`}
                            onClick={() => setOpenMenu(null)}
                          >
                            Book a session
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
                    <div className={s.megaPanel}>
                      <CornerTicks />

                      <div className={s.megaHead}>
                        <span className={s.megaLabel}>Industries</span>
                        <span className={s.megaMeta}>{pad(industries.length)} sectors</span>
                      </div>

                      <div className={s.megaGrid}>
                        {industries.map((item, i) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={s.megaItem}
                            onClick={() => setOpenMenu(null)}
                          >
                            <span className={s.megaItemIcon}>{item.icon}</span>
                            <span className={s.megaItemText}>
                              <span className={s.megaItemTop}>
                                <span className={s.megaItemIndex}>{pad(i + 1)}</span>
                                <span className={s.megaItemTitle}>{item.name}</span>
                              </span>
                              <span className={s.megaItemDesc}>{item.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>

                      <div className={s.megaFooter}>
                        <span className={s.megaFooterText}>
                          <span className={s.statusDot} aria-hidden="true" />
                          Any data-sensitive institution
                        </span>
                        <Link
                          href="/industries"
                          className={s.megaFooterLink}
                          onClick={() => setOpenMenu(null)}
                        >
                          All industries
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Desktop CTA ─── */}
              <div className={s.desktopCtas}>
                <Link
                  href="/contact"
                  className={s.navCta}
                  onClick={() => setOpenMenu(null)}
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
                <span className={s.hamburgerBars}>
                  <span className={s.hamburgerBar} />
                  <span className={s.hamburgerBar} />
                  <span className={s.hamburgerBar} />
                </span>
              </button>

            </nav>
          </div>

          {/* ─── Scroll progress rail ─── */}
          <span className={s.progressTrack} aria-hidden="true">
            <span className={s.progressBar} />
          </span>
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
        <nav aria-label="Mobile" className={s.mobileNav}>

          <div className={s.mobileMeta}>
            <span>Navigation</span>
            <span className={s.mobileMetaStatus}>
              <span className={s.statusDot} aria-hidden="true" />
              Private AI
            </span>
          </div>

          {/* Solutions accordion */}
          <div className={s.mobileItem}>
            <button
              type="button"
              id="mobile-solutions-trigger"
              aria-expanded={mobileExpanded === "solutions"}
              aria-controls="mobile-solutions-panel"
              onClick={() => setMobileExpanded(v => v === "solutions" ? null : "solutions")}
              className={s.mobileRow}
            >
              <span className={s.mobileIndex}>01</span>
              <span className={s.mobileRowLabel}>Solutions</span>
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
                      <span className={s.mobileSubIcon}>{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Industries accordion */}
          <div className={s.mobileItem}>
            <button
              type="button"
              id="mobile-industries-trigger"
              aria-expanded={mobileExpanded === "industries"}
              aria-controls="mobile-industries-panel"
              onClick={() => setMobileExpanded(v => v === "industries" ? null : "industries")}
              className={s.mobileRow}
            >
              <span className={s.mobileIndex}>02</span>
              <span className={s.mobileRowLabel}>Industries</span>
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
                      <span className={s.mobileSubIcon}>{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Flat links */}
          {flatLinks.map(({ label, href }, i) => (
            <div key={label} className={s.mobileItem}>
              <Link
                href={href}
                aria-current={isCurrent(href) ? "page" : undefined}
                onClick={closeMobile}
                className={`${s.mobileRow} ${isCurrent(href) ? s["mobileRow--active"] : ""}`}
              >
                <span className={s.mobileIndex}>{pad(i + 3)}</span>
                <span className={s.mobileRowLabel}>{label}</span>
              </Link>
            </div>
          ))}

          {/* Mobile CTA */}
          <div className={s.mobileCta}>
            <Link
              href="/contact"
              className={`${s.navCta} ${s["navCta--block"]}`}
              onClick={closeMobile}
            >
              Book a Discovery Session
            </Link>
          </div>

          <p className={s.mobileFoot}>
            <span className={s.statusDot} aria-hidden="true" />
            Your data, Your perimeter
          </p>

        </nav>
      </div>

      {/* Nav spacer */}
      <div className={s.spacer} />
    </>
  );
}
