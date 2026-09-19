import Image from "next/image";

import { FadeIn } from "@/components/motion";

const mediaRows = [
  [
    { src: "/media1.png", alt: "StoryTree studio recording session", span: "md:col-span-2" },
    { src: "/media2.png", alt: "StoryTree community gathering at sunset", span: "md:col-span-1" },
  ],
  [
    { src: "/media3.png", alt: "Behind the scenes on a StoryTree production", span: "md:col-span-1" },
    { src: "/media4.png", alt: "Film crew at work on location", span: "md:col-span-1" },
    { src: "/media5.png", alt: "Director reviewing footage on set", span: "md:col-span-1" },
  ],
  [
    { src: "/media6.png", alt: "Cinematographer framing a shot", span: "md:col-span-1" },
    { src: "/media7.png", alt: "Outdoor film production at golden hour", span: "md:col-span-2" },
  ],
  [
    { src: "/media8.png", alt: "Sound recording on a StoryTree set", span: "md:col-span-1" },
    { src: "/media9.png", alt: "Camera operator during a shoot", span: "md:col-span-1" },
    { src: "/media10.png", alt: "Lighting setup for a film scene", span: "md:col-span-1" },
  ],
  [
    { src: "/media111.png", alt: "Wide shot of a StoryTree film set", span: "md:col-span-2" },
    { src: "/media12.png", alt: "Crew member adjusting equipment", span: "md:col-span-1" },
  ],
] as const;

function MediaImage({
  src,
  alt,
  span,
}: {
  src: string;
  alt: string;
  span: string;
}) {
  return (
    <div className={`overflow-hidden rounded-lg md:rounded-xl ${span}`}>
      <Image
        src={src}
        alt={alt}
        width={1133}
        height={600}
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

export function MediaGallery() {
  return (
    <section
      className="relative z-10 pb-16 pt-[200px] font-inter md:pb-28 md:pt-[400px] lg:pb-32"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col gap-2">
            {mediaRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-1 gap-2 md:grid-cols-3"
              >
                {row.map((image) => (
                  <MediaImage key={image.src} {...image} />
                ))}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
