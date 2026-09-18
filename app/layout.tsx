import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import UniversityNav from "@/components/UniversityNav";
import { SiteFooter } from "@/components/SiteChrome";
import { ScrollTop } from "@/components/scrollTop";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://academy.cuxtonai.com"),
  title: {
    default: "CuxtonAI Academy University",
    template: "%s | CuxtonAI Academy University",
  },
  description:
    "CuxtonAI Academy University - Leading institution for artificial intelligence, computer science, and technology education. Join our academic community.",
  keywords: [
    "university", "artificial intelligence", "computer science", "AI education", "master's degree",
    "bachelor's degree", "research", "technology education", "university admissions",
  ],
  authors: [{ name: "CuxtonAI Academy University" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CuxtonAI Academy University",
    title: "CuxtonAI Academy University",
    description:
      "Leading university for artificial intelligence and computer science education. Explore our programs and join our community.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CuxtonAI Academy University",
    description: "Top university for AI, computer science, and technology education.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden" style={{ background: "var(--background)" }}>
        <Suspense fallback={null}>
          <ScrollTop />
        </Suspense>
        <UniversityNav />
        <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: "none", marginTop: "60px" }}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
