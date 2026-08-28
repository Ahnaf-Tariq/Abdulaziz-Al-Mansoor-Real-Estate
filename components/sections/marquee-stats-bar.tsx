"use client";

import { useState } from "react";

const items = [
  "40+ Years of Experience",
  "Residential Management",
  "Commercial Management",
  "Industrial Properties",
  "Special Purpose Properties",
  "Dammam",
  "Al-Khobar",
  "Property Marketing",
  "Emergency Maintenance",
  "Legal Management",
  "0553846399",
];

export default function MarqueeBar() {
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden bg-zinc-950 border-y border-amber-500/20 py-4 shadow-[0_0_25px_rgba(0,0,0,0.8)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style jsx>{`
        @keyframes marqueeSmooth {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>

      <div className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none bg-gradient-to-l from-zinc-950 via-zinc-950/90 to-transparent" />

      <div className="flex w-max">
        <div
          className="flex shrink-0 items-center"
          style={{
            animation: "marqueeSmooth 50s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {duplicatedItems.map((text, i) => (
            <div key={i} className="flex items-center">
              <span className="font-inter text-zinc-400 hover:text-white font-medium text-xs tracking-[0.25em] uppercase transition-all duration-300 whitespace-nowrap px-4 py-1.5 rounded-full cursor-pointer">
                {text}
              </span>

              <div className="mx-6 flex items-center justify-center shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
