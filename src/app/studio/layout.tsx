import type { Metadata, Viewport } from "next";
import {
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "N4MES Studio",
};

export const viewport: Viewport = {
  ...studioViewport,
  interactiveWidget: "resizes-content",
};

/**
 * Isolated layout for Sanity Studio.
 *
 * Ensures Sanity Studio's nested pane architecture, sidebar, form scrolling,
 * and dialogs operate within a clean, full-height viewport container with native
 * scrollbars, completely isolated from global site overflow and smooth-scrolling.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="sanity-studio-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        maxHeight: "100dvh",
        overflow: "hidden",
        zIndex: 999999,
        backgroundColor: "#101112",
      }}
    >
      {children}
    </div>
  );
}
