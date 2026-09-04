import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import Footer from "./components/footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cuxtonai.com"),
  title: {
    default: "Cuxton AI — Enterprise AI Built Around Your Data, Workflows and Control",
    template: "%s | Cuxton AI",
  },
  description:
    "Cuxton AI helps institutions discover where AI can create real value, then integrates, customises or builds secure AI systems, agents and automations around the organisation's own knowledge, infrastructure and operational needs.",
  keywords: [
    "enterprise AI", "private AI", "AI consultancy", "AI agents", "workflow automation",
    "knowledge-grounded AI", "AI integration", "Cuxton AI",
  ],
  authors: [{ name: "Cuxton AI" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Cuxton AI",
    title: "Cuxton AI — Enterprise AI Built Around Your Data, Workflows and Control",
    description:
      "Private AI. Your data. Your infrastructure. Under your control. Cuxton AI helps institutions deploy secure AI systems, agents and automations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cuxton AI — Enterprise AI",
    description: "Private AI, knowledge-grounded systems and workflow automation for institutions.",
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
      <body className="min-h-full flex flex-col" style={{ background: "var(--background)" }}>
        <Nav />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
