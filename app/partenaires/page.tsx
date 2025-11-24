"use client"

import { useMemo, useState } from 'react'
import { FiMapPin, FiGlobe, FiTruck, FiShield, FiSearch, FiFilter } from 'react-icons/fi'
import Link from 'next/link'

const partners = [
  {
    id: 1,
    name: 'Logistique Paris',
    city: 'Paris',
    region: 'Île-de-France',
    services: ['Transport', 'Stockage', 'Distribution'],
    description: 'Partenaire principal pour la région parisienne',
    icon: '🚚',
  },
  {
    id: 2,
    name: 'Import Lyon',
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    services: ['Import', 'Douane', 'Conseil'],
    description: 'Spécialiste des importations européennes',
    icon: '🌍',
  },
  {
    id: 3,
    name: 'Marseille Logistique',
    city: 'Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
    services: ['Portuaire', 'Transport maritime', 'Entrepôt'],
    description: 'Expert en logistique portuaire méditerranéenne',
    icon: '⛴️',
  },
  {
    id: 4,
    name: 'Nord Transport',
    city: 'Lille',
    region: 'Hauts-de-France',
    services: ['Transport international', 'Distribution', 'Cross-docking'],
    description: 'Plateforme logistique du Nord',
    icon: '📦',
  },
  {
    id: 5,
    name: 'Bordeaux Commerce',
    city: 'Bordeaux',
    region: 'Nouvelle-Aquitaine',
    services: ['Import-Export', 'Conseil', 'Certification'],
    description: 'Spécialiste du commerce international',
    icon: '🍷',
  },
  {
    id: 6,
    name: 'Toulouse Distribution',
    city: 'Toulouse',
    region: 'Occitanie',
    services: ['Distribution', 'E-commerce', 'Last-mile'],
    description: 'Solutions de distribution modernes',
    icon: '🚀',
  },
]

const features = [
  {
    icon: FiGlobe,
    title: 'Réseau National',
    description: 'Plus de 50 partenaires en RDC',
  },
  {
    icon: FiTruck,
    title: 'Livraison Rapide',
    description: 'Délais optimisés dans toute la RDC',
  },
  {
    icon: FiShield,
    title: 'Qualité Garantie',
    description: 'Tous nos partenaires sont certifiés',
  },
  {
    icon: FiMapPin,
    title: 'Couverture Totale',
    description: 'Présence dans toutes les régions',
  },
]

export default function Partenaires() {
  const [query, setQuery] = useState("")
  const [region, setRegion] = useState("")
  const [service, setService] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const regions = useMemo(
    () => Array.from(new Set(partners.map(p => p.region))).sort(),
    []
  )
  const services = useMemo(
    () => Array.from(new Set(partners.flatMap(p => p.services))).sort(),
    []
  )

  const filtered = useMemo(() => {
    let out = partners
      .filter(p =>
        [p.name, p.city, p.region, p.description, ...p.services]
          .join(" ")
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      )
      .filter(p => (region ? p.region === region : true))
      .filter(p => (service ? p.services.includes(service) : true))

    if (sortBy === "name") out = [...out].sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy === "city") out = [...out].sort((a, b) => a.city.localeCompare(b.city))
    if (sortBy === "region") out = [...out].sort((a, b) => a.region.localeCompare(b.region))
    return out
  }, [query, region, service, sortBy])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Nos Partenaires France</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Un réseau solide de partenaires locaux pour vous offrir le meilleur service d'import à travers toute la RDC
          </p>
        </div>

        {/* Toolbar */}
        <div className="bg-white/70 backdrop-blur rounded-xl border border-gray-200 shadow-sm p-4 md:p-5 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="relative flex items-center">
              <FiSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Rechercher un partenaire, une ville, un service..."
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                aria-label="Rechercher"
              />
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <select
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 text-sm"
                  aria-label="Filtrer par région"
                >
                  <option value="">Toutes les régions</option>
                  {regions.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 text-sm"
                  aria-label="Filtrer par service"
                >
                  <option value="">Tous les services</option>
                  {services.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiFilter className="text-gray-500" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 text-sm"
                aria-label="Trier par"
              >
                <option value="name">Trier: Nom</option>
                <option value="city">Trier: Ville</option>
                <option value="region">Trier: Région</option>
              </select>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition"
              >
                <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-base md:text-lg font-semibold mb-1.5">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Partners Grid */}
        {filtered.length === 0 ? (
          <div className="mb-12">
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <div className="text-3xl mb-2">🧐</div>
              <p className="font-medium mb-1">Aucun partenaire trouvé</p>
              <p className="text-gray-600 text-sm">Essayez d'élargir votre recherche ou de réinitialiser les filtres.</p>
              <div className="mt-4">
                <button
                  onClick={() => { setQuery(""); setRegion(""); setService(""); setSortBy("name") }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filtered.map(partner => (
              <div
                key={partner.id}
                className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"
              >
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 text-center">
                  <div className="text-5xl mb-4">{partner.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{partner.name}</h3>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <FiMapPin />
                    <span>{partner.city}, {partner.region}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{partner.description}</p>
                  <div className="mb-5">
                    <h4 className="font-semibold mb-2">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {partner.services.map((svc, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                    aria-label={`En savoir plus sur ${partner.name}`}
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-10 md:p-12 text-center shadow-md">
          <h2 className="text-3xl font-bold mb-3">Devenir Partenaire</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Rejoignez notre réseau de partenaires et développez votre activité
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex justify-center items-center bg-white text-blue-600 px-6 md:px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition border border-white"
            >
              Nous Contacter
            </Link>
            <button className="inline-flex justify-center items-center bg-transparent border-2 border-white text-white px-6 md:px-8 py-2.5 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition">
              Télécharger le Kit Partenaire
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
            <div className="text-gray-600">Partenaires</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">13</div>
            <div className="text-gray-600">Régions</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">1000+</div>
            <div className="text-gray-600">Clients satisfaits</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  )
}

