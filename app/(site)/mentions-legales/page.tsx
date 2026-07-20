import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import { site } from "@/data/navigation";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site Hors Champ Formation : éditeur, coordonnées, propriété intellectuelle et responsabilité.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Mentions légales", path: "/mentions-legales" },
        ])}
      />
      <PageHero
        label="Informations légales"
        title="Mentions légales"
        subtitle="Les informations relatives à l'édition, à la publication et à l'utilisation du site."
        words={["LÉGAL", "SITE", "CONTACT"]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            label="Éditeur"
            index="·"
            title={<>Identification du site</>}
          />
          <div className="space-y-8 text-sm leading-relaxed text-muted">
            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Éditeur du site
              </h2>
              <p className="mt-3">
                Le site {site.url} est édité par MAL BARRÉ — {site.name}.
              </p>
              <p className="mt-3">
                Adresse : {site.address.street}, {site.address.zip}{" "}
                {site.address.city}, {site.address.country}
              </p>
              <p className="mt-3">
                Email :{" "}
                <a href={`mailto:${site.email}`} className="text-ink underline">
                  {site.email}
                </a>
                <br />
                Téléphone :{" "}
                <a href={`tel:${site.phone}`} className="text-ink underline">
                  {site.phoneDisplay}
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Direction de la publication
              </h2>
              <p className="mt-3">
                La direction de la publication est assurée par MAL BARRÉ.
              </p>
            </section>

            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Hébergement
              </h2>
              <p className="mt-3">
                Le site est hébergé par le prestataire technique retenu pour sa
                mise en ligne. Les informations d&apos;hébergement peuvent être
                communiquées sur demande à l&apos;adresse de contact du site.
              </p>
            </section>

            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Propriété intellectuelle
              </h2>
              <p className="mt-3">
                L&apos;ensemble des contenus présents sur ce site, notamment les
                textes, visuels, éléments graphiques, logos et structures de
                pages, est protégé par le droit d&apos;auteur. Toute reproduction,
                représentation, modification ou diffusion sans autorisation
                préalable est interdite.
              </p>
            </section>

            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Responsabilité
              </h2>
              <p className="mt-3">
                Hors Champ Formation s&apos;efforce de fournir des informations
                exactes et à jour. Les contenus du site sont fournis à titre
                informatif et peuvent être modifiés à tout moment.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
