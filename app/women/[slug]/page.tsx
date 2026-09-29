import { notFound } from "next/navigation";
import { EmptyState } from "@/components/catalog/EmptyState";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { getProductsBySubcategorySlug, getWomenCollectionProducts, womenCollections } from "@/content/taxonomy";
import type { Product } from "@/domain/catalog/types";
import { products } from "@/content/products";

const slugs = ["turkish", "kashmiri", "all-seasons", "handbags", "watches"];
export function generateStaticParams() { return slugs.map((slug) => ({ slug })); }

export default async function WomenRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let items: Product[] = [];
  let title = "";
  let description = "";
  if (slug === "turkish" || slug === "kashmiri") {
    items = getWomenCollectionProducts(slug);
    title = womenCollections[slug].label;
    description = womenCollections[slug].description;
  } else if (slug === "all-seasons") {
    items = products;
    title = "All Seasons";
    description = "The complete image-backed Zylra catalog.";
  } else if (slug === "handbags" || slug === "watches") {
    items = getProductsBySubcategorySlug(slug);
    title = slug === "handbags" ? "Handbags" : "Watches";
    description = `Current ${title.toLowerCase()} catalog.`;
  } else notFound();
  return <main><section className="catalog-heading"><p className="hero-subtitle">Women</p><h1>{title}</h1><p>{description} · {items.length} pieces.</p></section>{items.length ? <ProductGrid products={items} /> : <EmptyState title="No pieces yet" message="This section exists in the navigation, but its catalog is not populated yet." backHref="/women/all-seasons" />}</main>;
}
