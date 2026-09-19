import { AdminDashboardHeader } from "@/components/admin-dashboard-header";
import { AdminSidebar } from "@/components/admin-sidebar";
import { requireAdminSession } from "@/lib/admin-server";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAdminSession();
  const adminLabel = session.email?.split("@")[0] ?? "Admin";

  return (
    <div className="flex min-h-screen bg-[#F3F4F9]">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminDashboardHeader adminLabel={adminLabel} />
        <main className="flex-1 overflow-auto px-4 pb-8 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
