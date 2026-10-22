import { cva, cx, type VariantProps } from "class-variance-authority";

/** `tone` is the surface the badge sits on. */
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase leading-none tracking-[0.04em]",
  {
    variants: {
      variant: {
        solid: "",
        outline: "border",
        meta: "bg-ink-100 font-mono font-medium text-ink-600",
      },
      tone: {
        light: "",
        dark: "",
      },
    },
    compoundVariants: [
      { variant: "solid", tone: "light", className: "bg-ink-950 text-white" },
      { variant: "solid", tone: "dark", className: "bg-white text-ink-950" },
      { variant: "outline", tone: "light", className: "border-ink-950 text-ink-950" },
      { variant: "outline", tone: "dark", className: "border-ink-300 text-white" },
    ],
    defaultVariants: { variant: "solid", tone: "light" },
  },
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, tone, className, children }: BadgeProps) {
  return <span className={cx(badgeVariants({ variant, tone }), className)}>{children}</span>;
}
