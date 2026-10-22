import { squatSeries } from "@/lib/data/home";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MiniBarChart } from "@/components/charts/MiniBarChart";

export function ProgressTeaser() {
  const data = squatSeries.map((p) => ({ label: `WK ${p.week}`, value: p.value }));
  const first = data[0];
  const last = data[data.length - 1];

  return (
    <section aria-labelledby="progress-title" data-theme="dark" className="section-y bg-ink-950 text-white">
      <div className="page-container flex flex-wrap items-center gap-x-20 gap-y-14">
        <Reveal className="max-w-[520px] flex-[1_1_360px]">
          <p className="eyebrow text-ink-400">My Progress</p>
          <h2 id="progress-title" className="display-lg mt-5">
            See every rep add up.
          </h2>
          <p className="body-lg mt-6 text-ink-300">
            Volume, personal records and streaks, charted week by week. No vanity metrics, only the numbers that move.
          </p>
          <ButtonLink href="/progress" intent="primary" tone="dark" size="lg" className="mt-10">
            Open My Progress
          </ButtonLink>
        </Reveal>

        <Reveal className="min-w-0 flex-[1_1_420px]">
          <figure className="rounded-lg border border-ink-800 bg-ink-900 p-6 sm:p-8">
            <p className="text-[15px] font-medium text-ink-300">Back squat · estimated 1RM</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="font-display font-extrabold leading-none tracking-[-0.04em]">
                <span className="text-[clamp(56px,6vw,80px)]">142.5</span>
                <span className="ml-2 text-2xl tracking-[-0.02em] text-ink-300">kg</span>
              </p>
              <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink-950">
                <span aria-hidden="true">▲ </span>
                <span className="sr-only">Up </span>
                12.5 kg in 8 wk
              </span>
            </div>

            <MiniBarChart
              data={data}
              domain={[120, 145]}
              unit="kg"
              caption="Back squat estimated one-rep max by week"
              className="mt-10"
            />

            <figcaption className="data mt-3 flex justify-between text-ink-400">
              <span>
                {first.label} · {first.value} kg
              </span>
              <span>
                {last.label} · {last.value} kg
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
