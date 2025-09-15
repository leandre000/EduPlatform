import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwtToken")?.value || request.headers.get("authorization")?.replace("Bearer ", "")
  const pathname = request.nextUrl.pathname

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/register", "/forgot-password"]
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/courses/") || pathname.startsWith("/api/")
  )

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Basic token validation (in production, you'd decode and verify the JWT)
  if (token.startsWith("demo-")) {
    // Demo token - allow access but let the client-side handle role validation
    return NextResponse.next()
  }

  // For real tokens, you would:
  // 1. Decode the JWT
  // 2. Verify the signature
  // 3. Check expiration
  // 4. Extract user role
  // 5. Validate role-based access

  // Role-based route protection (basic implementation)
  if (pathname.startsWith("/admin")) {
    // In production, verify the token contains ADMIN role
    return NextResponse.next()
  }

  if (pathname.startsWith("/instructor")) {
    // In production, verify the token contains INSTRUCTOR or ADMIN role
    return NextResponse.next()
  }

  if (pathname.startsWith("/student")) {
    // In production, verify the token contains STUDENT, INSTRUCTOR, or ADMIN role
    return NextResponse.next()
  }

  // For any other protected routes, allow access if token exists
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
