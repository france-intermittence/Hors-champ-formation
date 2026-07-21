"use client";

import { useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PdfDropzoneProps {
  value: string;
  fileName?: string;
  onChange: (url: string, fileName: string) => void;
  slugHint: string;
}

export default function PdfDropzone({ value, fileName, onChange, slugHint }: PdfDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (!slugHint.trim()) {
      setError("Renseignez d'abord un titre ou un slug avant d'ajouter un PDF.");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", slugHint);
      const res = await fetch("/api/admin/formations/upload-pdf", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "upload-failed");
      }
      const data = await res.json();
      onChange(data.url, data.name);
    } catch (err) {
      setError(err instanceof Error && err.message !== "upload-failed" ? err.message : "Échec de l'upload du PDF.");
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
        <div className="flex items-center gap-4 border border-line bg-canvas p-4">
          <FileText className="h-8 w-8 shrink-0 text-ink" strokeWidth={1.5} aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-ink">{fileName || "Programme.pdf"}</p>
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-muted underline underline-offset-2 hover:text-ink">
              Ouvrir le PDF
            </a>
          </div>
          <button
            type="button"
            onClick={() => onChange("", "")}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-canvas"
            aria-label="Retirer le PDF"
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
            "flex h-28 w-full cursor-pointer flex-col items-center justify-center gap-2 border border-dashed px-6 text-center transition-colors",
            dragging ? "border-ink bg-canvas" : "border-line bg-canvas/60 hover:border-ink"
          )}
        >
          <UploadCloud className="h-6 w-6 text-muted" aria-hidden />
          <p className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">
            {uploading ? "Envoi en cours..." : "Glissez-déposez le PDF du programme, ou cliquez"}
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
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
