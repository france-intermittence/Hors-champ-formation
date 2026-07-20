import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed, Inter, IBM_Plex_Mono } from "next/font/google";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import { site } from "@/data/navigation";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const barlow = Barlow_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Hors Champ Formation — Formation audiovisuelle en présentiel à Paris",
    template: `%s — ${site.name}`,
  },
  description:
    "Organisme de formation audiovisuelle à Paris. Formations en présentiel orientées pratique : tournage, cadrage, lumière, prise de son, montage, mixage et étalonnage.",
  keywords: [
    "formation audiovisuelle Paris",
    "formation vidéo Paris",
    "formation tournage",
    "formation cadrage",
    "formation lumière",
    "formation prise de son",
    "formation montage vidéo",
    "formation postproduction",
    "formation étalonnage",
    "formation vidéaste",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${bebas.variable} ${barlow.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
