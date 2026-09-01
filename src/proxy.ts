import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define route matching
const protectedRoutes = ['/create-job', '/care-request'];
const authRoutes = ['/login', '/register', '/welcome'];
const giverOnlyRoutes: string[] = [];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // NOTE: For a real app, you would verify the token via a session cookie or JWT payload here.
  // We're just checking if a generic 'token' cookie exists.
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  const isGiverOnlyRoute = giverOnlyRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Giver-only route protection: redirect if user is not a giver
  if (isGiverOnlyRoute && role !== 'giver') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
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
