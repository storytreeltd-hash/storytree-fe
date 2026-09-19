import type { Metadata } from "next";

import { AboutContact } from "@/components/about-contact";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Contact | Story Tree",
  description:
    "Get in touch with StoryTree for general inquiries, partnerships, and volunteer opportunities.",
};

export default function ContactPage() {
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
        <AboutContact variant="page" />
      </div>
      <Footer />
    </>
  );
}
