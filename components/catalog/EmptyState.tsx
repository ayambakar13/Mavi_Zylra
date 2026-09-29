import Link from "next/link";

export function EmptyState({ title, message, backHref = "/catalog", backLabel = "Return to Catalog" }: { title: string; message: string; backHref?: string; backLabel?: string }) {
  return (
    <section className="empty-state">
      <p className="eyebrow">Zylra Atelier</p>
      <h1>{title}</h1>
      <p>{message}</p>
      <Link className="button" href={backHref}>{backLabel}</Link>
    </section>
  );
}
