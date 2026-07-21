"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Newspaper, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoutButton from "@/components/admin/LogoutButton";

interface AdminSidebarProps {
  newLeadsCount: number;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/formations", label: "Formations", icon: GraduationCap },
];

export default function AdminSidebar({ newLeadsCount }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-line bg-paper">
      <div className="border-b border-line px-6 py-6">
        <p className="font-display text-2xl uppercase leading-none text-ink">Hors Champ</p>
        <p className="mt-1 font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">
          Administration
        </p>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navItems.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between gap-3 px-4 py-3 font-condensed text-sm font-semibold uppercase tracking-wide2 transition-colors",
                active ? "bg-ink text-canvas" : "text-muted hover:bg-canvas hover:text-ink"
              )}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" aria-hidden />
                {item.label}
              </span>
              {item.href === "/admin/leads" && newLeadsCount > 0 && (
                <span
                  className={cn(
                    "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[0.65rem]",
                    active ? "bg-canvas text-ink" : "bg-ink text-canvas"
                  )}
                >
                  {newLeadsCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line px-4 py-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
