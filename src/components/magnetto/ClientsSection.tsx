import ClientsCarousel from "./ClientsCarousel";

export default function ClientsSection() {
  return (
    <section
      id="clients"
      className="relative w-full flex justify-center"
      style={{
        background: "#000000",
        paddingTop: "5px",
        paddingBottom: "40px",
      }}
    >
      {/* ================================================================
          CLIENTS CONTAINER – centered, dark, large border-radius
          ================================================================ */}
      <div
        className="relative overflow-hidden mx-auto"
        style={{
          width: "clamp(340px, 73.1vw, 1403px)",
          height: "clamp(400px, 41.1vw, 789px)",
          borderRadius: "clamp(50px, 5.73vw, 110px)",
          background: "#171717",
        }}
      >
        {/* -------- CLIENTS heading -------- */}
        <h2
          className="absolute"
          style={{
            fontFamily: "var(--font-silkscreen), monospace",
            fontSize: "clamp(32px, 3.13vw, 60px)",
            fontWeight: 400,
            letterSpacing: "0.04em",
            lineHeight: 1,
            color: "#ffffff",
            left: "clamp(30px, 3.49vw, 67px)",
            top: "clamp(100px, 11.46vw, 220px)",
          }}
        >
          CLIENTS
        </h2>

        {/* -------- Description text -------- */}
        <div
          className="absolute hidden lg:block"
          style={{
            right: "clamp(20px, 2.6vw, 50px)",
            top: "clamp(100px, 11.72vw, 225px)",
            width: "clamp(180px, 14.58vw, 280px)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(10px, 0.63vw, 12px)",
              lineHeight: 1.5,
              letterSpacing: "-0.003em",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 400,
            }}
          >
            At Magnetto, we collaborate with forward-thinking brands, startups,
            and industry leaders who dare to challenge the norm.
          </p>
        </div>

        {/* -------- Carousel row -------- */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "clamp(170px, 16.41vw, 315px)",
          }}
        >
          <ClientsCarousel />
        </div>
      </div>
    </section>
  );
}
