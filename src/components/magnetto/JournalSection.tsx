import JournalCard from "./JournalCard";

const ARTICLES = [
  {
    image: "/project-1.jpg",
    alt: "AI Transforming Design",
    title: "How AI Is Transforming Design in 2025",
    category: "AI DESIGN",
  },
  {
    image: "/project-2.jpg",
    alt: "Choosing the Right Palette",
    title: "How to Choose the Right Palette for Your Brand",
    category: "VISUAL DESIGN",
  },
  {
    image: "/project-3.jpg",
    alt: "Web Design Trends",
    title: "10 Web Design Trends That Will Dominate This Year",
    category: "TRENDS",
  },
];

export default function JournalSection() {
  return (
    <section id="journal" className="section-wrapper">
      {/* ================================================================
          JOURNAL CONTAINER – shared container, 100px radius
          ================================================================ */}
      <div
        className="section-container relative"
        style={{
          minHeight: "clamp(500px, 40vw, 735px)",
          background: "#171717",
          paddingBottom: "clamp(30px, 3vw, 50px)",
        }}
      >

        {/* -------- JOURNAL heading -------- */}
        <h2
          className="absolute"
          style={{
            fontFamily: "var(--font-silkscreen), monospace",
            fontSize: "clamp(32px, 3.6vw, 64px)",
            fontWeight: 400,
            letterSpacing: "0.04em",
            lineHeight: 1,
            color: "#ffffff",
            left: "clamp(40px, 4.5vw, 80px)",
            top: "clamp(40px, 4vw, 70px)",
          }}
        >
          JOURNAL
        </h2>

        {/* -------- Description text (right-aligned) -------- */}
        <div
          className="absolute hidden md:block"
          style={{
            right: "clamp(40px, 4.5vw, 80px)",
            top: "clamp(40px, 4vw, 70px)",
            width: "clamp(220px, 20vw, 320px)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(11px, 0.65vw, 13px)",
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
            marginTop: "clamp(130px, 11vw, 200px)",
            paddingLeft: "clamp(30px, 3.5vw, 60px)",
            paddingRight: "clamp(30px, 3.5vw, 60px)",
            gap: "clamp(12px, 1.2vw, 20px)",
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
