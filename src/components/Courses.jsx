import { useRef, useLayoutEffect } from 'react';
import {
  Award,
  Calculator,
  FileSpreadsheet,
  Keyboard,
  LayoutTemplate,
  Palette,
  TrendingUp,
  LineChart,
  Code2,
  Globe,
  Cpu,
  Box,
  Monitor,
  ArrowRight,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COURSES } from '../data/nccData';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  Award,
  Calculator,
  FileSpreadsheet,
  Keyboard,
  LayoutTemplate,
  Palette,
  TrendingUp,
  LineChart,
  Code2,
  Globe,
  Cpu,
  Box,
  Monitor,
};

export default function Courses({ onOpenModal }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Desktop GSAP pin horizontal scroll
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative bg-[#111111] text-[#EFEDE8] py-20 lg:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Number & Label */}
        <div className="flex items-center justify-between pb-6 border-b border-white/15">
          <span className="section-label text-white/60">01 — COURSES</span>
          <span className="section-label text-white/40">13 CERTIFIED TRACKS</span>
        </div>

        {/* Heading in Anton */}
        <div className="pt-8">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-[-0.02em] text-white leading-[1.02] md:leading-[0.98] pb-[0.08em]">
            THIRTEEN WAYS TO GET HIRED
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-2xl">
            Strictly practical, industry-aligned curriculums with 1-on-1 computer terminals and Maharashtra government recognized certifications.
          </p>
        </div>
      </div>

      {/* Horizontally Scrolling Course Track */}
      <div ref={containerRef} className="w-full overflow-x-auto lg:overflow-visible no-scrollbar px-4 sm:px-6 lg:px-8">
        <div
          ref={trackRef}
          className="flex gap-6 pb-6 lg:pb-0 w-max"
        >
          {COURSES.map((course) => {
            const IconComponent = ICON_MAP[course.icon] || Award;

            return (
              <div
                key={course.id}
                className="w-[300px] sm:w-[360px] lg:w-[380px] shrink-0 border border-white/15 bg-[#161616] p-7 rounded-2xl flex flex-col justify-between hover:border-white/40 transition-colors group"
              >
                <div>
                  {/* Card Header: Thin Lucide icon top-left, Index top-right */}
                  <div className="flex items-center justify-between pb-8 border-b border-white/10">
                    <IconComponent className="w-6 h-6 text-[#1B3FAE] stroke-[1.5]" />
                    <span className="font-mono text-xs text-white/40 tracking-widest">
                      {course.index}
                    </span>
                  </div>

                  {/* Course Name in Anton */}
                  <h3 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-[-0.02em] mt-6 leading-[1.02] md:leading-[0.98] pb-[0.04em]">
                    {course.name}
                  </h3>

                  {/* One-line Description */}
                  <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed min-h-[42px]">
                    {course.description}
                  </p>
                </div>

                {/* Card Footer: Duration + Level in Small Caps & Underlined Enquire Link */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] uppercase tracking-wider text-white/50 font-medium">
                    <span>{course.duration}</span> · <span>{course.level}</span>
                  </div>

                  <button
                    onClick={() => onOpenModal(course.name)}
                    className="text-xs font-bold tracking-wider text-white uppercase underline underline-offset-4 decoration-[#1B3FAE] decoration-2 hover:text-[#1B3FAE] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>ENQUIRE</span>
                    <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
