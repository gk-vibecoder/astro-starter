"use client";

import { useReducedMotion, motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  fadeUp,
  fadeUpSlow,
  staggerContainer,
  staggerContainerSlow,
  noMotion,
  inViewProps,
  duration,
  ease,
} from "@/lib/animation";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** Stagger direct children in sequence */
  stagger?: boolean;
  /** Use slower stagger timing — for hero sections */
  slow?: boolean;
  /** Delay before animation starts (seconds) */
  delay?: number;
}

/**
 * Default scroll-triggered section wrapper.
 * Applies a fade-up entrance. Disables motion when prefers-reduced-motion is set.
 * Use `stagger` to animate direct children in sequence.
 */
export function AnimatedSection({
  children,
  className,
  stagger = false,
  slow = false,
  delay,
}: AnimatedSectionProps) {
  const reduced = useReducedMotion();

  const variant = reduced
    ? noMotion
    : stagger
    ? slow
      ? staggerContainerSlow
      : staggerContainer
    : slow
    ? fadeUpSlow
    : fadeUp;

  // Only override transition (with delay) for non-stagger variants — stagger uses its own timing
  const transitionOverride =
    !stagger && !reduced && delay
      ? { duration: slow ? duration.slow : duration.default, ease: ease.out, delay }
      : undefined;

  return (
    <motion.div
      className={className}
      variants={variant}
      {...inViewProps}
      {...(transitionOverride ? { transition: transitionOverride } : {})}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * Child item for use inside <AnimatedSection stagger>.
 * Picks up parent stagger timing automatically.
 */
export function AnimatedItem({ children, className }: AnimatedItemProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div className={className} variants={reduced ? noMotion : fadeUp}>
      {children}
    </motion.div>
  );
}
