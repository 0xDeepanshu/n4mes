/**
 * Manifest-based Sanity asset uploader — shared by `seed.ts` and
 * `migrate.ts` so re-runs never duplicate uploads.
 *
 * The manifest maps a public-relative file path (e.g.
 * "brands/F&B/Photos/DSC00648.jpg") to the Sanity asset it was uploaded
 * as. It is committed to the repo and is also the source the test gates
 * use to map rendered CDN URLs back to local paths.
 *
 * Usage:  npm run sanity:seed / npx tsx sanity/migrate.ts
 * Needs:  SANITY_API_WRITE_TOKEN in .env.local
 */

import { createReadStream, statSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import type { SanityClient } from "@sanity/client";

export interface ManifestEntry {
  assetId: string;
  url: string;
  kind: "image" | "file";
  originalFilename?: string;
  uploadedAt: string;
  /** File size in bytes at upload time (progress + integrity checks). */
  size: number;
}

export type MediaManifest = Record<string, ManifestEntry>;

export const MEDIA_MANIFEST_PATH = resolve(
  process.cwd(),
  "sanity",
  ".media-manifest.json",
);

const IMAGE_EXT = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "avif",
  "gif",
  "svg",
  "ico",
]);

export function kindForPath(publicPath: string): "image" | "file" {
  const ext = publicPath.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXT.has(ext) ? "image" : "file";
}

function normalizeKey(publicPath: string): string {
  return publicPath.replace(/^\/+/, "").replaceAll("\\", "/");
}

export async function loadMediaManifest(): Promise<MediaManifest> {
  try {
    const raw = await readFile(MEDIA_MANIFEST_PATH, "utf8");
    const parsed = JSON.parse(raw) as MediaManifest;
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed;
  } catch {
    return {};
  }
}

export async function saveMediaManifest(
  manifest: MediaManifest,
): Promise<void> {
  await mkdir(dirname(MEDIA_MANIFEST_PATH), { recursive: true });
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );
  await writeFile(
    MEDIA_MANIFEST_PATH,
    `${JSON.stringify(sorted, null, 2)}\n`,
    "utf8",
  );
}

export interface Uploader {
  /** Upload (or reuse from manifest) one file under `public/`. */
  upload(publicPath: string): Promise<ManifestEntry>;
  /** Same, returning a Sanity image reference stub (+ optional alt). */
  imageStub(
    publicPath: string,
    alt?: string,
  ): Promise<{
    _type: "image";
    asset: { _type: "reference"; _ref: string };
    alt?: string;
  }>;
  /** Check that the given manifest keys (or all) still resolve to live assets. */
  verify(keys?: string[]): Promise<string[]>;
  /** Drop manifest entries (e.g. assets deleted in the Studio) so the next upload refreshes them. */
  evict(keys: string[]): void;
  /** Write the manifest back to disk if anything was uploaded. */
  flush(): Promise<void>;
  manifest(): Promise<MediaManifest>;
}

export function createUploader(
  client: SanityClient,
  publicDir: string = resolve(process.cwd(), "public"),
): Uploader {
  const inflight = new Map<string, Promise<ManifestEntry>>();
  let manifest: MediaManifest | null = null;
  let dirty = false;

  async function ensure(): Promise<MediaManifest> {
    if (!manifest) manifest = await loadMediaManifest();
    return manifest;
  }

  /**
   * An upload that already landed (previous run, or another tool) but is
   * not in the manifest yet — matched exactly by filename + byte size so
   * re-runs never create duplicate assets.
   */
  async function findExisting(
    key: string,
    size: number,
  ): Promise<ManifestEntry | null> {
    const filename = basename(key);
    const row = await client.fetch<{
      _id: string;
      url: string;
      originalFilename?: string;
      size: number;
    } | null>(
      `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] && originalFilename == $filename && size == $size] | order(_createdAt desc)[0]{ _id, url, originalFilename, size }`,
      { filename, size },
    );
    if (!row) return null;
    return {
      assetId: row._id,
      url: row.url,
      kind: kindForPath(key),
      originalFilename: row.originalFilename,
      uploadedAt: new Date().toISOString(),
      size: row.size,
    };
  }

  async function doUpload(key: string): Promise<ManifestEntry> {
    const m = await ensure();
    const existing = m[key];
    if (existing) return existing;

    const kind = kindForPath(key);
    const abs = join(publicDir, key);
    const { size } = statSync(abs);

    const adopted = await findExisting(key, size);
    if (adopted) {
      m[key] = adopted;
      dirty = true;
      console.log(`  adopted ${key} -> ${adopted.assetId}`);
      await saveMediaManifest(m);
      dirty = false;
      return adopted;
    }

    const filename = basename(key);
    let lastError: unknown;
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const asset = await client.assets.upload(kind, createReadStream(abs), {
          filename,
        });
        const entry: ManifestEntry = {
          assetId: asset._id,
          url: asset.url,
          kind,
          originalFilename: asset.originalFilename,
          uploadedAt: new Date().toISOString(),
          size,
        };
        m[key] = entry;
        const mb = (size / (1024 * 1024)).toFixed(1);
        console.log(`  uploaded ${key} (${mb} MB) -> ${asset._id}`);
        await saveMediaManifest(m);
        dirty = false;
        return entry;
      } catch (error) {
        lastError = error;
        // A timed-out upload may still have landed — try to adopt it.
        const landed = await findExisting(key, size).catch(() => null);
        if (landed) {
          m[key] = landed;
          console.log(`  adopted ${key} -> ${landed.assetId} (after retry)`);
          await saveMediaManifest(m);
          dirty = false;
          return landed;
        }
        console.warn(
          `  upload attempt ${attempt}/4 failed for ${key}: ${(error as Error)?.message ?? error}`,
        );
        if (attempt < 4) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 10_000));
        }
      }
    }
    throw lastError;
  }

  function upload(publicPath: string): Promise<ManifestEntry> {
    const key = normalizeKey(publicPath);
    const cached = inflight.get(key);
    if (cached) return cached;
    const promise = doUpload(key).catch((error) => {
      inflight.delete(key);
      throw error;
    });
    inflight.set(key, promise);
    return promise;
  }

  return {
    upload,

    async imageStub(publicPath, alt) {
      const entry = await upload(publicPath);
      return {
        _type: "image",
        asset: { _type: "reference", _ref: entry.assetId },
        ...(alt ? { alt } : {}),
      };
    },

    async verify(keys) {
      const m = await ensure();
      const list = (keys ?? Object.keys(m)).map(normalizeKey);
      const ids = list.map((k) => m[k]?.assetId).filter(Boolean) as string[];
      if (ids.length === 0) return list;
      const found = new Set<string>();
      for (let i = 0; i < ids.length; i += 500) {
        const chunk = ids.slice(i, i + 500);
        const rows = await client.fetch<{ _id: string }[]>(
          `*[_id in $ids]{_id}`,
          { ids: chunk },
        );
        for (const row of rows) found.add(row._id);
      }
      return list.filter((k) => !m[k] || !found.has(m[k].assetId));
    },

    async evict(keys) {
      const m = await ensure();
      for (const key of keys) {
        const normalized = normalizeKey(key);
        if (normalized in m) {
          delete m[normalized];
          dirty = true;
        }
      }
    },

    async flush() {
      if (manifest && dirty) {
        await saveMediaManifest(manifest);
        dirty = false;
        console.log(`  manifest saved -> ${MEDIA_MANIFEST_PATH}`);
      }
    },

    async manifest() {
      return await ensure();
    },
  };
}
