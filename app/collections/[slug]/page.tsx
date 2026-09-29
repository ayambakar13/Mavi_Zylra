import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections } from "@/content/collections";
import { getProductById } from "@/content/products";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function generateStaticParams() { return collections.map((collection) => ({ slug: collection.slug })); }
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) notFound();
  const preview = getProductById(collection.previewProductId);
  return <main><Breadcrumbs /><section className="editorial-collection"><div className="editorial-image">{preview && <Image src={preview.image} alt={preview.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />}</div><div className="editorial-copy"><p className="hero-subtitle">{collection.seasonLocal} · {collection.season}</p><h1>{collection.title}</h1><p>{collection.description}</p><p className="product-note">This editorial preview is linked directly to catalog record {collection.previewProductId}. Seasonal product assignment beyond this preview is not inferred from the V1 catalog.</p>{preview && <Link className="button" href={`/products/${preview.slug}`}>View Preview Piece</Link>}</div></section></main>;
}
