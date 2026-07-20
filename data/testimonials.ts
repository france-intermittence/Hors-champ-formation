import type { Testimonial } from "@/types";

/**
 * Témoignages — noms fictifs, à remplacer par de vrais retours validés.
 * Pour ajouter une photo : déposez le portrait N&B dans
 * `public/images/testimonials/` puis renseignez `image: "/images/testimonials/xxx.jpg"`.
 * Sans `image`, les initiales s'affichent sur un fond gris (style cohérent).
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Une formation exigeante et passionnante. J'ai appris sur le terrain, avec des formateurs incroyables.",
    name: "Camille Rivet",
    role: "Créatrice de contenu",
    rating: 5,
    formation: "Prêt à tourner",
  },
  {
    quote:
      "J'ai acquis les bases, la technique et surtout confiance en moi. Je réalise enfin des vidéos dont je suis fier.",
    name: "Yanis Berrada",
    role: "Vidéaste indépendant",
    rating: 5,
    formation: "Prêt à tourner + Étalonnage",
  },
  {
    quote:
      "Des petits groupes, du matériel professionnel et des mises en situation réelles. Exactement ce que je cherchais.",
    name: "Sophie Marchand",
    role: "En reconversion",
    rating: 5,
    formation: "Technique plateau",
  },
  {
    quote:
      "On pratique dès le premier jour. Les débriefings personnalisés font toute la différence.",
    name: "Thomas Lefèvre",
    role: "Réalisateur émergent",
    rating: 5,
    formation: "Technique plateau + Tournage",
  },
  {
    quote:
      "La partie son m'a ouvert les yeux. Mes images étaient déjà correctes, mon son est devenu professionnel.",
    name: "Inès Caron",
    role: "Journaliste reporter d'images",
    rating: 5,
    formation: "Technique plateau",
  },
  {
    quote:
      "Le formateur étalonnage est en activité, il partage des cas réels. On repart avec des réflexes concrets.",
    name: "Marc Aubry",
    role: "Monteur",
    rating: 5,
    formation: "Postproduction + Étalonnage",
  },
];

export const featuredTestimonial: Testimonial = {
  quote:
    "Une formation exigeante et passionnante. J'ai acquis les bases, la technique et surtout confiance en moi.",
  name: "Camille Rivet",
  role: "Créatrice de contenu — promotion 2025",
  rating: 5,
};
