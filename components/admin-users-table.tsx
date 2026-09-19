"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { AdminUser } from "@/lib/admin-dashboard-data";

function UserAvatar({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#F2F4F7]">
      <Image src={avatar} alt={name} fill className="object-cover" />
    </div>
  );
}

type AdminUsersTableProps = {
  users: AdminUser[];
  showViewAll?: boolean;
  viewAllHref?: string;
};

export function AdminUsersTable({
  users,
  showViewAll = false,
  viewAllHref = "/admin/dashboard/users",
}: AdminUsersTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [page, pageSize, users]);

  const allVisibleSelected =
    paginatedUsers.length > 0 &&
    paginatedUsers.every((user) => selectedIds.has(user.id));

  function toggleAllVisible() {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (allVisibleSelected) {
        paginatedUsers.forEach((user) => next.delete(user.id));
      } else {
        paginatedUsers.forEach((user) => next.add(user.id));
      }
      return next;
    });
  }

  function toggleUser(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <section id="users" className="scroll-mt-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-[#101828]">Users</h2>
        {showViewAll ? (
          <Link
            href={viewAllHref}
            className="rounded-[8px] border border-[#EAECF0] bg-white px-4 py-2 text-sm font-medium text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#F9FAFB]"
          >
            View All
          </Link>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#EAECF0]">
                <th className="w-12 px-5 py-4">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleAllVisible}
                    aria-label="Select all users"
                    className="h-4 w-4 rounded border-[#D0D5DD] accent-[#2E3192]"
                  />
                </th>
                <th className="px-5 py-4 text-sm font-medium text-[#667085]">Name</th>
                <th className="px-5 py-4 text-sm font-medium text-[#667085]">
                  Email Address
                </th>
                <th className="hidden px-5 py-4 text-sm font-medium text-[#667085] md:table-cell">
                  Phone Number
                </th>
                <th className="px-5 py-4 text-sm font-medium text-[#667085]">
                  Date &amp; Time
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#EAECF0] last:border-b-0 hover:bg-[#FCFCFD]"
                >
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(user.id)}
                      onChange={() => toggleUser(user.id)}
                      aria-label={`Select ${user.name}`}
                      className="h-4 w-4 rounded border-[#D0D5DD] accent-[#2E3192]"
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} avatar={user.avatar} />
                      <span className="font-medium text-[#101828]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#667085]">{user.email}</td>
                  <td className="hidden px-5 py-4 text-[#667085] md:table-cell">
                    {user.phone}
                  </td>
                  <td className="px-5 py-4 text-[#667085]">{user.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#EAECF0] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-sm text-[#667085]">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
              className="rounded-[6px] border border-[#D0D5DD] bg-white px-2 py-1 text-[#344054] outline-none"
            >
              {[5, 10, 25].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center justify-center gap-1">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] text-[#667085] transition-colors hover:bg-[#F9FAFB] disabled:opacity-40"
              aria-label="Previous page"
            >
              ‹
            </button>
            {[1, 2, 3, 4, 5, "...", 10].map((item, index) =>
              typeof item === "number" ? (
                <button
                  key={`${item}-${index}`}
                  type="button"
                  onClick={() => setPage(item)}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-[6px] px-2 text-sm transition-colors ${
                    page === item
                      ? "bg-[#2E3192] text-white"
                      : "text-[#667085] hover:bg-[#F9FAFB]"
                  }`}
                >
                  {item}
                </button>
              ) : (
                <span key={`ellipsis-${index}`} className="px-1 text-[#98A2B3]">
                  {item}
                </span>
              ),
            )}
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] text-[#667085] transition-colors hover:bg-[#F9FAFB] disabled:opacity-40"
              aria-label="Next page"
            >
              ›
            </button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#EAECF0] bg-white px-4 py-2 text-sm font-medium text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#F9FAFB] lg:justify-start"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 2.5v7M5.5 7 8 9.5 10.5 7M3 12.5h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Export
          </button>
        </div>
      </div>
    </section>
  );
}
