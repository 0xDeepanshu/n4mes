import Image from "next/image";
import { getSiteSettings } from "@/lib/sanity/data";
import { imgSrcOr } from "@/lib/sanity/image";
import type { FooterNavItem, SocialLink } from "@/types/sanity";

const DEFAULT_EMAIL = "hi@n4mes.com";
const DEFAULT_DESCRIPTION =
  "At N4MES, we make it mean something. Turning bold ideas into experiences that captivate, inspire, and endure.";
const DEFAULT_CREDIT = {
  before: "Made with ",
  highlighted: "Love",
  after: " by ",
  linkText: "FTC Studio",
  linkUrl: "",
};
const DEFAULT_NAV: FooterNavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects", badge: "06" },
  { label: "Journal", href: "#journal", badge: "04" },
  { label: "Contact us", href: "#contact" },
];
const DEFAULT_SOCIAL: SocialLink[] = [
  { label: "Dribbble", icon: "◉", href: "#" },
  { label: "Instagram", icon: "◻", href: "#" },
  { label: "LinkedIn", icon: "▣", href: "#" },
  { label: "YouTube", icon: "▶", href: "#" },
];
const DEFAULT_WORDMARK = "N4MES";
const DEFAULT_COPYRIGHT = "©2025 N4MES. All rights reserved.";

export default async function FooterSection() {
  const settings = await getSiteSettings();

  const logo = imgSrcOr(
    settings?.footerLogo ?? settings?.logo,
    "/logo-transparent.png",
    256,
  );
  const logoAlt =
    settings?.footerLogo?.alt ?? settings?.logo?.alt ?? "N4MES Logo";
  const email = settings?.footerEmail ?? DEFAULT_EMAIL;
  const description = settings?.footerDescription ?? DEFAULT_DESCRIPTION;
  const credit = { ...DEFAULT_CREDIT, ...(settings?.footerCredit ?? {}) };
  const navLinks = settings?.footerNav?.length
    ? settings.footerNav
    : DEFAULT_NAV;
  const socialLinks = settings?.footerSocial?.length
    ? settings.footerSocial
    : DEFAULT_SOCIAL;
  const wordmark = settings?.footerWordmark ?? DEFAULT_WORDMARK;
  const copyright = settings?.footerCopyright ?? DEFAULT_COPYRIGHT;

  return (
    <footer
      id="footer"
      className="section-wrapper"
      style={{
        paddingBottom: "100px" /* space for floating nav */,
      }}
    >
      {/* ================================================================
          FOOTER CONTAINER – shared container, 100px radius
          ================================================================ */}
      <div
        className="section-container relative"
        style={{
          background: "#171717",
          paddingTop: "clamp(40px, 10.2vw, 197px)",
          paddingBottom: "clamp(40px, 10.2vw, 197px)",
          paddingLeft: "clamp(24px, 4.17vw, 80px)",
          paddingRight: "clamp(24px, 4.17vw, 80px)",
        }}
      >
        {/* ============================================================
            TOP ROW — 3-column layout
            ============================================================ */}
        <div className="flex flex-col lg:flex-row gap-[clamp(30px,3vw,60px)]">
          {/* -------- LEFT: Brand / Contact -------- */}
          <div className="flex-1 min-w-0">
            {/* Label + logo */}
            <div
              className="flex items-center gap-2"
              style={{ marginBottom: "clamp(10px, 0.94vw, 18px)" }}
            >
              <div className="relative w-4 h-4 flex-shrink-0">
                <Image
                  src={logo}
                  alt={logoAlt}
                  fill
                  className="object-contain filter invert opacity-75"
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-silkscreen), monospace",
                  fontSize: "clamp(7px, 0.47vw, 9px)",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.40)",
                  textTransform: "uppercase",
                }}
              >
                STAY CONNECTED.
              </p>
            </div>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="block hover:opacity-80 transition-opacity"
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "clamp(14px, 1.25vw, 24px)",
                fontWeight: 400,
                letterSpacing: "0.03em",
                color: "#ffffff",
                textDecoration: "none",
                marginBottom: "clamp(14px, 1.3vw, 25px)",
              }}
            >
              {email.toUpperCase()}
            </a>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: "clamp(9px, 0.52vw, 10px)",
                lineHeight: 1.6,
                letterSpacing: "-0.003em",
                color: "rgba(255,255,255,0.35)",
                fontWeight: 400,
                maxWidth: "clamp(240px, 20.83vw, 400px)",
                marginBottom: "clamp(20px, 2.08vw, 40px)",
              }}
            >
              {description}
            </p>

            {/* Credit */}
            <p
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: "clamp(8px, 0.47vw, 9px)",
                color: "rgba(255,255,255,0.30)",
                fontWeight: 400,
              }}
            >
              {credit.before}
              <span style={{ color: "rgba(255,255,255,0.55)" }}>
                {credit.highlighted}
              </span>
              {credit.after}
              {credit.linkUrl ? (
                <a
                  href={credit.linkUrl}
                  className="underline"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {credit.linkText}
                </a>
              ) : (
                <span
                  className="underline"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {credit.linkText}
                </span>
              )}
            </p>
          </div>

          {/* -------- CENTER: Navigation links -------- */}
          <div
            className="flex-shrink-0"
            style={{ minWidth: "clamp(120px, 10.42vw, 200px)" }}
          >
            <nav
              className="flex flex-col"
              style={{ gap: "clamp(8px, 0.78vw, 15px)" }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:opacity-70 transition-opacity"
                  style={{
                    fontFamily: "var(--font-silkscreen), monospace",
                    fontSize: "clamp(12px, 0.83vw, 16px)",
                    color: "#ffffff",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                  }}
                >
                  {link.label}
                  {link.badge && (
                    <sup
                      style={{
                        fontFamily: "var(--font-silkscreen), monospace",
                        fontSize: "clamp(6px, 0.36vw, 7px)",
                        color: "rgba(255,255,255,0.40)",
                        marginLeft: "2px",
                        verticalAlign: "super",
                      }}
                    >
                      {link.badge}
                    </sup>
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* -------- RIGHT: Social Media -------- */}
          <div className="flex-shrink-0">
            <p
              style={{
                fontFamily: "var(--font-silkscreen), monospace",
                fontSize: "clamp(12px, 0.83vw, 16px)",
                color: "#ffffff",
                letterSpacing: "0.02em",
                marginBottom: "clamp(12px, 1.04vw, 20px)",
              }}
            >
              Social Media
            </p>

            {/* Social icons row */}
            <div
              className="flex items-center"
              style={{ gap: "clamp(6px, 0.52vw, 10px)" }}
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href ?? "#"}
                  aria-label={social.label}
                  className="flex items-center justify-center hover:opacity-70 transition-opacity"
                  style={{
                    width: "clamp(26px, 1.67vw, 32px)",
                    height: "clamp(26px, 1.67vw, 32px)",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "clamp(10px, 0.63vw, 12px)",
                    textDecoration: "none",
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================
            BOTTOM — Large "N4MES" + copyright
            ============================================================ */}
        <div
          className="flex flex-col items-center"
          style={{
            marginTop: "clamp(40px, 4.17vw, 80px)",
          }}
        >
          {/* Large elegant "N4MES" */}
          <span
            className="select-none"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(42px, 4.69vw, 90px)",
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "0.02em",
              lineHeight: 1,
              color: "rgba(255,255,255,0.90)",
            }}
          >
            {wordmark}
          </span>

          {/* Copyright */}
          <p
            style={{
              marginTop: "clamp(10px, 0.83vw, 16px)",
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: "clamp(8px, 0.47vw, 9px)",
              color: "rgba(255,255,255,0.30)",
              letterSpacing: "0.01em",
              fontWeight: 400,
            }}
          >
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
