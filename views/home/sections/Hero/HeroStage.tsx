"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cx } from "class-variance-authority";
import { prefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";

// Kept out of the initial bundle; only fetched once every gate below passes.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function canRender3D() {
  if (prefersReducedMotion()) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return false;
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

/**
 * 3D stage + SSR poster. The poster stays until the canvas reports its first frame.
 * Without JS, WebGL2, or with reduced motion / Save-Data, only the poster renders.
 */
export function HeroStage({ poster }: { poster: React.ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !canRender3D()) return;

    const hasIdle = typeof window.requestIdleCallback === "function";
    let idleHandle: number | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && idleHandle === undefined) {
        const mount = () => setMounted(true);
        idleHandle = hasIdle
          ? window.requestIdleCallback(mount, { timeout: 2000 })
          : window.setTimeout(mount, 200);
      }
    });
    observer.observe(stage);

    return () => {
      observer.disconnect();
      if (idleHandle !== undefined) {
        if (hasIdle) window.cancelIdleCallback(idleHandle);
        else window.clearTimeout(idleHandle);
      }
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-y-0 right-0 w-[56%] transition-opacity duration-[480ms] ease-out-expo",
          ready && "opacity-0",
        )}
      >
        {poster}
      </div>
      <div
        ref={stageRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-[-120px] top-10 aspect-square w-[420px] md:right-[-6%] md:w-[min(78vw,980px)]"
      >
        {mounted && <HeroScene active={inView} onReady={() => setReady(true)} />}
      </div>
    </>
  );
}
