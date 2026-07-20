import "server-only";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { PostInput } from "@/lib/validation/post";

/** Convertit le payload camelCase du formulaire admin vers les colonnes snake_case de la table `posts`. */
export function toDbPost(input: PostInput) {
  return {
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    category: input.category,
    date: input.date,
    reading_time: input.readingTime,
    author: input.author,
    image: input.image || null,
    featured: input.featured ?? false,
    related_formation_slug: input.relatedFormationSlug || null,
    intro: input.intro,
    sections: input.sections,
    callout: input.callout || null,
    sources: input.sources || null,
  };
}

/** Si `featured` est mis à true sur `slug`, retire le flag sur tous les autres articles. */
export async function enforceSingleFeatured(slug: string) {
  await supabaseAdmin.from("posts").update({ featured: false }).neq("slug", slug);
}

/** Garantit qu'au moins un article reste "à la une" (promeut le plus récent si besoin). */
export async function ensureFeaturedInvariant() {
  const { count } = await supabaseAdmin
    .from("posts")
    .select("slug", { count: "exact", head: true })
    .eq("featured", true);

  if (count && count > 0) return;

  const { data: latest } = await supabaseAdmin
    .from("posts")
    .select("slug")
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latest) {
    await supabaseAdmin.from("posts").update({ featured: true }).eq("slug", latest.slug);
  }
}
