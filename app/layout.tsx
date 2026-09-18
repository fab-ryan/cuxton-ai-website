import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { ScrollTop } from "@/components/scrollTop";

/* Inter carries the interface and body copy. The serif is used only for
   headings, where it does the work a university wordmark would: it marks
   the institution without changing the reading experience. */
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const serif = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://academy.cuxtonai.com"),
  title: {
    default: "CuxtonAI Academy University",
    template: "%s | CuxtonAI Academy University",
  },
  description:
    "A university for artificial intelligence, computing, data, security and digital business. Undergraduate, graduate, doctoral and professional programmes across five schools.",
  keywords: [
    "university",
    "artificial intelligence degree",
    "computer science degree",
    "data science degree",
    "cybersecurity degree",
    "master's programmes",
    "doctoral research",
    "university admissions",
  ],
  authors: [{ name: "CuxtonAI Academy University" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "CuxtonAI Academy University",
    title: "CuxtonAI Academy University",
    description:
      "Five schools teaching artificial intelligence, computing, data, security and digital business, from undergraduate degrees to doctoral research.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CuxtonAI Academy University",
    description:
      "Undergraduate, graduate, doctoral and professional study in artificial intelligence, computing and data.",
  },
  robots: { index: true, follow: true },
};

type LayoutProps = { children: React.ReactNode };

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Suspense fallback={null}>
          <ScrollTop />
        </Suspense>
        <SiteNav />
        <main id="main-content" tabIndex={-1} className="site-main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
