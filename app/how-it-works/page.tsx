import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { HowItWorksHero } from "@/components/how-it-works-hero";
import { HowItWorksWeb3 } from "@/components/how-it-works-web3";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "How it works | Story Tree",
  description:
    "StoryTree uses Web3 and blockchain technology to create transparency, protect creators, and build a more sustainable future for African storytelling.",
};

export default function HowItWorksPage() {
  return (
    <div className="relative font-sans">
      <Navbar variant="light" />
      <div className="relative -mt-20 lg:-mt-[6.5rem]">
        <HowItWorksHero />
      </div>
      <HowItWorksWeb3 />
      <Footer />
    </div>
  );
}
