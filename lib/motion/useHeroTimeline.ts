"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroState, requestHeroFrame } from "./heroState";
import { prefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Hero motion. Expects inside `heroRef`:
 * - `[data-hero-headline]` the top text block
 * - `[data-hero-line]` each headline line (wrapped in an overflow-hidden span)
 */
export function useHeroTimeline(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    gsap.registerPlugin(ScrollTrigger);
    const headline = hero.querySelector<HTMLElement>("[data-hero-headline]");
    const lines = hero.querySelectorAll<HTMLElement>("[data-hero-line]");

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        // No pin, no scrub, no camera movement: a single fade.
        if (headline) gsap.from(headline, { opacity: 0, duration: 0.48, ease: "power1.out" });
        return;
      }

      // Intro on load (not scroll-driven). CTAs are never touched.
      gsap.from(lines, { yPercent: 100, duration: 0.8, stagger: 0.08, ease: "expo.out" });

      // One master timeline; positions are fractions of the 0–1 scroll window.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate: requestHeroFrame,
        scrollTrigger: {
          trigger: hero,
          pin: true,
          start: "top top",
          end: "+=200%",
          scrub: 0.8,
          refreshPriority: 1,
        },
      });

      if (headline) {
        tl.fromTo(
          headline,
          { y: 0, opacity: 1 },
          { y: () => -0.12 * window.innerHeight, opacity: 0.25, duration: 0.55 },
          0.1,
        );
      }
      tl.to(heroState, { rotationY: Math.PI, duration: 0.8 }, 0)
        .to(heroState, { cameraZ: 3.2, duration: 0.55 }, 0.15)
        .to(heroState, { mix: 1, duration: 0.25 }, 0.45)
        .to(heroState, { scale: 2.2, opacity: 0, duration: 0.25 }, 0.75)
        .set({}, {}, 1);
    }, hero);

    // Later triggers (section reveals) must account for the pin spacing.
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      requestHeroFrame();
    };
  }, [heroRef]);
}
