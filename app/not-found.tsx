import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex-1 flex flex-col items-center justify-center min-h-screen">
      <div className="relative flex flex-col items-start text-left px-6 max-w-lg">
        <div className="mb-10">
          <Image
            src="/full_color.png"
            alt="Cuxton AI"
            width={96}
            height={96}
            className="object-contain"
            preload
          />
        </div>

        <p className="text-sm text-[rgba(var(--foreground-rgb),0.55)] mb-3">404</p>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          We couldn&apos;t find that page.
        </h1>

        <p className="text-base text-[rgba(var(--foreground-rgb),0.68)] leading-relaxed mb-8">
          The link may be out of date, or the page may not be built yet. You can
          head back to the homepage, or get in touch if you were expecting
          something here.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Back to homepage
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
