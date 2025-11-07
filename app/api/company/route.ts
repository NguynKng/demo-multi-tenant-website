import { getAllCompanies, getCompanyBySlug } from "@/services/companyApi";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const companyResponse = await getCompanyBySlug(slug);
    return new Response(JSON.stringify(companyResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const companiesResponse = await getAllCompanies();
  return new Response(JSON.stringify(companiesResponse), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
