"use client";

import { useState } from "react";
import { Info } from "lucide-react";

export default function FieldHint({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-muted text-muted transition-colors hover:border-ink hover:text-ink"
        aria-label="Aide sur ce champ"
        aria-expanded={open}
      >
        <Info className="h-2.5 w-2.5" aria-hidden />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 top-6 z-20 w-64 -translate-x-1/2 border border-ink bg-canvas p-3 text-left font-sans text-xs normal-case leading-relaxed tracking-normal text-ink shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
        >
          {text}
        </span>
      )}
    </span>
  );
}
