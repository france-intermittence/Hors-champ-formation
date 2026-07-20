import type { Metadata } from "next";
import { Play } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import StatsBlock from "@/components/sections/StatsBlock";
import TestimonialQuote from "@/components/sections/TestimonialQuote";
import TestimonialCard from "@/components/cards/TestimonialCard";
import TrustpilotWidget from "@/components/sections/TrustpilotWidget";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/ui/Reveal";
import { testimonials, featuredTestimonial } from "@/data/testimonials";
import { trustpilot, trustpilotEnabled } from "@/data/trustpilot";
import JsonLd from "@/components/ui/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Témoignages — ils sont passés par nos champs",
  description:
    "Les retours d'expérience des apprenants de Hors Champ Formation : créateurs, vidéastes et profils en reconversion formés à Paris par la pratique.",
  path: "/temoignages",
});

const beforeAfter = {
  before: ["Je filmais sans méthode.", "Mon son était inégal.", "Je doutais de mes choix."],
  after: [
    "Je réalise des vidéos professionnelles.",
    "Je maîtrise ma chaîne technique.",
    "Je sais où je vais, avant même de tourner.",
  ],
};

const projects = ["Court-métrage", "Clip", "Documentaire", "Film institutionnel", "Web-série"];

export default function TemoignagesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Témoignages", path: "/temoignages" },
        ])}
      />
      <PageHero
        label="Témoignages"
        title="Ils sont passés par nos champs"
        subtitle="Découvrez les retours d'expérience de nos apprenants."
        words={["MERCI", "BRAVO", "RETOUR"]}
      />

      {/* Témoignage principal */}
      <Section>
        <TestimonialQuote testimonial={featuredTestimonial} />
      </Section>

      {/* Chiffres */}
      <Section tone="paper" divider>
        <SectionHeading
          label="En chiffres"
          index="·"
          title={<>La preuve par les résultats</>}
        />
        <div className="mt-12">
          <StatsBlock />
        </div>
        <p className="mt-4 font-mono text-xs text-muted">
          Chiffres indicatifs — à confirmer avant publication.
        </p>
      </Section>

      {/* Grille témoignages */}
      <Section divider>
        <SectionHeading
          label={trustpilotEnabled ? "Avis vérifiés Trustpilot" : "Leurs mots"}
          index="·"
          title={<>Ce qu&apos;ils en disent</>}
        />
        {trustpilotEnabled ? (
          <div className="mt-12">
            <TrustpilotWidget templateId={trustpilot.templates.grid} height="500px" />
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {testimonials.slice(0, 4).map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {/* Avant / Après */}
      <Section tone="paper" divider>
        <SectionHeading
          label="Transformation"
          index="·"
          title={<>Avant / Après</>}
        />
        <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-2">
          <div className="bg-canvas p-8 lg:p-12">
            <p className="font-condensed text-xs font-semibold uppercase tracking-label text-muted">
              Avant
            </p>
            <ul className="mt-6 space-y-4">
              {beforeAfter.before.map((item) => (
                <li key={item} className="font-condensed text-2xl uppercase leading-tight text-muted lg:text-3xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink-deep p-8 text-canvas lg:p-12">
            <p className="font-condensed text-xs font-semibold uppercase tracking-label text-ghost">
              Après
            </p>
            <ul className="mt-6 space-y-4">
              {beforeAfter.after.map((item) => (
                <li key={item} className="font-display text-3xl uppercase leading-[0.95] lg:text-4xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Projets d'apprenants */}
      <Section divider>
        <SectionHeading
          label="Réalisations"
          index="·"
          title={<>Projets d&apos;apprenants</>}
          intro="Un aperçu de ce que nos apprenants réalisent pendant et après leur formation."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <button
              key={project}
              type="button"
              className="viewfinder group relative flex aspect-video items-center justify-center overflow-hidden border border-line bg-ghost/20 text-left"
              aria-label={`Lire le projet : ${project}`}
            >
              <span className="absolute left-4 top-4 font-mono text-xs uppercase tracking-wide2 text-ink/70">
                {String(i + 1).padStart(2, "0")} / {project}
              </span>
              <span className="flex h-14 w-14 items-center justify-center border border-ink bg-canvas transition-transform group-hover:scale-110">
                <Play className="h-5 w-5 translate-x-0.5 fill-ink text-ink" aria-hidden />
              </span>
            </button>
          ))}
        </div>
      </Section>

      <CTASection
        title="Et si c'était votre tour ?"
        intro="Rejoignez celles et ceux qui sont passés de l'envie à la maîtrise."
        primary={{ label: "Découvrir nos formations", href: "/formations" }}
        secondary={{ label: "Nous contacter", href: "/contact" }}
        words={["VOTRE", "TOUR"]}
      />
    </>
  );
}
