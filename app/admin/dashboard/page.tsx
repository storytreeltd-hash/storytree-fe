import type { Metadata } from "next";

import { AdminPageWelcome } from "@/components/admin-page-welcome";
import { AdminStatCards } from "@/components/admin-stat-cards";
import { AdminUsersTable } from "@/components/admin-users-table";
import { getAdminDashboardStats, getAdminUsers } from "@/lib/firebase/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Story Tree Admin",
};

export default async function AdminDashboardPage() {
  const [stats, users] = await Promise.all([
    getAdminDashboardStats(),
    getAdminUsers(5),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageWelcome />
      <AdminStatCards stats={stats} />
      <AdminUsersTable
        users={users}
        showViewAll
        viewAllHref="/admin/dashboard/users"
      />
    </div>
  );
}
