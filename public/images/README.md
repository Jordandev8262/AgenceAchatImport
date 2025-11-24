# Dossier Images

Ce dossier contient toutes les images utilisées sur le site e-commerce.

## Structure des dossiers

### 📦 `products/`
Images des produits à vendre.
- **Format recommandé** : JPG, PNG, WebP
- **Taille recommandée** : 600x400 pixels minimum
- **Exemples** :
  - `electronique-1.jpg`
  - `textile-1.jpg`
  - `construction-1.jpg`
  - `agriculture-1.jpg`
  - `automobile-1.jpg`
  - `medical-1.jpg`

### 🎨 `hero/`
Images de bannière pour les sections hero (page d'accueil, landing pages).
- **Format recommandé** : JPG, PNG, WebP
- **Taille recommandée** : 1920x1080 pixels (Full HD)
- **Exemples** :
  - `hero-home.jpg`
  - `hero-about.jpg`

### 🏢 `logos/`
Logos de l'entreprise, favicons, etc.
- **Format recommandé** : PNG, SVG
- **Taille recommandée** : Variable selon l'usage
- **Exemples** :
  - `logo.png`
  - `logo-white.png`
  - `favicon.ico`

### 📢 `banners/`
Bannières promotionnelles, publicités, annonces.
- **Format recommandé** : JPG, PNG, WebP
- **Taille recommandée** : 1200x400 pixels
- **Exemples** :
  - `promo-1.jpg`
  - `banner-summer.jpg`

### 🤝 `partners/`
Logos des partenaires, clients, certifications.
- **Format recommandé** : PNG, SVG
- **Taille recommandée** : 200x100 pixels
- **Exemples** :
  - `partner-1.png`
  - `certification-ce.png`

### 🖼️ `gallery/`
Galerie d'images générales, photos diverses.
- **Format recommandé** : JPG, PNG, WebP
- **Taille recommandée** : Variable

### 🎯 `icons/`
Icônes personnalisées (si nécessaire, les icônes React Icons sont généralement utilisées).
- **Format recommandé** : SVG, PNG
- **Taille recommandée** : 24x24, 32x32, 48x48 pixels

## Utilisation dans le code

### Avec Next.js Image Component

```tsx
import Image from 'next/image'

<Image
  src="/images/products/electronique-1.jpg"
  alt="Description"
  width={600}
  height={400}
  className="object-cover"
/>
```

### Avec la balise img standard

```tsx
<img 
  src="/images/products/electronique-1.jpg" 
  alt="Description"
  className="w-full h-auto"
/>
```

## Bonnes pratiques

1. **Optimisation** : Compressez les images avant de les ajouter pour réduire les temps de chargement
2. **Noms de fichiers** : Utilisez des noms descriptifs et cohérents (kebab-case)
3. **Tailles** : Respectez les tailles recommandées pour chaque type d'image
4. **Formats** : Préférez WebP pour de meilleures performances (avec fallback JPG/PNG)
5. **Alt text** : Toujours inclure un texte alternatif descriptif pour l'accessibilité

## Organisation

- ✅ Un dossier par type d'image
- ✅ Noms de fichiers clairs et descriptifs
- ✅ Versionning des images si nécessaire (ex: `logo-v1.png`, `logo-v2.png`)

