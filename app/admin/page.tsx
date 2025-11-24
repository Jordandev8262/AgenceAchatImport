import { redirect } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { readAllOrders } from '@/lib/orders'
import AdminOrdersClient from './AdminOrdersClient'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  noStore()

  let session: Awaited<ReturnType<typeof getServerSession>> = null
  try {
    session = await getServerSession(authOptions)
  } catch (err) {
    console.error('[admin:getServerSession:error]', err)
    redirect('/admin/sign-in')
  }

  const isAdmin = Boolean((session as any)?.user?.isAdmin)
  if (!isAdmin) {
    redirect('/admin/sign-in')
  }

  // 3) Tolérer une erreur lors de la lecture des commandes et fournir un fallback
  let orders = [] as Awaited<ReturnType<typeof readAllOrders>>
  try {
    orders = await readAllOrders()
  } catch (err) {
    console.error('[admin:readAllOrders:error]', err)
    orders = []
  }

  return (
    <AdminOrdersClient
      adminEmail={(session as any)?.user?.email ?? ''}
      initialOrders={orders}
    />
  )
}


