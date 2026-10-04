import { SiGoogle, SiSwiggy } from "react-icons/si";

/**
 * Google Logo Component
 */
export function GoogleLogo({
  className = "w-12 h-12",
}: {
  className?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <SiGoogle
        className={`${className} text-white/90 group-hover:text-white transition-colors duration-300`}
      />
      <span
        className="text-[22px] font-medium tracking-tight text-white/90 group-hover:text-white transition-colors duration-300 select-none hidden sm:inline"
        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
      >
        Google
      </span>
    </div>
  );
}

/**
 * Swiggy Logo Component
 */
export function SwiggyLogo({
  className = "w-12 h-12",
}: {
  className?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <SiSwiggy
        className={`${className} text-[#FC8019] group-hover:scale-105 transition-transform duration-300`}
      />
      <span
        className="text-[22px] font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300 select-none hidden sm:inline"
        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
      >
        SWIGGY
      </span>
    </div>
  );
}

/**
 * Sanspareils Greenlands (SG) Cricket Brand Logo
 */
export function SGLogo() {
  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="0 0 180 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-12 max-h-14 group-hover:scale-105 transition-transform duration-300"
        role="img"
        aria-label="SG Cricket"
      >
        <title>SG Cricket</title>
        {/* SG Cricket dynamic italic emblem */}
        <g transform="skewX(-14)">
          {/* 'S' letter */}
          <path
            d="M58 20 C54 13 46 11 36 11 C20 11 10 20 10 31 C10 44 24 47 38 50 C48 52 53 55 53 60 C53 66 46 70 35 70 C22 70 14 63 11 53 L22 51 C24 57 28 61 35 61 C41 61 44 58 44 53 C44 46 32 43 20 40 C9 37 2 30 2 20 C2 9 14 2 35 2 C47 2 57 7 60 16 Z"
            fill="#ffffff"
            fillOpacity="0.92"
          />
          {/* 'G' letter */}
          <path
            d="M106 18 C100 13 90 10 78 10 C60 10 47 23 47 41 C47 59 60 72 80 72 C94 72 105 65 110 52 L80 52 L80 43 L118 43 C119 46 119 50 119 54 C119 68 103 81 79 81 C53 81 37 63 37 41 C37 18 54 1 80 1 C94 1 107 5 115 13 Z"
            fill="#ffffff"
            fillOpacity="0.92"
          />
        </g>
        {/* Cricket heritage sub-label */}
        <text
          x="126"
          y="48"
          fill="rgba(255,255,255,0.45)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.25em"
          fontFamily="system-ui, sans-serif"
        >
          CRICKET
        </text>
      </svg>
    </div>
  );
}

/**
 * HZY Streetwear & Creative Label Logo
 */
export function HZYLogo() {
  return (
    <div className="flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300">
      <svg
        viewBox="0 0 160 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-11"
        role="img"
        aria-label="HZY Clothing"
      >
        <title>HZY Clothing</title>
        {/* Bold geometric HZY logotype */}
        {/* H */}
        <path
          d="M6 6 H16 V22 H34 V6 H44 V46 H34 V30 H16 V46 H6 Z"
          fill="#ffffff"
          fillOpacity="0.9"
        />
        {/* Z */}
        <path
          d="M56 6 H94 V15 L69 37 H94 V46 H54 V37 L80 15 H56 Z"
          fill="#ffffff"
          fillOpacity="0.9"
        />
        {/* Y */}
        <path
          d="M104 6 H115 L129 26 L143 6 H154 L134 32 V46 H124 V32 Z"
          fill="#ffffff"
          fillOpacity="0.9"
        />
      </svg>
      <span
        className="text-[8px] tracking-[0.45em] uppercase text-white/40 font-semibold mt-1"
        style={{ fontFamily: "var(--font-geist-sans), monospace" }}
      >
        CLOTHING
      </span>
    </div>
  );
}

/**
 * F&B Hospitality & Lifestyle Logo
 */
export function FnBLogo() {
  return (
    <div className="flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300">
      <div className="flex items-center gap-1.5">
        <span
          className="text-[34px] font-black tracking-wider text-white/90 leading-none select-none"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          F
        </span>
        <span
          className="text-[26px] italic font-light text-white/50 leading-none select-none px-0.5"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          &
        </span>
        <span
          className="text-[34px] font-black tracking-wider text-white/90 leading-none select-none"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          B
        </span>
      </div>
      <span
        className="text-[7.5px] tracking-[0.35em] uppercase text-white/40 font-medium mt-1 select-none"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        HOSPITALITY
      </span>
    </div>
  );
}
