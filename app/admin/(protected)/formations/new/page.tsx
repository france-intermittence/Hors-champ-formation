import { supabaseAdmin } from "@/lib/supabase-admin";
import FormationForm from "@/components/admin/FormationForm";

export default async function NewFormationPage() {
  const { count } = await supabaseAdmin
    .from("formations")
    .select("slug", { count: "exact", head: true })
    .eq("featured", true);

  return (
    <div>
      <p className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">Formations</p>
      <h1 className="font-display text-3xl uppercase text-ink">Nouvelle formation</h1>
      <div className="mt-8 max-w-3xl">
        <FormationForm mode="create" otherFeaturedCount={count ?? 0} />
      </div>
    </div>
  );
}
