import { cn } from "@/lib/utils";

interface TypographicBackgroundProps {
  /** Mots géants affichés en arrière-plan (gris clair, inclinés). */
  words: string[];
  className?: string;
  /** Glissement d'entrée depuis le bord droit (au chargement, esprit hors-champ). */
  animateIn?: boolean;
  /** Dérive lente au scroll (parallaxe, profondeur de champ). */
  parallax?: boolean;
}

/**
 * Grands mots typographiques inclinés en arrière-plan (esprit "hors champ").
 * Purement décoratif : masqué aux lecteurs d'écran.
 */
export default function TypographicBackground({
  words,
  className,
  animateIn = false,
  parallax = false,
}: TypographicBackgroundProps) {
  const inner = (
    <div className="absolute right-[-6%] top-1/2 -translate-y-1/2 -rotate-[8deg] text-right">
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="block font-display uppercase leading-[0.82] text-ghost/15"
          style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}
        >
          {word}
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 select-none overflow-hidden",
        animateIn && "ghost-animate",
        className
      )}
      style={animateIn ? { animationDelay: "0.2s" } : undefined}
    >
      {parallax ? (
        <div className="ghost-parallax absolute inset-0">{inner}</div>
      ) : (
        inner
      )}
    </div>
  );
}
