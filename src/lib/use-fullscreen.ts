"use client";

import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type FullscreenCapableElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type FullscreenCapableDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenEnabled?: boolean;
};

type FullscreenCapableVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

function activeFullscreenElement(
  doc: FullscreenCapableDocument,
  video: FullscreenCapableVideo | null,
): boolean {
  return (
    Boolean(doc.fullscreenElement) ||
    Boolean(doc.webkitFullscreenElement) ||
    Boolean(video?.webkitDisplayingFullscreen)
  );
}

/**
 * Browser Fullscreen API wrapper (no CSS fakes).
 *
 * Enter: element.requestFullscreen() (with webkit fallback); when the
 * container cannot go fullscreen (iOS Safari), a wrapped <video> falls back
 * to the native video fullscreen (webkitEnterFullscreen).
 * Exit: document.exitFullscreen() / webkitExitFullscreen(), native UI on iOS.
 * The `supported` flag lets callers hide the control gracefully when no
 * fullscreen path exists at all.
 */
export function useFullscreen<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  videoRef?: RefObject<HTMLVideoElement | null>,
) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [supported, setSupported] = useState(false);
  const activeRef = useRef(false);

  useEffect(() => {
    const doc = document as FullscreenCapableDocument;
    const videoApi =
      typeof HTMLVideoElement !== "undefined" &&
      "webkitEnterFullscreen" in HTMLVideoElement.prototype;
    const containerApi =
      typeof Element !== "undefined" &&
      ("requestFullscreen" in Element.prototype ||
        "webkitRequestFullscreen" in Element.prototype);

    setSupported(containerApi || Boolean(videoApi && videoRef));
    activeRef.current = activeFullscreenElement(
      doc,
      (videoRef?.current as FullscreenCapableVideo | null) ?? null,
    );
    setIsFullscreen(activeRef.current);

    const sync = () => {
      activeRef.current = activeFullscreenElement(
        doc,
        (videoRef?.current as FullscreenCapableVideo | null) ?? null,
      );
      setIsFullscreen(activeRef.current);
    };

    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, [videoRef]);

  const toggle = useCallback(async () => {
    const doc = document as FullscreenCapableDocument;
    const container = containerRef.current as FullscreenCapableElement | null;
    const video = videoRef?.current as FullscreenCapableVideo | null;

    if (activeFullscreenElement(doc, video)) {
      // Exit: element fullscreen via the document, native video fullscreen
      // on iOS exits through its own UI (no JS API) — handled gracefully.
      if (doc.fullscreenElement && doc.exitFullscreen) {
        await doc.exitFullscreen().catch(() => {});
      } else if (doc.webkitFullscreenElement && doc.webkitExitFullscreen) {
        await Promise.resolve(doc.webkitExitFullscreen()).catch(() => {});
      }
      return;
    }

    if (container?.requestFullscreen) {
      await container.requestFullscreen().catch(() => {});
      return;
    }
    if (container?.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
      return;
    }
    if (video?.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  }, [containerRef, videoRef]);

  return { isFullscreen, supported, toggle };
}
