import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight, Instagram, Linkedin, Youtube } from "lucide-react";
import { site, footerNav } from "@/data/navigation";
import Container from "./Container";

export default function Footer() {
  const year = 2026;

  return (
    <footer className="bg-ink-deep text-canvas">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Marque + baseline */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="Hors Champ Formation — accueil"
              className="inline-flex items-center gap-4"
            >
              <span className="relative h-16 w-16 shrink-0 overflow-hidden">
                <Image
                  src="/brand/logo-horschamp.png"
                  alt=""
                  fill
                  sizes="64px"
                  className="object-contain invert"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-3xl uppercase">
                  Hors Champ
                </span>
                <span className="mt-1 font-condensed text-xs font-semibold uppercase tracking-label text-ghost">
                  Formation audiovisuelle
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ghost">
              {site.baseline} Formations audiovisuelles en présentiel à Paris,
              orientées vers la pratique.
            </p>

            {/* Réseaux sociaux */}
            <ul className="mt-6 flex gap-3">
              {[
                { href: site.social.instagram, label: "Instagram", Icon: Instagram },
                { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: site.social.youtube, label: "YouTube", Icon: Youtube },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Hors Champ Formation sur ${label}`}
                    className="inline-flex h-10 w-10 items-center justify-center border border-canvas/20 text-canvas/80 transition-colors hover:border-canvas hover:text-canvas"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonnes de liens */}
          {footerNav.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="lg:col-span-2"
            >
              <p className="font-condensed text-xs font-semibold uppercase tracking-label text-ghost">
                {group.title}
              </p>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-canvas/80 transition-colors hover:text-canvas"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Coordonnées */}
          <div className="lg:col-span-4">
            <p className="font-condensed text-xs font-semibold uppercase tracking-label text-ghost">
              Nous contacter
            </p>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ghost" aria-hidden />
                <span className="text-canvas/80">
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}, {site.address.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-ghost" aria-hidden />
                <a
                  href={`mailto:${site.email}`}
                  data-track="footer-email"
                  className="text-canvas/80 transition-colors hover:text-canvas"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-ghost" aria-hidden />
                <a
                  href={`tel:${site.phone}`}
                  data-track="footer-phone"
                  className="text-canvas/80 transition-colors hover:text-canvas"
                >
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>

            <Link
              href="/contact"
              data-track="footer-appointment"
              className="group mt-6 inline-flex items-center gap-2 font-condensed text-sm font-semibold uppercase tracking-wide2 text-canvas"
            >
              Prendre rendez-vous
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="mt-16 flex flex-col gap-4 border-t border-canvas/15 pt-8 text-xs text-ghost sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>© {year} MAL BARRÉ — {site.name}. Tous droits réservés.</p>
            <p>Réalisé par Webfityou.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/mentions-legales" className="hover:text-canvas">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-canvas">
              Politique de confidentialité
            </Link>
            <Link href="/accessibilite" className="hover:text-canvas">
              Accessibilité
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
