"use client";

import { Plus, Trash2 } from "lucide-react";
import type { PostSource } from "@/types";

interface SourcesEditorProps {
  value: PostSource[];
  onChange: (sources: PostSource[]) => void;
}

const fieldClass =
  "w-full border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink";

export default function SourcesEditor({ value, onChange }: SourcesEditorProps) {
  const update = (index: number, patch: Partial<PostSource>) => {
    onChange(value.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  const add = () => onChange([...value, { title: "", publisher: "", url: "" }]);
  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div className="space-y-3">
      {value.map((source, index) => (
        <div key={index} className="grid grid-cols-1 gap-2 border border-line bg-paper p-4 sm:grid-cols-[1fr_1fr_1fr_auto]">
          <input
            value={source.title}
            onChange={(e) => update(index, { title: e.target.value })}
            placeholder="Titre"
            className={fieldClass}
          />
          <input
            value={source.publisher}
            onChange={(e) => update(index, { publisher: e.target.value })}
            placeholder="Éditeur"
            className={fieldClass}
          />
          <input
            value={source.url}
            onChange={(e) => update(index, { url: e.target.value })}
            placeholder="https://…"
            className={fieldClass}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="inline-flex h-10 w-10 items-center justify-center self-center border border-line text-muted transition-colors hover:border-red-600 hover:text-red-600"
            aria-label="Supprimer la source"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted transition-colors hover:text-ink"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
        Ajouter une source
      </button>
    </div>
  );
}
