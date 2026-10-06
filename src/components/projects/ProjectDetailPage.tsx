import ContactSection from "@/components/magnetto/ContactSection";
import FooterSection from "@/components/magnetto/FooterSection";
import Media from "@/components/magnetto/Media";
import Reveal from "@/components/magnetto/Reveal";
import SiteNav from "@/components/magnetto/SiteNav";
import type { ProjectDetailView, ProjectMediaView } from "@/lib/sanity/data";

const ROW_STYLE = {
  width: "var(--section-width)",
  maxWidth: "var(--section-max-width)",
  marginInline: "auto",
};

const CARD_RADIUS = { borderRadius: "var(--section-radius)" };

const ROW_SIZES = "(max-width: 767px) 100vw, 50vw";

/**
 * One fixed card slot of the 2×2 grid.
 * The container dimensions are defined by the design (never by the media);
 * the image/video simply fills it with object-fit: cover. When a slot has no
 * media yet, the container keeps its size and shows the design's fallback
 * background color.
 */
function ProjectCard({ media }: { media: ProjectMediaView }) {
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
      />
    </div>
  );
}

/**
 * Shared detail-page template for every /projects/[slug] route.
 * The layout is FIXED and React-controlled:
 *   HERO (with the existing title/category/description overlay)
 *   → 4 media cards (2×2 grid)
 *   → closing full-width media banner
 *   → GET IN TOUCH → FOOTER
 * Sanity only decides which image/video lives inside each slot.
 */
export default function ProjectDetailPage({
  project,
}: {
  project: ProjectDetailView;
}) {
  return (
    <div className="relative w-full bg-[#000000] min-h-screen">
      {/* ================================================================
          LIGHT REGION — hero + fixed media layout
          ================================================================ */}
      <div
        className="w-full pt-[var(--section-gap)]"
        style={{ background: "#f0efed" }}
      >
        {/* -------- HERO -------- */}
        <section className="section-wrapper">
          <Reveal className="w-full">
            <div className="section-container aspect-[4/5] md:aspect-[12/5]">
              <Media
                image={project.hero}
                video={project.heroVideo}
                alt={project.heroAlt}
                sizes="100vw"
                className="object-cover"
                priority
              />

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
                  {project.title}
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
                  {project.category}
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
                  {project.description}
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* -------- 4 MEDIA CARDS — fixed 2×2 grid -------- */}
        <section className="section-wrapper">
          <Reveal className="w-full">
            <div
              className="grid grid-cols-1 gap-[20px] md:grid-cols-2"
              style={ROW_STYLE}
            >
              <ProjectCard key="card-1" media={project.cards[0]} />
              <ProjectCard key="card-2" media={project.cards[1]} />
              <ProjectCard key="card-3" media={project.cards[2]} />
              <ProjectCard key="card-4" media={project.cards[3]} />
            </div>
          </Reveal>
        </section>

        {/* -------- CLOSING FULL-WIDTH BANNER -------- */}
        <section
          className="section-wrapper"
          style={{ marginBottom: 0, paddingBottom: "var(--section-gap)" }}
        >
          <Reveal className="w-full">
            <div className="section-container aspect-[4/3] md:aspect-[12/5]">
              <Media
                image={project.closingBanner.image}
                video={project.closingBanner.video}
                alt={project.closingBanner.alt}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </section>
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
  );
}
