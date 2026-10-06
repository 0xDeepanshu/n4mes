"use client";

import { useEffect, useRef } from "react";
import type { ClientLogoPreset } from "@/types/sanity";
import { FnBLogo, GoogleLogo, HZYLogo, SGLogo, SwiggyLogo } from "./BrandLogos";
import ClientCard from "./ClientCard";

export interface CarouselClient {
  name: string;
  logo?: string;
  logoPreset?: ClientLogoPreset | null;
  invert?: boolean;
  link?: string;
}

const DEFAULT_CLIENTS: CarouselClient[] = [
  { name: "Google", logoPreset: "google" },
  { name: "N4MES", logo: "/logo-transparent.png", invert: true },
  { name: "Swiggy", logoPreset: "swiggy" },
  { name: "HZY", logoPreset: "hzy" },
  { name: "SG", logoPreset: "sg" },
  { name: "JAGERMISTER", logo: "/jagermeister.svg" },
  { name: "F&B", logoPreset: "fnb" },
];

function presetIcon(preset: ClientLogoPreset) {
  switch (preset) {
    case "google":
      return <GoogleLogo />;
    case "swiggy":
      return <SwiggyLogo />;
    case "sg":
      return <SGLogo />;
    case "hzy":
      return <HZYLogo />;
    case "fnb":
      return <FnBLogo />;
    default:
      return null;
  }
}

/** Card width + gap - tuned for showing fewer, more prominent hero cards */
const CARD_W = 350;
const GAP = 18;
const STEP = CARD_W + GAP; // 368px per card

export default function ClientsCarousel({
  items = DEFAULT_CLIENTS,
}: {
  items?: CarouselClient[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const itemCount = items.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Smooth speed in px per frame (~60fps → ~0.75px/frame ≈ 45px/s)
    const speed = 0.75;
    // Total width of one full set of cards
    const setWidth = itemCount * STEP;

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
  }, [itemCount]);

  // Render 3 copies for seamless looping on any screen resolution
  const cards = [...items, ...items, ...items];

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
            icon={brand.logoPreset ? presetIcon(brand.logoPreset) : undefined}
            invert={brand.invert}
            link={brand.link}
          />
        ))}
      </div>
    </div>
  );
}
