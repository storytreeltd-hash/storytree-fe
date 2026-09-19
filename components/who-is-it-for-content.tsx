"use client";

import { InvestorsGuesswork } from "@/components/investors-guesswork";
import { InvestorsReady } from "@/components/investors-ready";
import { FilmmakersCommunity } from "@/components/filmmakers-community";
import { FilmmakersReady } from "@/components/filmmakers-ready";
import { FilmmakersReality } from "@/components/filmmakers-reality";
import { FilmLoversGreenlight } from "@/components/film-lovers-greenlight";
import { FilmLoversReady } from "@/components/film-lovers-ready";
import { WhoIsItForHero } from "@/components/who-is-it-for-hero";
import { WhoIsItForQuote } from "@/components/who-is-it-for-quote";
import { type WhoIsItForTabId } from "@/components/who-is-it-for-tabs";

export function WhoIsItForContent({
  activeTab,
}: {
  activeTab: WhoIsItForTabId;
}) {
  return (
    <>
      <div className="relative -mt-20 lg:-mt-[6.5rem]">
        <WhoIsItForHero activeTab={activeTab} />
      </div>
      {activeTab === "film-lovers" ? (
        <>
          <WhoIsItForQuote />
          <FilmLoversGreenlight />
          <FilmLoversReady />
        </>
      ) : null}
      {activeTab === "filmmakers" ? (
        <>
          <FilmmakersReality />
          <FilmmakersCommunity />
          <FilmmakersReady />
        </>
      ) : null}
      {activeTab === "investors" ? (
        <>
          <InvestorsGuesswork />
          <InvestorsReady />
        </>
      ) : null}
    </>
  );
}
