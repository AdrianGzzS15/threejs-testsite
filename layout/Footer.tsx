import Link from "next/link";
import { footerColumns, legalLinks } from "@/lib/data/home";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer data-theme="dark" className="overflow-hidden bg-ink-950 text-white">
      <div className="page-container pt-24 lg:pt-32">
        <div className="flex flex-wrap justify-between gap-x-16 gap-y-14">
          {/* Newsletter. Needs a real endpoint; see summary. */}
          <form action="/newsletter" method="post" className="w-full max-w-[440px]">
            <h2 className="font-display text-[28px] font-bold leading-tight tracking-[-0.025em]">
              One training note a week.
            </h2>
            <label htmlFor="newsletter-email" className="mt-6 block text-sm font-medium text-ink-300">
              Email address
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="h-12 min-w-0 flex-1 rounded-sm border border-ink-500 bg-ink-900 px-4 text-white placeholder:text-ink-400"
              />
              <Button type="submit" intent="primary" tone="dark" size="md" className="h-12">
                Subscribe
              </Button>
            </div>
          </form>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h3 className="eyebrow text-ink-400">{col.heading}</h3>
                <ul className="mt-4 space-y-1">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center text-[15px] text-ink-300 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 select-none font-display text-[clamp(72px,17vw,260px)] font-extrabold leading-[0.8] tracking-[-0.06em] text-ink-850"
        >
          KINETIC
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-800 py-6 text-sm text-ink-400">
          <p>© 2026 KINETIC. All rights reserved.</p>
          <ul className="flex gap-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center px-2 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
