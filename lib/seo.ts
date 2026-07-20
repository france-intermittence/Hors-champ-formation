import type { Metadata } from "next";
import { site } from "@/data/navigation";
import type { Formation } from "@/types";

const titleTemplate = (title: string) => `${title} — ${site.name}`;

interface BuildMetadataArgs {
  title: string;
  description: string;
  path?: string;
  /** Désactive le suffixe " — Hors Champ Formation" (ex. page d'accueil). */
  rawTitle?: boolean;
  /** Mots-clés spécifiques à la page. */
  keywords?: string[];
}

/** Génère un objet Metadata cohérent (title, description, Open Graph, canonical). */
export function buildMetadata({
  title,
  description,
  path = "",
  rawTitle = false,
  keywords,
}: BuildMetadataArgs): Metadata {
  const fullTitle = rawTitle ? title : titleTemplate(title);
  const url = `${site.url}${path}`;

  return {
    // `absolute` empêche le template parent (« %s — Hors Champ Formation »)
    // de s'appliquer une seconde fois sur un titre déjà suffixé.
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: url || site.url },
    openGraph: {
      title: fullTitle,
      description,
      url: url || site.url,
      siteName: site.name,
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Donnée structurée Organization (à inclure dans le layout racine). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: "FR",
    },
    areaServed: "Paris, Île-de-France, France",
    // Profils officiels — renforcent l'entité (knowledge graph).
    sameAs: [site.social.instagram, site.social.linkedin, site.social.youtube],
    description:
      "Organisme de formation audiovisuelle en présentiel à Paris : tournage, image, cadrage, lumière, prise de son, montage, mixage et étalonnage.",
  };
}

/** Donnée structurée WebSite (entité du site). */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "fr-FR",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/** Donnée structurée Course (riche) pour une page formation. */
export function courseJsonLd(formation: Formation, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: formation.title,
    description: formation.subtitle,
    url: `${site.url}${path}`,
    inLanguage: "fr",
    educationalLevel: formation.level,
    teaches: formation.objectives,
    provider: {
      "@type": "EducationalOrganization",
      name: site.name,
      url: site.url,
      sameAs: site.url,
    },
    // Tarif : inclus dans les données structurées uniquement si renseigné.
    ...(formation.price != null
      ? {
          offers: {
            "@type": "Offer",
            category: "Paid",
            price: String(formation.price),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: `${site.url}${path}`,
          },
        }
      : {}),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: `P${formation.durationDays}D`,
      inLanguage: "fr",
      location: {
        "@type": "Place",
        name: site.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: formation.location,
          addressCountry: "FR",
        },
      },
    },
  };
}

/** Donnée structurée Article pour une page de blog. */
export function articleJsonLd(args: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    datePublished: args.datePublished,
    author: { "@type": "Person", name: args.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
    mainEntityOfPage: `${site.url}${args.path}`,
  };
}

/** Donnée structurée fil d'Ariane. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
