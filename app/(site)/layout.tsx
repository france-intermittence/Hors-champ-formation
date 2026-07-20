import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import JsonLd from "@/components/ui/JsonLd";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Indicateur de progression de lecture (filet en haut de page) */}
      <div className="scroll-progress" aria-hidden />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:font-condensed focus:text-sm focus:uppercase focus:tracking-wide2 focus:text-canvas"
      >
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">{children}</main>
      <Footer />
      <CookieConsent />
      <AnalyticsTracker />
    </>
  );
}
