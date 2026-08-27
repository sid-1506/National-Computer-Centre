import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const images = sectionRef.current?.querySelectorAll('.gallery-image-wrap') || [];
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#EFEDE8] text-[#111111] border-b border-[#111111]/15"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#111111]/15 mb-12">
          <span className="section-label text-[#111111]">SPACES & FACILITIES</span>
          <span className="section-label text-[#111111]/60">ZAVER ROAD LABS</span>
        </div>

        {/* Section Title */}
        <div className="mb-12">
          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-[-0.02em] text-[#111111] leading-[1.02] md:leading-[0.98] pb-[0.08em]">
            INSIDE NATIONAL COMPUTER CENTRE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#111111]/70 max-w-xl">
            Clean, disciplined desktop workstations built for uninterrupted 1-on-1 practical mastery.
          </p>
        </div>

        {/* Asymmetric B&W Image Grid (2-3 images per row with unequal widths) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Row 1, Image 1 (Width 7 cols) */}
          <div className="md:col-span-7">
            <div className="gallery-image-wrap relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#111111]">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop"
                alt="Main classroom lab at National Computer Centre"
                className="w-full h-full object-cover grayscale contrast-115 brightness-90 hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <span className="section-label text-white/90 block">CENTRAL COMPUTER LAB</span>
                <span className="text-xs text-white/60 font-mono">Dedicated 1-Student : 1-PC Terminals</span>
              </div>
            </div>
          </div>

          {/* Row 1, Image 2 (Width 5 cols) */}
          <div className="md:col-span-5">
            <div className="gallery-image-wrap relative w-full aspect-[4/3] md:h-full rounded-2xl overflow-hidden bg-[#111111]">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                alt="Hands-on accounting software practice at computer terminal"
                className="w-full h-full object-cover grayscale contrast-115 brightness-90 hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <span className="section-label text-white/90 block">TALLY & ADVANCED EXCEL LAB</span>
                <span className="text-xs text-white/60 font-mono">Live Business GST Ledgers</span>
              </div>
            </div>
          </div>

          {/* Row 2, Image 3 (Width 5 cols) */}
          <div className="md:col-span-5">
            <div className="gallery-image-wrap relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#111111]">
              <img
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop"
                alt="Python and Data Analytics student coding workstation"
                className="w-full h-full object-cover grayscale contrast-115 brightness-90 hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <span className="section-label text-white/90 block">DATA ANALYTICS & PYTHON</span>
                <span className="text-xs text-white/60 font-mono">Power BI & Automation Workshops</span>
              </div>
            </div>
          </div>

          {/* Row 2, Image 4 (Width 7 cols) */}
          <div className="md:col-span-7">
            <div className="gallery-image-wrap relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#111111]">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
                alt="Faculty mentoring student at National Computer Centre Mulund West"
                className="w-full h-full object-cover grayscale contrast-115 brightness-90 hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <span className="section-label text-white/90 block">FACULTY 1-ON-1 GUIDANCE</span>
                <span className="text-xs text-white/60 font-mono">English, Marathi & Hindi Medium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
