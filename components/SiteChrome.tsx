"use client";

import { usePathname } from "next/navigation";
import UniversityNav from "./UniversityNav";
import UniversityFooter from "./university/UniversityFooter";

/* The staff console and its sign-in page carry their own chrome, so the
   university navigation and footer are suppressed there. Everything else
   on the site keeps them. */

const BARE_ROUTES = ["/login", "/dashboard"];

function isBare(pathname: string) {
  return BARE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function SiteNav() {
  return isBare(usePathname()) ? null : <UniversityNav />;
}

export function SiteFooter() {
  return isBare(usePathname()) ? null : <UniversityFooter />;
}
