import { featuredProgram, programs } from "@/lib/data/home";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProgramCard } from "./ProgramCard";

export function FeaturedPrograms() {
  return (
    <section aria-labelledby="programs-title" className="section-y bg-white text-ink-950">
      <div className="page-container">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow text-fg-muted">Featured programs</p>
            <h2 id="programs-title" className="display-lg mt-5">
              Pick a goal.
              <br />
              We plan the weeks.
            </h2>
          </div>
          <ButtonLink href="/programs" intent="secondary" tone="light" size="md" trailingIcon="arrow-right">
            All programs
          </ButtonLink>
        </Reveal>

        <Reveal className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6 lg:mt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <ProgramCard program={featuredProgram} variant="featured" className="lg:row-span-3" />
          {programs.map((p) => (
            <ProgramCard key={p.slug} program={p} variant="compact" />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
