"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/domain/commerce/types";

type CartContextValue = {
  items: CartItem[];
  guestSessionId: string;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "zylra:cart:v2";
const SESSION_KEY = "zylra:guest-session:v1";
function sameVariant(a: CartItem, b: Pick<CartItem, "productId" | "size" | "color">) { return a.productId === b.productId && a.size === b.size && a.color === b.color; }
function makeGuestSessionId() { return `guest_${crypto.randomUUID()}`; }

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [guestSessionId, setGuestSessionId] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const session = window.localStorage.getItem(SESSION_KEY) || makeGuestSessionId();
      if (stored) setItems(JSON.parse(stored));
      setGuestSessionId(session);
      window.localStorage.setItem(SESSION_KEY, session);
    } catch { /* localStorage may be unavailable */ }
    finally { setHydrated(true); }
  }, []);

  useEffect(() => { if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    guestSessionId,
    addItem(item) { setItems((current) => { const existing = current.find((entry) => sameVariant(entry, item)); return existing ? current.map((entry) => sameVariant(entry, item) ? { ...entry, quantity: entry.quantity + item.quantity } : entry) : [...current, item]; }); },
    removeItem(productId, size, color) { setItems((current) => current.filter((item) => !sameVariant(item, { productId, size, color }))); },
    updateQuantity(productId, quantity, size, color) { setItems((current) => quantity <= 0 ? current.filter((item) => !sameVariant(item, { productId, size, color })) : current.map((item) => sameVariant(item, { productId, size, color }) ? { ...item, quantity } : item)); },
    clearCart() { setItems([]); },
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  }), [items, guestSessionId]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const context = useContext(CartContext); if (!context) throw new Error("useCart must be used inside CartProvider"); return context; }
