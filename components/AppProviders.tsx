'use client'

import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '@/context/CartContext'
import { FavoritesProvider } from '@/context/FavoritesContext'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </CartProvider>
    </SessionProvider>
  )
}


