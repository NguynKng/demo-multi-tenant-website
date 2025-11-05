import Image from "next/image";

const companies = [
  {
    name: "VNG Corporation",
    subdomain: "vng",
    logo: "/logos/vng-logo.png",
    description: "Công ty công nghệ hàng đầu Việt Nam.",
  },
  {
    name: "Zalo",
    subdomain: "zalo",
    logo: "/logos/zalo-logo.png",
    description: "Ứng dụng nhắn tin phổ biến nhất tại Việt Nam.",
  },
  {
    name: "Viettel",
    subdomain: "viettel",
    logo: "/logos/viettel-logo.jpg",
    description: "Nhà mạng viễn thông lớn nhất Việt Nam.",
  },
  {
    name: "Vingroup",
    subdomain: "vingroup",
    logo: "/logos/vingroup-logo.png",
    description: "Tập đoàn đa ngành lớn nhất Việt Nam.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-16 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">
        🌐 Demo Multi-Subdomain SSR
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {companies.map((c) => (
          <a
            key={c.subdomain}
            href={`http://${c.subdomain}-demo-multi-tenant-website.vercel.app`}
            className="group border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition"
          >
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={c.logo}
                alt={c.name}
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {c.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
              {c.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
