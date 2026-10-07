import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * On-demand cache revalidation endpoint for Sanity.
 *
 * Triggered automatically by Sanity webhooks upon document publish/delete,
 * or invoked manually via GET/POST with the optional secret query parameter:
 *   POST /api/revalidate?secret=...
 *
 * Purges the Next.js 'sanity' fetch cache tags and invalidates route segments,
 * ensuring newly published content is reflected immediately without waiting
 * for ISR timers or clearing unrelated caches.
 */
async function handleRevalidation(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret");
    const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;

    if (configuredSecret && secret !== configuredSecret) {
      return NextResponse.json(
        { message: "Invalid revalidation secret" },
        { status: 401 },
      );
    }

    // Target the shared Sanity tag applied to all fetchSanity queries
    revalidateTag("sanity", { expire: 0 });

    // Revalidate root layout and static page paths
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Sanity cache revalidated successfully",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error during revalidation";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return handleRevalidation(req);
}

export async function GET(req: NextRequest) {
  return handleRevalidation(req);
}
