import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import Config from "@/envVars";

const COMPANY_DATA: Record<string, any> = {
  vng: {
    fullName: "VNG Corporation",
    bio: "Công ty công nghệ hàng đầu Việt Nam với các sản phẩm nổi bật như Zalo, Zing, 123Pay.",
    website: "https://vng.com.vn",
    avatar: "/logos/vng-logo.png",
    coverPhoto: "/covers/vng-cover.jpg",
    skills: ["Công nghệ", "Phần mềm", "Game", "AI"],
    interests: ["Đổi mới sáng tạo", "Chuyển đổi số", "Startup"],
    socialLinks: [
      { platform: "Facebook", url: "https://www.facebook.com/vngcorp" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/company/vng-corporation/" },
    ],
    email: "contact@vng.com.vn",
  },
  zalo: {
    fullName: "Zalo - Ứng dụng nhắn tin Việt Nam",
    bio: "Nền tảng nhắn tin, gọi điện và mạng xã hội với hàng chục triệu người dùng.",
    website: "https://zalo.me",
    avatar: "/logos/zalo-logo.png",
    coverPhoto: "/covers/zalo-cover.webp",
    skills: ["Chat", "Voice Call", "Video Call", "Social"],
    interests: ["Công nghệ di động", "Bảo mật", "Trải nghiệm người dùng"],
    socialLinks: [
      { platform: "Facebook", url: "https://www.facebook.com/Zaloapp" },
      { platform: "Website", url: "https://zalo.me" },
    ],
    email: "support@zalo.me",
  },
  viettel: {
    fullName: "Tập đoàn Công nghiệp – Viễn thông Quân đội (Viettel)",
    bio: "Nhà mạng viễn thông lớn nhất Việt Nam, tiên phong trong chuyển đổi số và nghiên cứu công nghệ.",
    website: "https://viettel.com.vn",
    avatar: "/logos/viettel-logo.jpg",
    coverPhoto: "/covers/viettel-cover.png",
    skills: ["Viễn thông", "Công nghệ 5G", "IoT", "AI"],
    interests: ["Kết nối toàn cầu", "Đổi mới sáng tạo", "Quốc phòng"],
    socialLinks: [
      { platform: "Facebook", url: "https://www.facebook.com/Vietteltelecom.vn" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/company/viettel/" },
    ],
    email: "info@viettel.com.vn",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const tenant = Config.TENANT; // 👈 Lấy từ môi trường
  const company = tenant ? COMPANY_DATA[tenant] : null;
  console.log("Generating metadata for tenant:", tenant);

  if (!company) {
    return {
      title: "Not Found | Landing Page",
      description: "Công ty không tồn tại.",
    };
  }

  return {
    title: `${company.fullName} | Landing Page`,
    description: company.bio,
    icons: {
      icon: [{ url: company.avatar, type: "image/png" }], // 👈 icon theo từng tenant
    },
    openGraph: {
      title: company.fullName,
      description: company.bio,
      images: [company.coverPhoto],
      url: `https://${tenant}.landingpage.com`,
      siteName: "LandingPage.com",
    },
    twitter: {
      card: "summary_large_image",
      title: company.fullName,
      description: company.bio,
      images: [company.coverPhoto],
    },
  };
}

export default async function TenantLandingPage() {
  const tenant = Config.TENANT; // 👈 Lấy từ biến môi trường
  const company = tenant ? COMPANY_DATA[tenant] : null;

  if (!company) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Cover Image */}
      <section className="relative text-white py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 z-40">
          <Image
            src={company.coverPhoto}
            alt={company.fullName}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-50">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white mb-6 bg-white">
            <Image
              src={company.avatar}
              alt={company.fullName}
              fill
              sizes="128px"
              className="object-contain p-2"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">{company.fullName}</h1>
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
          <p className="text-gray-700 dark:text-gray-300">{company.skills.join(", ")}</p>

          <h2 className="text-3xl font-bold mt-8 mb-4">Định hướng & Mối quan tâm</h2>
          <p className="text-gray-700 dark:text-gray-300">{company.interests.join(", ")}</p>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Kết nối với chúng tôi</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {company.socialLinks.map((link: any, idx: number) => (
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
          Gửi email tới {company.fullName}
        </a>
      </section>
    </main>
  );
}
