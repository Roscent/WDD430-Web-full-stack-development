// middleware.ts
import { auth } from '@/app/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Redirect to login if accessing dashboard without session
  if (isDashboardPage && !session?.user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Optional: redirect to dashboard if already logged in and trying to access login
  if (isLoginPage && session?.user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};