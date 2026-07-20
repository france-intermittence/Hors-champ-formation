import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { postSchema } from "@/lib/validation/post";
import { toDbPost, enforceSingleFeatured, ensureFeaturedInvariant } from "@/lib/blog-posts";

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

  const parsed = postSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Champs invalides.", issues: parsed.error.issues }, { status: 400 });
  }

  const { data: existing } = await supabaseAdmin
    .from("posts")
    .select("slug")
    .eq("slug", parsed.data.slug)
    .maybeSingle();
  if (existing) {
    return NextResponse.json({ error: "Ce slug existe déjà." }, { status: 409 });
  }

  const { error } = await supabaseAdmin.from("posts").insert(toDbPost(parsed.data));
  if (error) {
    return NextResponse.json({ error: "Erreur lors de la création." }, { status: 500 });
  }

  if (parsed.data.featured) {
    await enforceSingleFeatured(parsed.data.slug);
  }
  await ensureFeaturedInvariant();

  return NextResponse.json({ ok: true, slug: parsed.data.slug }, { status: 201 });
}
