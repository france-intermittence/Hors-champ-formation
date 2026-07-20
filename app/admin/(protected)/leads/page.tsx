import { supabaseAdmin } from "@/lib/supabase-admin";
import LeadsTable from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const { data: leads } = await supabaseAdmin
    .from("leads")
    .select("id, created_at, lastname, firstname, email, phone, profile, formation_slug, message, status")
    .order("created_at", { ascending: false });

  return (
    <div>
      <p className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">Leads</p>
      <h1 className="font-display text-3xl uppercase text-ink">Demandes de contact</h1>
      <div className="mt-8">
        <LeadsTable leads={leads ?? []} />
      </div>
    </div>
  );
}
