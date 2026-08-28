"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 97,
    suffix: "%",
    label: "Occupancy Rate",
    desc: "Serving Eastern Province",
  },
  {
    value: 1900,
    suffix: "+",
    label: "Happy Clients",
    desc: "Trusted & growing",
  },
  {
    value: 2000,
    suffix: "+",
    label: "Units Managed",
    desc: "Across the region",
  },
  {
    value: 200,
    suffix: "+",
    label: "Properties",
    desc: "Residential & commercial",
  },
];

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.01,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`[perspective:1000px] h-full w-full ${className}`}
    >
      <div
        ref={cardRef}
        className="h-full w-full will-change-transform [transform-style:preserve-3d]"
      >
        {children}
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      statRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          onEnter: () => {
            if (animated.current) return;
            animated.current = true;
            statRefs.current.forEach((statEl, j) => {
              if (!statEl) return;
              const target = stats[j].value;
              gsap.fromTo(
                { val: 0 },
                { val: target },
                {
                  duration: 2.2,
                  ease: "power2.out",
                  delay: j * 0.1,
                  onUpdate: function () {
                    statEl.textContent = Math.round(
                      this.targets()[0].val,
                    ).toString();
                  },
                },
              );
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-40 px-6 lg:px-12 bg-black text-white relative overflow-hidden"
    >
      <div className="absolute top-1/3 -left-52 w-96 h-96 bg-amber-500/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[600px] h-[600px] bg-amber-600/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="about-reveal mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-amber-500 to-amber-500/30" />
            <span className="font-inter text-xs tracking-[0.3em] text-amber-500 uppercase font-medium">
              About Our Legacy
            </span>
          </div>
          <h2 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] max-w-5xl">
            Architecting Excellence
          </h2>
          <p className="font-inter text-base md:text-lg text-zinc-400 mt-6 max-w-2xl leading-relaxed">
            Pioneering real estate solutions across the Eastern Province since
            1984. We transform properties into lasting value through expertise,
            integrity, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 mt-10">
          <div className="about-reveal lg:col-span-2">
            <TiltCard>
              <div className="relative h-[420px] sm:h-[520px] w-full rounded-3xl overflow-hidden border border-zinc-800/40 shadow-2xl group bg-zinc-950">
                <Image
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85"
                  alt="Al-Mansoor Real Estate"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-75 contrast-110"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20" />

                <div className="absolute top-8 left-8 backdrop-blur-md bg-black/50 border border-amber-500/30 rounded-full px-6 py-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-inter text-xs text-zinc-100 tracking-wider uppercase font-medium">
                    Since 1984 · Dammam
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="font-inter text-xs tracking-[0.2em] text-amber-500 uppercase font-semibold mb-2">
                        Our Story
                      </p>
                      <p className="font-playfair text-4xl font-bold text-white">
                        40+
                      </p>
                      <p className="font-inter text-sm text-zinc-400 mt-1">
                        Years of expertise
                      </p>
                    </div>
                    <div>
                      <p className="font-inter text-xs tracking-[0.2em] text-amber-500 uppercase font-semibold mb-2">
                        Portfolio
                      </p>
                      <p className="font-playfair text-4xl font-bold text-white">
                        500+
                      </p>
                      <p className="font-inter text-sm text-zinc-400 mt-1">
                        Properties managed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          <div className="about-reveal flex flex-col gap-3.5">
            <TiltCard>
              <div className="relative h-full min-h-[250px] rounded-3xl border border-zinc-800/40 p-8 overflow-hidden bg-gradient-to-br from-zinc-900/60 via-zinc-950/40 to-black group hover:border-amber-500/20 transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:border-amber-500/60 transition-all duration-500">
                    <svg
                      className="w-7 h-7 text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-playfair text-2xl text-white mb-3 font-semibold">
                    Our Mission
                  </h3>
                  <p className="font-inter text-zinc-400 leading-relaxed text-sm">
                    Maximize property value through strategic asset management,
                    investor-focused solutions, and exceptional governance.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard>
              <div className="relative h-full min-h-[250px] rounded-3xl border border-zinc-800/40 p-8 overflow-hidden bg-gradient-to-br from-zinc-900/60 via-zinc-950/40 to-black group hover:border-amber-500/20 transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:border-amber-500/60 transition-all duration-500">
                    <svg
                      className="w-7 h-7 text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-playfair text-2xl text-white mb-3 font-semibold">
                    Our Vision
                  </h3>
                  <p className="font-inter text-zinc-400 leading-relaxed text-sm">
                    Lead the region as the premier real estate partner, setting
                    standards for modern management and sustainable growth.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        <div className="about-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <TiltCard key={i}>
              <div className="relative rounded-2xl border border-zinc-800/40 p-8 overflow-hidden bg-gradient-to-br from-zinc-900/60 via-zinc-950/40 to-black group hover:border-amber-500/20 transition-all duration-500 flex flex-col justify-center group h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-all duration-500" />

                <div className="relative z-10 text-center lg:text-left">
                  <div className="flex items-baseline gap-1 mb-4 justify-center lg:justify-start">
                    <span
                      ref={(el) => {
                        statRefs.current[i] = el;
                      }}
                      className="font-playfair text-4xl md:text-5xl font-semibold text-white tracking-tighter"
                    >
                      {stat.value}
                    </span>
                    <span className="font-playfair text-xl md:text-2xl font-bold text-amber-500 -mb-2">
                      {stat.suffix}
                    </span>
                  </div>
                  <h4 className="font-inter text-sm font-semibold text-zinc-100 tracking-wide mb-2">
                    {stat.label}
                  </h4>
                  <p className="font-inter text-xs text-zinc-500">
                    {stat.desc}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
