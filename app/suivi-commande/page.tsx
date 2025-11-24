'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiMapPin } from 'react-icons/fi'
import Link from 'next/link'

interface Order {
  id: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  total: number
  date: string
  status: string
}

const statusSteps = [
  { key: 'En attente', icon: FiClock, label: 'Commande reçue', color: 'bg-yellow-100 text-yellow-600' },
  { key: 'Confirmée', icon: FiCheckCircle, label: 'Commande confirmée', color: 'bg-blue-100 text-blue-600' },
  { key: 'En préparation', icon: FiPackage, label: 'En préparation', color: 'bg-purple-100 text-purple-600' },
  { key: 'Expédiée', icon: FiTruck, label: 'Expédiée', color: 'bg-orange-100 text-orange-600' },
  { key: 'Livrée', icon: FiMapPin, label: 'Livrée', color: 'bg-green-100 text-green-600' },
]

function SuiviCommandeContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')
  const [order, setOrder] = useState<Order | null>(null)
  const [allOrders, setAllOrders] = useState<Order[]>([])
  const [notifyEmail, setNotifyEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState<string | null>(null)
  const [sendError, setSendError] = useState<string | null>(null)

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    setAllOrders(orders)
    
    if (orderId) {
      const found = orders.find((o: Order) => o.id === orderId)
      if (found) {
        setOrder(found)
      }
    } else if (orders.length > 0) {
      setOrder(orders[orders.length - 1])
    }
  }, [orderId])

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex(step => step.key === status)
  }

  const sendStatusEmail = async () => {
    if (!order || !notifyEmail) return
    setSending(true)
    setSendSuccess(null)
    setSendError(null)
    try {
      const subject = `Mise à jour de votre commande #${order.id} — Statut: ${order.status}`
      const html = `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
          <h2>Bonjour,</h2>
          <p>Voici les informations de votre commande <strong>#${order.id}</strong> :</p>
          <ul>
            <li><strong>Statut actuel</strong> : ${order.status}</li>
            <li><strong>Total</strong> : ${order.total.toFixed(2)}€</li>
            <li><strong>Date</strong> : ${new Date(order.date).toLocaleString('fr-FR')}</li>
            <li><strong>Numéro de suivi</strong> : TRK-${order.id}</li>
            <li><strong>Transporteur</strong> : ImportPro Logistics</li>
          </ul>
          <p>Vous pouvez suivre votre commande à tout moment depuis la page Suivi de Commande.</p>
          <p>Merci pour votre confiance.</p>
        </div>
      `
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: notifyEmail, subject, html })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Envoi impossible')
      }
      setSendSuccess('Email envoyé avec succès')
    } catch (e: any) {
      setSendError(e?.message || 'Erreur lors de l\'envoi')
    } finally {
      setSending(false)
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Aucune commande trouvée</h1>
            <p className="text-gray-600 mb-8">Vous n'avez pas encore passé de commande.</p>
            <Link
              href="/catalogue"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Voir le Catalogue
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentStatusIndex = getStatusIndex(order.status)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Suivi de Commande</h1>

        {/* Order Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Commande #{order.id}</h2>
              <p className="text-gray-600">
                Passée le {new Date(order.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="text-right">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                statusSteps[currentStatusIndex >= 0 ? currentStatusIndex : 0].color
              }`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="relative">
            <div className="flex justify-between mb-8">
              {statusSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = index <= currentStatusIndex
                const isCurrent = index === currentStatusIndex
                
                return (
                  <div key={step.key} className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      isActive ? step.color : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className={`text-sm font-medium text-center ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-gray-500 mt-1">En cours</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Articles commandés</h3>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center pb-4 border-b last:border-0">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                </div>
                <p className="font-semibold">{(item.price * item.quantity).toFixed(2)}€</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-blue-600">{order.total.toFixed(2)}€</span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Informations de livraison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Numéro de suivi</p>
              <p className="font-semibold">TRK-{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Transporteur</p>
              <p className="font-semibold">ImportPro Logistics</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Date d'expédition estimée</p>
              <p className="font-semibold">
                {new Date(new Date(order.date).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Livraison estimée</p>
              <p className="font-semibold">
                {new Date(new Date(order.date).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold mb-2">Recevoir une notification par email</h4>
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <input
                type="email"
                placeholder="Votre email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendStatusEmail}
                disabled={sending || !notifyEmail}
                className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {sending ? 'Envoi…' : 'M\u00e9 envoyer l\'\u00e9tat par email'}
              </button>
            </div>
            {sendSuccess && <p className="text-green-600 text-sm mt-2">{sendSuccess}</p>}
            {sendError && <p className="text-red-600 text-sm mt-2">{sendError}</p>}
          </div>
        </div>

        {/* Other Orders */}
        {allOrders.length > 1 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Autres commandes</h2>
            <div className="space-y-4">
              {allOrders.filter(o => o.id !== order.id).map(ord => (
                <Link
                  key={ord.id}
                  href={`/suivi-commande?order=${ord.id}`}
                  className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Commande #{ord.id}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(ord.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{ord.total.toFixed(2)}€</p>
                      <p className="text-sm text-gray-600">{ord.status}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SuiviCommande() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <SuiviCommandeContent />
    </Suspense>
  )
}

