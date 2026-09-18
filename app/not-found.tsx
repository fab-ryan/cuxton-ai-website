import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: "5rem 1.5rem 7rem" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/university/crest.svg"
          alt=""
          width={72}
          height={82}
          style={{ display: "block", marginBottom: "2.5rem" }}
        />

        <p style={{ fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--cuxton-teal-text)", marginBottom: "0.875rem" }}>
          404
        </p>

        <h1 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
          That page is not here
        </h1>

        <p style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(var(--foreground-rgb), 0.7)", marginBottom: "2rem" }}>
          The link may be out of date, or the page may never have existed. The
          programme catalogue and the admissions pages are the two places most
          people are looking for.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
          <Link href="/programs" className="btn-primary">Browse programmes</Link>
          <Link href="/" className="btn-secondary">Back to the homepage</Link>
          <Link href="/contact" className="btn-secondary">Contact the university</Link>
        </div>
      </div>
    </div>
  );
}
