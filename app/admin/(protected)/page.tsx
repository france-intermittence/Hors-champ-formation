import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { formatDate } from "@/lib/utils";
import StatTile from "@/components/admin/StatTile";
import VisitsChart, { type VisitsChartPoint } from "@/components/admin/VisitsChart";
import BarList, { type BarListItem } from "@/components/admin/BarList";

export const dynamic = "force-dynamic";

function startOfDaysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d;
}

function topN(entries: (string | null)[], n: number): BarListItem[] {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    if (!entry) continue;
    counts.set(entry, (counts.get(entry) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([label, count]) => ({ label, count }));
}

export default async function AdminDashboardPage() {
  const since = startOfDaysAgo(29);

  const [pageViewsRes, clicksRes, totalLeadsRes, newLeadsRes, totalPostsRes, recentLeadsRes] = await Promise.all([
    supabaseAdmin
      .from("analytics_events")
      .select("path, created_at")
      .eq("type", "page_view")
      .gte("created_at", since.toISOString()),
    supabaseAdmin.from("analytics_events").select("label").eq("type", "click").gte("created_at", since.toISOString()),
    supabaseAdmin.from("leads").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("leads").select("id", { count: "exact", head: true }).gte("created_at", since.toISOString()),
    supabaseAdmin.from("posts").select("slug", { count: "exact", head: true }),
    supabaseAdmin
      .from("leads")
      .select("id, created_at, firstname, lastname, email, status")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const pageViews = pageViewsRes.data ?? [];
  const clicks = clicksRes.data ?? [];

  const days: VisitsChartPoint[] = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(since);
    d.setDate(d.getDate() + i);
    days.push({ date: d.toISOString().slice(0, 10), count: 0 });
  }
  const dayIndex = new Map(days.map((d, i) => [d.date, i]));
  for (const pv of pageViews) {
    const idx = dayIndex.get(pv.created_at.slice(0, 10));
    if (idx != null) days[idx].count += 1;
  }

  const topPages = topN(
    pageViews.map((p) => p.path),
    8
  );
  const topClicks = topN(
    clicks.map((c) => c.label),
    8
  );

  const recentLeads = recentLeadsRes.data ?? [];

  return (
    <div>
      <p className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">Dashboard</p>
      <h1 className="font-display text-3xl uppercase text-ink">Vue d&apos;ensemble</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile index={1} label="Visites (30 derniers jours)" value={String(pageViews.length)} />
        <StatTile index={2} label="Nouveaux leads (30 jours)" value={String(newLeadsRes.count ?? 0)} />
        <StatTile index={3} label="Leads (total)" value={String(totalLeadsRes.count ?? 0)} />
        <StatTile index={4} label="Articles publiés" value={String(totalPostsRes.count ?? 0)} />
      </div>

      <div className="mt-10">
        <h2 className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">
          Visites — 30 derniers jours
        </h2>
        <div className="mt-4">
          <VisitsChart data={days} />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">
            Pages les plus consultées
          </h2>
          <div className="mt-4">
            <BarList items={topPages} emptyLabel="Aucune donnée de navigation pour l'instant." />
          </div>
        </div>
        <div>
          <h2 className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">
            Clics les plus fréquents (CTA, contact…)
          </h2>
          <div className="mt-4">
            <BarList items={topClicks} emptyLabel="Aucun clic suivi pour l'instant." />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">
            Derniers leads
          </h2>
          <Link href="/admin/leads" className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-ink underline underline-offset-4">
            Voir tout
          </Link>
        </div>
        <div className="mt-4 border border-line bg-paper">
          {recentLeads.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted">Aucun lead pour l&apos;instant.</p>
          ) : (
            recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5 last:border-b-0">
                <div>
                  <p className="text-sm text-ink">
                    {lead.firstname} {lead.lastname}
                  </p>
                  <p className="text-xs text-muted">{lead.email}</p>
                </div>
                <span className="font-mono text-xs text-muted">{formatDate(lead.created_at.slice(0, 10))}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
