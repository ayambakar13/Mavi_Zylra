import Link from "next/link";
import { collections } from "@/content/collections";

export function SeasonalNav() {
  return (
    <nav className="seasonal-nav" aria-label="Seasonal collections">
      {collections.map((collection) => (
        <Link key={collection.slug} href={`/collections/${collection.slug}`}>
          {collection.seasonLocal} ({collection.season})
        </Link>
      ))}
    </nav>
  );
}
