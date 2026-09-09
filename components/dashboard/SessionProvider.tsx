"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

/* ═══════════════════════════════════════════════════════════════════
   Session context for the dashboard.

   The site is a static export, so there are no cookies to read on the
   server and no proxy to guard routes. Auth state is resolved in the
   browser after hydration; everything below waits on `loading` before
   deciding what to show.

   The guard here is a UX convenience, not the security boundary — Row
   Level Security on the Postgres side is. A visitor who bypasses this
   component still cannot read a draft or a contact.
   ═══════════════════════════════════════════════════════════════════ */

type SessionState = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  configured: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const SessionContext = createContext<SessionState | null>(null);

export function useSession(): SessionState {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside <SessionProvider>");
  return ctx;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  /* With no Supabase client there is no session to resolve, so the
     provider starts settled rather than clearing the flag in an effect. */
  const [loading, setLoading] = useState(isSupabaseConfigured);

  const loadProfile = useCallback(async (userId: string) => {
    const supabase = getSupabase();
    if (!supabase) return null;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    return (data as Profile | null) ?? null;
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      if (data.session?.user) {
        setProfile(await loadProfile(data.session.user.id));
      }
      if (active) setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, next) => {
      if (!active) return;
      setSession(next);
      setProfile(next?.user ? await loadProfile(next.user.id) : null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signOut = useCallback(async () => {
    await getSupabase()?.auth.signOut();
    setSession(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (session?.user) setProfile(await loadProfile(session.user.id));
  }, [session, loadProfile]);

  const value = useMemo<SessionState>(
    () => ({
      session,
      profile,
      loading,
      configured: isSupabaseConfigured,
      isAdmin: profile?.role === "admin",
      signOut,
      refreshProfile,
    }),
    [session, profile, loading, signOut, refreshProfile]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
