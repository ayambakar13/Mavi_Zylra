import { NextResponse } from "next/server";
import { scrypt, randomBytes } from "node:crypto";
import { promisify } from "node:util";
import { saveAccount, updateOrders } from "@/lib/server/store";
const scryptAsync = promisify(scrypt);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.password || body.password.length < 8 || !body?.guestSessionId) return NextResponse.json({ error: "Email, guest session and a password of at least 8 characters are required." }, { status: 400 });
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(body.password, salt, 64)) as Buffer;
  const accountId = `acct_${crypto.randomUUID()}`;
  await saveAccount({ id: accountId, email: body.email.toLowerCase(), passwordHash: `${salt}:${derived.toString("hex")}`, createdAt: new Date().toISOString(), guestSessionId: body.guestSessionId });
  await updateOrders(body.email, accountId);
  return NextResponse.json({ ok: true, accountId }, { status: 201 });
}
