import { cx } from "class-variance-authority";
import { week, type DayPlan } from "@/lib/data/home";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const tileStyles: Record<DayPlan["variant"], { tile: string; label: string; meta: string }> = {
  hard: { tile: "bg-ink-950 text-white", label: "text-ink-400", meta: "text-ink-300" },
  easy: { tile: "bg-ink-100 text-ink-950", label: "text-ink-450", meta: "text-ink-500" },
  long: { tile: "bg-ink-600 text-white", label: "text-ink-300", meta: "text-ink-200" },
  rest: { tile: "border border-ink-200 bg-white text-ink-500", label: "text-ink-500", meta: "text-ink-500" },
};

export function WeekPreview() {
  return (
    <section aria-labelledby="week-title" className="section-y bg-white text-ink-950">
      <div className="page-container flex flex-wrap items-center gap-x-20 gap-y-14">
        <Reveal className="w-full max-w-[460px] flex-[1_1_360px]">
          <p className="eyebrow text-fg-muted">How it works</p>
          <h2 id="week-title" className="heading-2 mt-5">
            Your week, already planned.
          </h2>
          <p className="body-lg mt-6 text-ink-500">
            Tell us your goal, schedule and equipment. KINETIC builds the week, then adjusts load from what you actually
            logged.
          </p>
          <ButtonLink href="/signup" intent="primary" tone="light" size="lg" className="mt-10">
            Build my plan
          </ButtonLink>
        </Reveal>

        <Reveal className="min-w-0 flex-[2_1_520px]">
          <ol
            aria-label="Sample training week, Hybrid Engine week 3"
            className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2"
          >
            {week.map((d) => {
              const s = tileStyles[d.variant];
              return (
                <li
                  key={d.day}
                  className={cx("flex min-h-[220px] flex-col justify-between rounded-[18px] p-4", s.tile)}
                >
                  <span className={cx("data tracking-[0.08em]", s.label)}>{d.day}</span>
                  <div>
                    <p className="font-display text-[20px] font-bold leading-tight tracking-[-0.015em]">{d.session}</p>
                    <p className={cx("mt-1 text-sm", s.meta)}>{d.duration}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
