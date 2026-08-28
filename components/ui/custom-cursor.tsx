"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, {
        x: mouseX - 4,
        y: mouseY - 4,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const lerp = () => {
      if (!isHoveringRef.current) {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        gsap.set(ring, { x: ringX - 16, y: ringY - 16 });
      }
      requestAnimationFrame(lerp);
    };

    const onEnterInteractive = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const padding = 8;
      isHoveringRef.current = true;

      gsap.killTweensOf(ring);
      gsap.to(ring, {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
        borderRadius: rect.width < rect.height * 1.5 ? "9999px" : "12px",
        borderColor: "#C9A96E",
        backgroundColor: "rgba(201,169,110,0.08)",
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, { scale: 0, duration: 0.2, overwrite: "auto" });
    };

    const onLeaveInteractive = () => {
      isHoveringRef.current = false;

      const currentX = Number(gsap.getProperty(ring, "x"));
      const currentY = Number(gsap.getProperty(ring, "y"));
      ringX = currentX + 16;
      ringY = currentY + 16;

      gsap.killTweensOf(ring);
      gsap.to(ring, {
        x: ringX - 16,
        y: ringY - 16,
        width: 32,
        height: 32,
        borderRadius: "50%",
        borderColor: "#C9A96E",
        backgroundColor: "transparent",
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, { scale: 1, duration: 0.2, overwrite: "auto" });
    };

    window.addEventListener("mousemove", onMouseMove);
    requestAnimationFrame(lerp);

    const interactives = document.querySelectorAll(
      "a, button, [data-cursor-hover]",
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    const observer = new MutationObserver(() => {
      document
        .querySelectorAll("a, button, [data-cursor-hover]")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnterInteractive);
          el.removeEventListener("mouseleave", onLeaveInteractive);
          el.addEventListener("mouseenter", onEnterInteractive);
          el.addEventListener("mouseleave", onLeaveInteractive);
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary-gradient z-[9999] pointer-events-none mix-blend-difference"
        style={{ transform: "translate(-4px, -4px)" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-primary z-[9998] pointer-events-none"
        style={{ borderRadius: "50%" }}
      />
    </>
  );
}
