type AboutMilestonesProps = {
  milestonesHeading?: string;
  stat1Number?: string;
  stat1Paragraph?: string;
  stat2Number?: string;
  stat2Label?: string;
  stat3Number?: string;
  stat3Label?: string;
};

const DEFAULT_STAT1_PARAGRAPH =
  "We take pride in delivering 47 projects with precision, creativity, and efficiency. Each project showcases our expertise and dedication to excellence.";

export default function AboutMilestones({
  milestonesHeading = "MILESTONES",
  stat1Number = "47+",
  stat1Paragraph = DEFAULT_STAT1_PARAGRAPH,
  stat2Number = "7+",
  stat2Label = "Extensive Industry Experience",
  stat3Number = "24+",
  stat3Label = "Satisfied Clients",
}: AboutMilestonesProps) {
  return (
    <section id="milestones" className="section-wrapper">
      <div
        className="flex flex-col lg:flex-row mx-auto"
        style={{
          gap: "20px",
          width: "var(--section-width)",
          maxWidth: "var(--section-max-width)",
          minHeight: "clamp(520px, 48vw, 760px)",
        }}
      >
        {/* ==============================================================
            LEFT CARD: MILESTONES (47+)
            ============================================================== */}
        <div
          className="relative flex-1 flex flex-col items-center justify-between text-center bg-white overflow-hidden py-[clamp(44px,5.5vw,90px)] px-[clamp(24px,3.5vw,60px)]"
          style={{
            borderRadius: "var(--section-radius)",
            minHeight: "clamp(460px, 46vw, 720px)",
          }}
        >
          {/* Top: Heading */}
          <h3
            className="text-black"
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "clamp(16px, 1.4vw, 24px)",
              letterSpacing: "0.06em",
              lineHeight: 1,
              fontWeight: 400,
            }}
          >
            {milestonesHeading}
          </h3>

          {/* Center: Large Pixel Number 47+ */}
          <div
            className="select-none my-6"
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "clamp(72px, 8.8vw, 150px)",
              lineHeight: 1,
              color: "#c0c0c0",
              letterSpacing: "0.02em",
              fontWeight: 400,
            }}
          >
            {stat1Number}
          </div>

          {/* Bottom: Description Paragraph */}
          <p
            className="text-black/65 max-w-[clamp(240px,22vw,360px)]"
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(11px, 0.65vw, 13px)",
              lineHeight: 1.55,
              letterSpacing: "-0.003em",
              fontWeight: 400,
            }}
          >
            {stat1Paragraph}
          </p>
        </div>

        {/* ==============================================================
            RIGHT COLUMN: TWO STACKED STAT CARDS (7+ & 24+)
            ============================================================== */}
        <div
          className="flex-1 flex flex-col"
          style={{
            gap: "20px",
          }}
        >
          {/* Right Top Card: 7+ */}
          <div
            className="flex-1 flex flex-col items-center justify-center text-center bg-white px-6 py-[clamp(32px,4vw,60px)]"
            style={{
              borderRadius: "clamp(36px, 4.5vw, 80px)",
              minHeight: "clamp(220px, 22vw, 350px)",
            }}
          >
            <div
              className="select-none"
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "clamp(55px, 6.5vw, 110px)",
                lineHeight: 1,
                color: "#c0c0c0",
                letterSpacing: "0.02em",
                fontWeight: 400,
                marginBottom: "clamp(10px, 1vw, 18px)",
              }}
            >
              {stat2Number}
            </div>
            <p
              className="text-black/65"
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: "clamp(11px, 0.68vw, 13px)",
                letterSpacing: "-0.003em",
                fontWeight: 400,
              }}
            >
              {stat2Label}
            </p>
          </div>

          {/* Right Bottom Card: 24+ */}
          <div
            className="flex-1 flex flex-col items-center justify-center text-center bg-white px-6 py-[clamp(32px,4vw,60px)]"
            style={{
              borderRadius: "clamp(36px, 4.5vw, 80px)",
              minHeight: "clamp(220px, 22vw, 350px)",
            }}
          >
            <div
              className="select-none"
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "clamp(55px, 6.5vw, 110px)",
                lineHeight: 1,
                color: "#c0c0c0",
                letterSpacing: "0.02em",
                fontWeight: 400,
                marginBottom: "clamp(10px, 1vw, 18px)",
              }}
            >
              {stat3Number}
            </div>
            <p
              className="text-black/65"
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: "clamp(11px, 0.68vw, 13px)",
                letterSpacing: "-0.003em",
                fontWeight: 400,
              }}
            >
              {stat3Label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
