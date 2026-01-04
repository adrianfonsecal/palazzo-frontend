// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Leemos la cookie que guardamos con js-cookie
  const token = request.cookies.get('access_token'); 

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || 
                           request.nextUrl.pathname.startsWith('/guests');

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Definimos en qué rutas se ejecuta el middleware para no gastar recursos
  matcher: ['/dashboard/:path*', '/guests/:path*'],
};
