import Image from "next/image";
import ContactSection from "@/components/magnetto/ContactSection";
import FooterSection from "@/components/magnetto/FooterSection";
import Reveal from "@/components/magnetto/Reveal";
import type { Project, ProjectImage } from "@/data/projects";

const ROW_STYLE = {
  width: "var(--section-width)",
  maxWidth: "var(--section-max-width)",
};

const CARD_RADIUS = { borderRadius: "var(--section-radius)" };

const ROW_SIZES = "(max-width: 767px) 100vw, 50vw";

function ImageBlock({
  image,
  className,
}: {
  image: ProjectImage;
  className: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#d9d6d1] ${className}`}
      style={CARD_RADIUS}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
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
 * Presentation only — all copy/images come from the Project record.
 */
export default function ProjectDetailPage({ project }: { project: Project }) {
  const [row1Image, row2Image, row3Image] = project.rowImages;
  const [feature1, feature2] = project.features;

  return (
    <div className="relative w-full bg-[#000000] min-h-screen">
      {/* ================================================================
          LIGHT REGION — hero + alternating image/text rows
          ================================================================ */}
      <div
        className="w-full pt-[var(--section-gap)]"
        style={{ background: "#f0efed" }}
      >
        {/* -------- HERO -------- */}
        <section className="section-wrapper">
          <Reveal className="w-full">
            <div className="section-container aspect-[4/5] md:aspect-[12/5]">
              <Image
                src={project.hero.src}
                alt={project.hero.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
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

        {/* -------- ROW 1: text + image -------- */}
        <section className="section-wrapper">
          <Reveal>
            <div
              className="grid grid-cols-1 gap-[20px] md:grid-cols-2"
              style={ROW_STYLE}
            >
              <TextBlock
                text={project.textBlocks[0]}
                className="aspect-square md:aspect-[6/5]"
              />
              <ImageBlock
                image={row1Image}
                className="aspect-square md:aspect-[6/5]"
              />
            </div>
          </Reveal>
        </section>

        {/* -------- FEATURE 1: full-width image -------- */}
        <section className="section-wrapper">
          <Reveal className="w-full">
            <div className="section-container aspect-[4/3] md:aspect-[12/5]">
              <Image
                src={feature1.src}
                alt={feature1.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </section>

        {/* -------- ROW 2: image + text -------- */}
        <section className="section-wrapper">
          <Reveal>
            <div
              className="grid grid-cols-1 gap-[20px] md:grid-cols-2"
              style={ROW_STYLE}
            >
              <ImageBlock
                image={row2Image}
                className="aspect-square md:aspect-[6/5]"
              />
              <TextBlock
                text={project.textBlocks[1]}
                className="aspect-square md:aspect-[6/5]"
              />
            </div>
          </Reveal>
        </section>

        {/* -------- FEATURE 2: full-width image -------- */}
        <section className="section-wrapper">
          <Reveal className="w-full">
            <div className="section-container aspect-[4/3] md:aspect-[12/5]">
              <Image
                src={feature2.src}
                alt={feature2.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </section>

        {/* -------- ROW 3: text + image -------- */}
        <section
          className="section-wrapper"
          style={{ marginBottom: 0, paddingBottom: "var(--section-gap)" }}
        >
          <Reveal>
            <div
              className="grid grid-cols-1 gap-[20px] md:grid-cols-2"
              style={ROW_STYLE}
            >
              <TextBlock
                text={project.textBlocks[2]}
                className="aspect-square md:aspect-[6/5]"
              />
              <ImageBlock
                image={row3Image}
                className="aspect-square md:aspect-[6/5]"
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
      <nav
        className="fixed bottom-[32px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-between p-[6px] pl-[8px] pr-[8px] rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        style={{
          backgroundColor: "rgba(18, 18, 18, 0.68)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          height: "60px",
        }}
      >
        {/* Nav avatar – single squircle avatar matching reference */}
        <div className="relative w-[48px] h-[48px] rounded-[20px] overflow-hidden flex-shrink-0">
          <Image
            src="/nav-avatar.jpg"
            alt="Nav Avatar"
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>

        {/* Nav links — back to the home sections */}
        <div className="hidden sm:flex items-center px-6 gap-7 lg:gap-8">
          {[
            { label: "HOME", href: "/#home" },
            { label: "ABOUT", href: "/#about" },
            { label: "PROJECTS", href: "/#projects" },
            { label: "JOURNAL", href: "/#journal" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white hover:text-white/80 transition-colors whitespace-nowrap"
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "12px",
                letterSpacing: "0.08em",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Contact button – solid white pill with CONTACT + */}
        <a
          href="/#contact"
          className="flex items-center justify-center px-6 h-[48px] rounded-full bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all whitespace-nowrap"
          style={{
            fontFamily: "var(--font-silkscreen), monospace",
            fontSize: "12px",
            letterSpacing: "0.08em",
            fontWeight: 400,
          }}
        >
          CONTACT +
        </a>
      </nav>
    </div>
  );
}
