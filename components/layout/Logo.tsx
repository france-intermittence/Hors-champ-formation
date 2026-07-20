import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Logotype typographique "Hors Champ Formation". */
export default function Logo({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Hors Champ Formation — accueil"
      className={cn("group inline-flex items-center gap-3 leading-none", className)}
    >
      <span className="relative h-12 w-12 shrink-0 overflow-hidden">
        <Image
          src="/brand/logo-horschamp.png"
          alt=""
          fill
          sizes="48px"
          className={cn("object-contain", onDark && "invert")}
          priority
        />
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display text-2xl uppercase tracking-tight",
            onDark ? "text-canvas" : "text-ink"
          )}
        >
          Hors Champ
        </span>
        <span
          className={cn(
            "font-condensed text-[0.62rem] font-semibold uppercase tracking-label",
            onDark ? "text-ghost" : "text-muted"
          )}
        >
          Formation audiovisuelle
        </span>
      </span>
    </Link>
  );
}
