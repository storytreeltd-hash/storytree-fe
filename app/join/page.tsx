import type { Metadata } from "next";

import { JoinCommunity } from "@/components/join-community";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Join The Community | Story Tree",
  description:
    "Join the StoryTree chat hub — a lounge for cinephiles to meet collaborators, connect with filmmakers, and dive into conversations about film.",
};

export default function JoinPage() {
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
        <JoinCommunity />
      </div>
      <Footer />
    </>
  );
}
