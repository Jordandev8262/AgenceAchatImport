import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ImportPro</h3>
            <p className="text-gray-400 text-sm">
              Votre partenaire de confiance pour tous vos besoins d'import professionnels.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-gray-400 hover:text-white transition">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/partenaires" className="text-gray-400 hover:text-white transition">
                  Partenaires
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Import & Export</li>
              <li>Logistique</li>
              <li>Douane</li>
              <li>Conseil</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <FiMail className="w-4 h-4" />
                <span>contact@importpro.fr</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="w-4 h-4" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMapPin className="w-4 h-4" />
                <span>Paris, France</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 ImportPro. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

