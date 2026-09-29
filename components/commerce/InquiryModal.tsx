"use client";

import { FormEvent, useState } from "react";
import type { Product } from "@/domain/catalog/types";

export function InquiryModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", message: "" });
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, sku: product.sku, title: product.name, ...form }),
      });
      if (!response.ok) throw new Error("Inquiry failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  return <div className="quick-view-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="inquiry-modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title">
      <button className="quick-view-close" type="button" onClick={onClose} aria-label="Close inquiry">×</button>
      {state === "success" ? <div className="inquiry-success"><p className="eyebrow">Inquiry received</p><h2 id="inquiry-title">Our concierge will contact you shortly.</h2><p>{product.name} · {product.sku}</p><button className="button commerce-button" type="button" onClick={onClose}>Continue</button></div> : <>
        <p className="eyebrow">Private Client Concierge</p><h2 id="inquiry-title">Request pricing</h2><p className="inquiry-product">{product.name}<br /><span>{product.sku}</span></p>
        <form className="checkout-fields" onSubmit={submit}>
          <label>Full Name<input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></label>
          <label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>Phone Number<input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
          <label>Message <span>(Optional)</span><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
          {state === "error" ? <p className="form-error">We could not receive your inquiry. Please try again.</p> : null}
          <button className="button commerce-button" type="submit" disabled={state === "submitting"}>{state === "submitting" ? "Sending…" : "Send Inquiry"}</button>
        </form>
      </>}
    </section>
  </div>;
}
