"use client";

import { useEffect, useRef } from "react";
import { FnBLogo, GoogleLogo, HZYLogo, SGLogo, SwiggyLogo } from "./BrandLogos";
import ClientCard from "./ClientCard";

interface BrandItem {
  name: string;
  logo?: string;
  icon?: React.ReactNode;
  invert?: boolean;
}

const BRANDS: BrandItem[] = [
  { name: "Google", icon: <GoogleLogo /> },
  { name: "N4MES", logo: "/logo-transparent.png", invert: true },
  { name: "Swiggy", icon: <SwiggyLogo /> },
  { name: "HZY", icon: <HZYLogo /> },
  { name: "SG", icon: <SGLogo /> },
  { name: "JAGERMISTER", logo: "/jagermeister.svg" },
  { name: "F&B", icon: <FnBLogo /> },
];

/** Card width + gap - tuned for showing fewer, more prominent hero cards */
const CARD_W = 350;
const GAP = 18;
const STEP = CARD_W + GAP; // 368px per card

export default function ClientsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Smooth speed in px per frame (~60fps → ~0.75px/frame ≈ 45px/s)
    const speed = 0.75;
    // Total width of one full set of cards
    const setWidth = BRANDS.length * STEP;

    const animate = () => {
      offsetRef.current -= speed;
      // Loop back seamlessly when one set has scrolled
      if (Math.abs(offsetRef.current) >= setWidth) {
        offsetRef.current += setWidth;
      }
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Render 3 copies for seamless looping on any screen resolution
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
            icon={brand.icon}
            invert={brand.invert}
          />
        ))}
      </div>
    </div>
  );
}
