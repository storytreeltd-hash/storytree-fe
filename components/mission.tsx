import Image from "next/image";

import {
  FadeIn,
  HoverLift,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const movies = [
  { src: "/movie1.svg", alt: "Namibia: The Struggle for Liberation poster" },
  { src: "/movie2.svg", alt: "The Burial of Kojo poster" },
  { src: "/movie3.svg", alt: "Queen of Katwe poster" },
  { src: "/movie4.svg", alt: "93 Days poster" },
  { src: "/movie5.svg", alt: "The Woman King poster" },
];

export function Mission() {
  return (
    <section
      id="mission"
      className="relative overflow-hidden font-inter pt-24 pb-24 lg:pt-[224px] lg:pb-[224px]"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <Image
        src="/treeWL.svg"
        alt=""
        width={400}
        height={800}
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 hidden h-[90%] w-auto opacity-60 sm:block lg:opacity-100"
      />
      <Image
        src="/treeWR.svg"
        alt=""
        width={400}
        height={800}
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 hidden h-[90%] w-auto opacity-60 sm:block lg:opacity-100"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 text-center md:px-6 lg:px-8">
        <FadeIn>
          <p className="text-sm text-[#0D0D0DB2] md:text-base">
            The Mission
          </p>

          <h2 className="mx-auto mt-4 max-w-[1055px] text-[24px] font-bold leading-tight text-[#171717] sm:text-[28px] md:text-[36px] lg:text-[40px] lg:leading-[1.2]">
            Our stories told at scale -sustainably,{" "}
            <br className="hidden lg:block" /> and empower the community that is
            most invested in African cinema to have a say; even own it.
          </h2>
        </FadeIn>

        <div className="-mx-4 mt-10 overflow-x-auto px-4 lg:mx-0 lg:mt-16 lg:overflow-visible lg:px-0">
          <StaggerContainer className="mx-auto flex min-w-max snap-x snap-mandatory justify-start gap-0 px-1 lg:min-w-0 lg:w-full lg:max-w-[1125px] lg:snap-none lg:justify-center lg:gap-0 lg:px-0">
            {movies.map(({ src, alt }) => (
              <StaggerItem
                key={src}
                className="shrink-0 snap-center lg:w-1/5 lg:max-w-[225px]"
              >
                <HoverLift>
                  <Image
                    src={src}
                    alt={alt}
                    width={225}
                    height={300}
                    className="h-[200px] w-[140px] object-cover object-top sm:h-[240px] sm:w-[180px] lg:h-[300px] lg:w-full"
                  />
                </HoverLift>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
