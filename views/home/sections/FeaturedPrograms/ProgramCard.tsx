import Link from "next/link";
import { cx } from "class-variance-authority";
import type { ProgramSummary } from "@/lib/data/home";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";

const arrowNudge =
  "transition-transform duration-200 ease-out-expo group-hover:translate-x-1 group-focus-visible:translate-x-1";

interface ProgramCardProps {
  program: ProgramSummary;
  variant: "featured" | "compact";
  className?: string;
}

/** The whole card is a single link; no nested interactive elements. */
export function ProgramCard({ program, variant, className }: ProgramCardProps) {
  const href = `/programs/${program.slug}`;

  if (variant === "featured") {
    return (
      <Link
        href={href}
        data-theme="dark"
        className={cx(
          "group relative flex min-h-[520px] flex-col justify-end overflow-hidden rounded-lg bg-ink-900 text-white lg:min-h-[640px]",
          className,
        )}
      >
        <ImageSlot
          alt={program.image.alt}
          tone={program.image.tone}
          caption={program.image.caption}
          rounded=""
          className="absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/4 bg-[linear-gradient(0deg,rgba(10,10,10,.92),transparent)]"
        />
        <div className="relative p-6 sm:p-10">
          <div className="flex flex-wrap gap-2">
            {program.isNew && (
              <Badge variant="solid" tone="dark">
                New
              </Badge>
            )}
            <Badge variant="outline" tone="dark">
              {program.level}
            </Badge>
          </div>
          <h3 className="mt-5 font-display text-[clamp(40px,4.5vw,56px)] font-extrabold leading-none tracking-[-0.04em]">
            {program.name}
          </h3>
          <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.55] text-ink-300">{program.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-ink-700 pt-5">
            <span className="data text-ink-300">{program.meta}</span>
            <span className="inline-flex items-center gap-2 text-[15px] font-semibold">
              View program
              <Icon name="arrow-right" size={18} className={arrowNudge} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cx(
        "group flex min-h-[188px] gap-5 rounded-[24px] bg-ink-50 p-4 text-ink-950 transition-colors duration-200 hover:bg-ink-100",
        className,
      )}
    >
      <ImageSlot
        alt={program.image.alt}
        tone={program.image.tone}
        rounded="rounded-[14px]"
        className="w-[38%] shrink-0"
      />
      <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
        <Badge variant="outline" tone="light" className="self-start">
          {program.level}
        </Badge>
        <h3 className="mt-3 font-display text-[22px] font-bold leading-tight tracking-[-0.02em]">{program.name}</h3>
        <p className="mt-1 text-[15px] leading-[1.45] text-ink-500">{program.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="data text-ink-450">{program.meta}</span>
          <Icon name="arrow-right" size={18} className={arrowNudge} />
        </div>
      </div>
    </Link>
  );
}
