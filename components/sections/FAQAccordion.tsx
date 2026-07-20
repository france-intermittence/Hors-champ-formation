"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FaqItem } from "@/types";
import { pad2 } from "@/lib/utils";

interface FAQAccordionProps {
  items: FaqItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="flex w-full items-center gap-6 py-6 text-left"
              >
                <span className="font-mono text-sm text-muted">{pad2(i + 1)}</span>
                <span className="flex-1 font-condensed text-xl font-semibold uppercase leading-tight tracking-wide2 lg:text-2xl">
                  {item.question}
                </span>
                <span className="shrink-0 text-ink" aria-hidden>
                  {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              inert={!isOpen}
              className={`grid overflow-hidden transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <p className="max-w-3xl pb-7 pl-[3.25rem] text-base leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
