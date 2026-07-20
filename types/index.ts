// Types partagés du site Hors Champ Formation

/** Les 3 blocs pédagogiques du catalogue (= « types » de formation). */
export type FormationCategory =
  | "Formation principale"
  | "Parcours expert"
  | "Module d'entrée";

export type FormationLevel =
  | "Débutant"
  | "Débutant à intermédiaire"
  | "Intermédiaire"
  | "Tous niveaux";

export interface ProgramStep {
  title: string;
  description: string;
}

export interface Formation {
  slug: string;
  title: string;
  /** Bloc pédagogique (type de formation). */
  category: FormationCategory;
  /** Badge optionnel, ex. "Format recommandé" / "Format avancé". */
  tag?: string;
  /** Description courte affichée sur les cartes */
  excerpt: string;
  /** Sous-titre du hero de la page détail */
  subtitle: string;
  /** Paragraphe d'introduction du hero */
  intro: string;
  /** Libellé de durée affiché, ex. "64 h" ou "3 jours" */
  duration: string;
  /** Durée approximative en jours, utilisée pour le filtre durée */
  durationDays: number;
  /** Prix en euros. Laisser vide (undefined) → affichage « Nous consulter ». */
  price?: number;
  /** Public visé */
  level: FormationLevel;
  format: string;
  /** Localité courte (cartes, résumé, SEO), ex. "Paris" */
  location: string;
  /** Lieu détaillé affiché dans les infos pratiques (optionnel). */
  place?: string;
  /** Rythme, ex. "Samedis — sessions mensuelles" */
  rhythm: string;
  /** Délai d'accès */
  accessDelay: string;
  /** Mention accessibilité */
  accessibility: string;
  /** Mise en avant sur la page d'accueil (formations phares) */
  featured?: boolean;
  objectives: string[];
  /** Contenu pédagogique */
  content: string[];
  /** Méthodes pédagogiques */
  methods: string[];
  evaluation: string[];
  /** Chemin d'image optionnel (sinon fond gris typographique) */
  image?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Note de 1 à 5 */
  rating: number;
  formation?: string;
  /** Photo de l'apprenant (N&B). Sinon, initiales sur fond gris. */
  image?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  image?: string;
}

export interface PostSection {
  id: string;
  heading: string;
  body: string[];
}

export interface PostSource {
  title: string;
  publisher: string;
  url: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** Date ISO (AAAA-MM-JJ) */
  date: string;
  readingTime: string;
  author: string;
  image?: string;
  featured?: boolean;
  intro: string;
  sections: PostSection[];
  callout?: {
    title: string;
    body: string;
  };
  relatedFormationSlug?: string;
  sources?: PostSource[];
}

export interface FinancingSolution {
  title: string;
  description: string;
  tag: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}
