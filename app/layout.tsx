import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Cuxton AI — Coming Soon",
  description:
    "Cuxton AI is building the future of intelligent automation. Our website is launching soon. Stay tuned for something extraordinary.",
  keywords: ["Cuxton AI", "artificial intelligence", "coming soon", "AI automation"],
  openGraph: {
    title: "Cuxton AI — Coming Soon",
    description:
      "We're crafting something extraordinary. Cuxton AI launches soon.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
