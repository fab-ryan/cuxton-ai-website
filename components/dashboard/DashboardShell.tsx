"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
import { useSession } from "./SessionProvider";
import s from "./dashboard.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Dashboard chrome + client-side route guard.

   Renders nothing sensitive until the session has resolved, then either
   bounces to /login, explains that the account lacks the admin role, or
   draws the console.
   ═══════════════════════════════════════════════════════════════════ */

type NavItem = {
  href: string;
  label: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

function Icon({ d }: { d: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d={d} />
    </svg>
  );
}

const NAV: NavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    title: "Overview",
    subtitle: "Editorial and enquiry activity at a glance.",
    icon: <Icon d="M3 12h5l2 6 4-14 2 8h5" />,
  },
  {
    href: "/dashboard/insights",
    label: "Insights",
    title: "Insights",
    subtitle: "Write, edit and publish articles for the public site.",
    icon: <Icon d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM14 4v6h6M8 14h8M8 17h5" />,
  },
  {
    href: "/dashboard/contacts",
    label: "Contact enquiries",
    title: "Contact enquiries",
    subtitle: "Review submissions and reply by email.",
    icon: <Icon d="M3 6h18v12H3zM3 7l9 6 9-6" />,
  },
];

/** Longest matching nav entry, so /dashboard/insights/new resolves to Insights. */
function resolveNav(pathname: string): NavItem {
  const matches = NAV.filter(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
  return matches.sort((a, b) => b.href.length - a.href.length)[0] ?? NAV[0];
}

function Centre({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.centre}>
      <div className={s.centreCard}>{children}</div>
    </div>
  );
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { session, profile, loading, configured, isAdmin, signOut } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [newCount, setNewCount] = useState<number | null>(null);

  const active = resolveNav(pathname);

  /* Bounce unauthenticated visitors once the session has actually resolved. */
  useEffect(() => {
    if (!loading && configured && !session) router.replace("/login");
  }, [loading, configured, session, router]);

  /* Unread badge on the Contacts nav item. */
  useEffect(() => {
    if (!isAdmin) return;
    const supabase = getSupabase();
    if (!supabase) return;

    let alive = true;
    supabase
      .from("contacts")
      .select("id", { count: "exact", head: true })
      .eq("status", "new")
      .then(({ count }) => {
        if (alive) setNewCount(count ?? 0);
      });

    return () => {
      alive = false;
    };
  }, [isAdmin, pathname]);

  if (!configured) {
    return (
      <Centre>
        <h1 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.75rem" }}>
          Supabase is not configured
        </h1>
        <p style={{ fontSize: "0.84rem", lineHeight: 1.7, color: "rgba(var(--foreground-rgb),0.5)" }}>
          Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code>, then restart the
          dev server. See <code>supabase/README.md</code> for the full setup.
        </p>
      </Centre>
    );
  }

  if (loading) {
    return (
      <Centre>
        <div className={s.spinner} />
        <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: "rgba(var(--foreground-rgb),0.45)" }}>
          Checking your session…
        </p>
      </Centre>
    );
  }

  if (!session) {
    return (
      <Centre>
        <div className={s.spinner} />
        <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: "rgba(var(--foreground-rgb),0.45)" }}>
          Redirecting to sign in…
        </p>
      </Centre>
    );
  }

  if (!isAdmin) {
    return (
      <Centre>
        <h1 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.75rem" }}>
          This account has no dashboard access
        </h1>
        <p
          style={{
            fontSize: "0.84rem",
            lineHeight: 1.7,
            color: "rgba(var(--foreground-rgb),0.5)",
            marginBottom: "1.75rem",
          }}
        >
          You are signed in as <strong>{session.user.email}</strong>, but the account does not carry
          the <code>admin</code> role. An existing administrator has to grant it before the console
          will open.
        </p>
        <button type="button" className="btn-secondary" onClick={signOut}>
          Sign out
        </button>
      </Centre>
    );
  }

  return (
    <div className={s.shell}>
      <aside className={s.sidebar}>
        <Link href="/" className={s.brand}>
          <span className={s.brandMark}>CX</span>
          <span className={s.brandText}>
            <span className={s.brandName}>Cuxton AI</span>
            <span className={s.brandSub}>Console</span>
          </span>
        </Link>

        <nav className={s.navGroup} aria-label="Dashboard">
          <p className={s.navLabel}>Manage</p>
          {NAV.map((item) => {
            const isActive = item.href === active.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${s.navLink} ${isActive ? s.navLinkActive : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.icon}
                {item.label}
                {item.href === "/dashboard/contacts" && !!newCount && (
                  <span className={s.navCount}>{newCount}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className={s.sidebarFoot}>
          <div className={s.who}>
            <div className={s.whoName}>{profile?.full_name || session.user.email}</div>
            <div className={s.whoRole}>{session.user.email}</div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", padding: "0 0.75rem" }}>
            <Link href="/" className={s.linkBtn} style={{ textDecoration: "none" }}>
              View site
            </Link>
            <button type="button" className={`${s.linkBtn} ${s.danger}`} onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <div className={s.main}>
        <header className={s.topbar}>
          <div>
            <h1 className={s.pageTitle}>{active.title}</h1>
            <p className={s.pageSub}>{active.subtitle}</p>
          </div>
        </header>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
}
