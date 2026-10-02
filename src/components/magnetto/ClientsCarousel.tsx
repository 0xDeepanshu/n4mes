"use client";

import { useEffect, useRef } from "react";
import ClientCard from "./ClientCard";

interface BrandItem {
  name: string;
  logo?: string;
}

const BRANDS: BrandItem[] = [
  { name: "Google" },
  { name: "N4MES", logo: "/logo-transparent.png" },
  { name: "Swiggy" },
  { name: "Oakley" },
  { name: "Wave\nStudios" },
  { name: "Meridian" },
  { name: "Nexus" },
  { name: "Prism" },
  { name: "Vertex" },
  { name: "Orbit" },
  { name: "Atlas" },
];


/** Card width + gap */
const CARD_W = 268;
const GAP = 7;
const STEP = CARD_W + GAP; // 275px per card

export default function ClientsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Speed in px per frame (~60fps → ~0.8px/frame ≈ 48px/s)
    const speed = 0.8;
    // Total width of one full set of cards
    const setWidth = BRANDS.length * STEP;

    const animate = () => {
      offsetRef.current -= speed;
      // When we've scrolled one full set, loop back seamlessly
      if (Math.abs(offsetRef.current) >= setWidth) {
        offsetRef.current += setWidth;
      }
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Render 3 copies for seamless looping
  const cards = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ gap: `${GAP}px` }}
      >
        {cards.map((brand, i) => (
          <ClientCard
            key={`${brand.name}-${i}`}
            name={brand.name}
            logo={brand.logo}
          />
        ))}
      </div>
    </div>
  );
}

