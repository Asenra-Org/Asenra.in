import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { PricingSection } from "@/components/sections/PricingSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <CinematicHero 
        brandName="ASENRA"
        brandLogo="/logo.png"
        brandTextLogo="/asenra-full-logo.png"
        tagline1="Tech That Doubles"
        tagline2="Your Business Revenue"
        cardHeading="High-Performance Systems"
        cardDescription="Intelligent Automations • Scalable Infrastructure • Elite Web Architectures."
        metricValue={50}
        metricLabel="Clients"
        ctaHeading="Get Your Free Audit"
        ctaDescription="Schedule your strategy call. Launching in 7 days."
      />
      
      <PricingSection />
    </main>
  );
}
