import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../data/nccData';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const quotesRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(quotesRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#111111] text-[#EFEDE8]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/15 mb-16">
          <span className="section-label text-white/60">06 — STUDENT ALUMNI</span>
          <span className="section-label text-white/40">4.7 / 5.0 RATED · 275+ REVIEWS</span>
        </div>

        {/* Heading */}
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-[-0.02em] text-white leading-[1.02] md:leading-[0.98] pb-[0.08em]">
            VOICES FROM THE CLASSROOM
          </h2>
        </div>

        {/* 3 Large Serif-free Quotes on Black (No avatars, no stars) */}
        <div ref={quotesRef} className="space-y-16 lg:space-y-24 border-t border-white/15 pt-12">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start pb-16 border-b border-white/10 last:border-none"
            >
              <div className="lg:col-span-2">
                <span className="font-mono text-sm text-white/40">
                  0{idx + 1} / 03
                </span>
              </div>

              <div className="lg:col-span-10 space-y-6">
                <blockquote className="font-sans text-xl sm:text-2xl lg:text-3xl font-light text-white leading-snug tracking-tight">
                  "{t.quote}"
                </blockquote>

                <div className="pt-2">
                  <div className="font-display text-lg sm:text-xl uppercase tracking-[-0.02em] text-white leading-[1.02] md:leading-[0.98] pb-[0.04em]">
                    {t.name}
                  </div>
                  <div className="section-label text-brand-cyan mt-1">
                    {t.role} · {t.course}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
