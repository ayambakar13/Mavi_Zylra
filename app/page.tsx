import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { SeasonalCollections } from "@/components/home/SeasonalCollections";
import { SilkRoadMap } from "@/components/home/SilkRoadMap";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { products } from "@/content/products";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SeasonalCollections />
      <SilkRoadMap />
      <section className="catalog-preview" aria-labelledby="catalog-preview-title">
        <div className="section-header">
          <h2 id="catalog-preview-title" className="section-title">
            The Zylra Catalog
          </h2>
          <p className="section-subtitle">
            242 cataloged pieces · image-backed preview
          </p>
        </div>

        <ProductGrid products={products.slice(0, 12)} />

        <div className="catalog-preview-cta">
          <Link className="button" href="/catalog">
            Explore Catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
