import type { Metadata } from "next";

import { AdminPageWelcome } from "@/components/admin-page-welcome";
import { AdminUsersTable } from "@/components/admin-users-table";
import { getAdminUsers } from "@/lib/firebase/dashboard";

export const metadata: Metadata = {
  title: "Users | Story Tree Admin",
};

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <div className="space-y-8">
      <AdminPageWelcome />
      <AdminUsersTable users={users} showViewAll />
    </div>
  );
}
