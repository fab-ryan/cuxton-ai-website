"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import s from "./dashboard.module.css";

/* ═══════════════════════════════════════════════════════════════════
   Console sign in.

   Accounts are created by an administrator in Supabase — there is no
   public registration, so an unrecognised address simply fails here.
   ═══════════════════════════════════════════════════════════════════ */

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  /* Nothing to check when Supabase is absent — start settled rather than
     clearing the flag synchronously inside the effect below. */
  const [checking, setChecking] = useState(isSupabaseConfigured);

  /* Someone already signed in should not see the form at all. */
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      if (data.session) router.replace("/dashboard");
      else setChecking(false);
    });
    return () => {
      alive = false;
    };
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const supabase = getSupabase();
    if (!supabase) {
      setError("Supabase is not configured. Add the environment variables and restart.");
      return;
    }

    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      /* Deliberately vague: never confirm whether an address exists. */
      setError(
        signInError.message === "Invalid login credentials"
          ? "That email and password combination was not recognised."
          : signInError.message
      );
      setSubmitting(false);
      return;
    }

    router.replace("/dashboard");
  }

  if (checking) {
    return (
      <div className={s.centre}>
        <div className={s.spinner} />
      </div>
    );
  }

  return (
    <div className={s.centre}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div className="card-enterprise" style={{ padding: "2.25rem 2rem" }}>
          <div style={{ marginBottom: "1.75rem" }}>
            <p
              style={{
                fontSize: "0.66rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--cuxton-amber-text)",
                marginBottom: "0.6rem",
              }}
            >
              CuxtonAI Console
            </p>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "var(--foreground)",
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              Sign in
            </h1>
            <p
              style={{
                fontSize: "0.83rem",
                lineHeight: 1.65,
                color: "rgba(var(--foreground-rgb),0.45)",
              }}
            >
              Internal access for managing insights and responding to enquiries.
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div
              className={`${s.notice} ${s.noticeInfo}`}
              style={{ marginBottom: "1.25rem" }}
            >
              Supabase environment variables are missing, so sign in is disabled. See{" "}
              <code>supabase/README.md</code>.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="username"
                className="form-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@cuxtonai.com"
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="form-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{ paddingRight: "3.5rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className={s.linkBtn}
                  style={{
                    position: "absolute",
                    right: "0.9rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  aria-pressed={showPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div
                className={`${s.notice} ${s.noticeError}`}
                role="alert"
                style={{ marginBottom: "1.25rem" }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={submitting || !isSupabaseConfigured}
              style={{
                width: "100%",
                justifyContent: "center",
                opacity: submitting || !isSupabaseConfigured ? 0.6 : 1,
                cursor: submitting ? "wait" : "pointer",
              }}
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.25rem",
            fontSize: "0.76rem",
            color: "rgba(var(--foreground-rgb),0.35)",
            lineHeight: 1.7,
          }}
        >
          Accounts are provisioned by an administrator.
          <br />
          <Link href="/" style={{ color: "var(--cuxton-teal-text)", textDecoration: "none" }}>
            Return to cuxtonai.com
          </Link>
        </p>
      </div>
    </div>
  );
}
