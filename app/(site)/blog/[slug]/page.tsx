import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
} from "@/data/posts";
import { getFormationBySlug } from "@/data/formations";
import {
  buildMetadata,
  articleJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import BlogCard from "@/components/cards/BlogCard";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import JsonLd from "@/components/ui/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    // Titre d'article conservé tel quel (mots-clés en tête), sans suffixe marque
    // pour éviter de dépasser ~60 caractères en SERP.
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    rawTitle: true,
    keywords: [post.category.toLowerCase(), "formation audiovisuelle Paris", "conseils audiovisuel"],
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.slug, 3);
  const recommendedFormation = post.relatedFormationSlug
    ? getFormationBySlug(post.relatedFormationSlug)
    : undefined;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          datePublished: post.date,
          author: post.author,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      {/* En-tête article */}
      <section className="border-b border-line bg-canvas">
        <Container className="py-12 lg:py-16">
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
              <li><Link href="/" className="hover:text-ink">Accueil</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
              <li aria-hidden>/</li>
              <li className="text-ink">{post.category}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted">
            <span className="font-condensed font-semibold uppercase tracking-wide2 text-ink">
              {post.category}
            </span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime} de lecture</span>
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-display-lg uppercase">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">
            {post.intro}
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wide2 text-muted">
            Par {post.author}
          </p>
        </Container>
      </section>

      {/* Image principale */}
      <Container className="py-10 lg:py-12">
        {post.image ? (
          <div
            className="film-grain viewfinder relative aspect-[21/9] overflow-hidden border border-line bg-ghost/20"
            role="img"
            aria-label={`${post.category} — ${post.title}`}
          >
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale contrast-110"
            />
            <div className="scan-line" aria-hidden />
            <div className="absolute inset-0 bg-ink/10" aria-hidden />
            <span className="absolute bottom-3 left-3 bg-canvas/90 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wide2 text-ink/70">
              Hors Champ — {post.category}
            </span>
          </div>
        ) : (
          <ImagePlaceholder ratio="wide" word={post.category} caption="Hors Champ — plateau" scan />
        )}
      </Container>

      {/* Contenu + sommaire sticky */}
      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* Sommaire */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-condensed text-xs font-semibold uppercase tracking-label text-muted">
              Sommaire
            </p>
            <nav aria-label="Sommaire de l'article" className="mt-5">
              <ol className="space-y-3 border-l border-line">
                {post.sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex gap-3 border-l border-transparent -ml-px pl-4 text-sm text-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      <span className="font-mono text-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Corps de l'article */}
          <article className="max-w-2xl">
            {post.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-line pt-10 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-12"
              >
                <h2 className="font-display text-display-md uppercase">
                  <span className="mr-3 font-mono text-base align-middle text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.body.map((paragraph, p) => (
                    <p key={`${section.id}-${p}`} className="text-lg leading-relaxed text-ink/85">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {/* Encadré "Le réflexe Hors Champ" */}
            {post.callout && (
              <aside className="mt-12 border-l-2 border-ink bg-paper p-8">
                <p className="font-condensed text-xs font-semibold uppercase tracking-label text-muted">
                  {post.callout.title}
                </p>
                <p className="mt-4 font-display text-2xl uppercase leading-tight lg:text-3xl">
                  {post.callout.body}
                </p>
              </aside>
            )}

            {/* Formation recommandée */}
            {recommendedFormation && (
              <aside className="mt-12 flex flex-col gap-6 border border-ink bg-ink-deep p-8 text-canvas sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-condensed text-xs font-semibold uppercase tracking-label text-ghost">
                    Formation recommandée
                  </p>
                  <p className="mt-3 font-display text-3xl uppercase leading-none">
                    {recommendedFormation.title}
                  </p>
                  <p className="mt-2 text-sm text-ghost">
                    {recommendedFormation.excerpt}
                  </p>
                </div>
                <Link
                  href={`/formations/${recommendedFormation.slug}`}
                  className="group inline-flex shrink-0 items-center justify-center gap-2 bg-canvas px-6 py-4 font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink transition-colors hover:bg-ghost"
                >
                  Découvrir la formation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </aside>
            )}

            {post.sources && post.sources.length > 0 && (
              <aside className="mt-12 border-t border-line pt-8">
                <p className="font-condensed text-xs font-semibold uppercase tracking-label text-muted">
                  Sources & références
                </p>
                <ul className="mt-5 space-y-4">
                  {post.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 text-sm leading-relaxed text-muted transition-colors hover:text-ink"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-ink" aria-hidden />
                        <span>
                          <span className="block font-condensed text-base font-semibold uppercase tracking-wide2 text-ink">
                            {source.title}
                          </span>
                          <span>{source.publisher}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </article>
        </div>
      </Container>

      {/* Articles connexes */}
      <Section tone="paper" divider>
        <SectionHeading label="À lire aussi" index="·" title={<>Articles connexes</>} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>

      <CTASection
        title="Prêt à passer à l'action ?"
        intro="La lecture, c'est bien. La pratique, c'est mieux. Découvrez nos formations en présentiel à Paris."
        primary={{ label: "Découvrir nos formations", href: "/formations" }}
        words={["LIRE", "FAIRE"]}
      />
    </>
  );
}
