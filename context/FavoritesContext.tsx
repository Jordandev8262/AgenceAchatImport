'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface FavoritesContextType {
  favorites: Set<string>
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
  favoritesCount: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Charger les favoris depuis localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      try {
        const favoriteIds = JSON.parse(saved) as string[]
        setFavorites(new Set(favoriteIds))
      } catch (error) {
        console.error('Error loading favorites:', error)
      }
    }
  }, [])

  // Sauvegarder les favoris dans localStorage à chaque changement
  useEffect(() => {
    if (favorites.size > 0 || localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)))
    }
  }, [favorites])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const isFavorite = (productId: string) => {
    return favorites.has(productId)
  }

  const favoritesCount = favorites.size

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return context
}

