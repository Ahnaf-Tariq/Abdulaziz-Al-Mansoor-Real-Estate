"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            display: "none",
          });
        },
      });

      tl.fromTo(
        ".reveal-word",
        {
          y: 70,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.14,
          ease: "power4.out",
        },
      );

      tl.to(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.96,
          duration: 0.5,
          ease: "power3.in",
        },
        "+=0.8",
      );

      tl.to(topBarRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
      });

      tl.to(
        bottomBarRef.current,
        {
          yPercent: 100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "<",
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-none flex flex-col justify-between select-none"
    >
      <div
        ref={topBarRef}
        className="w-full h-1/2 bg-zinc-950 border-b border-zinc-900/40 relative"
      />
      <div
        ref={bottomBarRef}
        className="w-full h-1/2 bg-zinc-950 border-t border-zinc-900/40 relative"
      />

      <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
        <div ref={contentRef} className="text-center max-w-5xl">
          <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl text-zinc-100 font-medium tracking-tight leading-tight flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span className="inline-block overflow-hidden py-1">
              <span className="reveal-word inline-block font-semibold text-white">
                CURATING
              </span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="reveal-word inline-block text-amber-500 font-normal">
                EXCEPTIONAL
              </span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="reveal-word inline-block text-zinc-400 font-light italic">
                REAL ESTATE
              </span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="reveal-word inline-block font-semibold text-white">
                LEGACIES.
              </span>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
