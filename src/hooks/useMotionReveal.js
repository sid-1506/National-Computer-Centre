import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if the user prefers reduced motion
 */
export function isReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Hook for standard section scroll reveals
 * Target elements inside container:
 * - .reveal-eyebrow
 * - .reveal-heading
 * - .reveal-body
 * - .reveal-item (cards, buttons, etc. capped at 6 staggered items)
 */
export function useSectionReveal(containerRef, deps = []) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Find elements
      const eyebrows = el.querySelectorAll('.reveal-eyebrow');
      const headings = el.querySelectorAll('.reveal-heading');
      const bodies = el.querySelectorAll('.reveal-body');
      const items = Array.from(el.querySelectorAll('.reveal-item'));

      // Sequence elements
      const sequence = [];
      if (eyebrows.length) sequence.push(...eyebrows);
      if (headings.length) sequence.push(...headings);
      if (bodies.length) sequence.push(...bodies);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            // Add will-change during animation
            [...sequence, ...items].forEach((item) => {
              if (item) item.style.willChange = 'transform, opacity';
            });
          },
        },
        defaults: {
          ease: 'power2.out',
          duration: 0.6,
        },
        onComplete: () => {
          // Clear will-change after animation
          [...sequence, ...items].forEach((item) => {
            if (item) {
              item.style.willChange = '';
              gsap.set(item, { clearProps: 'will-change' });
            }
          });
        },
      });

      // Initial state
      if (sequence.length) {
        gsap.set(sequence, { opacity: 0, y: 24 });
        tl.to(sequence, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
        });
      }

      // Card items (stagger up to 6, remaining fade together)
      if (items.length) {
        gsap.set(items, { opacity: 0, y: 24 });
        const staggeredItems = items.slice(0, 6);
        const remainingItems = items.slice(6);

        tl.to(
          staggeredItems,
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
          },
          sequence.length ? '-=0.35' : 0
        );

        if (remainingItems.length) {
          tl.to(
            remainingItems,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
            },
            '<'
          );
        }
      }
    }, el);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, ...deps]);
}
