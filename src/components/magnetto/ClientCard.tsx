"use client";

import Image from "next/image";
import type React from "react";

interface ClientCardProps {
  name: string;
  logo?: string;
  icon?: React.ReactNode;
  invert?: boolean;
}

export default function ClientCard({
  name,
  logo,
  icon,
  invert = false,
}: ClientCardProps) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center relative overflow-hidden"
      style={{
        width: "268px",
        height: "262px",
        borderRadius: "60px",
        background: "#292929",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.04)",
      }}
    >
      {icon ? (
        <div className="flex items-center justify-center">{icon}</div>
      ) : logo ? (
        <div className="relative w-[130px] h-[95px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <Image
            src={logo}
            alt={name}
            fill
            className={`object-contain ${invert ? "filter invert opacity-85" : "opacity-90"
              }`}
          />
        </div>
      ) : (
        <span
          className="select-none text-center whitespace-pre-line group-hover:text-white/70 transition-colors"
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: name.length > 8 ? "15px" : "19px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            lineHeight: 1.3,
          }}
        >
          {name}
        </span>
      )}
    </div>
  );
}
