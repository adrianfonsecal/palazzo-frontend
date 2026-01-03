// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Verificar si existe cookie de autenticación
  const token = request.cookies.get('access_token') 

  // Si intenta entrar a ruta protegida sin token -> Login
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}