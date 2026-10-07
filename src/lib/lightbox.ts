/** Normalized media consumed by the media viewer (local /public or Sanity).
 *  Shared by server components (data mapping) and client components
 *  (the viewer itself) — lives outside any "use client" module. */
export type LightboxMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
};

/** Map the existing media data abstraction onto a viewer item. */
export function toLightboxMedia(input: {
  image?: string;
  video?: string;
  alt: string;
}): LightboxMedia | null {
  if (input.video) {
    return {
      type: "video",
      src: input.video,
      poster: input.image || undefined,
      alt: input.alt,
    };
  }
  if (input.image) {
    return { type: "image", src: input.image, alt: input.alt };
  }
  return null;
}
