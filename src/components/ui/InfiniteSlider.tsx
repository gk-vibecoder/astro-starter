import { cn } from '@/lib/utils';

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  /** Animation duration in ms. Default 20 000 ms. */
  durationMs?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Seamlessly loops its children horizontally using a CSS keyframe animation.
 * Children are duplicated internally — do NOT pre-duplicate them.
 *
 * Requires `animate-slider` and `animate-slider-reverse` keyframes in globals.css.
 * Animation is paused when `prefers-reduced-motion` is set (via `motion-reduce:` variant).
 */
export function InfiniteSlider({
  children,
  gap = 24,
  durationMs = 20000,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  return (
    <div className={cn('flex overflow-hidden', className)}>
      <div
        className={cn(
          'flex shrink-0 items-center motion-reduce:animate-none',
          reverse ? 'animate-slider-reverse' : 'animate-slider',
        )}
        style={{ gap: `${gap}px`, animationDuration: `${durationMs}ms` }}
        aria-hidden="true"
      >
        {children}
        {children}
      </div>
    </div>
  );
}
