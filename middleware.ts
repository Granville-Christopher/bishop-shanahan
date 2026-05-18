import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "default_super_secret_key_change_me_in_production";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run middleware for admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Paths that don't require authentication
  const isAuthRoute = pathname === "/admin/login" || pathname === "/admin/register";

  const token = request.cookies.get("admin_session")?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      isAuthenticated = true;
    } catch (error) {
      isAuthenticated = false;
    }
  }

  if (isAuthRoute) {
    if (isAuthenticated) {
      // Redirect authenticated users trying to access login/register to admin dashboard
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
