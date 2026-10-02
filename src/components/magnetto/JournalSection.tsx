import JournalCard from "./JournalCard";

const ARTICLES = [
  {
    image: "/nav-avatar.jpg",
    alt: "AI Transforming Design",
    title: "How AI Is Transforming Design in 2025",
    category: "AI DESIGN",
  },
  {
    image: "/hero-portrait.jpg",
    alt: "Choosing the Right Palette",
    title: "How to Choose the Right Palette for Your Brand",
    category: "VISUAL DESIGN",
  },
  {
    image: "/nav-avatar.jpg",
    alt: "Web Design Trends",
    title: "10 Web Design Trends That Will Dominate This Year",
    category: "TRENDS",
  },
];

export default function JournalSection() {
  return (
    <section
      id="journal"
      className="relative w-full flex justify-center"
      style={{
        background: "#000000",
        paddingTop: "5px",
        paddingBottom: "40px",
      }}
    >
      {/* ================================================================
          JOURNAL CONTAINER
          ================================================================ */}
      <div
        className="relative overflow-hidden mx-auto"
        style={{
          width: "clamp(340px, 75vw, 1440px)",
          minHeight: "clamp(460px, 38.28vw, 735px)",
          borderRadius: "clamp(50px, 5.73vw, 110px)",
          background: "#171717",
          paddingBottom: "clamp(30px, 2.6vw, 50px)",
        }}
      >
        {/* -------- JOURNAL heading -------- */}
        <h2
          className="absolute"
          style={{
            fontFamily: "var(--font-silkscreen), monospace",
            fontSize: "clamp(32px, 3.13vw, 60px)",
            fontWeight: 400,
            letterSpacing: "0.04em",
            lineHeight: 1,
            color: "#ffffff",
            left: "clamp(40px, 5.05vw, 97px)",
            top: "clamp(36px, 3.28vw, 63px)",
          }}
        >
          JOURNAL
        </h2>

        {/* -------- Description text (right-aligned) -------- */}
        <div
          className="absolute hidden lg:block"
          style={{
            left: "clamp(600px, 55.83vw, 1072px)",
            top: "clamp(36px, 3.07vw, 59px)",
            width: "clamp(180px, 14.58vw, 280px)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(10px, 0.57vw, 11px)",
              lineHeight: 1.55,
              letterSpacing: "-0.003em",
              color: "rgba(255,255,255,0.50)",
              fontWeight: 400,
            }}
          >
            Our journal is where design meets thought leadership. From industry
            trends to creative breakthroughs, we share insights that inspire,
            challenge, and push the boundaries of design.
          </p>
        </div>

        {/* -------- Article cards row -------- */}
        <div
          className="flex flex-col md:flex-row mx-auto"
          style={{
            marginTop: "clamp(120px, 9.53vw, 183px)",
            paddingLeft: "clamp(20px, 2.5vw, 48px)",
            paddingRight: "clamp(20px, 2.5vw, 48px)",
            gap: "clamp(10px, 0.78vw, 15px)",
          }}
        >
          {ARTICLES.map((article) => (
            <div key={article.category} className="flex-1">
              <JournalCard
                image={article.image}
                alt={article.alt}
                title={article.title}
                category={article.category}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
