"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { blogCategories } from "@/data/posts";
import { slugify } from "@/lib/utils";
import CoverImageDropzone from "@/components/admin/CoverImageDropzone";
import SectionsEditor from "@/components/admin/SectionsEditor";
import SourcesEditor from "@/components/admin/SourcesEditor";
import type { Post } from "@/types";

interface BlogPostFormProps {
  mode: "create" | "edit";
  initialPost?: Post;
  formations: { slug: string; title: string }[];
}

const fieldClass =
  "w-full border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink";
const labelClass = "mb-1.5 block font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted";

function emptyPost(): Post {
  return {
    slug: "",
    title: "",
    excerpt: "",
    category: blogCategories[0] || "",
    date: new Date().toISOString().slice(0, 10),
    readingTime: "8 min",
    author: "",
    image: "",
    featured: false,
    intro: "",
    sections: [{ id: "section-1", heading: "", body: [""] }],
    callout: undefined,
    relatedFormationSlug: undefined,
    sources: [],
  };
}

export default function BlogPostForm({ mode, initialPost, formations }: BlogPostFormProps) {
  const router = useRouter();
  const [post, setPost] = useState<Post>(initialPost ?? emptyPost());
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [hasCallout, setHasCallout] = useState(Boolean(initialPost?.callout));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (title: string) => {
    setPost((p) => ({ ...p, title, slug: slugTouched ? p.slug : slugify(title) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...post,
      sections: post.sections.map((s) => ({ ...s, id: s.id || slugify(s.heading) })),
      callout: hasCallout ? post.callout : undefined,
      sources: post.sources && post.sources.length > 0 ? post.sources : undefined,
    };

    try {
      const url = mode === "create" ? "/api/admin/blog" : `/api/admin/blog/${initialPost?.slug}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Une erreur est survenue.");
        setLoading(false);
        return;
      }
      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      {error && <p className="border border-red-600 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <section className="space-y-4 border border-line bg-paper p-6">
        <h2 className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">
          Informations générales
        </h2>
        <div>
          <label className={labelClass}>Titre *</label>
          <input
            required
            value={post.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>Slug (URL) *</label>
          <input
            required
            value={post.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setPost((p) => ({ ...p, slug: slugify(e.target.value) }));
            }}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>Extrait *</label>
          <textarea
            required
            rows={2}
            value={post.excerpt}
            onChange={(e) => setPost((p) => ({ ...p, excerpt: e.target.value }))}
            className={fieldClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Catégorie *</label>
            <select
              required
              value={post.category}
              onChange={(e) => setPost((p) => ({ ...p, category: e.target.value }))}
              className={fieldClass}
            >
              {blogCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Date *</label>
            <input
              required
              type="date"
              value={post.date}
              onChange={(e) => setPost((p) => ({ ...p, date: e.target.value }))}
              className={fieldClass}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Temps de lecture *</label>
            <input
              required
              value={post.readingTime}
              onChange={(e) => setPost((p) => ({ ...p, readingTime: e.target.value }))}
              placeholder="Ex : 10 min"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Auteur *</label>
            <input
              required
              value={post.author}
              onChange={(e) => setPost((p) => ({ ...p, author: e.target.value }))}
              className={fieldClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Formation associée</label>
          <select
            value={post.relatedFormationSlug || ""}
            onChange={(e) => setPost((p) => ({ ...p, relatedFormationSlug: e.target.value || undefined }))}
            className={fieldClass}
          >
            <option value="">Aucune</option>
            {formations.map((f) => (
              <option key={f.slug} value={f.slug}>
                {f.title}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={post.featured ?? false}
            onChange={(e) => setPost((p) => ({ ...p, featured: e.target.checked }))}
            className="h-4 w-4 accent-ink"
          />
          Mettre à la une (remplace l&apos;article actuellement en avant)
        </label>
      </section>

      <section className="space-y-4 border border-line bg-paper p-6">
        <h2 className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">
          Image de couverture
        </h2>
        <CoverImageDropzone
          value={post.image || ""}
          onChange={(url) => setPost((p) => ({ ...p, image: url }))}
          slugHint={post.slug || post.title}
        />
      </section>

      <section className="space-y-4 border border-line bg-paper p-6">
        <h2 className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">Introduction</h2>
        <textarea
          required
          rows={4}
          value={post.intro}
          onChange={(e) => setPost((p) => ({ ...p, intro: e.target.value }))}
          className={fieldClass}
        />
      </section>

      <section className="space-y-4 border border-line bg-paper p-6">
        <h2 className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">
          Corps de l&apos;article
        </h2>
        <SectionsEditor value={post.sections} onChange={(sections) => setPost((p) => ({ ...p, sections }))} />
      </section>

      <section className="space-y-4 border border-line bg-paper p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">
            Encadré « Le réflexe Hors Champ »
          </h2>
          <label className="flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={hasCallout}
              onChange={(e) => {
                setHasCallout(e.target.checked);
                if (e.target.checked && !post.callout) {
                  setPost((p) => ({ ...p, callout: { title: "Le réflexe Hors Champ", body: "" } }));
                }
              }}
              className="h-4 w-4 accent-ink"
            />
            Activer
          </label>
        </div>
        {hasCallout && (
          <div className="space-y-3">
            <input
              value={post.callout?.title || ""}
              onChange={(e) => setPost((p) => ({ ...p, callout: { title: e.target.value, body: p.callout?.body || "" } }))}
              placeholder="Titre"
              className={fieldClass}
            />
            <textarea
              rows={2}
              value={post.callout?.body || ""}
              onChange={(e) => setPost((p) => ({ ...p, callout: { title: p.callout?.title || "", body: e.target.value } }))}
              placeholder="Texte de l'encadré"
              className={fieldClass}
            />
          </div>
        )}
      </section>

      <section className="space-y-4 border border-line bg-paper p-6">
        <h2 className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">
          Sources & références
        </h2>
        <SourcesEditor value={post.sources || []} onChange={(sources) => setPost((p) => ({ ...p, sources }))} />
      </section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center bg-ink px-8 py-4 font-condensed text-sm font-semibold uppercase tracking-wide2 text-canvas transition-colors hover:bg-ink-deep disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : mode === "create" ? "Publier l'article" : "Enregistrer les modifications"}
        </button>
      </div>
    </form>
  );
}
