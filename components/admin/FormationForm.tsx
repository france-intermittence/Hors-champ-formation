"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formationCategories } from "@/data/formations";
import { slugify } from "@/lib/utils";
import FieldLabel from "@/components/admin/FieldLabel";
import FieldHint from "@/components/admin/FieldHint";
import CoverImageDropzone from "@/components/admin/CoverImageDropzone";
import PdfDropzone from "@/components/admin/PdfDropzone";
import StringListEditor from "@/components/admin/StringListEditor";
import type { Formation, FormationLevel } from "@/types";

interface FormationFormProps {
  mode: "create" | "edit";
  initialFormation?: Formation;
  /** Nombre de formations déjà mises en avant, hors celle-ci (pour limiter à 3). */
  otherFeaturedCount: number;
}

const levels: FormationLevel[] = ["Débutant", "Débutant à intermédiaire", "Intermédiaire", "Tous niveaux"];

const fieldClass =
  "w-full border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink";

function emptyFormation(): Formation {
  return {
    slug: "",
    title: "",
    category: formationCategories[0],
    excerpt: "",
    subtitle: "",
    intro: "",
    duration: "",
    durationDays: 1,
    level: "Tous niveaux",
    format: "Présentiel",
    location: "Paris",
    rhythm: "",
    accessDelay: "",
    accessibility: "",
    featured: false,
    objectives: [""],
    content: [""],
    methods: [""],
    evaluation: [""],
    image: "",
    imageAlt: "",
  };
}

export default function FormationForm({ mode, initialFormation, otherFeaturedCount }: FormationFormProps) {
  const router = useRouter();
  const [formation, setFormation] = useState<Formation>(initialFormation ?? emptyFormation());
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const featuredDisabled = !formation.featured && otherFeaturedCount >= 3;

  const handleTitleChange = (title: string) => {
    setFormation((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formation,
      objectives: formation.objectives.filter((v) => v.trim()),
      content: formation.content.filter((v) => v.trim()),
      methods: formation.methods.filter((v) => v.trim()),
      evaluation: formation.evaluation.filter((v) => v.trim()),
    };

    try {
      const url = mode === "create" ? "/api/admin/formations" : `/api/admin/formations/${initialFormation?.slug}`;
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
      router.push("/admin/formations");
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
          <FieldLabel htmlFor="title" required hint="Le nom de la formation, affiché partout sur le site (cartes, page détail, menus).">
            Titre
          </FieldLabel>
          <input id="title" required value={formation.title} onChange={(e) => handleTitleChange(e.target.value)} className={fieldClass} />
        </div>

        <div>
          <FieldLabel
            htmlFor="slug"
            required
            hint="L'adresse web de la page, générée automatiquement à partir du titre. Attention : la modifier sur une formation déjà publiée change son URL."
          >
            Slug (URL)
          </FieldLabel>
          <input
            id="slug"
            required
            value={formation.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setFormation((f) => ({ ...f, slug: slugify(e.target.value) }));
            }}
            className={fieldClass}
          />
        </div>

        <div>
          <FieldLabel htmlFor="excerpt" required hint="Description courte (1-2 phrases) affichée sur les cartes formation.">
            Extrait
          </FieldLabel>
          <textarea
            id="excerpt"
            required
            rows={2}
            value={formation.excerpt}
            onChange={(e) => setFormation((f) => ({ ...f, excerpt: e.target.value }))}
            className={fieldClass}
          />
        </div>

        <div>
          <FieldLabel htmlFor="subtitle" required hint="Phrase d'accroche affichée juste sous le titre, en haut de la page détail.">
            Sous-titre
          </FieldLabel>
          <input
            id="subtitle"
            required
            value={formation.subtitle}
            onChange={(e) => setFormation((f) => ({ ...f, subtitle: e.target.value }))}
            className={fieldClass}
          />
        </div>

        <div>
          <FieldLabel htmlFor="intro" required hint="Paragraphe d'introduction affiché sous le sous-titre, en haut de la page détail.">
            Introduction
          </FieldLabel>
          <textarea
            id="intro"
            required
            rows={3}
            value={formation.intro}
            onChange={(e) => setFormation((f) => ({ ...f, intro: e.target.value }))}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="category" required hint="Le bloc pédagogique auquel appartient la formation. Détermine son groupe sur la page Formations et l'accueil.">
              Catégorie
            </FieldLabel>
            <select
              id="category"
              required
              value={formation.category}
              onChange={(e) => setFormation((f) => ({ ...f, category: e.target.value as Formation["category"] }))}
              className={fieldClass}
            >
              {formationCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="tag" hint="Petit badge optionnel affiché à côté du titre (ex. « Format recommandé »). Laissez vide si non pertinent.">
              Badge (optionnel)
            </FieldLabel>
            <input
              id="tag"
              value={formation.tag || ""}
              onChange={(e) => setFormation((f) => ({ ...f, tag: e.target.value }))}
              className={fieldClass}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4 border border-line bg-paper p-6">
        <h2 className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">
          Durée, tarif & niveau
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="duration" required hint="Durée affichée telle quelle sur le site (ex. « 64 h » ou « 3 jours »).">
              Durée affichée
            </FieldLabel>
            <input
              id="duration"
              required
              value={formation.duration}
              onChange={(e) => setFormation((f) => ({ ...f, duration: e.target.value }))}
              placeholder="Ex : 64 h"
              className={fieldClass}
            />
          </div>
          <div>
            <FieldLabel htmlFor="durationDays" required hint="Durée en nombre de jours, utilisée pour les filtres du catalogue.">
              Durée (en jours)
            </FieldLabel>
            <input
              id="durationDays"
              required
              type="number"
              min={1}
              value={formation.durationDays}
              onChange={(e) => setFormation((f) => ({ ...f, durationDays: Number(e.target.value) }))}
              className={fieldClass}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="price" hint="Prix en euros, sans espace ni symbole. Laissez vide pour afficher « Nous consulter ».">
              Prix (€)
            </FieldLabel>
            <input
              id="price"
              type="number"
              min={0}
              value={formation.price ?? ""}
              onChange={(e) => setFormation((f) => ({ ...f, price: e.target.value ? Number(e.target.value) : undefined }))}
              className={fieldClass}
            />
          </div>
          <div>
            <FieldLabel htmlFor="level" required hint="Public visé, affiché dans les infos pratiques de la page détail.">
              Niveau
            </FieldLabel>
            <select
              id="level"
              required
              value={formation.level}
              onChange={(e) => setFormation((f) => ({ ...f, level: e.target.value as FormationLevel }))}
              className={fieldClass}
            >
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4 border border-line bg-paper p-6">
        <h2 className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">Lieu & organisation</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="format" required hint="Format de la formation (ex. « Présentiel »).">
              Format
            </FieldLabel>
            <input
              id="format"
              required
              value={formation.format}
              onChange={(e) => setFormation((f) => ({ ...f, format: e.target.value }))}
              className={fieldClass}
            />
          </div>
          <div>
            <FieldLabel htmlFor="location" required hint="Ville où se déroule la formation.">
              Ville
            </FieldLabel>
            <input
              id="location"
              required
              value={formation.location}
              onChange={(e) => setFormation((f) => ({ ...f, location: e.target.value }))}
              className={fieldClass}
            />
          </div>
        </div>
        <div>
          <FieldLabel htmlFor="place" hint="Lieu précis (optionnel), affiché dans les infos pratiques. Laissez vide pour n'afficher que la ville.">
            Lieu précis (optionnel)
          </FieldLabel>
          <input
            id="place"
            value={formation.place || ""}
            onChange={(e) => setFormation((f) => ({ ...f, place: e.target.value }))}
            className={fieldClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="rhythm" required hint="Rythme des sessions (ex. « Samedis — sessions mensuelles »).">
              Rythme
            </FieldLabel>
            <input
              id="rhythm"
              required
              value={formation.rhythm}
              onChange={(e) => setFormation((f) => ({ ...f, rhythm: e.target.value }))}
              className={fieldClass}
            />
          </div>
          <div>
            <FieldLabel htmlFor="accessDelay" required hint="Délai d'accès à la formation, affiché dans les infos pratiques.">
              Délai d&apos;accès
            </FieldLabel>
            <input
              id="accessDelay"
              required
              value={formation.accessDelay}
              onChange={(e) => setFormation((f) => ({ ...f, accessDelay: e.target.value }))}
              className={fieldClass}
            />
          </div>
        </div>
        <div>
          <FieldLabel htmlFor="accessibility" required hint="Mention d'accessibilité aux personnes en situation de handicap.">
            Accessibilité
          </FieldLabel>
          <textarea
            id="accessibility"
            required
            rows={2}
            value={formation.accessibility}
            onChange={(e) => setFormation((f) => ({ ...f, accessibility: e.target.value }))}
            className={fieldClass}
          />
        </div>
      </section>

      <section className="space-y-6 border border-line bg-paper p-6">
        <h2 className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">Programme pédagogique</h2>
        <div>
          <FieldLabel required hint="Ce que l'apprenant saura faire à la fin. Une ligne = un objectif affiché avec une puce.">
            Objectifs
          </FieldLabel>
          <StringListEditor value={formation.objectives} onChange={(v) => setFormation((f) => ({ ...f, objectives: v }))} />
        </div>
        <div>
          <FieldLabel required hint="Le programme détaillé, point par point. Une ligne = un point du programme.">
            Contenu
          </FieldLabel>
          <StringListEditor value={formation.content} onChange={(v) => setFormation((f) => ({ ...f, content: v }))} />
        </div>
        <div>
          <FieldLabel required hint="La méthode pédagogique utilisée (pratique, taille de groupe, matériel...).">
            Méthode
          </FieldLabel>
          <StringListEditor value={formation.methods} onChange={(v) => setFormation((f) => ({ ...f, methods: v }))} />
        </div>
        <div>
          <FieldLabel required hint="Comment la formation est évaluée et ce qui est remis à la fin (attestation, projet...).">
            Évaluation
          </FieldLabel>
          <StringListEditor value={formation.evaluation} onChange={(v) => setFormation((f) => ({ ...f, evaluation: v }))} />
        </div>
      </section>

      <section className="space-y-4 border border-line bg-paper p-6">
        <h2 className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">Image de couverture</h2>
        <CoverImageDropzone
          value={formation.image || ""}
          onChange={(url) => setFormation((f) => ({ ...f, image: url }))}
          slugHint={formation.slug || formation.title}
          endpoint="/api/admin/formations/upload-image"
          hint="Conversion automatique en .webp, nommée d'après le slug de la formation."
        />
        <div>
          <FieldLabel
            htmlFor="imageAlt"
            hint="Texte alternatif décrivant l'image, pour l'accessibilité (lecteurs d'écran) et le référencement (SEO). Ex. « Formateur filmant avec une caméra en studio »."
          >
            Texte alternatif de l&apos;image (SEO)
          </FieldLabel>
          <input
            id="imageAlt"
            value={formation.imageAlt || ""}
            onChange={(e) => setFormation((f) => ({ ...f, imageAlt: e.target.value }))}
            className={fieldClass}
          />
        </div>
      </section>

      <section className="space-y-4 border border-line bg-paper p-6">
        <h2 className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">
          Programme téléchargeable (PDF)
        </h2>
        <p className="text-xs text-muted">
          Ce fichier est proposé au téléchargement via le bouton « Télécharger le programme » sur la page de la formation.
        </p>
        <PdfDropzone
          value={formation.programPdfUrl || ""}
          fileName={formation.programPdfName}
          onChange={(url, name) => setFormation((f) => ({ ...f, programPdfUrl: url, programPdfName: name }))}
          slugHint={formation.slug || formation.title}
        />
      </section>

      <section className="space-y-3 border border-line bg-paper p-6">
        <h2 className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink">Page d&apos;accueil</h2>
        <div className={`flex items-center gap-3 text-sm ${featuredDisabled ? "text-muted" : "text-ink"}`}>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formation.featured ?? false}
              disabled={featuredDisabled}
              onChange={(e) => setFormation((f) => ({ ...f, featured: e.target.checked }))}
              className="h-4 w-4 accent-ink"
            />
            Mettre en avant sur la page d&apos;accueil (3 places maximum)
          </label>
          <FieldHint text="La page d'accueil affiche jusqu'à 3 formations mises en avant. Si 3 sont déjà sélectionnées, décochez-en une avant d'en ajouter une nouvelle." />
        </div>
        {featuredDisabled && (
          <p className="text-xs text-muted">
            3 formations sont déjà mises en avant sur l&apos;accueil. Décochez-en une (dans sa fiche) pour libérer une place.
          </p>
        )}
      </section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center bg-ink px-8 py-4 font-condensed text-sm font-semibold uppercase tracking-wide2 text-canvas transition-colors hover:bg-ink-deep disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : mode === "create" ? "Créer la formation" : "Enregistrer les modifications"}
        </button>
      </div>
    </form>
  );
}
