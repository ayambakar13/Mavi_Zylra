import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { products } from "@/content/products";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function generateStaticParams() { return Array.from(new Set(products.map((p) => p.categorySlug))).map((category) => ({ category })); }
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const items = products.filter((product) => product.categorySlug === category);
  if (!items.length) notFound();
  const title = items[0].category;
  return <main><Breadcrumbs /><section className="catalog-heading"><p className="hero-subtitle">Zylra Catalog</p><h1>{title}</h1><p>{items.length} cataloged pieces.</p></section><ProductGrid products={items} /></main>;
}
