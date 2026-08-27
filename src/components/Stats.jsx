import { useRef, useState, useEffect } from 'react';
import { STATS } from '../data/nccData';

export default function Stats() {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return STATS.map((s) => s.value);
    }
    return STATS.map(() => 0);
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.unobserve(el);

          const startTime = performance.now();
          const duration = 1800;

          const step = (now) => {
            const progress = Math.min(1, (now - startTime) / duration);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts(
              STATS.map((stat) => {
                const current = stat.value * ease;
                return stat.isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current);
              })
            );

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCounts(STATS.map((s) => s.value));
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-[#F7F9FC] border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-[#E4F4FB] text-[#0B6AA8] text-[13px] sm:text-[14px] font-semibold uppercase tracking-wider px-5 py-2 rounded-full mb-3">
            VERIFIED METRICS
          </span>
          <h2
            className="font-bold text-[#0F172A] leading-tight tracking-tight mt-1"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Numbers That <span className="text-[#0B6AA8]">Speak</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 sm:p-8 bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform duration-300"
            >
              <div
                className="font-bold text-[#0B6AA8]"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', lineHeight: 1.1 }}
              >
                {stat.isDecimal ? counts[idx].toFixed(1) : counts[idx].toLocaleString()}
                <span className="text-[#2DB3E3]">{stat.suffix}</span>
              </div>
              <div className="mt-3 text-[15px] sm:text-[16px] font-bold text-[#0F172A] capitalize">
                {stat.label.toLowerCase().replace(/_/g, ' ')}
              </div>
              <div className="text-[12px] sm:text-[13px] text-[#64748B] mt-1 font-medium uppercase tracking-wider">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
