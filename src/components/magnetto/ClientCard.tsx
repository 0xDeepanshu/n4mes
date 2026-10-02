"use client";

import Image from "next/image";

interface ClientCardProps {
  name: string;
  logo?: string;
}

export default function ClientCard({ name, logo }: ClientCardProps) {
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
      {logo ? (
        <div className="relative w-[100px] h-[100px] flex items-center justify-center">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain filter invert opacity-75"
          />
        </div>
      ) : (
        <span
          className="select-none text-center whitespace-pre-line"
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: name.length > 8 ? "14px" : "18px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.40)",
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

