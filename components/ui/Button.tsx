import Link from "next/link";
import type { ComponentProps } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Icon, type IconName } from "./Icon";

/**
 * `tone` is the surface the button sits on:
 * - primary/light  → black pill (for white sections)
 * - primary/dark   → white pill (for black sections)
 * - secondary/*    → outline adapted to the surface
 */
export const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold",
    "transition-colors duration-200 ease-out-expo",
    "disabled:pointer-events-none disabled:border-transparent disabled:bg-ink-200 disabled:text-ink-450",
    "aria-disabled:pointer-events-none aria-disabled:border-transparent aria-disabled:bg-ink-200 aria-disabled:text-ink-450",
  ],
  {
    variants: {
      intent: {
        primary: "",
        secondary: "border bg-transparent",
        ghost: "bg-transparent",
      },
      tone: {
        light: "",
        dark: "",
      },
      size: {
        lg: "h-14 px-7 text-base",
        md: "h-[52px] px-6 text-base",
        sm: "h-11 px-5 text-sm",
        // 40px visual height; the pseudo-element extends the hit area to 44px.
        nav: "h-10 px-4 text-sm before:absolute before:inset-x-0 before:-inset-y-0.5 before:content-['']",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      { intent: "primary", tone: "light", className: "bg-ink-950 text-white hover:bg-[#2E2E2E]" },
      { intent: "primary", tone: "dark", className: "bg-white text-ink-950 hover:bg-ink-150" },
      { intent: "secondary", tone: "light", className: "border-ink-950 text-ink-950 hover:bg-[#F2F2F2]" },
      { intent: "secondary", tone: "dark", className: "border-ink-500 text-white hover:bg-ink-850" },
      { intent: "ghost", tone: "light", className: "text-ink-950 hover:bg-ink-100" },
      { intent: "ghost", tone: "dark", className: "text-white hover:bg-ink-850" },
    ],
    defaultVariants: { intent: "primary", tone: "light", size: "md", fullWidth: false },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

interface IconSlots {
  /** Trailing icon; "arrow-right" nudges on hover/focus. */
  trailingIcon?: IconName;
  leadingIcon?: IconName;
}

function Content({
  children,
  leadingIcon,
  trailingIcon,
  loading,
}: IconSlots & { children: React.ReactNode; loading?: boolean }) {
  return (
    <>
      {loading ? (
        <Icon name="spinner" size={18} className="animate-spin" />
      ) : (
        leadingIcon && <Icon name={leadingIcon} size={18} />
      )}
      <span>{children}</span>
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          size={18}
          className="transition-transform duration-200 ease-out-expo group-hover/btn:translate-x-1 group-focus-visible/btn:translate-x-1"
        />
      )}
    </>
  );
}

type ButtonProps = ComponentProps<"button"> & Variants & IconSlots & { loading?: boolean };

export function Button({
  intent,
  tone,
  size,
  fullWidth,
  leadingIcon,
  trailingIcon,
  loading = false,
  className,
  children,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx("group/btn", buttonVariants({ intent, tone, size, fullWidth }), className)}
      {...rest}
    >
      <Content leadingIcon={leadingIcon} trailingIcon={trailingIcon} loading={loading}>
        {children}
      </Content>
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & Variants & IconSlots;

export function ButtonLink({
  intent,
  tone,
  size,
  fullWidth,
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={cx("group/btn", buttonVariants({ intent, tone, size, fullWidth }), className)}
      {...rest}
    >
      <Content leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
        {children}
      </Content>
    </Link>
  );
}
