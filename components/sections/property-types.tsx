"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    title: "Residential Properties",
    desc: "Apartments, villas, and bachelor accommodations — full leasing, maintenance, and tenant management handled with care.",
    location: "Dammam · Al-Khobar",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=85",
    tag: "Residential",
  },
  {
    title: "Commercial Properties",
    desc: "Offices, retail shops, and commercial units — operational oversight and maximum investment returns for owners.",
    location: "Eastern Province",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85",
    tag: "Commercial",
  },
  {
    title: "Industrial Properties",
    desc: "Industrial facilities with preventive maintenance, operational management, and efficiency optimization across the region.",
    location: "Dammam",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85",
    tag: "Industrial",
  },
  {
    title: "Special Purpose Properties",
    desc: "Medical, educational, and specialized facilities — tailored management for unique operational needs and compliance.",
    location: "Eastern Province",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=85",
    tag: "Special Purpose",
  },
];

export default function PropertyTypes() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".prop-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".prop-heading", start: "top 85%" },
        },
      );

      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;

      const getScrollAmount = () => -(track.scrollWidth - wrapper.offsetWidth);

      const horizontalScroll = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => horizontalScroll.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="properties"
      ref={sectionRef}
      className="bg-black text-white relative"
    >
      <div className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto prop-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[1px] bg-amber-500" />
            <span className="font-inter text-xs tracking-[0.25em] text-amber-500 uppercase font-semibold">
              WHAT WE MANAGE
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-medium text-zinc-100 leading-[1.15]">
              Every property type.
              <br />
              <span className="italic text-amber-500">One trusted group.</span>
            </h2>
            <p className="font-inter text-sm md:text-base text-zinc-400 max-w-sm leading-relaxed">
              Scroll through our four core areas of property management
              expertise.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="overflow-hidden relative"
        style={{ height: "100vh" }}
      >
        <div
          ref={trackRef}
          className="flex gap-8 px-6 lg:px-12 h-full items-center"
          style={{ width: "max-content" }}
        >
          {properties.map((prop, i) => (
            <div
              key={i}
              className="group relative flex-shrink-0 w-[340px] sm:w-[420px] h-[540px] rounded-3xl bg-zinc-950 border border-zinc-800/80 overflow-hidden flex flex-col justify-between p-7 hover:border-amber-500/50 transition-all duration-500 shadow-2xl"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  quality={90}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-40 group-hover:opacity-50 transform-gpu backface-hidden"
                  sizes="(max-width: 768px) 340px, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30 pointer-events-none" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-inter text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                  {prop.tag}
                </span>
                <span className="font-playfair text-3xl font-bold text-white/20 group-hover:text-amber-500/40 transition-colors">
                  0{i + 1}
                </span>
              </div>

              <div className="relative z-10 flex flex-col gap-4">
                <h3 className="font-playfair text-2xl sm:text-3xl text-zinc-100 font-medium leading-snug">
                  {prop.title}
                </h3>
                <p className="font-inter text-sm text-zinc-400 leading-relaxed">
                  {prop.desc}
                </p>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-amber-500" />
                    <span className="font-inter text-xs text-zinc-400">
                      {prop.location}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-500 transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex-shrink-0 w-12 sm:w-24" />
        </div>
      </div>
    </section>
  );
}
