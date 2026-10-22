import Image from "next/image";
import { cx } from "class-variance-authority";

interface ImageSlotProps {
  /** Describes the intended photo; used as alt text or aria-label. */
  alt: string;
  src?: string;
  /** Placeholder fill colour while no photo exists. */
  tone?: string;
  /** Small mono caption shown on the placeholder, e.g. "IMG · sled push, turf". */
  caption?: string;
  /** Radius utility; defaults to radius md (20px). */
  rounded?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

function isLightTone(hex: string) {
  const v = hex.replace("#", "");
  if (v.length !== 6) return false;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16));
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.5;
}

/** Black-and-white photo slot, or a neutral tone block until the photo exists. */
export function ImageSlot({
  alt,
  src,
  tone = "#DEDEDE",
  caption,
  rounded = "rounded-md",
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
}: ImageSlotProps) {
  if (src) {
    return (
      <div className={cx("relative overflow-hidden", rounded, className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover grayscale" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cx("relative overflow-hidden", rounded, className)}
      style={{ backgroundColor: tone }}
    >
      {caption && (
        <span
          aria-hidden="true"
          className={cx(
            "data absolute left-4 top-4 uppercase tracking-[0.06em]",
            isLightTone(tone) ? "text-ink-600" : "text-ink-300",
          )}
        >
          {caption}
        </span>
      )}
    </div>
  );
}
