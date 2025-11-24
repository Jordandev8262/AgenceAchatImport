'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiCreditCard, FiLock, FiCheck } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

export default function Paiement() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simuler le processus de paiement
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Générer un numéro de commande
    const orderNumber = `CMD-${Date.now()}`
    
    // Sauvegarder la commande dans localStorage
    const order = {
      id: orderNumber,
      items,
      total: total * 1.20,
      date: new Date().toISOString(),
      status: 'En attente',
    }
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))

    clearCart()
    setOrderPlaced(true)

    setTimeout(() => {
      router.push(`/suivi-commande?order=${orderNumber}`)
    }, 2000)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Commande confirmée !</h2>
            <p className="text-gray-600 mb-6">
              Votre paiement a été traité avec succès. Vous allez être redirigé vers le suivi de commande.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Paiement</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center space-x-2 mb-6">
                <FiLock className="text-blue-600" />
                <h2 className="text-2xl font-bold">Informations de paiement</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de carte
                  </label>
                  <div className="flex items-center space-x-2">
                    <FiCreditCard className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date d'expiration
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom sur la carte
                  </label>
                  <input
                    type="text"
                    value={formData.cardholderName}
                    onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold mb-4">Adresse de livraison</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ville
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Code postal
                        </label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
                >
                  {isProcessing ? 'Traitement...' : `Payer ${(total * 1.20).toFixed(2)}€`}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Résumé</h2>
              <div className="space-y-2 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{(item.price * item.quantity).toFixed(2)}€</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span>TVA</span>
                  <span>{(total * 0.20).toFixed(2)}€</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span className="text-blue-600">{(total * 1.20).toFixed(2)}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

