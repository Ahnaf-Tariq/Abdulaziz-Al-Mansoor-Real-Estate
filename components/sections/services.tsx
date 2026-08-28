"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2,
  Megaphone,
  Wrench,
  Sparkles,
  Scale,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  icon: LucideIcon;
  image: string;
}

const services: ServiceItem[] = [
  {
    id: 1,
    icon: Wrench,
    title: "Maintenance",
    desc: "Providing emergency and preventative maintenance services through a specialized integrated management team to maintain the safety and quality of properties.",
    image: "https://almansoor.info/wp-content/uploads/2024/10/1-2.jpg.webp",
  },
  {
    id: 2,
    icon: Megaphone,
    title: "Real Estate Marketing",
    desc: "Implementing effective marketing plans to enhance property value and ensure unit occupancy at the highest value.",
    image: "https://almansoor.info/wp-content/uploads/2024/09/2.jpg",
  },
  {
    id: 3,
    icon: Building2,
    title: "Real Estate Management",
    desc: "Providing integrated property management services, including unit occupancy and leasing.",
    image: "https://almansoor.info/wp-content/uploads/2024/09/1.jpg",
  },
  {
    id: 4,
    icon: Scale,
    title: "Legal Department",
    desc: "Integrated legal management to support leasing operations and compliance with local regulations and laws.",
    image: "https://almansoor.info/wp-content/uploads/2024/09/3.jpg",
  },
  {
    id: 5,
    icon: Headphones,
    title: "Customer Service",
    desc: "Providing outstanding customer service to ensure customer satisfaction and a quick response to their needs.",
    image: "https://almansoor.info/wp-content/uploads/2024/09/1-1.jpg",
  },
  {
    id: 6,
    icon: Sparkles,
    title: "Cleanliness",
    desc: "Providing regular cleaning services to maintain the property's appearance and make it attractive to tenants.",
    image: "https://almansoor.info/wp-content/uploads/2024/10/1-2.jpg.webp",
  },
];

function formatNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function PanelShell({
  children,
  className,
  isActive,
  image,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  isActive?: boolean;
  image: string;
}) {
  return (
    <div
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 text-left outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isActive
          ? "border-amber-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          : "hover:border-zinc-700",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 z-0 bg-zinc-950 overflow-hidden">
        <Image
          src={image}
          alt="Service background"
          fill
          quality={90}
          className={cn(
            "object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu backface-hidden",
            isActive
              ? "scale-105 opacity-60"
              : "scale-100 opacity-30 group-hover:opacity-50",
          )}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 pointer-events-none" />
      </div>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500",
          isActive && "opacity-100",
        )}
        style={{
          background:
            "linear-gradient(180deg, rgba(217,119,6,0.15) 0%, transparent 40%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      {children}
    </div>
  );
}

function DesktopStrip({ items }: { items: ServiceItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);

  return (
    <div
      className="hidden h-[480px] w-full gap-3 md:flex"
      onMouseLeave={() => setActiveId(items[0]?.id ?? null)}
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        const isExpanded = activeId === item.id;
        const number = formatNumber(index);

        return (
          <PanelShell
            key={item.id}
            isActive={isExpanded}
            image={item.image}
            aria-expanded={isExpanded}
            aria-label={item.title}
            onMouseEnter={() => setActiveId(item.id)}
            onFocus={() => setActiveId(item.id)}
            className="flex h-full min-w-0 flex-col"
            style={{
              flexGrow: isExpanded ? 5 : 1,
              flexBasis: 0,
            }}
          >
            <span className="absolute right-4 top-4 z-20 font-inter text-xs font-bold tracking-[0.2em] text-white/40">
              {number}
            </span>

            <div
              className={cn(
                "relative z-20 flex h-full flex-col items-center justify-between px-3 py-8 transition-opacity duration-300",
                isExpanded ? "pointer-events-none opacity-0" : "opacity-100",
              )}
              aria-hidden={isExpanded}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700/60 bg-black/40 text-amber-500 backdrop-blur-md">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <span
                className="mt-auto font-playfair text-base font-medium tracking-wide whitespace-nowrap text-zinc-200"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {item.title}
              </span>
            </div>

            <div
              className={cn(
                "absolute inset-0 z-20 flex flex-col justify-between p-8",
                "transition-all duration-500",
                isExpanded
                  ? "opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 translate-y-4",
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500 backdrop-blur-md">
                  <Icon size={24} strokeWidth={1.75} />
                </div>
                <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500 backdrop-blur-md">
                  Capability
                </span>
              </div>

              <div className="max-w-xl">
                <div aria-hidden className="mb-4 h-[1px] w-12 bg-amber-500" />
                <h3 className="mb-3 font-playfair text-2xl font-medium tracking-tight text-white lg:text-3xl">
                  {item.title}
                </h3>
                <p className="font-inter text-sm leading-relaxed text-zinc-300 lg:text-base">
                  {item.desc}
                </p>
              </div>
            </div>
          </PanelShell>
        );
      })}
    </div>
  );
}

function MobileAccordion({ items }: { items: ServiceItem[] }) {
  const [activeId, setActiveId] = useState<number | null>(items[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-3 md:hidden">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isExpanded = activeId === item.id;
        const number = formatNumber(index);

        return (
          <PanelShell
            key={item.id}
            isActive={!!isExpanded}
            image={item.image}
            aria-expanded={isExpanded}
            onClick={() =>
              setActiveId((current) => (current === item.id ? null : item.id))
            }
            className={cn(
              "w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isExpanded ? "max-h-96" : "max-h-[80px]",
            )}
          >
            <div className="relative z-20 flex items-center gap-4 px-5 py-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500 backdrop-blur-md">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <span className="min-w-0 flex-1 font-playfair text-lg font-medium tracking-tight text-white">
                {item.title}
              </span>
              <span className="font-inter text-xs font-semibold tracking-[0.2em] text-zinc-500">
                {number}
              </span>
            </div>

            <div
              className={cn(
                "relative z-20 overflow-hidden px-5 transition-all duration-300",
                isExpanded
                  ? "pb-6 opacity-100"
                  : "pointer-events-none h-0 pb-0 opacity-0",
              )}
            >
              <div
                aria-hidden
                className="mb-3 ml-14 h-[1px] w-10 bg-amber-500"
              />
              <p className="pl-14 font-inter text-sm leading-relaxed text-zinc-300">
                {item.desc}
              </p>
            </div>
          </PanelShell>
        );
      })}
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-28 px-6 lg:px-12 text-white"
    >
      <div className="pointer-events-none absolute top-1/3 right-0 h-96 w-96 rounded-full bg-amber-500/5 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="services-reveal flex items-center gap-3 mb-6">
          <span className="h-[1px] w-10 bg-amber-500" />
          <span className="font-inter text-xs uppercase tracking-[0.25em] font-semibold text-amber-500">
            OUR SERVICES
          </span>
        </div>

        <div className="services-reveal mb-16 max-w-3xl">
          <h2 className="font-playfair text-4xl font-medium leading-[1.15] text-zinc-100 sm:text-5xl lg:text-6xl">
            Comprehensive property management,{" "}
            <span className="italic text-amber-500">end to end.</span>
          </h2>
        </div>

        <div className="services-reveal">
          <DesktopStrip items={services} />
          <MobileAccordion items={services} />
        </div>
      </div>
    </section>
  );
}
