import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwtToken")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/register", "/courses", "/forgot-password"]
  const isPublicRoute = publicRoutes.some(
    (route) => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith("/courses/"),
  )

  //Accessing a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }
console.log(token)
  // If no token and trying to access protected route, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Role-based route protection
  const pathname = request.nextUrl.pathname

  // Admin routes
  if (pathname.startsWith("/admin")) {
    // In a real app, you'd decode the JWT to check the role
    // For now, we'll assume the token is valid
    return NextResponse.next()
  }

  // Instructor routes
  if (pathname.startsWith("/instructor")) {
    return NextResponse.next()
  }

  // Student routes
  if (pathname.startsWith("/student")) {
    console.log("accessing student")
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
