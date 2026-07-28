/**
 * Topografske izohipse kao pozadina heroa. Crtaju se proceduralno umjesto
 * slikom, pa nema mrežnog zahtjeva ni ovisnosti o vanjskom CDN-u.
 */
export function TopoBackdrop({ className }: { className?: string }) {
  const rings = Array.from({ length: 22 }, (_, i) => i)

  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="white" fill="none" strokeWidth="1">
        {rings.map((i) => (
          <ellipse
            key={`l-${i}`}
            cx="330"
            cy="430"
            rx={70 + i * 46}
            ry={54 + i * 33}
            opacity={0.075 - i * 0.002}
            transform={`rotate(${-14 + i * 0.8} 330 430)`}
          />
        ))}
        {rings.map((i) => (
          <ellipse
            key={`r-${i}`}
            cx="1150"
            cy="330"
            rx={60 + i * 41}
            ry={46 + i * 30}
            opacity={0.07 - i * 0.002}
            transform={`rotate(${18 - i * 0.7} 1150 330)`}
          />
        ))}
      </g>
    </svg>
  )
}
