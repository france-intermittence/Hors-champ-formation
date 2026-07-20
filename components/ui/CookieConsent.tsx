"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "hors-champ-cookie-consent";

type ConsentValue = "accepted" | "refused";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const saveChoice = (value: ConsentValue) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl border border-ink bg-paper p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:bottom-6 sm:p-6"
    >
      <button
        type="button"
        onClick={() => saveChoice("refused")}
        aria-label="Fermer la fenêtre cookies"
        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center border border-line text-ink transition-colors hover:border-ink"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>

      <div className="grid gap-5 pr-10 sm:grid-cols-[auto_1fr] sm:items-start">
        <span className="inline-flex h-12 w-12 items-center justify-center border border-ink bg-ink text-canvas">
          <Cookie className="h-5 w-5" aria-hidden />
        </span>

        <div>
          <p
            id="cookie-title"
            className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink"
          >
            Gestion des cookies
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Nous utilisons des cookies nécessaires au bon fonctionnement du site
            et, avec votre accord, des cookies de mesure pour améliorer
            l&apos;expérience. Vous pouvez accepter ou refuser ces cookies à tout
            moment.
          </p>
          <Link
            href="/politique-confidentialite"
            className="mt-3 inline-flex font-condensed text-xs font-semibold uppercase tracking-wide2 text-ink underline underline-offset-4"
          >
            Lire la politique de confidentialité
          </Link>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => saveChoice("accepted")}
              className="inline-flex items-center justify-center border border-ink bg-ink px-6 py-3 font-condensed text-sm font-semibold uppercase tracking-wide2 text-canvas transition-colors hover:bg-canvas hover:text-ink"
            >
              Accepter
            </button>
            <button
              type="button"
              onClick={() => saveChoice("refused")}
              className="inline-flex items-center justify-center border border-ink px-6 py-3 font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink transition-colors hover:bg-ink hover:text-canvas"
            >
              Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
