'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { FiLogIn, FiShield, FiAlertCircle } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export default function SignInContent() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/admin',
      })
      if (res?.ok) {
        router.replace('/admin')
        return
      }
      if (res?.error) {
        setError('Email ou mot de passe invalide')
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
          <FiShield className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Accès administrateur
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Saisissez vos identifiants pour accéder au tableau de bord.
        </p>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            <FiAlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="super@digishop.local"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FiLogIn className={`h-5 w-5 ${loading ? 'animate-pulse' : ''}`} />
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
          <p className="mt-2 text-xs text-gray-500">
            Astuce: identifiants par défaut — email <code className="rounded bg-gray-100 px-1">super@digishop.local</code> et mot de passe <code className="rounded bg-gray-100 px-1">Admin2025</code>.
          </p>
        </form>
      </div>
    </div>
  )
}


