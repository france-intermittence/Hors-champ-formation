import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** Légende affichée discrètement (ex. "Tournage en studio"). */
  caption?: string;
  /** Mot/titre ghosté au centre. */
  word?: string;
  ratio?: "video" | "portrait" | "wide" | "square";
  className?: string;
  /** Affiche une grille règle des tiers (esprit viseur). */
  grid?: boolean;
  /** Ligne de scan animée (ambiance, à réserver aux grands visuels). */
  scan?: boolean;
}

const ratioClass: Record<string, string> = {
  video: "aspect-[16/10]",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
  square: "aspect-square",
};

/**
 * Emplacement d'image noir & blanc, rendu comme un cadre de viseur gris.
 * Remplacez-le par <Image> lorsque les photos réelles seront disponibles.
 */
export default function ImagePlaceholder({
  caption,
  word,
  ratio = "video",
  className,
  grid = true,
  scan = false,
}: ImagePlaceholderProps) {
  // Sans légende, l'emplacement est purement décoratif : on le masque aux
  // lecteurs d'écran plutôt que d'annoncer un libellé générique.
  const decorative = !caption;

  return (
    <div
      className={cn(
        "film-grain viewfinder relative overflow-hidden border border-line bg-ghost/20",
        ratioClass[ratio],
        className
      )}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : caption}
      aria-hidden={decorative || undefined}
    >
      {/* Ligne de scan (ambiance) */}
      {scan && <div className="scan-line" aria-hidden />}

      {/* Grille règle des tiers */}
      {grid && (
        <div aria-hidden className="absolute inset-0 opacity-40">
          <div className="absolute left-1/3 top-0 h-full w-px bg-canvas/60" />
          <div className="absolute left-2/3 top-0 h-full w-px bg-canvas/60" />
          <div className="absolute left-0 top-1/3 h-px w-full bg-canvas/60" />
          <div className="absolute left-0 top-2/3 h-px w-full bg-canvas/60" />
        </div>
      )}

      {word && (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center px-6 text-center font-display text-5xl uppercase leading-[0.85] text-canvas/70 lg:text-7xl"
        >
          {word}
        </span>
      )}

      {caption && (
        <span className="absolute bottom-3 left-3 font-mono text-[0.65rem] uppercase tracking-wide2 text-ink/70">
          {caption}
        </span>
      )}
    </div>
  );
}
