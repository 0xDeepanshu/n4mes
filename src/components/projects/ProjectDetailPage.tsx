import ContactSection from "@/components/magnetto/ContactSection";
import FooterSection from "@/components/magnetto/FooterSection";
import Media from "@/components/magnetto/Media";
import Reveal from "@/components/magnetto/Reveal";
import SiteNav from "@/components/magnetto/SiteNav";
import type { ProjectDetailView } from "@/lib/sanity/data";

const ROW_STYLE = {
  width: "var(--section-width)",
  maxWidth: "var(--section-max-width)",
};

const CARD_RADIUS = { borderRadius: "var(--section-radius)" };

const ROW_SIZES = "(max-width: 767px) 100vw, 50vw";

function ImageBlock({
  image,
  video,
  alt,
  className,
}: {
  image: string;
  video?: string;
  alt: string;
  className: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#d9d6d1] ${className}`}
      style={CARD_RADIUS}
    >
      <Media
        image={image}
        video={video}
        alt={alt}
        sizes={ROW_SIZES}
        className="object-cover"
      />
    </div>
  );
}

function TextBlock({ text, className }: { text: string; className: string }) {
  return (
    <div
      className={`relative flex w-full items-center justify-center bg-white ${className}`}
      style={CARD_RADIUS}
    >
      <p
        style={{
          maxWidth: "76%",
          fontSize: "clamp(12px, 0.78vw, 15px)",
          lineHeight: 1.7,
          letterSpacing: "-0.003em",
          color: "#111111",
          textAlign: "center",
          fontWeight: 400,
        }}
      >
        {text}
      </p>
    </div>
  );
}

/**
 * Shared detail-page template for every /projects/[slug] route.
 * Presentation only — all copy/images come from the Project record
 * (Sanity), with the original local data as fallback.
 */
export default function ProjectDetailPage({
  project,
}: {
  project: ProjectDetailView;
}) {
  const lastSectionIndex = project.sections.length - 1;

  return (
    <div className="relative w-full bg-[#000000] min-h-screen">
      {/* ================================================================
          LIGHT REGION — hero + ordered CMS sections
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

        {/* -------- ORDERED CMS SECTIONS -------- */}
        {project.sections.map((section, index) => {
          const isLast = index === lastSectionIndex;
          const closingStyle = isLast
            ? { marginBottom: 0, paddingBottom: "var(--section-gap)" }
            : undefined;

          if (section._type === "fullWidthImageBlock") {
            return (
              <section
                key={section._key}
                className="section-wrapper"
                style={closingStyle}
              >
                <Reveal className="w-full">
                  <div className="section-container aspect-[4/3] md:aspect-[12/5]">
                    <Media
                      image={section.image}
                      video={section.video}
                      alt={section.alt}
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              </section>
            );
          }

          const textBlock = (
            <TextBlock
              text={section.text}
              className="aspect-square md:aspect-[6/5]"
            />
          );
          const imageBlock = (
            <ImageBlock
              image={section.image}
              video={section.video}
              alt={section.alt}
              className="aspect-square md:aspect-[6/5]"
            />
          );

          return (
            <section
              key={section._key}
              className="section-wrapper"
              style={closingStyle}
            >
              <Reveal>
                <div
                  className="grid grid-cols-1 gap-[20px] md:grid-cols-2"
                  style={ROW_STYLE}
                >
                  {section.side === "textRight" ? (
                    <>
                      {imageBlock}
                      {textBlock}
                    </>
                  ) : (
                    <>
                      {textBlock}
                      {imageBlock}
                    </>
                  )}
                </div>
              </Reveal>
            </section>
          );
        })}
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
