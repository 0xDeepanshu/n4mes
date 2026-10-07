import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2025-01-01";

/**
 * True only when a real Sanity project ID has been configured.
 * While false, all content getters fall back to the local defaults
 * so the site keeps rendering without a CMS connection.
 */
export function hasSanity(): boolean {
  return Boolean(
    projectId && projectId.trim() !== "" && projectId !== "your-project-id",
  );
}

function requireProjectId(): string {
  if (!hasSanity()) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  }
  return projectId as string;
}

export function sanityClient() {
  return createClient({
    projectId: requireProjectId(),
    dataset,
    apiVersion,
    useCdn: false,
  });
}

export function sanityNoCdnClient() {
  return createClient({
    projectId: requireProjectId(),
    dataset,
    apiVersion,
    useCdn: false,
  });
}

export function sanityPreviewClient() {
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) {
    throw new Error("Missing SANITY_API_READ_TOKEN for preview client");
  }
  return createClient({
    projectId: requireProjectId(),
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "previewDrafts",
    token,
  });
}
