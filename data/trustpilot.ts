/**
 * Configuration du widget officiel Trustpilot (TrustBox).
 *
 * POUR ACTIVER LES VRAIS AVIS :
 *   1. Activez votre profil sur https://business.trustpilot.com
 *   2. Trustpilot Business → Showcase / Intégrations → TrustBox →
 *      récupérez votre **Business Unit ID**.
 *   3. Collez-le dans `businessUnitId` ci-dessous + renseignez votre `domain`.
 *
 * Tant que `businessUnitId` est vide, le site affiche les avis de secours
 * (data/testimonials.ts). Aucun faux avis n'est présenté comme « vérifié ».
 *
 * `templates` = identifiants STANDARD des types de widgets Trustpilot
 * (identiques pour tous les comptes) — à conserver tels quels.
 */
export const trustpilot = {
  businessUnitId: "", // ← Collez ici votre Business Unit ID Trustpilot
  domain: "horschamp-formation.fr",
  locale: "fr-FR",
  templates: {
    carousel: "53aa8912dec7e10d38f59f36",
    grid: "539adbd6dec7e10e686debee",
    list: "539ad0ffdec7e10e686debd7",
    microCombo: "5419b6a8b0d04a076446a9ad",
    reviewCollector: "56278e9abfbbba0bdcd568bc",
  },
};

/** Le widget n'est rendu que si un Business Unit ID est fourni. */
export const trustpilotEnabled = trustpilot.businessUnitId.trim().length > 0;

/** URL publique du profil Trustpilot (lien de repli du widget). */
export function trustpilotReviewUrl(): string {
  const sub = trustpilot.locale.toLowerCase().startsWith("fr") ? "fr." : "";
  return `https://${sub}trustpilot.com/review/${trustpilot.domain}`;
}
