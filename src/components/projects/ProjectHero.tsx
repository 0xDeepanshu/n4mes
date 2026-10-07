import Media from "@/components/magnetto/Media";
import Reveal from "@/components/magnetto/Reveal";
import { MediaOpenButton } from "@/components/media/MediaLightbox";
import { toLightboxMedia } from "@/lib/lightbox";

type ProjectHeroProps = {
  /** Full-bleed hero artwork (Sanity CDN or local /public URL) */
  image: string;
  /** Optional video playing in the same fixed container */
  video?: string;
  alt: string;
  /** Large headline (pixel font), e.g. BRANDS */
  title: string;
  /** Small uppercase line under the title */
  subtitle: string;
  /** Right-hand paragraph (desktop only) */
  description: string;
  /** Fallback tint behind the fixed container — only visible when the
   *  slot has no media yet; never affects media-covered heroes. */
  tint?: string;
  /** Detail pages: play the hero video by viewport visibility. */
  viewportPlay?: boolean;
  /** Detail pages: make the hero media clickable (media viewer). */
  interactive?: boolean;
};

/**
 * Shared full-width hero used by the project detail page and the
 * category / listing page. Dimensions, typography, and positioning are
 * fixed — the media never affects the container size.
 */
export default function ProjectHero({
  image,
  video,
  alt,
  title,
  subtitle,
  description,
  tint,
  viewportPlay,
  interactive,
}: ProjectHeroProps) {
  const lightboxMedia = interactive
    ? toLightboxMedia({ image, video, alt })
    : null;

  return (
    <Reveal className="w-full">
      <div
        className="section-container aspect-[4/5] md:aspect-[12/5]"
        style={tint ? { backgroundColor: tint } : undefined}
      >
        <Media
          image={image}
          video={video}
          alt={alt}
          sizes="100vw"
          className="object-cover"
          priority
          viewportPlay={viewportPlay}
        />

        {/* Click-to-view overlay for the hero media (detail pages only).
            Sits above the decorative text so any hero click opens the
            viewer; the text itself has no interactive elements. */}
        {lightboxMedia && (
          <MediaOpenButton
            media={lightboxMedia}
            label={`View media: ${alt}`}
            className="z-20"
          />
        )}

        {/* Title + category (left, vertically centered) */}
        <div className="absolute top-1/2 left-[clamp(24px,4.2vw,80px)] z-10 -translate-y-1/2">
          <h1
            className="font-pixel text-white"
            style={{
              fontSize: "clamp(34px, 4vw, 76px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "0.04em",
            }}
          >
            {title}
          </h1>
          <p
            className="font-pixel text-white"
            style={{
              marginTop: "clamp(8px, 1vw, 18px)",
              fontSize: "clamp(9px, 0.85vw, 16px)",
              fontWeight: 400,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Description (right, vertically centered) */}
        <div
          className="absolute top-1/2 right-[clamp(24px,4.2vw,80px)] z-10 hidden -translate-y-1/2 md:block"
          style={{ width: "clamp(240px, 16.5vw, 320px)" }}
        >
          <p
            className="text-white"
            style={{
              fontSize: "clamp(13px, 0.88vw, 17px)",
              lineHeight: 1.5,
              fontWeight: 600,
              letterSpacing: "-0.003em",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
