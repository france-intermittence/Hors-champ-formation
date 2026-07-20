"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  /** Délai d'apparition en ms. */
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Révélation au scroll, sobre et accessible.
 * Respecte prefers-reduced-motion (géré via .reveal-init dans globals.css).
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={cn("reveal-init", visible && "reveal-in", className)}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
