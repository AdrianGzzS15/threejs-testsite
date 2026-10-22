import { hero } from "@/lib/data/home";
import { ButtonLink } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FilmDialog } from "./FilmDialog";
import { HeroMotion } from "./HeroMotion";
import { HeroStage } from "./HeroStage";

export function Hero() {
  return (
    <HeroMotion className="relative overflow-hidden bg-ink-950 text-white">
      <HeroStage
        poster={
          <ImageSlot alt={hero.poster.alt} tone={hero.poster.tone} caption={hero.poster.caption} rounded="" className="size-full" />
        }
      />

      <div className="page-container relative z-10 flex min-h-[calc(100svh-64px)] flex-col justify-between gap-16 pb-20 pt-[120px] md:min-h-[900px] md:pb-24">
        <div data-hero-headline>
          <p className="eyebrow text-[#A3A3A3]">{hero.eyebrow}</p>
          <h1 id="hero-title" className="display-2xl mt-6 max-w-[9ch]">
            {hero.titleLines.map((line) => (
              <span key={line} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-14">
          <div className="w-full max-w-[460px]">
            <p className="text-[20px] leading-[1.5] text-[#D4D4D4]">{hero.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={hero.primaryCta.href}
                intent="primary"
                tone="dark"
                size="lg"
                trailingIcon="arrow-right"
                className="w-full sm:w-auto"
              >
                {hero.primaryCta.label}
              </ButtonLink>
              <FilmDialog label={hero.filmCta} />
            </div>
          </div>

          <ul className="grid w-full grid-cols-1 border-t border-ink-700 sm:w-auto sm:grid-cols-3">
            {hero.features.map((f, i) => (
              <li
                key={f.num}
                className={
                  i === 0
                    ? "py-4 sm:pr-6 sm:pt-5"
                    : "border-t border-ink-700 py-4 sm:border-l sm:border-t-0 sm:px-6 sm:pt-5"
                }
              >
                <span className="data block text-ink-400">{f.num}</span>
                <span className="mt-2 block text-[15px] font-medium leading-snug sm:max-w-[12ch]">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="h-10 w-px bg-ink-500" />
        <span className="data tracking-[0.12em] text-ink-400">SCROLL</span>
      </div>
    </HeroMotion>
  );
}
