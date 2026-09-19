"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AdminLogoutModal } from "@/components/admin-logout-modal";

const navItems = [
  {
    label: "Overview",
    href: "/admin/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1.5" y="10.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10.5" y="10.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Users",
    href: "/admin/dashboard/users",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="6" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M1.5 15c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="13" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M16.5 15c0-1.933-1.567-3.5-3.5-3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <aside className="hidden min-h-screen w-[260px] shrink-0 flex-col bg-white lg:flex">
      <div className="px-8 pb-2 pt-10">
        <Link href="/admin/dashboard">
          <Image
            src="/logoB.svg"
            alt="Story Tree"
            width={132}
            height={52}
            className="h-11 w-auto"
            priority
          />
        </Link>
      </div>

      <nav className="flex-1 px-5 pt-8">
        <p className="px-4 text-sm font-medium text-[#98A2B3]">Dashboard</p>
        <ul className="mt-4 space-y-1">
          {navItems.map(({ label, href, icon }) => {
            const isActive =
              label === "Overview"
                ? pathname === "/admin/dashboard"
                : pathname.startsWith("/admin/dashboard/users");

            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`relative flex items-center gap-3 rounded-[10px] px-4 py-3 text-[15px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#E8EAF6] text-[#1D2939]"
                      : "text-[#667085] hover:bg-[#F9FAFB] hover:text-[#344054]"
                  }`}
                >
                  <span className={isActive ? "text-[#344054]" : "text-[#667085]"}>
                    {icon}
                  </span>
                  {label}
                  {isActive ? (
                    <span className="absolute right-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-l-full bg-[#2E3192]" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-5 pb-8 pt-4">
        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-[15px] font-medium text-[#F04438] transition-colors hover:bg-[#FEF3F2]"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M7 3H4.5A1.5 1.5 0 003 4.5v9A1.5 1.5 0 004.5 15H7M11.5 12.5L15 9M15 9l-3.5-3.5M15 9H7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>

      <AdminLogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
}
