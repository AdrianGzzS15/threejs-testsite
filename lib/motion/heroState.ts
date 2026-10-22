/**
 * Mutable values shared between the GSAP hero timeline (writer) and the
 * R3F scene (reader). Kept outside React so scrubbing never re-renders.
 */
export const heroState = {
  rotationY: 0,
  cameraZ: 6,
  /** 0 = wireframe, 1 = solid. Mirrors the future GLB shader's `uMix`. */
  mix: 0,
  scale: 1,
  opacity: 1,
};

let invalidate: (() => void) | null = null;

/** The scene registers its `invalidate` so scroll updates request a frame (frameloop="demand"). */
export function setHeroInvalidate(fn: (() => void) | null) {
  invalidate = fn;
}

export function requestHeroFrame() {
  invalidate?.();
}
