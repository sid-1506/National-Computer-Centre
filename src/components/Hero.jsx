import { useRef, useLayoutEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_INFO } from '../data/nccData';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenModal }) {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Headline scroll reveal
      gsap.from(headlineRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
      });

      // Subtle parallax on classroom image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-28 sm:pt-32 pb-16 md:pb-24 bg-[#EFEDE8] text-[#111111] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Meta Line: Plain text label left + plain text rating right (no chips/badges) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 sm:pb-12 border-b border-[#111111]/15 gap-2">
          <span className="section-label text-[#111111]">
            GOVERNMENT RECOGNISED · MULUND WEST, MUMBAI
          </span>
          <span className="section-label text-[#111111]/70">
            {BUSINESS_INFO.rating.score} / {BUSINESS_INFO.rating.scale} ({BUSINESS_INFO.rating.reviewCount} RATINGS) · OPENS {BUSINESS_INFO.timings.opensAt}
          </span>
        </div>

        {/* Giant 3-Line Headline spanning full viewport width */}
        <div className="py-8 sm:py-12">
          <h1
            ref={headlineRef}
            className="font-display text-[13.5vw] sm:text-[12vw] lg:text-[9.2vw] leading-[1.02] md:leading-[0.98] tracking-[-0.02em] uppercase text-[#111111] text-left select-none pb-[0.08em]"
          >
            <span className="block mb-[0.06em]">LEARN COMPUTERS.</span>
            <span className="block mb-[0.06em]">BUILD CAREERS.</span>
            <span className="block text-[#1B3FAE]">SINCE 1998.</span>
          </h1>
        </div>

        {/* Full-width B&W Classroom Photography with Overlaid Copy & Plain Buttons */}
        <div
          ref={imageContainerRef}
          className="relative w-full overflow-hidden rounded-2xl bg-[#111111] mt-4 aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1]"
        >
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
            alt="Students engaged in practical computer training at National Computer Centre classroom lab"
            className="w-full h-[125%] object-cover grayscale contrast-110 brightness-95 transform -translate-y-[10%]"
            loading="eager"
          />

          {/* Subtle dark gradient overlay for bottom text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

          {/* Overlaid Bottom Content: 2 Plain Buttons + Scroll Cue */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            {/* Two Plain Buttons: Solid White Pill + Pill Outline (Max 2 CTAs) */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenModal('MS-CIT')}
                className="rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#111111] hover:bg-[#1B3FAE] hover:text-white btn-swiss cursor-pointer"
              >
                BOOK ONE DAY FREE TRIAL
              </button>
              <a
                href={`tel:${BUSINESS_INFO.phone.raw}`}
                className="rounded-full border border-white/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white hover:bg-white hover:text-[#111111] btn-swiss inline-block"
              >
                CALL {BUSINESS_INFO.phone.display}
              </a>
            </div>

            {/* Small ↓ SCROLL cue */}
            <div className="hidden sm:flex items-center gap-2 text-white/70 text-[11px] font-mono tracking-widest uppercase shrink-0">
              <span>↓ SCROLL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
