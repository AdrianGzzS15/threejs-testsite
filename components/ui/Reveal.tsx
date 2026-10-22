"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/motion/useReveal";

/** Wraps server-rendered content in a scroll reveal. Fully visible without JS. */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
