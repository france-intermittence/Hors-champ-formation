import Link from "next/link";
import { Plus } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-admin";
import FormationTable from "@/components/admin/FormationTable";

export const dynamic = "force-dynamic";

export default async function AdminFormationsPage() {
  const { data: formations } = await supabaseAdmin
    .from("formations")
    .select("slug, title, category, price, featured, program_pdf_url")
    .order("category")
    .order("title");

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">Formations</p>
          <h1 className="font-display text-3xl uppercase text-ink">Catalogue</h1>
        </div>
        <Link
          href="/admin/formations/new"
          className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-condensed text-sm font-semibold uppercase tracking-wide2 text-canvas transition-colors hover:bg-ink-deep"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Nouvelle formation
        </Link>
      </div>

      <div className="mt-8">
        <FormationTable formations={formations ?? []} />
      </div>
    </div>
  );
}
