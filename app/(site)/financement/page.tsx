import type { Metadata } from "next";
import { Download, FileText, ExternalLink } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import ProgramTimeline from "@/components/formation/ProgramTimeline";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/ui/Reveal";
import { pad2 } from "@/lib/utils";
import {
  inscriptionSteps,
  financingSolutions,
  usefulDocuments,
} from "@/data/financing";
import { financingFaq } from "@/data/faq";
import { financingLinks } from "@/data/navigation";
import JsonLd from "@/components/ui/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Financement & inscription",
  description:
    "Financer et démarrer votre formation audiovisuelle à Paris : étapes d'inscription, solutions de financement et accompagnement personnalisé.",
  path: "/financement",
});

export default function FinancementPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Financement & inscription", path: "/financement" },
        ])}
      />
      <PageHero
        label="Informations"
        title="Financer et démarrer votre formation"
        subtitle="Des solutions claires, un accompagnement personnalisé et un démarrage simple."
        words={["FINANCER", "DÉMARRER", "AVANCER"]}
      />

      {/* Inscription en 5 étapes */}
      <Section>
        <SectionHeading
          label="Inscription"
          index="·"
          title={<>Votre inscription en 5 étapes</>}
          intro="Un processus simple et accompagné, du choix de la formation au premier jour."
        />
        <div className="mt-12">
          <ProgramTimeline steps={inscriptionSteps} />
        </div>
      </Section>

      {/* Solutions de financement */}
      <Section tone="paper" divider>
        <SectionHeading
          label="Financement"
          index="·"
          title={<>Solutions de financement</>}
          intro="Selon votre profil, plusieurs dispositifs peuvent être mobilisés. Nous vous aidons à identifier le bon."
        />
        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {financingSolutions.map((sol, i) => (
            <Reveal key={sol.title} delay={i * 80} className="flex flex-col bg-paper p-6 lg:p-8">
              <span className="font-mono text-xs tracking-wide2 text-muted">
                {pad2(i + 1)} · {sol.tag}
              </span>
              <h3 className="mt-6 font-condensed text-xl font-semibold uppercase leading-tight tracking-wide2">
                {sol.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {sol.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Organismes & dispositifs officiels (liens externes d'autorité) */}
      <Section divider>
        <SectionHeading
          label="Organismes officiels"
          index="·"
          title={<>Dispositifs & financeurs</>}
          intro="Renseignez-vous directement auprès des organismes officiels qui peuvent financer votre formation."
        />
        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
          {financingLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-paper p-6 transition-colors hover:bg-canvas"
              >
                <span className="flex-1 font-condensed text-lg font-semibold uppercase tracking-wide2">
                  {link.label}
                </span>
                <ExternalLink
                  className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-xs text-muted">
          Liens externes vers les sites officiels — ouverture dans un nouvel onglet.
        </p>
      </Section>

      {/* Documents utiles */}
      <Section divider>
        <SectionHeading
          label="Ressources"
          index="·"
          title={<>Documents utiles</>}
        />
        <ul className="mt-12 border-t border-line">
          {usefulDocuments.map((doc) => (
            <li key={doc.title}>
              <a
                href="/contact"
                className="group flex items-center gap-4 border-b border-line py-5 transition-colors hover:bg-paper"
              >
                <FileText className="h-5 w-5 shrink-0 text-muted" strokeWidth={1.5} aria-hidden />
                <span className="font-condensed text-lg font-semibold uppercase tracking-wide2">
                  {doc.title}
                </span>
                <span className="ml-auto font-mono text-xs text-muted">{doc.meta}</span>
                <Download className="h-5 w-5 shrink-0 transition-transform group-hover:translate-y-0.5" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* Bloc aide */}
      <CTASection
        title="Vous ne savez pas quelle solution choisir ?"
        intro="Échangeons quelques minutes : nous analysons votre situation et identifions ensemble la meilleure option de financement."
        primary={{ label: "Être conseillé", href: "/contact" }}
        words={["CONSEIL", "AIDE"]}
      />

      {/* FAQ financement */}
      <Section divider>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            label="Questions fréquentes"
            index="·"
            title={<>La FAQ du financement</>}
          />
          <FAQAccordion items={financingFaq} />
        </div>
      </Section>
    </>
  );
}
