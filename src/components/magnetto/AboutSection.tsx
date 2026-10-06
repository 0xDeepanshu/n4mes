import Image from "next/image";
import { imgSrcOr } from "@/lib/sanity/image";
import type { SanityImage } from "@/types/sanity";

const DEFAULT_PARAGRAPH =
  "At N4MES, we make it mean something. We believe design must carry purpose, turning bold ideas into experiences that captivate, engage, and endure.";

type AboutSectionProps = {
  paragraph?: string;
  image?: SanityImage;
};

export default function AboutSection({
  paragraph = DEFAULT_PARAGRAPH,
  image,
}: AboutSectionProps) {
  const imageSrc = imgSrcOr(image, "/hero-portrait.jpg", 2000);
  const imageAlt = image?.alt ?? "About N4MES";
  return (
    <section
      id="about"
      className="section-wrapper w-full"
      style={{
        background:
          "linear-gradient(180deg, #e5e2dd 0%, #b4b2ae 18%, #6a6865 42%, #1c1b1a 72%, #000000 92%)",
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
        marginBottom: 0,
      }}
    >
      {/* ================================================================
          ABOUT CONTAINER – shared container, 100px radius
          ================================================================ */}
      <div
        className="section-container relative isolate"
        style={{ aspectRatio: "1880 / 620", minHeight: "420px" }}
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
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover mix-blend-multiply"
          style={{ objectPosition: "50% 34%" }}
        />

        {/* -------- Glass panel -------- */}
        <div
          className="absolute z-[2] flex h-[clamp(80px,8vw,150px)] items-center justify-between overflow-hidden border border-white/40 left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[88%] rounded-[28px] px-[24px] md:left-[36%] md:top-[50%] md:w-[52%] md:rounded-[40px] md:px-[42px]"
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
              fontSize: "clamp(9px, 0.58vw, 11px)",
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
              fontSize: "clamp(28px, 3.2vw, 56px)",
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
        <div className="absolute z-[2] hidden md:block right-[5%] top-[50%] -translate-y-1/2 w-[22%] max-w-[280px]">
          <p
            className="font-medium"
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(10px, 0.62vw, 12px)",
              lineHeight: 1.45,
              letterSpacing: "-0.003em",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            {paragraph}
          </p>
        </div>
      </div>
    </section>
  );
}
