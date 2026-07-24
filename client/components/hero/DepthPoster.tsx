/**
 * Static poster shown when the viewer prefers reduced motion, or as the
 * paint that fills the reserved hero space before the WebGL scene hydrates.
 * A CSS/SVG depth-map still -- no simulation, no image asset.
 */
export default function DepthPoster() {
  return (
    <div
      aria-hidden="true"
      className="h-full w-full"
      style={{
        background:
          'radial-gradient(120% 90% at 70% 30%, #FDE72522 0%, #21918C33 45%, #44015455 100%), linear-gradient(160deg, #0B3C49 0%, #14181D 100%)',
      }}
    >
      <svg viewBox="0 0 400 300" className="h-full w-full opacity-80" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="depth-poster-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#440154" />
            <stop offset="50%" stopColor="#21918C" />
            <stop offset="100%" stopColor="#FDE725" />
          </linearGradient>
        </defs>
        {Array.from({ length: 14 }).map((_, i) => (
          <ellipse
            key={i}
            cx={40 + ((i * 37) % 340)}
            cy={30 + ((i * 53) % 240)}
            rx={6 + (i % 5) * 2}
            ry={3 + (i % 3)}
            fill="url(#depth-poster-gradient)"
            opacity={0.35 + (i % 4) * 0.12}
          />
        ))}
      </svg>
    </div>
  );
}
