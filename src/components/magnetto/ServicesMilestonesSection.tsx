import ServicesCardStack from "./ServicesCardStack";

export default function ServicesMilestonesSection() {
  return (
    <section
      id="services-milestones"
      className="relative w-full flex justify-center"
      style={{
        background: "#000000",
        paddingTop: "5px",
        paddingBottom: "40px",
      }}
    >
      {/* Two-column layout – centred, equal-width cards */}
      <div
        className="flex flex-col lg:flex-row mx-auto"
        style={{
          gap: "7px",
          width: "clamp(340px, 74.95vw, 1439px)",
        }}
      >
        {/* ==============================================================
            LEFT CARD — SERVICES
            ============================================================== */}
        <div
          className="relative flex-1 flex flex-col items-center overflow-hidden"
          style={{
            minHeight: "clamp(400px, 31.2vw, 599px)",
            borderRadius: "clamp(50px, 5.73vw, 110px)",
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
              marginTop: "clamp(60px, 5.63vw, 108px)",
              textAlign: "center",
            }}
          >
            SERVICES
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
            we craft digital experiences that elevate brands and engage
            audiences. Our services blend creativity with strategy, ensuring
            every design is not just visually striking but also results-driven.
          </p>
        </div>

        {/* ==============================================================
            RIGHT CARD — MILESTONES
            ============================================================== */}
        <div
          className="relative flex-1 flex flex-col items-center overflow-hidden"
          style={{
            minHeight: "clamp(400px, 31.2vw, 599px)",
            borderRadius: "clamp(50px, 5.73vw, 110px)",
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
              marginTop: "clamp(60px, 5.63vw, 108px)",
              textAlign: "center",
            }}
          >
            MILESTONES
          </h2>

          {/* Milestone 1: 7+ */}
          <div
            className="flex flex-col items-center"
            style={{ marginTop: "clamp(30px, 3.13vw, 60px)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "clamp(46px, 4.17vw, 80px)",
                fontWeight: 700,
                lineHeight: 1,
                color: "#ffffff",
                letterSpacing: "0.02em",
              }}
            >
              7+
            </span>
            <span
              className="italic"
              style={{
                marginTop: "clamp(6px, 0.52vw, 10px)",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(10px, 0.63vw, 12px)",
                color: "rgba(255,255,255,0.50)",
                letterSpacing: "0.01em",
              }}
            >
              Extensive Industry Experience
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "clamp(200px, 18.23vw, 350px)",
              height: "1px",
              background: "rgba(255,255,255,0.10)",
              marginTop: "clamp(18px, 1.56vw, 30px)",
              marginBottom: "clamp(18px, 1.56vw, 30px)",
            }}
          />

          {/* Milestone 2: 24+ */}
          <div className="flex flex-col items-center">
            <span
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "clamp(46px, 4.17vw, 80px)",
                fontWeight: 700,
                lineHeight: 1,
                color: "#ffffff",
                letterSpacing: "0.02em",
              }}
            >
              24+
            </span>
            <span
              className="italic"
              style={{
                marginTop: "clamp(6px, 0.52vw, 10px)",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(10px, 0.63vw, 12px)",
                color: "rgba(255,255,255,0.50)",
                letterSpacing: "0.01em",
              }}
            >
              Projects Completed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
