import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  /** Affiche une flèche à droite (par défaut sur primaire). */
  arrow?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit";
  className?: string;
  /** Variante claire pour fond sombre (footer, sections noires). */
  onDark?: boolean;
  /** Identifiant de tracking analytics (attribut data-track). */
  dataTrack?: string;
}

const base =
  "group inline-flex items-center justify-center px-8 py-4 font-condensed text-sm font-semibold uppercase tracking-wide2 transition-colors duration-200 disabled:opacity-50";

/** Renvoie les classes de repos/survol avec un contraste texte/fond stable. */
function variantClasses(
  variant: Variant,
  onDark: boolean
): string {
  if (onDark) {
    switch (variant) {
      case "secondary":
        return "border border-canvas/40 text-canvas hover:border-canvas hover:bg-canvas hover:text-ink";
      case "ghost":
        return "text-canvas hover:text-ghost";
      default:
        return "border border-canvas bg-canvas text-ink hover:bg-ink-deep hover:text-canvas";
    }
  }
  switch (variant) {
    case "secondary":
      return "border border-ink text-ink hover:bg-ink hover:text-canvas";
    case "ghost":
      return "text-ink hover:text-muted";
    default:
      return "border border-ink bg-ink text-canvas hover:bg-canvas hover:text-ink";
  }
}

export default function CTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  arrow,
  fullWidth,
  type = "button",
  className,
  onDark = false,
  dataTrack,
}: CTAButtonProps) {
  const showArrow = arrow ?? variant === "primary";
  const rest = variantClasses(variant, onDark);
  const classes = cn(base, rest, fullWidth && "w-full", className);

  const content = (
    <span className="inline-flex items-center gap-3 text-current">
      <span className="inline-flex items-center">{children}</span>
      {showArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        />
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={classes} data-track={dataTrack}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} data-track={dataTrack}>
      {content}
    </button>
  );
}
