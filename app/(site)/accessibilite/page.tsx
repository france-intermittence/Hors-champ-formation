import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import { site } from "@/data/navigation";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Accessibilité",
  description:
    "Informations d'accessibilité du site Hors Champ Formation et contact pour signaler une difficulté d'accès.",
  path: "/accessibilite",
});

export default function AccessibilitePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Accessibilité", path: "/accessibilite" },
        ])}
      />
      <PageHero
        label="Accessibilité"
        title="Accessibilité du site"
        subtitle="Hors Champ Formation souhaite rendre son site utilisable par le plus grand nombre."
        words={["ACCÈS", "WEB", "USAGE"]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            label="Engagement"
            index="·"
            title={<>Une expérience accessible</>}
          />
          <div className="space-y-8 text-sm leading-relaxed text-muted">
            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Démarche
              </h2>
              <p className="mt-3">
                Le site est conçu pour proposer une navigation claire, des
                contrastes lisibles, une structure de titres cohérente et des
                liens explicites. Ces bonnes pratiques contribuent à améliorer
                l&apos;accès aux contenus.
              </p>
            </section>

            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                État de conformité
              </h2>
              <p className="mt-3">
                Aucun audit RGAA complet n&apos;a été publié à ce jour. La conformité
                du site sera précisée après évaluation formelle.
              </p>
            </section>

            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Signaler une difficulté
              </h2>
              <p className="mt-3">
                Si vous rencontrez un problème d&apos;accès à un contenu ou à une
                fonctionnalité, vous pouvez nous écrire à{" "}
                <a href={`mailto:${site.email}`} className="text-ink underline">
                  {site.email}
                </a>{" "}
                ou nous appeler au{" "}
                <a href={`tel:${site.phone}`} className="text-ink underline">
                  {site.phoneDisplay}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide2 text-ink">
                Amélioration continue
              </h2>
              <p className="mt-3">
                Les retours des utilisateurs sont pris en compte afin
                d&apos;améliorer progressivement l&apos;expérience de navigation et
                l&apos;accès aux informations de formation.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
