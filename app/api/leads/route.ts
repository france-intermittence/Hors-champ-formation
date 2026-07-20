import { NextResponse, type NextRequest } from "next/server";
import { leadSchema } from "@/lib/validation/lead";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Champs invalides.", issues: parsed.error.issues }, { status: 400 });
  }

  const { website, ...data } = parsed.data;
  if (website) {
    // Honeypot rempli : probable bot, on renvoie un succès silencieux sans rien enregistrer.
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const { error } = await supabaseAdmin.from("leads").insert({
    lastname: data.lastname,
    firstname: data.firstname,
    email: data.email,
    phone: data.phone || null,
    profile: data.profile || null,
    formation_slug: data.formation || null,
    message: data.message,
    consent: data.consent === true || data.consent === "on" || data.consent === "true",
    source_path: request.headers.get("referer") || null,
  });

  if (error) {
    return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
