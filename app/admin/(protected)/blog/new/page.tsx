import BlogPostForm from "@/components/admin/BlogPostForm";
import { getAllFormations } from "@/data/formations";

export default async function NewBlogPostPage() {
  const formations = await getAllFormations();

  return (
    <div>
      <p className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">Blog</p>
      <h1 className="font-display text-3xl uppercase text-ink">Nouvel article</h1>
      <div className="mt-8 max-w-3xl">
        <BlogPostForm mode="create" formations={formations} />
      </div>
    </div>
  );
}
