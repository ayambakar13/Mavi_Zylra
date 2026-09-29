import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/server/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.productId || !body?.sku || !body?.title || !body?.fullName || !body?.email || !body?.phone) return NextResponse.json({ error: "Missing required inquiry fields." }, { status: 400 });
  const inquiry = { id: `inq_${crypto.randomUUID()}`, createdAt: new Date().toISOString(), status: "received", productId: body.productId, sku: body.sku, title: body.title, fullName: body.fullName, email: body.email, phone: body.phone, message: body.message ?? "" };
  await saveInquiry(inquiry);
  return NextResponse.json({ ok: true, inquiryId: inquiry.id }, { status: 201 });
}
