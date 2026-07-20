"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-2 border border-line px-4 py-2.5 font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted transition-colors hover:border-ink hover:text-ink"
    >
      <LogOut className="h-3.5 w-3.5" aria-hidden />
      Déconnexion
    </button>
  );
}
