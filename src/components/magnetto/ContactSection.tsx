import Image from "next/image";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full flex justify-center"
      style={{
        background: "#000000",
        paddingTop: "15px",
        paddingBottom: "40px",
      }}
    >
      {/* ================================================================
          CONTACT CONTAINER – full-bleed image background
          ================================================================ */}
      <div
        className="relative overflow-hidden mx-auto"
        style={{
          width: "clamp(340px, 75vw, 1440px)",
          height: "clamp(380px, 31.25vw, 600px)",
          borderRadius: "clamp(50px, 5.47vw, 105px)",
        }}
      >
        {/* -------- Full-bleed background image -------- */}
        <Image
          src="/nav-avatar.jpg"
          alt="Contact background"
          fill
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "50% 30%" }}
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
            left: "clamp(40px, 8.68vw, 167px)",
            top: "clamp(150px, 14.06vw, 270px)",
            width: "clamp(340px, 29.69vw, 570px)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "clamp(28px, 2.6vw, 50px)",
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
              marginTop: "clamp(10px, 0.94vw, 18px)",
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(10px, 0.57vw, 11px)",
              lineHeight: 1.55,
              letterSpacing: "-0.003em",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 400,
              maxWidth: "clamp(300px, 28.65vw, 550px)",
            }}
          >
            Have a project in mind? Whether you&apos;re launching a brand,
            designing a product, or elevating your digital presence, we&apos;re
            here to bring your vision to life.
          </p>
        </div>

        {/* Mobile: heading above form */}
        <div className="absolute z-[2] lg:hidden top-[20px] left-[24px] right-[24px]">
          <h2
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "24px",
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
            top: "clamp(80px, 7.92vw, 152px)",
            width: "clamp(300px, 28.13vw, 540px)",
            borderRadius: "clamp(18px, 1.67vw, 32px)",
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.20)",
            padding:
              "clamp(20px, 1.82vw, 35px) clamp(22px, 1.82vw, 35px) clamp(18px, 1.56vw, 30px)",
            right: "clamp(30px, 3.28vw, 63px)",
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
