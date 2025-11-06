export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category?: string;
  client?: string;
  year?: number;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Proyecto Madero",
    description:
      "Campaña integral de branding y experiencia digital para una de las cadenas de restaurantes más icónicas de México.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
    category: "Branding",
    client: "Madero",
    year: 2024,
  },
  {
    id: 2,
    title: "Kleenex Innovación",
    description:
      "Activación BTL y campaña digital que conectó emocionalmente con millones de consumidores.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop",
    category: "Marketing",
    client: "Kleenex",
    year: 2024,
  },
  {
    id: 3,
    title: "Burger King Digital",
    description:
      "Plataforma de e-commerce y app móvil que revolucionó la experiencia de pedidos en línea.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    category: "Desarrollo Digital",
    client: "Burger King",
    year: 2023,
  },
  {
    id: 4,
    title: "Kimberly-Clark Sustentable",
    description:
      "Campaña 360° que posicionó la sustentabilidad como pilar de la marca.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop",
    category: "Marketing",
    client: "Kimberly-Clark",
    year: 2023,
  },
  {
    id: 5,
    title: "Aviacsa Digital Experience",
    description:
      "Transformación digital completa de la experiencia del cliente con nueva plataforma web y app móvil.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop",
    category: "Desarrollo Digital",
    client: "Aviacsa",
    year: 2024,
  },
  {
    id: 6,
    title: "Diva Cup Brand Identity",
    description:
      "Rediseño completo de identidad visual y estrategia de marca para empresa líder en productos sustentables.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
    category: "Branding",
    client: "Diva Cup",
    year: 2023,
  },
  {
    id: 7,
    title: "Escudo E-commerce Platform",
    description:
      "Desarrollo de plataforma de comercio electrónico con integración de pagos y gestión de inventario.",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=800&fit=crop",
    category: "Desarrollo Digital",
    client: "Escudo",
    year: 2024,
  },
  {
    id: 8,
    title: "MIT Farma Campaign",
    description:
      "Campaña multicanual de marketing digital dirigida a profesionales de la salud.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop",
    category: "Marketing",
    client: "MIT Farma",
    year: 2023,
  },
  {
    id: 9,
    title: "Morton Brand Refresh",
    description:
      "Renovación completa de identidad de marca con nueva guía de estilo y aplicación en todos los puntos de contacto.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=800&fit=crop",
    category: "Branding",
    client: "Morton",
    year: 2024,
  },
  {
    id: 10,
    title: "Grupo Ordás Digital Strategy",
    description:
      "Estrategia digital integral que incluye SEO, marketing de contenidos y automatización de marketing.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    category: "Estrategia Digital",
    client: "Grupo Ordás",
    year: 2024,
  },
  {
    id: 11,
    title: "Preslow Mobile App",
    description:
      "Aplicación móvil nativa con diseño UX/UI que mejoró significativamente la experiencia del usuario.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop",
    category: "Desarrollo Digital",
    client: "Preslow",
    year: 2023,
  },
  {
    id: 12,
    title: "Similares Activation",
    description:
      "Activación BTL masiva con presencia en puntos de venta y campaña complementaria en redes sociales.",
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=800&fit=crop",
    category: "Marketing",
    client: "Similares",
    year: 2024,
  },
];

