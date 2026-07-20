/** Concatène des classes conditionnelles sans dépendance externe. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Formate une date ISO (AAAA-MM-JJ) en français long, ex. "28 mai 2026". */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Renvoie un numéro d'étape formaté en compteur, ex. 1 -> "01". */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Formate un prix en euros ("1 290 €"), ou "Nous consulter" si absent. */
export function formatPrice(price?: number): string {
  if (price == null) return "Nous consulter";
  return `${new Intl.NumberFormat("fr-FR").format(price)} €`;
}

/** Convertit une chaîne en slug URL/fichier friendly, ex. "Été à Paris !" -> "ete-a-paris". */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/'/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}
