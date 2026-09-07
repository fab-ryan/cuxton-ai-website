import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="relative flex-1 flex flex-col items-center justify-center bg-cosmic scanlines min-h-screen overflow-hidden">
            {/* Hex grid */}
            <div className="absolute inset-0 hex-grid pointer-events-none" />

            {/* Radial glow */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: 600,
                    height: 600,
                    left: "50%",
                    top: "45%",
                    transform: "translate(-50%, -50%)",
                    background:
                        "radial-gradient(circle, rgba(26,82,118,0.12) 0%, rgba(245,166,35,0.03) 40%, transparent 70%)",
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
                {/* Logo */}
                <div className="logo-breathe mb-10">
                    <Image
                        src="/full_color.png"
                        alt="Cuxton AI Logo"
                        width={120}
                        height={120}
                        className="object-contain"
                        preload
                    />
                </div>

                {/* 404 number */}
                <div className="relative mb-6">
                    <span
                        className="text-[140px] sm:text-[180px] font-extrabold leading-none tracking-tighter"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(26,82,118,0.25) 0%, rgba(26,82,118,0.04) 100%)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        404
                    </span>
                    {/* Overlay text */}
                    <span
                        className="absolute inset-0 flex items-center justify-center text-[140px] sm:text-[180px] font-extrabold leading-none tracking-tighter"
                        style={{
                            background:
                                "linear-gradient(135deg, #1a5276 0%, #2980b9 40%, #f5a623 100%)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            opacity: 0.15,
                            filter: "blur(20px)",
                        }}
                    >
                        404
                    </span>
                </div>

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[rgba(var(--foreground-rgb),0.9)] mb-3">
                    Page Not Found
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-[rgba(var(--foreground-rgb),0.5)] leading-relaxed max-w-sm mb-2">
                    This page doesn&apos;t exist yet — we&apos;re still building.
                    Our site is coming soon.
                </p>

                {/* Terminal hint */}
                <div className="font-mono text-[11px] text-[rgba(var(--foreground-rgb),0.35)] flex items-center gap-2 mb-10">
                    <span className="text-cuxton-teal-light">$</span>
                    <span>Error: route not found</span>
                    <span className="text-cuxton-orange">×</span>
                </div>

                {/* Back button */}
                <Link
                    href="/"
                    className="btn-glow relative inline-flex items-center gap-2.5 h-12 px-8 rounded-xl bg-gradient-to-r from-cuxton-teal to-cuxton-teal-light text-white text-sm font-semibold tracking-wide z-10 transition-all duration-300"
                >
                    <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>

                {/* Divider */}
                <div className="mt-12 w-24 h-px bg-gradient-to-r from-transparent via-[rgba(var(--foreground-rgb),0.12)] to-transparent" />

                {/* Footer */}
                <p className="mt-5 text-[10px] text-[rgba(var(--foreground-rgb),0.3)] tracking-[0.2em] uppercase font-medium">
                    © {new Date().getFullYear()} Cuxton AI
                </p>
            </div>
        </main>
    );
}
