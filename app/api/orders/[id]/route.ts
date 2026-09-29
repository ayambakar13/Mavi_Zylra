import { NextResponse } from "next/server";
import { getOrder } from "@/lib/server/store";
import type { Order } from "@/domain/commerce/types";
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder<Order>(id);
  return order ? NextResponse.json({ order }) : NextResponse.json({ error: "Order not found" }, { status: 404 });
}
