import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import NewsletterBlock from "@/components/sections/NewsletterBlock";
import CTASection from "@/components/sections/CTASection";
import BlogCard from "@/components/cards/BlogCard";
import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";
import {
  getFeaturedPost,
  getRecentPosts,
  getPopularPosts,
  blogCategories,
  resources,
} from "@/data/posts";
import { pad2 } from "@/lib/utils";
import JsonLd from "@/components/ui/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog : conseils audiovisuels",
  description:
    "Conseils, retours d'expérience et ressources pour progresser en audiovisuel : tournage, image, son, montage, étalonnage et postproduction.",
  path: "/blog",
  keywords: [
    "conseils tournage vidéo",
    "conseils montage vidéo",
    "apprendre l'audiovisuel",
    "blog audiovisuel",
  ],
});

export default async function BlogPage() {
  const [featured, recent, popular] = await Promise.all([
    getFeaturedPost(),
    getRecentPosts(4),
    getPopularPosts(5),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHero
        label="Le blog"
        title="Journal Hors Champ"
        subtitle="Conseils, retours d'expérience et ressources pour progresser en audiovisuel et développer votre regard."
        words={["APPRENDRE", "TRANSMETTRE", "CRÉER", "CADRAGE"]}
      />

      {/* Article à la une */}
      <Section>
        <SectionHeading label="À la une" index="·" title={<>L&apos;article du moment</>} />
        <div className="mt-12">
          <BlogCard post={featured} horizontal />
        </div>
      </Section>

      {/* Catégories */}
      <Section tone="paper" divider>
        <SectionHeading label="Explorer" index="·" title={<>Par catégorie</>} />
        <ul className="mt-10 flex flex-wrap gap-3">
          {blogCategories.map((cat) => (
            <li key={cat}>
              <Link
                href="/blog"
                className="inline-flex border border-line bg-canvas px-5 py-2.5 font-condensed text-sm font-semibold uppercase tracking-wide2 text-muted transition-colors hover:border-ink hover:text-ink"
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Articles récents */}
      <Section divider>
        <SectionHeading label="Récemment" index="·" title={<>Articles récents</>} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recent.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Articles populaires + Ressources */}
      <Section tone="paper" divider>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Populaires */}
          <div>
            <SectionHeading label="Les plus lus" index="·" title={<>Articles populaires</>} />
            <ol className="mt-10 border-t border-line">
              {popular.map((post, i) => (
                <li key={post.slug} className="border-b border-line">
                  <Link href={`/blog/${post.slug}`} className="group flex items-baseline gap-5 py-5">
                    <span className="font-mono text-sm text-muted">{pad2(i + 1)}</span>
                    <span className="flex-1 font-condensed text-lg font-semibold uppercase leading-tight tracking-wide2 transition-colors group-hover:text-muted">
                      {post.title}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          {/* Ressources */}
          <div>
            <SectionHeading label="À télécharger" index="·" title={<>Ressources & guides</>} />
            <ul className="mt-10 border-t border-line">
              {resources.map((res) => (
                <li key={res.title}>
                  <Link href="/contact" className="group flex items-center gap-4 border-b border-line py-5">
                    <Download className="h-5 w-5 shrink-0 text-muted" strokeWidth={1.5} aria-hidden />
                    <span className="flex-1 font-condensed text-lg font-semibold uppercase tracking-wide2">
                      {res.title}
                    </span>
                    <span className="font-mono text-xs text-muted">{res.meta}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Newsletter */}
      <section className="border-t border-line bg-ink-deep py-16 text-canvas lg:py-20">
        <Container>
          <NewsletterBlock onDark />
        </Container>
      </section>

      <CTASection
        title="Prêt à passer à l'action ?"
        intro="Au-delà des articles, c'est sur le terrain que tout se joue. Découvrez nos formations."
        primary={{ label: "Découvrir nos formations", href: "/formations" }}
        words={["LIRE", "FAIRE"]}
      />
    </>
  );
}
