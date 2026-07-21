import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { slugify } from "@/lib/utils";

const BUCKET = "formation-programs";
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const slugRaw = formData.get("slug");

  if (!(file instanceof File) || typeof slugRaw !== "string" || !slugRaw.trim()) {
    return NextResponse.json({ error: "Fichier ou slug manquant." }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Le fichier doit être un PDF." }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Le PDF dépasse la taille maximale (10 Mo)." }, { status: 400 });
  }

  const filename = `${slugify(slugRaw)}-programme-formation.pdf`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabaseAdmin.storage.from(BUCKET).upload(filename, buffer, {
    contentType: "application/pdf",
    upsert: true,
  });

  if (uploadError) {
    return NextResponse.json({ error: "Échec de l'upload." }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(filename);

  return NextResponse.json({ url: data.publicUrl, name: file.name }, { status: 201 });
}
