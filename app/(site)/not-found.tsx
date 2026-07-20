import Container from "@/components/layout/Container";
import CTAButton from "@/components/ui/CTAButton";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-wide2 text-muted">
        Erreur 404 — hors champ
      </p>
      <h1 className="mt-6 font-display text-display-lg uppercase">
        Cette page est hors cadre
      </h1>
      <p className="mt-4 max-w-md text-muted">
        La page que vous cherchez n&apos;existe pas ou a été déplacée. Revenons
        dans le cadre.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <CTAButton href="/">Retour à l&apos;accueil</CTAButton>
        <CTAButton href="/formations" variant="secondary">
          Voir les formations
        </CTAButton>
      </div>
    </Container>
  );
}
