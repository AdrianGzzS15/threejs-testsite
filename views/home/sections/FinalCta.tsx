import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface FinalCtaProps {
  /** Monthly price, e.g. "$19". Placeholder until pricing is set. */
  price?: string;
}

export function FinalCta({ price = "[YOUR PRICE]" }: FinalCtaProps) {
  return (
    <section aria-labelledby="cta-title" className="section-y bg-white text-center text-ink-950">
      <Reveal className="page-container flex flex-col items-center">
        <h2 id="cta-title" className="display-xl">
          Start Monday.
          <span className="block text-ink-400">Or today.</span>
        </h2>
        <p className="body-lg mt-8 text-ink-500">
          7 days free, then {price} / month. Cancel anytime.
        </p>
        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href="/signup" intent="primary" tone="light" size="lg">
            Start free trial
          </ButtonLink>
          <ButtonLink href="/explore" intent="secondary" tone="light" size="lg">
            Explore first
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
