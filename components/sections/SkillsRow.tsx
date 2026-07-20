import Container from "@/components/layout/Container";
import SectionHeading from "./SectionHeading";
import { skills } from "@/data/skills";

/** Section "8 compétences clés" : marquee façon bande film. */
export default function SkillsRow() {
  const loop = [...skills, ...skills];

  return (
    <section className="border-b border-line bg-canvas py-16 lg:py-24">
      <Container>
        <SectionHeading
          label="Le métier"
          index="·"
          title={<>8 compétences clés de l&apos;audiovisuel</>}
        />
      </Container>

      {/* Bande défilante (décorative) */}
      <div
        aria-hidden
        className="marquee-mask mt-12 overflow-hidden border-y border-line py-7 lg:py-9"
      >
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap lg:gap-14">
          {loop.map((skill, i) => (
            <div key={i} className="flex items-center gap-10 lg:gap-14">
              <span className="font-display text-4xl uppercase leading-none text-ink lg:text-6xl">
                {skill}
              </span>
              <span className="h-2 w-2 shrink-0 bg-ghost" aria-hidden />
            </div>
          ))}
        </div>
      </div>

      {/* Liste accessible équivalente */}
      <ul className="sr-only">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}
