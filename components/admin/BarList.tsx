import { pad2 } from "@/lib/utils";

export interface BarListItem {
  label: string;
  count: number;
}

export default function BarList({ items, emptyLabel }: { items: BarListItem[]; emptyLabel: string }) {
  if (items.length === 0) {
    return <p className="border border-line bg-paper p-6 text-center text-sm text-muted">{emptyLabel}</p>;
  }

  const max = Math.max(...items.map((i) => i.count), 1);

  return (
    <ol className="border border-line bg-paper">
      {items.map((item, index) => (
        <li key={item.label} className="flex items-center gap-4 border-b border-line px-5 py-3.5 last:border-b-0">
          <span className="w-6 shrink-0 font-mono text-xs text-muted">{pad2(index + 1)}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-ink">{item.label}</p>
            <div className="mt-1.5 h-1 w-full bg-line/40">
              <div
                className="h-1 bg-ink"
                style={{ width: `${Math.max((item.count / max) * 100, 3)}%` }}
              />
            </div>
          </div>
          <span className="shrink-0 font-mono text-xs tabular-nums text-muted">{item.count}</span>
        </li>
      ))}
    </ol>
  );
}
