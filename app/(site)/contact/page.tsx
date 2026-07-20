import type { Metadata } from "next";
import { MapPin, Mail, Phone, CalendarClock } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import StepTimeline from "@/components/sections/StepTimeline";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTASection from "@/components/sections/CTASection";
import ContactForm from "@/components/forms/ContactForm";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import LazyContactMap from "@/components/ui/LazyContactMap";
import { site } from "@/data/navigation";
import { contactFaq } from "@/data/faq";
import JsonLd from "@/components/ui/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import type { Step } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Contact — échangeons sur votre projet",
  description:
    "Contactez Hors Champ Formation à Paris : une question, un besoin de formation audiovisuelle ou un projet d'équipe ? Nous vous accompagnons.",
  path: "/contact",
});

const process: Step[] = [
  { title: "Prise de contact", description: "Vous nous écrivez, nous accusons réception sous 48 h ouvrées." },
  { title: "Échange & analyse", description: "Nous comprenons votre projet, votre niveau et vos objectifs." },
  { title: "Proposition sur mesure", description: "Nous vous recommandons le parcours et le financement adaptés." },
  { title: "Validation", description: "Nous confirmons votre place et constituons votre dossier." },
  { title: "Formation", description: "Vous rejoignez le studio à Paris et entrez dans la pratique." },
];

export default function ContactPage() {
  const coordinates = [
    {
      icon: MapPin,
      label: "Adresse",
      value: `${site.address.street}, ${site.address.zip} ${site.address.city}`,
    },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "Téléphone", value: site.phoneDisplay, href: `tel:${site.phone}` },
    { icon: CalendarClock, label: "Rendez-vous", value: "Sur place ou en visio, du lundi au vendredi" },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        label="Contact"
        title="Échangeons sur votre projet"
        subtitle="Vous avez une question, un besoin de formation ou un projet d'équipe ? Nous sommes là pour vous accompagner."
        words={["PARLONS", "PROJET", "CONTACT"]}
      />

      {/* Coordonnées + formulaire */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              label="Coordonnées"
              index="·"
              title={<>Nous joindre</>}
            />
            <ul className="mt-10 space-y-8">
              {coordinates.map((item) => (
                <li key={item.label} className="flex gap-4">
                  <item.icon className="mt-1 h-5 w-5 shrink-0 text-ink" strokeWidth={1.5} aria-hidden />
                  <div>
                    <p className="font-condensed text-xs font-semibold uppercase tracking-label text-muted">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block text-lg text-ink transition-colors hover:text-muted"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-lg text-ink">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div id="formulaire" className="scroll-mt-24 border border-line bg-paper p-6 lg:p-10">
            <SectionHeading
              label="Formulaire"
              index="·"
              title={<>Votre demande</>}
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      {/* Conseil personnalisé */}
      <CTASection
        title="Besoin d'un conseil personnalisé ?"
        intro="Réservez un créneau d'échange : nous répondons à vos questions et vous orientons vers la bonne formation."
        primary={{ label: "Prendre rendez-vous", href: `mailto:${site.email}`, dataTrack: "contact-cta-email" }}
        words={["CONSEIL", "RDV"]}
      />

      {/* Processus après contact */}
      <Section divider>
        <SectionHeading
          label="La suite"
          index="·"
          title={<>Le processus après votre contact</>}
          intro="Un parcours simple, lisible et accompagné jusqu'au premier jour de formation."
        />
        <div className="mt-12">
          <StepTimeline steps={process} columns={5} />
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="paper" divider>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            label="Questions fréquentes"
            index="·"
            title={<>Avant de nous écrire</>}
          />
          <FAQAccordion items={contactFaq} />
        </div>
      </Section>

      <LazyContactMap />

      <StickyMobileCTA label="Aller au formulaire" href="#formulaire" hint="Réponse 48 h" />
      <div className="h-20 lg:hidden" aria-hidden />
    </>
  );
}
