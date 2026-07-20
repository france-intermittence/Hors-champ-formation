import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import TypographicBackground from "@/components/ui/TypographicBackground";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
  words?: string[];
  breadcrumb?: Crumb[];
  children?: React.ReactNode;
}

/** Hero typographique des pages intérieures (H1 unique + mots géants en fond). */
export default function PageHero({
  label,
  title,
  subtitle,
  words,
  breadcrumb,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      {words && <TypographicBackground words={words} parallax />}
      <Container className="relative py-16 lg:py-24">
        {breadcrumb && (
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
              {breadcrumb.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-ink">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink">{crumb.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <ChevronRight className="h-3 w-3" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {label && <SectionLabel>{label}</SectionLabel>}

        <h1 className="mt-5 max-w-4xl font-display text-display-lg uppercase">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  );
}
