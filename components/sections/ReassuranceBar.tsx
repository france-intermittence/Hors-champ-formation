import { MapPin, Hammer, Users, BadgeCheck } from "lucide-react";
import Container from "@/components/layout/Container";
import IconFeature from "@/components/cards/IconFeature";

const items = [
  { icon: MapPin, title: "Formation à Paris", description: "En présentiel, au cœur du métier." },
  { icon: Hammer, title: "Par la pratique", description: "On apprend en faisant, dès le premier jour." },
  { icon: Users, title: "Petits groupes", description: "Un suivi attentif et personnalisé." },
  { icon: BadgeCheck, title: "Formateurs pros", description: "Des intervenants en activité." },
];

/** Bande de réassurance : 4 colonnes avec icônes linéaires. */
export default function ReassuranceBar() {
  return (
    <section className="border-b border-line bg-paper">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
        {items.map((item) => (
          <IconFeature
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </Container>
    </section>
  );
}
