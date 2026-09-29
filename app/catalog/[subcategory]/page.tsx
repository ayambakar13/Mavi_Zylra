import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { getProductsBySubcategory, products } from "@/content/products";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function generateStaticParams() { return Array.from(new Set(products.map((p) => p.subcategorySlug))).map((subcategory) => ({ subcategory })); }
export default async function SubcategoryPage({ params }: { params: Promise<{ subcategory: string }> }) {
  const { subcategory } = await params;
  const items = getProductsBySubcategory(subcategory);
  if (!items.length) notFound();
  const title = items[0].subcategory;
  return <main><Breadcrumbs /><section className="catalog-heading"><p className="hero-subtitle">Zylra Catalog</p><h1>{title}</h1><p>{items.length} cataloged pieces.</p></section><ProductGrid products={items} /></main>;
}
