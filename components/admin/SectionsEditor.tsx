"use client";

import { Plus, Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import type { PostSection } from "@/types";

interface SectionsEditorProps {
  value: PostSection[];
  onChange: (sections: PostSection[]) => void;
}

const fieldClass =
  "w-full border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink";
const labelClass = "mb-1.5 block font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted";

export default function SectionsEditor({ value, onChange }: SectionsEditorProps) {
  const updateSection = (index: number, patch: Partial<PostSection>) => {
    const next = value.map((s, i) => (i === index ? { ...s, ...patch } : s));
    onChange(next);
  };

  const addSection = () => {
    onChange([...value, { id: `section-${value.length + 1}`, heading: "", body: [""] }]);
  };

  const removeSection = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateParagraph = (sectionIndex: number, paragraphIndex: number, text: string) => {
    const section = value[sectionIndex];
    const body = section.body.map((p, i) => (i === paragraphIndex ? text : p));
    updateSection(sectionIndex, { body });
  };

  const addParagraph = (sectionIndex: number) => {
    updateSection(sectionIndex, { body: [...value[sectionIndex].body, ""] });
  };

  const removeParagraph = (sectionIndex: number, paragraphIndex: number) => {
    updateSection(sectionIndex, { body: value[sectionIndex].body.filter((_, i) => i !== paragraphIndex) });
  };

  return (
    <div className="space-y-6">
      {value.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border border-line bg-paper p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <label className={labelClass}>Titre de la section {sectionIndex + 1}</label>
              <input
                value={section.heading}
                onChange={(e) =>
                  updateSection(sectionIndex, {
                    heading: e.target.value,
                    id: section.id || slugify(e.target.value),
                  })
                }
                onBlur={() => {
                  if (!section.id) updateSection(sectionIndex, { id: slugify(section.heading) });
                }}
                className={fieldClass}
                placeholder="Ex : Clarifier l'intention"
              />
            </div>
            <button
              type="button"
              onClick={() => removeSection(sectionIndex)}
              className="mt-6 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-line text-muted transition-colors hover:border-red-600 hover:text-red-600"
              aria-label="Supprimer la section"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <label className={labelClass}>Paragraphes</label>
            {section.body.map((paragraph, paragraphIndex) => (
              <div key={paragraphIndex} className="flex items-start gap-2">
                <textarea
                  value={paragraph}
                  onChange={(e) => updateParagraph(sectionIndex, paragraphIndex, e.target.value)}
                  rows={3}
                  className={fieldClass}
                />
                {section.body.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParagraph(sectionIndex, paragraphIndex)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-line text-muted transition-colors hover:border-red-600 hover:text-red-600"
                    aria-label="Supprimer le paragraphe"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addParagraph(sectionIndex)}
              className="inline-flex items-center gap-2 font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted transition-colors hover:text-ink"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Ajouter un paragraphe
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSection}
        className="inline-flex items-center gap-2 border border-line px-4 py-2.5 font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted transition-colors hover:border-ink hover:text-ink"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
        Ajouter une section
      </button>
    </div>
  );
}
