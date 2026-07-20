import type { TeamMember } from "@/types";

/** Formateurs — profils fictifs modifiables. Tous en activité dans le métier. */
export const team: TeamMember[] = [
  {
    name: "Élodie Vasseur",
    role: "Cheffe opératrice",
    specialty: "Cadrage & lumière",
    image: "/methode/elodie-vasseur.jpg",
  },
  {
    name: "Karim Belhadj",
    role: "Ingénieur du son",
    specialty: "Prise de son & mixage",
    image: "/methode/karim-belhadj.jpg",
  },
  {
    name: "Julien Mercier",
    role: "Réalisateur",
    specialty: "Direction & tournage",
    image: "/methode/julien-mercier.jpg",
  },
  {
    name: "Nadia Roussel",
    role: "Monteuse-étalonneuse",
    specialty: "Montage & étalonnage",
    image: "/methode/nadia-roussel.jpg",
  },
];
