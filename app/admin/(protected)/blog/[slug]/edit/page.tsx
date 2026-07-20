import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { mapDbPost } from "@/data/posts";
import BlogPostForm from "@/components/admin/BlogPostForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { data } = await supabaseAdmin.from("posts").select("*").eq("slug", slug).maybeSingle();

  if (!data) notFound();

  return (
    <div>
      <p className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">Blog</p>
      <h1 className="font-display text-3xl uppercase text-ink">Modifier l&apos;article</h1>
      <div className="mt-8 max-w-3xl">
        <BlogPostForm mode="edit" initialPost={mapDbPost(data)} />
      </div>
    </div>
  );
}
