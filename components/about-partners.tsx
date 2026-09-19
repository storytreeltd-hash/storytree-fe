import Image from "next/image";

import { StaggerContainer, StaggerItem } from "@/components/motion";

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="#4ADE80"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type PartnerLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

const partnerRows: PartnerLogo[][] = [
  [
    { name: "Africa Collective", src: "/partners/partner1.svg", width: 48, height: 48 },
    { name: "AFRIFF", src: "/partners/partner2.svg", width: 99, height: 48 },
    { name: "COAL 360", src: "/partners/partner3.svg", width: 44, height: 48 },
    {
      name: "African Stories Untold",
      src: "/partners/partner4.svg",
      width: 48,
      height: 48,
    },
    {
      name: "CcHUB Creative Economy Ltd",
      src: "/partners/partner5.svg",
      width: 133,
      height: 48,
    },
    { name: "FILM RATS CLUB", src: "/partners/partner6.svg", width: 83, height: 48 },
    {
      name: "Lights Camera Africa",
      src: "/partners/partner7.svg",
      width: 48,
      height: 48,
    },
  ],
  [
    { name: "CANEX", src: "/partners/partner8.svg", width: 107, height: 48 },
    { name: "AFRICON", src: "/partners/partner9.svg", width: 119, height: 48 },
    {
      name: "MultiChoice TALENT FACTORY",
      src: "/partners/partner10.svg",
      width: 133,
      height: 48,
    },
    { name: "Elevate Africa", src: "/partners/partner11.svg", width: 99, height: 48 },
    {
      name: "AFS Africa Film Society",
      src: "/partners/partner12.svg",
      width: 116,
      height: 48,
    },
    {
      name: "Pan African Film & Arts Festival",
      src: "/partners/partner13.svg",
      width: 48,
      height: 48,
    },
  ],
];

export function AboutPartners() {
  return (
    <section
      id="partners"
      className="font-inter pt-24 pb-24 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32"
      style={{
        background:
          "linear-gradient(180deg, #E2B45F 0%, #F5EDD8 55%, #FDFBF7 100%)",
      }}
    >
      <div className="mx-auto max-w-[1232px] px-4 text-center md:px-6 lg:px-8">
        <StaggerContainer>
          <StaggerItem>
            <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-[8px] border border-[#171717]/10 bg-[#0D0D0D1A] px-4 py-2 backdrop-blur-sm md:px-5">
              <span className="text-sm font-medium text-[#171717] md:text-base">
                Partners
              </span>
              <ChevronDownIcon />
            </div>
          </StaggerItem>
        </StaggerContainer>

        <div className="mt-12 flex flex-col items-center gap-8 md:mt-16 md:gap-10">
          {partnerRows.map((row, rowIndex) => (
            <StaggerContainer
              key={`partner-row-${rowIndex}`}
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-10 md:gap-x-12 lg:gap-x-16"
            >
              {row.map((partner) => (
                <StaggerItem key={partner.src}>
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className="h-10 w-auto object-contain sm:h-12"
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
