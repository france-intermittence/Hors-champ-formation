import { Check, X } from "lucide-react";

interface ForWhoColumnsProps {
  forWho: string[];
  notForYou: string[];
}

/** Deux colonnes : "Pour qui" / "Ce n'est pas pour vous si". */
export default function ForWhoColumns({ forWho, notForYou }: ForWhoColumnsProps) {
  return (
    <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
      <div className="bg-paper p-8 lg:p-10">
        <p className="font-condensed text-xs font-semibold uppercase tracking-label text-muted">
          Pour vous si
        </p>
        <ul className="mt-6 space-y-4">
          {forWho.map((item) => (
            <li key={item} className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden />
              <span className="leading-relaxed text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-canvas p-8 lg:p-10">
        <p className="font-condensed text-xs font-semibold uppercase tracking-label text-muted">
          Ce n&apos;est pas pour vous si
        </p>
        <ul className="mt-6 space-y-4">
          {notForYou.map((item) => (
            <li key={item} className="flex gap-3">
              <X className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden />
              <span className="leading-relaxed text-muted">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
