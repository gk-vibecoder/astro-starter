"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.4, 0, 0.2, 1] };

  return (
    <div className="divide-y divide-border">
      {items.map(({ q, a }, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              className="group flex items-center justify-between gap-4 w-full text-left py-5 cursor-pointer"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-foreground">{q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={transition}
                className="size-5 rounded-full border border-border flex items-center justify-center shrink-0 text-muted-foreground"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={transition}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
