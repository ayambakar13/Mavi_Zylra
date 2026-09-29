"use client";

import { QRCodeSVG } from "qrcode.react";
import { buildUpiUrl, formatMoney } from "@/domain/commerce/cart";

export function UpiPayment({ amount }: { amount: number | null }) {
  const upiUrl = buildUpiUrl(amount);
  if (!upiUrl) return null;
  return <div className="upi-payment"><div><p className="eyebrow">Payment</p><h3>Pay securely by UPI</h3><p>Scan the QR or open the UPI payment link after Zylra confirms your order total.</p><a className="text-link" href={upiUrl}>Open UPI payment · {formatMoney(amount, "INR")}</a></div><div className="upi-qr"><QRCodeSVG value={upiUrl} size={148} includeMargin /></div></div>;
}
