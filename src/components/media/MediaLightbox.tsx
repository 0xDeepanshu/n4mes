"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize, Minimize, X } from "lucide-react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import VideoPlayer from "@/components/ui/video-player";
import type { LightboxMedia } from "@/lib/lightbox";
import { useFullscreen } from "@/lib/use-fullscreen";
import { cn } from "@/lib/utils";

type MediaLightboxContextValue = {
  open: (media: LightboxMedia) => void;
  close: () => void;
};

const MediaLightboxContext = createContext<MediaLightboxContextValue | null>(
  null,
);

/** Null when rendered outside a provider (e.g. the home page). */
export function useOptionalMediaLightbox() {
  return useContext(MediaLightboxContext);
}

/**
 * Clickable overlay for a media slot: a real <button> (keyboard
 * accessible, labelled) that opens the page-level viewer. Renders nothing
 * when no provider is mounted, so pages without a viewer are untouched.
 */
export function MediaOpenButton({
  media,
  label,
  className,
}: {
  media: LightboxMedia;
  label: string;
  className?: string;
}) {
  const lightbox = useOptionalMediaLightbox();
  if (!lightbox) return null;

  return (
    <button
      type="button"
      data-media-open="true"
      aria-label={label}
      onClick={() => lightbox.open(media)}
      className={cn(
        "absolute inset-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-inset",
        className,
      )}
    />
  );
}

/** Provider: one viewer per page (detail / category), children untouched. */
export function MediaLightboxProvider({ children }: { children: ReactNode }) {
  const [media, setMedia] = useState<LightboxMedia | null>(null);
  const lightbox = useSmoothScroll();
  const openerRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  const open = useCallback((next: LightboxMedia) => {
    if (!wasOpenRef.current) {
      openerRef.current = document.activeElement as HTMLElement | null;
    }
    setMedia(next);
  }, []);

  const close = useCallback(() => setMedia(null), []);

  // Background scroll lock while open — previous values are restored
  // (never a permanent overflow lock), the exact scroll position is kept,
  // and Lenis is paused/resumed so SmoothScroll is untouched when closed.
  useEffect(() => {
    if (!media) return;

    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = documentElement.style.overflow;
    const scrollY = window.scrollY;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    lightbox?.stop();
    // Align Lenis' internal target with the frozen position; otherwise an
    // in-flight smooth-scroll animation keeps moving the background after
    // stop(). The scroll listener is a native backstop for the same drift.
    lightbox?.scrollTo(scrollY, { immediate: true, force: true, lock: true });
    const pin = () => {
      if (window.scrollY !== scrollY) {
        window.scrollTo({ top: scrollY, behavior: "instant" });
      }
    };
    pin();
    window.addEventListener("scroll", pin, { passive: true });

    return () => {
      window.removeEventListener("scroll", pin);
      body.style.overflow = prevBodyOverflow;
      documentElement.style.overflow = prevHtmlOverflow;
      lightbox?.start();
      lightbox?.scrollTo(scrollY, { immediate: true, force: true });
      if (window.scrollY !== scrollY) {
        window.scrollTo({ top: scrollY, behavior: "instant" });
      }
    };
  }, [media, lightbox]);

  // Escape closes the viewer.
  useEffect(() => {
    if (!media) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [media, close]);

  // Sensible focus behavior: remember the trigger, return focus on close.
  useEffect(() => {
    if (media && !wasOpenRef.current) {
      wasOpenRef.current = true;
    } else if (!media && wasOpenRef.current) {
      wasOpenRef.current = false;
      openerRef.current?.focus?.();
      openerRef.current = null;
    }
  }, [media]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <MediaLightboxContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {media && (
          <MediaLightbox key="media-lightbox" media={media} onClose={close} />
        )}
      </AnimatePresence>
    </MediaLightboxContext.Provider>
  );
}

/** The modal itself: dark backdrop, close button, media content. */
function MediaLightbox({
  media,
  onClose,
}: {
  media: LightboxMedia;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Keep Tab cycling inside the dialog while it is open. Window-level so it
  // still runs when focus sits on <body> (e.g. right after exiting
  // fullscreen), which a dialog-scoped onKeyDown would miss.
  useEffect(() => {
    const root = backdropRef.current;
    if (!root) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[tabindex], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.getClientRects().length > 0);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      const inside = root.contains(active);

      if (event.shiftKey) {
        if (!inside || active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (!inside || active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <motion.div
      ref={backdropRef}
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {/* -------- CLOSE -------- */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close media viewer"
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* -------- MEDIA (clicking it never closes the viewer) -------- */}
      <motion.div
        className="relative flex max-h-full max-w-full items-center justify-center"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        {media.type === "video" ? (
          <VideoPlayer src={media.src} poster={media.poster} autoPlay />
        ) : (
          <LightboxImage media={media} />
        )}
      </motion.div>
    </motion.div>
  );
}

/** Fullscreen-capable image stage: largest size, aspect preserved, centered. */
function LightboxImage({ media }: { media: LightboxMedia }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, supported, toggle } = useFullscreen(containerRef);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center",
        isFullscreen
          ? "h-screen w-screen bg-black"
          : "max-h-[85vh] max-w-[92vw] rounded-xl overflow-hidden",
      )}
    >
      {/* biome-ignore lint/performance/noImgElement: the viewer sizes
          arbitrary-aspect local/Sanity media at intrinsic dimensions —
          next/image needs known width/height or a fixed fill container */}
      <img
        src={media.src}
        alt={media.alt ?? ""}
        draggable={false}
        className={cn(
          "block h-auto w-auto max-w-full object-contain select-none",
          isFullscreen
            ? "max-h-full max-w-full"
            : "max-h-[85vh] max-w-[92vw] rounded-xl",
        )}
      />
      {supported && (
        <button
          type="button"
          onClick={toggle}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          {isFullscreen ? (
            <Minimize className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Maximize className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
