import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full pt-[10px] pb-[22px] flex justify-center items-center "
      style={{
        background:
          "linear-gradient(180deg, #e5e2dd 0%, #b4b2ae 18%, #6a6865 42%, #1c1b1a 72%, #000000 92%)",
      }}
    >
      {/* ================================================================
          ABOUT CONTAINER – 80% width, aspect 1536/515, radius 60px
          ================================================================ */}
      <div
        className="relative isolate mx-auto w-[92%] overflow-hidden rounded-[42px] sm:w-[88%] sm:rounded-[44px] lg:w-[80%] lg:rounded-[100px]"
        style={{ aspectRatio: "1536 / 515", minHeight: "300px" }}
      >
        {/* -------- Full-bleed orange base -------- */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, #ea8a2d 0%, #f19a3d 45%, #f6a74a 100%)",
          }}
        />

        {/* -------- Full-bleed image (multiplies into the orange) -------- */}
        <Image
          src="/hero-portrait.jpg"
          alt="About Magnetto"
          fill
          sizes="80vw"
          className="object-cover mix-blend-multiply"
          style={{ objectPosition: "50% 34%" }}
        />

        {/* -------- Glass panel -------- */}
        <div
          className="absolute z-[2] flex h-[clamp(88px,8.33vw,160px)] items-center justify-between overflow-hidden border border-white/45 left-1/2 top-[40%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-[26px] px-[18px] sm:w-[70%] sm:px-[26px] lg:left-[9.83%] lg:top-[35.73%] lg:w-[55%] lg:translate-x-0 lg:translate-y-0 lg:rounded-[30px] lg:px-[37px]"
          style={{
            background: "rgba(0, 0, 0, 0.30)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Left label */}
          <span
            className="whitespace-nowrap uppercase"
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "clamp(9px, 0.55vw, 11px)",
              letterSpacing: "0.06em",
              color: "#ffffff",
            }}
          >
            ABOUT <span style={{ color: "rgba(255,255,255,0.7)" }}>US.25</span>
          </span>

          {/* Right label */}
          <span
            className="whitespace-nowrap"
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "clamp(34px, 3.2vw, 62px)",
              letterSpacing: "0.02em",
              lineHeight: 1,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            ABOUT
          </span>
        </div>

        {/* -------- Right-side paragraph -------- */}
        <div className="absolute z-[2] left-[7%] top-[64%] w-[86%] lg:left-[71.35%] lg:top-[42.7%] lg:w-[17.58%]">
          <p
            className="font-medium"
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(11px, 0.62vw, 12px)",
              lineHeight: 1.38,
              letterSpacing: "-0.003em",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            At Magnetto, we craft designs that don&apos;t just look
            stunning—they create impact. Blending creativity with strategy, we
            transform ideas into immersive digital experiences that captivate,
            engage, and convert.
          </p>
        </div>
      </div>
    </section>
  );
}
