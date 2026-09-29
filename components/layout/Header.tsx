"use client";

import Link from "next/link";
import { useCart } from "@/components/commerce/CartProvider";

const comingSoon = ["Men", "Kids", "Beauty"];

export function Header() {
  const { itemCount } = useCart();
  return (
    <header className="site-header">
      <div className="desktop-nav mega-menu-wrap">
        <nav className="nav-group nav-left" aria-label="Primary">
          <Link href="/">Atelier</Link>
          <div className="mega-menu-trigger">
            <button type="button" aria-haspopup="true">Women</button>
            <div className="mega-menu" role="menu">
              <div className="mega-column">
                <span className="mega-heading">Collections</span>
                <Link href="/women/turkish">Turkish Collection</Link>
                <Link href="/women/kashmiri">Kashmiri Collection</Link>
              </div>
              <div className="mega-column">
                <span className="mega-heading">Browse</span>
                <Link href="/women/all-seasons">All Seasons</Link>
                <Link href="/women/handbags">Handbags</Link>
                <Link href="/women/watches">Watches</Link>
              </div>
            </div>
          </div>
          <div className="mega-menu-trigger">
            <button type="button" aria-haspopup="true">Accessories</button>
            <div className="mega-menu mega-menu-compact" role="menu">
              <div className="mega-column">
                <Link href="/accessories/handbags">Handbags</Link>
                <Link href="/accessories/watches">Watches</Link>
              </div>
            </div>
          </div>
          {comingSoon.map((item) => <span className="nav-disabled" key={item}>{item}<small>Coming Soon</small></span>)}
        </nav>
      </div>

      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <div className="mobile-menu-panel">
          <Link href="/women">Women</Link><Link href="/accessories">Accessories</Link><Link href="/men">Men · Coming Soon</Link><Link href="/kids">Kids · Coming Soon</Link><Link href="/beauty">Beauty · Coming Soon</Link><Link href="/catalog">Catalog</Link>
        </div>
      </details>
      <Link href="/" className="brand-logo" aria-label="Zylra home">ZYLRA</Link>

      <nav className="nav-group nav-right" aria-label="Utility">
        <Link href="/catalog">Catalog</Link>
        <Link href="/search">Search</Link>
        <Link href="/account">Account</Link>
        <Link href="/cart">Bag ({itemCount})</Link>
      </nav>
    </header>
  );
}
