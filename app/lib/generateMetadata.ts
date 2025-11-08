import { Metadata } from "next";
import Config from "@/envVars";
import { Company } from "@/types/Company";

export async function buildCompanyMetadata(
  company: Company
): Promise<Metadata> {
  const baseURL: string = String(Config.NEXT_PUBLIC_BASE_URL);
  return {
    metadataBase: new URL(baseURL),
    title: `${company.name} | Landing Page`,
    description: company.bio,
    icons: {
      icon: [{ url: company.avatar, type: "image/png" }],
    },
    openGraph: {
      title: company.name,
      description: company.bio,
      type: "website",
      url: Config.NEXT_PUBLIC_BASE_URL,
      siteName: "LandingPage.com",
      images: [
        {
          url: company.avatar,
          width: 1200,
          height: 630,
          alt: `${company.name} avatar`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: company.name,
      description: company.bio,
      images: [company.avatar],
    },
  };
}
