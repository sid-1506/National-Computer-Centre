import { useRef, useLayoutEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Laptop,
  Clock,
  Languages,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WHY_NCC_ROWS } from '../data/nccData';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  ShieldCheck,
  CheckCircle2,
  Users,
  Laptop,
  Clock,
  Languages,
};

export default function WhyNCC() {
  const sectionRef = useRef(null);
  const rowsRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(rowsRef.current?.children || [], {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
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
      id="why-ncc"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#EFEDE8] text-[#111111] border-b border-[#111111]/15"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#111111]/15 mb-12">
          <span className="section-label text-[#111111]">03 — WHY NCC</span>
          <span className="section-label text-[#111111]/60">SIX CORE STANDARDS</span>
        </div>

        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-[-0.02em] text-[#111111] leading-[1.02] md:leading-[0.98] pb-[0.08em]">
            WHY 35,000+ STUDENTS CHOSE NCC
          </h2>
          <p className="mt-4 text-base text-[#111111]/70 max-w-2xl">
            A principled approach to computing literacy and professional skill mastery built over nearly three decades.
          </p>
        </div>

        {/* 6 Plain Numbered Rows (Not cards) separated by hairlines */}
        <div ref={rowsRef} className="border-t border-[#111111]/15">
          {WHY_NCC_ROWS.map((row) => {
            const Icon = ICON_MAP[row.icon] || CheckCircle2;

            return (
              <div
                key={row.number}
                className="py-8 sm:py-10 border-b border-[#111111]/15 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline group hover:bg-[#111111]/[0.02] transition-colors"
              >
                {/* Number + Icon */}
                <div className="md:col-span-3 flex items-center gap-4">
                  <span className="font-mono text-sm sm:text-base font-semibold text-[#111111]/40 group-hover:text-[#1B3FAE] transition-colors">
                    {row.number}
                  </span>
                  <Icon className="w-5 h-5 text-[#111111] stroke-[1.5] group-hover:text-[#1B3FAE] transition-colors shrink-0" />
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <h3 className="font-display text-xl sm:text-2xl text-[#111111] uppercase tracking-[-0.02em] leading-[1.02] md:leading-[0.98] pb-[0.04em]">
                    {row.title}
                  </h3>
                </div>

                {/* Copy */}
                <div className="md:col-span-5">
                  <p className="text-sm sm:text-base text-[#111111]/70 leading-relaxed">
                    {row.copy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
