"use client";

import { Plus, Trash2 } from "lucide-react";

interface StringListEditorProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

const fieldClass =
  "w-full border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink";

export default function StringListEditor({ value, onChange, placeholder }: StringListEditorProps) {
  const update = (index: number, text: string) => {
    onChange(value.map((v, i) => (i === index ? text : v)));
  };

  const add = () => onChange([...value, ""]);
  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      {value.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            value={item}
            onChange={(e) => update(index, e.target.value)}
            placeholder={placeholder}
            className={fieldClass}
          />
          {value.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-line text-muted transition-colors hover:border-red-600 hover:text-red-600"
              aria-label="Supprimer cette ligne"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted transition-colors hover:text-ink"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
        Ajouter une ligne
      </button>
    </div>
  );
}
