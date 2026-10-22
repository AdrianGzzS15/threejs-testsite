import { principles, principlesTitle } from "@/lib/data/home";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

export function Principles() {
  return (
    <section
      aria-labelledby="principles-title"
      data-theme="dark"
      className="section-y border-t border-ink-850 bg-ink-950 text-white"
    >
      <div className="page-container">
        <Reveal>
          <h2 id="principles-title" className="heading-2 max-w-[14ch]">
            {principlesTitle}
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-8 gap-y-12 lg:mt-24">
          {principles.map((p) => (
            <Reveal key={p.counter}>
              <article>
                <ImageSlot
                  alt={p.image.alt}
                  tone={p.image.tone}
                  caption={p.image.caption}
                  className="aspect-[4/5] w-full"
                />
                <p className="data mt-6 text-ink-400">{p.counter}</p>
                <h3 className="mt-3 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.025em]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[17px] leading-[1.55] text-ink-300">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
