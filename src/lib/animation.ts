import type { Variants } from "framer-motion";

// Duration scale
export const duration = {
  fast: 0.15,
  default: 0.3,
  slow: 0.5,
} as const;

// Easing
export const ease = {
  out: "easeOut",
  in: "easeIn",
  spring: { type: "spring", stiffness: 300, damping: 30 },
} as const;

// Standard entrance: fade up
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.default, ease: ease.out },
  },
};

// Hero / page-level entrance: slower fade up
export const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

// Fade in only (no vertical movement) — for images, backgrounds
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.default, ease: ease.out },
  },
};

// Container variant for stagger
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Stagger container — slower (for hero sections)
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// Reduced motion variants — no movement, instant
export const noMotion: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

// Shared whileInView props — use on every scroll-triggered element
export const inViewProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-64px" },
} as const;
