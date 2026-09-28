import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { MembershipThankYou } from "@/components/membership-thank-you";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Membership confirmed | Story Tree",
  description: "Thanks for joining StoryTree. We’re confirming your Ubuntu Pass membership.",
};

export default function MembershipThankYouPage() {
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
        <MembershipThankYou />
      </div>
      <Footer />
    </>
  );
}
