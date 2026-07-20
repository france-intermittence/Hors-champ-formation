import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, BarChart3 } from "lucide-react";
import type { Formation } from "@/types";
import { formatPrice } from "@/lib/utils";

interface FormationCardProps {
  formation: Formation;
  /** Affiche le visuel gris en haut de carte. */
  withVisual?: boolean;
}

export default function FormationCard({
  formation,
  withVisual = true,
}: FormationCardProps) {
  const href = `/formations/${formation.slug}`;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col border border-line bg-paper transition-colors duration-200 hover:border-ink"
    >
      {withVisual && (
        <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-canvas">
          {formation.image ? (
            <>
              <Image
                src={formation.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover grayscale contrast-110 transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-ink/15 transition-colors duration-300 group-hover:bg-ink/5" aria-hidden />
            </>
          ) : (
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center px-6 text-center font-display text-4xl uppercase leading-[0.85] text-ghost/40 blur-0 transition duration-500 [@media(hover:hover)]:blur-[3px] group-hover:text-ghost/60 group-hover:blur-0"
            >
              {formation.title}
            </span>
          )}

          {/* Grille règle des tiers (apparaît au survol — mise au point) */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <span className="absolute left-1/3 top-0 h-full w-px bg-ink/15" />
            <span className="absolute left-2/3 top-0 h-full w-px bg-ink/15" />
            <span className="absolute left-0 top-1/3 h-px w-full bg-ink/15" />
            <span className="absolute left-0 top-2/3 h-px w-full bg-ink/15" />
          </div>

          {/* Repères d'angle (viseur) */}
          <span aria-hidden className="absolute left-3 top-3 h-4 w-4 border-l border-t border-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span aria-hidden className="absolute right-3 top-3 h-4 w-4 border-r border-t border-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span aria-hidden className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span aria-hidden className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <span className="absolute left-4 top-4 bg-canvas/90 px-2 py-1 font-condensed text-xs font-semibold uppercase tracking-label text-muted">
            {formation.category}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {!withVisual && (
          <span className="label mb-3">{formation.category}</span>
        )}
        <h3 className="font-display text-3xl uppercase leading-none">
          {formation.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {formation.excerpt}
        </p>

        <p className="mt-4 font-condensed text-lg font-semibold uppercase tracking-wide2 text-ink">
          {formatPrice(formation.price)}
        </p>

        <div className="mt-4 flex items-center gap-5 border-t border-line pt-4">
          <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {formation.duration}
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
            <BarChart3 className="h-3.5 w-3.5" aria-hidden />
            {formation.level}
          </span>
          <ArrowRight
            className="ml-auto h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}
