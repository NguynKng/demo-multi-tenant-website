import { getAllCompanies, getCompanyBySlug } from "@/services/companyApi";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  // ✅ Nếu có slug → lấy 1 company
  if (slug) {
    const companyResponse = await getCompanyBySlug(slug);
    return new Response(JSON.stringify(companyResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ✅ Nếu không có slug → lấy tất cả
  const companiesResponse = await getAllCompanies();
  return new Response(JSON.stringify(companiesResponse), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
