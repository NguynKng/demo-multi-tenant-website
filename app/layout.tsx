import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Demo Multi-Tenant Website",
  description:
    "A demo website showcasing multi-tenant architecture with Next.js",
  openGraph: {
    title: "Demo Multi-Tenant Website",
    description:
      "A demo website showcasing multi-tenant architecture with Next.js",
    url: "https://demo-multi-tenant-website.vercel.app",
    type: "website",
    siteName: "MultiTenantDemo",
    images: ["/logos/reactjs.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Demo Multi-Tenant Website",
    description:
      "A demo website showcasing multi-tenant architecture with Next.js",
    images: ["/logos/reactjs.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
