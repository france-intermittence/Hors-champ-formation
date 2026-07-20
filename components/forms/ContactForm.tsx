"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { formations } from "@/data/formations";

const profiles = [
  "Créateur de contenu",
  "Vidéaste indépendant",
  "Artiste / profil créatif",
  "En reconversion",
  "Débutant motivé",
  "Professionnel de l'audiovisuel",
  "Entreprise / équipe",
];

const fieldClass =
  "w-full border border-line bg-paper px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-ink";
const labelClass =
  "mb-2 block font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request-failed");
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Merci de réessayer ou de nous contacter directement.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="viewfinder border border-ink bg-paper p-10 text-center">
        <Check className="mx-auto h-10 w-10 text-ink" aria-hidden />
        <h2 className="mt-6 font-display text-3xl uppercase">Demande envoyée</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Merci pour votre message. Nous revenons vers vous sous 48 heures
          ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot anti-spam : champ invisible, doit rester vide */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="lastname" className={labelClass}>
            Nom *
          </label>
          <input id="lastname" name="lastname" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="firstname" className={labelClass}>
            Prénom *
          </label>
          <input id="firstname" name="firstname" required className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Téléphone
          </label>
          <input id="phone" name="phone" type="tel" className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="profile" className={labelClass}>
            Votre profil
          </label>
          <select id="profile" name="profile" className={fieldClass} defaultValue="">
            <option value="" disabled>
              Sélectionnez…
            </option>
            {profiles.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="formation" className={labelClass}>
            Formation souhaitée
          </label>
          <select id="formation" name="formation" className={fieldClass} defaultValue="">
            <option value="">Je ne sais pas encore</option>
            {formations.map((f) => (
              <option key={f.slug} value={f.slug}>
                {f.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Votre message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={fieldClass}
          placeholder="Parlez-nous de votre projet, vos objectifs, vos disponibilités…"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-ink"
        />
        <span>
          J&apos;accepte que mes données soient utilisées pour traiter ma demande,
          conformément à la politique de confidentialité. *
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        data-track="contact-form-submit"
        className="group inline-flex w-full items-center justify-center gap-3 bg-ink px-8 py-4 font-condensed text-sm font-semibold uppercase tracking-wide2 text-canvas transition-colors hover:bg-ink-deep disabled:opacity-50 sm:w-auto"
      >
        {loading ? "Envoi..." : "Envoyer ma demande"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </button>
    </form>
  );
}
