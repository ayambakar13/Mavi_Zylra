import { NextResponse } from "next/server";
import { saveOrder } from "@/lib/server/store";
import type { Order } from "@/domain/commerce/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.guestSessionId || !body?.items?.length || !body?.checkout?.customer?.email || !body?.checkout?.customer?.phone || !body?.checkout?.shippingAddress?.addressLine1 || !body?.checkout?.shippingAddress?.city || !body?.checkout?.shippingAddress?.pincode) return NextResponse.json({ error: "Required checkout information is missing." }, { status: 400 });
  if (body.items.some((item: { price?: number }) => typeof item.price !== "number")) return NextResponse.json({ error: "Every order item must have a fixed price." }, { status: 400 });
  const subtotal = body.items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);
  const order: Order = { id: `ZYL-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`, guestSessionId: body.guestSessionId, createdAt: new Date().toISOString(), status: "pending", items: body.items, checkout: body.checkout, subtotal, shipping: null, tax: null, total: subtotal, currency: body.items[0]?.currency ?? "INR" };
  await saveOrder(order);
  return NextResponse.json({ ok: true, orderId: order.id, order }, { status: 201 });
}
