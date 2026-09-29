export function SilkRoadMap() {
  return (
    <section className="silk-road" aria-labelledby="silk-road-title">
      <div className="silk-road-copy">
        <p className="eyebrow">The Route</p>
        <h2 id="silk-road-title">From Istanbul to Kashmir</h2>
        <p>Zylra traces a contemporary atelier story across the historic exchange of textiles, craft, tailoring and ornament.</p>
      </div>
      <div className="silk-road-map" aria-label="Silk Road route from Istanbul through Central Asia to Kashmir">
        <svg viewBox="0 0 900 360" role="img" aria-hidden="true">
          <path className="route-line route-secondary" d="M110 220 C260 105 330 265 465 175 S675 95 790 210" />
          <path className="route-line" d="M110 220 C260 105 330 265 465 175 S675 95 790 210" />
          <circle className="route-node" cx="110" cy="220" r="8" /><circle className="route-node" cx="465" cy="175" r="8" /><circle className="route-node" cx="790" cy="210" r="8" />
          <text x="90" y="255">Istanbul</text><text x="425" y="145">Central Asia</text><text x="755" y="250">Kashmir</text>
        </svg>
      </div>
    </section>
  );
}
