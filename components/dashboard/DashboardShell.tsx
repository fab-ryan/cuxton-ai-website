"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
import { useSession } from "./SessionProvider";
import ConsoleLogo from "./ConsoleLogo";
import s from "./dashboard.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Dashboard chrome + client-side route guard.

   Renders nothing sensitive until the session has resolved, then either
   bounces to /login, explains that the account lacks the admin role, or
   draws the console.

   Layout:
     ≥1024px  sticky sidebar that collapses to an icon rail ("[" toggles,
              the choice is remembered per browser)
     <1024px  top bar with a menu button; the sidebar becomes a drawer
   ═══════════════════════════════════════════════════════════════════ */

type NavItem = {
  href: string;
  label: string;
  title: string;
  subtitle: string;
  section: string;
  icon: React.ReactNode;
};

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={s.navIcon}
    >
      <path d={d} />
    </svg>
  );
}

const ICON = {
  plus: "M12 5v14M5 12h14",
  external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  collapse: "M4 4h16v16H4zM9 4v16M16 10l-2 2 2 2",
  expand: "M4 4h16v16H4zM9 4v16M14 10l2 2-2 2",
  signOut: "M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 16l-4-4 4-4M6 12h10",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  chevron: "M9 6l6 6-6 6",
};

const NAV: NavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    title: "Overview",
    subtitle: "Editorial and enquiry activity at a glance.",
    section: "Workspace",
    icon: <Icon d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" />,
  },
  {
    href: "/dashboard/insights",
    label: "Insights",
    title: "Insights",
    subtitle: "Write, edit and publish articles for the public site.",
    section: "Publishing",
    icon: <Icon d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM14 4v6h6M8 14h8M8 17h5" />,
  },
  {
    href: "/dashboard/contacts",
    label: "Contact enquiries",
    title: "Contact enquiries",
    subtitle: "Review submissions and reply by email.",
    section: "Audience",
    icon: <Icon d="M3 6h18v12H3zM3 7l9 6 9-6" />,
  },
  {
    href: "/dashboard/subscribers",
    label: "Subscribers",
    title: "Subscribers",
    subtitle: "Executive briefing sign-ups, and the emails sent to them.",
    section: "Audience",
    icon: (
      <Icon d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    ),
  },
];

/* Nav entries grouped by section, in first-seen order. */
const SECTIONS = NAV.reduce<{ label: string; items: NavItem[] }[]>((acc, item) => {
  const group = acc.find((g) => g.label === item.section);
  if (group) group.items.push(item);
  else acc.push({ label: item.section, items: [item] });
  return acc;
}, []);

/* Pages below a nav entry that deserve their own title and crumb. */
const SUBPAGES: Record<string, string> = {
  "/dashboard/insights/new": "New insight",
  "/dashboard/insights/edit": "Edit insight",
};

/** Longest matching nav entry, so /dashboard/insights/new resolves to Insights. */
function resolveNav(pathname: string): NavItem {
  const matches = NAV.filter(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
  return matches.sort((a, b) => b.href.length - a.href.length)[0] ?? NAV[0];
}

function initials(name: string): string {
  const parts = name.replace(/@.*/, "").split(/[\s._-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "CX";
}

/* ─── Rail preference, kept in localStorage ─────────────────────────
   Read through useSyncExternalStore so the server snapshot (expanded)
   and the stored value never disagree during hydration. */
const RAIL_KEY = "cx-console-rail";
const railListeners = new Set<() => void>();

function readRail(): boolean {
  try {
    return localStorage.getItem(RAIL_KEY) === "1";
  } catch {
    return false;
  }
}

function writeRail(collapsed: boolean) {
  try {
    localStorage.setItem(RAIL_KEY, collapsed ? "1" : "0");
  } catch {
    /* Private mode or blocked storage: the toggle still works for this visit. */
  }
  railListeners.forEach((notify) => notify());
}

function subscribeRail(notify: () => void) {
  railListeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    railListeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
}

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
}

function Centre({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.centre}>
      <div className={s.centreCard}>
        <div className={s.centreLogo}>
          <ConsoleLogo />
        </div>
        {children}
      </div>
    </div>
  );
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { session, profile, loading, configured, isAdmin, signOut } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [newCount, setNewCount] = useState<number | null>(null);

  /* The drawer remembers the path it was opened on, so navigating
     anywhere closes it without an effect. */
  const [drawerPath, setDrawerPath] = useState<string | null>(null);
  const drawerOpen = drawerPath === pathname;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  const collapsed = useSyncExternalStore(subscribeRail, readRail, () => false);
  const toggleRail = useCallback(() => writeRail(!readRail()), []);

  const active = resolveNav(pathname);
  const subpage = SUBPAGES[pathname.replace(/\/$/, "")];

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

  /* "[" collapses the rail, the way it does in most editors. */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "[" || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      toggleRail();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleRail]);

  /* While the drawer is open: lock page scroll, close on Escape or when
     the window widens past the drawer breakpoint, and move focus into
     it; hand focus back to the menu button after. */
  useEffect(() => {
    if (!drawerOpen) return;
    const menuButton = menuButtonRef.current;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerCloseRef.current?.focus();

    const close = () => setDrawerPath(null);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", close);
      menuButton?.focus();
    };
  }, [drawerOpen]);

  if (!configured) {
    return (
      <Centre>
        <h1 className={s.centreTitle}>Supabase is not configured</h1>
        <p className={s.centreText}>
          Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code>, then restart the
          dev server. See <code>supabase/README.md</code> for the full setup.
        </p>
      </Centre>
    );
  }

  if (loading || !session) {
    return (
      <Centre>
        <div className={s.spinner} />
        <p className={s.centreText} style={{ marginTop: "1rem", marginBottom: 0 }}>
          {loading ? "Checking your session…" : "Redirecting to sign in…"}
        </p>
      </Centre>
    );
  }

  if (!isAdmin) {
    return (
      <Centre>
        <h1 className={s.centreTitle}>This account has no dashboard access</h1>
        <p className={s.centreText}>
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

  const displayName = profile?.full_name || session.user.email || "Administrator";
  const unread = newCount ?? 0;

  return (
    <div className={`${s.shell} ${collapsed ? s.shellRail : ""}`}>
      <div
        className={`${s.scrim} ${drawerOpen ? s.scrimOpen : ""}`}
        onClick={() => setDrawerPath(null)}
        aria-hidden="true"
      />

      <aside
        id="console-sidebar"
        className={`${s.sidebar} ${drawerOpen ? s.sidebarOpen : ""}`}
        aria-label="Console"
      >
        <div className={s.sidebarHead}>
          <Link href="/dashboard" className={s.brand} aria-label="CuxtonAI Console, overview">
            <ConsoleLogo />
          </Link>
          <button
            ref={drawerCloseRef}
            type="button"
            className={`${s.iconBtn} ${s.drawerClose}`}
            onClick={() => setDrawerPath(null)}
            aria-label="Close menu"
          >
            <Icon d={ICON.close} />
          </button>
        </div>

        <div className={s.sidebarBody}>
          <Link href="/dashboard/insights/new" className={s.quickAction} data-tip="New insight">
            <Icon d={ICON.plus} />
            <span className={s.navText}>New insight</span>
          </Link>

          <nav aria-label="Dashboard">
            {SECTIONS.map((section) => (
              <div key={section.label} className={s.navSection}>
                <p className={s.navLabel}>{section.label}</p>
                {section.items.map((item) => {
                  const isActive = item.href === active.href;
                  const count = item.href === "/dashboard/contacts" ? unread : 0;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${s.navLink} ${isActive ? s.navLinkActive : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      data-tip={count ? `${item.label} (${count} new)` : item.label}
                    >
                      {item.icon}
                      <span className={s.navText}>{item.label}</span>
                      {count > 0 && (
                        <span className={s.navCount}>
                          {count}
                          <span className="sr-only"> new</span>
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        <div className={s.sidebarFoot}>
          <Link href="/" className={s.navLink} data-tip="View live site">
            <Icon d={ICON.external} />
            <span className={s.navText}>View live site</span>
          </Link>
          <button
            type="button"
            className={`${s.navLink} ${s.railToggle}`}
            onClick={toggleRail}
            data-tip="Expand sidebar  ["
          >
            <Icon d={collapsed ? ICON.expand : ICON.collapse} />
            <span className={s.navText}>{collapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
            <kbd className={s.kbd}>[</kbd>
          </button>

          <div className={s.user}>
            <span className={s.avatar} aria-hidden="true">
              {initials(displayName)}
            </span>
            <span className={s.userText}>
              <span className={s.userName}>{displayName}</span>
              <span className={s.userMail}>{session.user.email}</span>
            </span>
            <button
              type="button"
              className={`${s.iconBtn} ${s.signOut}`}
              onClick={signOut}
              aria-label="Sign out"
              data-tip="Sign out"
            >
              <Icon d={ICON.signOut} />
            </button>
          </div>
        </div>
      </aside>

      <div className={s.main}>
        <div className={s.mobileBar}>
          <button
            ref={menuButtonRef}
            type="button"
            className={s.iconBtn}
            onClick={() => setDrawerPath(pathname)}
            aria-label={unread ? `Open menu, ${unread} new enquiries` : "Open menu"}
            aria-expanded={drawerOpen}
            aria-controls="console-sidebar"
          >
            <Icon d={ICON.menu} />
            {unread > 0 && <span className={s.menuDot} />}
          </button>
          <Link href="/dashboard" className={s.mobileBrand} aria-label="CuxtonAI Console, overview">
            <ConsoleLogo />
          </Link>
          <span className={s.avatar} aria-hidden="true">
            {initials(displayName)}
          </span>
        </div>

        <header className={s.topbar}>
          <nav aria-label="Breadcrumb" className={s.crumbs}>
            <Link href="/dashboard">Console</Link>
            {active.href !== "/dashboard" && (
              <>
                <Icon d={ICON.chevron} size={12} />
                {subpage ? (
                  <Link href={active.href}>{active.label}</Link>
                ) : (
                  <span aria-current="page">{active.label}</span>
                )}
              </>
            )}
            {subpage && (
              <>
                <Icon d={ICON.chevron} size={12} />
                <span aria-current="page">{subpage}</span>
              </>
            )}
          </nav>
          <h1 className={s.pageTitle}>{subpage ?? active.title}</h1>
          <p className={s.pageSub}>{active.subtitle}</p>
        </header>

        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
}
