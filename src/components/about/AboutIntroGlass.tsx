import Image from "next/image";

type AboutIntroGlassProps = {
  tagline?: string;
  heading?: string;
  paragraph?: string;
  imageSrc?: string;
};

const DEFAULT_PARAGRAPH =
  "A detail-driven designer passionate about crafting compelling brand identities and seamless digital experiences. With a keen eye for aesthetics and functionality, I help brands establish a strong visual presence and enhance their digital footprint.";

export default function AboutIntroGlass({
  tagline = "ABOUT US.23",
  heading = "ABOUT",
  paragraph = DEFAULT_PARAGRAPH,
  imageSrc = "/about-hero.jpg",
}: AboutIntroGlassProps) {
  return (
    <section className="section-wrapper">
      <div
        className="section-container relative isolate flex items-center justify-center overflow-hidden"
        style={{
          aspectRatio: "1880 / 640",
          minHeight: "440px",
        }}
      >
        {/* Full-bleed background image */}
        <Image
          src={imageSrc}
          alt="About Us"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 36%" }}
        />

        {/* ==============================================================
            CENTERED GLASS CARD matching Screenshot 2
            ============================================================== */}
        <div
          className="relative z-10 flex w-[90%] md:w-[68%] max-w-[1140px] items-center justify-between gap-4 md:gap-8 overflow-hidden border border-white/40 px-[clamp(20px,3.5vw,60px)] py-[clamp(24px,2.5vw,40px)]"
          style={{
            minHeight: "clamp(130px, 13.5vw, 230px)",
            borderRadius: "clamp(32px, 3.8vw, 64px)",
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(24px) saturate(140%)",
            WebkitBackdropFilter: "blur(24px) saturate(140%)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          }}
        >
          {/* Left Column: ABOUT US.23 */}
          <div className="flex-1 flex justify-start">
            <span
              className="whitespace-nowrap uppercase text-white"
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "clamp(9px, 0.65vw, 12px)",
                letterSpacing: "0.08em",
              }}
            >
              {tagline}
            </span>
          </div>

          {/* Center Column: ABOUT */}
          <div className="flex-1 flex justify-center">
            <h2
              className="whitespace-nowrap text-white text-center"
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "clamp(32px, 3.8vw, 68px)",
                letterSpacing: "0.04em",
                lineHeight: 1,
                fontWeight: 700,
              }}
            >
              {heading}
            </h2>
          </div>

          {/* Right Column: Paragraph */}
          <div className="flex-1 hidden md:flex justify-end">
            <p
              className="max-w-[clamp(200px,18vw,280px)] text-right md:text-left text-white"
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: "clamp(10px, 0.62vw, 12px)",
                lineHeight: 1.5,
                letterSpacing: "-0.003em",
                fontWeight: 400,
              }}
            >
              {paragraph}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
