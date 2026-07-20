import { formatDate } from "@/lib/utils";

export interface VisitsChartPoint {
  date: string;
  count: number;
}

export default function VisitsChart({ data }: { data: VisitsChartPoint[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const maxIndex = data.reduce((best, d, i) => (d.count > data[best].count ? i : best), 0);

  return (
    <div className="border border-line bg-paper p-6">
      <div className="flex h-40 items-end gap-[2px]">
        {data.map((point, index) => {
          const heightPct = Math.max((point.count / max) * 100, point.count > 0 ? 4 : 1);
          return (
            <div key={point.date} className="group relative flex-1">
              {index === maxIndex && point.count > 0 && (
                <span className="absolute -top-6 left-1/2 w-max -translate-x-1/2 font-mono text-[0.65rem] text-muted">
                  {point.count}
                </span>
              )}
              <div
                className="mx-auto w-full max-w-[24px] rounded-t-[4px] bg-ink transition-opacity group-hover:opacity-70"
                style={{ height: `${heightPct}%` }}
              />
              <div className="pointer-events-none absolute -top-9 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap border border-ink bg-canvas px-2 py-1 font-mono text-[0.65rem] text-ink group-hover:block">
                {formatDate(point.date)} · {point.count}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between border-t border-line pt-2 font-mono text-[0.65rem] text-muted">
        <span>{formatDate(data[0]?.date)}</span>
        <span>{formatDate(data[data.length - 1]?.date)}</span>
      </div>
    </div>
  );
}
