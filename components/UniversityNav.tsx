"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./universityNav.module.css";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Programmes", href: "/programs" },
  { label: "Admissions", href: "/admissions" },
  { label: "Research", href: "/research" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "Faculty", href: "/faculty" },
  { label: "News", href: "/news" },
];

export default function UniversityNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* The panel covers the viewport, so the page behind it must not
     scroll, and Escape has to close it for keyboard users. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
      aria-label="Main"
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="CuxtonAI Academy University, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.markDark} src="/logo/cuxtonai-academy-logo-white.png" alt="CuxtonAI Academy University" width={160} height={38} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.markLight} src="/logo/cuxtonai-academy-logo.png" alt="CuxtonAI Academy University" width={160} height={38} />
        </Link>

        <div className={styles.desktopLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isCurrent(link.href) ? styles.active : ""}`}
              aria-current={isCurrent(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <Link href="/contact" className={styles.signIn}>Contact</Link>
          <Link href="/admissions" className={styles.applyBtn}>Apply</Link>
        </div>

        <button
          type="button"
          className={`${styles.hamburger} ${open ? styles.open : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className={styles.mobileMenu} id="mobile-menu">
          <div className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${isCurrent(link.href) ? styles.active : ""}`}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className={styles.mobileCta}>
            <Link href="/contact" className={styles.mobileSignIn} onClick={() => setOpen(false)}>
              Contact
            </Link>
            <Link href="/admissions" className={styles.mobileApplyBtn} onClick={() => setOpen(false)}>
              Apply
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
