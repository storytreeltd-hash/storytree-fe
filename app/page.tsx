import { Audience } from "@/components/audience";
import { BigPicture } from "@/components/big-picture";
import { Community } from "@/components/community";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Mission } from "@/components/mission";
import { Navbar } from "@/components/navbar";
import { SitePreloader } from "@/components/site-preloader";
import { WhoIsItFor } from "@/components/who-is-it-for";

export default function Home() {
  return (
    <SitePreloader>
      <div className="relative font-sans">
        <Navbar />
        <div className="relative -mt-20 lg:-mt-[6.5rem]">
          <Hero />
        </div>
        <Community />
        <BigPicture />
        <Audience />
        <Mission />
        <HowItWorks />
        <WhoIsItFor />
        <Footer />
      </div>
    </SitePreloader>
  );
}
