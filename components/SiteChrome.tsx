"use client";

import { usePathname } from "next/navigation";
import Nav from "./nav";
import Footer from "./footer";

/* ═══════════════════════════════════════════════════════════════════
   The console and the sign-in page carry their own chrome, so the
   marketing navbar and footer are suppressed there. Everything else on
   the site keeps them.
   ═══════════════════════════════════════════════════════════════════ */

const BARE_ROUTES = ["/login", "/dashboard"];

function isBare(pathname: string) {
  return BARE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function SiteNav() {
  return isBare(usePathname()) ? null : <Nav />;
}

export function SiteFooter() {
  return isBare(usePathname()) ? null : <Footer />;
}
