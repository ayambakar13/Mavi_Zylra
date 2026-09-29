import Image from "next/image";
import Link from "next/link";
import { collections } from "@/content/collections";
import { getProductById } from "@/content/products";

export function SeasonalCollections() {
  return (
    <>
      <section className="section-header">
        <h2 className="section-title">Seasonal Editions</h2>
        <p className="section-subtitle">Kashmiri Craftsmanship Blended with Silk Route Tradition</p>
      </section>
      <section className="collection-grid" aria-label="Seasonal editions">
        {collections.map((collection) => {
          const preview = getProductById(collection.previewProductId);
          return (
            <article className="collection-card" key={collection.slug}>
              {preview && <Image src={preview.image} alt={preview.alt} fill sizes="(max-width: 760px) 100vw, 25vw" className="collection-card-image" />}
              <div className="card-overlay" />
              <div className="card-content">
                <p className="card-season">{collection.seasonLocal} · {collection.season}</p>
                <h3 className="card-title">{collection.title}</h3>
                <p className="card-desc">{collection.description}</p>
                <Link className="card-link" href={`/collections/${collection.slug}`}>{collection.cta}</Link>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
