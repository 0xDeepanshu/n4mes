"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "lenis/dist/lenis.css";

const SmoothScrollContext = createContext<Lenis | null>(null);

/**
 * Access the global Lenis smooth-scroll instance.
 */
export function useSmoothScroll(): Lenis | null {
  return useContext(SmoothScrollContext);
}

/**
 * Alias hook for Lenis instance access.
 */
export const useLenis = useSmoothScroll;

export interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Global smooth scroll provider using Lenis.
 *
 * Guarantees:
 * - Single Lenis instance across the application
 * - Subtle, premium, non-floaty scroll feel
 * - Framer Motion animations (reveals, whileInView, transitions) continue to work
 * - Fully respects prefers-reduced-motion (disables Lenis, allows native browser scrolling)
 * - Preserves horizontal carousels (FlexCarousel) and interactive elements
 * - Bypasses /studio CMS route where native pane scrolling is desired
 * - Integrates same-page hash links and anchor navigation smoothly
 */
function InnerSmoothScrollProvider({
  children,
  pathname,
}: {
  children: ReactNode;
  pathname: string | null;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Check if reduced motion is requested by the OS / user
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const initLenis = () => {
      // Clean up previous instance if any
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        setLenisInstance(null);
      }

      // If reduced motion is active, do not run Lenis
      if (reducedMotionQuery.matches) {
        return;
      }

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        syncTouch: false, // Normal native touch behavior on mobile / touch devices
        touchMultiplier: 1,
        wheelMultiplier: 1,
        autoRaf: true, // Efficient internal RAF loop
        anchors: true, // Smooth anchor link navigation
        prevent: (node: HTMLElement) => {
          // Do not hijack horizontal carousels, custom wheel listeners, or explicitly prevented elements
          return Boolean(
            node?.closest?.(
              '[data-lenis-prevent], [data-lenis-prevent-wheel], [aria-roledescription="carousel"], .lenis-prevent',
            ),
          );
        },
        virtualScroll: (data) => {
          // If the wheel/touch gesture is primarily horizontal, don't hijack it with vertical smooth scroll
          if (Math.abs(data.deltaX) > Math.abs(data.deltaY)) {
            return false;
          }
          return true;
        },
      });

      lenisRef.current = lenis;
      setLenisInstance(lenis);

      // Scroll to hash if URL contains one on initial page mount
      if (window.location.hash) {
        const hashTarget = document.querySelector(window.location.hash);
        if (hashTarget) {
          setTimeout(() => {
            lenis.scrollTo(hashTarget as HTMLElement, { offset: 0 });
          }, 60);
        }
      }
    };

    initLenis();

    // Listen for real-time changes to prefers-reduced-motion preference
    const handleReducedMotionChange = () => {
      initLenis();
    };

    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange,
      );
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        setLenisInstance(null);
      }
    };
  }, []);

  // Route change: ensure page scrolls to top on new navigation unless navigating to a hash
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (!window.location.hash && lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname]);

  return (
    <SmoothScrollContext.Provider value={lenisInstance}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <InnerSmoothScrollProvider pathname={pathname}>
      {children}
    </InnerSmoothScrollProvider>
  );
}
