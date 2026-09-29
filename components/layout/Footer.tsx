import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-col">
        <h4>Zylra Atelier</h4>
        <p>
          Luxury wearables celebrating the timeless confluence of Kashmir,
          Persia, Central Asia, and Ottoman design.
        </p>
      </div>

      <div className="footer-col">
        <h4>Seasonal Collections</h4>
        <ul>
          <li><Link href="/collections/wandha">Wandha (Winter Heavy Tweed &amp; Velvet)</Link></li>
          <li><Link href="/collections/bahar">Bahar (Spring Silk &amp; Sozni)</Link></li>
          <li><Link href="/collections/retkol">Retkol (Summer Muslin &amp; Linen)</Link></li>
          <li><Link href="/collections/harud">Harud (Autumn Cashmere &amp; Termeh)</Link></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Client Experience</h4>
        <ul>
          <li><Link href="/concierge">Personal Concierge</Link></li>
          <li><Link href="/bespoke">Bespoke Tilla Orders</Link></li>
          <li><Link href="/shipping">Worldwide Express Courier</Link></li>
          <li><Link href="/care">Care &amp; Restoration Guide</Link></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Social &amp; Journal</h4>
        <ul>
          <li><Link href="/journal">Journal · Silk Route Stories</Link></li>
          <li><Link href="/journal/artisans">The Master Artisans</Link></li>
        </ul>
      </div>
    </footer>
  );
}
