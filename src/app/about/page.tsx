import type { Metadata } from "next";
import AboutClients from "@/components/about/AboutClients";
import AboutHero from "@/components/about/AboutHero";
import AboutIntroGlass from "@/components/about/AboutIntroGlass";
import AboutMilestones from "@/components/about/AboutMilestones";
import ContactSection from "@/components/magnetto/ContactSection";
import FooterSection from "@/components/magnetto/FooterSection";
import Reveal from "@/components/magnetto/Reveal";
import SiteNav from "@/components/magnetto/SiteNav";
import { getHomePage, getSiteSettings } from "@/lib/sanity/data";
import { imgSrcOr } from "@/lib/sanity/image";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = "ABOUT — MAGNETTO";
  const description =
    "At Magnetto, we craft designs that don't just look stunning—they create impact. Blending creativity with strategy, we transform ideas into immersive digital experiences that captivate, engage, and convert.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: settings?.seoOgImage
        ? [{ url: imgSrcOr(settings.seoOgImage, "/about-hero.jpg", 1200) }]
        : [{ url: "/about-hero.jpg" }],
    },
  };
}

export default async function AboutPage() {
  const [home] = await Promise.all([getHomePage()]);

  const aboutImage = imgSrcOr(home?.aboutImage, "/about-hero.jpg", 2000);

  return (
    <div className="relative w-full bg-[#000000] min-h-screen">
      {/* ================================================================
          LIGHT REGION (#e5e2dd) — Sections 1 to 4
          ================================================================ */}
      <div className="w-full bg-[#e5e2dd] pt-[var(--section-gap)] pb-[var(--section-gap)]">
        {/* 1. ABOUT HERO */}
        <AboutHero
          heading="ABOUT"
          tagline="MAGNETTO · 25"
          paragraph={
            home?.aboutParagraph ??
            "At Magnetto, we craft designs that don't just look stunning—they create impact. Blending creativity with strategy, we transform ideas into immersive digital experiences that captivate, engage, and convert."
          }
          imageSrc={aboutImage}
        />

        {/* 2. ABOUT INTRO / GLASS CONTENT CARD */}
        <Reveal>
          <AboutIntroGlass
            tagline="ABOUT US.23"
            heading="ABOUT"
            paragraph={
              "A detail-driven designer passionate about crafting compelling brand identities and seamless digital experiences. With a keen eye for aesthetics and functionality, I help brands establish a strong visual presence and enhance their digital footprint."
            }
            imageSrc={aboutImage}
          />
        </Reveal>

        {/* 3. CLIENTS (3×2 Grid = 6 Cards) */}
        <Reveal>
          <AboutClients
            heading={home?.clientsHeading ?? "CLIENTS"}
            description={
              home?.clientsDescription ??
              "We collaborate with industry leaders, innovative startups, and global enterprises to deliver exceptional solutions. Our clients trust us to bring their vision to life with precision, creativity, and expertise."
            }
          />
        </Reveal>

        {/* 4. MILESTONES / STATS (Left 47+, Right 7+ and 24+) */}
        <Reveal>
          <AboutMilestones
            milestonesHeading="MILESTONES"
            stat1Number="47+"
            stat1Paragraph="We take pride in delivering 47 projects with precision, creativity, and efficiency. Each project showcases our expertise and dedication to excellence."
            stat2Number="7+"
            stat2Label="Extensive Industry Experience"
            stat3Number="24+"
            stat3Label="Satisfied Clients"
          />
        </Reveal>
      </div>

      {/* ================================================================
          DARK REGION (#000000) — Sections 5 and 6
          ================================================================ */}
      <div className="w-full bg-[#000000] pt-[var(--section-gap)]">
        {/* 5. GET IN TOUCH */}
        <Reveal>
          <ContactSection />
        </Reveal>

        {/* 6. FOOTER */}
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>

      {/* ================================================================
          FLOATING PILL NAVIGATION
          ================================================================ */}
      <SiteNav prefix="/" currentPath="/about" />
    </div>
  );
}
