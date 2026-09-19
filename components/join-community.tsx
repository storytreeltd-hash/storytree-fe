"use client";

import { CommunityJoinForm } from "@/components/community-join-form";
import {
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

export function JoinCommunity() {
  return (
    <section className="font-inter flex min-h-screen items-start px-0 pb-16 pt-24 sm:items-center sm:pt-28 md:pb-20">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-5 lg:gap-16 xl:gap-24">
          <StaggerContainer className="text-left lg:col-span-3">
            <StaggerItem>
              <div className="flex w-fit items-center gap-2 rounded-[8px] border border-[#171717]/10 bg-[#0D0D0D1A] px-4 py-2 backdrop-blur-sm md:px-5">
                <span className="text-sm font-medium text-[#171717] md:text-base">
                  Join Us
                </span>
                <ChevronDownIcon />
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="mt-5 text-[26px] font-bold leading-tight text-[#171717] sm:mt-6 sm:text-[32px] md:mt-8 md:text-[40px]">
                Join The Chat
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-4 text-sm leading-[24px] text-[#171717]/80 sm:mt-6 sm:text-base md:text-base">
                Our chat hub is not just another group chat. Think of it as a
                lounge for cinephiles. A place where you get-in-the-know, meet
                collaborators and have deep-dive discussions about anything and
                everything film. For film lovers, its a place that bridges the
                gap between you and your favourite filmmaker or actor. You never
                know who will be on the chat. Jump into the conversation and
                introduce yourself.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn
            direction="left"
            delay={0.1}
            className="w-full pt-2 sm:pt-0 lg:col-span-2"
          >
            <CommunityJoinForm
              source="join-page"
              submitLabel="Join The Chat"
              inputClassName={inputClassName}
              buttonClassName="w-full rounded-[6px] border border-[#E2B45F] bg-white px-5 py-3 text-sm font-medium text-[#171717] sm:py-3.5"
              errorClassName="mt-4 rounded-[6px] bg-red-50 px-3 py-2 text-left text-sm text-red-700"
              successClassName="mt-4 rounded-[6px] bg-green-50 px-3 py-2 text-left text-sm text-green-700"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
