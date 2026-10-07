import Image from "next/image";

type AboutHeroProps = {
  heading?: string;
  tagline?: string;
  paragraph?: string;
  imageSrc?: string;
};

const DEFAULT_PARAGRAPH =
  "At Magnetto, we craft designs that don't just look stunning—they create impact. Blending creativity with strategy, we transform ideas into immersive digital experiences that captivate, engage, and convert.";

export default function AboutHero({
  heading = "ABOUT",
  tagline = "MAGNETTO · 25",
  paragraph = DEFAULT_PARAGRAPH,
  imageSrc = "/about-hero.jpg",
}: AboutHeroProps) {
  return (
    <section id="about" className="section-wrapper">
      <div className="section-container hero-container relative overflow-hidden">
        {/* Full-bleed hero portrait */}
        <Image
          src={imageSrc}
          alt="About Magnetto"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 30%" }}
        />

        {/* ==============================================================
            LEFT: ABOUT Heading + MAGNETTO · 25
            ============================================================== */}
        <div className="absolute left-[clamp(24px,4.5vw,90px)] top-[50%] -translate-y-1/2 z-10 flex flex-col">
          <h1
            className="text-white"
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "clamp(38px, 5.2vw, 84px)",
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            {heading}
          </h1>
          <span
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "clamp(10px, 0.72vw, 13px)",
              letterSpacing: "0.12em",
              color: "rgba(255, 255, 255, 0.95)",
              marginTop: "clamp(12px, 1.2vw, 20px)",
            }}
          >
            {tagline}
          </span>
        </div>

        {/* ==============================================================
            RIGHT: Descriptive paragraph
            ============================================================== */}
        <div className="absolute right-[clamp(24px,4.5vw,90px)] top-[50%] -translate-y-1/2 z-10 w-[clamp(240px,20vw,340px)] hidden md:block">
          <p
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(11px, 0.68vw, 13px)",
              lineHeight: 1.55,
              letterSpacing: "-0.003em",
              color: "rgba(255, 255, 255, 0.95)",
              fontWeight: 400,
            }}
          >
            {paragraph}
          </p>
        </div>

        {/* ==============================================================
            MOBILE PARAGRAPH (Shown below on small viewports)
            ============================================================== */}
        <div className="absolute left-[24px] right-[24px] bottom-[100px] z-10 md:hidden">
          <p
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "12px",
              lineHeight: 1.5,
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            {paragraph}
          </p>
        </div>

        {/* ==============================================================
            BOTTOM-RIGHT: Indicator badge matching reference
            ============================================================== */}
        <div className="absolute bottom-[clamp(24px,2.8vw,36px)] right-[clamp(24px,3.2vw,48px)] z-20 hidden sm:flex items-center justify-between w-[96px] h-[52px] rounded-[14px] bg-black/85 border border-white/15 backdrop-blur-md px-3.5 py-2">
          <div className="flex flex-col gap-1">
            <span className="w-[26px] h-[3px] bg-[#fbbf24] rounded-full" />
            <span className="w-[14px] h-[2px] bg-white/30 rounded-full" />
          </div>
          <span
            className="text-white font-light text-[26px] leading-none select-none"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            04
          </span>
        </div>
      </div>
    </section>
  );
}
