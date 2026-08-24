import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS } from '../data/nccData';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCounts(STATS.map((s) => s.value));
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        STATS.forEach((stat, idx) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 2,
            ease: 'power3.out',
            onUpdate: () => {
              setCounts((prev) => {
                const next = [...prev];
                next[idx] = stat.isDecimal
                  ? parseFloat(obj.val.toFixed(1))
                  : Math.round(obj.val);
                return next;
              });
            },
          });
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#EFEDE8] text-[#111111] border-b border-[#111111]/15"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="flex items-center justify-between pb-6 border-b border-[#111111]/15 mb-12">
          <span className="section-label text-[#111111]">04 — VERIFIED METRICS</span>
          <span className="section-label text-[#111111]/60">1998 — 2026</span>
        </div>

        {/* 4 Numbers Grid in Giant Anton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-2 border-l border-[#111111]/15 pl-4 sm:pl-6">
              <div className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-[-0.02em] text-[#111111] leading-[1.02] md:leading-[0.98] pb-[0.04em]">
                {stat.isDecimal ? counts[idx].toFixed(1) : counts[idx].toLocaleString()}
                <span className="text-[#1B3FAE]">{stat.suffix}</span>
              </div>
              <div className="section-label text-[#111111] pt-2">
                {stat.label}
              </div>
              <div className="text-[11px] font-mono text-[#111111]/50 uppercase tracking-wider">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
