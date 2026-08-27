import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ownerImg from '../assets/Owner.jpeg';

gsap.registerPlugin(ScrollTrigger);

export default function FounderSection({
  sectionNumber = '04',
  isStandalone = true,
  className = '',
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Founder image clip-path wipe reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Founder text fade + rise
      if (textRef.current) {
        gsap.from(textRef.current?.children || [], {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const contentMarkup = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      {/* Image Left ~45% width (lg:col-span-5) */}
      <div className="lg:col-span-5 w-full">
        <div
          ref={imageRef}
          className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] max-h-[420px] lg:max-h-none rounded-2xl overflow-hidden bg-[#111111]"
        >
          <img
            src={ownerImg}
            alt="Founder & Director of National Computer Centre, Mulund West"
            width={600}
            height={750}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>

      {/* Text Right ~55% width (lg:col-span-7) */}
      <div ref={textRef} className="lg:col-span-7 min-w-0 space-y-4">
        <span className="section-label text-primary font-bold block">
          FOUNDER & DIRECTOR
        </span>

        <h3
          className="font-display uppercase tracking-[-0.02em] leading-[1.02] md:leading-[0.98] text-[#111111] pb-[0.04em]"
          style={{ fontSize: 'clamp(1.85rem, 4.5vw, 3.25rem)' }}
        >
          LEADERSHIP & PRACTICAL PEDAGOGY
        </h3>

        <div className="space-y-3 text-base sm:text-lg text-[#111111]/80 leading-relaxed font-normal pt-3 border-t border-[#111111]/15">
          <p>
            Guiding National Computer Centre since 15 August 1998 with an unwavering focus on individual terminal practice and student-first mentoring.
          </p>
          <p>
            Over 28 continuous years and 35,000+ alumni across Mumbai, our founding philosophy remains constant: true technical competency comes from direct hands-on practice, personalized pacing, and career-oriented faculty guidance.
          </p>
        </div>

        {/* Responsive Fact Strip */}
        <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[#111111]/60 min-w-0">
          <span>28+ Years Mentoring</span>
          <span className="hidden sm:inline text-[#111111]/30" aria-hidden="true">·</span>
          <span>35,000+ Students</span>
          <span className="hidden sm:inline text-[#111111]/30" aria-hidden="true">·</span>
          <span>Mulund West, Mumbai</span>
        </div>
      </div>
    </div>
  );

  if (!isStandalone) {
    return (
      <div ref={containerRef} className={`mt-20 pt-16 border-t border-[#111111]/15 ${className}`}>
        {contentMarkup}
      </div>
    );
  }

  return (
    <section
      id="founder"
      ref={containerRef}
      className={`py-20 lg:py-28 bg-[#EFEDE8] text-[#111111] border-b border-[#111111]/15 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Eyebrow Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#111111]/15 mb-12">
          <span className="section-label text-[#111111]">
            {sectionNumber} — FOUNDER
          </span>
          <span className="section-label text-[#111111]/60">
            SINCE 15 AUGUST 1998
          </span>
        </div>

        {contentMarkup}
      </div>
    </section>
  );
}
