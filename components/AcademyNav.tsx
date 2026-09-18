"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./academyNav.module.css";

const LOGO = "/logo/cuxtonai-academy-logo.png";
const LOGO_WHITE = "/logo/cuxtonai-academy-logo-white.png";

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "Learning Paths", href: "/learning-paths" },
  { label: "AI Tutor", href: "/ai-tutor" },
  { label: "Practice", href: "/practice" },
  { label: "Resources", href: "/resources" },
];

export default function AcademyNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="CuxtonAI Academy home">
          <img
            src={scrolled || mobileMenuOpen ? LOGO : LOGO_WHITE}
            alt="CuxtonAI Academy"
            width={140}
            height={40}
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className={styles.desktopLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.active : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className={styles.ctaContainer}>
          <Link href="/login" className={styles.signIn}>
            Sign In
          </Link>
          <Link href="/courses" className={styles.startLearning}>
            Start Learning
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          ref={hamburgerRef}
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${
                  pathname === link.href ? styles.active : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className={styles.mobileCta}>
            <Link href="/login" className={styles.mobileSignIn}>
              Sign In
            </Link>
            <Link href="/courses" className={styles.mobileStartLearning}>
              Start Learning
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
