import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/content/products";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AddToBagButton } from "@/components/commerce/AddToBagButton";
import { formatMoney } from "@/domain/commerce/cart";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <main><Breadcrumbs /><div className="product-detail"><div className="product-detail-image"><Image src={product.image} alt={product.alt} fill priority sizes="(max-width: 900px) 100vw, 55vw" className="product-image" /></div><div className="product-detail-copy"><p className="product-category">{product.category} / {product.subcategory}</p><h1>{product.name}</h1><p className="product-sku">{product.sku}</p><p className="commerce-price product-detail-price">{formatMoney(product.salePrice ?? product.price ?? null, product.currency ?? "INR")}</p><p className="product-detail-description">{product.description}</p><div className="product-meta"><span>Catalog status</span><strong>Preview</strong></div><p className="product-note">{product.reviewNote}</p><div className="product-actions"><AddToBagButton product={product} /><Link className="button" href={`/category/${product.categorySlug}`}>Return to Category</Link><Link className="text-link" href={`/catalog/${product.subcategorySlug}`}>View Subcategory</Link></div></div></div></main>;
}
