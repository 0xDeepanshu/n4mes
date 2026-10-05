import Image from "next/image";

export default function ContactSection() {
  return (
    <section id="contact" className="section-wrapper">
      {/* ================================================================
          CONTACT CONTAINER – shared container, 100px radius
          ================================================================ */}
      <div
        className="section-container relative"
        style={{
          height: "clamp(500px, 54.17vw, 1040px)",
        }}
      >
        {/* -------- Full-bleed background image -------- */}
        <Image
          src="/contact-bg.jpg"
          alt="Contact background"
          fill
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "50% 50%" }}
        />

        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(110deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.50) 100%)",
          }}
        />

        {/* -------- LEFT: GET IN TOUCH + description -------- */}
        <div
          className="absolute z-[2] hidden lg:block"
          style={{
            left: "clamp(40px, 6vw, 100px)",
            top: "clamp(140px, 24.35vw, 468px)",
            width: "clamp(340px, 32vw, 600px)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "clamp(32px, 3.6vw, 60px)",
              fontWeight: 400,
              letterSpacing: "0.05em",
              lineHeight: 1.1,
              color: "#ffffff",
            }}
          >
            GET IN TOUCH
          </h2>

          <p
            style={{
              marginTop: "clamp(12px, 1.2vw, 22px)",
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(11px, 0.65vw, 13px)",
              lineHeight: 1.55,
              letterSpacing: "-0.003em",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 400,
              maxWidth: "clamp(300px, 28vw, 550px)",
            }}
          >
            Have a project in mind? Whether you&apos;re launching a brand,
            designing a product, or elevating your digital presence, we&apos;re
            here to bring your vision to life.
          </p>
        </div>

        {/* Mobile: heading above form */}
        <div className="absolute z-[2] lg:hidden top-[24px] left-[24px] right-[24px]">
          <h2
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "26px",
              fontWeight: 400,
              letterSpacing: "0.05em",
              lineHeight: 1.1,
              color: "#ffffff",
            }}
          >
            GET IN TOUCH
          </h2>
        </div>

        {/* -------- RIGHT: Contact form glass panel -------- */}
        <div
          className="absolute z-[2] left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0"
          style={{
            top: "clamp(90px, 19.66vw, 378px)",
            width: "clamp(320px, 29vw, 560px)",
            borderRadius: "40px",
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.20)",
            padding:
              "clamp(24px, 2vw, 38px) clamp(24px, 2vw, 38px) clamp(20px, 1.8vw, 32px)",
            right: "clamp(40px, 5vw, 90px)",
          }}
        >

          {/* "CONTACT US.25" label */}
          <div className="flex justify-center" style={{ marginBottom: "clamp(14px, 1.3vw, 25px)" }}>
            <span
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "clamp(7px, 0.47vw, 9px)",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.60)",
                textTransform: "uppercase",
              }}
            >
              CONTACT US.25
            </span>
          </div>

          {/* Row 1: First name / Last name */}
          <div className="flex gap-[clamp(8px,0.73vw,14px)]" style={{ marginBottom: "clamp(6px, 0.52vw, 10px)" }}>
            <div className="flex-1 flex flex-col">
              <label
                style={{
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  fontSize: "clamp(8px, 0.47vw, 9px)",
                  color: "rgba(255,255,255,0.50)",
                  marginBottom: "clamp(4px, 0.31vw, 6px)",
                  letterSpacing: "0.01em",
                }}
              >
                First name
              </label>
              <input
                type="text"
                placeholder="Jane"
                className="outline-none"
                style={{
                  width: "100%",
                  height: "clamp(28px, 1.82vw, 35px)",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(0,0,0,0.25)",
                  padding: "0 clamp(8px, 0.63vw, 12px)",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  fontSize: "clamp(9px, 0.52vw, 10px)",
                  color: "rgba(255,255,255,0.70)",
                  letterSpacing: "0.005em",
                }}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label
                style={{
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  fontSize: "clamp(8px, 0.47vw, 9px)",
                  color: "rgba(255,255,255,0.50)",
                  marginBottom: "clamp(4px, 0.31vw, 6px)",
                  letterSpacing: "0.01em",
                }}
              >
                Last name
              </label>
              <input
                type="text"
                placeholder="Smith"
                className="outline-none"
                style={{
                  width: "100%",
                  height: "clamp(28px, 1.82vw, 35px)",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(0,0,0,0.25)",
                  padding: "0 clamp(8px, 0.63vw, 12px)",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  fontSize: "clamp(9px, 0.52vw, 10px)",
                  color: "rgba(255,255,255,0.70)",
                  letterSpacing: "0.005em",
                }}
              />
            </div>
          </div>

          {/* Row 2: Email / Phone no. */}
          <div className="flex gap-[clamp(8px,0.73vw,14px)]" style={{ marginBottom: "clamp(14px, 1.3vw, 25px)" }}>
            <div className="flex-1 flex flex-col">
              <label
                style={{
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  fontSize: "clamp(8px, 0.47vw, 9px)",
                  color: "rgba(255,255,255,0.50)",
                  marginBottom: "clamp(4px, 0.31vw, 6px)",
                  letterSpacing: "0.01em",
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="jane@framer.com"
                className="outline-none"
                style={{
                  width: "100%",
                  height: "clamp(28px, 1.82vw, 35px)",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(0,0,0,0.25)",
                  padding: "0 clamp(8px, 0.63vw, 12px)",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  fontSize: "clamp(9px, 0.52vw, 10px)",
                  color: "rgba(255,255,255,0.70)",
                  letterSpacing: "0.005em",
                }}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label
                style={{
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  fontSize: "clamp(8px, 0.47vw, 9px)",
                  color: "rgba(255,255,255,0.50)",
                  marginBottom: "clamp(4px, 0.31vw, 6px)",
                  letterSpacing: "0.01em",
                }}
              >
                Phone no.
              </label>
              <input
                type="tel"
                placeholder="(347) 000 0000"
                className="outline-none"
                style={{
                  width: "100%",
                  height: "clamp(28px, 1.82vw, 35px)",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(0,0,0,0.25)",
                  padding: "0 clamp(8px, 0.63vw, 12px)",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  fontSize: "clamp(9px, 0.52vw, 10px)",
                  color: "rgba(255,255,255,0.70)",
                  letterSpacing: "0.005em",
                }}
              />
            </div>
          </div>

          {/* SUBMIT button */}
          <button
            type="button"
            className="w-full cursor-pointer"
            style={{
              height: "clamp(26px, 1.61vw, 31px)",
              borderRadius: "999px",
              background: "#ffffff",
              border: "none",
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "clamp(8px, 0.47vw, 9px)",
              letterSpacing: "0.10em",
              color: "#000000",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </section>
  );
}
