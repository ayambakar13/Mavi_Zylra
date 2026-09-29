"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/components/commerce/CartProvider";
import { formatMoney, getCartSubtotal } from "@/domain/commerce/cart";
import { ProductCard } from "@/components/catalog/ProductCard";
import { products } from "@/content/products";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const subtotal = useMemo(() => getCartSubtotal(items), [items]);
  const featured = products.filter((product) => product.inventoryQuantity !== 0).slice(0, 4);

  if (!items.length) return <main className="commerce-page"><section className="empty-cart-panel"><p className="eyebrow">The Zylra Bag</p><h1>Your bag is empty.</h1><p>Discover the current atelier catalog and add a priced piece to your selection.</p><Link className="button" href="/catalog">Continue Shopping</Link></section><section className="featured-cart"><div className="section-header"><h2 className="section-title">Featured Items</h2><p className="section-subtitle">Pieces ready to add to your bag</p></div><div className="product-grid">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div></section></main>;

  const currency = items[0]?.currency ?? "INR";
  return <main className="commerce-page"><div className="commerce-heading"><p className="eyebrow">The Zylra Bag</p><h1>Your Selection</h1><p>{items.length} line item{items.length === 1 ? "" : "s"}</p></div><div className="cart-layout"><section className="cart-lines">{items.map((item) => <article className="cart-line" key={`${item.productId}-${item.size ?? ""}-${item.color ?? ""}`}><div className="cart-line-image"><img src={item.image} alt="" /></div><div className="cart-line-copy"><h2>{item.name}</h2><p>{item.sku}{item.size ? ` · ${item.size}` : ""}{item.color ? ` · ${item.color}` : ""}</p><strong>{formatMoney(item.price, item.currency)}</strong><div className="quantity-controls"><button type="button" onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size, item.color)} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size, item.color)} aria-label="Increase quantity">+</button><button type="button" className="remove-link" onClick={() => removeItem(item.productId, item.size, item.color)}>Remove</button></div></div></article>)}</section><aside className="checkout-panel"><h2>Bag Summary</h2><div className="cart-total"><span>Subtotal</span><strong>{formatMoney(subtotal, currency)}</strong></div><p className="checkout-note">Shipping and tax are calculated during checkout. Your guest session keeps this selection available while you continue.</p><Link className="button commerce-button" href="/checkout">Proceed to Checkout</Link><button className="text-link clear-cart" type="button" onClick={clearCart}>Clear Bag</button></aside></div></main>;
}
