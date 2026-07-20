import type { Stat } from "@/types";
import { cn } from "@/lib/utils";
import CountUp from "@/components/ui/CountUp";

interface StatCardProps {
  stat: Stat;
  index?: string;
  onDark?: boolean;
}

export default function StatCard({ stat, index, onDark = false }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between border p-6 lg:p-8",
        onDark ? "border-canvas/15" : "border-line bg-paper"
      )}
    >
      {index && (
        <span
          className={cn(
            "font-mono text-xs tracking-wide2",
            onDark ? "text-ghost" : "text-muted"
          )}
        >
          {index}
        </span>
      )}
      <div className="mt-8">
        <CountUp
          value={stat.value}
          className={cn(
            "block font-display text-5xl uppercase leading-none lg:text-6xl",
            onDark ? "text-canvas" : "text-ink"
          )}
        />
        <p
          className={cn(
            "mt-3 font-condensed text-sm font-semibold uppercase tracking-wide2",
            onDark ? "text-ghost" : "text-muted"
          )}
        >
          {stat.label}
        </p>
      </div>
    </div>
  );
}
