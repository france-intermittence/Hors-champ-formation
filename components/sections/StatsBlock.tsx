import StatCard from "@/components/cards/StatCard";
import { stats } from "@/data/stats";
import { pad2, cn } from "@/lib/utils";

interface StatsBlockProps {
  onDark?: boolean;
}

/** Grille de chiffres clés (valeurs centralisées dans data/stats.ts). */
export default function StatsBlock({ onDark = false }: StatsBlockProps) {
  return (
    <div
      className={cn(
        "grid gap-px border sm:grid-cols-2 lg:grid-cols-4",
        onDark ? "border-canvas/15 bg-canvas/15" : "border-line bg-line"
      )}
    >
      {stats.map((stat, i) => (
        <StatCard
          key={stat.label}
          stat={stat}
          index={pad2(i + 1)}
          onDark={onDark}
        />
      ))}
    </div>
  );
}
