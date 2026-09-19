import type { Metadata } from "next";
import { Suspense } from "react";

import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Login | Story Tree",
};

export default function AdminLoginPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-16"
      style={{
        background:
          "linear-gradient(180deg, #FDFBF7 0%, #F5EDD8 45%, #E2B45F 100%)",
      }}
    >
      <Suspense fallback={<div className="text-sm text-[#171717]/70">Loading...</div>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
