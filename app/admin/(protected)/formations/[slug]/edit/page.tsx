import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { mapDbFormation } from "@/data/formations";
import FormationForm from "@/components/admin/FormationForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditFormationPage({ params }: PageProps) {
  const { slug } = await params;

  const [{ data }, { count }] = await Promise.all([
    supabaseAdmin.from("formations").select("*").eq("slug", slug).maybeSingle(),
    supabaseAdmin.from("formations").select("slug", { count: "exact", head: true }).eq("featured", true).neq("slug", slug),
  ]);

  if (!data) notFound();

  return (
    <div>
      <p className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">Formations</p>
      <h1 className="font-display text-3xl uppercase text-ink">Modifier la formation</h1>
      <div className="mt-8 max-w-3xl">
        <FormationForm mode="edit" initialFormation={mapDbFormation(data)} otherFeaturedCount={count ?? 0} />
      </div>
    </div>
  );
}
