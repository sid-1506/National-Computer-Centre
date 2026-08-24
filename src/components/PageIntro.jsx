import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageIntro({ onComplete }) {
  const [isDone, setIsDone] = useState(() => {
    if (typeof window === 'undefined') return true;
    const hasSeenIntro = sessionStorage.getItem('ncc_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return Boolean(hasSeenIntro || prefersReducedMotion);
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isDone) {
      if (onComplete) onComplete();
      return;
    }

    let start = 0;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 8) + 4;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        setCount(100);
        setTimeout(() => {
          setIsDone(true);
          sessionStorage.setItem('ncc_intro_seen', 'true');
          if (onComplete) onComplete();
        }, 400);
      } else {
        setCount(start);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isDone, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#0C0C0C] p-8 md:p-16 text-[#F4F2EE]"
        >
          {/* Top Info */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 text-xs uppercase tracking-widest text-[#A3A3A0]">
            <span>National Computer Centre</span>
            <span>Est. 15 Aug 1998 · Mulund West</span>
          </div>

          {/* Center Brand */}
          <div className="my-auto max-w-4xl">
            <p className="font-sans text-xs md:text-sm tracking-[0.25em] text-[#1B3FAE] uppercase mb-4 font-semibold">
              Government Recognised Institute
            </p>
            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-white uppercase">
              Learn Computers.<br />
              <span className="text-[#A3A3A0]">Build Careers.</span>
            </h1>
          </div>

          {/* Bottom Counter & Status */}
          <div className="flex items-end justify-between border-t border-white/10 pt-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#A3A3A0] block">
                Loading Experience
              </span>
              <span className="text-xs font-mono text-white/60">
                Shop No. 7, Anubhav Bldg, Zaver Rd, Mumbai
              </span>
            </div>

            <div className="font-display text-6xl md:text-8xl text-[#F4F2EE] tabular-nums leading-none">
              {String(count).padStart(2, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
