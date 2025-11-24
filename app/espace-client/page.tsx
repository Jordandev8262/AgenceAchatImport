'use client'

import { useState, useEffect, useRef } from 'react'
import { FiUser, FiShoppingBag, FiSettings, FiLogOut, FiLogIn, FiMail, FiLock, FiFileText, FiCamera, FiX } from 'react-icons/fi'
import Link from 'next/link'

interface User {
  email: string
  name: string
  profilePicture?: string
}

interface Order {
  id: string
  total: number
  date: string
  status: string
}

interface Invoice {
  id: string
  orderId: string
  date: string
  total: number
  status: 'payée' | 'en attente';
}

export default function EspaceClient() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'invoices' | 'settings'>('profile')
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showLogin, setShowLogin] = useState(true)
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsLoggedIn(true)
      if (userData.profilePicture) {
        setProfilePicture(userData.profilePicture)
      }
    }

    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }

    const savedInvoices = localStorage.getItem('invoices')
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices))
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation de connexion
    const mockUser = {
      email: loginData.email,
      name: loginData.email.split('@')[0],
    }
    setUser(mockUser)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify(mockUser))
    setLoginData({ email: '', password: '' })
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }
    const newUser = {
      email: registerData.email,
      name: registerData.name,
    }
    setUser(newUser)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify(newUser))
    setRegisterData({ name: '', email: '', password: '', confirmPassword: '' })
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
    setProfilePicture(null)
    localStorage.removeItem('user')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image est trop grande. Veuillez choisir une image de moins de 5MB.')
        return
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setProfilePicture(base64String)
        
        // Mettre à jour l'utilisateur avec la nouvelle photo
        if (user) {
          const updatedUser = { ...user, profilePicture: base64String }
          setUser(updatedUser)
          localStorage.setItem('user', JSON.stringify(updatedUser))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null)
    if (user) {
      const updatedUser = { ...user, profilePicture: undefined }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setShowLogin(true)}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  showLogin
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Connexion
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  !showLogin
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Inscription
              </button>
            </div>

            {showLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center space-x-2"
                >
                  <FiLogIn />
                  <span>Se connecter</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  S'inscrire
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {profilePicture ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600">
                    <img
                      src={profilePicture}
                      alt="Photo de profil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiUser className="w-8 h-8 text-blue-600" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Bienvenue, {user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800"
            >
              <FiLogOut />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <FiUser />
                <span>Mon Profil</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                  activeTab === 'orders'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <FiShoppingBag />
                <span>Mes Commandes</span>
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                  activeTab === 'invoices'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <FiFileText />
                <span>Mes Factures</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                  activeTab === 'settings'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <FiSettings />
                <span>Paramètres</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Mon Profil</h2>
                <div className="space-y-6">
                  {/* Photo de profil */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Photo de profil
                    </label>
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        {profilePicture ? (
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">
                            <img
                              src={profilePicture}
                              alt="Photo de profil"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-200">
                            <FiUser className="w-12 h-12 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                          id="profile-picture-upload"
                        />
                        <label
                          htmlFor="profile-picture-upload"
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                        >
                          <FiCamera />
                          <span>Choisir une photo</span>
                        </label>
                        {profilePicture && (
                          <button
                            onClick={handleRemoveProfilePicture}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                          >
                            <FiX />
                            <span>Supprimer la photo</span>
                          </button>
                        )}
                        <p className="text-xs text-gray-500">
                          Formats acceptés: JPG, PNG, GIF (max 5MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Mes Commandes</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <FiShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Vous n'avez pas encore passé de commande</p>
                    <Link
                      href="/catalogue"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                      Voir le Catalogue
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <Link
                        key={order.id}
                        href={`/suivi-commande?order=${order.id}`}
                        className="block border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-lg">Commande #{order.id}</p>
                            <p className="text-gray-600 text-sm">
                              {new Date(order.date).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-xl text-blue-600">{order.total.toFixed(2)}€</p>
                            <span className="text-sm text-gray-600">{order.status}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'invoices' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Mes Factures</h2>
                {invoices.length === 0 ? (
                  <div className="text-center py-12">
                    <FiFileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Aucune facture disponible pour le moment</p>
                    <Link
                      href="/catalogue"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                      Commander des produits
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {invoices.map(invoice => (
                      <Link
                        key={invoice.id}
                        href={`/espace-client/factures/${invoice.id}`}
                        className="block border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-lg">Facture #{invoice.id}</p>
                            <p className="text-gray-600 text-sm">Liée à la commande #{invoice.orderId}</p>
                            <p className="text-gray-600 text-sm">
                              {new Date(invoice.date).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold text-xl ${invoice.status === 'payée' ? 'text-green-600' : 'text-yellow-600'}`}>
                              {invoice.total.toFixed(2)}€
                            </p>
                            <span className="text-sm text-gray-600 capitalize">{invoice.status}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Paramètres</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <FiLock />
                      <span>Changer le mot de passe</span>
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="password"
                        placeholder="Mot de passe actuel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="password"
                        placeholder="Nouveau mot de passe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="password"
                        placeholder="Confirmer le nouveau mot de passe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Changer le mot de passe
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <FiMail />
                      <span>Notifications</span>
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Notifications par email</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Alertes de commande</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span>Newsletter</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

