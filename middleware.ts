import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Laisser passer la page de connexion elle-même
  if (pathname.startsWith('/admin/sign-in')) {
    return NextResponse.next()
  }

  // Récupérer le token JWT NextAuth
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? (process.env.NODE_ENV !== 'production' ? 'dev-secret' : undefined),
  })

  // Autoriser uniquement les admins
  if (token?.isAdmin) {
    return NextResponse.next()
  }

  // Rediriger vers la page de connexion admin
  const signInUrl = new URL('/admin/sign-in', req.url)
  return NextResponse.redirect(signInUrl)
}

// Activer le middleware sur toutes les routes /admin
export const config = {
  matcher: ['/admin/:path*'],
}