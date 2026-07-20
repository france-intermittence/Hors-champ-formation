import type { FaqItem } from "@/types";

/** FAQ générale (accueil, formations). */
export const generalFaq: FaqItem[] = [
  {
    question: "À qui s'adressent les formations ?",
    answer:
      "Nos formations s'adressent aux créateurs de contenu, vidéastes indépendants, profils créatifs, personnes en reconversion, débutants motivés et professionnels qui souhaitent structurer leur pratique audiovisuelle. Chaque parcours précise son niveau d'entrée.",
  },
  {
    question: "Quels sont les prérequis ?",
    answer:
      "La plupart de nos formations sont accessibles aux débutants motivés. Aucun matériel personnel n'est exigé : tout l'équipement professionnel est fourni sur place. Les prérequis éventuels sont indiqués sur chaque fiche formation.",
  },
  {
    question: "Comment se déroule l'évaluation ?",
    answer:
      "L'évaluation est continue et pratique : mises en situation, ateliers et projet final en conditions réelles. Vous recevez des retours personnalisés tout au long du parcours et une attestation en fin de formation.",
  },
  {
    question: "Existe-t-il des financements ?",
    answer:
      "Oui. Selon votre situation, votre formation peut être prise en charge en tout ou partie (financement personnel, entreprise, organismes partenaires) et le paiement en plusieurs fois est possible. Nous vous accompagnons dans le montage de votre dossier.",
  },
];

/** FAQ spécifique financement. */
export const financingFaq: FaqItem[] = [
  {
    question: "Comment savoir si ma formation est finançable ?",
    answer:
      "Le plus simple est d'échanger avec nous : nous analysons votre situation (salarié, indépendant, demandeur d'emploi, entreprise) et identifions les solutions de financement mobilisables pour votre profil.",
  },
  {
    question: "Quel est le délai pour obtenir une prise en charge ?",
    answer:
      "Les délais varient selon l'organisme financeur. Nous vous recommandons d'anticiper plusieurs semaines avant le démarrage souhaité afin de constituer et valider votre dossier sereinement.",
  },
  {
    question: "Puis-je payer en plusieurs fois ?",
    answer:
      "Oui, le paiement en plusieurs fois est possible pour un financement personnel. Les modalités sont définies ensemble lors de votre inscription.",
  },
  {
    question: "Que se passe-t-il si mon financement n'est pas accepté ?",
    answer:
      "Nous étudions avec vous les alternatives possibles : autre dispositif, paiement échelonné ou report sur une session ultérieure. L'objectif est de trouver une solution adaptée à votre projet.",
  },
];

/** FAQ contact. */
export const contactFaq: FaqItem[] = [
  {
    question: "Sous quel délai vais-je être recontacté ?",
    answer:
      "Nous revenons vers vous sous 48 heures ouvrées après réception de votre demande, par e-mail ou par téléphone selon votre préférence.",
  },
  {
    question: "Puis-je venir visiter le studio avant de m'inscrire ?",
    answer:
      "Oui, nous organisons des rendez-vous et des temps d'échange sur place à Paris. Précisez-le dans votre message et nous conviendrons d'un créneau.",
  },
  {
    question: "Proposez-vous des formations sur mesure pour les équipes ?",
    answer:
      "Oui. Pour les entreprises et collectifs, nous construisons des programmes adaptés à vos objectifs, votre matériel et votre niveau. Décrivez-nous votre besoin via le formulaire.",
  },
];
