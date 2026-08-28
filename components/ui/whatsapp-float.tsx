"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, Mail, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const socialActions = [
  {
    id: "phone",
    label: "Call Us",
    href: "tel:+966553846399",
    icon: Phone,
    bgClass: "bg-emerald-500 hover:bg-emerald-400 text-white",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/966553846399",
    icon: FaWhatsapp,
    bgClass: "bg-green-500 hover:bg-green-400 text-white",
  },
  {
    id: "email",
    label: "Email Us",
    href: "mailto:info@almansoor.info",
    icon: Mail,
    bgClass: "bg-rose-500 hover:bg-rose-400 text-white",
  },
  {
    id: "instagram",
    label: "Instagram Page",
    href: "https://www.instagram.com/almansooraziz",
    icon: FaInstagram,
    bgClass:
      "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white",
  },
  {
    id: "telegram",
    label: "Telegram Channel",
    href: "https://m.me/almansoor.office",
    icon: FaFacebookMessenger,
    bgClass: "bg-sky-500 hover:bg-sky-400 text-white",
  },
  {
    id: "share",
    label: "Direct Link",
    href: "https://www.facebook.com/almansoor.office/",
    icon: FaFacebook,
    bgClass: "bg-blue-600 hover:bg-blue-500 text-white",
  },
];

export default function SocialFloatingBar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <aside
      ref={containerRef}
      aria-label="Floating quick contact actions"
      className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3"
    >
      <div
        className={cn(
          "flex flex-col gap-3 transition-all duration-300 ease-out origin-bottom",
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-6 pointer-events-none",
        )}
      >
        {socialActions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.id}
              className="group flex items-center gap-3 justify-end"
            >
              <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-xs font-semibold tracking-wide text-zinc-100 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md whitespace-nowrap pointer-events-none">
                {action.label}
              </span>

              <a
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                aria-label={action.label}
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10",
                  action.bgClass,
                )}
              >
                <Icon size={20} strokeWidth={2} />
              </a>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close quick menu" : "Open quick menu"}
        className={cn(
          "w-13 h-13 rounded-full flex items-center justify-center text-white shadow-[0_0_25px_rgba(0,0,0,0.5)] transition-all duration-300 border border-white/20 active:scale-95",
          isOpen
            ? "bg-zinc-900 text-zinc-300 rotate-180 hover:bg-zinc-800"
            : "bg-black text-white hover:scale-105",
        )}
      >
        {isOpen ? (
          <X size={24} strokeWidth={2.5} />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageCircle
              size={26}
              strokeWidth={2.2}
              className="text-emerald-400"
            />
            <Plus
              size={12}
              strokeWidth={3}
              className="absolute -top-1 -right-1 text-amber-400"
            />
          </div>
        )}
      </button>
    </aside>
  );
}
