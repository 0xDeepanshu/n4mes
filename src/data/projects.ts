export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  /** Stable route segment: /projects/[slug] */
  slug: string;
  /** Hero headline (pixel font) */
  title: string;
  /** Hero eyebrow under the title */
  category: string;
  /** Hero right-hand paragraph */
  description: string;
  /** Full-bleed hero artwork */
  hero: ProjectImage;
  /** Full-width feature images in layout order: [after row 1, after row 2] */
  features: [ProjectImage, ProjectImage];
  /** Row images in layout order: [row 1 (right), row 2 (left), row 3 (right)] */
  rowImages: [ProjectImage, ProjectImage, ProjectImage];
  /** [row 1, row 2, row 3] — the white text cards */
  textBlocks: [string, string, string];
}

export const projects: Project[] = [
  {
    slug: "brands",
    title: "BRANDS",
    category: "campaigns, content, advertising",
    description:
      "From first spark to full-scale launch, we build brands that refuse to blend in. Strategy, identity, and campaigns engineered to make audiences stop, feel, and remember.",
    hero: { src: "/project-1.jpg", alt: "Beyond Time" },
    features: [
      { src: "/project-3.jpg", alt: "Every Second" },
      { src: "/project-4.jpg", alt: "Timeless Mastery" },
    ],
    rowImages: [
      { src: "/project-4.jpg", alt: "Timeless Mastery" },
      { src: "/project-2.jpg", alt: "Brand Redefine" },
      { src: "/project-3.jpg", alt: "Every Second" },
    ],
    textBlocks: [
      "A brand is more than a mark — it is a promise repeated until it becomes belief. For BRANDS we shaped every touchpoint around one idea: clarity. Naming, voice, identity systems, and campaign platforms built to travel from a billboard to a phone screen without losing their edge.",
      "We treat advertising as a craft of timing and restraint. Every headline earns its place, every media dollar answers a strategy. The result is work that launches loud, then keeps working — recognised in a scroll, recalled in a room, chosen at the shelf.",
      "Consistency is the multiplier. We hand over living systems — type, colour, motion, and tone — documented so every team and market ships on-brand without a briefing. The work keeps performing long after the launch campaign stops running.",
    ],
  },
  {
    slug: "music",
    title: "MUSIC",
    category: "concerts, festivals, artists",
    description:
      "Loud ideas for louder stages. We craft the visuals, campaigns, and content that turn a show into a moment and a moment into a movement.",
    hero: { src: "/project-2.jpg", alt: "Brand Redefine" },
    features: [
      { src: "/project-3.jpg", alt: "Every Second" },
      { src: "/project-4.jpg", alt: "Timeless Mastery" },
    ],
    rowImages: [
      { src: "/project-4.jpg", alt: "Timeless Mastery" },
      { src: "/project-1.jpg", alt: "Beyond Time" },
      { src: "/project-3.jpg", alt: "Every Second" },
    ],
    textBlocks: [
      "Every tour, festival, and drop carries its own pulse — our job is to amplify it. For MUSIC we design identities that roar across posters, screens, and stages, then build the content machine that keeps fans engaged long after the encore.",
      "From first announcement to final night, we choreograph the rollout: teasers that spark rumour, artwork that owns the feed, and on-site content that makes the crowd part of the story. The beat does not stop when the lights come up.",
      "The show ends; the world does not. We design assets that survive the jump from screen to street to merch table, so every rollout looks like the artist and every fan carries a piece of the night home with them.",
    ],
  },
  {
    slug: "people",
    title: "PEOPLE",
    category: "creators ugc, personalities",
    description:
      "Personal brands with staying power. We help creators and personalities show up with intent, consistency, and a voice that is unmistakably theirs.",
    hero: { src: "/project-3.jpg", alt: "Every Second" },
    features: [
      { src: "/project-4.jpg", alt: "Timeless Mastery" },
      { src: "/project-1.jpg", alt: "Beyond Time" },
    ],
    rowImages: [
      { src: "/project-1.jpg", alt: "Beyond Time" },
      { src: "/project-2.jpg", alt: "Brand Redefine" },
      { src: "/project-4.jpg", alt: "Timeless Mastery" },
    ],
    textBlocks: [
      "Attention is earned in the details — a signature look, a repeatable format, a point of view people can quote. For PEOPLE we build content systems that let personalities publish daily without diluting what made them matter in the first place.",
      "UGC, partnerships, and platform-native storytelling are handled like editorial, not improvisation. Every frame serves the persona, every collaboration fits the narrative, and the audience always knows exactly whose world they have stepped into.",
      "Growth without guidance is luck. We put measurement behind the feed — formats, cadences, and hooks tested, doubled down on, and retired without sentiment — so the persona keeps compounding while the identity stays exactly intact.",
    ],
  },
  {
    slug: "corporte",
    title: "CORPORTE",
    category: "corporate films, events, business content",
    description:
      "Boardroom clarity, broadcast polish. Corporate films and event content that make complex businesses feel human, credible, and worth watching.",
    hero: { src: "/project-4.jpg", alt: "Timeless Mastery" },
    features: [
      { src: "/project-3.jpg", alt: "Every Second" },
      { src: "/project-1.jpg", alt: "Beyond Time" },
    ],
    rowImages: [
      { src: "/project-1.jpg", alt: "Beyond Time" },
      { src: "/project-2.jpg", alt: "Brand Redefine" },
      { src: "/project-3.jpg", alt: "Every Second" },
    ],
    textBlocks: [
      "Corporate does not have to mean cautious. For CORPORTE we translate strategy decks and roadmaps into films people actually finish — founder stories, product films, and event coverage shot with the discipline of a studio and the pace of a newsroom.",
      "We plan for where the content lives: a ninety-second hero film, cutdowns for social, stills for the deck, and a library the internal team can use for a year. One shoot, one narrative, every audience covered.",
      "Clarity is the real deliverable. We work with the people who know the business best, pull the story out of the jargon, and cut it so stakeholders, recruits, and investors all hear the same confident voice.",
    ],
  },
  {
    slug: "built",
    title: "BUILT",
    category: "brands we've built from scratch",
    description:
      "Zero to identity, end to end. We take raw ambition and return a brand ready for market — named, designed, launched, and built to carry weight from day one.",
    hero: { src: "/project-4.jpg", alt: "Timeless Mastery" },
    features: [
      { src: "/project-3.jpg", alt: "Every Second" },
      { src: "/project-2.jpg", alt: "Brand Redefine" },
    ],
    rowImages: [
      { src: "/project-2.jpg", alt: "Brand Redefine" },
      { src: "/project-1.jpg", alt: "Beyond Time" },
      { src: "/project-3.jpg", alt: "Every Second" },
    ],
    textBlocks: [
      "Starting from nothing is a privilege: no legacy to defend, only a future to define. For BUILT we handled naming, positioning, identity, packaging, and launch content as one continuous act of construction.",
      "The foundation is strategy, the frame is design, the finish is content. When every layer is set by the same hands, nothing rattles — and the brand can stand anywhere without a retrofit.",
      "A launch is a starting line, not a finish. We stay past day one — guidelines, templates, and a content rhythm the internal team can run — so the brand keeps its shape while it grows into whatever comes next.",
    ],
  },
  {
    slug: "motion",
    title: "MOTION",
    category: "motion graphics, SaaS videos, typography",
    description:
      "Movement with meaning. Motion graphics, typography, and product videos that explain fast and stay stuck in memory.",
    hero: { src: "/project-4.jpg", alt: "Timeless Mastery" },
    features: [
      { src: "/project-1.jpg", alt: "Beyond Time" },
      { src: "/project-3.jpg", alt: "Every Second" },
    ],
    rowImages: [
      { src: "/project-3.jpg", alt: "Every Second" },
      { src: "/project-2.jpg", alt: "Brand Redefine" },
      { src: "/project-1.jpg", alt: "Beyond Time" },
    ],
    textBlocks: [
      "Motion is where logic becomes feeling. For MOTION we animate the abstract — features, flows, and data — so a viewer understands the point before they realise they were being taught.",
      "Type that breathes, transitions with purpose, and sound design that lands on the beat. From SaaS explainers to launch loops, every second is storyboarded, and nothing moves without a reason.",
      "Timing is the message. Every ease, cut, and hold lands where the eye expects it, so complex ideas survive the first watch and still reward the second — no pause, no scrubbing, no re-explaining.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
