"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Media from "./Media";

export type ProjectCardProps = {
  /** Small uppercase eyebrow, e.g. "ART DIRECTION" */
  category: string;
  /** Title lines, one entry per rendered line */
  title: string[];
  /** Temporary image – will be swapped for the real project artwork */
  image: string;
  alt: string;
  /** Optional video that plays over the image (muted, looping) */
  video?: string;
  /** Fallback tint so the card still reads correctly behind transparent artwork */
  tint: string;
  /** Optional object-position tweak for the artwork */
  objectPosition?: string;
  /** Detail route this card navigates to, e.g. "/projects/brands" */
  href: string;
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Shared hover transition – ~450ms smooth ease-out */
const HOVER: { duration: number; ease: [number, number, number, number] } = {
  duration: 0.45,
  ease: EASE_OUT,
};

/** Same timing, nudged so the CTA reads as part of the same motion */
const CTA_HOVER: {
  duration: number;
  ease: [number, number, number, number];
  delay: number;
} = { duration: 0.45, ease: EASE_OUT, delay: 0.06 };

const cardVariants = { rest: {}, hover: {} };

const textVariants = { rest: { y: 0 }, hover: { y: -24 } };

const artworkVariants = { rest: { scale: 1 }, hover: { scale: 1.02 } };

const ctaVariants = {
  rest: { opacity: 0, y: 14, x: "-50%" },
  hover: { opacity: 1, y: 0, x: "-50%" },
};

/** Hover is a pointer affordance only – never trigger it on touch devices. */
function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return canHover;
}

export default function ProjectCard({
  category,
  title,
  image,
  alt,
  video,
  tint,
  objectPosition = "center",
  href,
}: ProjectCardProps) {
  const canHover = useCanHover();

  return (
    <motion.article
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "1 / 1",
        backgroundColor: tint,
        borderRadius: "100px",
      }}
      variants={cardVariants}
      initial="rest"
      animate="rest"
      whileHover={canHover ? "hover" : undefined}
    >
      {/* -------- Artwork (fills the whole card) -------- */}
      <motion.div
        className="absolute inset-0"
        variants={artworkVariants}
        transition={HOVER}
      >
        <Media
          image={image}
          video={video}
          alt={alt}
          sizes="(max-width: 767px) 100vw, 50vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </motion.div>

      {/* -------- Legibility gradient -------- */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.30)_0%,rgba(0,0,0,0.06)_46%,rgba(0,0,0,0.36)_100%)]" />

      {/* -------- Stretched link: whole card navigates to the detail page -------- */}
      <Link
        href={href}
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 z-20"
      />

      {/* -------- Centered information panel -------- */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-[5%]">
        <div className="flex min-h-[clamp(180px,16vw,300px)] w-[75%] max-w-[520px] min-w-[220px] flex-col items-center justify-center gap-[clamp(10px,1.2vw,20px)] rounded-[40px] border border-white/10 bg-[linear-gradient(155deg,rgba(8,8,8,0.64)_0%,rgba(8,8,8,0.32)_100%)] px-[clamp(20px,3vw,52px)] py-[clamp(24px,3vw,52px)] text-center backdrop-blur-[12px] sm:w-[62%] md:w-[54%]">
          <motion.div
            className="relative flex flex-col items-center gap-[clamp(10px,1.2vw,20px)]"
            variants={textVariants}
            transition={HOVER}
          >
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

            <motion.a
              href={href}
              className="absolute left-1/2 inline-flex items-center gap-[0.9em] font-pixel text-[clamp(0.6rem,0.7vw,0.8rem)] tracking-[0.16em] whitespace-nowrap text-white/85 transition-colors hover:text-white"
              style={{ top: "calc(100% + 14px)" }}
              variants={ctaVariants}
              transition={CTA_HOVER}
            >
              Explore More
              <span aria-hidden="true">+</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
