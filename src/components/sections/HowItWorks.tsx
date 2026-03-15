"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight } from "lucide-react";

type Step = {
  step: string;
  title: string;
  body: string;
};

type Props = {
  eyebrow: string;
  headline: string;
  description: string;
  cta?: string;
  ctaHref?: string;
  steps: Step[];
};

const STEP_DURATION = 5000;

// Generic step visual — abstract dot-and-line illustration that works for any step
function StepVisual({ index, title }: { index: number; title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
      <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <span className="text-2xl font-bold font-mono text-primary">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="text-sm font-medium text-foreground text-center max-w-xs">{title}</p>
      {/* Decorative lines */}
      <div className="flex flex-col gap-2 w-full max-w-xs mt-2">
        <div className="h-px bg-foreground/10 w-full" />
        <div className="h-px bg-foreground/6 w-3/4" />
        <div className="h-px bg-foreground/6 w-5/6" />
        <div className="h-px bg-foreground/6 w-2/3" />
      </div>
    </div>
  );
}

export default function HowItWorks({ eyebrow, headline, description, cta, ctaHref = '/signup', steps }: Props) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-20% 0px -20% 0px" });

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % steps.length);
    setProgress(0);
  }, [steps.length]);

  useEffect(() => {
    if (!inView) return;
    setProgress(0);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / STEP_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) advance();
    }, 16);
    return () => clearInterval(interval);
  }, [active, advance, inView]);

  const handleStepClick = (i: number) => {
    setActive(i);
    setProgress(0);
  };

  return (
    <section ref={sectionRef} className="border-y border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Left — headline */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              {eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {headline}
            </h2>
          </div>
          {/* Right — description + CTA */}
          <div className="flex flex-col justify-between gap-8">
            <p className="text-lg text-muted-foreground">
              {description}
            </p>
            {cta && (
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors w-fit"
              >
                {cta}
                <ArrowRight className="size-4" />
              </a>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 items-stretch">

            {/* Steps — left panel */}
            <div className="lg:col-span-2 flex flex-col">
              {steps.map(({ step, title, body }, i) => {
                const isActive = active === i;
                const isCompleted = i < active;
                const isLast = i === steps.length - 1;
                return (
                  <div key={step} className="flex gap-3">

                    {/* Timeline */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`w-0.5 h-6 ${i === 0 ? "bg-transparent" : isCompleted || isActive ? "bg-primary/30" : "bg-foreground/15"}`} />
                      <div
                        className={[
                          "size-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 z-10 shrink-0",
                          isActive
                            ? "bg-primary border-primary"
                            : isCompleted
                            ? "bg-primary/20 border-primary/40"
                            : "bg-background border-border",
                        ].join(" ")}
                      >
                        <span
                          className={`text-[10px] font-bold font-mono ${
                            isActive ? "text-primary-foreground" : isCompleted ? "text-primary/70" : "text-muted-foreground"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 relative overflow-hidden ${isCompleted ? "bg-primary/30" : "bg-foreground/15"}`}>
                          {isActive && (
                            <motion.div
                              className="absolute top-0 left-0 w-full bg-primary"
                              style={{ height: `${progress}%` }}
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Step card */}
                    <button
                      onClick={() => handleStepClick(i)}
                      className={[
                        "flex-1 flex flex-col text-left rounded-2xl px-6 py-6 transition-colors duration-200 border cursor-pointer",
                        !isLast && "mb-2",
                        isActive
                          ? "bg-primary/[0.03] border-primary"
                          : "border-foreground/15 bg-background/40 hover:bg-background",
                      ].filter(Boolean).join(" ")}
                    >
                      <div className={`${isActive ? "mb-3" : "flex-1 flex items-center"}`}>
                        <span className={`text-sm font-semibold transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                          {title}
                        </span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {body}
                            </p>
                            {/* Mobile inline visual */}
                            <div className="lg:hidden mt-4 -mx-6 -mb-6 h-48 border-t border-border overflow-hidden relative bg-muted/30">
                              <StepVisual index={i} title={title} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Visual — right panel */}
            <div className="hidden lg:block lg:col-span-3 rounded-2xl border border-border bg-background overflow-hidden relative min-h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <StepVisual index={active} title={steps[active]?.title ?? ''} />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
