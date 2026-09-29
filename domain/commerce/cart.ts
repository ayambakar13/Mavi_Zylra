import type { CartItem } from "./types";

export function getCartSubtotal(items: CartItem[]) {
  if (items.some((item) => item.price == null)) return null;
  return items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
}

export function formatMoney(amount: number | null, currency = "INR") {
  if (amount == null) return "Price on request";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export function buildUpiUrl(amount: number | null) {
  if (amount == null || !process.env.NEXT_PUBLIC_ZYLRA_UPI_ID) return null;
  const params = new URLSearchParams({ pa: process.env.NEXT_PUBLIC_ZYLRA_UPI_ID, pn: "Zylra", am: amount.toFixed(2), cu: "INR" });
  return `upi://pay?${params.toString()}`;
}
