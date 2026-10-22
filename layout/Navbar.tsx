"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { cx } from "class-variance-authority";
import { authLinks, primaryNav } from "@/lib/data/home";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MobileMenu } from "./MobileMenu";

const MENU_ID = "mobile-menu";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = () => {
    setMenuOpen(false);
    // Wait for the dialog to close (page no longer inert) before restoring focus.
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <header
      data-theme="dark"
      className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/90 text-white backdrop-blur"
    >
      <div className="page-container flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-[17px] font-extrabold tracking-[0.34em] text-white"
        >
          KINETIC
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center">
            {primaryNav.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "block px-3 py-[22px] text-sm font-medium leading-5 transition-colors duration-200",
                      active
                        ? "text-white shadow-[inset_0_-2px_0_#fff]"
                        : "text-[#A3A3A3] hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            type="button"
            aria-label="Search"
            className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-ink-850"
          >
            <Icon name="search" size={20} />
          </button>
          <Link
            href={authLinks.signIn.href}
            className="hidden h-11 items-center px-3 text-sm font-medium text-[#A3A3A3] transition-colors duration-200 hover:text-white md:inline-flex"
          >
            {authLinks.signIn.label}
          </Link>
          <ButtonLink
            href={authLinks.startFree.href}
            intent="primary"
            tone="dark"
            size="nav"
            className="hidden md:inline-flex"
          >
            {authLinks.startFree.label}
          </ButtonLink>
          <button
            ref={triggerRef}
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => setMenuOpen(true)}
            className="-mr-2.5 inline-flex size-11 items-center justify-center rounded-full text-white md:hidden"
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </div>

      <MobileMenu id={MENU_ID} open={menuOpen} onClose={closeMenu} links={primaryNav} isActive={isActive} />
    </header>
  );
}
