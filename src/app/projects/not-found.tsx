import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#000000] px-6 text-center">
      <p
        className="font-pixel text-white/40"
        style={{
          fontSize: "clamp(10px, 0.85vw, 16px)",
          letterSpacing: "0.25em",
          marginBottom: "clamp(12px, 1vw, 20px)",
        }}
      >
        ERROR 404
      </p>

      <h1
        className="font-pixel text-white"
        style={{
          fontSize: "clamp(28px, 4vw, 76px)",
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: "0.04em",
        }}
      >
        PROJECT NOT FOUND
      </h1>

      <p
        style={{
          marginTop: "clamp(14px, 1.2vw, 24px)",
          maxWidth: "420px",
          fontSize: "clamp(12px, 0.78vw, 15px)",
          lineHeight: 1.7,
          letterSpacing: "-0.003em",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        The project you are looking for does not exist or has been moved. Head
        back to the projects grid to find what you were after.
      </p>

      <Link
        href="/#projects"
        className="flex items-center justify-center whitespace-nowrap"
        style={{
          marginTop: "clamp(20px, 1.8vw, 36px)",
          height: "48px",
          padding: "0 28px",
          borderRadius: "999px",
          background: "#ffffff",
          color: "#000000",
          fontFamily: "var(--font-silkscreen), monospace",
          fontSize: "12px",
          letterSpacing: "0.08em",
          fontWeight: 400,
        }}
      >
        BACK TO PROJECTS
      </Link>
    </div>
  );
}
