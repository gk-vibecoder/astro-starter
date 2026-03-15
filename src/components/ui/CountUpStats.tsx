"use client";

import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useTransform,
  animate,
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

type Stat = {
  value: string;
  label: string;
};

// Renders a single character. Digits slide vertically on change; punctuation is static.
function SlidingChar({ char, index }: { char: string; index: number }) {
  if (!/\d/.test(char)) {
    return <span className="inline-block">{char}</span>;
  }

  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ height: "1em", lineHeight: 1, verticalAlign: "top" }}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.span
          key={`${index}-${char}`}
          className="absolute inset-x-0 top-0 flex justify-center"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
      {/* Invisible placeholder keeps the column width stable */}
      <span className="invisible select-none">{char}</span>
    </span>
  );
}

function CountUpNumber({
  value,
  liveCount = false,
}: {
  value: string;
  liveCount?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });

  // Parse "10K+" → num=10, suffix="K+"
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)/);
  const num = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";

  // Phase 1: count-up driven by a motion value
  const count = useMotionValue(0);
  const display = useTransform(count, (v) =>
    Math.round(v).toLocaleString("en-US")
  );

  // Phase 2: ticking — driven by state so we can split into individual chars
  const [tickValue, setTickValue] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || prefersReduced || num === null) return;

    const controls = animate(count, num, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        if (!liveCount) return;
        setTickValue(num);
        intervalRef.current = setInterval(() => {
          setTickValue((v) => (v ?? num) + 1);
        }, 900);
      },
    });

    return () => {
      controls.stop();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [inView, prefersReduced]);

  if (num === null || prefersReduced) {
    return <span ref={ref}>{value}</span>;
  }

  // Phase 2: sliding digits
  if (tickValue !== null) {
    const chars = tickValue.toLocaleString("en-US").split("");
    return (
      <span ref={ref} className="inline-flex items-baseline">
        {chars.map((char, i) => (
          <SlidingChar key={i} char={char} index={i} />
        ))}
        {suffix}
      </span>
    );
  }

  // Phase 1: simple count-up
  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

type Props = {
  stats: Stat[];
  /** Index of the stat to animate with a live-ticking counter after count-up. Default 0. */
  liveCountIndex?: number;
};

export default function CountUpStats({ stats, liveCountIndex = 0 }: Props) {
  return (
    <div className="flex items-center justify-center divide-x divide-border">
      {stats.map(({ value, label }, i) => (
        <div key={label} className="px-8 text-center first:pl-0 last:pr-0">
          <p className="text-2xl font-bold tracking-tight text-foreground">
            <CountUpNumber value={value} liveCount={i === liveCountIndex} />
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}
