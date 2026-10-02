import Image from "next/image";

interface JournalCardProps {
  image: string;
  alt: string;
  title: string;
  category: string;
}

export default function JournalCard({
  image,
  alt,
  title,
  category,
}: JournalCardProps) {
  return (
    <div className="flex flex-col items-center" style={{ width: "100%" }}>
      {/* Image card */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "clamp(260px, 21.46vw, 412px)",
          borderRadius: "clamp(36px, 3.65vw, 70px)",
        }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 438px"
        />
      </div>

      {/* Title */}
      <p
        className="text-center"
        style={{
          marginTop: "clamp(12px, 1.04vw, 20px)",
          fontFamily: "var(--font-geist-sans), sans-serif",
          fontSize: "clamp(10px, 0.63vw, 12px)",
          lineHeight: 1.45,
          letterSpacing: "-0.003em",
          color: "rgba(255,255,255,0.70)",
          fontWeight: 400,
          maxWidth: "85%",
        }}
      >
        {title}
      </p>

      {/* Category pill */}
      <span
        style={{
          marginTop: "clamp(6px, 0.47vw, 9px)",
          fontFamily: "var(--font-silkscreen), monospace",
          fontSize: "clamp(7px, 0.47vw, 9px)",
          letterSpacing: "0.10em",
          color: "rgba(255,255,255,0.40)",
          textTransform: "uppercase",
        }}
      >
        {category}
      </span>
    </div>
  );
}
