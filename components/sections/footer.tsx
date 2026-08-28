"use client";

import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const navLinks = [
  { label: "Properties", href: "#properties" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  { label: "Property & Facility Management", href: "#services" },
  { label: "Real Estate Marketing", href: "#services" },
  { label: "Maintenance", href: "#services" },
  { label: "Legal Management", href: "#services" },
];

const socials = [
  {
    id: "phone",
    label: "Phone",
    href: "tel:+966553846399",
    icon: Phone,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/966553846399",
    icon: FaWhatsapp,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:info@almansoor.info",
    icon: Mail,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/almansooraziz",
    icon: FaInstagram,
  },
  {
    id: "messenger",
    label: "Messenger",
    href: "https://m.me/almansoor.office",
    icon: FaFacebookMessenger,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/almansoor.office/",
    icon: FaFacebook,
  },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800/80 pt-20 pb-12 px-6 lg:px-12 overflow-hidden text-zinc-100">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <a
                href="#"
                className="inline-block transition-transform duration-300 hover:scale-[1.02] mb-6"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className="relative h-14 w-48 shrink-0 flex items-center justify-start">
                  <Image
                    src="https://almansoor.info/wp-content/uploads/2023/08/logo-1.png"
                    alt="AbdulAziz AlMansoor Real Estate Management"
                    width={280}
                    height={80}
                    className="object-contain w-full h-full brightness-200 contrast-200 filter drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                    priority
                  />
                </div>
              </a>

              <p className="font-inter text-sm text-zinc-400 leading-relaxed max-w-sm mb-8">
                Dammam&apos;s most trusted property management group since 1984
                — managing residential, commercial, and industrial real estate
                across the Eastern Province.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-300 flex items-center justify-center group"
                  >
                    <Icon
                      size={16}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-inter text-xs tracking-[0.2em] text-amber-500 uppercase font-semibold mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="group flex items-center gap-1 font-inter text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-300"
                  >
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-inter text-xs tracking-[0.2em] text-amber-500 uppercase font-semibold mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-3.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="group flex items-center gap-1 font-inter text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-300 text-left"
                  >
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-inter text-xs tracking-[0.2em] text-amber-500 uppercase font-semibold mb-6">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-zinc-400 font-inter leading-relaxed">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0 mt-0.5">
                  <MapPin size={15} />
                </div>
                <span>Dammam, Eastern Province, Kingdom of Saudi Arabia</span>
              </li>

              <li>
                <a
                  href="tel:+966553846399"
                  className="flex items-center gap-3 text-sm text-zinc-400 hover:text-amber-400 transition-colors duration-300 font-inter group"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                    <Phone size={15} />
                  </div>
                  <span>+966 55 384 6399</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:info@almansoor.sa"
                  className="flex items-center gap-3 text-sm text-zinc-400 hover:text-amber-400 transition-colors duration-300 font-inter group"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                    <Mail size={15} />
                  </div>
                  <span>info@almansoor.sa</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-inter">
          <p>
            © {new Date().getFullYear()} Al-Mansoor Real Estate. All rights
            reserved.
          </p>
          <p className="text-amber-500/80 font-semibold tracking-wider">
            Abdulaziz Al-Mansour Management Group
          </p>
        </div>
      </div>
    </footer>
  );
}
