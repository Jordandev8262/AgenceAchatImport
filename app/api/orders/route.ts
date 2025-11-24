import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { readAllOrders } from '@/lib/orders'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const orders = await readAllOrders()
  return NextResponse.json({ orders })
}


