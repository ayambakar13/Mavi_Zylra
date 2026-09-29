"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/domain/catalog/types";
import { formatMoney } from "@/domain/commerce/cart";
import { QuickView } from "@/components/commerce/QuickView";
import { AddToBagButton } from "@/components/commerce/AddToBagButton";

export function ProductCard({ product }: { product: Product }) {
  const [quickView, setQuickView] = useState(false);
  const outOfStock = product.inventoryQuantity === 0;
  const price = product.salePrice ?? product.price ?? null;
  return <>
    <article className="product-card">
      <button type="button" className="product-image-wrap product-image-button" onClick={() => setQuickView(true)} aria-label={`Preview ${product.name}`}>
        <Image src={product.image} alt={product.alt} fill sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw" className="product-image" />
        <span className="product-status">{outOfStock ? "Out of Stock" : price == null ? "Price on Request" : "Available"}</span>
      </button>
      <div className="product-card-body">
        <p className="product-category">{product.subcategory}</p>
        <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
        <p className="product-description">{product.description}</p>
        <div className="product-card-commerce"><span>{formatMoney(price, product.currency ?? "INR")}</span><button type="button" className="text-link quick-view-link" onClick={() => setQuickView(true)}>Quick View</button></div>
        <AddToBagButton product={product} />
      </div>
    </article>
    {quickView ? <QuickView product={product} onClose={() => setQuickView(false)} /> : null}
  </>;
}
