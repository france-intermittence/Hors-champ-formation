import type { Formation, FormationCategory } from "@/types";
import { supabase } from "@/lib/supabase";

/**
 * Catalogue des formations — reflète l'offre réelle de Hors Champ Formation
 * (3 blocs pédagogiques, 7 formats). Prix, durées et contenus repris du site.
 *
 * PRIX : champ `price` (en euros). Sans `price` → affichage « Nous consulter ».
 */

const COMMON = {
  format: "Présentiel",
  location: "Paris",
  level: "Tous niveaux" as const,
  rhythm: "Samedis — sessions mensuelles",
  accessDelay: "Inscription possible jusqu'à 15 jours avant le début de la session.",
  accessibility:
    "Formation accessible aux personnes en situation de handicap. Nous contacter.",
};

export const formations: Formation[] = [
  /* ───────────────── Bloc 1 — Formations principales ───────────────── */
  {
    ...COMMON,
    slug: "pret-a-tourner",
    title: "Prêt à tourner",
    category: "Formation principale",
    image: "/formations/pret-a-tourner.jpg",
    tag: "Format recommandé",
    featured: true,
    price: 2990,
    duration: "64 h",
    durationDays: 9,
    excerpt:
      "Formation complète — tournage + postproduction (sans étalonnage).",
    subtitle:
      "Du tournage à la postproduction : construisez un workflow complet et maîtrisé.",
    intro:
      "La formation de référence de Hors Champ. Vous traversez toute la chaîne, du plateau au montage, en conditions réelles et avec du matériel professionnel.",
    objectives: [
      "Maîtriser la prise de vue, le son et la lumière.",
      "Préparer et réaliser un tournage avec méthode.",
      "Monter et finaliser un projet exploitable.",
      "Comprendre l'impact de chaque choix technique.",
    ],
    content: [
      "Réglages caméra, cadrage et composition.",
      "Lumière naturelle et artificielle.",
      "Prise de son sur le terrain.",
      "Montage image et son sur logiciel professionnel.",
      "Export et formats de livraison.",
    ],
    methods: [
      "70 % de pratique en conditions réelles.",
      "Studio professionnel équipé.",
      "Groupe réduit, formateurs en activité.",
      "Tournage encadré et projet filmé.",
    ],
    evaluation: [
      "Projet filmé monté en fin de formation.",
      "Évaluation continue sur grille de compétences.",
      "Attestation de formation remise.",
    ],
  },
  {
    ...COMMON,
    slug: "pret-a-tourner-etalonnage",
    title: "Prêt à tourner + Étalonnage",
    category: "Formation principale",
    image: "/formations/pret-a-tourner-etalonnage.jpg",
    tag: "Format avancé",
    featured: true,
    price: 3690,
    duration: "80 h",
    durationDays: 11,
    excerpt: "Inclut le module étalonnage — groupe encore plus réduit.",
    subtitle:
      "La formation complète, prolongée par l'étalonnage colorimétrique.",
    intro:
      "Tout le programme « Prêt à tourner », complété par l'étalonnage pour donner à vos images leur identité visuelle, dans un groupe encore plus réduit.",
    objectives: [
      "Maîtriser la chaîne tournage + postproduction.",
      "Réaliser un étalonnage colorimétrique cohérent.",
      "Construire une identité visuelle.",
      "Livrer un projet abouti, de la captation à la couleur.",
    ],
    content: [
      "Tournage : image, son, lumière.",
      "Montage image et son.",
      "Étalonnage colorimétrique (DaVinci Resolve).",
      "Correction primaire et secondaire.",
      "Export et livraison multi-formats.",
    ],
    methods: [
      "70 % de pratique, conditions réelles.",
      "Groupe encore plus réduit.",
      "Stations d'étalonnage calibrées.",
      "Formateurs en activité.",
    ],
    evaluation: [
      "Projet filmé monté et étalonné.",
      "Évaluation continue sur grille de compétences.",
      "Attestation de formation remise.",
    ],
  },

  /* ───────────────── Bloc 2 — Parcours expert ───────────────── */
  {
    ...COMMON,
    slug: "pret-a-tourner-postproduction",
    title: "Prêt à tourner + 24h Postproduction",
    category: "Parcours expert",
    image: "/formations/pret-a-tourner-postproduction.jpg",
    featured: true,
    price: 4990,
    duration: "104 h",
    durationDays: 13,
    place: "Paris — studio professionnel, salle de postproduction, extérieurs",
    excerpt: "Parcours expert sur 4 mois.",
    subtitle:
      "Le parcours le plus complet : maîtrise professionnelle de bout en bout.",
    intro:
      "Un parcours expert sur 4 mois pour devenir totalement autonome, développer une identité artistique et produire un projet audiovisuel professionnel abouti.",
    objectives: [
      "Maîtrise professionnelle complète.",
      "Développer une identité artistique propre.",
      "Produire un projet audiovisuel professionnel abouti.",
    ],
    content: [
      "Ensemble des blocs en profondeur.",
      "Direction artistique et approche scénaristique.",
      "Court-métrage abouti.",
      "Présentation publique devant jury.",
    ],
    methods: [
      "Parcours complet 4 mois.",
      "Accompagnement individualisé.",
      "Matériel haut de gamme.",
      "Mise en réseau professionnelle.",
    ],
    evaluation: [
      "Projet professionnel présenté devant jury.",
      "Évaluations continues sur grille de compétences.",
      "Attestation de formation remise.",
    ],
  },

  /* ───────────────── Bloc 3 — Modules d'entrée ───────────────── */
  {
    ...COMMON,
    slug: "technique-plateau",
    title: "Technique plateau",
    category: "Module d'entrée",
    image: "/formations/technique-plateau.jpg",
    price: 1290,
    duration: "3 jours",
    durationDays: 3,
    place: "Paris — studio professionnel (adresse communiquée à l'inscription)",
    excerpt: "Les bases du plateau : cadrage, lumière et prise de son directe.",
    subtitle:
      "Acquérez les fondamentaux techniques du plateau en studio professionnel.",
    intro:
      "Le module d'entrée pour poser des bases solides : cadrage, lumière et son, par la pratique, en groupe réduit de 8 participants maximum.",
    objectives: [
      "Maîtriser cadrage, axes et mouvements de caméra.",
      "Utiliser la lumière comme outil narratif.",
      "Acquérir les bases de la prise de son directe.",
    ],
    content: [
      "Cadrage, composition, focales, profondeur de champ.",
      "Lumière naturelle et artificielle.",
      "Son : microphones, directivité, niveaux.",
      "Exercices pratiques guidés en studio.",
    ],
    methods: [
      "Apprentissage par la pratique en conditions réelles.",
      "Studio professionnel équipé.",
      "Groupe réduit — 8 participants maximum.",
      "Formateurs en activité.",
    ],
    evaluation: [
      "Exercices pratiques évalués tout au long.",
      "Court exercice filmé en fin de session.",
      "Grille de compétences communiquée avant la formation.",
    ],
  },
  {
    ...COMMON,
    slug: "technique-plateau-tournage",
    title: "Technique plateau + Tournage",
    category: "Module d'entrée",
    image: "/formations/technique-plateau-tournage.jpg",
    price: 1890,
    duration: "4 jours",
    durationDays: 4,
    excerpt: "Approfondissez lumière et cadrage sur un projet filmé en équipe.",
    subtitle:
      "Passez de la technique au projet : tournez en équipe en conditions réelles.",
    intro:
      "Un module pour approfondir le cadrage et la lumière, développer une esthétique personnelle et travailler en équipe sur un projet filmé complet et encadré.",
    objectives: [
      "Approfondir les techniques de lumière et de cadrage.",
      "Développer une esthétique visuelle personnelle.",
      "Travailler en équipe sur un projet filmé complet.",
    ],
    content: [
      "Cadrage avancé, direction de la photographie.",
      "Lumière en extérieur et en conditions difficiles.",
      "Son avancé : mixage, report sonore.",
      "Projet filmé collectif encadré.",
    ],
    methods: [
      "Apprentissage par la pratique.",
      "Mises en situation professionnelles.",
      "Groupe réduit, formateurs en activité.",
    ],
    evaluation: [
      "Évaluations pratiques continues.",
      "Projet filmé collectif évalué.",
      "Bilan individuel de compétences.",
    ],
  },
  {
    ...COMMON,
    slug: "postproduction",
    title: "Postproduction",
    category: "Module d'entrée",
    image: "/formations/postproduction.jpg",
    price: 1290,
    duration: "24 h",
    durationDays: 3,
    place: "Paris — salle de postproduction professionnelle",
    excerpt: "Les fondamentaux du montage image et son, jusqu'à l'export.",
    subtitle:
      "Montez, mixez et livrez un projet finalisé sur logiciel professionnel.",
    intro:
      "Le module d'entrée en postproduction : du dérushage à l'export, apprenez à construire un montage propre et à livrer un projet exploitable.",
    objectives: [
      "Maîtriser les fondamentaux du montage vidéo.",
      "Comprendre et appliquer le montage son.",
      "Livrer un projet finalisé exportable.",
    ],
    content: [
      "Dérushage, organisation et sélection.",
      "Montage image sur logiciel professionnel.",
      "Mixage et montage son.",
      "Export et formats de livraison.",
    ],
    methods: [
      "Travail sur rushes réels.",
      "Poste individuel par participant.",
      "Formateurs monteurs en activité.",
    ],
    evaluation: [
      "Court-métrage monté en fin de formation.",
      "Évaluation des compétences techniques sur grille.",
    ],
  },
  {
    ...COMMON,
    slug: "postproduction-etalonnage",
    title: "Postproduction + Étalonnage",
    category: "Module d'entrée",
    image: "/formations/postproduction-etalonnage.jpg",
    price: 1890,
    duration: "40 h",
    durationDays: 5,
    place: "Paris — salle de postproduction professionnelle",
    excerpt: "Montage narratif avancé et étalonnage sous DaVinci Resolve.",
    subtitle:
      "Un pipeline de postproduction complet, du montage narratif à la couleur.",
    intro:
      "Le module avancé de postproduction : montage narratif, étalonnage colorimétrique sous DaVinci Resolve et mixage multipiste, pour une livraison multi-formats.",
    objectives: [
      "Montage narratif avancé.",
      "Étalonnage colorimétrique (DaVinci Resolve).",
      "Mixage multipiste.",
      "Pipeline de postproduction complet.",
    ],
    content: [
      "Montage avancé et rythme narratif.",
      "DaVinci Resolve : correction primaire et secondaire.",
      "Son : mixage multipiste, ambiances.",
      "Livraison multi-formats.",
    ],
    methods: [
      "Postes individuels, logiciels professionnels.",
      "Projets réels, groupe réduit.",
      "Formateurs en activité dans l'industrie.",
    ],
    evaluation: [
      "Projet de postproduction complet livré.",
      "Grille d'évaluation technique et narrative.",
    ],
  },
];

/** Blocs (types de formation) pour la barre de filtres, dans l'ordre d'affichage. */
export const formationCategories: FormationCategory[] = [
  "Formation principale",
  "Parcours expert",
  "Module d'entrée",
];

// Map database row back to camelCase Formation type
export function mapDbFormation(row: any): Formation {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    tag: row.tag || undefined,
    excerpt: row.excerpt,
    subtitle: row.subtitle,
    intro: row.intro,
    duration: row.duration,
    durationDays: row.duration_days,
    price: row.price ?? undefined,
    level: row.level,
    format: row.format,
    location: row.location,
    place: row.place || undefined,
    rhythm: row.rhythm,
    accessDelay: row.access_delay,
    accessibility: row.accessibility,
    featured: row.featured,
    objectives: row.objectives,
    content: row.content,
    methods: row.methods,
    evaluation: row.evaluation,
    image: row.image || undefined,
    imageAlt: row.image_alt || undefined,
    programPdfUrl: row.program_pdf_url || undefined,
    programPdfName: row.program_pdf_name || undefined,
  };
}

export async function getAllFormations(): Promise<Formation[]> {
  try {
    const { data, error } = await supabase.from("formations").select("*").order("category").order("slug");
    if (error) throw error;
    if (data && data.length > 0) return data.map(mapDbFormation);
  } catch (err) {
    console.warn(`Supabase getAllFormations failed: ${(err as Error).message}. Falling back to local data.`);
  }
  return formations;
}

export async function getFormationBySlug(slug: string): Promise<Formation | undefined> {
  try {
    const { data, error } = await supabase.from("formations").select("*").eq("slug", slug).maybeSingle();
    if (error) throw error;
    if (data) return mapDbFormation(data);
  } catch (err) {
    console.warn(`Supabase getFormationBySlug failed: ${(err as Error).message}. Falling back to local data.`);
  }
  return formations.find((f) => f.slug === slug);
}

export async function getFeaturedFormations(): Promise<Formation[]> {
  try {
    const { data, error } = await supabase.from("formations").select("*").eq("featured", true);
    if (error) throw error;
    if (data && data.length > 0) return data.map(mapDbFormation);
  } catch (err) {
    console.warn(`Supabase getFeaturedFormations failed: ${(err as Error).message}. Falling back to local data.`);
  }
  return formations.filter((f) => f.featured);
}

export async function getAllFormationSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from("formations").select("slug");
    if (error) throw error;
    if (data && data.length > 0) return data.map((row) => row.slug);
  } catch (err) {
    console.warn(`Supabase getAllFormationSlugs failed: ${(err as Error).message}. Falling back to local data.`);
  }
  return formations.map((f) => f.slug);
}

/** Suggère d'autres formations (hors slug courant). */
export async function getRelatedFormations(slug: string, count = 3): Promise<Formation[]> {
  try {
    const { data, error } = await supabase.from("formations").select("*").neq("slug", slug).limit(count);
    if (error) throw error;
    if (data && data.length > 0) return data.map(mapDbFormation);
  } catch (err) {
    console.warn(`Supabase getRelatedFormations failed: ${(err as Error).message}. Falling back to local data.`);
  }
  return formations.filter((f) => f.slug !== slug).slice(0, count);
}
