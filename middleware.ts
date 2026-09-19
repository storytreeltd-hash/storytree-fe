import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE, isValidAdminSessionValue } from "@/lib/admin-auth";

function applyAdminSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "same-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = await isValidAdminSessionValue(session);

  if (pathname === "/admin") {
    return applyAdminSecurityHeaders(
      NextResponse.redirect(
        new URL(
          isAuthenticated ? "/admin/dashboard" : "/admin/login",
          request.url,
        ),
      ),
    );
  }

  if (pathname === "/admin/login" && isAuthenticated) {
    return applyAdminSecurityHeaders(
      NextResponse.redirect(new URL("/admin/dashboard", request.url)),
    );
  }

  const isProtectedAdminRoute =
    pathname.startsWith("/admin/") && pathname !== "/admin/login";

  if (isProtectedAdminRoute && !isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return applyAdminSecurityHeaders(NextResponse.redirect(loginUrl));
  }

  return applyAdminSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
