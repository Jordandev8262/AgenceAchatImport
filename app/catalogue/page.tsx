'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiShoppingCart, FiFilter, FiX, FiPlus, FiMinus, FiHeart, FiEye, FiStar, FiGrid, FiList, FiLayers, FiSmartphone, FiPackage, FiHome, FiActivity, FiDroplet, FiMonitor, FiTool, FiCoffee } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { products, Product } from '@/lib/products'

const categories = ['Tous', 'Électronique', 'Textile', 'Construction', 'Médical', 'Cosmétique', 'Mobilier', 'Outillage', 'Alimentaire']

const categoryIcons: Record<string, any> = {
  'Tous': FiLayers,
  'Électronique': FiSmartphone,
  'Textile': FiPackage,
  'Construction': FiHome,
  'Médical': FiActivity,
  'Cosmétique': FiDroplet,
  'Mobilier': FiMonitor,
  'Outillage': FiTool,
  'Alimentaire': FiCoffee,
}

type ViewMode = 'grid' | 'list'
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc'

export default function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortOption, setSortOption] = useState<SortOption>('default')
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name-asc':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })


  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product)
    setSelectedColor(product.colors?.[0] || '')
    setQuantity(1)
  }

  const handleCloseDetails = () => {
    setSelectedProduct(null)
    setSelectedColor('')
    setQuantity(1)
  }

  const handleAddToCartFromModal = () => {
    if (selectedProduct) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          image: selectedProduct.image,
        })
      }
      handleCloseDetails()
    }
  }

  // Fermer la modal avec la touche Échap
  useEffect(() => {
    if (!selectedProduct) return
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseDetails()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [selectedProduct])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Version Mobile: Catégories verticales à gauche */}
      <div className="md:hidden flex h-screen">
        {/* Sidebar Catégories */}
        <div className="w-24 bg-white border-r border-gray-200 overflow-y-auto">
          {categories.map(category => {
            const Icon = categoryIcons[category]
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full flex flex-col items-center justify-center py-4 px-2 transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-b from-blue-600 to-purple-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${selectedCategory === category ? 'text-white' : 'text-gray-600'}`} />
                <span className={`text-xs text-center leading-tight ${selectedCategory === category ? 'text-white font-semibold' : 'text-gray-600'}`}>
                  {category}
                </span>
              </button>
            )
          })}
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header mobile */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 shadow-lg">
            <h1 className="text-xl font-bold">Catégories</h1>
            <p className="text-sm text-blue-100 mt-1">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Barre de recherche mobile */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher sur DigiShop"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Liste des produits mobile */}
          <div className="flex-1 overflow-y-auto bg-white p-4">
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="flex gap-3 p-3">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      {product.image.startsWith('/') ? (
                        <Image
                          src={product.image}
                          alt={product.alt || product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          {product.image}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
                        {product.id} {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {product.price}
                        </span>
                        <span className="text-xs text-gray-500">€ / unité</span>
                      </div>
                      <button
                        onClick={() => addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        })}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold py-2 px-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm active:scale-95"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <FiFilter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucun produit trouvé</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Version Desktop: Structure originale */}
      <div className="hidden md:block py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header avec statistiques */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Catalogue Produits
                </h1>
                <p className="text-gray-600">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
                </p>
              </div>
              
              {/* Contrôles de vue et tri */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-label="Vue grille"
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-label="Vue liste"
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
                
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                >
                  <option value="default">Trier par défaut</option>
                  <option value="price-asc">Prix : croissant</option>
                  <option value="price-desc">Prix : décroissant</option>
                  <option value="name-asc">Nom : A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Barre de recherche et filtres améliorée */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-8 backdrop-blur-sm bg-white/95">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Rechercher un produit, une catégorie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                />
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            {/* Catégories avec design amélioré */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const Icon = categoryIcons[category]
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

        {/* Products Grid/List View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Image Container avec overlay */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
                  {product.image.startsWith('/') ? (
                    <Image
                      src={product.image}
                      alt={product.alt || product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {product.image}
                    </div>
                  )}
                  
                  {/* Overlay avec actions rapides */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                      <button
                        onClick={() => handleOpenDetails(product)}
                        className="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-white transition-all transform hover:scale-105 flex items-center justify-center gap-1.5"
                      >
                        <FiEye className="w-4 h-4" />
                        Voir
                      </button>
                      <button
                        onClick={() => addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        })}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center gap-1.5 shadow-lg"
                      >
                        <FiShoppingCart className="w-4 h-4" />
                        Ajouter
                      </button>
                    </div>
                  </div>
                  
                  {/* Badge catégorie */}
                  <div className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-gray-900 border border-gray-200/50 shadow-sm">
                    {product.category}
                  </div>
                  
                  {/* Bouton favori */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
                      isFavorite(product.id)
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-white/95 text-gray-600 hover:bg-white'
                    }`}
                    aria-label="Ajouter aux favoris"
                  >
                    <FiHeart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  
                  {/* Prix avec design moderne */}
                  <div className="absolute bottom-3 right-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold px-3 py-1.5 shadow-xl">
                    {product.price}€
                  </div>
                </div>
                
                {/* Contenu de la carte */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors min-h-[3rem]">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed min-h-[2.5rem]">
                    {product.description}
                  </p>
                  
                  {/* Étoiles de notation (simulées) */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      })}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                      Panier
                    </button>
                    <button
                      onClick={() => handleOpenDetails(product)}
                      className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all"
                      aria-label={`Voir détails pour ${product.name}`}
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Vue liste */
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    {product.image.startsWith('/') ? (
                      <Image
                        src={product.image}
                        alt={product.alt || product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 256px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        {product.image}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-2">
                            {product.category}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className={`p-2 rounded-full transition-all ${
                            isFavorite(product.id)
                              ? 'text-red-500'
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <FiHeart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">(4.0)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {product.price}€
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenDetails(product)}
                          className="px-4 py-2 border-2 border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all"
                        >
                          <FiEye className="w-4 h-4 inline mr-2" />
                          Détails
                        </button>
                        <button
                          onClick={() => addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          })}
                          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                        >
                          <FiShoppingCart className="w-4 h-4 inline mr-2" />
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <FiFilter className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche ou de filtrer par une autre catégorie.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('Tous')
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Modal Détails Produit améliorée */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity duration-200"
          onClick={handleCloseDetails}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec bouton fermer amélioré */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center z-10 shadow-lg">
              <h2 className="text-2xl font-bold text-white">Détails du produit</h2>
              <button
                onClick={handleCloseDetails}
                className="p-2 hover:bg-white/20 rounded-full transition-all text-white hover:rotate-90"
                aria-label="Fermer"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Contenu Modal avec scroll */}
            <div className="overflow-y-auto flex-1">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image du produit améliorée */}
                  <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 shadow-lg group">
                    {selectedProduct.image.startsWith('/') ? (
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.alt || selectedProduct.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-8xl">
                        {selectedProduct.image}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Informations du produit améliorées */}
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                        {selectedProduct.category}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {selectedProduct.name}
                    </h3>
                    
                    {/* Notation */}
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-5 h-5 ${
                            i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">4.0 (128 avis)</span>
                    </div>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {selectedProduct.price}€
                      </span>
                      <span className="text-sm text-gray-500 ml-2">TTC</span>
                    </div>

                    {/* Description améliorée */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <h4 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                        Description
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* Palette de couleurs améliorée */}
                    {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                          Couleurs disponibles
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedProduct.colors.map((color, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedColor(color)}
                              className={`w-12 h-12 rounded-full border-4 transition-all transform hover:scale-110 ${
                                selectedColor === color
                                  ? 'border-blue-600 scale-110 shadow-xl ring-4 ring-blue-200 ring-opacity-50'
                                  : 'border-gray-300 hover:border-gray-400 shadow-md'
                              }`}
                              style={{ backgroundColor: color }}
                              aria-label={`Sélectionner la couleur ${color}`}
                              title={color}
                            />
                          ))}
                        </div>
                        {selectedColor && (
                          <p className="mt-3 text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg inline-block">
                            Couleur sélectionnée: <span className="font-semibold text-blue-700">{selectedColor}</span>
                          </p>
                        )}
                      </div>
                    )}

                    {/* Quantité améliorée */}
                    <div className="mb-6">
                      <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                        Quantité
                      </h4>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-3 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-700 hover:text-blue-600"
                          aria-label="Diminuer la quantité"
                        >
                          <FiMinus className="w-5 h-5" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 text-center text-xl font-bold border-2 border-gray-300 rounded-xl py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-3 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-700 hover:text-blue-600"
                          aria-label="Augmenter la quantité"
                        >
                          <FiPlus className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Total: <span className="font-bold text-blue-600">{selectedProduct.price * quantity}€</span>
                      </p>
                    </div>

                    {/* Bouton Ajouter au panier amélioré */}
                    <button
                      onClick={handleAddToCartFromModal}
                      className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      Ajouter au panier ({quantity})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

