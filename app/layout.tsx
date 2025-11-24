import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppProviders from '@/components/AppProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DigiShop France',
  description: 'Votre partenaire de confiance pour tous vos besoins d\'import',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AppProviders>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  )
}

