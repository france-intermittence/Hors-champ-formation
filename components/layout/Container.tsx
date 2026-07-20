import { cn } from "@/lib/utils";

/** Conteneur centré, largeur max 1440px, gouttières responsives. */
export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("container-hc", className)}>{children}</div>;
}
