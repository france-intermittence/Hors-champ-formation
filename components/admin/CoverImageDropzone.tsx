"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoverImageDropzoneProps {
  value: string;
  onChange: (url: string) => void;
  /** Slug/titre courant utilisé pour nommer le fichier au moment du dépôt. */
  slugHint: string;
}

export default function CoverImageDropzone({ value, onChange, slugHint }: CoverImageDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (!slugHint.trim()) {
      setError("Renseignez d'abord un titre ou un slug avant d'ajouter une image.");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", slugHint);
      const res = await fetch("/api/admin/blog/upload-image", { method: "POST", body: formData });
      if (!res.ok) throw new Error("upload-failed");
      const data = await res.json();
      onChange(data.url);
    } catch {
      setError("Échec de l'upload de l'image.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  return (
    <div>
      {value ? (
        <div className="relative aspect-[21/9] w-full overflow-hidden border border-line bg-canvas">
          <Image src={value} alt="Aperçu de l'image de couverture" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center border border-ink bg-canvas text-ink transition-colors hover:bg-ink hover:text-canvas"
            aria-label="Retirer l'image"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex aspect-[21/9] w-full cursor-pointer flex-col items-center justify-center gap-3 border border-dashed px-6 text-center transition-colors",
            dragging ? "border-ink bg-canvas" : "border-line bg-canvas/60 hover:border-ink"
          )}
        >
          <UploadCloud className="h-8 w-8 text-muted" aria-hidden />
          <p className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">
            {uploading ? "Envoi en cours..." : "Glissez-déposez une image, ou cliquez"}
          </p>
          <p className="text-xs text-muted">
            Conversion automatique en .webp, nommée d&apos;après le titre de l&apos;article.
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = "";
        }}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
