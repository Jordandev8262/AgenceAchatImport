<<<<<<< HEAD
# DigiShop France

Une application e-commerce moderne construite avec Next.js et React pour les services d'import professionnels.

## 🚀 Fonctionnalités

- ✅ **Page d'accueil** - Présentation des services et produits populaires
- ✅ **Catalogue** - Recherche et filtrage de produits par catégorie
- ✅ **Panier & Paiement** - Gestion du panier et processus de paiement sécurisé
- ✅ **Suivi de commande** - Suivi en temps réel de l'état des commandes
- ✅ **Contact & Chat** - Formulaire de contact et chat en direct
- ✅ **Partenaires France** - Présentation du réseau de partenaires
- ✅ **Espace client** - Connexion, profil et gestion des commandes
- ✅ **Espace administrateur** - Tableau de bord sécurisé pour consulter et mettre à jour les commandes reçues

## 🛠️ Technologies

- **Next.js 14** - Framework React avec App Router
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling moderne et responsive
- **React Icons** - Icônes
- **NextAuth.js** - Authentification OAuth 2.0 avec Google
- **LocalStorage** - Persistance des données client

## 📦 Installation

1. Installez les dépendances :

```bash
npm install
```

2. Lancez le serveur de développement :

```bash
npm run dev
```

3. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🔑 Configuration de l'authentification

L'accès à l'espace administrateur est protégé par une connexion Google. Créez un fichier `.env.local` à la racine du projet en vous basant sur le modèle suivant :

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=remplacez_par_un_secret_long_et_aleatoire

GOOGLE_CLIENT_ID=remplacez_par_votre_client_id
GOOGLE_CLIENT_SECRET=remplacez_par_votre_client_secret

# Adresse Gmail du super utilisateur autorisé
ADMIN_EMAIL=monsuperuser25@gmail.com
```

> Créez les identifiants OAuth sur [console.cloud.google.com](https://console.cloud.google.com/) avec un client **Web**. Ajoutez `http://localhost:3000/api/auth/callback/google` dans les URL de redirection autorisées.

Une fois la configuration en place, accédez à `/admin` pour vous connecter et gérer les commandes.

## 🏗️ Structure du projet

```
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── catalogue/
│   │   └── page.tsx          # Page catalogue
│   ├── panier/
│   │   └── page.tsx          # Page panier
│   ├── paiement/
│   │   └── page.tsx          # Page paiement
│   ├── suivi-commande/
│   │   └── page.tsx          # Suivi de commande
│   ├── contact/
│   │   └── page.tsx          # Contact & Chat
│   ├── partenaires/
│   │   └── page.tsx          # Partenaires France
│   ├── espace-client/
│   │   └── page.tsx          # Espace client
│   ├── admin/
│   │   ├── page.tsx          # Tableau de bord administrateur (protégé)
│   │   └── sign-in/          # Page de connexion Google
│   ├── layout.tsx            # Layout principal
│   └── globals.css           # Styles globaux
├── components/
│   ├── Header.tsx            # En-tête avec navigation
│   └── Footer.tsx            # Pied de page
├── context/
│   └── CartContext.tsx       # Contexte du panier
└── package.json
```

## 🎨 Design

L'application utilise un design moderne avec :
- Palette de couleurs bleu/violet
- Interface responsive (mobile-first)
- Animations et transitions fluides
- Composants réutilisables

## 📝 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run start` - Lance le serveur de production
- `npm run lint` - Vérifie le code avec ESLint

## 🔐 Fonctionnalités principales

### Panier
- Ajout/suppression de produits
- Modification des quantités
- Persistance dans localStorage
- Calcul automatique des totaux

### Commandes
- Création de commandes après paiement
- Suivi des statuts en temps réel
- Historique des commandes
- Tableau de bord admin pour modifier les statuts et consulter les détails

### Espace client
- Connexion/Inscription
- Gestion du profil
- Visualisation des commandes
- Paramètres utilisateur

## 🚢 Déploiement

L'application peut être déployée sur :
- Vercel (recommandé pour Next.js)
- Netlify
- AWS Amplify
- Tout hébergeur supportant Node.js

## 📄 Licence

Ce projet est un exemple d'application e-commerce.

## 👨‍💻 Auteur

Créé pour les services d'import professionnels.
=======
# AgenceAchatImport
>>>>>>> 156dcf17dbdbd6db05d5e02dc6d7bcd71f215a49
