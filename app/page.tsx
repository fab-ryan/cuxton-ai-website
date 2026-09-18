import type { Metadata } from "next";
import { AcademyHeroSection } from "@/components/academyHomeSections/academyHero";
import { WhyAcademySection } from "@/components/academyHomeSections/whyAcademy";
import { FeaturedCoursesSection } from "@/components/academyHomeSections/featuredCourses";
import { HowItWorksSection } from "@/components/academyHomeSections/howItWorks";
import { AITutorSection } from "@/components/academyHomeSections/aiTutorSection";
import { CTASection } from "@/components/academyHomeSections/ctaSection";

export const metadata: Metadata = {
    title: "CuxtonAI Academy | Learn with AI, Build Real Skills",
    description:
        "CuxtonAI Academy is an AI-powered learning platform where students learn through courses, AI tutoring, guided practice, and personalized learning paths.",
    openGraph: {
        title: "CuxtonAI Academy | AI-Powered Learning",
        description: "Master real skills with expert-designed courses, personalized AI tutoring, and hands-on practice.",
    },
};

export default function HomePage() {
    return (
        <div style={{ background: "var(--background)" }}>
            {/* Hero Section */}
            <AcademyHeroSection />

            {/* Why CuxtonAI Academy */}
            <WhyAcademySection />

            {/* Featured Courses */}
            <FeaturedCoursesSection />

            {/* How Learning Works */}
            <HowItWorksSection />

            {/* AI Tutor Section */}
            <AITutorSection />

            {/* Final CTA */}
            <CTASection />
        </div>
    );
}

