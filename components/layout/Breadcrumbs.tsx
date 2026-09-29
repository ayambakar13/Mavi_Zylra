"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labels: Record<string, string> = {
  catalog: "Catalog",
  category: "Category",
  products: "Products",
  collections: "Collections",
  women: "Women",
  accessories: "Accessories",
  men: "Men",
  kids: "Kids",
  beauty: "Beauty",
  "all-seasons": "All Seasons",
  handbags: "Handbags",
  watches: "Watches",
  turkish: "Turkish Collection",
  kashmiri: "Kashmiri Collection"
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Zylra</Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const label = labels[segment] ?? decodeURIComponent(segment).replace(/-/g, " ");
        return (
          <span key={href} className="breadcrumb-item">
            <span aria-hidden="true">/</span>
            {index === segments.length - 1 ? <span aria-current="page">{label}</span> : <Link href={href}>{label}</Link>}
          </span>
        );
      })}
    </nav>
  );
}
