import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  /** Compteur / timecode optionnel affiché avant le label, ex. "01". */
  index?: string;
  className?: string;
  onDark?: boolean;
}

/** Petit label en capitales très espacées, avec repère de timecode optionnel. */
export default function SectionLabel({
  children,
  index,
  className,
  onDark = false,
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3",
        onDark ? "text-ghost" : "text-muted",
        className
      )}
    >
      {index && (
        <span
          className="timecode font-mono text-xs"
          aria-hidden
        >
          {index}
        </span>
      )}
      <span className="font-condensed text-xs font-semibold uppercase tracking-label">
        {children}
      </span>
    </span>
  );
}
