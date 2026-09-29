import { ProductGrid } from "./ProductGrid";
import { getProductsBySeason, type SeasonKey, seasonGroups } from "@/content/taxonomy";
import type { Product } from "@/domain/catalog/types";

const seasons: SeasonKey[] = ["wandha", "bahar", "retkol", "harud"];

export function CatalogSeasonSections() {
  return <div className="catalog-season-sections">{seasons.map((season) => {
    const items = getProductsBySeason(season);
    const groups = items.reduce<Record<string, Product[]>>((acc, product) => {
      (acc[product.category] ??= []).push(product);
      return acc;
    }, {});
    return <section className="catalog-season-section" key={season} id={season}>
      <div className="section-header section-header-left"><p className="eyebrow">Season</p><h2 className="section-title">{seasonGroups[season].label}</h2><p className="section-subtitle">{seasonGroups[season].description} · {items.length} pieces</p></div>
      {Object.entries(groups).map(([category, categoryItems]) => <div className="catalog-category-group" key={category}><div className="catalog-group-heading"><h3>{category}</h3><span>{categoryItems.length} pieces</span></div><ProductGrid products={categoryItems} /></div>)}
    </section>;
  })}</div>;
}
