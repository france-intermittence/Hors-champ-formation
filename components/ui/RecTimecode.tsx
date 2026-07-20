"use client";

import { useEffect, useState } from "react";

/**
 * Indicateur « REC » du hero : le carré clignote et le timecode s'incrémente
 * d'une seconde au chargement (24 images/s), façon enregistrement caméra.
 */
export default function RecTimecode() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setFrame(25);
      return;
    }
    let current = 0;
    const id = window.setInterval(() => {
      current += 1;
      setFrame(current);
      if (current >= 25) window.clearInterval(id);
    }, 40);
    return () => window.clearInterval(id);
  }, []);

  const seconds = frame >= 25 ? 1 : 0;
  const frames = frame >= 25 ? 0 : frame;
  const tc = `00:00:${String(seconds).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;

  return (
    <span className="hidden items-center gap-2 font-mono text-xs tracking-wide2 text-muted sm:inline-flex">
      <span className="rec-blink h-2 w-2 bg-ink" aria-hidden />
      REC {tc}
    </span>
  );
}
