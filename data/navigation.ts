import type { NavItem } from "@/types";

/** Coordonnées de l'organisme — centralisées et faciles à modifier. */
export const site = {
  name: "Hors Champ Formation",
  legalName: "Hors Champ Formation",
  shortName: "Hors Champ",
  baseline: "Ce que vous ne voyez pas fait la différence.",
  url: "https://www.horschamp-formation.fr",
  email: "contact@horschamp-formation.fr",
  phone: "+33777325243",
  phoneDisplay: "07 77 32 52 43",
  address: {
    street: "9 Rue Victor Segalen",
    zip: "75020",
    city: "Paris",
    country: "France",
  },
  /** Profils sociaux — utilisés pour le footer et le sameAs (entité SEO).
      Remplacez par vos vraies URLs. */
  social: {
    instagram: "https://www.instagram.com/horschampformation",
    linkedin: "https://www.linkedin.com/company/horschampformation",
    youtube: "https://www.youtube.com/@horschampformation",
  },
};

/** Liens d'autorité (financeurs officiels) — liens externes sortants. */
export const financingLinks: { label: string; href: string }[] = [
  { label: "Mon Compte Formation (CPF)", href: "https://www.moncompteformation.gouv.fr" },
  { label: "France Travail", href: "https://www.francetravail.fr" },
  { label: "AFDAS", href: "https://www.afdas.com" },
  { label: "Les OPCO", href: "https://travail-emploi.gouv.fr/les-operateurs-de-competences-opco" },
];

/** Navigation principale (header). */
export const mainNav: NavItem[] = [
  { label: "Formations", href: "/formations" },
  { label: "Méthode", href: "/methode" },
  { label: "Informations", href: "/financement" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Liens regroupés pour le footer. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Formations",
    items: [
      { label: "Toutes les formations", href: "/formations" },
      { label: "Prêt à tourner", href: "/formations/pret-a-tourner" },
      { label: "Prêt à tourner + Étalonnage", href: "/formations/pret-a-tourner-etalonnage" },
      { label: "Parcours expert", href: "/formations/pret-a-tourner-postproduction" },
      { label: "Technique plateau", href: "/formations/technique-plateau" },
      { label: "Postproduction", href: "/formations/postproduction" },
    ],
  },
  {
    title: "L'organisme",
    items: [
      { label: "Méthode", href: "/methode" },
      { label: "Témoignages", href: "/temoignages" },
      { label: "Financement & inscription", href: "/financement" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
