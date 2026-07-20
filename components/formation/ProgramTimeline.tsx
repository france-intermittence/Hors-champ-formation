import type { ProgramStep } from "@/types";
import { pad2 } from "@/lib/utils";

interface ProgramTimelineProps {
  steps: ProgramStep[];
}

/** Programme détaillé : timeline verticale numérotée (séquence d'apprentissage). */
export default function ProgramTimeline({ steps }: ProgramTimelineProps) {
  return (
    <ol className="border-t border-line">
      {steps.map((step, i) => (
        <li
          key={`${i}-${step.title}`}
          className="grid gap-4 border-b border-line py-7 sm:grid-cols-[5rem_1fr] sm:gap-8"
        >
          <span className="font-mono text-sm tracking-wide2 text-muted">
            {pad2(i + 1)}
          </span>
          <div>
            <h3 className="font-condensed text-2xl font-semibold uppercase leading-tight tracking-wide2">
              {step.title}
            </h3>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
