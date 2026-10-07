import ContactSection from "@/components/magnetto/ContactSection";
import FooterSection from "@/components/magnetto/FooterSection";
import Media from "@/components/magnetto/Media";
import Reveal from "@/components/magnetto/Reveal";
import SiteNav from "@/components/magnetto/SiteNav";
import {
  MediaLightboxProvider,
  MediaOpenButton,
} from "@/components/media/MediaLightbox";
import { toLightboxMedia } from "@/lib/lightbox";
import type {
  ProjectDetailSection,
  ProjectDetailView,
  ProjectMediaView,
} from "@/lib/sanity/data";
import ProjectHero from "./ProjectHero";

const ROW_STYLE = {
  width: "var(--section-width)",
  maxWidth: "var(--section-max-width)",
  marginInline: "auto",
};

const CARD_RADIUS = { borderRadius: "var(--section-radius)" };

const ROW_SIZES = "(max-width: 767px) 100vw, 50vw";

/** Last section absorbs the section gap instead of adding another margin. */
const CLOSING_STYLE = {
  marginBottom: 0,
  paddingBottom: "var(--section-gap)",
};

/**
 * One card of a 2×2 media grid.
 * The container dimensions are defined by the design (never by the media);
 * the image/video simply fills it with object-fit: cover. When a slot has no
 * media yet, the container keeps its size and shows the design's fallback
 * background color.
 */
function ProjectCard({ media }: { media: ProjectMediaView }) {
  const lightboxMedia = toLightboxMedia(media);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#d9d6d1] aspect-square md:aspect-[6/5]"
      style={CARD_RADIUS}
    >
      <Media
        image={media.image}
        video={media.video}
        alt={media.alt}
        sizes={ROW_SIZES}
        className="object-cover"
        viewportPlay
      />
      {lightboxMedia && (
        <MediaOpenButton
          media={lightboxMedia}
          label={`View media: ${media.alt}`}
          className="z-10"
        />
      )}
    </div>
  );
}

/** Full-width media banner (semantic figure; the design never shows captions). */
function FullMedia({ media }: { media: ProjectMediaView }) {
  const lightboxMedia = toLightboxMedia(media);

  return (
    <figure className="m-0 w-full">
      <div className="section-container aspect-[4/3] md:aspect-[12/5]">
        <Media
          image={media.image}
          video={media.video}
          alt={media.alt}
          sizes="100vw"
          className="object-cover"
          viewportPlay
        />
        {lightboxMedia && (
          <MediaOpenButton
            media={lightboxMedia}
            label={`View media: ${media.alt}`}
            className="z-10"
          />
        )}
      </div>
    </figure>
  );
}

/**
 * The repeating media layout below the hero:
 *   grid (≤4 cards, 2×2) → full-width banner → grid → full-width → …
 * driven entirely by how many media the project actually has. The last
 * section closes the light region; a hero-only project closes it itself.
 */
function DetailSections({ sections }: { sections: ProjectDetailSection[] }) {
  const closingIndex = sections.length - 1;

  return sections.map((section, index) => {
    const closing = index === closingIndex ? CLOSING_STYLE : undefined;
    const sectionKey = `${section.kind}-${index}`;

    if (section.kind === "grid") {
      const cards = section.media.map((media, cardIndex) => ({
        media,
        key: `${sectionKey}-card-${cardIndex}`,
      }));

      return (
        <section key={sectionKey} className="section-wrapper" style={closing}>
          <Reveal className="w-full">
            <div
              className="grid grid-cols-1 gap-[20px] md:grid-cols-2"
              style={ROW_STYLE}
            >
              {cards.map((card) => (
                <ProjectCard key={card.key} media={card.media} />
              ))}
            </div>
          </Reveal>
        </section>
      );
    }

    return (
      <section key={sectionKey} className="section-wrapper" style={closing}>
        <Reveal className="w-full">
          <FullMedia media={section.media} />
        </Reveal>
      </section>
    );
  });
}

/**
 * Shared detail-page template for /projects/[slug] and
 * /project/[category]/[slug].
 * The frame is React-controlled:
 *   HERO (with the existing title/category/description overlay)
 *   → repeating media sections (grid ≤4 → full → grid … until consumed)
 *   → GET IN TOUCH → FOOTER
 * The CMS / /public folder only decides which image/video lives in each
 * media item.
 */
export default function ProjectDetailPage({
  project,
}: {
  project: ProjectDetailView;
}) {
  const { sections } = project;

  return (
    <MediaLightboxProvider>
      <div className="relative w-full bg-[#000000] min-h-screen">
        {/* ================================================================
            LIGHT REGION — hero + repeating media sections
            ================================================================ */}
        <div
          className="w-full pt-[var(--section-gap)]"
          style={{ background: "#f0efed" }}
        >
          {/* -------- HERO -------- */}
          <section
            className="section-wrapper"
            style={sections.length === 0 ? CLOSING_STYLE : undefined}
          >
            <ProjectHero
              image={project.hero}
              video={project.heroVideo}
              alt={project.heroAlt}
              title={project.title}
              subtitle={project.category}
              description={project.description}
              tint={project.tint}
              viewportPlay
              interactive
            />
          </section>

          {/* -------- REPEATING MEDIA SECTIONS -------- */}
          <DetailSections sections={sections} />
        </div>

        {/* ================================================================
            DARK REGION — contact + footer (shared sections)
            ================================================================ */}
        <div className="w-full bg-[#000000] pt-[var(--section-gap)]">
          <Reveal>
            <ContactSection />
          </Reveal>
          <Reveal>
            <FooterSection />
          </Reveal>
        </div>

        {/* ================================================================
            FIXED NAV (floats over all sections with glassy backdrop blur)
            ================================================================ */}
        <SiteNav prefix="/" />
      </div>
    </MediaLightboxProvider>
  );
}
