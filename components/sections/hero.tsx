"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/ui/hero-canvas"), {
  ssr: false,
});

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        0,
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          0.2,
        )
        .fromTo(
          descriptionRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0.35,
        )
        .fromTo(
          statsRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 },
          0.45,
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          0.6,
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#080808] pt-[72px]">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <HeroCanvas />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#080808]/40 via-transparent to-[#080808]/60" />

      <div className="relative z-10 w-full pointer-events-auto">
        <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-72px)] py-16">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[2px] bg-gradient-to-r from-amber-500 to-amber-500/30" />
                <span className="font-inter text-xs tracking-[0.3em] text-amber-500 uppercase font-medium">
                  Luxury Real Estate
                </span>
              </div>

              <div ref={titleRef}>
                <h1 className="text-5xl sm:text-6xl font-serif font-semibold sm:font-bold text-white leading-[1.08] tracking-tight">
                  Architected for
                  <br />
                  <span className="text-primary">Excellence</span>
                </h1>
              </div>

              <p
                ref={subtitleRef}
                className="text-lg sm:text-xl text-neutral-300 font-light max-w-md leading-relaxed"
              >
                Prime properties curated for discerning clients since 1984
              </p>

              <p
                ref={descriptionRef}
                className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-lg"
              >
                Experience uncompromising luxury. Every property reflects our
                commitment to architectural integrity, premium locations, and
                exceptional investment potential across the Eastern Province.
              </p>

              <div
                ref={statsRef}
                className="flex flex-row gap-10 sm:gap-14 pt-6 border-t border-white/10"
              >
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                    40+
                  </div>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest">
                    Years of Legacy
                  </p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                    500+
                  </div>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest">
                    Properties Managed
                  </p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                    98%
                  </div>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest">
                    Client Satisfaction
                  </p>
                </div>
              </div>

              <div
                ref={ctaRef}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <button className="group relative px-8 py-4 bg-primary-gradient text-neutral-950 font-bold text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#f59e0b]/25 rounded-md">
                  <span className="relative z-10">Explore Properties</span>
                  <div className="absolute inset-0 bg-white/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </button>
                <a
                  href="https://wa.me/966553846399"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 border border-[#f59e0b]/50 text-[#f59e0b] font-semibold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:border-[#f59e0b] hover:bg-[#f59e0b]/10 rounded-md"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Connect with Us</span>
                </a>
              </div>
            </div>

            <div className="hidden lg:block pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
