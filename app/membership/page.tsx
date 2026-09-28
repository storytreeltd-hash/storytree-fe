import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { MembershipCheckout } from "@/components/membership-checkout";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Ubuntu Pass | Story Tree",
  description:
    "Choose your StoryTree Ubuntu Pass membership — Blue, Gold, or Platinum — with regional pricing.",
};

export default function MembershipPage() {
  return (
    <>
      <div
        className="relative min-h-screen font-sans"
        style={{
          background:
            "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 55%, #E2B45F 100%)",
        }}
      >
        <Navbar variant="light" />
        <MembershipCheckout />
      </div>
      <Footer />
    </>
  );
}
