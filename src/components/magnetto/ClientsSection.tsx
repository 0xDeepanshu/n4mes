import ClientsCarousel, { type CarouselClient } from "./ClientsCarousel";

const DEFAULT_HEADING = "CLIENTS";
const DEFAULT_DESCRIPTION =
  "At N4MES, we collaborate with forward-thinking brands, startups, and leaders who dare to challenge the norm and make it mean something.";

type ClientsSectionProps = {
  heading?: string;
  description?: string;
  clients?: CarouselClient[];
};

export default function ClientsSection({
  heading = DEFAULT_HEADING,
  description = DEFAULT_DESCRIPTION,
  clients,
}: ClientsSectionProps) {
  return (
    <section id="clients" className="section-wrapper">
      {/* ================================================================
          CLIENTS CONTAINER – shared container, dark, 100px border-radius
          ================================================================ */}
      <div
        className="section-container relative"
        style={{
          height: "clamp(500px, 54.17vw, 1040px)",
          background: "#171717",
        }}
      >
        {/* -------- CLIENTS heading -------- */}
        <h2
          className="absolute"
          style={{
            fontFamily: "var(--font-silkscreen), monospace",
            fontSize: "clamp(32px, 3.6vw, 64px)",
            fontWeight: 400,
            letterSpacing: "0.04em",
            lineHeight: 1,
            color: "#ffffff",
            left: "clamp(40px, 4.5vw, 80px)",
            top: "clamp(80px, 17vw, 326px)",
          }}
        >
          {heading}
        </h2>

        {/* -------- Description text -------- */}
        <div
          className="absolute hidden md:block"
          style={{
            right: "clamp(40px, 4.5vw, 80px)",
            top: "clamp(80px, 17vw, 326px)",
            width: "clamp(220px, 18vw, 320px)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(11px, 0.65vw, 13px)",
              lineHeight: 1.5,
              letterSpacing: "-0.003em",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 400,
            }}
          >
            {description}
          </p>
        </div>

        {/* -------- Carousel row -------- */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "clamp(180px, 23.5vw, 452px)",
          }}
        >
          <ClientsCarousel items={clients} />
        </div>
      </div>
    </section>
  );
}
