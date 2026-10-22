"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cx } from "class-variance-authority";
import { authLinks, type NavLink } from "@/lib/data/home";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  isActive: (href: string) => boolean;
}

/**
 * Full-screen sheet built on a modal <dialog>: the browser traps focus,
 * makes the page inert and closes on Esc. The trigger regains focus via onClose.
 */
export function MobileMenu({ id, open, onClose, links, isActive }: MobileMenuProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      id={id}
      aria-label="Menu"
      data-theme="dark"
      onClose={onClose}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-ink-950 p-0 text-white backdrop:bg-ink-950"
    >
      <div className="page-container flex min-h-full flex-col">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            className="font-display text-[17px] font-extrabold tracking-[0.34em] text-white"
          >
            KINETIC
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2.5 inline-flex size-11 items-center justify-center rounded-full text-white"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        <nav aria-label="Primary" className="mt-6">
          <ul>
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="border-b border-ink-800">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "flex items-center justify-between py-4 font-display text-[40px] font-bold leading-tight tracking-[-0.03em]",
                      active ? "text-white" : "text-ink-400",
                    )}
                  >
                    {link.label}
                    {active && <span aria-hidden="true" className="size-2.5 rounded-full bg-white" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-3 pb-8 pt-10">
          <ButtonLink href={authLinks.startFree.href} intent="primary" tone="dark" size="lg" fullWidth onClick={onClose}>
            {authLinks.startFree.label}
          </ButtonLink>
          <ButtonLink href={authLinks.signIn.href} intent="secondary" tone="dark" size="lg" fullWidth onClick={onClose}>
            {authLinks.signIn.label}
          </ButtonLink>
        </div>
      </div>
    </dialog>
  );
}
