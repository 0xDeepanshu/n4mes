import Image from "next/image";

export type ProjectCardProps = {
  /** Small uppercase eyebrow, e.g. "ART DIRECTION" */
  category: string;
  /** Title lines, one entry per rendered line */
  title: string[];
  /** Temporary image – will be swapped for the real project artwork */
  image: string;
  alt: string;
  /** Fallback tint so the card still reads correctly behind transparent artwork */
  tint: string;
  /** Optional object-position tweak for the artwork */
  objectPosition?: string;
  /** Renders the "Explore More +" affordance */
  explore?: boolean;
};

export default function ProjectCard({
  category,
  title,
  image,
  alt,
  tint,
  objectPosition = "center",
  explore = false,
}: ProjectCardProps) {
  return (
    <article
      className="relative w-full overflow-hidden rounded-[clamp(18px,2.1vw,40px)]"
      style={{ aspectRatio: "1 / 1.05", backgroundColor: tint }}
    >
      {/* -------- Artwork (fills the whole card) -------- */}
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 767px) 100vw, 50vw"
        className="object-cover"
        style={{ objectPosition }}
      />

      {/* -------- Legibility gradient -------- */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.30)_0%,rgba(0,0,0,0.06)_46%,rgba(0,0,0,0.36)_100%)]" />

      {/* -------- Centered information panel -------- */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-[5%]">
        <div className="flex min-h-[clamp(168px,14.5vw,272px)] w-[72%] max-w-[500px] min-w-[214px] flex-col items-center justify-center gap-[clamp(9px,1vw,18px)] rounded-[clamp(16px,1.7vw,32px)] border border-white/10 bg-[linear-gradient(155deg,rgba(8,8,8,0.64)_0%,rgba(8,8,8,0.32)_100%)] px-[clamp(16px,2.6vw,46px)] py-[clamp(22px,2.6vw,46px)] text-center backdrop-blur-[10px] sm:w-[60%] md:w-[52%]">
          <span className="font-pixel text-[clamp(0.56rem,0.66vw,0.76rem)] leading-none uppercase tracking-[0.3em] text-white/65">
            {category}
          </span>

          <h3 className="font-pixel text-[clamp(1.25rem,2.3vw,2.6rem)] leading-[1.22] tracking-[0.05em] text-white">
            {title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>

          {explore ? (
            <a
              href="#projects"
              className="mt-[2px] inline-flex items-center gap-[0.9em] font-pixel text-[clamp(0.6rem,0.7vw,0.8rem)] tracking-[0.16em] whitespace-nowrap text-white/85 transition-colors hover:text-white"
            >
              Explore More
              <span aria-hidden="true">+</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
