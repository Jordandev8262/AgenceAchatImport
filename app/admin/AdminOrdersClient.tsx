'use client'

import { useState, useMemo, useTransition, type ReactNode } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { IconType } from 'react-icons'
import {
  FiLogOut,
  FiRefreshCcw,
  FiAlertCircle,
  FiCheckCircle,
  FiHome,
  FiPackage,
  FiUsers,
  FiCreditCard,
  FiTruck,
  FiFileText,
  FiBarChart,
  FiShield,
  FiSettings,
  FiPlusCircle,
  FiLayers,
  FiUpload,
  FiGrid,
  FiPercent,
  FiArchive,
  FiTruck as FiTruckIcon,
  FiClipboard,
  FiCheckSquare,
  FiInbox,
  FiPhone,
  FiGlobe,
  FiActivity,
  FiPieChart,
  FiTrendingUp,
  FiTrendingDown,
  FiLock,
  FiArrowUpRight,
  FiTool,
  FiMapPin,
  FiBell,
  FiBookOpen,
  FiImage,
  FiLink,
} from 'react-icons/fi'
import type { OrderRecord, OrderStatus } from '@/lib/orders'

const statusOptions: OrderStatus[] = ['En attente', 'Confirmée', 'En préparation', 'Expédiée', 'Livrée']

const statusColors: Record<OrderStatus, string> = {
  'En attente': 'bg-yellow-100 text-yellow-800',
  'Confirmée': 'bg-blue-100 text-blue-800',
  'En préparation': 'bg-purple-100 text-purple-800',
  'Expédiée': 'bg-orange-100 text-orange-800',
  'Livrée': 'bg-green-100 text-green-800',
}

type AdminSection =
  | 'dashboard'
  | 'products'
  | 'orders'
  | 'import'
  | 'clients'
  | 'payments'
  | 'deliveries'
  | 'content'
  | 'stats'
  | 'admins'
  | 'settings'

type SectionActionVariant = 'primary' | 'secondary'

interface SectionMetric {
  label: string
  value: string
  trend?: 'up' | 'down'
}

interface SectionFeature {
  title: string
  detail: string
}

interface SectionAction {
  label: string
  description: string
  variant: SectionActionVariant
}

interface SectionSubPoint {
  key: string
  label: string
  summary: string
  description: string
  icon: IconType
  metrics: SectionMetric[]
  features: SectionFeature[]
  actions: SectionAction[]
}

interface AdvancedSectionConfig {
  badge: string
  title: string
  description: string
  footerNote?: string
  subSections: SectionSubPoint[]
}

const advancedSectionConfigs: Partial<Record<AdminSection, AdvancedSectionConfig>> = {
  products: {
    badge: 'Bloc produit · navigation par besoins',
    title: 'Gestion avancée du catalogue',
    description: 'Sélectionnez un sous-onglet pour afficher ses fonctionnalités détaillées à droite.',
    footerNote: 'Ces fonctionnalités seront connectées aux futures API catalogue et stock pour des actions en temps réel.',
    subSections: [
      {
        key: 'product-crud',
        label: 'Ajouter / modifier / supprimer un produit',
        summary: 'Créer une fiche produit complète (catalogue, SEO, médias).',
        description:
          'Créez, rééditez ou archivez un produit en quelques clics avec des formulaires enrichis, une gestion d’images et un suivi de version.',
        icon: FiPlusCircle,
        metrics: [
          { label: 'Produits actifs', value: '1 280' },
          { label: 'Brouillons', value: '32' },
          { label: 'Temps moyen', value: '3 min' },
        ],
        features: [
          {
            title: 'Formulaire enrichi',
            detail: 'Champs dynamiques (SEO, prix, taxes, attributs) avec validation en temps réel.',
          },
          {
            title: 'Médias & documents',
            detail: 'Upload multi-images, galerie principale/secondaire, fiches techniques en PDF.',
          },
          {
            title: 'Workflow de publication',
            detail: 'Brouillon, relecture, publication programmée, archivage sécurisé.',
          },
        ],
        actions: [
          { label: 'Nouveau produit', description: 'Lancer le formulaire avancé', variant: 'primary' },
          { label: 'Importer un modèle', description: 'Pré-rempli via gabarit', variant: 'secondary' },
        ],
      },
      {
        key: 'categories',
        label: 'Gestion des catégories',
        summary: 'Organiser vos familles, sous-familles et tags dynamiques.',
        description:
          'Organisez votre catalogue avec une arborescence profonde, des filtres intelligents et une mise à jour groupée.',
        icon: FiLayers,
        metrics: [
          { label: 'Catégories actives', value: '86' },
          { label: 'Éditions cette semaine', value: '+12', trend: 'up' },
        ],
        features: [
          {
            title: 'Arborescence illimitée',
            detail: 'Glisser-déposer pour imbriquer des familles, sous-familles et collections.',
          },
          {
            title: 'Filtres automatiques',
            detail: 'Attributs dynamiques par catégorie (taille, couleur, matériaux).',
          },
          {
            title: 'Actions massives',
            detail: 'Changer la catégorie par lot, réordonner, activer/désactiver en masse.',
          },
        ],
        actions: [
          { label: 'Nouvelle catégorie', description: 'Créer un nœud parent/enfant', variant: 'primary' },
          { label: 'Réorganiser', description: 'Activer le glisser-déposer', variant: 'secondary' },
        ],
      },
      {
        key: 'bulk-import',
        label: 'Importation en masse (CSV/Excel)',
        summary: 'Synchroniser des lots produits depuis ERP ou fournisseur.',
        description:
          'Synchronisez des centaines de références en important vos fichiers fournisseurs ou ERP.',
        icon: FiUpload,
        metrics: [
          { label: 'Dernier import', value: '17 Nov · 420 lignes' },
          { label: 'Erreurs détectées', value: '6', trend: 'down' },
        ],
        features: [
          {
            title: 'Mapping assisté',
            detail: 'Associez chaque colonne CSV/Excel aux champs DigiShop en une fois.',
          },
          {
            title: 'Validation automatique',
            detail: 'Détection des doublons, formats erronés, catégories manquantes avant l’import.',
          },
          {
            title: 'Historique & reprise',
            detail: 'Journal d’imports, reprise sur erreur, exports des lignes rejetées.',
          },
        ],
        actions: [
          { label: 'Nouvel import', description: 'Téléverser un CSV/Excel', variant: 'primary' },
          { label: 'Télécharger un template', description: 'Exemple prêt à l’emploi', variant: 'secondary' },
        ],
      },
      {
        key: 'variants',
        label: 'Gestion des variantes',
        summary: 'Décliner les produits par attributs sans perdre la cohérence.',
        description:
          'Déclinez vos produits par taille, couleur ou matériau tout en gardant une fiche parent.',
        icon: FiGrid,
        metrics: [
          { label: 'Produits avec variantes', value: '420' },
          { label: 'Attributs disponibles', value: '18' },
        ],
        features: [
          {
            title: 'Matrices de variantes',
            detail: 'Générez automatiquement toutes les combinaisons d’attributs.',
          },
          {
            title: 'Stock par variation',
            detail: 'Quantité, SKU, code-barres, prix spécifique par déclinaison.',
          },
          {
            title: 'Synchronisation front',
            detail: 'Selector de variantes prêt pour la boutique, avec images dédiées.',
          },
        ],
        actions: [
          { label: 'Ajouter une variante', description: 'Créer une nouvelle déclinaison', variant: 'primary' },
          { label: 'Générer une matrice', description: 'Combinaisons automatiques', variant: 'secondary' },
        ],
      },
      {
        key: 'promotions',
        label: 'Promotions, réductions, coupons',
        summary: 'Piloter campagnes, remises et coupons ciblés.',
        description:
          'Animez vos ventes avec des règles tarifaires précises et des coupons ciblés.',
        icon: FiPercent,
        metrics: [
          { label: 'Campagnes actives', value: '5' },
          { label: 'CA généré (30j)', value: '+18 %', trend: 'up' },
        ],
        features: [
          {
            title: 'Campagnes programmées',
            detail: 'Début/fin, segmentation par catégorie, marque ou tag produit.',
          },
          {
            title: 'Coupons avancés',
            detail: 'Code unique, usage limité, clients VIP, paniers minimums.',
          },
          {
            title: 'Suivi performance',
            detail: 'Taux d’utilisation, CA généré, produits impactés.',
          },
        ],
        actions: [
          { label: 'Créer une promotion', description: 'Définir règles et durée', variant: 'primary' },
          { label: 'Configurer un coupon', description: 'Code unique ou multiple', variant: 'secondary' },
        ],
      },
      {
        key: 'stock',
        label: 'Gestion des stocks',
        summary: 'Superviser niveaux, alertes et inventaires multi-sites.',
        description:
          'Pilotez les niveaux de stock en temps réel avec alertes, inventaires et réappros.',
        icon: FiArchive,
        metrics: [
          { label: 'Ruptures critiques', value: '8', trend: 'up' },
          { label: 'Valeur de stock', value: '€ 245 K' },
        ],
        features: [
          {
            title: 'Multi-entrepôts',
            detail: 'Suivi par dépôt, boutique, magasin ou zone géographique.',
          },
          {
            title: 'Alertes et seuils',
            detail: 'Email et notifications internes dès qu’un seuil minimum est franchi.',
          },
          {
            title: 'Inventaires guidés',
            detail: 'Comptages partiels, rapprochements et ajustements historisés.',
          },
        ],
        actions: [
          { label: 'Créer un inventaire', description: 'Guidé ou flash', variant: 'primary' },
          { label: 'Planifier un réappro', description: 'Proposition automatique', variant: 'secondary' },
        ],
      },
      {
        key: 'suppliers',
        label: "Suivi des fournisseurs et prix d'achat",
        summary: 'Centraliser interlocuteurs, tarifs et historiques de coûts.',
        description:
          'Centralisez vos fournisseurs, conditions d’achat et historiques de coûts.',
        icon: FiTruckIcon,
        metrics: [
          { label: 'Fournisseurs actifs', value: '27' },
          { label: 'Variations de coût', value: '-3 % (30j)', trend: 'down' },
        ],
        features: [
          {
            title: 'Fiches fournisseurs',
            detail: 'Contacts, délais, incoterms, documents contractuels.',
          },
          {
            title: 'Prix d’achat chronologiques',
            detail: 'Historique des tarifs, remises négociées, alertes variation de marge.',
          },
          {
            title: 'Réappro automatique',
            detail: 'Propositions d’achat basées sur les ventes, délais et minimums de commande.',
          },
        ],
        actions: [
          { label: 'Ajouter un fournisseur', description: 'Créer une fiche complète', variant: 'primary' },
          { label: 'Analyser les coûts', description: 'Comparer par période', variant: 'secondary' },
        ],
      },
    ],
  },
  orders: {
    badge: 'Bloc commandes',
    title: 'Pilotage opérationnel des commandes',
    description: 'Visualisez les priorités et les actions clés avant d’ouvrir la liste détaillée.',
    footerNote: 'Données synchronisées avec le module temps réel des commandes.',
    subSections: [
      {
        key: 'orders-fulfillment',
        label: 'Traitement & préparation',
        summary: 'Prioriser les commandes critiques.',
        description:
          'Orientez les équipes picking selon les SLA, le canal (B2B, boutique, e-commerce) et la disponibilité stock.',
        icon: FiClipboard,
        metrics: [
          { label: 'À préparer', value: '68' },
          { label: 'Retards critiques', value: '4', trend: 'up' },
        ],
        features: [
          { title: 'Board Kanban', detail: 'Vue par statut (nouvelle, en cours, prête, expédiée).' },
          { title: 'Priorisation auto', detail: 'SLA, VIP, promesses de livraison et disponibilité réelle.' },
          { title: 'Check-list picking', detail: 'Contrôle numérique par zone et scan code-barres.' },
        ],
        actions: [
          { label: 'Ouvrir le board', description: 'Vue temps réel des commandes', variant: 'primary' },
          { label: 'Assigner un préparateur', description: 'Distribution automatique', variant: 'secondary' },
        ],
      },
      {
        key: 'orders-status',
        label: 'Gestion des statuts',
        summary: 'Automatiser les transitions et notifications.',
        description:
          'Paramétrez les règles de changement de statut, les emails clients et les webhooks partenaires.',
        icon: FiCheckSquare,
        metrics: [
          { label: 'Statuts personnalisés', value: '9' },
          { label: 'Automations actives', value: '14' },
        ],
        features: [
          { title: 'Règles conditionnelles', detail: 'Déclencheurs par mode de paiement, canal ou stock.' },
          { title: 'Modèles de notification', detail: 'Emails/SMS multilingues selon évènement.' },
          { title: 'Journal des transitions', detail: 'Traçabilité complète avec horodatage.' },
        ],
        actions: [
          { label: 'Créer une règle', description: 'Condition + action', variant: 'primary' },
          { label: 'Prévisualiser un email', description: 'Template multi-langue', variant: 'secondary' },
        ],
      },
      {
        key: 'orders-shipping',
        label: 'Expédition & tracking',
        summary: 'Connecter transporteurs et étiquettes.',
        description:
          'Centralisez les intégrations transporteurs, les tarifs négociés et les numéros de suivi.',
        icon: FiTruck,
        metrics: [
          { label: 'Transporteurs actifs', value: '6' },
          { label: 'Temps moyen d’expédition', value: '4 h' },
        ],
        features: [
          { title: 'Comparateur de tarifs', detail: 'Choix du transporteur optimal en 1 clic.' },
          { title: 'Étiquettes automatiques', detail: 'Génération PDF, ZPL, intégration scanners.' },
          { title: 'Portail suivi client', detail: 'Lien unique avec étapes temps réel.' },
        ],
        actions: [
          { label: 'Générer les étiquettes', description: 'Batch quotidien', variant: 'primary' },
          { label: 'Publier la page suivi', description: 'Config branding', variant: 'secondary' },
        ],
      },
      {
        key: 'orders-support',
        label: 'Litiges & support',
        summary: 'Traiter réclamations et avoirs.',
        description:
          'Suivez les demandes clients, remboursements partiels et preuves de livraison.',
        icon: FiAlertCircle,
        metrics: [
          { label: 'Tickets ouverts', value: '11' },
          { label: 'Satisfaction', value: '4,6 / 5', trend: 'up' },
        ],
        features: [
          { title: 'Workflow litige', detail: 'Catégories (produit, livraison, paiement) et SLA dédiés.' },
          { title: 'Liens dossier', detail: 'Photos, avoirs, échanges client attachés à la commande.' },
          { title: 'Rapports qualité', detail: 'Top motifs et recommandations actionnables.' },
        ],
        actions: [
          { label: 'Ouvrir un ticket', description: 'Associer la commande', variant: 'primary' },
          { label: 'Analyser les motifs', description: 'Statistiques hebdo', variant: 'secondary' },
        ],
      },
    ],
  },
  import: {
    badge: 'Bloc importation',
    title: 'Approvisionnement & transit',
    description: 'Anticipez les réassorts, contrôlez la qualité et surveillez les arrivages internationaux.',
    footerNote: 'Dépendances ERP, transitaires et modules de stock avancés.',
    subSections: [
      {
        key: 'import-procurement',
        label: 'Commandes fournisseurs',
        summary: 'Passer et suivre les PO.',
        description:
          'Préparez les bons de commande, négociez les conditions et suivez les confirmations fournisseurs.',
        icon: FiTruckIcon,
        metrics: [
          { label: 'PO ouverts', value: '24' },
          { label: 'Valeur engagée', value: '€ 310 K' },
        ],
        features: [
          { title: 'Modèles de PO', detail: 'Gabarits par famille produit et incoterm.' },
          { title: 'Validation interne', detail: 'Circuit d’approbation multi-niveaux.' },
          { title: 'Comparateur fournisseurs', detail: 'Prix, délais, scoring qualité.' },
        ],
        actions: [
          { label: 'Créer un PO', description: 'Sélection produit + fournisseur', variant: 'primary' },
          { label: 'Envoyer pour validation', description: 'Notifier achats & finance', variant: 'secondary' },
        ],
      },
      {
        key: 'import-quality',
        label: 'Contrôle qualité',
        summary: 'Garantir conformité et sécurité.',
        description:
          'Définissez les plans de contrôle, gérez les non-conformités et suivez les actions correctives.',
        icon: FiCheckCircle,
        metrics: [
          { label: 'Lots contrôlés', value: '92 %' },
          { label: 'NC ouvertes', value: '3', trend: 'down' },
        ],
        features: [
          { title: 'Check-lists dynamiques', detail: 'Par famille, produit ou fournisseur.' },
          { title: 'Blocage automatique', detail: 'Mise en quarantaine si défaut critique.' },
          { title: 'Rapports PDF', detail: 'Partageable avec fournisseurs et douanes.' },
        ],
        actions: [
          { label: 'Planifier un contrôle', description: 'Assignation entrepôt', variant: 'primary' },
          { label: 'Consulter les NC', description: 'Historique et photos', variant: 'secondary' },
        ],
      },
      {
        key: 'import-arrivals',
        label: 'Suivi des arrivages',
        summary: 'Tracking conteneurs et transit.',
        description:
          'Gérez les ETA, les escales et la disponibilité douanière pour chaque lot en transit.',
        icon: FiInbox,
        metrics: [
          { label: 'Lots en transit', value: '12' },
          { label: 'Retards > 48h', value: '2', trend: 'up' },
        ],
        features: [
          { title: 'Chronologie ETA', detail: 'Date départ, arrivée, mise à disposition.' },
          { title: 'Documents transit', detail: 'BL, packing list, certificats import.' },
          { title: 'Alertes automatiques', detail: 'Email + Slack sur retard ou douanes.' },
        ],
        actions: [
          { label: 'Mettre à jour un ETA', description: 'Informer l’équipe logistique', variant: 'primary' },
          { label: 'Partager le suivi', description: 'Lien live tracking', variant: 'secondary' },
        ],
      },
    ],
  },
  clients: {
    badge: 'Bloc clients',
    title: 'Relation & connaissance client',
    description: 'Centralisez données, segments et interactions pour personnaliser vos actions.',
    footerNote: 'Connectable à votre CRM ou outil marketing automation.',
    subSections: [
      {
        key: 'clients-profiles',
        label: 'Profils & historiques',
        summary: 'Vue 360° de chaque client.',
        description:
          'Consultez coordonnées, consentements, commandes, tickets et appareils utilisés.',
        icon: FiUsers,
        metrics: [
          { label: 'Clients actifs', value: '4 920' },
          { label: 'Nouveaux ce mois', value: '+310', trend: 'up' },
        ],
        features: [
          { title: 'Timeline unifiée', detail: 'Achats, ouvertures emails, favoris.' },
          { title: 'Tags dynamiques', detail: 'VIP, B2B, franchise, churning.' },
          { title: 'Export ciblé', detail: 'CSV filtré pour campagnes externes.' },
        ],
        actions: [
          { label: 'Créer un client', description: 'Fiche manuelle ou import', variant: 'primary' },
          { label: 'Exporter la sélection', description: 'CSV sécurisé', variant: 'secondary' },
        ],
      },
      {
        key: 'clients-loyalty',
        label: 'Segments & fidélité',
        summary: 'Programmes de points et ciblages.',
        description:
          'Définissez vos segments comportementaux et les programmes de fidélité associés.',
        icon: FiBell,
        metrics: [
          { label: 'Segments actifs', value: '18' },
          { label: 'Taux de réachat', value: '42 %', trend: 'up' },
        ],
        features: [
          { title: 'Segment builder', detail: 'Filtres multi-critères (CA, fréquence, panier).' },
          { title: 'Points & statuts', detail: 'Niveaux Silver/Gold/Platinum avec règles auto.' },
          { title: 'Campagnes ciblées', detail: 'Exports direct Mail/SMS/Push.' },
        ],
        actions: [
          { label: 'Créer un segment', description: 'Sauvegarder un ciblage', variant: 'primary' },
          { label: 'Configurer la fidélité', description: 'Niveaux & récompenses', variant: 'secondary' },
        ],
      },
      {
        key: 'clients-support',
        label: 'Support & communication',
        summary: 'Multicanal : email, tchat, téléphone.',
        description:
          'Pilotez la relation client, les scripts agents et les relances automatiques.',
        icon: FiPhone,
        metrics: [
          { label: 'Temps de réponse', value: '2 min 40', trend: 'down' },
          { label: 'CSAT', value: '94 %' },
        ],
        features: [
          { title: 'Boîte omni-canal', detail: 'Email, WhatsApp, Messenger, téléphone.' },
          { title: 'Templates contextualisés', detail: 'Réponses selon motif détecté.' },
          { title: 'Escalades internes', detail: 'Assignation logistique, facturation, SAV.' },
        ],
        actions: [
          { label: 'Ouvrir la console', description: 'Vue agent temps réel', variant: 'primary' },
          { label: 'Programmer une relance', description: 'Automatisation post-achat', variant: 'secondary' },
        ],
      },
    ],
  },
  payments: {
    badge: 'Bloc paiements',
    title: 'Transactions & conformité',
    description: 'Surveillez vos flux financiers, remboursements et risques en un coup d’œil.',
    footerNote: 'Compatible PSP, Mobile Money et passerelles locales.',
    subSections: [
      {
        key: 'payments-transactions',
        label: 'Flux de transactions',
        summary: 'Vision consolidée des encaissements.',
        description:
          'Consultez les volumes par mode de paiement, les écarts et les incidents PSP.',
        icon: FiCreditCard,
        metrics: [
          { label: 'CA encaissé (7j)', value: '€ 182 K' },
          { label: 'Taux d’échec', value: '1,8 %', trend: 'down' },
        ],
        features: [
          { title: 'Monitoring temps réel', detail: 'Webhook PSP + rafraîchissement manuel.' },
          { title: 'Réconciliation auto', detail: 'Matching commandes / transactions.' },
          { title: 'Alertes échec', detail: 'Slack + email si seuil dépassé.' },
        ],
        actions: [
          { label: 'Voir les transactions', description: 'Tableau filtrable', variant: 'primary' },
          { label: 'Exporter pour compta', description: 'CSV journalier', variant: 'secondary' },
        ],
      },
      {
        key: 'payments-refunds',
        label: 'Remboursements & avoirs',
        summary: 'Traiter les demandes clients.',
        description:
          'Centralisez remboursements partiels, codes avoirs et validations manager.',
        icon: FiRefreshCcw,
        metrics: [
          { label: 'Demandes en attente', value: '7' },
          { label: 'Montant remboursé (30j)', value: '€ 8 400' },
        ],
        features: [
          { title: 'Workflow multi-niveaux', detail: 'Validation finance si > €500.' },
          { title: 'Avoirs digitaux', detail: 'Génération de coupons personnalisés.' },
          { title: 'Motifs standardisés', detail: 'Stats pour l’amélioration produit.' },
        ],
        actions: [
          { label: 'Initier un remboursement', description: 'Carte, wallet ou avoir', variant: 'primary' },
          { label: 'Consulter l’historique', description: 'Logs détaillés', variant: 'secondary' },
        ],
      },
      {
        key: 'payments-risk',
        label: 'Risques & conformité',
        summary: 'Fraude, chargebacks, conformité KYC.',
        description:
          'Automatisez vos contrôles fraude et gardez une vision claire des litiges bancaires.',
        icon: FiShield,
        metrics: [
          { label: 'Chargebacks actifs', value: '2', trend: 'down' },
          { label: 'Alertes fraude', value: '5' },
        ],
        features: [
          { title: 'Scoring temps réel', detail: 'Règles + machine learning PSP.' },
          { title: 'Listes de surveillance', detail: 'Emails, IBAN, IP bannies.' },
          { title: 'Journal conformité', detail: 'POI/POA, KYC, limites légales.' },
        ],
        actions: [
          { label: 'Revoir les alertes', description: 'Filtrer par gravité', variant: 'primary' },
          { label: 'Télécharger le rapport', description: 'Format régulateur', variant: 'secondary' },
        ],
      },
    ],
  },
  deliveries: {
    badge: 'Bloc livraisons',
    title: 'Transport & expérience client',
    description: 'Supervisez les transporteurs, les SLA et les points de contact clients.',
    footerNote: 'Prévu pour s’intégrer avec vos partenaires logistiques.',
    subSections: [
      {
        key: 'deliveries-carriers',
        label: 'Transporteurs & tarifs',
        summary: 'Piloter les partenaires logistiques.',
        description:
          'Comparez les coûts, SLA et zones desservies de vos partenaires et transporteurs internes.',
        icon: FiTruck,
        metrics: [
          { label: 'Transporteurs actifs', value: '6' },
          { label: 'SLA respecté', value: '96 %', trend: 'up' },
        ],
        features: [
          { title: 'Catalogue tarifs', detail: 'Tranches poids, zones, options express.' },
          { title: 'Score qualité', detail: 'Livraison à l’heure, incidents, NPS.' },
          { title: 'Recommandations', detail: 'Transporteur suggéré par commande.' },
        ],
        actions: [
          { label: 'Ajouter un transporteur', description: 'Connecter API ou forfait', variant: 'primary' },
          { label: 'Mettre à jour les tarifs', description: 'Importer Excel', variant: 'secondary' },
        ],
      },
      {
        key: 'deliveries-tracking',
        label: 'Suivi & notifications',
        summary: 'Informer proactivement les clients.',
        description:
          'Centralisez les numéros de suivi, envoyez des notifications multicanales et détectez les anomalies.',
        icon: FiMapPin,
        metrics: [
          { label: 'Colis suivis', value: '1 420' },
          { label: 'Incidents détectés', value: '12', trend: 'up' },
        ],
        features: [
          { title: 'Timeline tracking', detail: 'Évènements normalisés quels que soient les transporteurs.' },
          { title: 'Notifications configurables', detail: 'Email, SMS, WhatsApp aux étapes clés.' },
          { title: 'Priorisation incidents', detail: 'Retards, colis bloqués, adresse invalide.' },
        ],
        actions: [
          { label: 'Envoyer une notification', description: 'Personnaliser le message', variant: 'primary' },
          { label: 'Ouvrir le monitoring', description: 'Vue heatmap', variant: 'secondary' },
        ],
      },
      {
        key: 'deliveries-pickup',
        label: 'Click & collect / relais',
        summary: 'Optimiser les retraits magasin.',
        description:
          'Gérez vos stocks magasin, la préparation et la communication client pour les retraits.',
        icon: FiHome,
        metrics: [
          { label: 'Commandes prêtes', value: '52' },
          { label: 'Retards retrait', value: '3', trend: 'down' },
        ],
        features: [
          { title: 'Planification créneaux', detail: 'Clients choisissent une plage calculée.' },
          { title: 'Check-in store', detail: 'Scan QR, remise rapide.' },
          { title: 'Relance automatique', detail: 'SMS + email avant annulation.' },
        ],
        actions: [
          { label: 'Ouvrir le planning', description: 'Vue magasin', variant: 'primary' },
          { label: 'Relancer les clients', description: 'Notification groupée', variant: 'secondary' },
        ],
      },
    ],
  },
  content: {
    badge: 'Bloc contenu',
    title: 'Branding & animation commerciale',
    description: 'Pilotez vos pages, bannières et campagnes éditoriales.',
    footerNote: 'CMS interne connectable à vos assets DAM.',
    subSections: [
      {
        key: 'content-banners',
        label: 'Bannières & hero',
        summary: 'Planifier les campagnes visuelles.',
        description:
          'Programmez vos contenus hero, carrousels et landing pages promotionnelles.',
        icon: FiImage,
        metrics: [
          { label: 'Bannières actives', value: '12' },
          { label: 'CTR moyen', value: '4,8 %', trend: 'up' },
        ],
        features: [
          { title: 'Planning éditorial', detail: 'Vue calendrier avec preview responsive.' },
          { title: 'A/B testing', detail: 'Comparaison visuels / wording.' },
          { title: 'Bibliothèque médias', detail: 'DAM avec tags et droits.' },
        ],
        actions: [
          { label: 'Créer une bannière', description: 'Uploader visuels & CTA', variant: 'primary' },
          { label: 'Consulter le planning', description: 'Vue calendrier', variant: 'secondary' },
        ],
      },
      {
        key: 'content-pages',
        label: 'Pages & CMS',
        summary: 'Gérer les pages légales, blog et partenaires.',
        description:
          'Modifiez vos pages statiques, créez des articles et publiez des contenus multilingues.',
        icon: FiBookOpen,
        metrics: [
          { label: 'Pages actives', value: '42' },
          { label: 'Traductions en retard', value: '5', trend: 'up' },
        ],
        features: [
          { title: 'Éditeur bloc', detail: 'Drag & drop, composants prêts à l’emploi.' },
          { title: 'Contrôle versions', detail: 'Historique & rollback instantané.' },
          { title: 'Workflow validation', detail: 'Rédacteur → Relecteur → Publication.' },
        ],
        actions: [
          { label: 'Créer une page', description: 'Choisir un modèle', variant: 'primary' },
          { label: 'Suivre les validations', description: 'Checklist publication', variant: 'secondary' },
        ],
      },
      {
        key: 'content-seo',
        label: 'SEO & méta-données',
        summary: 'Optimiser référencement et structure.',
        description:
          'Pilotez vos titres SEO, données structurées et redirections.',
        icon: FiGlobe,
        metrics: [
          { label: 'Pages optimisées', value: '78 %', trend: 'up' },
          { label: 'Redirections actives', value: '120' },
        ],
        features: [
          { title: 'Checklist SEO', detail: 'Longueur titre, meta, Hn, maillage.' },
          { title: 'Schema.org builder', detail: 'JSON-LD prêt pour Google.' },
          { title: 'Gestion redirections', detail: '301, 302, règles par lot.' },
        ],
        actions: [
          { label: 'Analyser une page', description: 'Audit en 1 clic', variant: 'primary' },
          { label: 'Créer une redirection', description: 'Rule builder', variant: 'secondary' },
        ],
      },
    ],
  },
  stats: {
    badge: 'Bloc statistiques',
    title: 'Analyse & prise de décision',
    description: 'Combinez indicateurs ventes, marketing et supply.',
    footerNote: 'Exports PDF/Excel et connecteurs BI à venir.',
    subSections: [
      {
        key: 'stats-executive',
        label: 'Vue exécutive',
        summary: 'Piloter les KPI globaux.',
        description:
          'CA, marge, panier moyen, croissance YoY avec mise en avant des signaux forts/faibles.',
        icon: FiPieChart,
        metrics: [
          { label: 'CA (M-1)', value: '€ 1,2 M' },
          { label: 'Marge brute', value: '38 %', trend: 'up' },
        ],
        features: [
          { title: 'Cartes KPI', detail: 'Seuils personnalisables, badges tendance.' },
          { title: 'Commentaires', detail: 'Insights éditoriaux par équipe.' },
          { title: 'Exports PDF', detail: 'Rapport automatique hebdo.' },
        ],
        actions: [
          { label: 'Partager le rapport', description: 'Envoi email programmé', variant: 'primary' },
          { label: 'Ajouter un insight', description: 'Note collaborative', variant: 'secondary' },
        ],
      },
      {
        key: 'stats-sales',
        label: 'Performance produits',
        summary: 'Top ventes & marges.',
        description:
          'Analysez saisonnalité, vente par canal et efficacité promotionnelle.',
        icon: FiTrendingUp,
        metrics: [
          { label: 'Top SKU (CA)', value: 'SKU-9842' },
          { label: 'Taux de conversion', value: '3,2 %' },
        ],
        features: [
          { title: 'Heatmap des ventes', detail: 'Croisement catégorie × canal.' },
          { title: 'Analyse promo', detail: 'Impact sur panier et marge.' },
          { title: 'Prévisions', detail: 'Projection 30/60/90 jours.' },
        ],
        actions: [
          { label: 'Exporter les ventes', description: 'CSV détaillé', variant: 'primary' },
          { label: 'Créer une alerte', description: 'Notifier si marge < seuil', variant: 'secondary' },
        ],
      },
      {
        key: 'stats-stock',
        label: 'Stocks & supply',
        summary: 'Couverture et ruptures.',
        description:
          'Suivez la couverture de stock, les ruptures imminentes et les surstocks.',
        icon: FiBarChart,
        metrics: [
          { label: 'Couverture moyenne', value: '34 jours' },
          { label: 'Ruptures critiques', value: '11', trend: 'up' },
        ],
        features: [
          { title: 'Courbe couverture', detail: 'Projection par famille produit.' },
          { title: 'Alertes smart', detail: 'Reco réappro selon ventes + délai fournisseur.' },
          { title: 'Score obsolescence', detail: 'Identifier les surstocks.' },
        ],
        actions: [
          { label: 'Ouvrir le cockpit stock', description: 'Vue détaillée', variant: 'primary' },
          { label: 'Programmer un rapport', description: 'Email hebdo', variant: 'secondary' },
        ],
      },
    ],
  },
  admins: {
    badge: 'Bloc administrateurs',
    title: 'Sécurité & gouvernance',
    description: 'Contrôlez les accès, rôles et traçabilité des actions.',
    footerNote: 'Compatible SSO, SCIM et politique de rotation des accès.',
    subSections: [
      {
        key: 'admins-roles',
        label: 'Rôles & permissions',
        summary: 'Définir le périmètre de chaque équipe.',
        description:
          'Créez des rôles granulaires (Manager, Préparateur, Financier) et assignez-les aux utilisateurs.',
        icon: FiShield,
        metrics: [
          { label: 'Utilisateurs actifs', value: '34' },
          { label: 'Rôles personnalisés', value: '7' },
        ],
        features: [
          { title: 'Matrix permission', detail: 'CRUD par module, actions sensibles protégées.' },
          { title: 'Groupes dynamiques', detail: 'Assignation auto selon équipe ou pays.' },
          { title: 'Revues périodiques', detail: 'Notifications pour vérifier les accès.' },
        ],
        actions: [
          { label: 'Créer un rôle', description: 'Sélectionner modules autorisés', variant: 'primary' },
          { label: 'Inviter un utilisateur', description: 'Email d’onboarding', variant: 'secondary' },
        ],
      },
      {
        key: 'admins-audit',
        label: 'Journal d’activité',
        summary: 'Tracer chaque action critique.',
        description:
          'Consultez qui a fait quoi, quand et depuis quel appareil.',
        icon: FiActivity,
        metrics: [
          { label: 'Évènements / 24h', value: '1 240' },
          { label: 'Alertes remontées', value: '3', trend: 'down' },
        ],
        features: [
          { title: 'Filtres rapides', detail: 'Module, utilisateur, type d’action.' },
          { title: 'Export sécurisé', detail: 'Audit externe, conformité ISO.' },
          { title: 'Alerting', detail: 'Webhook SIEM, Slack sécurité.' },
        ],
        actions: [
          { label: 'Consulter le journal', description: 'Recherche avancée', variant: 'primary' },
          { label: 'Configurer une alerte', description: 'Déclencheur custom', variant: 'secondary' },
        ],
      },
      {
        key: 'admins-security',
        label: 'Sécurité & conformité',
        summary: '2FA, SSO, politiques d’accès.',
        description:
          'Appliquez MFA obligatoire, gérez les clés API et surveillez les sessions actives.',
        icon: FiLock,
        metrics: [
          { label: 'Utilisateurs MFA', value: '97 %', trend: 'up' },
          { label: 'Sessions actives', value: '14' },
        ],
        features: [
          { title: 'SSO / SCIM', detail: 'Connexion Azure AD, Google Workspace, Okta.' },
          { title: 'Rotation clés API', detail: 'Expiration automatique et alertes.' },
          { title: 'Politique mot de passe', detail: 'Complexité + expiration configurable.' },
        ],
        actions: [
          { label: 'Activer le MFA obligatoire', description: 'Forcer tous les rôles', variant: 'primary' },
          { label: 'Gérer les clés API', description: 'Créer/Révoquer', variant: 'secondary' },
        ],
      },
    ],
  },
  settings: {
    badge: 'Bloc paramètres',
    title: 'Configuration globale',
    description: 'Administrez votre identité, fiscalité et intégrations.',
    footerNote: 'Chaque modification est historisée et peut être exportée.',
    subSections: [
      {
        key: 'settings-brand',
        label: 'Identité & contact',
        summary: 'Branding, coordonnées, horaires.',
        description:
          'Gérez logos, couleurs, infos légales et moyens de contact affichés sur le site.',
        icon: FiTool,
        metrics: [
          { label: 'Dernière mise à jour', value: '12 nov.' },
          { label: 'Variantes de thème', value: '3' },
        ],
        features: [
          { title: 'Thèmes enregistrés', detail: 'Clair, foncé, saisonnier.' },
          { title: 'Multi-site', detail: 'Paramètres par domaine ou langue.' },
          { title: 'Bannières légales', detail: 'CGV, confidentialité, cookies.' },
        ],
        actions: [
          { label: 'Modifier l’apparence', description: 'Palette, typos, logo', variant: 'primary' },
          { label: 'Mettre à jour les infos', description: 'Email, téléphone, horaires', variant: 'secondary' },
        ],
      },
      {
        key: 'settings-taxes',
        label: 'Taxes & devises',
        summary: 'TVA, zones, multi-devises.',
        description:
          'Configurez les règles fiscales, les taux personnalisés et les conversions en temps réel.',
        icon: FiGlobe,
        metrics: [
          { label: 'Pays actifs', value: '14' },
          { label: 'Devises supportées', value: '5' },
        ],
        features: [
          { title: 'Règles conditionnelles', detail: 'B2B, franchises en base, marketplaces.' },
          { title: 'Taux automatiques', detail: 'Mise à jour via API fiscale.' },
          { title: 'Conversion devises', detail: 'Taux moyen + marge paramétrable.' },
        ],
        actions: [
          { label: 'Ajouter une zone', description: 'Pays ou état/province', variant: 'primary' },
          { label: 'Importer un barème', description: 'CSV administrations', variant: 'secondary' },
        ],
      },
      {
        key: 'settings-integrations',
        label: 'Connecteurs & API',
        summary: 'Brancher vos outils externes.',
        description:
          'Activez les intégrations paiement, marketing, analytics, ERP ou CRM.',
        icon: FiLink,
        metrics: [
          { label: 'Connecteurs actifs', value: '9' },
          { label: 'Échecs webhooks', value: '0', trend: 'down' },
        ],
        features: [
          { title: 'Catalogue connecteurs', detail: 'Paiement, logistique, analytics.' },
          { title: 'Sandbox & prod', detail: 'Clés distinctes, logs dédiés.' },
          { title: 'Supervision API', detail: 'Latence, taux d’erreur, alertes.' },
        ],
        actions: [
          { label: 'Ajouter une intégration', description: 'Assistant guidé', variant: 'primary' },
          { label: 'Consulter les logs API', description: 'Debug en temps réel', variant: 'secondary' },
        ],
      },
    ],
  },
}

interface AdminOrdersClientProps {
  initialOrders: OrderRecord[]
  adminEmail: string
}

export default function AdminOrdersClient({ initialOrders, adminEmail }: AdminOrdersClientProps) {
  const [orders, setOrders] = useState<OrderRecord[]>(initialOrders)
  const [selectedStatus, setSelectedStatus] = useState<'all' | OrderStatus>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isRefreshing, startRefreshTransition] = useTransition()
  const router = useRouter()

  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard')
  const [activeSubSectionBySection, setActiveSubSectionBySection] = useState<
    Partial<Record<AdminSection, string>>
  >(() => {
    const initial: Partial<Record<AdminSection, string>> = {}
    Object.entries(advancedSectionConfigs).forEach(([sectionKey, config]) => {
      if (config?.subSections.length) {
        initial[sectionKey as AdminSection] = config.subSections[0].key
      }
    })
    return initial
  })

  const focusSection = (section: AdminSection, subKey?: string) => {
    setActiveSection(section)
    if (advancedSectionConfigs[section]?.subSections.length) {
      setActiveSubSectionBySection((prev) => {
        const fallback = advancedSectionConfigs[section]?.subSections[0]?.key ?? ''
        return {
          ...prev,
          [section]: subKey || prev[section] || fallback,
        }
      })
    }
  }

  const sections: { key: AdminSection; label: string; icon: IconType }[] = [
    { key: 'dashboard', label: 'Tableau de bord', icon: FiHome },
    { key: 'products', label: 'Produits', icon: FiPackage },
    { key: 'orders', label: 'Commandes', icon: FiFileText },
    { key: 'import', label: 'Importation', icon: FiTruck },
    { key: 'clients', label: 'Clients', icon: FiUsers },
    { key: 'payments', label: 'Paiements', icon: FiCreditCard },
    { key: 'deliveries', label: 'Livraisons', icon: FiTruck },
    { key: 'content', label: 'Contenu', icon: FiFileText },
    { key: 'stats', label: 'Statistiques', icon: FiBarChart },
    { key: 'admins', label: 'Administrateurs', icon: FiShield },
    { key: 'settings', label: 'Paramètres', icon: FiSettings },
  ]

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
      const term = searchTerm.trim().toLowerCase()
      const matchesSearch =
        !term ||
        order.id.toLowerCase().includes(term) ||
        (order.email && order.email.toLowerCase().includes(term))
      return matchesStatus && matchesSearch
    })
  }, [orders, selectedStatus, searchTerm])

  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + order.total, 0),
    [orders]
  )

  const activeOrdersCount = useMemo(
    () => orders.filter((order) => order.status !== 'Livrée').length,
    [orders]
  )
  const awaitingPaymentCount = useMemo(
    () => orders.filter((order) => order.status === 'En attente').length,
    [orders]
  )
  const shippedOrdersCount = useMemo(
    () => orders.filter((order) => order.status === 'Expédiée').length,
    [orders]
  )

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(date))

  const heroStats = useMemo(
    () => [
      {
        label: "Chiffre d'affaires estimé",
        value: formatCurrency(totalRevenue),
        trend: '+12% vs hier',
        direction: 'up' as 'up' | 'down',
      },
      {
        label: 'Commandes actives',
        value: activeOrdersCount.toString(),
        trend: '+5 nouvelles',
        direction: 'up' as 'up' | 'down',
      },
      {
        label: 'En attente de paiement',
        value: awaitingPaymentCount.toString(),
        trend: '-2 litiges',
        direction: 'down' as 'up' | 'down',
      },
      {
        label: 'Expédiées',
        value: shippedOrdersCount.toString(),
        trend: '+3 aujourd’hui',
        direction: 'up' as 'up' | 'down',
      },
    ],
    [activeOrdersCount, awaitingPaymentCount, shippedOrdersCount, totalRevenue]
  )

  const quickActions = useMemo<
    { label: string; description: string; icon: IconType; section: AdminSection; subKey?: string }[]
  >(
    () => [
      {
        label: 'Créer un produit',
        description: 'Fiche catalogue complète',
        icon: FiPlusCircle,
        section: 'products',
        subKey: 'product-crud',
      },
      {
        label: 'Suivre les commandes',
        description: 'Board temps réel',
        icon: FiClipboard,
        section: 'orders',
        subKey: 'orders-fulfillment',
      },
      {
        label: 'Piloter les stats',
        description: 'Vue exécutive',
        icon: FiBarChart,
        section: 'stats',
        subKey: 'stats-executive',
      },
    ],
    []
  )

  const dashboardHighlights = useMemo(
    () => [
      {
        key: 'orders',
        eyebrow: 'Flux logistique',
        title: 'Commandes en cours',
        value: activeOrdersCount.toString(),
        note: '+5 vs hier',
        gradient: 'from-blue-500/80 to-indigo-500/80',
        description: 'Priorité donnée aux commandes VIP et B2B.',
      },
      {
        key: 'revenue',
        eyebrow: 'Performance commerciale',
        title: 'CA projeté (30j)',
        value: formatCurrency(totalRevenue * 1.12),
        note: '+12 %',
        gradient: 'from-purple-500/80 to-pink-500/80',
        description: 'Projection basée sur la tendance des 7 derniers jours.',
      },
      {
        key: 'payments',
        eyebrow: 'Paiements',
        title: 'En attente de règlement',
        value: awaitingPaymentCount.toString(),
        note: '-2 litiges',
        gradient: 'from-amber-500/80 to-orange-500/80',
        description: 'Acomptes et cartes en vérification PSP.',
      },
      {
        key: 'deliveries',
        eyebrow: 'Livraisons',
        title: 'Expédiées aujourd’hui',
        value: shippedOrdersCount.toString(),
        note: '+3 colis',
        gradient: 'from-emerald-500/80 to-teal-500/80',
        description: 'Synchronisé avec DHL, UPS et dispatch local.',
      },
    ],
    [activeOrdersCount, awaitingPaymentCount, shippedOrdersCount, totalRevenue]
  )

  type TimelineStatus = 'success' | 'warning' | 'info'

  const activityTimeline = useMemo(
    () => [
      {
        time: '09:24',
        title: 'Nouvelle commande #DS-9472',
        detail: 'Client : anna@importtech.fr · 4 560 €',
        status: 'success' as TimelineStatus,
      },
      {
        time: '08:10',
        title: 'Contrôle qualité conteneur #KX-11',
        detail: 'Entrepôt Lomé – attente validation photos',
        status: 'warning' as TimelineStatus,
      },
      {
        time: '07:45',
        title: 'Paiement confirmé Mobile Money',
        detail: 'Référence PSP-88321 · 980 €',
        status: 'success' as TimelineStatus,
      },
      {
        time: '07:12',
        title: 'Alerte stock textile',
        detail: 'Variante TXL – seuil minimum franchi',
        status: 'info' as TimelineStatus,
      },
    ],
    []
  )

  const upcomingActions = useMemo(
    () => [
      {
        title: 'Point logistique DHL',
        description: 'Synchroniser les nouveaux tarifs zone Afrique',
        time: 'Aujourd’hui · 15h30',
        icon: FiTruck,
      },
      {
        title: 'Comité pricing',
        description: 'Valider les promotions semaine 48',
        time: 'Demain · 09h00',
        icon: FiBarChart,
      },
      {
        title: 'Revue partenaires',
        description: 'Onboarding 3 fournisseurs santé',
        time: 'Jeudi · 14h00',
        icon: FiUsers,
      },
    ],
    []
  )

  const refreshOrders = () => {
    startRefreshTransition(async () => {
      try {
        const res = await fetch('/api/orders', { cache: 'no-store' })
        if (!res.ok) {
          throw new Error('Impossible de récupérer les commandes')
        }
        const data = await res.json()
        setOrders(data.orders ?? [])
        router.refresh()
      } catch (error) {
        console.error(error)
        setFeedback({ type: 'error', message: 'Erreur lors du rafraîchissement des données' })
      }
    })
  }

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    setPendingOrderId(orderId)
    setFeedback(null)
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Impossible de mettre à jour le statut')
      }

      const data = await res.json()
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? data.order : order))
      )
      setFeedback({ type: 'success', message: `Commande ${orderId} mise à jour` })
    } catch (error: unknown) {
      console.error(error)
      const message =
        typeof error === 'object' && error && 'message' in error
          ? String((error as { message?: string }).message)
          : 'Erreur inattendue'
      setFeedback({ type: 'error', message })
    } finally {
      setPendingOrderId(null)
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const timelineStatusStyles: Record<
    TimelineStatus,
    { dot: string; badge: string }
  > = {
    success: {
      dot: 'border-emerald-100 bg-emerald-500',
      badge: 'border border-emerald-100 bg-emerald-50 text-emerald-700',
    },
    warning: {
      dot: 'border-amber-100 bg-amber-500',
      badge: 'border border-amber-100 bg-amber-50 text-amber-700',
    },
    info: {
      dot: 'border-blue-100 bg-blue-500',
      badge: 'border border-blue-100 bg-blue-50 text-blue-700',
    },
  }

  const renderAdvancedSection = (sectionKey: AdminSection, extraContent?: ReactNode) => {
    const config = advancedSectionConfigs[sectionKey]
    if (!config || config.subSections.length === 0) {
      return null
    }

    const activeSubKey =
      activeSubSectionBySection[sectionKey] ?? config.subSections[0].key

    const activePanel =
      config.subSections.find((sub) => sub.key === activeSubKey) ??
      config.subSections[0]

    const metrics = activePanel.metrics ?? []
    const features = activePanel.features ?? []
    const actions = activePanel.actions ?? []

    return (
      <section className="space-y-6 rounded-3xl border border-slate-100/80 bg-white/95 p-6 shadow-xl ring-1 ring-black/5 supports-[backdrop-filter]:backdrop-blur">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            {config.badge}
          </p>
          <h2 className="text-2xl font-bold text-gray-900">{config.title}</h2>
          <p className="text-sm text-gray-600">{config.description}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-xs font-semibold uppercase text-gray-500">Sous-points</p>
            <div className="space-y-2">
              {config.subSections.map((sub) => {
                const Icon = sub.icon
                const isActive = activePanel.key === sub.key
                return (
                  <button
                    key={sub.key}
                    type="button"
                    onClick={() =>
                      setActiveSubSectionBySection((prev) => ({
                        ...prev,
                        [sectionKey]: sub.key,
                      }))
                    }
                    className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                      isActive
                        ? 'border-blue-200 bg-white text-blue-700 shadow-md'
                        : 'border-transparent bg-transparent text-gray-700 hover:bg-white hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-base ${
                          isActive ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{sub.label}</p>
                        <p className="text-xs text-gray-500">{sub.summary}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                {activePanel.label}
              </p>
              <h3 className="mt-1 text-xl font-bold text-gray-900">Répondre au besoin</h3>
              <p className="mt-2 text-sm text-gray-600">{activePanel.description}</p>
            </div>

            {metrics.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {metrics.map((metric) => (
                  <article
                    key={metric.label}
                    className="rounded-2xl border border-slate-100 bg-white p-4 shadow-md"
                  >
                    <p className="text-xs font-medium uppercase text-gray-500">{metric.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">{metric.value}</p>
                    {metric.trend && (
                      <p
                        className={`text-xs font-medium ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {metric.trend === 'up' ? 'Progression' : 'Baisse'}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}

            {features.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <article
                    key={feature.title}
                    className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm"
                  >
                    <h4 className="text-base font-semibold text-gray-900">{feature.title}</h4>
                    <p className="mt-1 text-sm text-gray-600">{feature.detail}</p>
                  </article>
                ))}
              </div>
            )}

            {actions.length > 0 && (
              <div className="flex flex-col gap-3 sm:flex-row">
                {actions.map((action) => {
                  const actionClasses =
                    action.variant === 'primary'
                      ? 'border-blue-500 bg-blue-600 text-white hover:bg-blue-500'
                      : 'border-gray-200 bg-white text-gray-800 hover:border-blue-200 hover:text-blue-700'
                  const descriptionClasses =
                    action.variant === 'primary' ? 'text-white/80' : 'text-gray-500'

                  return (
                    <button
                      key={action.label}
                      type="button"
                      className={`flex-1 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${actionClasses}`}
                    >
                      <span>{action.label}</span>
                      <p className={`text-xs font-normal ${descriptionClasses}`}>
                        {action.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            )}

            {config.footerNote && (
              <p className="text-xs text-gray-500">{config.footerNote}</p>
            )}
          </div>
        </div>

        {extraContent && <div className="pt-4">{extraContent}</div>}
      </section>
    )
  }

  const renderSection = () => {
    if (activeSection === 'dashboard') {
      return (
        <section className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {dashboardHighlights.map((card) => (
                  <article
                    key={card.key}
                    className={`rounded-3xl border border-white/20 bg-gradient-to-br ${card.gradient} p-5 text-white shadow-xl`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
                      {card.eyebrow}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold">{card.title}</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{card.value}</span>
                      <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
                        {card.note}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-white/80">{card.description}</p>
                  </article>
                ))}
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white/95 p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      Opérations
                    </p>
                    <h2 className="text-2xl font-bold text-slate-900">Activité temps réel</h2>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-blue-200 hover:text-blue-700"
                  >
                    Rafraîchir
                    <FiRefreshCcw className="h-3.5 w-3.5" />
                  </button>
                </div>

                <ol className="mt-6 space-y-6 border-l border-slate-200 pl-6">
                  {activityTimeline.map((item, index) => (
                    <li key={`${item.time}-${index}`} className="relative pl-2">
                      <span
                        className={`absolute -left-[11px] top-1 h-4 w-4 rounded-full border-4 ${timelineStatusStyles[item.status].dot}`}
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {item.time}
                          </span>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${timelineStatusStyles[item.status].badge}`}
                          >
                            {item.status === 'success'
                              ? 'Validé'
                              : item.status === 'warning'
                              ? 'À surveiller'
                              : 'Info'}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <p className="text-sm text-slate-500">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="space-y-4 rounded-3xl border border-slate-100 bg-white/95 p-6 shadow-xl">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Agenda
                </p>
                <h3 className="text-xl font-bold text-slate-900">Actions à venir</h3>
                <p className="text-sm text-slate-500">Gérez vos priorités pour les 48 h.</p>
              </div>

              <div className="space-y-3">
                {upcomingActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <article
                      key={action.title}
                      className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">{action.title}</p>
                        <p className="text-sm text-slate-500">{action.description}</p>
                        <p className="mt-2 text-xs font-semibold text-blue-600">{action.time}</p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </aside>
          </div>
        </section>
      )
    }

    if (activeSection === 'orders') {
      const ordersManagementPanel = (
        <div className="space-y-6 rounded-3xl border border-slate-100/80 bg-white/95 p-6 shadow-xl ring-1 ring-black/5 supports-[backdrop-filter]:backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <label className="font-medium text-gray-700">
                Filtrer par statut
                <select
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:mt-0 sm:w-48"
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value as 'all' | OrderStatus)}
                >
                  <option value="all">Tous les statuts</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <label className="font-medium text-gray-700">
                Recherche
                <input
                  type="search"
                  placeholder="ID commande ou email client"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:mt-0 sm:w-80"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''} affichée{filteredOrders.length > 1 ? 's' : ''}
            </p>
          </div>

          {feedback && (
            <div
              className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
                feedback.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-100'
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}
            >
              {feedback.type === 'success' ? (
                <FiCheckCircle className="h-5 w-5" />
              ) : (
                <FiAlertCircle className="h-5 w-5" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {filteredOrders.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-gray-500">
              Aucune commande ne correspond à vos filtres.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-lg"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Commande #{order.id}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Passée le {formatDate(order.date)}
                      </p>
                      {order.email && (
                        <p className="mt-1 text-sm text-gray-600">
                          Client : <span className="font-medium">{order.email}</span>
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusColors[order.status]}`}
                      >
                        {order.status}
                      </span>
                      <p className="text-lg font-bold text-blue-600">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
                    <ul className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex justify-between">
                          <span>
                            {item.name}{' '}
                            <span className="text-gray-500">× {item.quantity}</span>
                          </span>
                          <span className="font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Mettre à jour le statut
                        <select
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={order.status}
                          onChange={(event) =>
                            updateStatus(order.id, event.target.value as OrderStatus)
                          }
                          disabled={pendingOrderId === order.id}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </label>
                      <p className="text-xs text-gray-500">
                        Numéro de suivi : <span className="font-medium">{order.trackingNumber ?? `TRK-${order.id}`}</span>
                      </p>
                    </div>
                  </div>

                  {pendingOrderId === order.id && (
                    <p className="mt-3 text-sm text-blue-600">
                      Mise à jour du statut en cours...
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      )

      return renderAdvancedSection('orders', ordersManagementPanel)
    }

    if (advancedSectionConfigs[activeSection]) {
      return renderAdvancedSection(activeSection)
    }

    return null
  }

  return (
    <div className="min-h-screen bg-slate-100/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-950 via-indigo-900 to-blue-900 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 opacity-30 blur-3xl">
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),transparent_55%)]" />
          </div>
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Administration</p>
                <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">Tableau de bord administrateur</h1>
                <p className="mt-2 text-sm text-white/80">
                  Connecté en tant que <span className="font-semibold text-white">{adminEmail || 'Administrateur'}</span>
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={refreshOrders}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 disabled:opacity-50"
                  disabled={isRefreshing}
                >
                  <FiRefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Rafraîchissement...' : 'Rafraîchir les données'}
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100"
                >
                  <FiLogOut className="h-4 w-4" />
                  Déconnexion
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {heroStats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{stat.label}</p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    {stat.trend && (
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium ${
                          stat.direction === 'up' ? 'text-emerald-200' : 'text-rose-200'
                        }`}
                      >
                        {stat.direction === 'up' ? (
                          <FiTrendingUp className="h-3.5 w-3.5" />
                        ) : (
                          <FiTrendingDown className="h-3.5 w-3.5" />
                        )}
                        {stat.trend}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => focusSection(action.section, action.subKey)}
                    className="group rounded-2xl border border-white/15 bg-white/5 p-4 text-left transition hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{action.label}</p>
                        <p className="text-xs text-white/70">{action.description}</p>
                      </div>
                      <FiArrowUpRight className="h-4 w-4 text-white/60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-xl ring-1 ring-black/5 backdrop-blur lg:sticky lg:top-8">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Navigation</p>
              <p className="text-sm text-slate-500">Accédez rapidement aux blocs clé</p>
            </div>
            <nav className="space-y-1">
              {sections.map(({ key, label, icon: Icon }) => {
                const isActive = activeSection === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => focusSection(key)}
                    className={`group flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-inner shadow-blue-100'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                          isActive
                            ? 'border-blue-200 bg-white text-blue-700'
                            : 'border-slate-200 bg-white text-slate-500'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      {label}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isActive ? 'bg-blue-500' : 'bg-slate-300 group-hover:bg-slate-400'
                      }`}
                    />
                  </button>
                )
              })}
            </nav>
          </aside>

          <main className="space-y-6">
            {renderSection()}
          </main>
        </div>
      </div>
    </div>
  )
}


