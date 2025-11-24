export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  image: string
  alt?: string
  colors?: string[]
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Électronique Industrielle Premium',
    price: 450,
    category: 'Électronique',
    description: 'Composants électroniques haute qualité pour applications industrielles. Ces composants sont testés et certifiés pour une utilisation en environnement industriel exigeant. Résistance aux températures extrêmes, protection contre les surtensions et garantie de performance optimale.',
    image: '/images/productsCatalogue/electronique-1.jpg',
    alt: "Électronique Industrielle",
    colors: ['#1E40AF', '#DC2626', '#059669', '#7C3AED', '#F59E0B'],
  },
  {
    id: '2',
    name: 'Textile Premium Coton Bio',
    price: 320,
    category: 'Textile',
    description: 'Tissus en coton biologique de première qualité. Certifié GOTS (Global Organic Textile Standard), ce textile est doux, respirant et durable. Idéal pour la confection de vêtements écoresponsables et de qualité supérieure.',
    image: '/images/productsCatalogue/textile-1.jpg',
    alt: 'Textile Premium',
    colors: ['#F3F4F6', '#FEF3C7', '#DBEAFE', '#FCE7F3', '#D1FAE5'],
  },
  {
    id: '3',
    name: 'Matériaux de Construction',
    price: 680,
    category: 'Construction',
    description: 'Matériaux résistants pour construction durable. Conformes aux normes européennes de construction, ces matériaux offrent une excellente isolation thermique et acoustique. Garantie 10 ans sur la qualité et la durabilité.',
    image: '/images/productsCatalogue/construction-1.jpg',
    alt: 'Matériaux de Construction',
    colors: ['#78716C', '#57534E', '#44403C', '#292524', '#1C1917'],
  },
  {
    id: '4',
    name: 'Équipements Médicaux',
    price: 1200,
    category: 'Médical',
    description: 'Équipements médicaux certifiés CE. Conformes aux normes de sécurité médicale européennes, ces équipements sont stérilisables et adaptés aux environnements hospitaliers. Maintenance et calibration incluses.',
    image: '/images/productsCatalogue/medical-1.jpg',
    alt: 'Équipements Médicaux',
    colors: ['#FFFFFF', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF'],
  },
  {
    id: '5',
    name: 'Produits Cosmétiques',
    price: 150,
    category: 'Cosmétique',
    description: 'Produits cosmétiques naturels et bio. Formulés sans parabènes, sans sulfates et sans parfums synthétiques. Testés dermatologiquement et certifiés bio. Respectueux de la peau et de l\'environnement.',
    image: '/images/productsCatalogue/cosmetique-1.jpg',
    alt: 'Produits Cosmétiques',
    colors: ['#FBBF24', '#F472B6', '#A78BFA', '#60A5FA', '#34D399'],
  },
  {
    id: '6',
    name: 'Mobilier Moderne',
    price: 890,
    category: 'Mobilier',
    description: 'Mobilier design contemporain fabriqué avec des matériaux durables. Design épuré et fonctionnel, parfait pour les espaces modernes. Assemblage facile avec instructions détaillées incluses. Garantie constructeur 2 ans.',
    image: '/images/productsCatalogue/mobilier-1.jpg',
    alt: 'Mobilier Moderne',
    colors: ['#92400E', '#78350F', '#713F12', '#422006', '#1C1917'],
  },
  {
    id: '7',
    name: 'Outils Professionnels',
    price: 280,
    category: 'Outillage',
    description: 'Outils professionnels haute performance. Fabriqués avec des matériaux de qualité supérieure pour une durabilité exceptionnelle. Garantie à vie sur les défauts de fabrication. Étui de rangement inclus.',
    image: '/images/productsCatalogue/outillage-1.jpg',
    alt: 'Outils Professionnels',
    colors: ['#DC2626', '#1F2937', '#F59E0B', '#6B7280', '#FFFFFF'],
  },
  {
    id: '8',
    name: 'Produits Alimentaires Bio',
    price: 95,
    category: 'Alimentaire',
    description: 'Produits alimentaires biologiques certifiés. Certifiés AB (Agriculture Biologique) et sans OGM. Produits frais, de saison et issus de producteurs locaux engagés. Emballage recyclable et écologique.',
    image: '/images/productsCatalogue/alimentaire-1.jpg',
    alt: 'Produits Alimentaires Bio',
    colors: ['#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B'],
  },
]

