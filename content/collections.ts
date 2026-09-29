export type Collection = {
  slug: string;
  seasonLocal: string;
  season: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  previewProductId: string;
};

export const collections: Collection[] = [
  {
    slug: "wandha",
    seasonLocal: "Wandha",
    season: "Winter",
    title: "Tilla & Velvet Chapans",
    description: "Heavy wool velvet overcoats enriched with Kashmiri gold-thread embroidery and Central Asian silhouettes.",
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85",
    cta: "Discover Winter",
    previewProductId: "ZYL-WINTE-001"
  },
  {
    slug: "bahar",
    seasonLocal: "Bahar",
    season: "Spring",
    title: "Sozni Silk Kaftans",
    description: "Weightless mulberry silk drapes with Ottoman cutwork and delicate Kashmiri needlework flowers.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    cta: "Discover Spring",
    previewProductId: "ZYL-KASHM-001"
  },
  {
    slug: "retkol",
    seasonLocal: "Retkol",
    season: "Summer",
    title: "Linen & Adras Kurtas",
    description: "Breathable handloom cottons, linen trousers, and Central Asian ikat dusters built for summer warmth.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    cta: "Discover Summer",
    previewProductId: "ZYL-TURKI-001"
  },
  {
    slug: "harud",
    seasonLocal: "Harud",
    season: "Autumn",
    title: "Pashmina & Termeh Outerwear",
    description: "Hand-spun cashmere trenches and Persian woven jacquard waistcoats in chinar leaf earth tones.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    cta: "Discover Autumn",
    previewProductId: "ZYL-SHAWL-001"
  }
];
