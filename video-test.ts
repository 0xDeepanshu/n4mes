/**
 * Temporary test harness: IMAGE -> VIDEO layout-invariance test for project-brands card2.
 * Usage: npx tsx video-test.ts <upload|patch|unset|get|poll> [args]
 */
import { createReadStream } from "node:fs";
import { basename } from "node:path";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
});
const DOC_ID = "project-brands";
const PAGE = "http://localhost:3000/projects/brands";

async function main() {
  const [cmd, arg] = process.argv.slice(2);

  if (cmd === "upload") {
    const asset = await client.assets.upload("file", createReadStream(arg!), {
      filename: basename(arg!),
    });
    console.log(
      JSON.stringify({ _id: asset._id, url: (asset as { url?: string }).url }),
    );
    return;
  }

  if (cmd === "patch") {
    const doc = await client.fetch<{ card2: Record<string, unknown> }>(
      `*[_id == $id][0]{card2}`,
      { id: DOC_ID },
    );
    if (!doc?.card2) throw new Error("no card2");
    const card2 = {
      ...doc.card2,
      video: { _type: "file", asset: { _type: "reference", _ref: arg } },
    };
    const res = await client.patch(DOC_ID).set({ card2 }).commit();
    console.log(JSON.stringify({ patched: res._id, video: card2.video }));
    return;
  }

  if (cmd === "unset") {
    const res = await client.patch(DOC_ID).unset(["card2.video"]).commit();
    console.log(JSON.stringify({ unset: res._id }));
    return;
  }

  if (cmd === "get") {
    const doc = await client.fetch(`*[_id == $id][0]{card2}`, { id: DOC_ID });
    console.log(JSON.stringify(doc, null, 1));
    return;
  }

  if (cmd === "poll") {
    const wantVideo = arg !== "novideo"; // poll until <video appears (or disappears with "novideo")
    const deadline = Date.now() + 150000;
    let attempt = 0;
    while (Date.now() < deadline) {
      attempt++;
      const html = await fetch(PAGE).then((r) => r.text());
      const videos = (html.match(/<video/g) || []).length;
      const hit = wantVideo ? videos > 0 : videos === 0;
      console.log(`attempt=${attempt} videoTags=${videos} hit=${hit}`);
      if (hit) return;
      await new Promise((r) => setTimeout(r, 10000));
    }
    console.log("POLL_TIMEOUT");
    process.exit(1);
  }

  console.error("unknown command");
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
