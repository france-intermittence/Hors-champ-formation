"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogTableRow {
  slug: string;
  title: string;
  category: string;
  date: string;
  featured: boolean;
}

export default function BlogTable({ posts }: { posts: BlogTableRow[] }) {
  const router = useRouter();
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  const handleDelete = async (slug: string) => {
    if (!window.confirm(`Supprimer définitivement l'article « ${slug} » ?`)) return;
    setPendingSlug(slug);
    try {
      const res = await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" });
      if (res.ok) router.refresh();
    } finally {
      setPendingSlug(null);
    }
  };

  if (posts.length === 0) {
    return <p className="border border-line bg-paper p-8 text-center text-muted">Aucun article pour le moment.</p>;
  }

  return (
    <div className="overflow-x-auto border border-line bg-paper">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-line font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">
            <th className="px-5 py-3">Titre</th>
            <th className="px-5 py-3">Catégorie</th>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Statut</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.slug} className="border-b border-line last:border-b-0">
              <td className="px-5 py-4 font-medium text-ink">{post.title}</td>
              <td className="px-5 py-4 text-muted">{post.category}</td>
              <td className="px-5 py-4 text-muted">{formatDate(post.date)}</td>
              <td className="px-5 py-4">
                {post.featured && (
                  <span className="inline-flex bg-ink px-2 py-1 font-mono text-[0.65rem] uppercase text-canvas">
                    À la une
                  </span>
                )}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/blog/${post.slug}/edit`}
                    className="inline-flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                    aria-label="Modifier"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.slug)}
                    disabled={pendingSlug === post.slug}
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
