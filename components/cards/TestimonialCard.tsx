import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";

interface TestimonialCardProps {
  testimonial: Testimonial;
  onDark?: boolean;
}

function Rating({ value, onDark }: { value: number; onDark?: boolean }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Note : ${value} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < value
              ? onDark
                ? "fill-canvas text-canvas"
                : "fill-ink text-ink"
              : onDark
                ? "text-canvas/30"
                : "text-line"
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function TestimonialCard({
  testimonial,
  onDark = false,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col border p-6 lg:p-8",
        onDark ? "border-canvas/15" : "border-line bg-paper"
      )}
    >
      <Quote
        className={cn("h-6 w-6", onDark ? "text-ghost" : "text-line")}
        aria-hidden
      />
      <blockquote
        className={cn(
          "mt-4 flex-1 text-lg leading-relaxed",
          onDark ? "text-canvas" : "text-ink"
        )}
      >
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-current/10 pt-5">
        <Avatar name={testimonial.name} image={testimonial.image} size={52} />
        <div>
          <Rating value={testimonial.rating} onDark={onDark} />
          <p
            className={cn(
              "mt-2 font-condensed text-base font-semibold uppercase tracking-wide2",
              onDark ? "text-canvas" : "text-ink"
            )}
          >
            {testimonial.name}
          </p>
          <p className={cn("text-sm", onDark ? "text-ghost" : "text-muted")}>
            {testimonial.role}
            {testimonial.formation && ` · ${testimonial.formation}`}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
