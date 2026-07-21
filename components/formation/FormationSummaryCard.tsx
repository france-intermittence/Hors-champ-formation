import { Clock, MapPin, BarChart3, Monitor, Download, Tag } from "lucide-react";
import type { Formation } from "@/types";
import CTAButton from "@/components/ui/CTAButton";
import { formatPrice } from "@/lib/utils";

interface FormationSummaryCardProps {
  formation: Formation;
}

/** Carte résumé (sticky en desktop) de la page détail formation. */
export default function FormationSummaryCard({
  formation,
}: FormationSummaryCardProps) {
  const rows = [
    { icon: Tag, label: "Tarif", value: formatPrice(formation.price) },
    { icon: Clock, label: "Durée", value: formation.duration },
    { icon: MapPin, label: "Lieu", value: formation.location },
    { icon: BarChart3, label: "Niveau", value: formation.level },
    { icon: Monitor, label: "Format", value: formation.format },
  ];

  return (
    <div className="border border-ink bg-paper p-6 lg:p-8">
      <p className="font-condensed text-xs font-semibold uppercase tracking-label text-muted">
        En bref
      </p>

      <dl className="mt-6 divide-y divide-line">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-4 py-4">
            <row.icon className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.5} aria-hidden />
            <dt className="font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted">
              {row.label}
            </dt>
            <dd className="ml-auto text-right font-condensed text-base font-semibold uppercase tracking-wide2 text-ink">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-col gap-3">
        <CTAButton href="/financement" fullWidth>
          S&apos;inscrire
        </CTAButton>
        {formation.programPdfUrl ? (
          <CTAButton
            href={formation.programPdfUrl}
            variant="secondary"
            fullWidth
            arrow={false}
            target="_blank"
            dataTrack="formation-program-download"
          >
            <Download className="mr-2 h-4 w-4" aria-hidden />
            Télécharger le programme
          </CTAButton>
        ) : (
          <CTAButton href="/contact" variant="secondary" fullWidth arrow={false}>
            <Download className="mr-2 h-4 w-4" aria-hidden />
            Télécharger le programme
          </CTAButton>
        )}
      </div>
    </div>
  );
}
