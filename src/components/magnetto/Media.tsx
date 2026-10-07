import Image from "next/image";
import type { CSSProperties } from "react";
import ProjectVideo from "./ProjectVideo";

type MediaProps = {
  /**
   * Resolved image URL (local asset or optimized Sanity CDN URL).
   * Optional: a slot may hold only a video, or be empty (the fixed
   * container then keeps its size and shows the design's fallback).
   */
  image?: string;
  /** Resolved video URL — when set, plays in place of the image. */
  video?: string;
  alt: string;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  /**
   * Detail media only: play/pause the video by viewport visibility
   * (metadata preload, IntersectionObserver) instead of blanket autoplay.
   */
  viewportPlay?: boolean;
};

/**
 * Content-aware media renderer used at CMS integration points.
 * Image stays the primary, optimized render; an optional video plays in the
 * exact same container (muted, looping, with the image as poster/fallback).
 * Rendering never affects the container dimensions.
 */
export default function Media({
  image,
  video,
  alt,
  sizes,
  className,
  style,
  priority,
  viewportPlay,
}: MediaProps) {
  if (video) {
    const poster = image || undefined;

    if (viewportPlay) {
      return (
        <ProjectVideo
          src={video}
          poster={poster}
          alt={alt}
          className={className}
          style={style}
        />
      );
    }

    return (
      <video
        className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
        style={style}
        src={video}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
      />
    );
  }

  if (!image) {
    // Empty slot: the fixed-size container keeps its dimensions and
    // background; nothing is rendered inside it.
    return null;
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
