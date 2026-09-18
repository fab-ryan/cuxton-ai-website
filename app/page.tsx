import type { Metadata } from "next";
import { HeroSection } from "@/components/universitySections/heroSection";
import { ProgramsSection } from "@/components/universitySections/programsSection";
import { AboutSection } from "@/components/universitySections/aboutSection";
import { StudentLifeSection } from "@/components/universitySections/studentLifeSection";
import { NewsEventsSection } from "@/components/universitySections/newsEventsSection";
import { CTASection } from "@/components/universitySections/ctaSection";

export const metadata: Metadata = {
    title: "CuxtonAI Academy University",
    description:
        "CuxtonAI Academy University - Leading university for artificial intelligence and computer science education. Explore our programs, campus life, and admissions.",
    openGraph: {
        title: "CuxtonAI Academy University",
        description: "Top university for AI and computer science. Join our academic community.",
    },
};

export default function HomePage() {
    return (
        <div style={{ background: "var(--background)" }}>
            {/* Hero Section */}
            <HeroSection />

            {/* Programs Section */}
            <ProgramsSection />

            {/* About Section */}
            <AboutSection />

            {/* Student Life Section */}
            <StudentLifeSection />

            {/* News & Events */}
            <NewsEventsSection />

            {/* Final CTA */}
            <CTASection />
        </div>
    );
}

