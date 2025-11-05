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

  // ✅ Localhost (vd: vng.localhost:3000)
  if (hostname.endsWith(".localhost")) {
    subdomain = hostname.replace(".localhost", "");
  }

  // ✅ Vercel (vd: vng.demo-multi-tenant-website.vercel.app)
  else if (hostname.endsWith(".vercel.app")) {
    subdomain = hostname.replace(".demo-multi-tenant-website.vercel.app", "");
  }

  if (subdomain && subdomain !== "www" && subdomain !== "localhost") {
    url.pathname = `/tenant/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|logos).*)"],
};
