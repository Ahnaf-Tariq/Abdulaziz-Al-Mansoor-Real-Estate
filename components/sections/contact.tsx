"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Check,
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  Building2,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const propertyTypes = [
  { id: "Residential", label: "Residential", icon: "🏢" },
  { id: "Commercial", label: "Commercial", icon: "🏬" },
  { id: "Industrial", label: "Industrial", icon: "🏭" },
  { id: "Special Purpose", label: "Special Purpose", icon: "👑" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedType, setSelectedType] = useState("Residential");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*New High-Value Inquiry*%0A%0A*Name:* ${form.name}%0A*Phone:* ${form.phone}%0A*Email:* ${form.email}%0A*Type:* ${selectedType}%0A*Message:* ${form.message}`;
    window.open(`https://wa.me/966553846399?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 lg:px-12 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-7xl mx-auto mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[1px] bg-amber-500" />
            <span className="font-inter text-xs tracking-[0.25em] text-amber-500 uppercase font-semibold">
              Direct Line
            </span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl font-medium text-zinc-100 leading-[1.15]">
            Initiate Your Next
            <br />
            <span className="italic text-amber-500">Real Estate Venture.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="contact-reveal lg:col-span-7 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-amber-500/5 to-amber-500/20 rounded-2xl blur-sm transition duration-500 group-hover:opacity-100 opacity-60" />
            <form
              onSubmit={handleSubmit}
              className="relative rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl p-5 sm:p-8 shadow-2xl flex flex-col gap-4.5"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
                  <Building2 size={14} className="text-amber-500" />
                  01. Select Property Sector
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {propertyTypes.map((type) => {
                    const isSelected = selectedType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={cn(
                          "relative px-4 py-3.5 rounded-xl border text-xs font-semibold tracking-wider transition-all duration-300 flex flex-col items-center justify-center gap-2",
                          isSelected
                            ? "bg-amber-500/15 border-amber-500 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                            : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200",
                        )}
                      >
                        <span className="text-base">{type.icon}</span>
                        <span>{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <User size={14} className="text-amber-500" />
                  02. Enter Your Credentials
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="relative pt-2">
                    <input
                      required
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full bg-zinc-900/60 border border-zinc-800 text-zinc-100 font-inter text-sm px-4 pt-4 pb-3 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all duration-300"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-3 top-2 -translate-y-1/2 bg-black px-1 text-xs text-zinc-400 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-600 peer-focus:top-2 peer-focus:-translate-y-1/2 peer-focus:bg-zinc-950 peer-focus:text-xs peer-focus:text-amber-500 pointer-events-none"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative pt-2">
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full bg-zinc-900/60 border border-zinc-800 text-zinc-100 font-inter text-sm px-4 pt-4 pb-3 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all duration-300"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-3 top-2 -translate-y-1/2 bg-black px-1 text-xs text-zinc-400 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-600 peer-focus:top-2 peer-focus:-translate-y-1/2 peer-focus:bg-zinc-950 peer-focus:text-xs peer-focus:text-amber-500 pointer-events-none"
                    >
                      Phone Number
                    </label>
                  </div>
                </div>

                <div className="relative pt-2">
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full bg-zinc-900/60 border border-zinc-800 text-zinc-100 font-inter text-sm px-4 pt-4 pb-3 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all duration-300"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 top-2 -translate-y-1/2 bg-black px-1 text-xs text-zinc-400 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-600 peer-focus:top-2 peer-focus:-translate-y-1/2 peer-focus:bg-zinc-950 peer-focus:text-xs peer-focus:text-amber-500 pointer-events-none"
                  >
                    Corporate Email Address
                  </label>
                </div>

                <div className="relative pt-2">
                  <textarea
                    rows={4}
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full bg-zinc-900/60 border border-zinc-800 text-zinc-100 font-inter text-sm p-4 pt-5 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-zinc-900 transition-all duration-300 resize-none"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-3 top-2 -translate-y-1/2 bg-black px-1 text-xs text-zinc-400 transition-all duration-200 peer-placeholder-shown:top-7 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-600 peer-focus:top-2 peer-focus:-translate-y-1/2 peer-focus:bg-zinc-950 peer-focus:text-xs peer-focus:text-amber-500 pointer-events-none"
                  >
                    Briefly outline your portfolio requirements or question...
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-xl bg-amber-500 py-4 px-8 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] active:scale-[0.99]"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {submitted ? (
                    <>
                      <Check size={16} className="text-black" />
                      <span>Redirecting to Priority Desk...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Priority Inquiry</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>

          <div className="contact-reveal lg:col-span-5 flex flex-col gap-6">
            <a
              href="https://wa.me/966553846399"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-8 border border-primary transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 p-8 text-primary/10">
                <MessageSquare size={100} />
              </div>
              <div>
                <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-widest mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary-gradient animate-ping" />
                  Instant Executive Support
                </div>
                <p className="font-playfair text-3xl text-zinc-100 group-hover:text-primary transition-colors">
                  055 384 6399
                </p>
                <p className="text-xs text-zinc-400 mt-2 font-inter">
                  Direct WhatsApp dispatch line for immediate property
                  consultation.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs text-primary font-semibold tracking-wider uppercase">
                <span>Open Direct Chat</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </a>

            <div className="rounded-2xl bg-zinc-950/60 border border-zinc-800/80 px-6 py-9 space-y-6 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">
                    Headquarters
                  </h4>
                  <p className="text-sm text-zinc-200 leading-relaxed font-inter">
                    3617 King Fahd Road, Madinat Al Amal <br />
                    Dammam 32253, Kingdom of Saudi Arabia
                  </p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-zinc-900" />

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">
                    Telephone
                  </h4>
                  <p className="text-sm text-zinc-200 font-inter">
                    +966 55 384 6399
                  </p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-zinc-900" />

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-1">
                    Business Hours
                  </h4>
                  <p className="text-sm text-zinc-200 font-inter">
                    Saturday – Thursday: 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
