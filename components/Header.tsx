'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiHeart } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const { favoritesCount } = useFavorites()
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base md:text-xl">I</span>
            </div>
            <span className="text-base md:text-xl font-bold text-gray-900">DigiShop France</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Accueil
            </Link>
            <Link href="/catalogue" className="text-gray-700 hover:text-blue-600 transition">
              Catalogue
            </Link>
            <Link href="/partenaires" className="text-gray-700 hover:text-blue-600 transition">
              Partenaires
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>
            <Link
              href="/admin"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {session?.user?.isAdmin ? 'Administration' : 'Connexion admin'}
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/catalogue" className="p-2 text-gray-700 hover:text-blue-600">
              <FiSearch className="w-5 h-5" />
            </Link>
            <Link href="/favoris" className="relative p-2 text-gray-700 hover:text-red-600 transition-colors">
              <FiHeart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link href="/panier" className="relative p-2 text-gray-700 hover:text-blue-600">
              <FiShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link href="/espace-client" className="p-2 text-gray-700 hover:text-blue-600">
              <FiUser className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col space-y-2 p-4">
            <Link href="/" className="py-2 text-gray-700 hover:text-blue-600">
              Accueil
            </Link>
            <Link href="/catalogue" className="py-2 text-gray-700 hover:text-blue-600">
              Catalogue
            </Link>
            <Link href="/partenaires" className="py-2 text-gray-700 hover:text-blue-600">
              Partenaires
            </Link>
            <Link href="/contact" className="py-2 text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            <Link href="/admin" className="py-2 text-gray-700 hover:text-blue-600">
              {session?.user?.isAdmin ? 'Administration' : 'Connexion admin'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

