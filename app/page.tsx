"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";

/* ─── Countdown target ─── */
function getTargetDate() {
  if (typeof window === "undefined") return new Date();
  const stored = localStorage.getItem("cuxton-launch-target");
  if (stored) return new Date(stored);
  const target = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  localStorage.setItem("cuxton-launch-target", target.toISOString());
  return target;
}

function calcTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Floating Particles
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 45 }).map((_, i) => {
        const size = 1.5 + Math.random() * 3.5;
        const left = Math.random() * 100;
        const duration = 12 + Math.random() * 18;
        const delay = Math.random() * 15;
        const isTeal = Math.random() > 0.3;
        return { id: i, size, left, duration, delay, isTeal };
      }),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "-5%",
            background: p.isTeal
              ? "rgba(41, 128, 185, 0.5)"
              : "rgba(245, 166, 35, 0.45)",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Neural Network SVG (behind logo)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function NeuralNetwork() {
  const nodes = [
    { cx: 80, cy: 60 },
    { cx: 420, cy: 40 },
    { cx: 60, cy: 280 },
    { cx: 440, cy: 300 },
    { cx: 250, cy: 20 },
    { cx: 250, cy: 340 },
    { cx: 30, cy: 170 },
    { cx: 470, cy: 170 },
    { cx: 150, cy: 100 },
    { cx: 350, cy: 100 },
    { cx: 150, cy: 260 },
    { cx: 350, cy: 260 },
  ];

  const lines = [
    [0, 2],
    [0, 4],
    [0, 8],
    [1, 3],
    [1, 4],
    [1, 9],
    [2, 5],
    [2, 6],
    [2, 10],
    [3, 5],
    [3, 7],
    [3, 11],
    [4, 8],
    [4, 9],
    [5, 10],
    [5, 11],
    [6, 0],
    [7, 1],
    [8, 10],
    [9, 11],
  ];

  return (
    <svg
      viewBox="0 0 500 360"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.35 }}
    >
      {lines.map(([a, b], i) => (
        <line
          key={`line-${i}`}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="url(#lineGrad)"
          strokeWidth="0.8"
          className="neural-line"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={`node-${i}`}
          cx={n.cx}
          cy={n.cy}
          r="2.5"
          fill={i % 3 === 0 ? "#f5a623" : "#2980b9"}
          opacity="0.6"
          style={{ animationDelay: `${i * 0.4}s` }}
        >
          <animate
            attributeName="r"
            values="2;3.5;2"
            dur={`${3 + i * 0.2}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur={`${3 + i * 0.2}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2980b9" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f5a623" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Orbit Rings around logo
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function OrbitRings() {
  return (
    <>
      {/* Ring 1 — tight */}
      <div
        className="ring-spin absolute rounded-full border border-dashed pointer-events-none"
        style={{
          width: 280,
          height: 280,
          top: "50%",
          left: "50%",
          marginTop: -140,
          marginLeft: -140,
          borderColor: "rgba(41, 128, 185, 0.2)",
        }}
      >
        <span
          className="neural-node absolute w-2 h-2 rounded-full bg-cuxton-orange"
          style={{ top: -4, left: "50%", marginLeft: -4 }}
        />
        <span
          className="neural-node absolute w-1.5 h-1.5 rounded-full bg-cuxton-teal-bright"
          style={{
            bottom: -3,
            left: "25%",
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Ring 2 — mid */}
      <div
        className="ring-reverse absolute rounded-full pointer-events-none"
        style={{
          width: 380,
          height: 380,
          top: "50%",
          left: "50%",
          marginTop: -190,
          marginLeft: -190,
          border: "1px solid rgba(245, 166, 35, 0.07)",
        }}
      >
        <span
          className="neural-node absolute w-1.5 h-1.5 rounded-full bg-cuxton-orange-light"
          style={{ top: "15%", right: -3, animationDelay: "2s" }}
        />
      </div>

      {/* Ring 3 — wide, pulsing */}
      <div
        className="ring-pulse absolute rounded-full pointer-events-none"
        style={{
          width: 480,
          height: 480,
          top: "50%",
          left: "50%",
          marginTop: -240,
          marginLeft: -240,
          border: "1px solid rgba(26, 82, 118, 0.06)",
        }}
      />
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Countdown unit
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="countdown-cell w-[72px] h-[84px] sm:w-[84px] sm:h-[96px] flex items-center justify-center">
        <span className="text-3xl sm:text-4xl font-bold tracking-tight text-cuxton-orange tabular-nums relative z-10">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white/35 font-semibold">
        {label}
      </span>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Terminal-style status
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TerminalStatus() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[11px] sm:text-xs text-white/30 flex items-center gap-2">
      <span className="text-cuxton-teal-bright">$</span>
      <span>building cuxton-ai</span>
      <span className="text-cuxton-orange">{dots}</span>
      <span className="cursor-blink text-cuxton-teal-bright">▊</span>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Feature pill
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FeaturePill({
  icon,
  text,
  delay,
}: {
  icon: React.ReactNode;
  text: string;
  delay: string;
}) {
  return (
    <div
      className={`anim-fade-up ${delay} flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.04] bg-white/[0.02] backdrop-blur-sm`}
    >
      <span className="text-cuxton-orange">{icon}</span>
      <span className="text-xs text-white/45 font-medium">{text}</span>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN PAGE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ComingSoonPage() {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = getTargetDate();
    setTargetDate(target);
    setTime(calcTimeLeft(target));
  }, []);

  useEffect(() => {
    if (!targetDate) return;
    const interval = setInterval(() => setTime(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (email.trim()) setSubmitted(true);
    },
    [email]
  );

  if (!mounted) return null;

  return (
    <main className="relative flex-1 flex flex-col items-center bg-cosmic scanlines min-h-screen">
      {/* BG layers */}
      {/* <Particles /> */}
      <div className="absolute inset-0 hex-grid pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 900,
          height: 900,
          left: "50%",
          top: "38%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(26,82,118,0.14) 0%, rgba(245,166,35,0.03) 40%, transparent 70%)",
        }}
      />

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-12 sm:pt-16 pb-10 max-w-3xl w-full">
        {/* Top nav-like bar */}
        <div className="w-full flex items-center justify-between mb-12 anim-fade d1">
          {/* Small logo top-left */}
          <div className="flex items-center gap-2.5">
            <Image
              src="/full_color-white.png"
              alt="Cuxton AI"
              width={130}
              height={30}
              className="object-contain opacity-70"
              priority
            />
          </div>
          {/* Status badge */}
          <span className="badge-shimmer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase text-cuxton-orange border border-cuxton-orange/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cuxton-orange animate-pulse" />
            In Development
          </span>
        </div>

        {/* ─── HERO LOGO SECTION ─── */}
        <div className="relative w-full flex items-center justify-center anim-fade-scale d2" style={{ minHeight: 360 }}>
          {/* Neural network behind */}
          <NeuralNetwork />
          {/* Orbit rings */}
          <OrbitRings />
          {/* Main logo */}
          <div className="logo-breathe relative z-10">
            <Image
              src="/full_color.png"
              alt="Cuxton AI Logo"
              width={260}
              height={260}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* ─── HEADLINE ─── */}
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight anim-fade-up d3">
          <span className="text-gradient-hero">We&apos;re Building</span>
          <br />
          <span className="text-white/90">The Future of AI</span>
        </h1>

        {/* Subhead */}
        <p className="mt-6 text-base sm:text-lg text-white/40 max-w-lg leading-relaxed font-light anim-fade-up d4">
          Cuxton AI is crafting the next generation of intelligent automation.
          Our platform is in active development — launching soon.
        </p>

        {/* Terminal status */}
        <div className="mt-5 anim-fade-up d4">
          <TerminalStatus />
        </div>

        {/* ─── PROGRESS BAR ─── */}
        <div className="mt-8 w-full max-w-md anim-fade-up d5">
          <div className="flex items-center justify-between mb-2 text-[10px] uppercase tracking-[0.2em] font-semibold">
            <span className="text-white/25">Development Progress</span>
            <span className="text-cuxton-orange">68%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
            <div
              className="h-full rounded-full progress-glow transition-all duration-1000"
              style={{
                width: "68%",
                background:
                  "linear-gradient(90deg, #1a5276, #2980b9, #f5a623)",
              }}
            />
          </div>
        </div>

        {/* ─── COUNTDOWN ─── */}
        <div className="mt-10 flex items-center gap-2.5 sm:gap-4 anim-fade-up d5">
          <CountdownUnit value={time.days} label="Days" />
          <span className="text-white/15 text-2xl font-extralight mt-[-20px]">
            :
          </span>
          <CountdownUnit value={time.hours} label="Hours" />
          <span className="text-white/15 text-2xl font-extralight mt-[-20px]">
            :
          </span>
          <CountdownUnit value={time.minutes} label="Min" />
          <span className="text-white/15 text-2xl font-extralight mt-[-20px]">
            :
          </span>
          <CountdownUnit value={time.seconds} label="Sec" />
        </div>

        {/* ─── FEATURE PILLS ─── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <FeaturePill
            delay="d6"
            text="AI-Powered Analytics"
            icon={
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
          <FeaturePill
            delay="d7"
            text="Smart Automation"
            icon={
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
          />
          <FeaturePill
            delay="d8"
            text="Neural Processing"
            icon={
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            }
          />
        </div>

        {/* ─── EMAIL FORM ─── */}
        {/* <div className="mt-10 w-full max-w-sm anim-fade-up d8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative group">
              <input
                id="notify-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for early access"
                className="w-full h-14 pl-5 pr-36 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder:text-white/25 outline-none focus:border-cuxton-teal-light/30 focus:bg-white/[0.05] transition-all duration-400"
              />
              <button
                id="notify-btn"
                type="submit"
                className="btn-glow absolute right-1.5 top-1/2 -translate-y-1/2 h-11 px-5 rounded-xl bg-gradient-to-r from-cuxton-teal to-cuxton-teal-light text-white text-sm font-semibold tracking-wide cursor-pointer z-10"
              >
                Notify Me
              </button>
            </form>
          ) : (
            <div className="glass-card flex items-center justify-center gap-2.5 px-6 py-4 text-sm text-cuxton-orange font-medium">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              You&apos;re on the list! We&apos;ll keep you posted.
            </div>
          )}
          <p className="mt-3 text-[10px] text-white/15 tracking-wide">
            Be the first to know when we launch. No spam, ever.
          </p>
        </div> */}

        {/* ─── SOCIAL & FOOTER ─── */}
        <div className="mt-12 flex items-center gap-5 anim-fade-up d9">
          {(
            [
              {
                label: "X / Twitter",
                href: "#",
                icon: (
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                href: "#",
                icon: (
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                label: "GitHub",
                href: "#",
                icon: (
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                ),
              },
            ] as const
          ).map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-9 h-9 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/25 hover:text-cuxton-orange hover:border-cuxton-orange/20 hover:bg-cuxton-orange/[0.06] transition-all duration-300"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-8 w-32 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Footer */}
        <p className="mt-5 text-[10px] text-white/15 tracking-[0.2em] uppercase font-medium anim-fade d9">
          © {new Date().getFullYear()} Cuxton AI — All rights reserved
        </p>
      </div>
    </main>
  );
}
