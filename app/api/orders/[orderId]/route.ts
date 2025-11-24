import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { OrderStatus, updateOrderStatus } from '@/lib/orders'

export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { orderId } = params
  let status: OrderStatus | undefined

  try {
    const body = await request.json()
    status = body?.status
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }

  if (!status) {
    return NextResponse.json({ error: 'Statut requis' }, { status: 400 })
  }

  const validStatuses: OrderStatus[] = ['En attente', 'Confirmée', 'En préparation', 'Expédiée', 'Livrée']
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Statut inconnu' }, { status: 400 })
  }

  const updated = await updateOrderStatus(orderId, status)
  if (!updated) {
    return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })
  }

  return NextResponse.json({ order: updated })
}


