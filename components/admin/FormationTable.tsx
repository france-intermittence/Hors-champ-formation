"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, FileText } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface FormationTableRow {
  slug: string;
  title: string;
  category: string;
  price: number | null;
  featured: boolean;
  program_pdf_url: string | null;
}

export default function FormationTable({ formations }: { formations: FormationTableRow[] }) {
  const router = useRouter();
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  const handleDelete = async (slug: string) => {
    if (!window.confirm(`Supprimer définitivement la formation « ${slug} » ?`)) return;
    setPendingSlug(slug);
    try {
      const res = await fetch(`/api/admin/formations/${slug}`, { method: "DELETE" });
      if (res.ok) router.refresh();
    } finally {
      setPendingSlug(null);
    }
  };

  if (formations.length === 0) {
    return <p className="border border-line bg-paper p-8 text-center text-muted">Aucune formation pour le moment.</p>;
  }

  return (
    <div className="overflow-x-auto border border-line bg-paper">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-line font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">
            <th className="px-5 py-3">Titre</th>
            <th className="px-5 py-3">Catégorie</th>
            <th className="px-5 py-3">Tarif</th>
            <th className="px-5 py-3">PDF</th>
            <th className="px-5 py-3">Statut</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {formations.map((formation) => (
            <tr key={formation.slug} className="border-b border-line last:border-b-0">
              <td className="px-5 py-4 font-medium text-ink">{formation.title}</td>
              <td className="px-5 py-4 text-muted">{formation.category}</td>
              <td className="px-5 py-4 text-muted">{formatPrice(formation.price ?? undefined)}</td>
              <td className="px-5 py-4">
                {formation.program_pdf_url ? (
                  <FileText className="h-4 w-4 text-ink" aria-label="PDF disponible" />
                ) : (
                  <span className="text-xs text-muted">—</span>
                )}
              </td>
              <td className="px-5 py-4">
                {formation.featured && (
                  <span className="inline-flex bg-ink px-2 py-1 font-mono text-[0.65rem] uppercase text-canvas">
                    À la une
                  </span>
                )}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/formations/${formation.slug}/edit`}
                    className="inline-flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                    aria-label="Modifier"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(formation.slug)}
                    disabled={pendingSlug === formation.slug}
                    className="inline-flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-red-600 hover:text-red-600 disabled:opacity-50"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
