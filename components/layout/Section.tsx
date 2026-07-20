import Container from "./Container";
import { cn } from "@/lib/utils";

type Tone = "canvas" | "paper" | "ink";

interface SectionProps {
  children: React.ReactNode;
  tone?: Tone;
  /** Filet de séparation en haut de section. */
  divider?: boolean;
  className?: string;
  id?: string;
  /** Désactive le Container interne (pour gérer soi-même la largeur). */
  bare?: boolean;
}

const toneClass: Record<Tone, string> = {
  canvas: "bg-canvas text-ink",
  paper: "bg-paper text-ink",
  ink: "bg-ink-deep text-canvas",
};

/** Section avec rythme vertical homogène et fond paramétrable. */
export default function Section({
  children,
  tone = "canvas",
  divider = false,
  className,
  id,
  bare = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 lg:py-24",
        toneClass[tone],
        divider && "border-t border-line",
        className
      )}
    >
      {bare ? children : <Container>{children}</Container>}
    </section>
  );
}
