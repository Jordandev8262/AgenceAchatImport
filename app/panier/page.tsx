'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiTrash2, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function Panier() {
  const { items, removeFromCart, updateQuantity, total } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = () => {
    setIsProcessing(true)
    // Simuler le processus de commande
    setTimeout(() => {
      router.push('/paiement')
    }, 500)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">Ajoutez des produits pour commencer</p>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Mon Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-3xl overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      '📦'
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600 mt-1">{item.price}€ par unité</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                      <FiMinus />
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">
                      {(item.price * item.quantity).toFixed(2)}€
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-red-600 hover:text-red-800 transition"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Résumé de commande</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-green-600">Gratuite</span>
                </div>
                <div className="flex justify-between">
                  <span>TVA</span>
                  <span>{(total * 0.20).toFixed(2)}€</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">{(total * 1.20).toFixed(2)}€</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>Procéder au paiement</span>
                <FiArrowRight />
              </button>
              <Link
                href="/catalogue"
                className="block text-center mt-4 text-blue-600 hover:text-blue-800"
              >
                Continuer les achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

