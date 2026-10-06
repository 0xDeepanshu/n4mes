import Image from "next/image";
import AboutSection from "@/components/magnetto/AboutSection";
import ClientsSection from "@/components/magnetto/ClientsSection";
import ContactSection from "@/components/magnetto/ContactSection";
import FooterSection from "@/components/magnetto/FooterSection";
import JournalSection from "@/components/magnetto/JournalSection";
import ProjectCard from "@/components/magnetto/ProjectCard";
import Reveal from "@/components/magnetto/Reveal";
import ServicesMilestonesSection from "@/components/magnetto/ServicesMilestonesSection";
import SiteNav from "@/components/magnetto/SiteNav";
import {
  getHomePage,
  getHomeProjectCards,
  getSiteSettings,
} from "@/lib/sanity/data";
import { imgSrcOr } from "@/lib/sanity/image";

export default async function Home() {
  const [home, settings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);
  const projectCards = await getHomeProjectCards();

  const heroLogo = imgSrcOr(
    home?.heroLogo ?? settings?.logo,
    "/logo-transparent.png",
    512,
  );
  const heroLogoAlt =
    home?.heroLogo?.alt ?? settings?.logo?.alt ?? "N4MES Logo";
  const heroBackground = imgSrcOr(
    home?.heroBackground,
    "/hero/herobg.png",
    2000,
  );
  const heroBackgroundVideo = home?.heroBackgroundVideo?.asset?.url;
  const heroHeading = home?.heroHeading ?? "N4MES";
  const heroTagline = home?.heroTagline ?? "MAKE IT MEAN SOMETHING.";
  const heroDescription =
    home?.heroDescription ??
    "At N4MES, we make it mean something. Turning bold ideas into experiences that captivate, inspire, and endure.";

  const clients = home?.clientCards?.map((client) => {
    const logo = imgSrcOr(client.logoImage, "", 400) || undefined;
    return {
      name: client.name,
      logo: client.logoMode === "preset" ? undefined : logo,
      logoPreset: client.logoMode === "preset" ? client.logoPreset : undefined,
      invert: client.invert,
      link: client.link,
    };
  });

  const journalPosts = home?.journalPosts?.flatMap((post) => {
    const image = imgSrcOr(post.image, "", 900) || undefined;
    if (!image) return [];
    return [
      {
        image,
        alt: post.image?.alt ?? post.title,
        title: post.title,
      },
    ];
  });

  const servicesCards = home?.servicesCards?.flatMap((card) => {
    const src = imgSrcOr(card.image, "", 600) || undefined;
    if (!src) return [];
    return [
      {
        src,
        video: card.video?.asset?.url,
        alt: card.image?.alt ?? "",
        bg: card.tint ?? "transparent",
      },
    ];
  });

  return (
    <div className="relative w-full bg-[#000000] min-h-screen">
      {/* ================================================================
          LIGHT BACKGROUND REGION (#e5e2dd) - Hero & Projects
          ================================================================ */}
      <div className="w-full bg-[#e5e2dd] pt-[var(--section-gap)]">
        {/* HERO SECTION */}
        <section id="home" className="section-wrapper">
          <div
            className="section-container hero-container relative"
            style={{
              backgroundImage: `url(${heroBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Optional CMS background video (image above stays as poster) */}
            {heroBackgroundVideo && (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={heroBackgroundVideo}
                poster={heroBackground}
                autoPlay
                muted
                loop
                playsInline
                aria-label={heroHeading}
              />
            )}

            {/* -------- LEFT: Logo + Subtitle (desktop) -------- */}
            <div className="absolute left-[6%] top-[50%] -translate-y-1/2 z-10 flex flex-col gap-2 hidden md:flex">
              <div className="flex items-center gap-3">
                <h1
                  className="text-[clamp(1.8rem,3vw,3.4rem)] leading-[1] tracking-[0.08em] text-white"
                  style={{ fontFamily: "var(--font-silkscreen), monospace" }}
                >
                  {heroHeading}
                </h1>
              </div>
              <p
                className="text-[clamp(0.55rem,0.65vw,0.72rem)] tracking-[0.32em] uppercase text-[#1a1a1a]/50 mt-1 pl-[48px] xl:pl-[56px]"
                style={{ fontFamily: "var(--font-silkscreen), monospace" }}
              >
                {heroTagline}
              </p>
            </div>

            {/* -------- CENTER: Logo Mark -------- */}
            <div className="absolute bottom-0 left-1/2 z-[5] aspect-square w-[45%] max-w-[380px] -translate-x-1/2 md:w-[26%]">
              <div className="relative h-full w-full">
                <Image
                  src="/Logo/logowhite.png"
                  alt={heroLogoAlt}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 45vw, 26vw"
                />
              </div>
            </div>

            {/* -------- RIGHT: Description (desktop) -------- */}
            <div className="absolute right-[6%] top-[50%] -translate-y-1/2 z-10 w-[200px] xl:w-[220px] hidden md:block">
              <p
                className="text-[clamp(0.68rem,0.72vw,0.78rem)] leading-[1.65] text-[#1a1a1a]/60 font-normal tracking-[0.005em]"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontStyle: "italic",
                }}
              >
                {heroDescription}
              </p>
            </div>

            {/* -------- MOBILE: Logo overlay -------- */}
            <div className="md:hidden absolute inset-x-0 top-0 z-10 flex flex-col items-center pt-8 px-6 text-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image
                    src={heroLogo}
                    alt={heroLogoAlt}
                    fill
                    className="object-contain mix-blend-multiply"
                  />
                </div>
                <h1
                  className="text-[1.8rem] leading-[1] tracking-[0.08em] text-[#1a1a1a]"
                  style={{ fontFamily: "var(--font-silkscreen), monospace" }}
                >
                  {heroHeading}
                </h1>
              </div>
              <p
                className="text-[0.55rem] tracking-[0.32em] uppercase text-[#1a1a1a]/50"
                style={{ fontFamily: "var(--font-silkscreen), monospace" }}
              >
                {heroTagline}
              </p>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section
          id="projects"
          className="section-wrapper"
          style={{ marginBottom: 0, paddingBottom: "var(--section-gap)" }}
        >
          <div
            className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-[20px]"
            style={{
              width: "var(--section-width)",
              maxWidth: "var(--section-max-width)",
            }}
          >
            {home?.projectsHeading && (
              <h2
                className="font-pixel text-[#1a1a1a] md:col-span-2"
                style={{
                  fontSize: "clamp(22px, 1.77vw, 34px)",
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  lineHeight: 1,
                }}
              >
                {home.projectsHeading}
              </h2>
            )}
            {projectCards.map((card, index) => (
              <Reveal key={card.href} delay={index * 80}>
                <ProjectCard
                  category={card.category}
                  title={card.title}
                  image={card.image}
                  alt={card.alt}
                  video={card.video}
                  tint={card.tint}
                  href={card.href}
                />
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      {/* ================================================================
          ABOUT SECTION (contains the gradient transition to #000000)
          ================================================================ */}
      <Reveal>
        <AboutSection
          paragraph={home?.aboutParagraph}
          image={home?.aboutImage}
        />
      </Reveal>

      {/* ================================================================
          DARK BACKGROUND REGION (#000000) - Clients, Services, Journal, Contact, Footer
          ================================================================ */}
      <div className="w-full bg-[#000000] pt-[var(--section-gap)]">
        <Reveal>
          <ClientsSection
            heading={home?.clientsHeading}
            description={home?.clientsDescription}
            clients={clients?.length ? clients : undefined}
          />
        </Reveal>
        <Reveal>
          <ServicesMilestonesSection
            servicesTitle={home?.servicesTitle}
            servicesPill={home?.servicesPill}
            servicesDescription={home?.servicesDescription}
            servicesCards={servicesCards?.length ? servicesCards : undefined}
            milestonesHeading={home?.milestonesHeading}
            milestones={home?.milestones?.length ? home.milestones : undefined}
          />
        </Reveal>
        <Reveal>
          <JournalSection
            heading={home?.journalHeading}
            description={home?.journalDescription}
            posts={journalPosts?.length ? journalPosts : undefined}
          />
        </Reveal>
        <Reveal>
          <ContactSection />
        </Reveal>
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>

      {/* ================================================================
          FIXED NAV (floats over all sections with glassy backdrop blur)
          ================================================================ */}
      <SiteNav />
    </div>
  );
}
