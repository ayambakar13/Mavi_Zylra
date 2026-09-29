import { notFound } from "next/navigation";
import { EmptyState } from "@/components/catalog/EmptyState";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { getProductsBySubcategorySlug } from "@/content/taxonomy";

const slugs = ["handbags", "watches"];
export function generateStaticParams() { return slugs.map((slug) => ({ slug })); }
export default async function AccessoriesRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();
  const items = getProductsBySubcategorySlug(slug);
  const title = slug === "handbags" ? "Handbags" : "Watches";
  return <main><section className="catalog-heading"><p className="hero-subtitle">Accessories</p><h1>{title}</h1><p>{items.length} cataloged pieces.</p></section>{items.length ? <ProductGrid products={items} /> : <EmptyState title="No pieces yet" message="This section is ready for catalog data." />}</main>;
}
