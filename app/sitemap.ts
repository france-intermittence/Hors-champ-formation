import type { MetadataRoute } from "next";
import { site } from "@/data/navigation";
import { getAllFormationSlugs } from "@/data/formations";
import { getAllPostSlugs } from "@/data/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/formations",
    "/methode",
    "/financement",
    "/temoignages",
    "/contact",
    "/blog",
    "/mentions-legales",
    "/politique-confidentialite",
    "/accessibilite",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const formationSlugs = await getAllFormationSlugs();
  const formationRoutes = formationSlugs.map((slug) => ({
    url: `${site.url}/formations/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postSlugs = await getAllPostSlugs();
  const postRoutes = postSlugs.map((slug) => ({
    url: `${site.url}/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...formationRoutes, ...postRoutes];
}
