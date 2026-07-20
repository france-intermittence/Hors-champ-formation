import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { postSchema } from "@/lib/validation/post";
import { toDbPost, enforceSingleFeatured, ensureFeaturedInvariant } from "@/lib/blog-posts";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const { slug: currentSlug } = await params;

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

  if (parsed.data.slug === currentSlug) {
    // Slug inchangé : simple mise à jour en place.
    const { error } = await supabaseAdmin.from("posts").update(toDbPost(parsed.data)).eq("slug", currentSlug);
    if (error) {
      return NextResponse.json({ error: "Erreur lors de la mise à jour." }, { status: 500 });
    }
  } else {
    // Slug modifié (clé primaire) : on insère la nouvelle ligne avant de supprimer
    // l'ancienne, pour ne jamais perdre l'article si une des deux étapes échoue.
    const { data: clash } = await supabaseAdmin
      .from("posts")
      .select("slug")
      .eq("slug", parsed.data.slug)
      .maybeSingle();
    if (clash) {
      return NextResponse.json({ error: "Ce slug existe déjà." }, { status: 409 });
    }

    const { error: insertError } = await supabaseAdmin.from("posts").insert(toDbPost(parsed.data));
    if (insertError) {
      return NextResponse.json({ error: "Erreur lors de la mise à jour." }, { status: 500 });
    }

    const { error: deleteError } = await supabaseAdmin.from("posts").delete().eq("slug", currentSlug);
    if (deleteError) {
      return NextResponse.json({ error: "Erreur lors de la mise à jour (ancien slug conservé)." }, { status: 500 });
    }
  }

  if (parsed.data.featured) {
    await enforceSingleFeatured(parsed.data.slug);
  }
  await ensureFeaturedInvariant();

  return NextResponse.json({ ok: true, slug: parsed.data.slug });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const { slug } = await params;

  const { error } = await supabaseAdmin.from("posts").delete().eq("slug", slug);
  if (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression." }, { status: 500 });
  }

  await ensureFeaturedInvariant();

  return NextResponse.json({ ok: true });
}
