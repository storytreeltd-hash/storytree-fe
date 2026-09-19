import type { Metadata } from "next";

import { AboutContact } from "@/components/about-contact";
import { AboutAdvisoryBoard } from "@/components/about-advisory-board";
import { AboutAmbassadors } from "@/components/about-ambassadors";
import { AboutHero } from "@/components/about-hero";
import { AboutPartners } from "@/components/about-partners";
import { AboutStory } from "@/components/about-story";
import { AboutTeam } from "@/components/about-team";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Mission } from "@/components/mission";

export const metadata: Metadata = {
  title: "About | Story Tree",
  description:
    "StoryTree was born from a simple belief: African stories deserve the audience, support, and infrastructure needed to thrive at scale.",
};

export default function AboutPage() {
  return (
    <div className="relative font-sans">
      <Navbar variant="light" />
      <div className="relative -mt-20 lg:-mt-[6.5rem]">
        <AboutHero />
      </div>
      <AboutStory />
      <Mission />
      <AboutTeam />
      <AboutAdvisoryBoard />
      <AboutAmbassadors />
      <AboutPartners />
      <AboutContact />
      <Footer />
    </div>
  );
}
