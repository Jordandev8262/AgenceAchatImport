'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { FiArrowLeft, FiPrinter } from 'react-icons/fi'

interface Invoice {
  id: string
  orderId: string
  date: string
  total: number
  status: 'payée' | 'en attente'
}

export default function InvoiceDetail({ params }: { params: { id: string } }) {
  const { id } = params
  const [invoice, setInvoice] = useState<Invoice | null>(null)

  useEffect(() => {
    const savedInvoices = localStorage.getItem('invoices')
    if (savedInvoices) {
      const list: Invoice[] = JSON.parse(savedInvoices)
      const found = list.find((i) => i.id === id) || null
      setInvoice(found)
    }
  }, [id])

  const formattedDate = useMemo(() => {
    return invoice ? new Date(invoice.date).toLocaleDateString('fr-FR') : ''
  }, [invoice])

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-700 mb-6">Facture introuvable.</p>
            <Link href="/espace-client" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <FiArrowLeft />
              <span>Retour à l'espace client</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Link href="/espace-client" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <FiArrowLeft />
            <span>Retour</span>
          </Link>
          <button
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => window.print()}
          >
            <FiPrinter />
            <span>Imprimer</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Facture #{invoice.id}</h1>
              <p className="text-gray-600">Date: {formattedDate}</p>
              <p className="text-gray-600">Commande liée: #{invoice.orderId}</p>
            </div>
            <div className="text-right">
              <p className={`font-semibold capitalize ${invoice.status === 'payée' ? 'text-green-600' : 'text-yellow-600'}`}>{invoice.status}</p>
              <p className="text-2xl font-bold text-blue-600">{invoice.total.toFixed(2)}€</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Détails de la facture</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-600">
                    <th className="py-2">Description</th>
                    <th className="py-2">Quantité</th>
                    <th className="py-2">Prix unitaire</th>
                    <th className="py-2">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-2">Produits de la commande #{invoice.orderId}</td>
                    <td className="py-2">1</td>
                    <td className="py-2">{invoice.total.toFixed(2)}€</td>
                    <td className="py-2">{invoice.total.toFixed(2)}€</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


