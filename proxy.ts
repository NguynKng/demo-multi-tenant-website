// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0]; // bỏ port khi local

  // Bỏ qua các request nội bộ
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/favicon.ico") ||
    url.pathname.startsWith("/logos")
  ) {
    return NextResponse.next();
  }

  // Lấy subdomain cho local & vercel
  let subdomain = "";

  // 🔹 Local: aa.localhost
  if (hostname.endsWith(".localhost")) {
    subdomain = hostname.replace(".localhost", "");
  }

  // 🔹 Vercel: aa.vercel.app
  else if (hostname.endsWith(".vercel.app")) {
    subdomain = hostname.replace(".vercel.app", "");
  }

  // 🔹 Custom domain (nếu có): aa.mydomain.com
  else if (hostname.endsWith(".mydomain.com")) {
    subdomain = hostname.replace(".mydomain.com", "");
  }

  if (subdomain && subdomain !== "www" && subdomain !== "localhost") {
    url.pathname = `/tenant/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Áp dụng cho tất cả route trừ static và API
    "/((?!_next|api|favicon.ico|logos).*)",
  ],
}
