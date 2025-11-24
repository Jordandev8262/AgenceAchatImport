import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SignInContent from './sign-in-client'

export default async function AdminSignInPage() {
  const session = await getServerSession(authOptions)
  if (session?.user?.isAdmin) {
    redirect('/admin')
  }

  return <SignInContent />
}


