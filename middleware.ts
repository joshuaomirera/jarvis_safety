import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow access to login page
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Check if trying to access admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get the token from cookies
    const token = request.cookies.get('admin-token')

    // If no token found, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
