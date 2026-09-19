import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Story Tree",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen font-inter text-[#171717]">{children}</div>
  );
}
