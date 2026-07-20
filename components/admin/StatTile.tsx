import { pad2 } from "@/lib/utils";

interface StatTileProps {
  index: number;
  label: string;
  value: string;
}

export default function StatTile({ index, label, value }: StatTileProps) {
  return (
    <div className="border border-line bg-paper p-6">
      <p className="font-mono text-xs text-muted">{pad2(index)}</p>
      <p className="mt-3 font-display text-4xl uppercase leading-none text-ink">{value}</p>
      <p className="mt-2 font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">{label}</p>
    </div>
  );
}
