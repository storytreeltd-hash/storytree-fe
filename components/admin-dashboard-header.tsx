import Image from "next/image";
import Link from "next/link";

export function AdminDashboardHeader({
  adminLabel = "Admin",
}: {
  adminLabel?: string;
}) {
  return (
    <header className="px-4 py-5 md:px-8 md:py-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard" className="shrink-0 lg:hidden">
          <Image
            src="/logoB.svg"
            alt="Story Tree"
            width={100}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        <h1 className="shrink-0 text-lg font-semibold text-[#101828] md:text-[20px]">
          Admin Dashboard
        </h1>

        <div className="mx-auto hidden w-full max-w-[480px] lg:block">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M12.5 12.5L16 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full border border-[#EAECF0] bg-white py-3 pl-12 pr-4 text-sm text-[#101828] shadow-[0_1px_2px_rgba(16,24,40,0.05)] placeholder:text-[#98A2B3] outline-none focus:border-[#D0D5DD]"
            />
          </label>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2.5">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src="/image1.png"
                alt="Admin"
                fill
                className="object-cover"
              />
            </div>
            <span className="hidden text-sm font-medium text-[#101828] md:inline">
              {adminLabel}
            </span>
          </div>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#667085] transition-colors hover:bg-white/70"
            aria-label="Notifications"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 3.5a4.5 4.5 0 00-4.5 4.5v2.1l-1.2 2.4a.75.75 0 00.67 1.08h9.06a.75.75 0 00.67-1.08l-1.2-2.4V8a4.5 4.5 0 00-4.5-4.5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 15.75a1.75 1.75 0 003.5 0"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute right-1.5 top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F04438] px-1 text-[10px] font-semibold leading-none text-white">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
