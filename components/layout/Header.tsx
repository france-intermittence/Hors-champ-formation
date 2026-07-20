"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import Container from "./Container";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bloque le scroll quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-canvas/90 backdrop-blur-sm"
          : "border-transparent bg-canvas"
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        {/* Navigation desktop */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-8 lg:flex"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative font-condensed text-sm font-semibold uppercase tracking-wide2 transition-colors",
                "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100",
                isActive(item.href)
                  ? "text-ink after:scale-x-100"
                  : "text-muted hover:text-ink after:scale-x-0"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/financement"
            data-track="header-signup"
            className="group hidden items-center gap-2 border border-ink bg-ink px-6 py-3 font-condensed text-sm font-semibold uppercase tracking-wide2 text-canvas transition-colors hover:bg-transparent hover:text-ink sm:inline-flex"
          >
            S&apos;inscrire
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>

          {/* Burger mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center border border-ink text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Overlay menu mobile */}
      {open && (
        <div className="fixed inset-0 top-20 z-40 bg-canvas lg:hidden">
          <Container className="flex h-full flex-col py-8">
            <nav
              aria-label="Navigation mobile"
              className="flex flex-col divide-y divide-line border-y border-line"
            >
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between py-5 font-display text-3xl uppercase",
                    isActive(item.href) ? "text-ink" : "text-muted"
                  )}
                >
                  {item.label}
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              ))}
            </nav>

            <Link
              href="/financement"
              data-track="header-signup-mobile"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-ink px-8 py-5 font-condensed text-sm font-semibold uppercase tracking-wide2 text-canvas"
            >
              S&apos;inscrire
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
