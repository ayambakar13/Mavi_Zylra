import { products } from "@/content/products";

export type SeasonKey = "wandha" | "bahar" | "retkol" | "harud";

export const seasonGroups: Record<SeasonKey, { label: string; description: string; sourceCollections: string[] }> = {
  wandha: { label: "Wandha · Winter", description: "Winter-weight pieces and layered silhouettes.", sourceCollections: ["winter_casual_wear"] },
  bahar: { label: "Bahar · Spring", description: "Lighter dress and transitional silhouettes.", sourceCollections: ["kashmiri_Dress_collections", "casual_wear"] },
  retkol: { label: "Retkol · Summer", description: "Airier dresses and lighter accessories.", sourceCollections: ["Turkish_Dress_collections", "Turkish_hijab_series"] },
  harud: { label: "Harud · Autumn", description: "Textural layers and heritage accessories.", sourceCollections: ["Shawls", "Hand Bags", "watches"] }
};

export function getProductsBySeason(season: SeasonKey) {
  const sourceCollections = seasonGroups[season].sourceCollections;
  return products.filter((product) => sourceCollections.includes(product.sourceCollection));
}

export function getProductsBySourceCollection(sourceCollection: string) {
  return products.filter((product) => product.sourceCollection === sourceCollection);
}

export const womenCollections = {
  turkish: {
    label: "Turkish Collection",
    description: "Turkish dresses and hijab pieces from the current catalog.",
    sourceCollections: ["Turkish_Dress_collections", "Turkish_hijab_series"]
  },
  kashmiri: {
    label: "Kashmiri Collection",
    description: "Kashmiri dresses and shawls from the current catalog.",
    sourceCollections: ["kashmiri_Dress_collections", "Shawls"]
  }
} as const;

export function getWomenCollectionProducts(key: keyof typeof womenCollections) {
  const sources: readonly string[] = womenCollections[key].sourceCollections;
  return products.filter((product) => sources.includes(product.sourceCollection));
}

export function getProductsBySubcategorySlug(slug: string) {
  return products.filter((product) => product.subcategorySlug === slug);
}
