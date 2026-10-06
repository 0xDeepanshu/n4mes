import type { SanityImageSource } from "@sanity/image-url";
import imageUrlBuilder from "@sanity/image-url";
import { hasSanity, sanityClient } from "./client";

let builder: ReturnType<typeof imageUrlBuilder> | null = null;

function getBuilder(): ReturnType<typeof imageUrlBuilder> {
  if (!builder) {
    builder = imageUrlBuilder(sanityClient());
  }
  return builder;
}

export function urlFor(source: SanityImageSource) {
  return getBuilder().image(source);
}

/**
 * Resolve a Sanity image to an optimized CDN URL.
 * Returns undefined when the image is empty or Sanity is not configured,
 * so callers can fall back to the local asset.
 */
export function imgSrc(
  source: SanityImageSource | null | undefined,
  width?: number,
): string | undefined {
  if (!source || !hasSanity()) return undefined;
  try {
    let image = urlFor(source);
    if (width) image = image.width(width);
    return image.auto("format").url();
  } catch {
    return undefined;
  }
}

/** Like imgSrc, but always returns a usable URL (local fallback when needed). */
export function imgSrcOr(
  source: SanityImageSource | null | undefined,
  fallback: string,
  width?: number,
): string {
  return imgSrc(source, width) ?? fallback;
}
