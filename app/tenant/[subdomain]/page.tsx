import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import Config from "@/envVars";
import { Company } from "@/types/Company";

interface Props {
  params: Promise<{ subdomain: string }>;
}

// ✅ Hàm fetch company từ API route nội bộ
async function fetchCompanyByTenant(tenant: string): Promise<Company | null> {
  if (!tenant) return null;

  try {
    const res = await fetch(
      `${Config.NEXT_PUBLIC_BASE_URL}/api/company?slug=${tenant}`,
      {
        next: { revalidate: 60 }, // cache nhẹ
      }
    );

    const data = await res.json();
    if (data.success && data.data) return data.data;
  } catch (err) {
    console.error("Error fetching company:", err);
  }
  return null;
}

// ✅ SSR Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subdomain } = await params;
  const company = await fetchCompanyByTenant(subdomain);

  const baseURL: string = String(Config.NEXT_PUBLIC_BASE_URL);

  if (!company) {
    return {
      metadataBase: new URL(baseURL),
      title: "Not Found | Landing Page",
      description: "Công ty không tồn tại.",
    };
  }

  return {
    metadataBase: new URL(baseURL),
    title: `${company.name} | Landing Page`,
    description: company.bio,
    icons: { icon: [{ url: company.avatar, type: "image/png" }] },
    openGraph: {
      title: company.name,
      description: company.bio,
      type: "website",
      images: [
        {
          url: company.avatar,
          width: 1200,
          height: 630,
          alt: company.name,
        },
      ],
      url: `${Config.NEXT_PUBLIC_BASE_URL}`,
      siteName: "LandingPage.com",
    },
    twitter: {
      card: "summary_large_image",
      title: company.name,
      description: company.bio,
      images: [
        {
          url: company.avatar,
          width: 1200,
          height: 630,
          alt: company.name,
        },
      ],
    },
  };
}

// ✅ SSR Page
export default async function TenantLandingPage({ params }: Props) {
  const { subdomain } = await params;
  const company = await fetchCompanyByTenant(subdomain);
  //console.log("Company Data:", company);

  if (!company) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Cover Section */}
      <section className="relative text-white py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 z-40">
          <Image
            src={company.coverPhoto}
            alt={company.name}
            fill
            loading="eager"
            sizes="full"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="max-w-3xl mx-auto relative z-50">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white mb-6 bg-white">
            <Image
              src={company.avatar}
              alt={company.name}
              fill
              loading="eager"
              sizes="full"
              className="size-full object-contain p-2"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
          <p className="text-lg opacity-90">{company.bio}</p>
          <a
            href={company.website}
            target="_blank"
            className="mt-6 inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Visit Website
          </a>
        </div>
      </section>

      {/* Skills & Interests */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Lĩnh vực hoạt động</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {company.skills.join(", ")}
          </p>

          <h2 className="text-3xl font-bold mt-8 mb-4">
            Định hướng & Mối quan tâm
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {company.interests.join(", ")}
          </p>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Kết nối với chúng tôi</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {company.socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Liên hệ</h2>
        <a
          href={`mailto:${company.email}`}
          className="inline-block bg-indigo-600 text-white font-semibold px-8 py-4 rounded-full shadow hover:bg-indigo-700 transition"
        >
          Gửi email tới {company.name}
        </a>
      </section>
    </main>
  );
}
