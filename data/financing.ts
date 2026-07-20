import type { FinancingSolution, Step } from "@/types";

/** Étapes d'inscription. */
export const inscriptionSteps: Step[] = [
  {
    title: "Choisissez votre formation",
    description:
      "Identifiez le parcours adapté à votre objectif, votre niveau et votre disponibilité.",
  },
  {
    title: "Vérifiez votre financement",
    description:
      "Nous analysons ensemble les dispositifs mobilisables selon votre situation.",
  },
  {
    title: "Constituez votre dossier",
    description:
      "Nous vous transmettons les documents nécessaires et vous accompagnons à chaque étape.",
  },
  {
    title: "Validation et accord de prise en charge",
    description:
      "Une fois l'accord obtenu, nous confirmons votre place sur la session choisie.",
  },
  {
    title: "Démarrez votre formation",
    description:
      "Vous rejoignez le studio à Paris et entrez directement dans la pratique.",
  },
];

/** Solutions de financement. */
export const financingSolutions: FinancingSolution[] = [
  {
    tag: "Particuliers",
    title: "Financement personnel",
    description:
      "Réglez votre formation directement, avec la possibilité d'un paiement échelonné en plusieurs fois.",
  },
  {
    tag: "Salariés",
    title: "Financement entreprise",
    description:
      "Votre employeur ou son opérateur de compétences peut prendre en charge tout ou partie de la formation.",
  },
  {
    tag: "Dispositifs",
    title: "Organismes partenaires",
    description:
      "Selon votre profil, plusieurs dispositifs publics et professionnels peuvent contribuer au financement.",
  },
  {
    tag: "Flexibilité",
    title: "Paiement en plusieurs fois",
    description:
      "Étalez le coût de votre formation sur plusieurs mensualités, sans complexité administrative.",
  },
];

/** Documents utiles téléchargeables (liens à brancher). */
export const usefulDocuments: { title: string; meta: string }[] = [
  { title: "Programme détaillé des formations", meta: "PDF" },
  { title: "Règlement intérieur", meta: "PDF" },
  { title: "Conditions générales de vente", meta: "PDF" },
  { title: "Guide des financements", meta: "PDF" },
  { title: "Livret d'accueil du stagiaire", meta: "PDF" },
];
