import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { formationSchema } from "@/lib/validation/formation";
import { toDbFormation, countFeaturedFormations, MAX_FEATURED_FORMATIONS } from "@/lib/formation-admin";

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = formationSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Champs invalides.", issues: parsed.error.issues }, { status: 400 });
  }

  const { data: existing } = await supabaseAdmin
    .from("formations")
    .select("slug")
    .eq("slug", parsed.data.slug)
    .maybeSingle();
  if (existing) {
    return NextResponse.json({ error: "Ce slug existe déjà." }, { status: 409 });
  }

  if (parsed.data.featured) {
    const count = await countFeaturedFormations();
    if (count >= MAX_FEATURED_FORMATIONS) {
      return NextResponse.json(
        {
          error: `Vous avez déjà ${MAX_FEATURED_FORMATIONS} formations mises en avant sur l'accueil. Désélectionnez-en une avant d'en ajouter une nouvelle.`,
        },
        { status: 409 }
      );
    }
  }

  const { error } = await supabaseAdmin.from("formations").insert(toDbFormation(parsed.data));
  if (error) {
    return NextResponse.json({ error: "Erreur lors de la création." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, slug: parsed.data.slug }, { status: 201 });
}
