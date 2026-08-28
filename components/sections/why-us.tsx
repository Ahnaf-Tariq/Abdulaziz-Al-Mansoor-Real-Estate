"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Trophy, TrendingUp, Zap, LucideIcon } from "lucide-react";

export interface ReasonItem {
  id: string;
  n: string;
  stat: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  tags: string[];
}

const reasons: ReasonItem[] = [
  {
    id: "experience",
    n: "01",
    stat: "40 Years",
    title: "Unmatched Experience",
    desc: "Founded in 1405 AH, we have navigated every market cycle in the Eastern Province — giving our clients unmatched stability, insight, and peace of mind.",
    icon: Trophy,
    tags: ["Est. 1405 AH", "Stability", "Market Insight"],
  },
  {
    id: "marketing",
    n: "02",
    stat: "Max Value",
    title: "Specialized Marketing Team",
    desc: "Our dedicated marketing team ensures your property reaches the right tenants at the right value — through innovative campaigns and deep local market knowledge.",
    icon: TrendingUp,
    tags: ["High ROI", "Targeted Campaigns", "Local Expertise"],
  },
  {
    id: "response",
    n: "03",
    stat: "Fast Response",
    title: "Always There When It Matters",
    desc: "From emergency maintenance to tenant requests, our team responds swiftly and effectively so your property never skips a beat — day or night.",
    icon: Zap,
    tags: ["24/7 Availability", "Swift Resolution", "Tenant Care"],
  },
];

const COLLAPSED_HEIGHT = 44;
const EXPANDED_HEIGHT = 280;
const CARD_GAP = 8;

function getStackHeight(stepCount: number) {
  return (
    stepCount * COLLAPSED_HEIGHT +
    (EXPANDED_HEIGHT - COLLAPSED_HEIGHT) +
    Math.max(stepCount - 1, 0) * CARD_GAP
  );
}

function getExpandAmount(activePosition: number, index: number) {
  return Math.max(0, 1 - Math.abs(activePosition - index));
}

interface ReasonCardProps {
  reason: ReasonItem;
  index: number;
  activePosition: ReturnType<typeof useTransform<number, number>>;
}

function ReasonCard({ reason, index, activePosition }: ReasonCardProps) {
  const Icon = reason.icon;

  const height = useTransform(activePosition, (position) => {
    const expand = getExpandAmount(position, index);
    return COLLAPSED_HEIGHT + expand * (EXPANDED_HEIGHT - COLLAPSED_HEIGHT);
  });

  const contentOpacity = useTransform(activePosition, (position) => {
    const expand = getExpandAmount(position, index);
    return expand < 0.2 ? 0 : Math.min(1, (expand - 0.2) / 0.35);
  });

  const barOpacity = useTransform(activePosition, (position) => {
    const expand = getExpandAmount(position, index);
    return expand > 0.35 ? 0 : 1;
  });

  return (
    <motion.article
      style={{ height }}
      className="relative w-full overflow-hidden rounded-lg bg-zinc-900/90 border border-zinc-800 backdrop-blur-md"
    >
      <motion.div
        style={{ opacity: barOpacity }}
        className="absolute inset-0 flex items-center justify-between px-6"
        aria-hidden
      >
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
          {reason.n} — {reason.title}
        </span>
        <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
          {reason.stat}
        </span>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="grid h-full grid-cols-1 gap-4 p-6 md:grid-cols-[1fr_160px] md:items-start md:gap-6"
      >
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">
              {reason.n}
            </span>
            <span className="w-6 h-[1px] bg-amber-500/40" />
            <span className="text-xs font-semibold tracking-wider text-amber-500/80 uppercase">
              {reason.stat}
            </span>
          </div>

          <h3 className="mb-3 font-playfair text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
            {reason.title}
          </h3>

          <div className="mb-4 flex flex-wrap gap-2">
            {reason.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-amber-500/20 bg-amber-500/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
            {reason.desc}
          </p>
        </div>

        <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-md bg-zinc-950 border border-zinc-800 flex items-center justify-center md:h-36 md:w-[160px] md:justify-self-end group">
          <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors" />
          <Icon
            size={48}
            className="text-amber-500 relative z-10"
            strokeWidth={1.25}
          />
        </div>
      </motion.div>
    </motion.article>
  );
}

function VerticalBrandHeading({
  scrollProgress,
  stackHeight,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  stackHeight: number;
}) {
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [scaleY, setScaleY] = useState(1);

  const fillMask = useTransform(
    scrollProgress,
    (progress) =>
      `linear-gradient(to bottom, #000 ${progress * 100}%, transparent ${progress * 100}%)`,
  );

  const textStyle = {
    writingMode: "vertical-rl" as const,
    textOrientation: "mixed" as const,
    fontSize: "3rem",
    lineHeight: 0.82,
  };

  const updateScale = useCallback(() => {
    const el = measureRef.current;
    if (!el || stackHeight <= 0) return;

    const naturalHeight = el.offsetHeight;
    if (naturalHeight > 0) setScaleY(stackHeight / naturalHeight);
  }, [stackHeight]);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  return (
    <div
      className="relative mt-4 hidden shrink-0 select-none lg:block"
      style={{ height: stackHeight > 0 ? stackHeight : undefined }}
      aria-hidden
    >
      <p
        ref={measureRef}
        className="pointer-events-none invisible absolute left-0 top-0 font-playfair font-bold uppercase tracking-[0.1em]"
        style={textStyle}
      >
        AL-MANSOOR
      </p>

      <div
        className="relative inline-block origin-top"
        style={{ transform: `scaleY(${scaleY})` }}
      >
        <p
          className="font-playfair font-bold uppercase tracking-[0.1em] text-zinc-800"
          style={textStyle}
        >
          AL-MANSOOR
        </p>
        <motion.p
          style={{
            ...textStyle,
            WebkitMaskImage: fillMask,
            maskImage: fillMask,
          }}
          className="absolute inset-0 font-playfair font-bold uppercase tracking-[0.1em] text-amber-500"
        >
          AL-MANSOOR
        </motion.p>
      </div>
    </div>
  );
}

function MobileReasonCard({ reason }: { reason: ReasonItem }) {
  const Icon = reason.icon;
  return (
    <article className="overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 p-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">
            {reason.n}
          </span>
          <span className="text-xs font-semibold tracking-wider text-amber-500/80 uppercase">
            {reason.stat}
          </span>
        </div>

        <div>
          <h3 className="mb-3 font-playfair text-2xl font-semibold tracking-tight text-zinc-100">
            {reason.title}
          </h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {reason.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-amber-500/20 bg-amber-500/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-zinc-400">{reason.desc}</p>
        </div>

        <div className="relative h-44 w-full overflow-hidden rounded-md bg-zinc-950 border border-zinc-800 flex items-center justify-center">
          <Icon size={56} className="text-amber-500" strokeWidth={1.25} />
        </div>
      </div>
    </article>
  );
}

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [stackHeight, setStackHeight] = useState(() =>
    getStackHeight(reasons.length),
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activePosition = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(reasons.length - 1, 0)],
  );

  useEffect(() => {
    const cardsEl = cardsRef.current;
    if (!cardsEl) return;

    function syncStackHeight() {
      if (!cardsRef.current) return;
      const measured = cardsRef.current.offsetHeight;
      if (measured > 0) setStackHeight(measured);
    }

    syncStackHeight();

    const observer = new ResizeObserver(syncStackHeight);
    observer.observe(cardsEl);
    window.addEventListener("resize", syncStackHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncStackHeight);
    };
  }, []);

  const pinHeight = `${Math.max(reasons.length, 1) * 100}vh`;

  return (
    <section className="bg-black text-white relative py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-[1px] bg-amber-500" />
          <span className="font-inter text-xs tracking-[0.25em] text-amber-500 uppercase font-semibold">
            WHY AL-MANSOOR
          </span>
        </div>
        <h2 className="font-playfair text-4xl sm:text-5xl font-medium text-zinc-100 leading-[1.15]">
          The reasons our clients
          <br />
          <span className="italic text-amber-500">stay for decades.</span>
        </h2>
      </div>

      <div className="space-y-4 px-6 lg:hidden">
        {reasons.map((reason) => (
          <MobileReasonCard key={reason.id} reason={reason} />
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: pinHeight }}
      >
        <div className="sticky top-0 flex h-screen items-center pt-6 lg:pt-8">
          <div className="mx-auto flex w-full max-w-6xl items-start gap-10 px-6 xl:gap-14">
            <VerticalBrandHeading
              scrollProgress={scrollYProgress}
              stackHeight={stackHeight}
            />

            <div className="min-w-0 flex-1 pt-4">
              <div ref={cardsRef} className="flex flex-col gap-2">
                {reasons.map((reason, index) => (
                  <ReasonCard
                    key={reason.id}
                    reason={reason}
                    index={index}
                    activePosition={activePosition}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center px-6 mt-4 sm:mt-0">
        <p
          className="font-serif text-zinc-300 text-xl md:text-2xl leading-relaxed"
          dir="rtl"
        >
          "سمعتنا هي أساس استمراريتنا ونجاحنا"
        </p>
        <p className="font-inter text-xs tracking-widest text-zinc-500 uppercase mt-1 sm:mt-3">
          Our reputation is the foundation of our continuity and success
        </p>
      </div>
    </section>
  );
}
