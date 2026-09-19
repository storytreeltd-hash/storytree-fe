import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { WhoIsItForContent } from "@/components/who-is-it-for-content";

export const metadata: Metadata = {
  title: "Investors | Story Tree",
  description:
    "StoryTree connects investors with transparent, community-backed opportunities in African cinema.",
};

export default function InvestorsPage() {
  return (
    <div className="relative font-sans">
      <Navbar variant="light" />
      <WhoIsItForContent activeTab="investors" />
      <Footer />
    </div>
  );
}
