import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight, FiTruck, FiShield, FiGlobe, FiPackage, FiCheck, FiTrendingUp, FiUsers } from 'react-icons/fi'
import AdCarousel from '../components/AdCarousel'

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-24 md:py-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-medium">Votre partenaire de confiance depuis 2025</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Solutions d'Import
              <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Professionnelles
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-50 leading-relaxed max-w-2xl mx-auto">
              Simplifiez vos importations avec nos services complets et fiables. 
              Plus de 10 000 clients nous font confiance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/catalogue"
                className="group bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
              >
                Voir le Catalogue
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                Nous Contacter
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">10K+</div>
                <div className="text-sm text-blue-200">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-sm text-blue-200">Pays partenaires</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-sm text-blue-200">Support client</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des solutions d'import professionnelles adaptées à vos besoins
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="group bg-gradient-to-br from-white to-blue-50/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                <FiTruck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Livraison Rapide</h3>
              <p className="text-gray-600 leading-relaxed">
                Expédition express pour vos commandes urgentes avec suivi en temps réel
              </p>
            </div>
            <div className="group bg-gradient-to-br from-white to-purple-50/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                <FiShield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sécurisé</h3>
              <p className="text-gray-600 leading-relaxed">
                Paiements sécurisés et données protégées avec certifications internationales
              </p>
            </div>
            <div className="group bg-gradient-to-br from-white to-blue-50/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                <FiGlobe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Réseau International</h3>
              <p className="text-gray-600 leading-relaxed">
                Partenaires fiables dans plus de 50 pays pour une couverture mondiale
              </p>
            </div>
            <div className="group bg-gradient-to-br from-white to-purple-50/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                <FiPackage className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gestion Complète</h3>
              <p className="text-gray-600 leading-relaxed">
                Suivi en temps réel de vos commandes avec interface dédiée
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Produits Populaires</h2>
              <p className="mt-2 text-gray-600">Une sélection soignée des catégories les plus demandées</p>
            </div>
            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              aria-label="Voir tout le catalogue"
            >
              Voir tout
              <FiArrowRight className="ml-2" />
            </Link>
          </div>

          {/* Main content with right-side video panel */}
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6 items-stretch">
            {/* Products grid */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {[
                  {
                    id: '1',
                    name: 'Manette Drone',
                    price: 450,
                    image: '/images/products/electronique-1.jpg',
                    alt: "Électronique Drone Civil",
                  },
                  {
                    id: '2',
                    name: 'Montre Numérique',
                    price: 320,
                    image: '/images/products/textile-1.jpg',
                    alt: 'Montre Numérique',
                  },
                  {
                    id: '3',
                    name: 'Matériaux de Construction',
                    price: 680,
                    image: '/images/products/fond.jpg',
                    alt: 'Matériaux de Construction',
                  },
                  {
                    id: '4',
                    name: 'hp Pavillion i7',
                    price: 1200,
                    image: '/images/products/Ordinateur HP.jpg',
                    alt: 'Machines Agricoles',
                  },
                  {
                    id: '5',
                    name: 'Appareil Nikon D7000',
                    price: 150,
                    image: '/images/products/camera.jpg',
                    alt: 'Appareil Photo Nikon D7000',
                  },
                  {
                    id: '6',
                    name: 'Drone 4K hdr',
                    price: 950,
                    image: '/images/products/drone.jpg',
                    alt: 'Équipements Médicaux',
                  },
                ].map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"
                  >
                    <div className="relative h-56 md:h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100" aria-hidden="true" />
                      <Image
                        src={product.image}
                        alt={product.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium text-gray-800 border border-gray-200 shadow-sm">
                        Populaire
                      </div>
                      <div className="absolute bottom-3 right-3 rounded-full bg-blue-600 text-white text-sm font-semibold px-3 py-1 shadow-md">
                        {product.price}€
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                      <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
                        <span className="inline-flex items-center gap-1"><FiTrendingUp className="text-blue-600" /> Tendances</span>
                        <span aria-hidden className="h-1 w-1 rounded-full bg-gray-300" />
                        <span className="inline-flex items-center gap-1"><FiUsers className="text-purple-600" /> Très demandé</span>
                      </div>
                      <div className="mt-4 flex gap-3">
                        <Link
                          href="/catalogue"
                          className="flex-1 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Voir détails
                        </Link>
                        <Link
                          href="/contact"
                          className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          aria-label={`Demander un devis pour ${product.name}`}
                        >
                          Devis
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right-side rotating ads (images) */}
            <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sticky top-6 hidden xl:flex xl:flex-col h-full">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Publicité</h3>
              <div className="rounded-lg overflow-hidden border border-gray-200 flex-1 min-h-0">
                <AdCarousel
                  images={[
                    { src: '/images/ads/ad-1.jpg', alt: 'Promo Équipements ' },
                    { src: '/images/ads/ad-2.jpg', alt: 'Offre Limitée' },
                    { src: '/images/ads/ad-3.jpg', alt: 'Nouveautés Catalogue' },
                  ]}
                  intervalMs={3500}
                  heightClass="h-full"
                />
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Découvrez nos offres spéciales sur les équipements.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez nos clients satisfaits et simplifiez vos importations dès aujourd'hui
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-block"
          >
            Demander un Devis
          </Link>
        </div>
      </section>
    </div>
  )
}

