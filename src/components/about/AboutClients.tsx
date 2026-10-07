type AboutClientsProps = {
  heading?: string;
  description?: string;
};

const DEFAULT_DESCRIPTION =
  "We collaborate with industry leaders, innovative startups, and global enterprises to deliver exceptional solutions. Our clients trust us to bring their vision to life with precision, creativity, and expertise.";

/** 1. OAKLEY Wordmark */
function OakleyLogo() {
  return (
    <svg
      viewBox="0 0 180 34"
      fill="currentColor"
      className="w-auto h-6 sm:h-7 text-black select-none"
      aria-label="Oakley"
    >
      {/* Signature Oakley oval O */}
      <path d="M22 2 C9.8 2 0 8.7 0 17 C0 25.3 9.8 32 22 32 C34.2 32 44 25.3 44 17 C44 8.7 34.2 2 22 2 Z M22 25 C14.2 25 8 21.4 8 17 C8 12.6 14.2 9 22 9 C29.8 9 36 12.6 36 17 C36 21.4 29.8 25 22 25 Z" />
      {/* A */}
      <path d="M56 31 L64 31 L71 7 L63 7 L56 31 Z M71 7 L78 31 L86 31 L79 7 L71 7 Z M62 23 L75 23 L73 17 L64 17 Z" />
      {/* K */}
      <path d="M92 7 L92 31 L99 31 L99 21 L108 31 L118 31 L106 18 L116 7 L107 7 L99 16 L99 7 Z" />
      {/* L */}
      <path d="M124 7 L124 31 L144 31 L144 24 L132 24 L132 7 Z" />
      {/* E */}
      <path d="M149 7 L149 31 L168 31 L168 25 L156 25 L156 21 L166 21 L166 16 L156 16 L156 13 L168 13 L168 7 Z" />
      {/* Y */}
      <path d="M169 7 L174 19 L179 7 L186 7 L178 23 L178 31 L171 31 L171 23 L163 7 Z" />
    </svg>
  );
}

/** 2. Meridian. Logo */
function MeridianLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 select-none">
      <svg
        viewBox="0 0 40 40"
        fill="currentColor"
        className="w-7 h-7 text-black"
        aria-hidden="true"
      >
        {/* 8-pointed rounded pinwheel/star */}
        <rect x="18" y="2" width="4" height="12" rx="2" />
        <rect x="18" y="26" width="4" height="12" rx="2" />
        <rect x="2" y="18" width="12" height="4" rx="2" />
        <rect x="26" y="18" width="12" height="4" rx="2" />
        <rect
          x="18"
          y="2"
          width="4"
          height="12"
          rx="2"
          transform="rotate(45 20 20)"
        />
        <rect
          x="18"
          y="26"
          width="4"
          height="12"
          rx="2"
          transform="rotate(45 20 20)"
        />
        <rect
          x="2"
          y="18"
          width="12"
          height="4"
          rx="2"
          transform="rotate(45 20 20)"
        />
        <rect
          x="26"
          y="18"
          width="12"
          height="4"
          rx="2"
          transform="rotate(45 20 20)"
        />
      </svg>
      <span
        className="text-[12px] font-semibold tracking-tight text-black"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        Meridian.
      </span>
    </div>
  );
}

/** 3. Crescent Loop Ribbon Emblem */
function CrescentRibbonLogo() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="w-10 h-10 text-black select-none"
      aria-label="Partner Brand"
    >
      <path
        d="M32 6 C17.6 6 6 17.6 6 32 C6 46.4 17.6 58 32 58 C43.2 58 52.8 51 56.4 41 C54 43 49 44.5 44 43 C33 40 28 29 32 18 C34 13 38 9 44 8 C40.2 6.7 36.2 6 32 6 Z"
        fill="currentColor"
      />
      <path
        d="M48 10 C42 12 38 18 40 25 C42 32 49 37 56 35 C57.5 30 57.5 24 55 19 C53.5 15.5 51 12.5 48 10 Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  );
}

/** 4. arch. ® Logo */
function ArchLogo() {
  return (
    <div className="flex items-center gap-1.5 select-none">
      {/* Lowercase geometric 'a' arch */}
      <svg
        viewBox="0 0 48 48"
        fill="currentColor"
        className="w-9 h-9 text-black"
        aria-hidden="true"
      >
        <path d="M10 24 C10 14 18 6 28 6 C38 6 42 12 42 22 L42 42 L32 42 L32 37 C29 41 24 43 18 43 C9 43 4 37 4 28 C4 19 12 15 22 15 L32 15 L32 22 L22 22 C16 22 14 25 14 28 C14 31 17 33 21 33 C27 33 32 29 32 24 L32 22 C32 16 29 14 25 14 C18 14 14 18 14 24 Z" />
      </svg>
      <div className="flex items-start">
        <span
          className="text-[14px] font-bold tracking-tight text-black"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          arch.
        </span>
        <span className="text-[7px] font-bold text-black ml-0.5 mt-0.5">®</span>
      </div>
    </div>
  );
}

/** 5. Wave Studios Logo */
function WaveStudiosLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 select-none">
      {/* Double chevron sharp 'W' */}
      <svg
        viewBox="0 0 44 32"
        fill="currentColor"
        className="w-8 h-6 text-black"
        aria-hidden="true"
      >
        <path d="M0 4 L8 4 L14 24 L20 4 L26 4 L32 24 L38 4 L44 4 L35 28 L29 28 L23 11 L17 28 L11 28 Z" />
      </svg>
      <div className="flex flex-col items-center leading-none">
        <span
          className="text-[10px] font-bold tracking-wide text-black uppercase"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Wave
        </span>
        <span
          className="text-[7.5px] font-medium tracking-widest text-black/70 uppercase mt-0.5"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Studios
        </span>
      </div>
    </div>
  );
}

/** 6. Interlocking Geometric Square / Knot Logo */
function GeometricKnotLogo() {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="currentColor"
      className="w-9 h-9 text-black select-none"
      aria-label="Studio Partner"
    >
      <rect x="6" y="6" width="16" height="16" rx="3" />
      <path d="M14 26 L14 34 C14 36.2 15.8 38 18 38 L34 38 C36.2 38 38 36.2 38 34 L38 18 C38 15.8 36.2 14 34 14 L26 14 L26 22 L30 22 L30 30 L22 30 L22 26 Z" />
    </svg>
  );
}

export default function AboutClients({
  heading = "CLIENTS",
  description = DEFAULT_DESCRIPTION,
}: AboutClientsProps) {
  const cards = [
    { key: "oakley", Component: OakleyLogo },
    { key: "meridian", Component: MeridianLogo },
    { key: "crescent", Component: CrescentRibbonLogo },
    { key: "arch", Component: ArchLogo },
    { key: "wave", Component: WaveStudiosLogo },
    { key: "knot", Component: GeometricKnotLogo },
  ];

  return (
    <section id="clients" className="section-wrapper">
      <div
        className="section-container relative bg-white"
        style={{
          borderRadius: "var(--section-radius)",
          paddingTop: "clamp(50px, 5.8vw, 100px)",
          paddingBottom: "clamp(50px, 5.8vw, 100px)",
          paddingLeft: "clamp(24px, 4.5vw, 84px)",
          paddingRight: "clamp(24px, 4.5vw, 84px)",
        }}
      >
        {/* ==============================================================
            HEADER ROW: CLIENTS heading + right-side description
            ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-[clamp(28px,3.8vw,64px)]">
          <h2
            className="text-black"
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "clamp(32px, 3.8vw, 64px)",
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            {heading}
          </h2>

          <p
            className="max-w-[clamp(260px,24vw,380px)] text-black/70"
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(11px, 0.68vw, 13px)",
              lineHeight: 1.55,
              letterSpacing: "-0.003em",
              fontWeight: 400,
            }}
          >
            {description}
          </p>
        </div>

        {/* ==============================================================
            GRID: 3 columns × 2 rows = 6 client cards
            ============================================================== */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "20px" }}
        >
          {cards.map(({ key, Component }) => (
            <div
              key={key}
              className="flex items-center justify-center bg-[#f4f4f4] transition-transform duration-300 hover:scale-[1.01]"
              style={{
                height: "clamp(130px, 14vw, 220px)",
                borderRadius: "clamp(24px, 2.6vw, 44px)",
              }}
            >
              <Component />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
