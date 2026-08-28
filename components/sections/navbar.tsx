"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Properties", href: "#properties" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });

    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 },
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-1.5 transition-all duration-300">
      <nav
        ref={navRef}
        className={cn(
          "max-w-7xl mx-auto rounded-full transition-all duration-500 ease-out border ",
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-amber-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] py-1.5 px-3"
            : "bg-transparent border-transparent py-3.5 px-6",
        )}
      >
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="flex items-center group transition-transform duration-300 hover:scale-[1.03]"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="relative h-12 w-40 sm:h-14 sm:w-44 shrink-0 flex items-center justify-start">
              <Image
                src="https://almansoor.info/wp-content/uploads/2023/08/logo-1.png"
                alt="AbdulAziz AlMansoor Real Estate Management"
                width={280}
                height={80}
                className="object-contain w-full h-full brightness-200 contrast-200 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                priority
              />
            </div>
          </a>

          <ul className="hidden md:flex items-center gap-8 bg-neutral-950/60 border border-white/10 rounded-full px-8 py-2.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="relative text-xs tracking-[0.15em] text-neutral-300 hover:text-amber-400 transition-colors duration-300 uppercase font-medium group py-1"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center">
            <a
              href="https://wa.me/966553846399"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-gradient text-neutral-950 font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.5)] hover:scale-[1.03] group overflow-hidden"
            >
              <Phone className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-12" />
              <span>0553846399</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-full border border-neutral-800 text-neutral-200 hover:text-amber-400 hover:border-amber-500/50 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-4 rounded-2xl bg-neutral-900/95 border border-amber-500/20 p-6 backdrop-blur-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left text-sm tracking-widest text-neutral-300 hover:text-amber-400 transition-colors uppercase py-2 border-b border-neutral-800/60"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://wa.me/966553846399"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-semibold text-xs tracking-widest uppercase shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Us — 0553846399</span>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
