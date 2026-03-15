"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AnimatedItem } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export interface EditorialItem {
  href: string;
  /** Article title or person name */
  title: string;
  /** Short description or pull quote */
  description: string;
  /** Subtitle — company name or role + company */
  meta: string;
  /** Cover image URL */
  image?: string;
  /** Category badge */
  badge?: string;
  /** Key result or outcome callout */
  highlight?: string;
  /** If present, renders a story card with avatar initials; absent = article card */
  initials?: string;
  /** Person headshot — replaces initials circle when provided */
  avatar?: string;
  featured?: boolean;
}

interface Props {
  items: EditorialItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

// ── Simple placeholder cover ──────────────────────────────────────────────────

function CoverPlaceholder({ title, category }: { title: string; category?: string }) {
  return (
    <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
      <div className="text-center px-4">
        {category && (
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
            {category}
          </p>
        )}
        <p className="text-sm font-medium text-muted-foreground line-clamp-2">{title}</p>
      </div>
    </div>
  );
}

// ── Card variants ─────────────────────────────────────────────────────────────

function StoryCard({ item }: { item: EditorialItem }) {
  const { href, title, description, meta, badge, initials, avatar, image } = item;
  return (
    <a
      href={href}
      className="group flex flex-col rounded-xl border border-border overflow-hidden hover:border-primary/20 hover:bg-primary/5 transition-colors h-full"
    >
      {image ? (
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt=""
            width={1200}
            height={675}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <CoverPlaceholder title={title} category={badge} />
      )}
      <div className="flex flex-col gap-4 p-6 flex-1">
        {badge && (
          <div>
            <Badge variant="secondary">{badge}</Badge>
          </div>
        )}

        <p className="text-sm text-foreground leading-relaxed flex-1 italic">
          &ldquo;{description}&rdquo;
        </p>

        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <div className="size-8 rounded-full bg-muted overflow-hidden flex items-center justify-center shrink-0">
            {avatar ? (
              <img src={avatar} alt={title} width={32} height={32} loading="lazy" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-semibold text-muted-foreground">{initials}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground truncate">{meta}</p>
          </div>
          <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>
      </div>
    </a>
  );
}

function ArticleCard({ item }: { item: EditorialItem }) {
  const { href, title, description, meta, badge, highlight, image } = item;
  return (
    <a
      href={href}
      className="group flex flex-col rounded-xl border border-border overflow-hidden hover:border-primary/20 hover:bg-primary/5 transition-colors h-full"
    >
      {image ? (
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt=""
            width={1200}
            height={675}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <CoverPlaceholder title={title} category={badge} />
      )}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {badge && <Badge variant="secondary">{badge}</Badge>}
          <span className="text-xs text-muted-foreground">{meta}</span>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {highlight && (
          <div className="rounded-lg border border-border bg-muted/40 px-4 py-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
              Key result
            </p>
            <p className="text-xs font-medium text-foreground">{highlight}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">Read more</span>
          <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </a>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function EditorialGrid({
  items,
  emptyTitle = "Coming soon",
  emptyDescription = "Check back shortly.",
}: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-muted/30 p-16 text-center">
        <p className="text-sm font-semibold text-foreground mb-2">{emptyTitle}</p>
        <p className="text-sm text-muted-foreground">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <AnimatedSection stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <AnimatedItem key={item.href}>
          {item.initials ? (
            <StoryCard item={item} />
          ) : (
            <ArticleCard item={item} />
          )}
        </AnimatedItem>
      ))}
    </AnimatedSection>
  );
}
