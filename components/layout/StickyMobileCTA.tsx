import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface StickyMobileCTAProps {
  label: string;
  href: string;
  /** Libellé secondaire optionnel (ex. prix ou durée) affiché à gauche. */
  hint?: string;
}

/**
 * CTA collant en bas d'écran sur mobile (pages formation & contact).
 * Masqué sur desktop.
 */
export default function StickyMobileCTA({
  label,
  href,
  hint,
}: StickyMobileCTAProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 backdrop-blur-sm lg:hidden">
      <div className="flex items-center gap-4 px-gutter py-3">
        {hint && (
          <span className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">
            {hint}
          </span>
        )}
        <Link
          href={href}
          className="ml-auto inline-flex flex-1 items-center justify-center gap-2 bg-ink px-6 py-4 font-condensed text-sm font-semibold uppercase tracking-wide2 text-canvas"
        >
          {label}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
