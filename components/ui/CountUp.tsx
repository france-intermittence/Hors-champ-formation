"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Valeur affichée. Le préfixe numérique est animé ("97%" → 0…97 + "%"). */
  value: string;
  durationMs?: number;
  className?: string;
}

/**
 * Compteur animé déclenché à l'entrée dans le viewport.
 * SSR-safe : la valeur complète est dans le HTML (SEO / sans JS), l'animation
 * ne démarre qu'au scroll. Les valeurs non numériques ("Paris") restent fixes.
 */
export default function CountUp({
  value,
  durationMs = 1200,
  className,
}: CountUpProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (target === null) return;
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const step = (now: number) => {
              const p = Math.min(1, (now - start) / durationMs);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(`${Math.round(eased * target)}${suffix}`);
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, suffix, durationMs]);

  return (
    <>
      <span ref={ref} className={className} aria-hidden="true">
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
