"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import type { Testimonial } from "@/types";
import Avatar from "@/components/ui/Avatar";
import { pad2, cn } from "@/lib/utils";

const INTERVAL = 6000;

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

/**
 * Carrousel d'avis auto-défilant pour l'accueil.
 * - Avance toutes les 6 s, en pause au survol et au focus clavier.
 * - Barre de progression « playhead » synchronisée.
 * - Respecte prefers-reduced-motion (pas d'autoplay) ; navigable au clavier.
 */
export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const total = testimonials.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || reduce || total <= 1) return;
    const id = window.setTimeout(
      () => setIndex((p) => (p + 1) % total),
      INTERVAL
    );
    return () => window.clearTimeout(id);
  }, [index, paused, reduce, total]);

  const go = (n: number) => setIndex((n + total) % total);
  const current = testimonials[index];
  const autoplay = !paused && !reduce && total > 1;

  return (
    <div
      className="relative mx-auto max-w-4xl"
      role="group"
      aria-roledescription="carrousel"
      aria-label="Témoignages d'apprenants"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Compteur timecode + flèches */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-wide2 text-muted">
          {pad2(index + 1)} / {pad2(total)}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Témoignage précédent"
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Témoignage suivant"
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* Avis courant */}
      <div
        className="mt-8 text-center"
        aria-live={paused ? "polite" : "off"}
        aria-atomic="true"
      >
        <div key={index} className="reveal-in">
          <div
            className="flex justify-center gap-1"
            aria-label={`Note : ${current.rating} sur 5`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < current.rating ? "fill-ink text-ink" : "text-line"
                )}
                aria-hidden
              />
            ))}
          </div>

          <blockquote className="mx-auto mt-8 max-w-3xl font-display text-3xl uppercase leading-[1.05] sm:text-4xl lg:text-5xl">
            “{current.quote}”
          </blockquote>

          <figcaption className="mt-8 flex flex-col items-center gap-3">
            <Avatar name={current.name} image={current.image} size={56} />
            <span className="font-condensed text-sm font-semibold uppercase tracking-label text-muted">
              {current.name} — {current.role}
            </span>
          </figcaption>
        </div>
      </div>

      {/* Barre de progression (playhead) + puces */}
      <div className="mx-auto mt-10 max-w-xs">
        <div className="h-px w-full bg-line">
          {autoplay && <div key={index} className="slide-progress h-px bg-ink" />}
        </div>
        <div className="mt-5 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Voir le témoignage ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-2 w-2 transition-colors",
                i === index ? "bg-ink" : "bg-line hover:bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
