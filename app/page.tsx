import Image from "next/image";
import { Company } from "@/types/Company";
import Config from "@/envVars";

// ✅ Hàm fetch company từ API route nội bộ
async function fetchAllCompanies(): Promise<Company[]> {
  try {
    const res = await fetch(`${Config.NEXT_PUBLIC_BASE_URL}/api/company`, {
      next: { revalidate: 60 }, // cache nhẹ
    });

    const data = await res.json();
    if (data.success && data.data) return data.data;
  } catch (err) {
    console.error("Error fetching companies:", err);
  }
  return [];
}

export default async function Home() {
  const companies = await fetchAllCompanies();
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-16 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">
        🌐 Demo Multi-Subdomain SSR
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {companies.map((c) => (
          <a
            key={c.slug}
            href={`http://${c.slug}-demo-multi-tenant-website.vercel.app`}
            className="group border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition"
          >
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={c.avatar}
                alt={c.name}
                fill
                className="size-full object-contain rounded-xl"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {c.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
              {c.bio}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
