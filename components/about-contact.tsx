"use client";

import Link from "next/link";

import {
  AnimatedButton,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

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

const inputClassName =
  "w-full rounded-[6px] border border-white/20 bg-[#171717]/25 px-4 py-3 text-sm text-white placeholder:text-white/80 outline-none focus:border-white/50 sm:py-3.5";

const sectionBackground =
  "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 55%, #E2B45F 100%)";

function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return;
  }

  const subject = encodeURIComponent(`Contact from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`,
  );

  window.location.href = `mailto:info@storytree.studio?subject=${subject}&body=${body}`;
}

export function AboutContact({
  variant = "section",
}: {
  variant?: "section" | "page";
}) {
  const isPage = variant === "page";

  return (
    <section
      id="contact"
      className={
        isPage
          ? "font-inter flex min-h-screen items-start px-0 pb-16 pt-24 sm:items-center sm:pt-28 md:pb-20"
          : "font-inter pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-28 md:pb-28 lg:pt-[300px] lg:pb-[300px]"
      }
      style={isPage ? undefined : { background: sectionBackground }}
    >
      <div className="mx-auto max-w-[1232px] px-4 md:px-6 lg:px-8">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-5 lg:gap-16 xl:gap-24">
          <StaggerContainer className="text-left lg:col-span-3">
            <StaggerItem>
              <div className="flex w-fit items-center gap-2 rounded-[8px] border border-[#171717]/10 bg-[#0D0D0D1A] px-4 py-2 backdrop-blur-sm md:px-5">
                <span className="text-sm font-medium text-[#171717] md:text-base">
                  Contact
                </span>
                <ChevronDownIcon />
              </div>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mt-5 text-[28px] font-bold leading-tight text-[#171717] sm:mt-6 sm:text-[32px] md:mt-8 md:text-[40px]">
                Contact Us
              </h2>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-4 max-w-[520px] text-sm leading-[24px] text-[#171717]/80 sm:mt-6 sm:text-base md:text-base">
                Use the web form to send us a note. We typically reply to
                inquiries within 2 or 3 business days. We&apos;d love to hear
                from you!
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:flex lg:justify-start lg:gap-6">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#171717] md:text-base">
                    General Inquiries and Help:
                  </p>
                  <Link
                    href="mailto:info@storytree.studio"
                    className="mt-2 inline-block break-all text-sm text-[#171717]/80 underline underline-offset-2 transition-opacity hover:opacity-70 sm:break-normal md:text-base"
                  >
                    info@storytree.studio
                  </Link>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#171717] md:text-base">
                    Partnerships and Volunteer Inquiries:
                  </p>
                  <Link
                    href="mailto:charityakuma@storytree.studio"
                    className="mt-2 inline-block break-all text-sm text-[#171717]/80 underline underline-offset-2 transition-opacity hover:opacity-70 sm:break-normal md:text-base"
                  >
                    charityakuma@storytree.studio
                  </Link>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn
            direction="left"
            delay={0.1}
            className={`w-full pt-2 sm:pt-0 lg:col-span-2${isPage ? " lg:flex lg:justify-end" : ""}`}
          >
            <form
              className={`flex flex-col ${isPage ? "w-full lg:w-[460px]" : "w-full"}`}
              onSubmit={handleContactSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                className={inputClassName}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className={`mt-3 ${inputClassName}`}
              />
              <textarea
                name="message"
                placeholder="Message"
                required
                className={`mt-3 h-[100px] resize-none ${inputClassName}`}
              />
              <AnimatedButton
                type="submit"
                className="mt-5 w-full rounded-[6px] border border-[#E2B45F] bg-white px-5 py-3 text-sm font-medium uppercase tracking-wide text-[#171717] sm:mt-6 sm:py-3.5"
              >
                Contact US
              </AnimatedButton>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
