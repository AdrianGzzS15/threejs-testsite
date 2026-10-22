"use client";

import { useRef } from "react";
import { useHeroTimeline } from "@/lib/motion/useHeroTimeline";

/** Client shell for the hero <section>: owns the ref the GSAP timeline pins. */
export function HeroMotion({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useHeroTimeline(ref);
  return (
    <section ref={ref} aria-labelledby="hero-title" data-theme="dark" className={className}>
      {children}
    </section>
  );
}
