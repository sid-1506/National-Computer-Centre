import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FounderSection from './FounderSection';

gsap.registerPlugin(ScrollTrigger);

export default function About({ onOpenModal }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Text fade + rise 24px with 80ms stagger
      gsap.from(textRef.current?.children || [], {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      // Story image clip-path wipe reveal
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-32 sm:pt-36 pb-20 lg:pb-32 bg-[#EFEDE8] text-[#111111] border-b border-[#111111]/15"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-[11px] font-mono tracking-widest uppercase text-[#111111]/50 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-[#111111] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#111111] font-semibold">ABOUT</span>
        </nav>

        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#111111]/15 mb-12">
          <span className="section-label text-[#111111]">ABOUT</span>
          <span className="section-label text-[#111111]/60">ESTABLISHED 15 AUGUST 1998</span>
        </div>

        {/* Two Column Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading with last line in text-primary & Editorial Copy */}
          <div ref={textRef} className="lg:col-span-7 space-y-6">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-[-0.02em] leading-[1.02] md:leading-[0.98] text-[#111111] pb-[0.08em]">
              TWENTY-EIGHT YEARS OF DISCIPLINED COMPUTER EDUCATION IN <span className="text-primary">MULUND WEST.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#111111]/80 leading-relaxed font-normal pt-4 border-t border-[#111111]/15">
              <p>
                Founded on <strong className="text-[#111111] font-semibold">15 August 1998</strong>, National Computer Centre was established with a singular mission: to provide rigorous, career-defining computer education to students, working professionals, and job seekers in Mumbai.
              </p>
              <p>
                Located at <strong className="text-[#111111] font-semibold">Shop No. 7, Anubhav Building on Zaver Road</strong> — right beside Mulund Railway Station — we have trained over 35,000 students through rigorous hands-on laboratory sessions.
              </p>
              <p>
                We believe practical competency comes from doing, not watching. Every enrolled student trains at their own personal computer terminal with dedicated faculty mentoring available in <strong className="text-[#111111] font-semibold">Marathi, Hindi, and English</strong>.
              </p>
            </div>

            {/* Quick Fact Callouts */}
            <div className="pt-6 grid grid-cols-2 gap-6 border-t border-[#111111]/15">
              <div>
                <span className="section-label text-[#111111]/50 block mb-1">FOUNDING DATE</span>
                <span className="font-display text-xl text-[#111111]">15 AUGUST 1998</span>
              </div>
              <div>
                <span className="section-label text-[#111111]/50 block mb-1">CENTRE TIMINGS</span>
                <span className="font-display text-xl text-[#111111]">07:00 AM – 09:00 PM</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenModal('MS-CIT')}
                className="rounded-full bg-[#111111] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#EFEDE8] hover:bg-primary btn-swiss cursor-pointer"
              >
                VISIT THE CENTRE
              </button>
            </div>
          </div>

          {/* Right Column: Tall B&W Photo with Clip-Path Reveal */}
          <div className="lg:col-span-5">
            <div
              ref={imageRef}
              className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#111111]"
            >
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop"
                alt="Teacher explaining practical software module to student at National Computer Centre"
                className="w-full h-full object-cover grayscale contrast-110 brightness-95"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <span className="section-label text-white/80 block">ZAVER ROAD LAB</span>
                <span className="text-xs text-white/60 font-mono">Individual 1-on-1 PC Practice</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reusable Founder / Director Block */}
        <FounderSection isStandalone={false} />
      </div>
    </section>
  );
}
