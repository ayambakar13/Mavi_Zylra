"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/components/commerce/CartProvider";
import { formatMoney } from "@/domain/commerce/cart";
import { getWhatsAppUrl } from "@/domain/commerce/config";

type OrderSummary = { id: string; items: { name: string; quantity: number; price: number; currency: string }[]; checkout: { customer: { email: string }; paymentMethod: string }; subtotal: number; total: number | null; currency: string };
export default function OrderConfirmationPage() {
  const params = useParams<{ id: string }>(); const { guestSessionId, clearCart } = useCart();
  const fetched = useRef(false);
  const [order, setOrder] = useState<OrderSummary | null>(null); const [loading, setLoading] = useState(true); const [password, setPassword] = useState(""); const [accountState, setAccountState] = useState<"idle" | "saving" | "done" | "error">("idle");
  useEffect(() => { if (fetched.current) return; fetched.current = true; fetch(`/api/orders/${params.id}`).then((r) => r.json()).then((data) => { if (data.order) { setOrder(data.order); clearCart(); } }).finally(() => setLoading(false)); }, [params.id, clearCart]);
  async function createAccount() { setAccountState("saving"); const response = await fetch("/api/accounts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: order?.checkout.customer.email, password, guestSessionId }) }); setAccountState(response.ok ? "done" : "error"); }
  if (loading) return <main className="commerce-page empty-state"><p>Preparing your confirmation…</p></main>;
  if (!order) return <main className="commerce-page empty-state"><h1>Order not found.</h1><Link className="button" href="/catalog">Return to Catalog</Link></main>;
  return <main className="commerce-page"><section className="confirmation-panel"><p className="eyebrow">Zylra Client Experience</p><h1>Thank you for your order.</h1><p>Your order reference is <strong>{order.id}</strong>.</p><div className="confirmation-summary"><span>Order total</span><strong>{formatMoney(order.total, order.currency)}</strong></div><a className="button commerce-button" href={getWhatsAppUrl(`ZYLRA ORDER ${order.id}\n\n${order.items.map((item) => `• ${item.name} × ${item.quantity} — ${formatMoney(item.price * item.quantity, item.currency)}`).join("\n")}\n\nTotal: ${formatMoney(order.total, order.currency)}\nEmail: ${order.checkout.customer.email}`)} target="_blank" rel="noreferrer">Continue via WhatsApp</a><section className="account-prompt"><p className="eyebrow">Save your details</p><h2>Faster checkout next time.</h2><p>Set a password to create your Zylra account. Your guest order will be linked to the account using your email address.</p>{accountState === "done" ? <p className="order-success">Your account has been created and your order is linked.</p> : <div className="account-create"><input type="password" minLength={8} placeholder="Password (8+ characters)" value={password} onChange={(e) => setPassword(e.target.value)} /><button className="button" type="button" disabled={password.length < 8 || accountState === "saving"} onClick={createAccount}>{accountState === "saving" ? "Creating…" : "Create Account"}</button>{accountState === "error" ? <p className="form-error">We could not create the account. Please try again.</p> : null}</div>}</section><Link className="text-link" href="/catalog">Continue Shopping</Link></section></main>;
}
