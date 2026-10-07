import { getSiteSettings } from "@/lib/sanity/data";
import { imgSrcOr } from "@/lib/sanity/image";
import type { FormField } from "@/types/sanity";
import Media from "./Media";

const DEFAULT_HEADING = "GET IN TOUCH";
const DEFAULT_DESCRIPTION =
  "Have a project in mind? Whether you're launching a brand, designing a product, or elevating your digital presence, we're here to bring your vision to life.";
const DEFAULT_FORM_LABEL = "CONTACT US.25";
const DEFAULT_SUBMIT_LABEL = "SUBMIT";
const DEFAULT_FORM_FIELDS: FormField[] = [
  { label: "First name", placeholder: "Jane", inputType: "text" },
  { label: "Last name", placeholder: "Smith", inputType: "text" },
  { label: "Email", placeholder: "jane@framer.com", inputType: "email" },
  { label: "Phone no.", placeholder: "(347)-000-0000", inputType: "tel" },
];

const LABEL_STYLE = {
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontSize: "clamp(11px, 0.68vw, 13px)",
  fontWeight: 500,
  color: "rgba(255,255,255,0.85)",
  marginBottom: "clamp(6px, 0.36vw, 8px)",
  letterSpacing: "0.01em",
};

const INPUT_STYLE = {
  width: "100%",
  height: "clamp(38px, 2.5vw, 48px)",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(0,0,0,0.28)",
  padding: "0 clamp(12px, 0.83vw, 16px)",
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontSize: "clamp(12px, 0.73vw, 14px)",
  color: "#ffffff",
  letterSpacing: "0.01em",
};

export default async function ContactSection() {
  const settings = await getSiteSettings();

  const heading = settings?.contactHeading ?? DEFAULT_HEADING;
  const description = settings?.contactDescription ?? DEFAULT_DESCRIPTION;
  const formLabel = settings?.contactFormLabel ?? DEFAULT_FORM_LABEL;
  const submitLabel = settings?.contactSubmitLabel ?? DEFAULT_SUBMIT_LABEL;
  const fields = settings?.contactFormFields?.length
    ? settings.contactFormFields
    : DEFAULT_FORM_FIELDS;
  const background = imgSrcOr(
    settings?.contactBackground,
    "/contact-bg.jpg",
    2000,
  );
  const backgroundAlt =
    settings?.contactBackground?.alt ?? "Contact background";
  const backgroundVideo = settings?.contactBackgroundVideo?.asset?.url;

  // Keep the original two-column rows: pairs of fields, last row keeps the
  // larger bottom spacing used by the existing design.
  const rows: FormField[][] = [];
  for (let i = 0; i < fields.length; i += 2) {
    rows.push(fields.slice(i, i + 2));
  }

  return (
    <section id="contact" className="section-wrapper">
      {/* ================================================================
          CONTACT CONTAINER – shared container, 100px radius
          ================================================================ */}
      <div
        className="section-container relative"
        style={{
          height: "clamp(500px, 54.17vw, 1040px)",
        }}
      >
        {/* -------- Full-bleed background image / video -------- */}
        <Media
          image={background}
          video={backgroundVideo}
          alt={backgroundAlt}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 50%" }}
        />

        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(110deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.50) 100%)",
          }}
        />

        {/* -------- LEFT: GET IN TOUCH + description -------- */}
        <div
          className="absolute z-[2] hidden lg:block"
          style={{
            left: "clamp(40px, 5.2vw, 100px)",
            top: "clamp(90px, 20vw, 390px)",
            width: "clamp(440px, 36vw, 680px)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-silkscreen), sans-serif",
              fontSize: "clamp(32px, 2.8vw, 54px)",
              fontWeight: 400,
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              color: "#ffffff",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {heading}
          </h2>

          <p
            style={{
              marginTop: "clamp(16px, 1.3vw, 24px)",
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(12px, 0.78vw, 15px)",
              lineHeight: 1.6,
              letterSpacing: "-0.005em",
              color: "rgba(255,255,255,0.70)",
              fontWeight: 400,
              maxWidth: "clamp(380px, 30vw, 540px)",
            }}
          >
            {description}
          </p>
        </div>

        {/* Mobile: heading above form */}
        <div className="absolute z-[2] lg:hidden top-[24px] left-[20px] right-[20px]">
          <h2
            style={{
              fontFamily: "var(--font-silkscreen), sans-serif",
              fontSize: "clamp(22px, 6vw, 28px)",
              fontWeight: 400,
              letterSpacing: "0.04em",
              lineHeight: 1.05,
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            {heading}
          </h2>
        </div>

        {/* -------- RIGHT: Contact form glass panel -------- */}
        <div
          className="absolute z-[2] left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0"
          style={{
            top: "clamp(90px, 19.66vw, 378px)",
            width: "clamp(320px, 29vw, 560px)",
            borderRadius: "40px",
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.20)",
            padding:
              "clamp(24px, 2vw, 38px) clamp(24px, 2vw, 38px) clamp(20px, 1.8vw, 32px)",
            right: "clamp(40px, 5vw, 90px)",
          }}
        >
          {/* Form label */}
          <div
            className="flex justify-end"
            style={{ marginBottom: "clamp(16px, 1.4vw, 26px)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-silkscreen), sans-serif",
                fontSize: "clamp(9px, 0.58vw, 11px)",
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.75)",
                textTransform: "uppercase",
                fontWeight: 400,
              }}
            >
              {formLabel}
            </span>
          </div>

          {/* Form field rows: two fields per row */}
          {rows.map((row, rowIndex) => (
            <div
              key={row.map((f) => f.label).join("-")}
              className="flex gap-[clamp(10px,0.83vw,16px)]"
              style={{
                marginBottom:
                  rowIndex === rows.length - 1
                    ? "clamp(18px, 1.4vw, 26px)"
                    : "clamp(10px, 0.73vw, 14px)",
              }}
            >
              {row.map((field) => {
                const fieldId = `contact-${field.label
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`;
                return (
                  <div key={field.label} className="flex-1 flex flex-col">
                    <label htmlFor={fieldId} style={LABEL_STYLE}>
                      {field.label}
                    </label>
                    <input
                      id={fieldId}
                      type={field.inputType ?? "text"}
                      placeholder={field.placeholder}
                      className="outline-none placeholder:text-white/40"
                      style={INPUT_STYLE}
                    />
                  </div>
                );
              })}
            </div>
          ))}

          {/* Submit button */}
          <button
            type="button"
            className="w-full cursor-pointer transition-all duration-200 hover:bg-white/90 active:scale-[0.99]"
            style={{
              height: "clamp(38px, 2.5vw, 48px)",
              borderRadius: "999px",
              background: "#ffffff",
              border: "none",
              fontFamily: "var(--font-silkscreen), sans-serif",
              fontSize: "clamp(10px, 0.63vw, 12px)",
              letterSpacing: "0.14em",
              color: "#000000",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
