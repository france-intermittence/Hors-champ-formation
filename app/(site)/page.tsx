import HeroTypographic from "@/components/sections/HeroTypographic";
import ReassuranceBar from "@/components/sections/ReassuranceBar";
import SkillsRow from "@/components/sections/SkillsRow";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import StepTimeline from "@/components/sections/StepTimeline";
import StatsBlock from "@/components/sections/StatsBlock";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import TrustpilotWidget from "@/components/sections/TrustpilotWidget";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTASection from "@/components/sections/CTASection";
import FormationCard from "@/components/cards/FormationCard";
import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";
import { getFeaturedFormations } from "@/data/formations";
import { testimonials } from "@/data/testimonials";
import { trustpilot, trustpilotEnabled } from "@/data/trustpilot";
import { generalFaq } from "@/data/faq";
import { buildMetadata } from "@/lib/seo";
import type { Step } from "@/types";

export const metadata = buildMetadata({
  title: "Hors Champ Formation — Formation audiovisuelle à Paris",
  description:
    "Organisme de formation audiovisuelle à Paris. Formations en présentiel orientées pratique : tournage, cadrage, lumière, prise de son, montage, mixage et étalonnage.",
  path: "/",
  rawTitle: true,
  keywords: [
    "formation audiovisuelle Paris",
    "formation vidéo Paris",
    "formation tournage",
    "formation cadrage",
    "formation lumière",
    "formation prise de son",
    "formation montage vidéo",
    "formation postproduction",
    "formation étalonnage",
    "apprendre à filmer",
    "formation vidéaste",
    "formation réalisateur vidéo",
  ],
});

const methodSteps: Step[] = [
  { title: "Apprendre", description: "Des bases claires et des apports théoriques courts, directement utiles." },
  { title: "Pratiquer", description: "On manipule le matériel et on tourne dès le premier jour." },
  { title: "Produire", description: "Des projets concrets, réalisés en conditions réelles." },
  { title: "Progresser", description: "Des débriefings personnalisés pour ancrer chaque acquis." },
];

export default function HomePage() {
  const featured = getFeaturedFormations();

  return (
    <>
      <HeroTypographic />
      <ReassuranceBar />
      <SkillsRow />

      {/* Formations phares */}
      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            label="Formations phares"
            index="·"
            title={<>Des parcours concrets et professionnalisants.</>}
          />
          <CTAButton href="/formations" variant="secondary">
            Toutes les formations
          </CTAButton>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featured.map((formation, i) => (
            <Reveal key={formation.slug} delay={i * 90}>
              <FormationCard formation={formation} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Méthode */}
      <Section tone="paper" divider>
        <SectionHeading
          label="Notre méthode"
          index="·"
          title={<>Apprendre. Pratiquer. Progresser.</>}
          intro="Une pédagogie de terrain en quatre temps, pensée pour vous rendre autonome."
        />
        <div className="mt-12">
          <StepTimeline steps={methodSteps} columns={4} />
        </div>
      </Section>

      {/* Chiffres */}
      <Section divider>
        <SectionHeading
          label="En chiffres"
          index="·"
          title={<>L&apos;exigence du terrain</>}
        />
        <div className="mt-12">
          <StatsBlock />
        </div>
        <p className="mt-4 font-mono text-xs text-muted">
          Chiffres indicatifs — à confirmer avant publication.
        </p>
      </Section>

      {/* Témoignages — vrais avis Trustpilot si configuré, sinon carrousel interne */}
      <Section tone="paper" divider>
        {trustpilotEnabled ? (
          <TrustpilotWidget templateId={trustpilot.templates.carousel} height="350px" />
        ) : (
          <TestimonialCarousel testimonials={testimonials} />
        )}
        <div className="mt-12 text-center">
          <CTAButton href="/temoignages" variant="secondary">
            Lire tous les témoignages
          </CTAButton>
        </div>
      </Section>

      {/* FAQ courte */}
      <Section divider>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            label="Questions fréquentes"
            index="·"
            title={<>Tout savoir avant de commencer</>}
            intro="Vous hésitez encore ? Voici les réponses aux questions les plus posées."
          />
          <FAQAccordion items={generalFaq} />
        </div>
      </Section>

      <CTASection
        title="Prêt à passer à l'action ?"
        intro="Rejoignez une formation audiovisuelle en présentiel à Paris et apprenez le métier par la pratique."
        primary={{ label: "Voir les formations", href: "/formations" }}
        secondary={{ label: "Nous contacter", href: "/contact" }}
        words={["APPRENDRE", "CRÉER"]}
      />
    </>
  );
}
