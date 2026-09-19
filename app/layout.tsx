import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { HashScroll } from "@/components/hash-scroll";
import { SiteAnalytics } from "@/components/site-analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Story Tree",
  description: "A Global Audience Participation & Equity Platform for African & Diasporic Cinema.",
  icons: {
    icon: "/storyTreeLogo.svg",
  },
  openGraph: {
    title: "Story Tree",
    description: "A Global Audience Participation & Equity Platform for African & Diasporic Cinema.",
    images: "/storyTreeLogo.svg",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <HashScroll />
        <SiteAnalytics />
        {children}
      </body>
    </html>
  );
}
