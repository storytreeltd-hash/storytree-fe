import Image from "next/image";

import { FadeIn, HoverLift, StaggerContainer, StaggerItem } from "@/components/motion";

const storyImage1 = [
  {
    src: "/storyy1.svg",
    width: 197,
    height: 144,
    className: "",
  },
  {
    src: "/storyy2.svg",
    width: 124,
    height: 131,
    className: "",
  },
];

const storyImage2 = [
  {
    src: "/storyy3.svg",
    width: 141,
    height: 133,

    className: "",
  },
  {
    src: "/storyy4.svg",
    width: 204,
    height: 148,
    className: "",
  },
];
const storyImageClassName = "";

const portraitImages = [
  { src: "/imagee1.svg", width: 123, height: 202 },
  { src: "/imagee2.svg", width: 123, height: 202 },
  { src: "/imagee3.svg", width: 123, height: 202 },
];

export function BigPicture() {
  return (
    <section
      className="font-inter pt-24 pb-24 lg:pt-[100px] lg:pb-[100px]"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
        <FadeIn className="text-center">
          <Image
            src="/storyTree.svg"
            alt="Story Tree"
            width={160}
            height={40}
            className="mx-auto h-8 w-auto brightness-0 md:h-9"
          />
          <h2 className="mt-1 text-[24px] font-bold text-[#171717] sm:text-[32px] md:text-[40px]">
            The Big Picture
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
        <HoverLift>
        <div className="relative mt-10 overflow-hidden min-h-0 rounded-[20px] bg-white shadow-[0_4px_30px_4px_rgba(215,152,33,0.15)] md:mt-16 md:min-h-[370px] md:rounded-[32px] lg:mt-20">
          <div className="pointer-events-none absolute right-0 top-0 z-0 w-[min(100%,480px)] opacity-60 md:opacity-100">
            <Image
              src="/pictureBgT.svg"
              alt=""
              width={391}
              height={311}
              aria-hidden
              className="ml-auto block w-full max-w-[391px]"
            />
            <Image
              src="/pictureBgB.svg"
              alt=""
              width={461}
              height={193}
              aria-hidden
              className="-ml-40 hidden w-full max-w-[461px] -mt-32 md:block"
            />
          </div>
          <Image
            src="/pictureBgB.svg"
            alt=""
            width={461}
            height={193}
            aria-hidden
            className="pointer-events-none absolute right-0 bottom-0 z-0 block w-full max-w-[461px] opacity-60 md:hidden"
          />

          <div className="relative z-10 grid items-center justify-items-center gap-8 px-4 py-8 md:gap-10 md:px-8 md:py-12 lg:grid-cols-2 lg:justify-items-stretch lg:gap-16 lg:px-16">
            <p className="mx-auto max-w-[570px] text-center text-[22px] font-bold leading-snug text-[#171717] sm:text-[24px] lg:mx-0 lg:text-left lg:text-[40px] lg:leading-tight">
              African filmmaking is at an existential cross road.
            </p>

            <div className="relative mx-auto flex w-full max-w-[500px] origin-center scale-[0.65] items-center justify-center gap-2 min-[375px]:scale-[0.72] sm:scale-90 md:scale-100 lg:mx-0 lg:justify-end">
              <div className="flex flex-col items-end gap-2 -mb-14">
                {storyImage1.map(({ src, width, height, className }) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={width}
                    height={height}
                    className={`${className} ${storyImageClassName}`}
                  />
                ))}
              </div>
              <div className="flex flex-col items-start gap-2 -mt-6">
                {storyImage2.map(({ src, width, height, className }) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={width}
                    height={height}
                    className={`${className} ${storyImageClassName}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        </HoverLift>
        </FadeIn>

        <FadeIn delay={0.15}>
        <HoverLift>
        <div className="relative mt-6 overflow-hidden min-h-0 rounded-[20px] bg-white shadow-[0_4px_30px_4px_rgba(215,152,33,0.15)] md:mt-8 md:min-h-[370px] md:rounded-[32px]">
          <div className="pointer-events-none absolute left-0 z-0 w-full opacity-50 md:opacity-100">
            <Image
              src="/imageBg.svg"
              alt=""
              width={391}
              height={311}
              aria-hidden
              className="block w-full max-w-[520px]"
            />
          </div>
          <div className="relative z-10 grid items-center justify-items-center gap-8 px-4 py-8 md:gap-10 md:px-8 md:py-12 lg:grid-cols-2 lg:justify-items-stretch lg:gap-16 lg:px-16">
            <div className="relative mx-auto w-full max-w-[440px] lg:mx-0">
              <div className="relative z-10 flex justify-center gap-1 rounded-[16px] bg-white p-3 shadow-[0_8px_32px_rgba(0,0,0,0.1)] md:gap-1 md:p-4">
                {portraitImages.map(({ src, width, height }) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={width}
                    height={height}
                    className="h-[120px] w-[74px] rounded-[10px] object-cover sm:h-[160px] sm:w-[98px] lg:h-[202px] lg:w-[123px]"
                  />
                ))}
              </div>
            </div>

            <p className="mx-auto max-w-[570px] text-center text-[22px] font-bold leading-snug text-[#171717] sm:text-[24px] lg:mx-0 lg:text-left lg:text-[30px] lg:leading-[150%]">
              From Lagos, Accra, Nairobi, London, New York, Toronto and the
              Carribeans The stories that define the African people, are being
              told in dire financial challenges and unable to scale.
            </p>
          </div>
        </div>
        </HoverLift>
        </FadeIn>
      </div>
    </section>
  );
}
