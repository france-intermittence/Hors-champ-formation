import Link from "next/link";
import { Plus } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-admin";
import BlogTable from "@/components/admin/BlogTable";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const { data: posts } = await supabaseAdmin
    .from("posts")
    .select("slug, title, category, date, featured")
    .order("date", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">Blog</p>
          <h1 className="font-display text-3xl uppercase text-ink">Articles</h1>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-condensed text-sm font-semibold uppercase tracking-wide2 text-canvas transition-colors hover:bg-ink-deep"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Nouvel article
        </Link>
      </div>

      <div className="mt-8">
        <BlogTable posts={posts ?? []} />
      </div>
    </div>
  );
}
