import { Check, type LucideIcon } from "lucide-react";

interface IconListProps {
  items: string[];
  icon?: LucideIcon;
  columns?: 1 | 2;
}

/** Liste à puces avec icône linéaire (objectifs, méthode, évaluation). */
export default function IconList({
  items,
  icon: Icon = Check,
  columns = 1,
}: IconListProps) {
  return (
    <ul
      className={`grid gap-4 ${columns === 2 ? "sm:grid-cols-2 sm:gap-x-10" : ""}`}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ink" strokeWidth={1.6} aria-hidden />
          <span className="leading-relaxed text-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}
