import Link from "next/link";
import { categories } from "@/lib/data/home";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryLoop } from "./CategoryLoop";

export function CategoryGrid() {
  return (
    <section aria-labelledby="categories-title" className="section-y bg-ink-50 text-ink-950">
      <div className="page-container">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-fg-muted">Exercise library</p>
            <h2 id="categories-title" className="heading-2 mt-5 max-w-[16ch]">
              Every movement, broken down.
            </h2>
          </div>
          <Link
            href="/exercises"
            className="group inline-flex min-h-11 items-center gap-2 text-base font-semibold underline decoration-ink-300 underline-offset-4 hover:decoration-ink-950"
          >
            Browse the library
            <Icon
              name="arrow-right"
              size={18}
              className="transition-transform duration-200 ease-out-expo group-hover:translate-x-1 group-focus-visible:translate-x-1"
            />
          </Link>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20">
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-[2px] overflow-hidden rounded-[24px] border-2 border-ink-200 bg-ink-200">
            {categories.map((c) => (
              <li key={c.num} className="bg-white">
                <Link
                  href={c.href}
                  className="group flex h-full min-h-[300px] flex-col justify-between p-8 focus-visible:outline-offset-[-6px]"
                >
                  <div className="flex items-start justify-between">
                    <span className="data text-ink-450">{c.num}</span>
                    <Icon
                      name="arrow-up-right"
                      size={22}
                      className="transition-transform duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5"
                    />
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-display text-[36px] font-bold leading-none tracking-[-0.03em]">{c.name}</h3>
                      <p className="mt-3 text-[15px] leading-snug text-ink-500">{c.examples}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-center gap-1">
                      <CategoryLoop pose={c.pose} />
                      <span aria-hidden="true" className="data text-[11px] tracking-[0.1em] text-ink-450">
                        3D LOOP
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
