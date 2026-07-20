"use client";

import { useMemo, useState } from "react";
import type { Formation, FormationCategory } from "@/types";
import { formationCategories } from "@/data/formations";
import FormationCard from "@/components/cards/FormationCard";
import { cn } from "@/lib/utils";

interface FormationsFilterGridProps {
  formations: Formation[];
}

type CategoryFilter = "Toutes" | FormationCategory;
type DurationFilter = "all" | "short" | "medium" | "long";
type LevelFilter = "all" | string;

const durations: { value: DurationFilter; label: string }[] = [
  { value: "all", label: "Toutes durées" },
  { value: "short", label: "1–2 jours" },
  { value: "medium", label: "3–7 jours" },
  { value: "long", label: "8 jours et +" },
];

function matchDuration(days: number, filter: DurationFilter): boolean {
  if (filter === "all") return true;
  if (filter === "short") return days <= 2;
  if (filter === "medium") return days >= 3 && days <= 7;
  return days >= 8;
}

export default function FormationsFilterGrid({
  formations,
}: FormationsFilterGridProps) {
  const [category, setCategory] = useState<CategoryFilter>("Toutes");
  const [duration, setDuration] = useState<DurationFilter>("all");
  const [level, setLevel] = useState<LevelFilter>("all");

  const levels = useMemo(
    () => Array.from(new Set(formations.map((f) => f.level))),
    [formations]
  );

  const filtered = useMemo(
    () =>
      formations.filter(
        (f) =>
          (category === "Toutes" || f.category === category) &&
          matchDuration(f.durationDays, duration) &&
          (level === "all" || f.level === level)
      ),
    [formations, category, duration, level]
  );

  const categories: CategoryFilter[] = ["Toutes", ...formationCategories];

  return (
    <div>
      {/* Barre de filtres */}
      <div className="flex flex-col gap-5 border-b border-line pb-6">
        {/* Catégories (scroll horizontal sur mobile) */}
        <div className="no-scrollbar -mx-gutter flex gap-2 overflow-x-auto px-gutter">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "shrink-0 border px-5 py-2.5 font-condensed text-sm font-semibold uppercase tracking-wide2 transition-colors",
                category === cat
                  ? "border-ink bg-ink text-canvas"
                  : "border-line bg-paper text-muted hover:border-ink hover:text-ink"
              )}
            >
              {cat === "Toutes" ? "Toutes les formations" : cat}
            </button>
          ))}
        </div>

        {/* Filtres secondaires */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="filter-duration" className="font-mono text-xs uppercase tracking-wide2 text-muted">
              Durée
            </label>
            <select
              id="filter-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value as DurationFilter)}
              className="border border-line bg-paper px-3 py-2 font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink outline-none focus:border-ink"
            >
              {durations.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="filter-level" className="font-mono text-xs uppercase tracking-wide2 text-muted">
              Niveau
            </label>
            <select
              id="filter-level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="border border-line bg-paper px-3 py-2 font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink outline-none focus:border-ink"
            >
              <option value="all">Tous niveaux</option>
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <span className="ml-auto self-center font-mono text-xs text-muted">
            {filtered.length} formation{filtered.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Grille */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((formation) => (
            <FormationCard key={formation.slug} formation={formation} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-muted">
          Aucune formation ne correspond à ces critères.
        </p>
      )}
    </div>
  );
}
