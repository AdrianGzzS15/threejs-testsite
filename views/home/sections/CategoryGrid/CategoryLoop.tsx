import type { Pose } from "@/lib/data/home";

/*
 * Minimal line mannequins on a 112×112 grid, ground at y=104.
 * The `.pose-body` group plays the "rep" loop (globals.css) when the parent
 * `.group` tile is hovered or focus-visible. Reduced motion disables it.
 */
const poses: Record<Pose, { head: [number, number]; d: string; extra?: React.ReactNode }> = {
  // Squat bottom with bar on the back
  squat: {
    head: [62, 28],
    d: "M58 38 L44 70 L68 72 L62 104 M58 40 L52 42",
    extra: <path d="M30 40 H86 M33 32 V48 M83 32 V48" />,
  },
  // Kettlebell swing, top position
  swing: {
    head: [50, 22],
    d: "M50 30 V62 M50 62 L44 104 M50 62 L56 104 M50 35 L82 37",
    extra: (
      <>
        <circle cx="88" cy="44" r="6" />
        <path d="M84 38 Q88 33 92 38" />
      </>
    ),
  },
  // Running stride
  stride: {
    head: [60, 20],
    d: "M58 28 L50 60 L66 78 L60 104 M50 60 L38 80 L26 72 M56 34 L68 46 L76 38 M56 34 L44 44 L40 56",
  },
  // Deep lunge with overhead reach
  lunge: {
    head: [48, 38],
    d: "M48 46 L50 76 L70 84 L72 104 M50 76 L32 102 L16 100 M48 50 L44 14 M48 50 L54 14",
  },
  // Forearm plank
  plank: {
    head: [20, 80],
    d: "M28 84 L64 89 L98 102 M28 84 L28 104 L42 104",
  },
  // Seated cross-legged
  seated: {
    head: [56, 54],
    d: "M56 62 V98 M56 98 L30 94 L64 102 M56 98 L82 94 L48 102 M56 68 L36 90 M56 68 L76 90",
  },
};

export function CategoryLoop({ pose }: { pose: Pose }) {
  const { head, d, extra } = poses[pose];
  return (
    <svg
      viewBox="0 0 112 112"
      width={112}
      height={112}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="#0A0A0A"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g className="pose-body">
        <circle cx={head[0]} cy={head[1]} r={6} />
        <path d={d} />
        {extra}
      </g>
      <path d="M6 104 H106" />
    </svg>
  );
}
