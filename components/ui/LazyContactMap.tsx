"use client";

import dynamic from "next/dynamic";

const ContactMap = dynamic(() => import("@/components/ui/ContactMap"), {
  ssr: false,
  loading: () => (
    <section className="border-y border-line bg-canvas">
      <div className="flex h-[420px] items-center justify-center bg-ghost/20 lg:h-[520px]">
        <p className="font-condensed text-sm font-semibold uppercase tracking-wide2 text-muted">
          Chargement de la carte
        </p>
      </div>
    </section>
  ),
});

export default function LazyContactMap() {
  return <ContactMap />;
}
