import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

interface RouteParams {
  params: Promise<{ id: string }>;
}

const statusSchema = z.object({ status: z.enum(["new", "contacted", "archived"]) });

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const { id } = await params;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = statusSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("leads").update({ status: parsed.data.status }).eq("id", id);
  if (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const { id } = await params;

  const { error } = await supabaseAdmin.from("leads").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
