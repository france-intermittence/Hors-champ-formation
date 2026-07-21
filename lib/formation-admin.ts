import "server-only";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { FormationInput } from "@/lib/validation/formation";

/** Convertit le payload camelCase du formulaire admin vers les colonnes snake_case de la table `formations`. */
export function toDbFormation(input: FormationInput) {
  return {
    slug: input.slug,
    title: input.title,
    category: input.category,
    tag: input.tag || null,
    excerpt: input.excerpt,
    subtitle: input.subtitle,
    intro: input.intro,
    duration: input.duration,
    duration_days: input.durationDays,
    price: input.price ?? null,
    level: input.level,
    format: input.format,
    location: input.location,
    place: input.place || null,
    rhythm: input.rhythm,
    access_delay: input.accessDelay,
    accessibility: input.accessibility,
    featured: input.featured ?? false,
    objectives: input.objectives,
    content: input.content,
    methods: input.methods,
    evaluation: input.evaluation,
    image: input.image || null,
    image_alt: input.imageAlt || null,
    program_pdf_url: input.programPdfUrl || null,
    program_pdf_name: input.programPdfName || null,
  };
}

export const MAX_FEATURED_FORMATIONS = 3;

/** Nombre de formations actuellement mises en avant sur l'accueil, hors `excludeSlug`. */
export async function countFeaturedFormations(excludeSlug?: string) {
  let query = supabaseAdmin.from("formations").select("slug", { count: "exact", head: true }).eq("featured", true);
  if (excludeSlug) query = query.neq("slug", excludeSlug);
  const { count } = await query;
  return count ?? 0;
}
