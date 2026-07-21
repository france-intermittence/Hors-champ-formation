import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Aperture,
  Clapperboard,
  UserCheck,
  Film,
  CalendarClock,
  MapPin,
  Users,
  Clock,
  Accessibility,
} from "lucide-react";
import {
  getFormationBySlug,
  getAllFormationSlugs,
  getRelatedFormations,
} from "@/data/formations";
import FormationCard from "@/components/cards/FormationCard";
import SectionHeading from "@/components/sections/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { buildMetadata, courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import IconList from "@/components/ui/IconList";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import JsonLd from "@/components/ui/JsonLd";
import FormationSummaryCard from "@/components/formation/FormationSummaryCard";
import TestimonialQuote from "@/components/sections/TestimonialQuote";
import CTASection from "@/components/sections/CTASection";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import { formatPrice } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllFormationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const formation = await getFormationBySlug(slug);
  if (!formation) return {};

  return buildMetadata({
    title: `Formation ${formation.title}`,
    description: `${formation.subtitle} ${formation.category} en présentiel à Paris — ${formation.duration}, ${formatPrice(formation.price)}.`,
    path: `/formations/${formation.slug}`,
    keywords: [
      `formation ${formation.title.toLowerCase()}`,
      "formation audiovisuelle Paris",
      "formation vidéo Paris",
      "formation tournage Paris",
    ],
  });
}

/** Piliers de marque (communs à toutes les formations). */
const PILLARS = [
  { icon: Aperture, title: "Maîtrise complète", desc: "Caméra, lumière, son, postproduction" },
  { icon: Clapperboard, title: "Conditions réelles", desc: "Plateau, matériel pro, contraintes" },
  { icon: UserCheck, title: "Encadrement pro", desc: "Formateurs en activité" },
  { icon: Film, title: "Projet final", desc: "Image exploitable, résultat concret" },
];

function DetailBlock({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <SectionLabel index={index}>{label}</SectionLabel>
      <h2 className="mt-4 font-display text-display-md uppercase">{title}</h2>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export default async function FormationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const formation = await getFormationBySlug(slug);
  if (!formation) notFound();

  const testimonial =
    testimonials.find((t) => t.formation === formation.title) ?? testimonials[0];
  const related = await getRelatedFormations(formation.slug, 3);

  const practical = [
    { icon: CalendarClock, label: "Rythme", value: formation.rhythm },
    { icon: MapPin, label: "Lieu", value: formation.place ?? formation.location },
    { icon: Users, label: "Public visé", value: formation.level },
    { icon: Clock, label: "Délai d'accès", value: formation.accessDelay },
  ];

  return (
    <>
      <JsonLd data={courseJsonLd(formation, `/formations/${formation.slug}`)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/formations" },
          { name: formation.title, path: `/formations/${formation.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="border-b border-line bg-canvas">
        <Container className="py-12 lg:py-20">
          <nav aria-label="Fil d'Ariane" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
              <li>
                <Link href="/" className="hover:text-ink">Accueil</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/formations" className="hover:text-ink">Formations</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink">{formation.title}</li>
            </ol>
          </nav>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <SectionLabel>{formation.category}</SectionLabel>
                {formation.tag && (
                  <span className="border border-ink px-3 py-1 font-condensed text-[0.7rem] font-semibold uppercase tracking-wide2 text-ink">
                    {formation.tag}
                  </span>
                )}
              </div>
              <h1 className="mt-5 font-display text-display-lg uppercase">
                {formation.title}
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-ink">
                {formation.subtitle}
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                {formation.intro}
              </p>
              <div className="mt-8 flex items-baseline gap-4">
                <span className="font-display text-5xl uppercase leading-none">
                  {formatPrice(formation.price)}
                </span>
                <span className="font-mono text-sm text-muted">
                  {formation.duration} · {formation.format}
                </span>
              </div>
            </div>
            {formation.image ? (
              <div
                className="film-grain viewfinder relative aspect-[16/10] overflow-hidden border border-line bg-ghost/20"
                role="img"
                aria-label={formation.imageAlt || `${formation.category} — ${formation.location}`}
              >
                <Image
                  src={formation.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover grayscale contrast-110"
                />
                <div className="scan-line" aria-hidden />
                <div aria-hidden className="absolute inset-0 opacity-40">
                  <div className="absolute left-1/3 top-0 h-full w-px bg-canvas/60" />
                  <div className="absolute left-2/3 top-0 h-full w-px bg-canvas/60" />
                  <div className="absolute left-0 top-1/3 h-px w-full bg-canvas/60" />
                  <div className="absolute left-0 top-2/3 h-px w-full bg-canvas/60" />
                </div>
                <span className="absolute bottom-3 left-3 bg-canvas/90 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wide2 text-ink/70">
                  {formation.category} — {formation.location}
                </span>
              </div>
            ) : (
              <ImagePlaceholder
                ratio="video"
                word={formation.title}
                caption={`${formation.category} — ${formation.location}`}
                scan
              />
            )}
          </div>
        </Container>
      </section>

      {/* Bande bénéfices — piliers de marque */}
      <section className="border-b border-line bg-ink-deep text-canvas">
        <Container className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-2">
              <Icon className="h-6 w-6 text-ghost" strokeWidth={1.5} aria-hidden />
              <p className="font-condensed text-base font-semibold uppercase tracking-wide2">
                {title}
              </p>
              <p className="text-sm text-ghost">{desc}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Contenu + carte résumé sticky */}
      <Section bare className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
            <div className="space-y-16 lg:space-y-20">
              <DetailBlock index="01" label="Objectifs" title="Ce que vous saurez faire">
                <IconList items={formation.objectives} columns={2} />
              </DetailBlock>

              <DetailBlock index="02" label="Contenu" title="Le programme détaillé">
                <IconList items={formation.content} columns={2} />
              </DetailBlock>

              <DetailBlock index="03" label="Méthode" title="Notre méthode pédagogique">
                <IconList items={formation.methods} columns={2} />
              </DetailBlock>

              <DetailBlock index="04" label="Évaluation" title="Évaluation & livrables">
                <IconList items={formation.evaluation} />
              </DetailBlock>

              <DetailBlock index="05" label="Infos pratiques" title="Organisation">
                <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
                  {practical.map((row) => (
                    <div key={row.label} className="flex gap-4 bg-paper p-6">
                      <row.icon className="mt-0.5 h-5 w-5 shrink-0 text-muted" strokeWidth={1.5} aria-hidden />
                      <div>
                        <p className="font-condensed text-xs font-semibold uppercase tracking-label text-muted">
                          {row.label}
                        </p>
                        <p className="mt-1 leading-relaxed text-ink">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 flex items-start gap-3 text-sm text-muted">
                  <Accessibility className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                  {formation.accessibility}
                </p>
              </DetailBlock>
            </div>

            {/* Carte résumé sticky (desktop) */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <FormationSummaryCard formation={formation} />
            </aside>
          </div>
        </Container>
      </Section>

      {/* Témoignage */}
      <Section tone="paper" divider>
        <TestimonialQuote testimonial={testimonial} />
      </Section>

      {/* Formations liées — maillage interne */}
      <Section divider>
        <SectionHeading
          label="À découvrir aussi"
          index="·"
          title={<>Formations liées</>}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((f) => (
            <FormationCard key={f.slug} formation={f} />
          ))}
        </div>
      </Section>

      <CTASection
        title="Prêt à passer à l'action ?"
        intro={`Rejoignez la formation ${formation.title} et apprenez par la pratique, en présentiel à Paris.`}
        primary={{ label: "S'inscrire maintenant", href: "/financement" }}
        secondary={{ label: "Poser une question", href: "/contact" }}
        words={["TOURNER", "CRÉER"]}
      />

      <StickyMobileCTA
        label="S'inscrire"
        href="/financement"
        hint={formatPrice(formation.price)}
      />

      {/* Marge basse pour ne pas masquer le contenu derrière le CTA mobile collant */}
      <div className="h-20 lg:hidden" aria-hidden />
    </>
  );
}
