import Image from "next/image";
import { getSiteSettings } from "@/lib/sanity/data";
import { imgSrcOr } from "@/lib/sanity/image";

const DEFAULT_ITEMS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "JOURNAL", href: "#journal" },
];

const DEFAULT_CTA = { label: "CONTACT +", href: "#contact" };

function navHref(prefix: string, href: string, currentPath = "") {
  if (currentPath === "/about") {
    if (href === "#about") return "#about";
    if (href === "#contact") return "#contact";
    if (href.startsWith("#")) return `/${href}`;
  }
  return href.startsWith("#") ? `${prefix}${href}` : href;
}

/**
 * The floating pill navigation shared by the home page and every
 * /projects/[slug] page. Content comes from Website Settings in Sanity.
 */
export default async function SiteNav({
  prefix = "",
  currentPath = "",
}: {
  prefix?: string;
  currentPath?: string;
}) {
  const settings = await getSiteSettings();

  const avatar = imgSrcOr(settings?.navAvatar, "/nav-avatar.jpg", 96);
  const avatarAlt = settings?.navAvatar?.alt ?? "Nav Avatar";
  const items = settings?.navItems?.length ? settings.navItems : DEFAULT_ITEMS;
  const cta = settings?.navCta ?? DEFAULT_CTA;

  return (
    <nav
      className="fixed bottom-[32px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-between p-[6px] pl-[8px] pr-[8px] rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      style={{
        backgroundColor: "rgba(18, 18, 18, 0.68)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        height: "60px",
      }}
    >
      {/* Nav avatar – single squircle avatar matching reference */}
      <div className="relative w-[48px] h-[48px] rounded-[20px] overflow-hidden flex-shrink-0">
        <Image
          src={avatar}
          alt={avatarAlt}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      {/* Nav links */}
      <div className="hidden sm:flex items-center px-6 gap-7 lg:gap-8">
        {items.map((item) => (
          <a
            key={item.label}
            href={navHref(prefix, item.href, currentPath)}
            className="text-white hover:text-white/80 transition-colors whitespace-nowrap"
            style={{
              fontFamily: "var(--font-silkscreen), monospace",
              fontSize: "12px",
              letterSpacing: "0.08em",
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Contact button – solid white pill */}
      <a
        href={navHref(prefix, cta.href, currentPath)}
        className="flex items-center justify-center px-6 h-[48px] rounded-full bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all whitespace-nowrap"
        style={{
          fontFamily: "var(--font-silkscreen), monospace",
          fontSize: "12px",
          letterSpacing: "0.08em",
          fontWeight: 400,
        }}
      >
        {cta.label}
      </a>
    </nav>
  );
}
