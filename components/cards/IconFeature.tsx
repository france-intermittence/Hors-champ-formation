import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconFeatureProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  onDark?: boolean;
}

/** Bloc icône linéaire + titre court (bande de réassurance, bénéfices). */
export default function IconFeature({
  icon: Icon,
  title,
  description,
  onDark = false,
}: IconFeatureProps) {
  return (
    <div className="flex flex-col gap-3">
      <Icon
        className={cn("h-7 w-7", onDark ? "text-canvas" : "text-ink")}
        strokeWidth={1.4}
        aria-hidden
      />
      <p
        className={cn(
          "font-condensed text-base font-semibold uppercase tracking-wide2",
          onDark ? "text-canvas" : "text-ink"
        )}
      >
        {title}
      </p>
      {description && (
        <p className={cn("text-sm leading-relaxed", onDark ? "text-ghost" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}
