// Hand-drawn in the Lucide style (24px grid, 1.75 stroke, round caps) so individual
// parts — the stopwatch hand, the arrow, the falling code — can be animated in CSS.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function StopwatchIcon() {
  return (
    <svg {...base} className="icon icon--stopwatch">
      <path d="M9.5 2h5" />
      <path d="M12 5.5V4" />
      <path d="m19 7.5 1.2-1.2" />
      <circle cx="12" cy="13.5" r="8" />
      <path d="M12 8.2v.9" />
      <path d="M17.3 13.5h-.9" />
      <path d="M12 18.8v-.9" />
      <path d="M6.7 13.5h.9" />
      <path className="icon__hand" d="M12 13.5V9.6" stroke="var(--orange)" />
      <circle className="icon__pin" cx="12" cy="13.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TargetArrowIcon() {
  return (
    <svg {...base} className="icon icon--target">
      <g className="icon__rings">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
      </g>
      <circle className="icon__bull" cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <g className="icon__arrow" stroke="var(--orange)">
        <path d="M22 2 13.2 10.8" />
        <path d="M13.6 13.2 12 12l1.2-1.6" fill="var(--orange)" />
        <path d="M19.4 2.2 22 2l-.2 2.6" />
      </g>
    </svg>
  )
}

const RAIN = ['1011', '0110', '1101', '0011', '1100']

export function MatrixMonitorIcon() {
  return (
    <svg {...base} className="icon icon--monitor">
      <defs>
        <clipPath id="badge-screen">
          <rect x="3" y="4" width="18" height="12" rx="1.2" />
        </clipPath>
      </defs>
      <g className="icon__rain" clipPath="url(#badge-screen)">
        {RAIN.map((column, i) => (
          <text
            key={i}
            x={4.4 + i * 3.4}
            y={4}
            style={{ animationDelay: `${i * 0.16}s` }}
            fontSize="3"
            fontFamily="ui-monospace, Menlo, monospace"
            fill="var(--orange)"
            stroke="none"
          >
            {column.split('').map((char, j) => (
              <tspan key={j} x={4.4 + i * 3.4} dy="3.2">
                {char}
              </tspan>
            ))}
          </text>
        ))}
      </g>
      <path className="icon__check" d="m9.5 10.2 1.8 1.8 3.4-3.4" />
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8.5 21h7" />
      <path d="M12 17v4" />
    </svg>
  )
}
