import type { Metadata } from "next";
import styles from "./page.module.css";
import CapabilitiesShowcase from "../components/CapabilitiesShowcase";
import { HeroSection } from "@/components/homeSections/hero";
import { ProblemSection } from "@/components/homeSections/problem";
import { WhyPrivateSection } from "@/components/homeSections/whyPrivate";
import { FourLayersSection } from "@/components/homeSections/fourLayer";
import { IndustriesSection } from "@/components/homeSections/industries";
import { AiAgentsSection } from "@/components/homeSections/aiAgent";
import { HowWeWorkSection } from "@/components/homeSections/howWeWork";
import { WhyCuxtonSection } from "@/components/homeSections/whyCuxton";
import { InsightsSection } from "@/components/homeSections/insights";
import { CTASection } from "@/components/homeSections/cta";



export const metadata: Metadata = {
  title: "Enterprise AI Built Around Your Data, Workflows and Control",
  description:
    "Cuxton AI helps institutions discover where AI can create real value, then integrates, customises or builds secure AI systems, agents and automations around the organisation's own knowledge and infrastructure.",
};

export default function HomePage() {
  return (
    <div style={{ background: "var(--background)" }}>

      {/* ════════════════════════════════════════════
          1. HERO — full-width photograph background
          ════════════════════════════════════════════ */}
      <HeroSection />

      {/* ════════════════════════════════════════════
          2. THE PROBLEM
          ════════════════════════════════════════════ */}
      <ProblemSection />

      {/* Divider */}
      <div className="section-container"><div className={styles.divider} /></div>

      {/* ════════════════════════════════════════════
          3. WHAT A CUXTON DEPLOYMENT INCLUDES
          ════════════════════════════════════════════ */}
      <section className="section-py">
        <div className="container max-w-7xl mx-auto px-4 relative z-10 *:px-4 sm:px-6 lg:px-8 text-left ">
          <CapabilitiesShowcase />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. WHY PRIVATE / CONTROLLED AI
          ════════════════════════════════════════════ */}

      <WhyPrivateSection />
      {/* ════════════════════════════════════════════
          4B. FOUR LAYERS
          ════════════════════════════════════════════ */}
      <FourLayersSection />

      {/* ════════════════════════════════════════════
          5. INDUSTRIES
          ════════════════════════════════════════════ */}

      <IndustriesSection />

      {/* ════════════════════════════════════════════
          6. AI AGENTS & AUTOMATION
          ════════════════════════════════════════════ */}
      <AiAgentsSection />

      {/* ════════════════════════════════════════════
          7. HOW WE WORK
          ════════════════════════════════════════════ */}
      <HowWeWorkSection />
      {/* ════════════════════════════════════════════
          8. WHY CUXTON
          ════════════════════════════════════════════ */}
      <WhyCuxtonSection />

      {/* ════════════════════════════════════════════
          9. INSIGHTS
          ════════════════════════════════════════════ */}
      <InsightsSection />

      {/* ════════════════════════════════════════════
          10. FINAL CTA — second, subtler use of the hero photo
          ════════════════════════════════════════════ */}
      <CTASection />
    </div>
  );
}

