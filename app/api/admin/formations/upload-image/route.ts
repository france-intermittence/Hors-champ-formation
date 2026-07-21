import { NextResponse, type NextRequest } from "next/server";
import sharp from "sharp";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { slugify } from "@/lib/utils";

const BUCKET = "formation-images";
const MAX_WIDTH = 1600;

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

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Le fichier doit être une image." }, { status: 400 });
  }

  const filename = `${slugify(slugRaw)}.webp`;
  const inputBuffer = Buffer.from(await file.arrayBuffer());

  let webpBuffer: Buffer;
  try {
    webpBuffer = await sharp(inputBuffer)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: "Impossible de traiter l'image." }, { status: 400 });
  }

  const { error: uploadError } = await supabaseAdmin.storage.from(BUCKET).upload(filename, webpBuffer, {
    contentType: "image/webp",
    upsert: true,
  });

  if (uploadError) {
    return NextResponse.json({ error: "Échec de l'upload." }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(filename);

  return NextResponse.json({ url: data.publicUrl, filename }, { status: 201 });
}
