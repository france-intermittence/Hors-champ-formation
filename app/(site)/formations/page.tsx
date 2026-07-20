import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wallet } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import StepTimeline from "@/components/sections/StepTimeline";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTASection from "@/components/sections/CTASection";
import FormationsFilterGrid from "@/components/sections/FormationsFilterGrid";
import CTAButton from "@/components/ui/CTAButton";
import Container from "@/components/layout/Container";
import { formations } from "@/data/formations";
import { generalFaq } from "@/data/faq";
import JsonLd from "@/components/ui/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import type { Step } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Formations audiovisuelles à Paris",
  description:
    "Toutes nos formations audiovisuelles en présentiel à Paris : cadrage, lumière, prise de son, tournage, montage, mixage, étalonnage et parcours complets.",
  path: "/formations",
  keywords: [
    "formation audiovisuelle Paris",
    "formation tournage Paris",
    "formation cadrage",
    "formation lumière",
    "formation prise de son",
    "formation montage vidéo",
    "formation étalonnage",
    "formation postproduction",
  ],
});

const recommendedPaths = [
  {
    title: "Réalisateur",
    description:
      "Maîtrisez l'image, le son et la direction pour porter vos projets de bout en bout.",
    href: "/formations/pret-a-tourner-postproduction",
    formations: "Parcours expert · 104 h · 4 990 €",
  },
  {
    title: "Vidéaste indépendant",
    description:
      "Devenez autonome sur toute la chaîne, de la captation à la livraison.",
    href: "/formations/pret-a-tourner",
    formations: "Prêt à tourner · 64 h · 2 990 €",
  },
  {
    title: "Débutant motivé",
    description:
      "Posez des bases solides avec un module d'entrée court et concret.",
    href: "/formations/technique-plateau",
    formations: "Technique plateau · 3 jours · 1 290 €",
  },
];

const chooseSteps: Step[] = [
  { title: "Définissez votre objectif", description: "Projet personnel, reconversion, montée en compétence : tout part de là." },
  { title: "Choisissez la bonne durée", description: "Du module court au parcours complet, selon votre disponibilité." },
  { title: "Vérifiez les prérequis", description: "La plupart de nos formations sont accessibles aux débutants motivés." },
  { title: "Parlez-nous de votre projet", description: "Un échange suffit pour valider le parcours le plus adapté." },
];

const financingOptions = ["CPF", "France Travail", "AFDAS", "OPCO", "Financement personnel"];

export default function FormationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Formations", path: "/formations" },
        ])}
      />
      <PageHero
        label="Catalogue"
        title="Formations audiovisuelles à Paris"
        subtitle="Des formations concrètes et professionnalisantes pour maîtriser chaque étape de la création audiovisuelle, de la prise de vue à la postproduction."
        words={["FORMATION", "SON", "CADRAGE", "ÉCLAIRAGE", "TOURNAGE"]}
      />

      {/* Filtres + grille */}
      <Section>
        <FormationsFilterGrid formations={formations} />
      </Section>

      {/* Parcours recommandés */}
      <Section tone="paper" divider>
        <SectionHeading
          label="Parcours recommandés"
          index="·"
          title={<>Quel profil êtes-vous ?</>}
          intro="Trois parcours types pour vous orienter selon votre objectif professionnel."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {recommendedPaths.map((path) => (
            <Link
              key={path.title}
              href={path.href}
              className="group flex flex-col border border-line bg-canvas p-8 transition-colors hover:border-ink"
            >
              <h3 className="font-display text-4xl uppercase leading-none">
                {path.title}
              </h3>
              <p className="mt-4 flex-1 leading-relaxed text-muted">
                {path.description}
              </p>
              <p className="mt-6 font-mono text-xs text-muted">
                {path.formations}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-condensed text-sm font-semibold uppercase tracking-wide2">
                Voir le parcours
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Comment choisir */}
      <Section divider>
        <SectionHeading
          label="Méthode"
          index="·"
          title={<>Comment choisir sa formation ?</>}
        />
        <div className="mt-12">
          <StepTimeline steps={chooseSteps} columns={4} />
        </div>
      </Section>

      {/* Financer votre formation */}
      <section className="border-t border-line bg-ink-deep py-16 text-canvas lg:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-3 font-condensed text-xs font-semibold uppercase tracking-label text-ghost">
                <Wallet className="h-4 w-4" aria-hidden />
                Financement
              </p>
              <h2 className="mt-5 font-display text-display-md uppercase">
                Financer votre formation
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ghost">
                Selon votre situation, plusieurs dispositifs peuvent prendre en
                charge tout ou partie de votre formation. Nous vous accompagnons
                dans le montage de votre dossier.
              </p>
              <div className="mt-8">
                <CTAButton href="/financement" onDark>
                  En savoir plus
                </CTAButton>
              </div>
            </div>
            <ul className="flex flex-wrap gap-3 lg:justify-end">
              {financingOptions.map((opt) => (
                <li
                  key={opt}
                  className="border border-canvas/30 px-5 py-3 font-condensed text-sm font-semibold uppercase tracking-wide2 text-canvas"
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <Section divider>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            label="Questions fréquentes"
            index="·"
            title={<>Vous hésitez encore ?</>}
          />
          <FAQAccordion items={generalFaq} />
        </div>
      </Section>

      <CTASection
        title="Prêt à passer à l'action ?"
        intro="Échangeons sur votre projet et trouvons ensemble la formation qui vous correspond."
        primary={{ label: "Nous contacter", href: "/contact" }}
        secondary={{ label: "S'inscrire", href: "/financement" }}
      />
    </>
  );
}
