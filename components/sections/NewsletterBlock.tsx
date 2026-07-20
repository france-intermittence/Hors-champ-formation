"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

interface NewsletterBlockProps {
  title?: string;
  intro?: string;
  onDark?: boolean;
}

export default function NewsletterBlock({
  title = "Recevez nos conseils et ressources",
  intro = "Des conseils pratiques, des retours d'expérience et des ressources exclusives pour progresser en audiovisuel. Pas de spam.",
  onDark = true,
}: NewsletterBlockProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Branchement à votre service d'emailing à faire ici.
    if (email) setDone(true);
  };

  const tone = onDark ? "text-canvas" : "text-ink";
  const sub = onDark ? "text-ghost" : "text-muted";

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <p className={`font-condensed text-xs font-semibold uppercase tracking-label ${sub}`}>
          Newsletter
        </p>
        <h2 className={`mt-4 font-display text-display-md uppercase ${tone}`}>
          {title}
        </h2>
        <p className={`mt-4 max-w-md leading-relaxed ${sub}`}>{intro}</p>
      </div>

      <div>
        {done ? (
          <p className={`inline-flex items-center gap-3 font-condensed text-lg font-semibold uppercase tracking-wide2 ${tone}`}>
            <Check className="h-5 w-5" aria-hidden />
            Merci, votre inscription est enregistrée.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Votre adresse e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              className={`flex-1 border bg-transparent px-5 py-4 text-base outline-none ${
                onDark
                  ? "border-canvas/30 text-canvas placeholder:text-ghost focus:border-canvas"
                  : "border-line text-ink placeholder:text-muted focus:border-ink"
              }`}
            />
            <button
              type="submit"
              className={`group inline-flex items-center justify-center gap-2 px-7 py-4 font-condensed text-sm font-semibold uppercase tracking-wide2 transition-colors ${
                onDark
                  ? "bg-canvas text-ink hover:bg-ghost"
                  : "bg-ink text-canvas hover:bg-ink-deep"
              }`}
            >
              S&apos;inscrire
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </button>
          </form>
        )}
        <p className={`mt-3 text-xs ${sub}`}>
          En vous inscrivant, vous acceptez de recevoir nos e-mails. Désinscription en un clic.
        </p>
      </div>
    </div>
  );
}
