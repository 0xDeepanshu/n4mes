import ServicesCardStack from "./ServicesCardStack";

export default function ServicesMilestonesSection() {
  return (
    <section id="services-milestones" className="section-wrapper">
      {/* Two-column layout – shared width, two equal-width cards */}
      <div
        className="flex flex-col lg:flex-row mx-auto"
        style={{
          gap: "20px",
          width: "var(--section-width)",
          maxWidth: "var(--section-max-width)",
        }}
      >

        {/* ==============================================================
            LEFT CARD — SERVICES
            ============================================================== */}
        <div
          className="relative flex-1 flex flex-col items-center overflow-hidden"
          style={{
            minHeight: "clamp(460px, 48.5vw, 930px)",
            borderRadius: "var(--section-radius)",
            background: "#171717",
          }}
        >

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "clamp(22px, 1.77vw, 34px)",
              fontWeight: 400,
              letterSpacing: "0.06em",
              lineHeight: 1,
              color: "#ffffff",
              marginTop: "clamp(60px, 12.43vw, 239px)",
              textAlign: "center",
            }}
          >
            MUSIC
          </h2>

          {/* Card stack */}
          <div
            style={{
              marginTop: "clamp(20px, 2.08vw, 40px)",
            }}
          >
            <ServicesCardStack />
          </div>

          {/* Pill: 04 UI/UX */}
          <div
            className="flex items-center justify-center"
            style={{
              marginTop: "clamp(14px, 1.3vw, 25px)",
              paddingLeft: "clamp(12px, 1vw, 18px)",
              paddingRight: "clamp(12px, 1vw, 18px)",
              paddingTop: "clamp(5px, 0.42vw, 8px)",
              paddingBottom: "clamp(5px, 0.42vw, 8px)",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "clamp(7px, 0.52vw, 10px)",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              04 UI/UX
            </span>
          </div>

          {/* Description */}
          <p
            className="text-center"
            style={{
              marginTop: "clamp(12px, 1.04vw, 20px)",
              maxWidth: "clamp(240px, 20.83vw, 400px)",
              paddingLeft: "20px",
              paddingRight: "20px",
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(9px, 0.57vw, 11px)",
              lineHeight: 1.55,
              letterSpacing: "-0.003em",
              color: "rgba(255,255,255,0.45)",
              fontWeight: 400,
            }}
          >
            we believe every experience should be built on substance and
            purpose. Our craft blends strategic intuition with timeless
            execution, making sure every project means something lasting.
          </p>
        </div>

        {/* ==============================================================
            RIGHT CARD — PHILOSOPHY (Idea-first, no fake numbers)
            ============================================================== */}
        <div
          className="relative flex-1 flex flex-col items-center overflow-hidden"
          style={{
            minHeight: "clamp(460px, 48.5vw, 930px)",
            borderRadius: "var(--section-radius)",
            background: "#171717",
          }}
        >

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "clamp(22px, 1.77vw, 34px)",
              fontWeight: 400,
              letterSpacing: "0.06em",
              lineHeight: 1,
              color: "#ffffff",
              marginTop: "clamp(60px, 12.43vw, 239px)",
              textAlign: "center",
            }}
          >
            PHILOSOPHY
          </h2>

          {/* Pillar 1: IDEA FIRST */}
          <div
            className="flex flex-col items-center text-center px-4"
            style={{ marginTop: "clamp(30px, 6.6vw, 127px)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "clamp(26px, 2.6vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "#ffffff",
                letterSpacing: "0.04em",
              }}
            >
              IDEA FIRST
            </span>
            <span
              className="italic"
              style={{
                marginTop: "clamp(8px, 0.6vw, 12px)",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(11px, 0.72vw, 14px)",
                color: "rgba(255,255,255,0.50)",
                letterSpacing: "0.01em",
              }}
            >
              Concept Drives Form
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "clamp(200px, 18.23vw, 350px)",
              height: "1px",
              background: "rgba(255,255,255,0.10)",
              marginTop: "clamp(18px, 3.13vw, 60px)",
              marginBottom: "clamp(18px, 3.13vw, 60px)",
            }}
          />

          {/* Pillar 2: MEANING */}
          <div className="flex flex-col items-center text-center px-4">
            <span
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "clamp(26px, 2.6vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "#ffffff",
                letterSpacing: "0.04em",
              }}
            >
              MEANING
            </span>
            <span
              className="italic"
              style={{
                marginTop: "clamp(8px, 0.6vw, 12px)",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(11px, 0.72vw, 14px)",
                color: "rgba(255,255,255,0.50)",
                letterSpacing: "0.01em",
              }}
            >
              Make It Mean Something
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
