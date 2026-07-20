import CTAButton from "@/components/ui/CTAButton";
import Container from "@/components/layout/Container";
import TypographicBackground from "@/components/ui/TypographicBackground";

interface CTASectionProps {
  title: string;
  intro?: string;
  primary?: { label: string; href: string; dataTrack?: string };
  secondary?: { label: string; href: string; dataTrack?: string };
  words?: string[];
}

/** Bloc d'appel à l'action final, sur fond noir profond. */
export default function CTASection({
  title,
  intro,
  primary = { label: "Découvrir nos formations", href: "/formations" },
  secondary,
  words = ["PASSER", "À", "L'ACTION"],
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-ink-deep py-20 text-canvas lg:py-28">
      <TypographicBackground words={words} className="opacity-60" />
      <Container className="relative">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-lg uppercase">{title}</h2>
          {intro && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ghost">
              {intro}
            </p>
          )}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <CTAButton href={primary.href} onDark dataTrack={primary.dataTrack}>
              {primary.label}
            </CTAButton>
            {secondary && (
              <CTAButton href={secondary.href} variant="secondary" onDark dataTrack={secondary.dataTrack}>
                {secondary.label}
              </CTAButton>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
