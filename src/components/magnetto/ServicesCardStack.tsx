"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

/**
 * Stack of image cards that cycle:
 * front card slides LEFT and fades, moves behind the stack,
 * next card becomes front. Repeat infinitely.
 */

const STACK_IMAGES = [
  { src: "/nav-avatar.jpg", alt: "Project 1", bg: "#c0392b" },
  { src: "/hero-portrait.jpg", alt: "Project 2", bg: "#e6922e" },
  { src: "/nav-avatar.jpg", alt: "Project 3", bg: "#2d8f6f" },
];

const INTERVAL_MS = 3000; // time each card stays as front
const TRANSITION_MS = 700; // slide-out animation duration

export default function ServicesCardStack() {
  const [order, setOrder] = useState<number[]>([0, 1, 2]);
  const [animating, setAnimating] = useState(false);

  const cycle = useCallback(() => {
    setAnimating(true);
    // After the slide-out transition completes, rotate the order
    setTimeout(() => {
      setOrder((prev) => {
        const next = [...prev];
        const front = next.shift()!;
        next.push(front);
        return next;
      });
      setAnimating(false);
    }, TRANSITION_MS);
  }, []);

  useEffect(() => {
    const id = setInterval(cycle, INTERVAL_MS);
    return () => clearInterval(id);
  }, [cycle]);

  /**
   * Visual stack layout (3 cards):
   *  index 0 → FRONT   (z-30, no offset)
   *  index 1 → MIDDLE  (z-20, offset right + slight rotate)
   *  index 2 → BACK    (z-10, offset right more + slight rotate)
   *
   * When animating, index 0 slides hard-left and fades out.
   */

  const cardW = "clamp(120px, 9.5vw, 165px)";
  const cardH = "clamp(155px, 13vw, 225px)";

  return (
    <div
      className="relative mx-auto"
      style={{ width: "clamp(200px, 18vw, 320px)", height: "clamp(170px, 14.5vw, 250px)" }}
    >
      {order.map((imgIdx, stackPos) => {
        const isFront = stackPos === 0;
        const isMiddle = stackPos === 1;

        // Base transforms for each stack position
        let tx = 0;
        let rotate = 0;
        let z = 30 - stackPos * 10;
        let scale = 1 - stackPos * 0.05;
        let opacity = 1;

        if (isMiddle) {
          tx = 18;
          rotate = 4;
        } else if (stackPos === 2) {
          tx = 36;
          rotate = 8;
        }

        // When animating, the front card slides left and fades
        if (animating && isFront) {
          tx = -140;
          rotate = -12;
          opacity = 0;
          z = 5; // move behind
        }

        return (
          <div
            key={imgIdx}
            className="absolute overflow-hidden shadow-xl"
            style={{
              width: cardW,
              height: cardH,
              borderRadius: "clamp(14px, 1.1vw, 18px)",
              left: "50%",
              top: "50%",
              zIndex: z,
              transform: `translate(-50%, -50%) translateX(${tx}px) rotate(${rotate}deg) scale(${scale})`,
              opacity,
              transition: animating
                ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${TRANSITION_MS}ms ease`
                : "transform 0.35s ease, opacity 0.35s ease",
            }}
          >
            <Image
              src={STACK_IMAGES[imgIdx].src}
              alt={STACK_IMAGES[imgIdx].alt}
              fill
              className="object-cover"
              sizes="200px"
            />
            {/* Colour tint overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: STACK_IMAGES[imgIdx].bg,
                mixBlendMode: "multiply",
                opacity: 0.35,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
