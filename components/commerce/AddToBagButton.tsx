"use client";
import { useState } from "react";
import type { Product } from "@/domain/catalog/types";
import { useCart } from "./CartProvider";
import { InquiryModal } from "./InquiryModal";

export function AddToBagButton({ product, size, color }: { product: Product; size?: string; color?: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const outOfStock = product.inventoryQuantity === 0;
  const effectivePrice = product.salePrice ?? product.price;
  const priceMissing = effectivePrice == null;
  const stockUnknown = product.inventoryQuantity == null;

  function add() {
    if (outOfStock || priceMissing || stockUnknown) return;
    addItem({ productId: product.id, sku: product.sku, name: product.name, image: product.image, price: effectivePrice, currency: product.currency ?? "INR", quantity: 1, size, color });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  if (outOfStock) return <button type="button" className="button commerce-button" disabled>Out of Stock</button>;
  if (priceMissing) return <>{<button type="button" className="button commerce-button" onClick={() => setInquiryOpen(true)}>Request Pricing</button>}{inquiryOpen ? <InquiryModal product={product} onClose={() => setInquiryOpen(false)} /> : null}</>;
  if (stockUnknown) return <button type="button" className="button commerce-button" disabled>Stock Confirmation</button>;
  return <button type="button" className="button commerce-button" onClick={add}>{added ? "Added to Bag" : "Add to Bag"}</button>;
}
