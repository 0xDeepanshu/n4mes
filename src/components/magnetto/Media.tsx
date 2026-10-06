import Image from "next/image";
import type { CSSProperties } from "react";

type MediaProps = {
  /** Resolved image URL (local asset or optimized Sanity CDN URL). */
  image: string;
  /** Resolved video URL — when set, plays in place of the image. */
  video?: string;
  alt: string;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
};

/**
 * Content-aware media renderer used at CMS integration points.
 * Image stays the primary, optimized render; an optional video plays in the
 * exact same container (muted, looping, with the image as poster/fallback).
 */
export default function Media({
  image,
  video,
  alt,
  sizes,
  className,
  style,
  priority,
}: MediaProps) {
  if (video) {
    return (
      <video
        className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
        style={style}
        src={video}
        poster={image}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={image}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      style={style}
      priority={priority}
    />
  );
}
