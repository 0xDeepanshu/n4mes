/** TEMP: verify migrated project doc structure — deleted after verification. */
import "./verify-env";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: false,
});

async function main() {
  const projects = await client.fetch<
    {
      slug: string;
      hasSections: boolean;
      cards: { slot: string; hasImage: boolean; hasVideo: boolean }[];
    }[]
  >(`*[_type == "project"] | order(title asc){
  "slug": slug.current,
  "hasSections": defined(sections),
  "cards": [
    {"slot": "card1", "hasImage": defined(card1.image), "hasVideo": defined(card1.video)},
    {"slot": "card2", "hasImage": defined(card2.image), "hasVideo": defined(card2.video)},
    {"slot": "card3", "hasImage": defined(card3.image), "hasVideo": defined(card3.video)},
    {"slot": "card4", "hasImage": defined(card4.image), "hasVideo": defined(card4.video)},
    {"slot": "closingBanner", "hasImage": defined(closingBanner.image), "hasVideo": defined(closingBanner.video)}
  ]
}`);

  let ok = true;
  for (const p of projects) {
    const allHaveImage = p.cards.every((c) => c.hasImage);
    const line = `${p.slug}: oldSections=${p.hasSections} ${p.cards
      .map((c) => `${c.slot}[img:${c.hasImage} vid:${c.hasVideo}]`)
      .join(" ")}`;
    console.log(line);
    if (p.hasSections || !allHaveImage) ok = false;
  }
  console.log(
    `projects=${projects.length} ${ok ? "MIGRATION_OK" : "MIGRATION_BAD"}`,
  );
}

main().catch((e) => {
  console.error("FAIL:", e instanceof Error ? e.message : e);
  process.exit(1);
});
