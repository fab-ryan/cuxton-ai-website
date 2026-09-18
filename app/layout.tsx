import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import AcademyNav from "@/components/AcademyNav";
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
    default: "CuxtonAI Academy — AI-Powered Learning Platform",
    template: "%s | CuxtonAI Academy",
  },
  description:
    "CuxtonAI Academy is an AI-powered learning platform where students learn through expert-designed courses, personalized AI tutoring, hands-on practice, and assessments.",
  keywords: [
    "online learning", "AI education", "programming courses", "skill development", "online academy",
    "AI tutoring", "course platform", "learn with AI", "CuxtonAI Academy",
  ],
  authors: [{ name: "CuxtonAI Academy" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CuxtonAI Academy",
    title: "CuxtonAI Academy - AI-Powered Learning Platform",
    description:
      "Learn with AI. Master real skills. Get personalized guidance. CuxtonAI Academy helps you achieve your learning goals.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CuxtonAI Academy",
    description: "AI-powered learning with expert courses, personalized tutoring, and hands-on practice.",
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
        <AcademyNav />
        <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: "none", marginTop: "60px" }}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
