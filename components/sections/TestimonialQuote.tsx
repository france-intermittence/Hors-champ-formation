import { Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";

interface TestimonialQuoteProps {
  testimonial: Testimonial;
  onDark?: boolean;
}

/** Grande citation centrée (témoignage principal). */
export default function TestimonialQuote({
  testimonial,
  onDark = false,
}: TestimonialQuoteProps) {
  return (
    <figure className="mx-auto max-w-4xl text-center">
      <div className="flex justify-center gap-1" aria-label={`Note : ${testimonial.rating} sur 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < testimonial.rating
                ? onDark
                  ? "fill-canvas text-canvas"
                  : "fill-ink text-ink"
                : "text-line"
            )}
            aria-hidden
          />
        ))}
      </div>
      <blockquote
        className={cn(
          "mt-8 font-display text-3xl uppercase leading-[1.05] sm:text-4xl lg:text-5xl",
          onDark ? "text-canvas" : "text-ink"
        )}
      >
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-8 flex flex-col items-center gap-3">
        <Avatar name={testimonial.name} image={testimonial.image} size={56} />
        <span
          className={cn(
            "font-condensed text-sm font-semibold uppercase tracking-label",
            onDark ? "text-ghost" : "text-muted"
          )}
        >
          {testimonial.name} — {testimonial.role}
        </span>
      </figcaption>
    </figure>
  );
}
