/* Decorative Dashain motif: a bunch of jamara (barley shoots) with a red tika */
const BLADES = [
  { angle: -40, length: 78 },
  { angle: -30, length: 96 },
  { angle: -21, length: 108 },
  { angle: -12, length: 116 },
  { angle: -4, length: 122 },
  { angle: 5, length: 118 },
  { angle: 13, length: 112 },
  { angle: 22, length: 102 },
  { angle: 31, length: 90 },
  { angle: 41, length: 74 },
];

const blade = (length: number) => {
  const tip = 128 - length;
  const a = 128 - length * 0.4;
  const b = 128 - length * 0.8;
  return `M60 128 C 56.5 ${a}, 58 ${b}, 60 ${tip} C 62 ${b}, 63.5 ${a}, 60 128 Z`;
};

const RICE = [
  [52, 126, -30],
  [60, 121, 10],
  [68, 127, 40],
  [56, 134, 60],
  [65, 135, -20],
  [60, 129, 80],
] as const;

const TikaJamara = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 150"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    {BLADES.map(({ angle, length }, i) => (
      <path
        key={angle}
        d={blade(length)}
        transform={`rotate(${angle} 60 128)`}
        fill={i % 2 === 0 ? "#e2d552" : "#c3c83d"}
      />
    ))}
    {/* tika with rice grains */}
    <circle cx="60" cy="128" r="16" fill="#c8102e" />
    <circle cx="60" cy="128" r="16" fill="url(#tika-shade)" />
    {RICE.map(([x, y, r]) => (
      <ellipse
        key={`${x}-${y}`}
        cx={x}
        cy={y}
        rx="3.2"
        ry="1.5"
        fill="#fff3d6"
        opacity=".9"
        transform={`rotate(${r} ${x} ${y})`}
      />
    ))}
    <defs>
      <radialGradient id="tika-shade" cx="35%" cy="30%" r="80%">
        <stop offset="0" stopColor="#fff" stopOpacity=".25" />
        <stop offset="1" stopColor="#000" stopOpacity=".15" />
      </radialGradient>
    </defs>
  </svg>
);

export default TikaJamara;
