import Image from "next/image";
import ProjectCard from "@/components/magnetto/ProjectCard";
import AboutSection from "@/components/magnetto/AboutSection";
import ClientsSection from "@/components/magnetto/ClientsSection";
import ServicesMilestonesSection from "@/components/magnetto/ServicesMilestonesSection";
import JournalSection from "@/components/magnetto/JournalSection";
import ContactSection from "@/components/magnetto/ContactSection";
import FooterSection from "@/components/magnetto/FooterSection";

export default function Home() {
  return (
    <div className="relative w-full bg-[#e5e2dd]">
      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <div
        className="relative h-screen w-full flex items-center justify-center"
        style={{ padding: "10px" }}
      >
        <section className="relative w-full h-full bg-[#eae7e3] rounded-[22px] overflow-hidden">
          {/* -------- LEFT: Logo + Subtitle (desktop) -------- */}
          <div className="absolute left-[5.5%] top-[48%] -translate-y-1/2 z-10 flex-col gap-4 hidden md:flex">
            <h1
              className="text-[clamp(2rem,3.8vw,4rem)] leading-[1] tracking-[0.08em] text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-silkscreen), monospace" }}
            >
              MAGNETTO
            </h1>
            <p
              className="text-[clamp(0.55rem,0.68vw,0.72rem)] tracking-[0.32em] uppercase text-[#1a1a1a]/50 mt-1"
              style={{ fontFamily: "var(--font-silkscreen), monospace" }}
            >
              Design Studio · London
            </p>
          </div>

          {/* -------- CENTER: Portrait -------- */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 md:-translate-x-[48%] z-[5] w-[75%] md:w-[35%] min-w-[260px] max-w-[550px] h-[70%] md:h-[93%]">
            <Image
              src="/hero-portrait.jpg"
              alt="Portrait"
              fill
              priority
              className="object-cover object-top mix-blend-multiply"
              sizes="(max-width: 768px) 75vw, 35vw"
            />
          </div>

          {/* -------- RIGHT: Description (desktop) -------- */}
          <div className="absolute right-[5%] top-[36%] z-10 w-[185px] xl:w-[200px] hidden md:block">
            <p
              className="text-[clamp(0.66rem,0.72vw,0.76rem)] leading-[1.72] text-[#1a1a1a]/55 font-normal tracking-[0.005em]"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
              }}
            >
              At Magnetto, we break boundaries to craft designs that stand out
              and deliver results. We blend creativity with strategy, turning
              bold ideas into digital experiences that captivate and inspire.
            </p>
          </div>

          {/* -------- MOBILE: Logo overlay -------- */}
          <div className="md:hidden absolute inset-x-0 top-0 z-10 flex flex-col items-center pt-8 px-6 text-center">
            <h1
              className="text-[2rem] leading-[1] tracking-[0.08em] text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-silkscreen), monospace" }}
            >
              MAGNETTO
            </h1>
            <p
              className="text-[0.55rem] tracking-[0.32em] uppercase text-[#1a1a1a]/50 mt-3"
              style={{ fontFamily: "var(--font-silkscreen), monospace" }}
            >
              Design Studio · London
            </p>
          </div>
        </section>
      </div>

      {/* ================================================================
          PROJECTS SECTION
          ================================================================ */}
      <section id="projects" className="w-full px-[10px] pb-[10px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          <ProjectCard
            category="Art Direction"
            title={["BEYOND TIME"]}
            image="/nav-avatar.jpg"
            alt="Beyond Time"
            tint="#4d140b"
            objectPosition="center 30%"
          />

          <ProjectCard
            category="Brand Identity"
            title={["BRAND", "REDEFINE"]}
            image="/globe.svg"
            alt="Brand Redefine"
            tint="#0b3a31"
            explore
          />

          <ProjectCard
            category="Ad Campaign"
            title={["EVERY SECOND"]}
            image="/window.svg"
            alt="Every Second"
            tint="#3a2a10"
            explore
          />

          <ProjectCard
            category="Art Direction"
            title={["TIMELESS", "MASTERY"]}
            image="/file.svg"
            alt="Timeless Mastery"
            tint="#1f2328"
          />
        </div>
      </section>

      {/* ================================================================
          ABOUT SECTION
          ================================================================ */}
      <AboutSection />

      {/* ================================================================
          CLIENTS SECTION
          ================================================================ */}
      <ClientsSection />

      {/* ================================================================
          SERVICES + MILESTONES SECTION
          ================================================================ */}
      <ServicesMilestonesSection />

      {/* ================================================================
          JOURNAL SECTION
          ================================================================ */}
      <JournalSection />

      {/* ================================================================
          CONTACT SECTION
          ================================================================ */}
      <ContactSection />

      {/* ================================================================
          FOOTER SECTION
          ================================================================ */}
      <FooterSection />

      {/* ================================================================
          FIXED NAV (floats over all sections)
          ================================================================ */}
      <nav className="fixed bottom-[24px] left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#1a1a1a]/85 backdrop-blur-xl rounded-full pl-[6px] pr-[6px] py-[6px]">
        {/* Nav avatar – two overlapping circles */}
        <div className="flex items-center -space-x-[10px]">
          <div className="w-[42px] h-[42px] rounded-full overflow-hidden flex-shrink-0 border-2 border-[#1a1a1a] z-[2]">
            <Image
              src="/nav-avatar.jpg"
              alt="Avatar 1"
              width={42}
              height={42}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-[42px] h-[42px] rounded-full overflow-hidden flex-shrink-0 border-2 border-[#1a1a1a] z-[1]">
            <Image
              src="/hero-portrait.jpg"
              alt="Avatar 2"
              width={42}
              height={42}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden sm:flex items-center ml-3">
          {["HOME", "ABOUT", "PROJECTS", "JOURNAL"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-[14px] py-[8px] text-white/55 hover:text-white transition-colors whitespace-nowrap"
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "8px",
                letterSpacing: "0.1em",
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Contact button */}
        <a
          href="#contact"
          className="ml-2 mr-[2px] flex items-center gap-[5px] px-[20px] py-[8px] rounded-full border border-white/15 text-white/70 hover:bg-white/10 transition-colors bg-white/5 whitespace-nowrap"
          style={{
            fontFamily: "var(--font-silkscreen), monospace",
            fontSize: "8px",
            letterSpacing: "0.1em",
          }}
        >
          CONTACT
          <span className="text-[7px]">→</span>
        </a>
      </nav>
    </div>
  );
}
