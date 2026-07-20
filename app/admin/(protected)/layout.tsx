import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const authenticated = await verifyAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!authenticated) {
    redirect("/admin/login");
  }

  const { count } = await supabaseAdmin
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");

  return (
    <div className="flex min-h-screen bg-canvas">
      <AdminSidebar newLeadsCount={count ?? 0} />
      <main className="flex-1 overflow-x-hidden px-8 py-8 lg:px-12 lg:py-10">{children}</main>
    </div>
  );
}
