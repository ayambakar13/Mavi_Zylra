import Link from "next/link";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">The Silk Route Collection</p>
        <h1 className="hero-title">Wandha to Harud: The Four Seasons</h1>
        <p className="hero-desc">
          Bridging the heritage of Kashmir, Persia, Ottoman tailoring, and
          Central Asian ikat. Outerwear, gowns, and stoles woven for every
          cycle of the Valley.
        </p>
        <Link className="button" href="/collections/wandha">
          Explore Heritage Collection
        </Link>
      </div>
    </section>
  );
}
