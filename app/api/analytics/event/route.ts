import { NextResponse, type NextRequest } from "next/server";
import { analyticsEventSchema } from "@/lib/validation/analytics";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  let json: unknown;
  try {
    // sendBeacon envoie un Blob JSON en text/plain; request.json() gère les deux cas.
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = analyticsEventSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 });
  }

  const { type, path, label, referrer, sessionId } = parsed.data;

  const { error } = await supabaseAdmin.from("analytics_events").insert({
    type,
    path,
    label: label || null,
    referrer: referrer || null,
    session_id: sessionId || null,
  });

  if (error) {
    return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
