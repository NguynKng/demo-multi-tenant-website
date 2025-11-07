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
    siteName: "MultiTenantDemo",
    images: [
      "https://www.google.com/imgres?q=ronaldo&imgurl=https%3A%2F%2Fmedia.gettyimages.com%2Fid%2F2178130283%2Fphoto%2Fwarsaw-poland-cristiano-ronaldo-reacts-after-scoring-his-team-second-goal-during-the-uefa.jpg%3Fs%3D612x612%26w%3Dgi%26k%3D20%26c%3DmHaCpH0Yf1g2H1R6peclOX326t2xd5ZBdORGif0rQoo%3D&imgrefurl=https%3A%2F%2Fwww.gettyimages.com%2Fphotos%2Fcristiano-ronaldo-soccer-player&docid=Pg2EANLv_XuUmM&tbnid=Jt_CUI_q-w-RaM&vet=12ahUKEwiIs-rsseCQAxVYg1YBHc8gAb4QM3oECBoQAA..i&w=612&h=408&hcb=2&ved=2ahUKEwiIs-rsseCQAxVYg1YBHc8gAb4QM3oECBoQAA",
    ],
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
