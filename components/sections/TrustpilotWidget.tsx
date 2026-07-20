"use client";

import { useEffect, useRef } from "react";
import { trustpilot, trustpilotReviewUrl } from "@/data/trustpilot";

const SCRIPT_SRC =
  "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (el: HTMLElement, force?: boolean) => void;
    };
  }
}

/** Charge le script TrustBox une seule fois, puis exécute onReady. */
function ensureTrustpilotScript(onReady: () => void) {
  if (typeof window === "undefined") return;
  if (window.Trustpilot) {
    onReady();
    return;
  }
  let script = document.querySelector<HTMLScriptElement>(
    `script[src="${SCRIPT_SRC}"]`
  );
  if (!script) {
    script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.head.appendChild(script);
  }
  script.addEventListener("load", onReady, { once: true });
}

interface TrustpilotWidgetProps {
  /** Identifiant de template TrustBox (voir data/trustpilot.ts). */
  templateId: string;
  /** Hauteur du widget (ex. "350px"). */
  height?: string;
  theme?: "light" | "dark";
  className?: string;
}

/**
 * Widget officiel Trustpilot (TrustBox) — affiche les vrais avis.
 * À n'utiliser que lorsque `trustpilotEnabled` est vrai (Business Unit ID fourni).
 */
export default function TrustpilotWidget({
  templateId,
  height = "350px",
  theme = "light",
  className,
}: TrustpilotWidgetProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    ensureTrustpilotScript(() => {
      if (ref.current && window.Trustpilot) {
        window.Trustpilot.loadFromElement(ref.current, true);
      }
    });
  }, [templateId]);

  return (
    <div
      ref={ref}
      className={className}
      data-locale={trustpilot.locale}
      data-template-id={templateId}
      data-businessunit-id={trustpilot.businessUnitId}
      data-style-height={height}
      data-style-width="100%"
      data-theme={theme}
    >
      <a href={trustpilotReviewUrl()} target="_blank" rel="noopener noreferrer">
        Voir nos avis sur Trustpilot
      </a>
    </div>
  );
}
