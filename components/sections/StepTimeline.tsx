import type { Step } from "@/types";
import { pad2, cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

interface StepTimelineProps {
  steps: Step[];
  /** Nombre de colonnes sur desktop. */
  columns?: 2 | 3 | 4 | 5;
  onDark?: boolean;
}

const colClass: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
};

/**
 * Étapes numérotées en compteur (timecode), reliées par un filet fin.
 * La numérotation encode une vraie séquence (méthode, programme, process).
 */
export default function StepTimeline({
  steps,
  columns = 4,
  onDark = false,
}: StepTimelineProps) {
  return (
    <ol
      className={cn(
        "grid gap-px border",
        colClass[columns],
        onDark ? "border-canvas/15 bg-canvas/15" : "border-line bg-line"
      )}
    >
      {steps.map((step, i) => (
        <Reveal
          as="li"
          key={`${i}-${step.title}`}
          delay={i * 80}
          className={cn(
            "flex min-h-[210px] flex-col gap-4 p-6 transition-colors lg:p-8",
            onDark ? "bg-ink-deep hover:bg-ink" : "bg-paper hover:bg-canvas"
          )}
        >
          <span
            className={cn(
              "font-mono text-sm tracking-wide2",
              onDark ? "text-ghost" : "text-muted"
            )}
          >
            {pad2(i + 1)}
          </span>
          <h3
            className={cn(
              "font-condensed text-xl font-semibold uppercase leading-tight tracking-wide2",
              onDark ? "text-canvas" : "text-ink"
            )}
          >
            {step.title}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed",
              onDark ? "text-ghost" : "text-muted"
            )}
          >
            {step.description}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
