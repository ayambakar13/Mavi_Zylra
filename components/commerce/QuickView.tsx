"use client";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/domain/catalog/types";
import { formatMoney } from "@/domain/commerce/cart";
import { AddToBagButton } from "./AddToBagButton";
export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const sizes = [...new Set(product.variants?.map((v) => v.size).filter(Boolean) as string[] | undefined)];
  const colors = [...new Set(product.variants?.map((v) => v.color).filter(Boolean) as string[] | undefined)];
  const [size, setSize] = useState(sizes?.[0]); const [color, setColor] = useState(colors?.[0]);
  return <div className="quick-view-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><section className="quick-view" role="dialog" aria-modal="true" aria-label={`${product.name} preview`}><button className="quick-view-close" type="button" onClick={onClose} aria-label="Close preview">×</button><div className="quick-view-image"><Image src={product.image} alt={product.alt} fill sizes="(max-width: 800px) 100vw, 50vw" className="product-image" priority /></div><div className="quick-view-copy"><p className="product-category">{product.category} / {product.subcategory}</p><h2>{product.name}</h2><p className="commerce-price">{formatMoney(product.salePrice ?? product.price ?? null, product.currency ?? "INR")}</p><p className="product-detail-description">{product.description}</p>{sizes?.length ? <label className="variant-field">Size<select value={size} onChange={(e) => setSize(e.target.value)}>{sizes.map((value) => <option key={value}>{value}</option>)}</select></label> : null}{colors?.length ? <label className="variant-field">Color<select value={color} onChange={(e) => setColor(e.target.value)}>{colors.map((value) => <option key={value}>{value}</option>)}</select></label> : null}<AddToBagButton product={product} size={size} color={color} /></div></section></div>;
}
