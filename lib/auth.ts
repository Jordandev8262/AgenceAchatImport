import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'super@digishop.local'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'Admin2025'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase() ?? ''
        const password = credentials?.password ?? ''

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          return {
            id: 'admin',
            name: 'Super Admin',
            email: ADMIN_EMAIL,
            isAdmin: true,
          }
        }
        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = Boolean((user as any).isAdmin)
        token.email = (user as any).email?.toLowerCase() ?? token.email ?? null
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = Boolean(token.isAdmin)
        if (token.email) {
          session.user.email = token.email
        }
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Ne rediriger que vers le même domaine (évite les boucles ou URL externes)
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith('/')) return `${baseUrl}${url}`
      return baseUrl
    },
  },
  // Autoriser les hôtes dynamiques/prévisualisations (Vercel) si NEXTAUTH_URL n'est pas défini
  trustHost: true,
  // Logger conforme aux signatures NextAuth (code, ...args)
  logger: {
    error: (code, ...args) => console.error('[next-auth:error]', code, ...args),
    warn: (code, ...args) => console.warn('[next-auth:warn]', code, ...args),
    debug: (code, ...args) => {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[next-auth:debug]', code, ...args)
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? (process.env.NODE_ENV !== 'production' ? 'dev-secret' : undefined),
}


