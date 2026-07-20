import type { Metadata } from "next";
import Image from "next/image";
import { Hammer, Layers, MessagesSquare, Target } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import StepTimeline from "@/components/sections/StepTimeline";
import TestimonialQuote from "@/components/sections/TestimonialQuote";
import CTASection from "@/components/sections/CTASection";
import IconFeature from "@/components/cards/IconFeature";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Chips from "@/components/ui/Chips";
import Reveal from "@/components/ui/Reveal";
import { team } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import JsonLd from "@/components/ui/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import type { Step } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Notre pédagogie par la pratique",
  description:
    "La méthode Hors Champ : apprendre par la pratique, progresser par l'expérience. Découvrez notre approche terrain, nos principes pédagogiques et nos formateurs en activité.",
  path: "/methode",
  keywords: [
    "pédagogie formation audiovisuelle",
    "formation audiovisuelle pratique",
    "apprendre à filmer",
    "formation vidéaste Paris",
  ],
});

const principles = [
  { icon: Hammer, title: "Apprendre en faisant", description: "La théorie au service de la pratique, jamais l'inverse. On manipule, on tourne, on recommence." },
  { icon: Layers, title: "Progresser par étapes", description: "Une montée en compétence structurée, où chaque acquis prépare le suivant." },
  { icon: MessagesSquare, title: "Échanger & partager", description: "Des petits groupes pour favoriser l'entraide, le regard des autres et les débriefings." },
  { icon: Target, title: "Créer avec intention", description: "Au-delà de la technique, développer un regard et des choix créatifs assumés." },
];

const progression: Step[] = [
  { title: "Découvrir", description: "Comprendre les fondamentaux et le vocabulaire du métier." },
  { title: "Maîtriser", description: "Acquérir les gestes techniques par la répétition encadrée." },
  { title: "Expérimenter", description: "Tester, se tromper et ajuster en conditions réelles." },
  { title: "Créer & réaliser", description: "Mener un projet abouti, de l'intention à la livraison." },
];

const studioEquipment = [
  "Caméras",
  "Jeu d'objectifs",
  "Éclairages LED",
  "Matériel son",
  "Suites de montage",
  "Stations d'étalonnage",
  "Trépieds & accessoires",
  "Espace de tournage",
];

export default function MethodePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Méthode", path: "/methode" },
        ])}
      />
      <PageHero
        label="À propos"
        title="Notre pédagogie"
        subtitle="Apprendre par la pratique, progresser par l'expérience."
        words={["APPRENDRE", "EXPÉRIMENTER", "CRÉER"]}
      />

      {/* 4 principes */}
      <Section>
        <SectionHeading
          label="Nos principes"
          index="·"
          title={<>Quatre principes pédagogiques</>}
          intro="Une approche terrain, concrète et humaine, pensée pour vous rendre autonome."
        />
        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 80}
              className="bg-paper p-6 lg:p-8"
            >
              <IconFeature icon={p.icon} title={p.title} description={p.description} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Progression */}
      <Section tone="paper" divider>
        <SectionHeading
          label="Progression"
          index="·"
          title={<>Une progression pédagogique claire</>}
        />
        <div className="mt-12">
          <StepTimeline steps={progression} columns={4} />
        </div>
      </Section>

      {/* Formateurs */}
      <Section divider>
        <SectionHeading
          label="L'équipe"
          index="·"
          title={<>Nos formateurs</>}
          intro="Des professionnels en activité, qui transmettent un métier qu'ils pratiquent au quotidien."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 80}>
              <figure className="group">
                {member.image ? (
                  <div className="relative aspect-[3/4] overflow-hidden border border-line bg-ghost/20">
                    <Image
                      src={member.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale contrast-110 transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-ink/5" aria-hidden />
                  </div>
                ) : (
                  <ImagePlaceholder ratio="portrait" word={member.name.split(" ")[0]} grid={false} />
                )}
                <figcaption className="mt-4">
                  <p className="font-condensed text-lg font-semibold uppercase tracking-wide2">
                    {member.name}
                  </p>
                  <p className="text-sm text-muted">{member.role}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{member.specialty}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Studio & matériel */}
      <Section tone="paper" divider>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div
            className="film-grain viewfinder relative aspect-[16/10] overflow-hidden border border-line bg-ghost/20"
            role="img"
            aria-label="Notre studio — Paris"
          >
            <Image
              src="/methode/studio-pratique.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover grayscale contrast-110"
            />
            <div className="scan-line" aria-hidden />
            <div className="absolute inset-0 bg-ink/10" aria-hidden />
            <span className="absolute bottom-3 left-3 bg-canvas/90 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wide2 text-ink/70">
              Notre studio — Paris
            </span>
          </div>
          <div>
            <SectionHeading
              label="Le lieu"
              index="·"
              title={<>Notre studio & notre matériel</>}
              intro="Un espace dédié à la pratique et un parc de matériel professionnel, mis à votre disposition pendant toute la formation."
            />
            <div className="mt-8">
              <Chips items={studioEquipment} />
            </div>
          </div>
        </div>
      </Section>

      {/* Témoignage */}
      <Section divider>
        <TestimonialQuote testimonial={testimonials[1]} />
      </Section>

      <CTASection
        title="Apprenez le métier par la pratique"
        intro="Découvrez nos formations audiovisuelles en présentiel à Paris."
        primary={{ label: "Découvrir les formations", href: "/formations" }}
        secondary={{ label: "Nous contacter", href: "/contact" }}
        words={["TERRAIN", "PRATIQUE"]}
      />
    </>
  );
}
