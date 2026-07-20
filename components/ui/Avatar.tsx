import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  /** Photo N&B optionnelle. Sinon : initiales sur fond gris. */
  image?: string;
  /** Taille en pixels (carré). */
  size?: number;
  className?: string;
}

function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Avatar carré N&B (photo ou initiales) — décoratif, fidèle à la DA. */
export default function Avatar({ name, image, size = 56, className }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-line bg-ghost/25 grayscale",
        className
      )}
      style={{ width: size, height: size }}
    >
      {image ? (
        <Image src={image} alt="" fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <span
          className="font-display uppercase leading-none text-ink/70"
          style={{ fontSize: Math.round(size * 0.34) }}
        >
          {initialsOf(name)}
        </span>
      )}
    </span>
  );
}
