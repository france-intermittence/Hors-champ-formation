import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import { site } from "@/data/navigation";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Hors Champ Formation : données collectées, finalités, durée de conservation et droits des utilisateurs.",
  path: "/politique-confidentialite",
});

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          {
            name: "Politique de confidentialité",
            path: "/politique-confidentialite",
          },
        ])}
      />
      <PageHero
        label="Données personnelles"
        title="Politique de confidentialité"
        subtitle="Cette page explique comment les données transmises via le site sont utilisées et protégées."
        words={["DONNÉES", "CONTACT", "RGPD"]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            label="Confidentialité"
            index="·"
            title={<>Traitement des données</>}
          />
          <div className="space-y-8 text-sm leading-relaxed text-muted">
            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Responsable du traitement
              </h2>
              <p className="mt-3">
                Le responsable du traitement est MAL BARRÉ — {site.name},
                joignable à{" "}
                <a href={`mailto:${site.email}`} className="text-ink underline">
                  {site.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Données collectées
              </h2>
              <p className="mt-3">
                Les données collectées peuvent inclure les informations que vous
                transmettez volontairement via le formulaire de contact :
                identité, coordonnées, message, projet de formation et toute
                information utile au traitement de votre demande.
              </p>
            </section>

            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Finalités
              </h2>
              <p className="mt-3">
                Ces données sont utilisées pour répondre à vos demandes,
                préparer un échange, vous orienter vers une formation adaptée,
                assurer le suivi administratif et respecter les obligations
                légales applicables.
              </p>
            </section>

            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Conservation
              </h2>
              <p className="mt-3">
                Les données liées aux demandes de contact sont conservées
                pendant la durée nécessaire au traitement de la demande, puis
                archivées ou supprimées selon les obligations légales et les
                besoins de suivi de la relation.
              </p>
            </section>

            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Destinataires
              </h2>
              <p className="mt-3">
                Les données sont destinées à Hors Champ Formation et aux
                prestataires techniques strictement nécessaires au fonctionnement
                du site et au traitement des demandes.
              </p>
            </section>

            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Vos droits
              </h2>
              <p className="mt-3">
                Conformément à la réglementation applicable, vous pouvez
                demander l&apos;accès, la rectification, l&apos;effacement ou la limitation
                du traitement de vos données. Pour exercer vos droits, contactez{" "}
                <a href={`mailto:${site.email}`} className="text-ink underline">
                  {site.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
