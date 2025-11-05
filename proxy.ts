// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0];

  // Bỏ qua file tĩnh & API
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/favicon.ico") ||
    url.pathname.startsWith("/logos")
  ) {
    return NextResponse.next();
  }

  let subdomain = "";

  // 🧩 Localhost mode: vng.localhost:3000
  if (hostname.endsWith(".localhost")) {
    subdomain = hostname.replace(".localhost", "");
  }

  // 🧩 Vercel deploy mode:
  // demo-multi-tenant-website.vercel.app  → subdomain = ""
  // vng-demo-multi-tenant-website.vercel.app → subdomain = "vng"
  else if (hostname.endsWith(".vercel.app")) {
    // Lấy phần đầu trước tên chính của project
    // vd: vng-demo-multi-tenant-website.vercel.app → vng
    const parts = hostname.split(".vercel.app")[0].split("-");
    const maybeTenant = parts[0];
    if (maybeTenant && maybeTenant !== "demo") {
      subdomain = maybeTenant; // vng, zalo, tiki, ...
    }
  }

  // 🔀 Rewrite sang route tương ứng
  if (subdomain && subdomain !== "www" && subdomain !== "localhost") {
    url.pathname = `/tenant/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|logos).*)"],
};
