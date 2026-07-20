import Container from "@/components/layout/Container";
import CTAButton from "@/components/ui/CTAButton";
import SectionLabel from "@/components/ui/SectionLabel";
import TypographicBackground from "@/components/ui/TypographicBackground";

const heroWords = [
  "APPRENDRE",
  "CRÉER",
  "TRANSMETTRE",
  "CADRAGE",
  "SON",
  "ÉCLAIRAGE",
];

const titleLines = ["Ce que vous ne voyez pas", "fait la différence."];

/** Hero de la page d'accueil — séquence d'ouverture "mise au point" (viewfinder). */
export default function HeroTypographic() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      <TypographicBackground words={heroWords} animateIn />

      <Container className="relative py-16 lg:py-28">
        {/* Label de positionnement */}
        <div className="mb-10 flex items-center justify-between">
          <SectionLabel>Formation audiovisuelle à Paris</SectionLabel>
        </div>

        {/* Cadre de viseur : 4 repères d'angle qui se dessinent */}
        <div className="relative max-w-4xl py-5 pl-5">
          <span
            aria-hidden
            className="hero-corner pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-ink"
            style={{ animationDelay: "0.05s" }}
          />
          <span
            aria-hidden
            className="hero-corner pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-ink"
            style={{ animationDelay: "0.12s" }}
          />
          <span
            aria-hidden
            className="hero-corner pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-ink"
            style={{ animationDelay: "0.19s" }}
          />
          <span
            aria-hidden
            className="hero-corner pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-ink"
            style={{ animationDelay: "0.26s" }}
          />

          <h1 className="font-display text-display-xl uppercase">
            {titleLines.map((line, i) => (
              <span key={line} className="hero-line">
                <span style={{ animationDelay: `${0.4 + i * 0.12}s` }}>{line}</span>
              </span>
            ))}
          </h1>
        </div>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          Formations audiovisuelles en présentiel à Paris. Apprenez la pratique,
          maîtrisez les outils, développez votre regard.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <CTAButton href="/formations">Voir les formations</CTAButton>
          <CTAButton href="/contact" variant="secondary">
            Nous contacter
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
