import Image from "next/image";
import AboutSection from "@/components/magnetto/AboutSection";
import ClientsSection from "@/components/magnetto/ClientsSection";
import ContactSection from "@/components/magnetto/ContactSection";
import FooterSection from "@/components/magnetto/FooterSection";
import JournalSection from "@/components/magnetto/JournalSection";
import ProjectCard from "@/components/magnetto/ProjectCard";
import Reveal from "@/components/magnetto/Reveal";
import ServicesMilestonesSection from "@/components/magnetto/ServicesMilestonesSection";

export default function Home() {
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
              backgroundImage: "url(/hero/herobg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* -------- LEFT: Logo + Subtitle (desktop) -------- */}
            <div className="absolute left-[6%] top-[50%] -translate-y-1/2 z-10 flex flex-col gap-2 hidden md:flex">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 xl:w-11 xl:h-11 flex-shrink-0">
                  <Image
                    src="/logo-transparent.png"
                    alt="N4MES Logo"
                    fill
                    className="object-contain mix-blend-multiply"
                  />
                </div>
                <h1
                  className="text-[clamp(1.8rem,3vw,3.4rem)] leading-[1] tracking-[0.08em] text-[#1a1a1a]"
                  style={{ fontFamily: "var(--font-silkscreen), monospace" }}
                >
                  N4MES
                </h1>
              </div>
              <p
                className="text-[clamp(0.55rem,0.65vw,0.72rem)] tracking-[0.32em] uppercase text-[#1a1a1a]/50 mt-1 pl-[48px] xl:pl-[56px]"
                style={{ fontFamily: "var(--font-silkscreen), monospace" }}
              >
                MAKE IT MEAN SOMETHING.
              </p>
            </div>

            {/* -------- CENTER: Logo Mark -------- */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] w-[45%] md:w-[26%] max-w-[380px] aspect-square flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/logo-transparent.png"
                  alt="N4MES Logo"
                  fill
                  priority
                  className="object-contain mix-blend-multiply"
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
                At N4MES, we make it mean something. Turning bold ideas into
                experiences that captivate, inspire, and endure.
              </p>
            </div>

            {/* -------- MOBILE: Logo overlay -------- */}
            <div className="md:hidden absolute inset-x-0 top-0 z-10 flex flex-col items-center pt-8 px-6 text-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image
                    src="/logo-transparent.png"
                    alt="N4MES Logo"
                    fill
                    className="object-contain mix-blend-multiply"
                  />
                </div>
                <h1
                  className="text-[1.8rem] leading-[1] tracking-[0.08em] text-[#1a1a1a]"
                  style={{ fontFamily: "var(--font-silkscreen), monospace" }}
                >
                  N4MES
                </h1>
              </div>
              <p
                className="text-[0.55rem] tracking-[0.32em] uppercase text-[#1a1a1a]/50"
                style={{ fontFamily: "var(--font-silkscreen), monospace" }}
              >
                MAKE IT MEAN SOMETHING.
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
            <Reveal delay={0}>
              <ProjectCard
                category=""
                title={["BRANDS"]}
                image="/project-1.jpg"
                alt="Beyond Time"
                tint="#4d140b"
                objectPosition="center 50%"
              />
            </Reveal>

            <Reveal delay={80}>
              <ProjectCard
                category=""
                title={["CAMPAIGNS"]}
                image="/project-2.jpg"
                alt="Brand Redefine"
                tint="#0b3a31"
              />
            </Reveal>

            <Reveal delay={160}>
              <ProjectCard
                category=""
                title={["CONTENT"]}
                image="/project-3.jpg"
                alt="Every Second"
                tint="#3a2a10"
              />
            </Reveal>

            <Reveal delay={240}>
              <ProjectCard
                category=""
                title={["ADVERTISING"]}
                image="/project-4.jpg"
                alt="Timeless Mastery"
                tint="#1f2328"
              />
            </Reveal>
          </div>
        </section>
      </div>

      {/* ================================================================
          ABOUT SECTION (contains the gradient transition to #000000)
          ================================================================ */}
      <Reveal>
        <AboutSection />
      </Reveal>

      {/* ================================================================
          DARK BACKGROUND REGION (#000000) - Clients, Services, Journal, Contact, Footer
          ================================================================ */}
      <div className="w-full bg-[#000000] pt-[var(--section-gap)]">
        <Reveal>
          <ClientsSection />
        </Reveal>
        <Reveal>
          <ServicesMilestonesSection />
        </Reveal>
        <Reveal>
          <JournalSection />
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
      <nav
        className="fixed bottom-[32px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-between p-[6px] pl-[8px] pr-[8px] rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        style={{
          backgroundColor: "rgba(18, 18, 18, 0.68)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          height: "60px",
        }}
      >
        {/* Nav avatar – single squircle avatar matching reference */}
        <div className="relative w-[48px] h-[48px] rounded-[20px] overflow-hidden flex-shrink-0">
          <Image
            src="/nav-avatar.jpg"
            alt="Nav Avatar"
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>

        {/* Nav links */}
        <div className="hidden sm:flex items-center px-6 gap-7 lg:gap-8">
          {["HOME", "ABOUT", "PROJECTS", "JOURNAL"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white hover:text-white/80 transition-colors whitespace-nowrap"
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "12px",
                letterSpacing: "0.08em",
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Contact button – solid white pill with CONTACT + */}
        <a
          href="#contact"
          className="flex items-center justify-center px-6 h-[48px] rounded-full bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all whitespace-nowrap"
          style={{
            fontFamily: "var(--font-silkscreen), monospace",
            fontSize: "12px",
            letterSpacing: "0.08em",
            fontWeight: 400,
          }}
        >
          CONTACT +
        </a>
      </nav>
    </div>
  );
}
