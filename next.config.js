/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
  // Désactiver le cache Webpack en développement pour éviter EPERM et artefacts corrompus
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }
    return config
  },
  eslint: {
    // Évite l’échec du build sur Vercel en cas d’erreurs/warnings ESLint
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

