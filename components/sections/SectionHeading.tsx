import SectionLabel from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  index?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}

/** En-tête de section : label, grand titre condensé et intro optionnelle. */
export default function SectionHeading({
  label,
  index,
  title,
  intro,
  align = "left",
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className
      )}
    >
      {label && (
        <SectionLabel index={index} onDark={onDark}>
          {label}
        </SectionLabel>
      )}
      <h2
        className={cn(
          "mt-5 font-display text-display-md uppercase",
          onDark ? "text-canvas" : "text-ink"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            onDark ? "text-ghost" : "text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
