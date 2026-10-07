import ContactSection from "@/components/magnetto/ContactSection";
import FooterSection from "@/components/magnetto/FooterSection";
import ProjectCard from "@/components/magnetto/ProjectCard";
import Reveal from "@/components/magnetto/Reveal";
import SiteNav from "@/components/magnetto/SiteNav";
import { MediaLightboxProvider } from "@/components/media/MediaLightbox";
import type { CategoryView, HomeProjectCard } from "@/lib/sanity/data";
import ProjectHero from "./ProjectHero";

const GRID_STYLE = {
  width: "var(--section-width)",
  maxWidth: "var(--section-max-width)",
};

/**
 * Category / listing page — /project/[category] (ONE component for all
 * six home entries). The layout is FIXED and React-controlled:
 *   HERO (with title/subtitle/description overlay)
 *   → 2×2 grid of this category's PROJECT cards (each card links to
 *     /project/[category]/[project], which renders the existing
 *     ProjectDetailPage template).
 * Sanity only decides the content and which media fills each slot.
 */
export default function CategoryPage({
  category,
  cards,
}: {
  category: CategoryView;
  cards: HomeProjectCard[];
}) {
  return (
    <MediaLightboxProvider>
      <div className="relative w-full bg-[#000000] min-h-screen">
        {/* ================================================================
            LIGHT REGION — hero + category card grid
            ================================================================ */}
        <div
          className="w-full pt-[var(--section-gap)]"
          style={{ background: "#f0efed" }}
        >
          {/* -------- HERO -------- */}
          <section className="section-wrapper">
            <ProjectHero
              image={category.hero}
              video={category.heroVideo}
              alt={category.heroAlt}
              title={category.title}
              subtitle={category.subtitle}
              description={category.description}
              tint={category.tint}
            />
          </section>

          {/* -------- PROJECT CARDS — this category's projects, fixed 2-col grid -------- */}
          <section
            className="section-wrapper"
            style={{ marginBottom: 0, paddingBottom: "var(--section-gap)" }}
          >
            <div
              className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-[20px]"
              style={GRID_STYLE}
            >
              {cards.map((card, index) => (
                <Reveal key={card.href} delay={index * 80}>
                  <ProjectCard
                    category={card.category}
                    title={card.title}
                    image={card.image}
                    alt={card.alt}
                    video={card.video}
                    tint={card.tint}
                    href={card.href}
                  />
                </Reveal>
              ))}
            </div>
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
    </MediaLightboxProvider>
  );
}
