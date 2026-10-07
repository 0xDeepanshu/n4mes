"use client";

import { type CSSProperties, useEffect, useRef } from "react";

type ProjectVideoProps = {
  /** Resolved video URL (local /public asset). */
  src: string;
  /** Optional poster shown until the video starts (same-stem sibling image). */
  poster?: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Viewport-aware video used by the project detail media.
 * It only preloads metadata and plays/pauses through an IntersectionObserver
 * as its container enters/leaves the viewport — no blanket autoplay, no
 * videos running off-screen. Muted + loop + playsInline so playback can
 * start without user interaction.
 */
export default function ProjectVideo({
  src,
  poster,
  alt,
  className,
  style,
}: ProjectVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      el.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
      style={style}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
    />
  );
}
