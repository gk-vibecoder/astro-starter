'use client';

import { useState, useEffect } from 'react';

type Heading = {
  depth: number;
  slug: string;
  text: string;
};

type Props = {
  headings: Heading[];
  label?: string;
};

export function TableOfContents({ headings, label = 'On this page' }: Props) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '0% 0% -70% 0%' },
    );

    headings.forEach(({ slug }) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
        {label}
      </p>
      <ul className="space-y-2.5">
        {headings.map(({ depth, slug, text }) => (
          <li key={slug} className={depth === 3 ? 'pl-3' : ''}>
            <a
              href={`#${slug}`}
              className={[
                'text-sm leading-snug transition-colors block',
                activeId === slug
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
