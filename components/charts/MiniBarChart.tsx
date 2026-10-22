import { cx } from "class-variance-authority";

interface Point {
  label: string;
  value: number;
}

interface MiniBarChartProps {
  data: Point[];
  domain: [number, number];
  unit: string;
  /** Caption for the visually hidden data table. */
  caption: string;
  className?: string;
}

const fmt = (v: number) => new Intl.NumberFormat("en", { maximumFractionDigits: 1 }).format(v);

/**
 * CSS-only bar chart. Each bar is focusable (labelled) and shows its exact value
 * on hover/focus. A visually hidden table carries the full series for screen readers.
 */
export function MiniBarChart({ data, domain, unit, caption, className }: MiniBarChartProps) {
  const [min, max] = domain;
  const pct = (v: number) => Math.max(2, ((v - min) / (max - min)) * 100);

  return (
    <div className={className}>
      <div className="flex h-40 items-end gap-1.5 border-b border-ink-700">
        {data.map((d, i) => {
          const last = i === data.length - 1;
          return (
            <div
              key={d.label}
              tabIndex={0}
              role="img"
              aria-label={`${d.label}: ${fmt(d.value)} ${unit}`}
              className="group relative flex h-full flex-1 items-end focus-visible:outline-offset-2"
            >
              <span
                className={cx("block w-full rounded-t-xs", last ? "bg-white" : "bg-ink-450")}
                style={{ height: `${pct(d.value)}%` }}
              />
              <span
                aria-hidden="true"
                className="data pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-2 whitespace-nowrap rounded-xs bg-white px-2 py-1 text-ink-950 opacity-0 shadow-overlay transition-opacity duration-[120ms] group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ bottom: `${pct(d.value)}%` }}
              >
                {d.label} · {fmt(d.value)} {unit}
              </span>
            </div>
          );
        })}
      </div>

      <table className="sr-only">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Week</th>
            <th scope="col">Value ({unit})</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}>
              <th scope="row">{d.label}</th>
              <td>{fmt(d.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
