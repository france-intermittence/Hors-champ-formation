"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface LeadRow {
  id: string;
  created_at: string;
  lastname: string;
  firstname: string;
  email: string;
  phone: string | null;
  profile: string | null;
  formation_slug: string | null;
  message: string;
  status: "new" | "contacted" | "archived";
}

const statusLabels: Record<LeadRow["status"], string> = {
  new: "Nouveau",
  contacted: "Contacté",
  archived: "Archivé",
};

const tabs: { key: "all" | LeadRow["status"]; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "new", label: "Nouveau" },
  { key: "contacted", label: "Contacté" },
  { key: "archived", label: "Archivé" },
];

function toCsv(rows: LeadRow[]): string {
  const headers = ["Date", "Nom", "Prénom", "Email", "Téléphone", "Profil", "Formation", "Message", "Statut"];
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [
      formatDate(r.created_at.slice(0, 10)),
      r.lastname,
      r.firstname,
      r.email,
      r.phone || "",
      r.profile || "",
      r.formation_slug || "",
      r.message,
      statusLabels[r.status],
    ]
      .map((v) => escape(String(v)))
      .join(",")
  );
  return [headers.map(escape).join(","), ...lines].join("\n");
}

export default function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | LeadRow["status"]>("all");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const counts = useMemo(() => {
    return leads.reduce(
      (acc, lead) => {
        acc[lead.status] += 1;
        return acc;
      },
      { new: 0, contacted: 0, archived: 0 } as Record<LeadRow["status"], number>
    );
  }, [leads]);

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  const updateStatus = async (id: string, status: LeadRow["status"]) => {
    setPendingId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) router.refresh();
    } finally {
      setPendingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Supprimer définitivement ce lead ?")) return;
    setPendingId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
    } finally {
      setPendingId(null);
    }
  };

  const exportCsv = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={`border px-4 py-2 font-condensed text-xs font-semibold uppercase tracking-wide2 transition-colors ${
                filter === tab.key ? "border-ink bg-ink text-canvas" : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {tab.label}
              {tab.key !== "all" && ` (${counts[tab.key]})`}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="inline-flex items-center gap-2 border border-line px-4 py-2.5 font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted transition-colors hover:border-ink hover:text-ink"
        >
          <Download className="h-3.5 w-3.5" aria-hidden />
          Exporter CSV
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 border border-line bg-paper p-8 text-center text-muted">Aucun lead dans cette catégorie.</p>
      ) : (
        <div className="mt-6 overflow-x-auto border border-line bg-paper">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-line font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Profil / Formation</th>
                <th className="px-5 py-3">Message</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Statut</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-line align-top last:border-b-0">
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink">
                      {lead.firstname} {lead.lastname}
                    </p>
                    <a href={`mailto:${lead.email}`} className="block text-muted hover:text-ink">
                      {lead.email}
                    </a>
                    {lead.phone && <p className="text-muted">{lead.phone}</p>}
                  </td>
                  <td className="px-5 py-4 text-muted">
                    {lead.profile && <p>{lead.profile}</p>}
                    {lead.formation_slug && <p className="font-mono text-xs">{lead.formation_slug}</p>}
                  </td>
                  <td className="max-w-xs px-5 py-4 text-muted">
                    <p className="line-clamp-3">{lead.message}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-muted">{formatDate(lead.created_at.slice(0, 10))}</td>
                  <td className="px-5 py-4">
                    <select
                      value={lead.status}
                      disabled={pendingId === lead.id}
                      onChange={(e) => updateStatus(lead.id, e.target.value as LeadRow["status"])}
                      className="border border-line bg-canvas px-2 py-1.5 text-xs outline-none focus:border-ink"
                    >
                      {(Object.keys(statusLabels) as LeadRow["status"][]).map((s) => (
                        <option key={s} value={s}>
                          {statusLabels[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(lead.id)}
                      disabled={pendingId === lead.id}
                      className="inline-flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-red-600 hover:text-red-600 disabled:opacity-50"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
